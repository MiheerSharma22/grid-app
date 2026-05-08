import { useEffect, useState } from "react";
import { socket } from "./socket";
import Grid from "./components/Grid";
import { getOrCreateUser, type PersistentUser } from "./utils/user";

export interface CellType {
  x: number;
  y: number;
  ownerId: string;
  color: string;
}

function App() {
  const [cells, setCells] = useState<Record<string, CellType>>({});

  const [user] = useState<PersistentUser>(getOrCreateUser());

  useEffect(() => {
    socket.on("init_grid", (data: CellType[]) => {
      const mapped: Record<string, CellType> = {};

      data.forEach((cell) => {
        mapped[`${cell.x}-${cell.y}`] = cell;
      });

      setCells(mapped);
    });

    socket.on("cell_updated", (cell: CellType) => {
      setCells((prev) => ({
        ...prev,
        [`${cell.x}-${cell.y}`]: cell,
      }));
    });

    return () => {
      socket.off("init_grid");
      socket.off("cell_updated");
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1115] text-white flex flex-col items-center p-8">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Real-Time Shared Grid
        </h1>

        <p className="text-zinc-400 mt-2">
          Capture blocks live with other users
        </p>

        <div className="flex items-center justify-center gap-3 mt-4">
          <div
            className="w-4 h-4 rounded-full"
            style={{
              background: user.color,
            }}
          />

          <span className="text-sm text-zinc-300">User ID: {user.userId}</span>
        </div>
      </div>

      <Grid
        size={25}
        cells={cells}
        userId={user.userId}
        userColor={user.color}
      />
    </div>
  );
}

export default App;
