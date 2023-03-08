const Chat = require("./model");

module.exports = {
  get: async (query) => {
    try {
      let dbQuery = Chat;
      if (query.name !== undefined && query.name !== "") {
        dbQuery = dbQuery
          .findOne({ name: query.name })
          .orFail("User not Found");
      } else if (query.id !== undefined && query.id !== "") {
        dbQuery = dbQuery.findById(query.id).orFail("User not Found");
      } else {
        dbQuery = dbQuery.find();
      }
      return {
        data: await dbQuery.exec(),
      };
    } catch (e) {
      if (e.name === "UserNotFound") {
        throw notFoundError;
      }
      throw e;
    }
  },
  create: async (SendMessage) => {
    const creatingMessage = new Chat(SendMessage);
    try {
      return await creatingMessage.save();
    } catch (error) {
      throw error;
    }
  },
};
