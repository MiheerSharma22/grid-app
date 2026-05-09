/* =========================
   FILE: src/utils/user.ts
========================= */

import { type PersistentUser } from "../types";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#FFD93D",
  "#6C5CE7",
  "#00B894",
  "#0984E3",
  "#E17055",
  "#FDCB6E",
  "#00CEC9",
  "#A29BFE",
  "#FD79A8",
  "#55EFC4",
];

const USER_STORAGE_KEY = "shared-grid-user";

function generateId() {
  return crypto.randomUUID().slice(0, 8);
}

function getRandomUnusedColor(): string {
  const usedColors =
    JSON.parse(localStorage.getItem("used-grid-colors") || "[]") || [];

  const available = COLORS.filter((color) => !usedColors.includes(color));

  const selected =
    available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : COLORS[Math.floor(Math.random() * COLORS.length)];

  localStorage.setItem(
    "used-grid-colors",
    JSON.stringify([...usedColors, selected]),
  );

  return selected;
}

export function getOrCreateUser(): PersistentUser {
  const existing = localStorage.getItem(USER_STORAGE_KEY);

  if (existing) {
    return JSON.parse(existing);
  }

  const newUser = {
    userId: generateId(),
    color: getRandomUnusedColor(),
  };

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));

  return newUser;
}
