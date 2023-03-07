import { Message } from "./Message";
import { useIsInvisible } from "../hooks/invisible-hook";
import { useEffect, useRef, useState } from "react";
import { socket } from "../utils/socket.js";

export const Chat = () => {
  const [messages, setMessages] = useState([]);

  let bottomPlaceholder = useRef();
  const placeholderIsVisible = useIsInvisible(bottomPlaceholder);

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
        {messages.map(({ userId, data }, i) => (
          <Message
            type={
              userId == socket.getUserId()
                ? "user"
                : userId == "decorator"
                ? "decorator"
                : "group"
            }
            key={i}
            message={data}
            nick={userId}
          />
        ))}
        <div ref={bottomPlaceholder}></div>
      </div>
    </div>
  );
};
