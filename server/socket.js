const { User, Message } = require("./models/index");
const { messageSchema } = require("./schemas");

const connectSocket = (socket) => {
  socket.on("join_room", async (receiverId) => {
    try {
      const { uid: senderId } = socket.user;

      const user = await User.findOne({ where: { id: receiverId } });

      if (!user) {
        throw new Error("User doesn't exist");
      }

      const roomId = new Array(senderId, receiverId).sort().join("__with__");

      socket.join(roomId);
    } catch (error) {
      const { message } = message;

      socket.emit("event_error", message);
    }
  });

  socket.on("leave_room", async (receiverId) => {
    try {
      const { uid: senderId } = socket.user;

      const user = await User.findOne({ where: { id: receiverId } });

      if (!user) {
        throw new Error("User doesn't exist");
      }

      const roomId = new Array(senderId, receiverId).sort().join("__with__");

      socket.leave(roomId);
    } catch (error) {
      const { message } = message;

      socket.emit("event_error", message);
    }
  });

  socket.on("send_message", async (receiverId, data) => {
    try {
      const { uid: senderId } = socket.user;

      const user = await User.findOne({ where: { id: receiverId } });

      if (!user) {
        throw new Error("User doesn't exist");
      }

      const { error } = messageSchema.validate(data, {
        errors: {
          wrap: {
            label: "",
          },
        },
      });

      if (error) {
        const message = error.details[0].message;
        throw new Error(message);
      }

      const roomId = new Array(senderId, receiverId).sort().join("__with__");

      const response = await Message.create({ ...data, senderId, receiverId });

      const message = await Message.findOne({
        where: { id: response.getDataValue("id") },
      });

      socket.nsp.to(roomId).emit("receive_message", message);
    } catch (error) {
      const { message } = message;

      socket.emit("event_error", message);
    }
  });
};

module.exports = connectSocket;
