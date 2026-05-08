import React from "react";
import { socket } from "../socket";

type CellProps = {
  x: number;
  y: number;
  data: any;
  userId: string;
  userColor: string;
};

export default function Cell({ x, y, data, userId, userColor }: CellProps) {
  const handleClick = () => {
    if (data) return;

    socket.emit("claim_cell", {
      x,
      y,
      userId,
      color: userColor,
    });
  };

  return (
    <div
      onClick={handleClick}
      className="w-6 h-6 border cursor-pointer transition"
      style={{
        backgroundColor: data ? data.color : "#fff",
      }}
    />
  );
}
