const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

describe("Database Connection", () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  test("should connect to the in-memory database", async () => {
    const connectionState = mongoose.connection.readyState;
    expect(connectionState).toBe(1); // 1 indicates connected
  });

  test("should disconnect from the in-memory database", async () => {
    await mongoose.disconnect();
    const connectionState = mongoose.connection.readyState;
    expect(connectionState).toBe(0); // 0 indicates disconnected
  });
});
