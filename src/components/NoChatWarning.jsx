import { useState } from "react";
import { socket } from "../utils/socket";
import { JoinDialog } from "./JoinDialog";

export const NoChatWarning = () => {
  const [canShowDialog, showDialog] = useState(false);

  return (
    <div>
      <div className="text-white text-center text-xl md:text-2xl">
        Você não está em nenhum chat, tente{" "}
        <span
          onClick={socket.createRoom}
          className="text-secondary font-bold cursor-pointer"
        >
          criar
        </span>{" "}
        ou{" "}
        <span
          onClick={() => showDialog(true)}
          className="text-secondary font-bold cursor-pointer"
        >
          entrar
        </span>
      </div>

      {canShowDialog && <JoinDialog showDialog={showDialog} />}
    </div>
  );
};
