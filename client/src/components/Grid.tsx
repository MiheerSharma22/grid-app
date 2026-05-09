import { motion } from "framer-motion";

import Cell from "./Cell";
import { type CellType } from "../App";

interface Props {
  size: number;
  cells: Record<string, CellType>;
  userId: string;
  userColor: string;
}

export default function Grid({ size, cells, userId, userColor }: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.4,
      }}
      whileHover={{
        scale: 1.01,
      }}
      className="
        bg-white/[0.03]
        backdrop-blur-xl
        border
        border-white/10
        rounded-3xl
        p-4
        shadow-2xl
      "
    >
      {Array.from({ length: size }).map((_, y) => (
        <div key={y} className="flex">
          {Array.from({ length: size }).map((_, x) => {
            const key = `${x}-${y}`;

            return (
              <Cell
                key={key}
                x={x}
                y={y}
                data={cells[key]}
                userId={userId}
                userColor={userColor}
              />
            );
          })}
        </div>
      ))}
    </motion.div>
  );
}
