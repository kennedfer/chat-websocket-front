import { notify } from "./notify.js";
import { storage } from "./storage.js";

export * as socket from "./socket.js";

let socket;
let roomId;
let userId;
let nick;
let messages = [];
let lastUserId;

let setAppRoomId;
let setMessagesHook;

const EVENTS = {
  leave: "leave",
  create: "create",
  message: "message",
  join: "join",
};

export const createSocket = (setRoomIdHook) => {
  socket = new WebSocket("wss://kennedfer-chat-ws.onrender.com");
  nick = storage.getUserFromLocalStorage();

  setAppRoomId = setRoomIdHook;

  socket.onmessage = (serverMessage) => {
    const message = JSON.parse(serverMessage.data);
    const messageUserId = message.userId;
    const { data, error } = message;

    if (error) return notify(error);

    if (!roomId) {
      roomId = data;
      setAppRoomId(data);
      userId = `${nick}#${data}`;

      return;
    }

    if (!userId) {
      setAppRoomId(roomId);
      userId = `${nick}#${data}`;
      return;
    }

    if (messageUserId != lastUserId && messageUserId != userId) {
      lastUserId = messageUserId;
      messages.push({ type: "decorator", data: messageUserId });
    }

    messages.push({ type: userId == messageUserId ? "user" : "group", data });
    setMessagesHook([...messages]);
  };
};

export const getSocket = () => socket;
export const getRoomId = () => roomId;
export const getUserId = () => userId;

export const bindMessagesHook = (hook) => (setMessagesHook = hook);

export const createRoom = () => {
  sendEvent(EVENTS.create);
};

export const joinRoom = (id) => {
  roomId = id;
  sendEvent(EVENTS.join);
};

export const leaveRoom = () => {
  sendEvent(EVENTS.leave, roomId);
  resetFlagsAndMessages();
};

export const sendMessage = (message) => {
  sendEvent(EVENTS.message, message);
};

const socketStillConecting = () => {
  return socket.readyState ? false : true;
};

export const sendEvent = (type, data) => {
  const event = {
    type,
    data,
    roomId,
    userId,
  };

  if (socketStillConecting()) return notify("Conectando ao servidor...");
  socket.send(JSON.stringify(event));
};

const resetFlagsAndMessages = () => {
  roomId = null;
  userId = null;
  messages = [];

  setAppRoomId();
};
