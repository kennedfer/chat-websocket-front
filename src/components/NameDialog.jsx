import { useState } from "react";
import { notify } from "../utils/notify";
import { storage } from "../utils/storage";

export const NameDialog = () => {
  const storageNick = storage.getUserFromLocalStorage();
  const [hasNick, setHasNick] = useState(storageNick);
  const [nick, setNick] = useState();

  const nickIsInvalid = () => {
    if (nick == "") return false;
  };

  const checkAndSaveNick = () => {
    if (nickIsInvalid()) notify("apelido inválido");

    localStorage.setItem("nick", nick);
    setHasNick(true);
  };

  return (
    <div>
      {!hasNick && (
        <div className="absolute absolute-center p-5 bg-dark drop-shadow-2xl flex flex-col  rounded-lg">
          <div className="flex flex-col h-full gap-3 justify-center items-center">
            <div className="flex flex-col gap-5 input-name">
              <div className="text-2xl text-white text-center">
                Qual seu apelido?
              </div>
              <input
                onChange={(evt) => setNick(evt.target.value)}
                type="text"
                className="p-2 outline-0"
              />
              <button onClick={checkAndSaveNick} className="cursor-pointer">
                VAMOS LÁ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
