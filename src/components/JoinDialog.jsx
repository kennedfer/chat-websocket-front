import { useRef } from "react";
import { socket } from "../utils/socket";

let _charsTypeds = {};
let _inputsTypeds = 0;

const INDEXES = [0, 1, 2, 3];

export const JoinDialog = ({ showDialog }) => {
  let _inputsRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleInput = ({ target }, id) => {
    const charTyped = target.value;
    if (charTyped == "") return _inputsTypeds--;

    _charsTypeds[id] = charTyped;
    _inputsTypeds++;

    if (_inputsTypeds == 4) {
      return join();
    }

    _inputsRefs[(id + 1) % _inputsRefs.length].current.focus();
  };

  const join = () => {
    let roomId = Object.values(_charsTypeds).join("");

    _charsTypeds = {};
    _inputsTypeds = 0;

    showDialog(false);
    socket.joinRoom(roomId);
  };

  return (
    <div className="absolute absolute-center w-4/5 h-2/6 md:w-1/3 md:h-2/5 bg-dark drop-shadow-2xl flex flex-col p-5 rounded-lg">
      <div className="text-2xl text-white text-center">Qual o id da sala?</div>
      <div className="flex place-content-around grow input-container gap-3 ">
        {INDEXES.map((index) => (
          <input
            key={index}
            maxLength="1"
            ref={_inputsRefs[index]}
            onChange={(evt) => handleInput(evt, index)}
            className="w-1/4"
            type="text"
          />
        ))}
      </div>
    </div>
  );
};
