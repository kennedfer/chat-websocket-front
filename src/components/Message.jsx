import { socket } from "../utils/socket";

export const Message = ({ nick, type, message }) => {
  return (
    <div className={`flex ${type}-message`}>
      <div className="max-w-50">
        <div className="text-white bg-secondary message">
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
};
