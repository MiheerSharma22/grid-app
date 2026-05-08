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
      whileHover={!claimed ? { scale: 1.15 } : {}}
      whileTap={!claimed ? { scale: 0.92 } : {}}
      animate={{
        backgroundColor: claimed ? data?.color : "#232833",
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      className={`
        w-6
        h-6
        border
        relative
        cursor-pointer
        duration-200
        border-[#2d3442]
        ${!claimed ? "hover:border-zinc-500" : ""}
      `}
    >
      {claimed && (
        <>
          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.25,
            }}
            className="absolute inset-0"
            style={{
              background: data?.color,
            }}
          />

          {isMine && (
            <div
              className="
                absolute
                inset-0
                border-2
                border-white
                pointer-events-none
              "
            />
          )}
        </>
      )}
    </motion.div>
  );
}
