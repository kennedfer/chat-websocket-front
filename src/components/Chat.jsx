import { Message } from "./Message";
import { useIsNotVisible } from "../hooks/invisible-hook";
import { useEffect, useRef, useState } from "react";
import { socket } from "../utils/socket.js";

export const Chat = () => {
  const [messages, setMessages] = useState([]);

  let bottomPlaceholder = useRef();
  const placeholderIsVisible = useIsNotVisible(bottomPlaceholder);

  useEffect(() => socket.bindMessagesHook(setMessages), []);

  const scrollToBottom = () => {
    bottomPlaceholder.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="grow relative h-full overflow-scroll">
      <div className="absolute red bottom-10 right-10">
        {!placeholderIsVisible && (
          <button
            onClick={scrollToBottom}
            className="z-10 bg-white secondary cursor-pointer drop-shadow-xl fixed fa-solid fa-arrow-down rounded-full text-white aspect-square w-10"
          ></button>
        )}
      </div>
      <div className="w-full flex flex-col g-1 gap-y-1 absolute overflow-scroll">
        {messages.map(({ userId, data, type }, i) => (
          <Message type={type} key={i} message={data} />
        ))}
        <div ref={bottomPlaceholder}></div>
      </div>
    </div>
  );
};
