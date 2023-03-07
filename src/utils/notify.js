import { toast } from "react-hot-toast";

export const notify = (message) => {
  const style = {
    style: {
      borderRadius: "10px",
      background: "#373e4e",
      color: "#fff",
    },
  };

  toast(message, style);
};
