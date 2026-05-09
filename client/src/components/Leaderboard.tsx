import { AnimatePresence, motion } from "framer-motion";

import { type LeaderboardUser } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  leaderboard: LeaderboardUser[];
  currentUserId: string;
}

export default function Leaderboard({
  open,
  onClose,
  leaderboard,
  currentUserId,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="
              fixed
              inset-0
              bg-black/60
              backdrop-blur-sm
              z-40
            "
          />

          <motion.div
            initial={{
              x: 450,
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: 450,
            }}
            transition={{
              type: "spring",
              damping: 24,
            }}
            className="
              fixed
              right-0
              top-0
              h-screen
              w-[380px]
              bg-[#0f1115]
              border-l
              border-white/10
              z-50
              p-6
              overflow-y-auto
              shadow-2xl
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                mb-8
              "
            >
              <h2
                className="
                  text-3xl
                  font-black
                "
              >
                Leaderboard
              </h2>

              <button
                onClick={onClose}
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-white/5
                  hover:bg-white/10
                  transition
                "
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {leaderboard.map((user, index) => {
                const isMe = user.userId === currentUserId;

                return (
                  <motion.div
                    key={user.userId}
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.03,
                    }}
                    className={`
                      relative
                      rounded-2xl
                      p-4
                      border
                      backdrop-blur-xl
                      transition
                      ${
                        isMe
                          ? "border-white/30 bg-white/10 scale-[1.02]"
                          : "border-white/5 bg-white/[0.03]"
                      }
                    `}
                  >
                    {isMe && (
                      <div
                        className="
                          absolute
                          top-6
                          right-20 
                          text-[0.6rem]
                          px-2
                          py-0.5
                          rounded-md
                          text-grey-500
                          font-bold
                        "
                      >
                        You
                      </div>
                    )}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="
                            text-zinc-500
                            font-bold
                            text-lg
                            w-6
                          "
                        >
                          #{index + 1}
                        </div>

                        <div
                          className="
                            w-4
                            h-4
                            rounded-full
                          "
                          style={{
                            background: user.color,
                          }}
                        />

                        <div>
                          <div className="font-semibold">{user.userId}</div>

                          <div
                            className={`
                              text-xs
                              ${
                                user.online ? "text-green-400" : "text-zinc-500"
                              }
                            `}
                          >
                            ● {user.online ? "Online" : "Offline"}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className="
                            text-2xl
                            font-black
                          "
                        >
                          {user.blocks}
                        </div>

                        <div
                          className="
                            text-xs
                            text-zinc-500
                          "
                        >
                          blocks
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
