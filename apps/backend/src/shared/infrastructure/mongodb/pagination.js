const _ = require("lodash");
const { ObjectId } = require("mongodb");
const { Cursor } = require("shared/domain/value_objects/cursor");
const { MongoDbError } = require("shared/infrastructure/mongodb/mongodb_error");

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { paginateQuery };

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

async function paginateQuery({
  query,
  cursor = Cursor.empty(),
  limit,
  sortBy = "createdAt",
  order = "desc",
  collection,
}) {
  try {
    const { queryData, options } = await getPaginationData({
      query,
      cursor,
      limit,
      sortBy,
      order,
      collection,
    });

    const databaseResults = await collection.find(queryData, options).toArray();

    if (limit) {
      const pageResults = _.take(databaseResults, limit.toValue());
      const hasMorePages = databaseResults.length > limit.toValue();
      const nextCursor = hasMorePages
        ? Cursor.encode(_.last(pageResults)._id.toString())
        : Cursor.empty();

      return {
        results: pageResults,
        nextCursor,
        prevCursor: cursor,
      };
    }
    return { results: databaseResults };
  } catch (err) {
    if (err.isDomainError) throw err;
    throw new MongoDbError({ err });
  }
}

/* ====================================================== */
/*                        Helpers                         */
/* ====================================================== */

async function getPaginationData({
  query,
  cursor,
  limit,
  sortBy,
  order,
  collection,
}) {
  const queryData = { ...query };
  const options = {};

  // 1. Configure Options
  // --------------------

  // 1.1. Fetch a limited amount of documents + 1 to find the cursor for the next page
  if (limit) options.limit = limit.toValue() + 1;

  // 1.2. SORTING - Set ascending or descending order
  const orderNumber = order === "asc" ? 1 : -1;

  // 1.3. SORTING - Add extra sorting fields if necessary (createdAt === _id in MongoDB)
  options.sort = [["_id", orderNumber]];
  if (sortBy !== "createdAt") options.sort.unshift([sortBy, orderNumber]);

  // 2. Configure query
  // ------------------

  // 2.1. CONFIGURE QUERY - If cursor is defined, configure query options
  if (cursor && !cursor.isEmpty()) {
    const cursorObject = await collection.findOne({
      _id: new ObjectId(cursor.decode()),
    });
    const orderKey = order === "desc" ? "$lt" : "$gt";
    const id = new ObjectId(cursorObject._id);

    // 2.1.1. CONFIGURE QUERY FOR UNIQUE SORTABLE FIELDS
    if (sortBy === "createdAt") {
      queryData._id = { [orderKey]: id }; // { _id: { $gte: 123412312 }}
    } // 2.1.2. CONFIGURE QUERY FOR NON UNIQUE SORTABLE FIELDS
    else {
      const queryDataOr = queryData.$or;
      const paginationOr = [
        // Documents greater/lower according to the order than the cursor's field we are sorting by
        { [sortBy]: { [orderKey]: cursorObject[sortBy] } },
        // Documents with the same value as the cursor field we are sorting by, but greater/lower than the id field of our cursro
        // This is necessary when sorting by non unique fields
        { [sortBy]: cursorObject[sortBy], _id: { [orderKey]: id } }, // documents that have the same sortBy field
      ];
      if (queryDataOr) {
        queryData.$and = [{ $or: queryDataOr }, { $or: paginationOr }];
        delete queryData.$or;
      } else {
        queryData.$or = paginationOr;
      }
    }
  }

  return { queryData, options };
}
