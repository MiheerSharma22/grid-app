import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { socket } from "./socket";
import Grid from "./components/Grid";
import Leaderboard from "./components/Leaderboard";

import { getOrCreateUser, type PersistentUser } from "./utils/user";

import { type LeaderboardUser } from "./types";

export interface CellType {
  x: number;
  y: number;
  ownerId: string;
  color: string;
}

function App() {
  const [cells, setCells] = useState<Record<string, CellType>>({});

  const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

  const [user] = useState<PersistentUser>(getOrCreateUser());

  useEffect(() => {
    socket.emit("register_user", {
      userId: user.userId,
      color: user.color,
    });

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

    socket.on("leaderboard_update", (data: LeaderboardUser[]) => {
      setLeaderboard(data);
    });

    return () => {
      socket.off("init_grid");
      socket.off("cell_updated");
      socket.off("leaderboard_update");
    };
  }, []);

  const myRank = useMemo(() => {
    return leaderboard.findIndex((u) => u.userId === user.userId) + 1;
  }, [leaderboard]);

  const onlineUsers = leaderboard.filter((u) => u.online).length;

  return (
    <div
      className="
        min-h-screen
        bg-[#09090b]
        text-white
        overflow-hidden
        relative
      "
    >
      {/* Background glow */}
      <div
        className="
          absolute
          top-[-150px]
          left-[-100px]
          w-[400px]
          h-[400px]
          rounded-full
          blur-[120px]
          opacity-20
        "
        style={{
          background: user.color,
        }}
      />

      <div
        className="
          relative
          z-10
          px-6
          py-8
          flex
          flex-col
          items-center
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
          }}
          className="
            backdrop-blur-xl
            bg-white/5
            border
            border-white/10
            rounded-3xl
            px-8
            py-6
            mb-8
            shadow-2xl
            text-center
          "
        >
          <h1
            className="
              text-5xl
              font-black
              tracking-tight
            "
          >
            Shared Grid
          </h1>

          <div
            className="
              flex
              items-center
              justify-center
              gap-3
              mt-5
            "
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
              className="
                w-4
                h-4
                rounded-full
              "
              style={{
                background: user.color,
              }}
            />

            <span
              className="
                text-sm
                text-zinc-300
              "
            >
              {user.userId}
            </span>
          </div>

          <div
            className="
              flex
              items-center
              justify-center
              gap-6
              mt-6
            "
          >
            <div>
              <div className="text-2xl font-bold">{onlineUsers}</div>

              <div className="text-xs text-zinc-500">Online</div>
            </div>

            <div>
              <div className="text-2xl font-bold">#{myRank || "-"}</div>

              <div className="text-xs text-zinc-500">Your Rank</div>
            </div>
          </div>

          <motion.button
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={() => setLeaderboardOpen(true)}
            className="
              mt-7
              px-6
              py-3
              rounded-2xl
              font-semibold
              text-black
              shadow-lg
              cursor-pointer
            "
            style={{
              background: user.color,
            }}
          >
            Open Leaderboard
          </motion.button>
        </motion.div>

        <Grid
          size={25}
          cells={cells}
          userId={user.userId}
          userColor={user.color}
        />

        <Leaderboard
          open={leaderboardOpen}
          onClose={() => setLeaderboardOpen(false)}
          leaderboard={leaderboard}
          currentUserId={user.userId}
        />
      </div>
    </div>
  );
}

export default App;
