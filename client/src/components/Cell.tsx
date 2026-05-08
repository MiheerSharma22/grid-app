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
      whileHover={!claimed ? { scale: 1.12 } : {}}
      whileTap={!claimed ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        backgroundColor: claimed ? data?.color : "#232833",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className={`
        w-6
        h-6
        border
        border-[#2d3442]
        cursor-pointer
        relative
        duration-200
      `}
    >
      {claimed && (
        <motion.div
          layoutId={`${x}-${y}`}
          className="
            absolute
            inset-0
            rounded-[2px]
          "
          style={{
            background: data?.color,
          }}
        />
      )}
    </motion.div>
  );
}
