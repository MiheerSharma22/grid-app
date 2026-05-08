import React, { useEffect, useState } from "react";
import { socket } from "./socket";
import Grid from "./components/Grid";

const SIZE = 20;

export default function App() {
  const [cells, setCells] = useState({});

  const userId = React.useMemo(
    () => Math.random().toString(36).substring(2, 8),
    [],
  );

  const userColor = React.useMemo(
    () => "#" + Math.floor(Math.random() * 16777215).toString(16),
    [],
  );

  useEffect(() => {
    socket.on("init_grid", (data) => {
      const map = {};
      data.forEach((cell) => {
        map[`${cell.x}-${cell.y}`] = cell;
      });
      setCells(map);
    });

    socket.on("cell_updated", (cell) => {
      setCells((prev) => ({
        ...prev,
        [`${cell.x}-${cell.y}`]: cell,
      }));
    });

    return () => {
      socket.off();
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Shared Grid</h1>
      <Grid size={SIZE} cells={cells} userId={userId} userColor={userColor} />
    </div>
  );
}
