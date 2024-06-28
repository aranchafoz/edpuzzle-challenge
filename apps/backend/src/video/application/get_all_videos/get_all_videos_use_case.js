/* ====================================================== */
/*                         Domain                         */
/* ====================================================== */

/* ====================================================== */
/*                       Command                          */
/* ====================================================== */

async function getAllVideosUseCase(
  { pageSize, pageToken },
  { videoRepository }
) {
  const { results, cursor } = await videoRepository.findAll({
    cursor: pageToken,
    limit: pageSize,
    sortBy: "createdAt",
    order: "desc",
  });
  return {
    nextPageToken: cursor.toValue(),
    resultsPerPage: pageSize.toValue(),
    videos: results,
  };
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { getAllVideosUseCase };
