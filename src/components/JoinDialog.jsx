import { useRef } from "react";
import { socket } from "../utils/socket";

let charsTypeds = ["", "", "", ""];
let inputsTypeds = 0;

const INDEXES = [0, 1, 2, 3];

export const JoinDialog = ({ showDialog }) => {
  let inputsRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleInput = ({ target }, id) => {
    const charTyped = target.value;
    if (charTyped == "" && charsTypeds[id] != "") return inputsTypeds--;

    if (charsTypeds[id] == "") inputsTypeds++;
    charsTypeds[id] = charTyped;

    if (allInputsTypeds()) {
      return join();
    }

    inputsRefs[(id + 1) % inputsRefs.length].current.focus();
  };

  const join = () => {
    let roomId = charsTypeds.join("");
    socket.joinRoom(roomId);

    resetFlags();
  };

  const resetFlags = () => {
    charsTypeds = ["", "", "", ""];
    inputsTypeds = 0;
    showDialog(false);
  };

  const allInputsTypeds = () => inputsTypeds == 4;

  return (
    <div className="absolute absolute-center w-4/5 h-2/6 md:w-1/3 md:h-2/5 bg-dark drop-shadow-2xl flex flex-col p-5 rounded-lg">
      <div className="text-2xl text-white text-center">Qual o id da sala?</div>
      <div className="flex place-content-around grow input-container gap-3 ">
        {INDEXES.map((index) => (
          <input
            key={index}
            maxLength="1"
            ref={inputsRefs[index]}
            onChange={(evt) => handleInput(evt, index)}
            className="w-1/4"
            type="text"
          />
        ))}
      </div>
    </div>
  );
};
