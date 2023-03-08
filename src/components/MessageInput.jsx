import { useRef, useState } from "react";
import { socket } from "../utils/socket";

const MAX_LINES_INPUT = 3;
const SCROLL_HEIGHT = 24;

export const MessageInput = () => {
  const [message, setMessage] = useState();
  let textareaElement = useRef();

  function resetInputHeight() {
    textareaElement.current.style.height = `${SCROLL_HEIGHT}px`;
  }

  function handleMessageInput(evt) {
    setMessage(evt.target.value);
    resetInputHeight();

    const { scrollHeight } = textareaElement.current;

    const maxInputHeight = MAX_LINES_INPUT * SCROLL_HEIGHT;

    textareaElement.current.style.height = `${scrollHeight}px`;

    if (scrollHeight > maxInputHeight) {
      textareaElement.current.style.height = `${maxInputHeight}px`;
    }
  }

  function send() {
    textareaElement.current.value = "";
    resetInputHeight();
    socket.sendMessage(message);
  }

  return (
    <div className=" flex grow-0 bg-secondary rounded-3xl p-1">
      <textarea
        ref={textareaElement}
        onChange={handleMessageInput}
        name=""
        id=""
        cols="30"
        rows="1"
        className="text-white grow bg-none px-2 m-2 outline-0 no-resize "
      ></textarea>
      <div className="grid place-content-center">
        <button
          className="rounded-full bg-dark text-white aspect-square w-10 fa-solid fa-paper-plane"
          onClick={send}
        />
      </div>
    </div>
  );
};
