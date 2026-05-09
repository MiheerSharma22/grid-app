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
  "#FF7675",
  "#74B9FF",
  "#81ECEC",
  "#FAB1A0",
  "#FFEAA7",
  "#B2BEC3",
  "#E84393",
  "#D63031",
  "#00B8D4",
  "#2962FF",
  "#AA00FF",
  "#C51162",
  "#FF6D00",
  "#64DD17",
  "#00C853",
  "#00E5FF",
  "#6200EA",
  "#FF1744",
  "#F50057",
  "#D500F9",
  "#651FFF",
  "#3D5AFE",
  "#2979FF",
  "#00B0FF",
  "#00E676",
  "#76FF03",
  "#C6FF00",
  "#FFEA00",
  "#FFC400",
  "#FF9100",
  "#FF3D00",
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#EAB308",
  "#84CC16",
  "#22C55E",
  "#10B981",
  "#14B8A6",
  "#06B6D4",
  "#0EA5E9",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#A855F7",
  "#D946EF",
  "#EC4899",
  "#F43F5E",
  "#FB7185",
  "#FDBA74",
  "#FDE047",
  "#BEF264",
  "#86EFAC",
  "#5EEAD4",
  "#67E8F9",
  "#7DD3FC",
  "#93C5FD",
  "#A5B4FC",
  "#C4B5FD",
  "#D8B4FE",
  "#F0ABFC",
  "#F9A8D4",
  "#FDA4AF",
  "#B91C1C",
  "#C2410C",
  "#A16207",
  "#4D7C0F",
  "#15803D",
  "#0F766E",
  "#0369A1",
  "#1D4ED8",
  "#4338CA",
  "#7E22CE",
  "#BE185D",
  "#9F1239",
  "#FFB703",
  "#FB8500",
  "#219EBC",
  "#8ECAE6",
  "#023047",
  "#8338EC",
  "#3A86FF",
  "#FF006E",
  "#FB5607",
  "#2EC4B6",
  "#E71D36",
  "#FF9F1C",
  "#9B5DE5",
  "#F15BB5",
  "#FEE440",
  "#00BBF9",
  "#00F5D4",
  "#06D6A0",
  "#118AB2",
  "#EF476F",
  "#FFD166",
  "#073B4C",
  "#7B2CBF",
  "#5A189A",
  "#B5179E",
  "#F72585",
  "#4CC9F0",
  "#4895EF",
  "#4361EE",
  "#3F37C9",
  "#7209B7",
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
