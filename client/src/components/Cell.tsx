import { motion } from "framer-motion";

import { socket } from "../socket";
import { type CellType } from "../App";

interface Props {
  x: number;
  y: number;
  data?: CellType;
  userId: string;
  userColor: string;
}

export default function Cell({ x, y, data, userId, userColor }: Props) {
  const claimed = Boolean(data);

  const isMine = data?.ownerId === userId;

  const handleClick = () => {
    if (claimed) return;

    socket.emit("claim_cell", {
      x,
      y,
      userId,
      color: userColor,
    });
  };

  return (
    <motion.div
      onClick={handleClick}
      whileHover={
        !claimed
          ? {
              scale: 1.18,
              zIndex: 10,
            }
          : {}
      }
      whileTap={
        !claimed
          ? {
              scale: 0.92,
            }
          : {}
      }
      animate={{
        backgroundColor: claimed ? data?.color : "#18181b",
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      className="
        relative
        w-6
        h-6
        border
        border-white/5
        cursor-pointer
      "
      style={{
        boxShadow: claimed ? `0 0 12px ${data?.color}55` : "none",
      }}
    >
      {!claimed && (
        <motion.div
          className="
            absolute
            inset-0
            bg-white
            opacity-0
          "
          whileHover={{
            opacity: 0.05,
          }}
        />
      )}

      {isMine && (
        <motion.div
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="
            absolute
            inset-0
            border-2
            border-white
            pointer-events-none
          "
        />
      )}
    </motion.div>
  );
}
