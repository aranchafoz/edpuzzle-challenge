// Create user
dbAdmin = db.getSiblingDB("admin");
dbAdmin.createUser({
  user: "edpuzzler",
  pwd: "password",
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }],
  mechanisms: ["SCRAM-SHA-1"],
});

// Authenticate user
dbAdmin.auth({
  user: "edpuzzler",
  pwd: "password",
  mechanisms: ["SCRAM-SHA-1"],
  digestPassword: true,
});

// Create DB and collection
db = new Mongo().getDB("code_challenge");
db.createCollection("videos");
db.createCollection("questions");
