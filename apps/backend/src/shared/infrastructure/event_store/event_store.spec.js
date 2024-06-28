const _ = require("lodash");
const env = require("shared/infrastructure/env");
const uuid = require("shared/infrastructure/uuid");

/* ====================================================== */
/*                     Infrastructure                     */
/* ====================================================== */

const { DatabaseClient } = require("shared/infrastructure/mongodb/db");
const { MongoDbEventStore } = require("./mongodb_event_store");
const { MemoryEventStore } = require("./memory_event_store");

/* ====================================================== */
/*                         Domain                         */
/* ====================================================== */

const { User } = require("harvest/user/domain/aggregate/user");
const {
  UserSignedUpEvent,
} = require("harvest/user/domain/events/user_signed_up");
const {
  UserLoggedInEvent,
} = require("harvest/user/domain/events/user_logged_in");
const {
  UserLoggedOutEvent,
} = require("harvest/user/domain/events/user_logged_out");
const { Event } = require("shared/domain/events/event");

/* ====================================================== */
/*                         Tests                          */
/* ====================================================== */

const IMPLEMENTATIONS = {
  MONGODB: "Mongo DB",
  MEMORY: "Memory",
};

describe("MongoDB | Event Store", () => {
  let databaseConnection;
  let mongoDbRepository;

  beforeAll(async () => {
    databaseConnection = new DatabaseClient({ url: env.mongo.url });
    const { client } = await databaseConnection.connect();
    mongoDbRepository = new MongoDbEventStore({
      db: client.db(uuid.v4()),
      env,
    });
  });
  afterAll(async () => await databaseConnection.disconnect());

  describe.each(_.values(IMPLEMENTATIONS))("%s", (implementation) => {
    let eventRepository;

    beforeEach(async () => {
      switch (implementation) {
        case IMPLEMENTATIONS.MONGODB:
          eventRepository = mongoDbRepository;
          break;
        case IMPLEMENTATIONS.MEMORY:
          eventRepository = new MemoryEventStore();
          break;
        default:
          eventRepository = mongoDbRepository;
          break;
      }
    });

    describe(".findById()", () => {
      it("should find an event by its id", async () => {});
    });

    describe(".save()", () => {
      it("should save events", async () => {
        const user = User.random();
        const event1 = UserSignedUpEvent.create(user, { credentials: "local" });
        const event2 = UserLoggedInEvent.create(user, { credentials: "local" });
        const event3 = UserLoggedOutEvent.create(user);
        const events = [event1, event2, event3];
        const results = await eventRepository.save(events);
        results.forEach((result) => expect(result).toBeInstanceOf(Event));

        const persistedEvent1 = await eventRepository.findById(event1.getId());
        expect(persistedEvent1).not.toBeUndefined();
        const persistedEvent2 = await eventRepository.findById(event2.getId());
        expect(persistedEvent2).not.toBeUndefined();
        const persistedEvent3 = await eventRepository.findById(event3.getId());
        expect(persistedEvent3).not.toBeUndefined();
      });
    });
  });
});
