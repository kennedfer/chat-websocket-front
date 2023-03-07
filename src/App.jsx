import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Chat } from "./components/Chat";
import { MessageInput } from "./components/MessageInput";
import { NameDialog } from "./components/NameDialog";
import { NoChatWarning } from "./components/NoChatWarning";
import { socket } from "./utils/socket.js";
import { storage } from "./utils/storage";

const App = () => {
  const [roomId, setRoomId] = useState();

  useEffect(() => {
    socket.createSocket(setRoomId);
  }, []);

  return (
    <div className="flex relative gap-1 flex-col h-screen p-2">
      {roomId && (
        <div className="flex p-2">
          <button
            onClick={socket.leaveRoom}
            className="text-white fa-solid fa-arrow-left"
          ></button>
          <div className="grow text-center text-white">{roomId}</div>
        </div>
      )}
      <div className="grow flex justify-center items-center">
        {!roomId ? <NoChatWarning /> : <Chat />}
      </div>

      {roomId && <MessageInput />}

      <Toaster position="bottom-center" />
      <NameDialog />
    </div>
  );
};

export default App;
