export interface CellType {
  x: number;
  y: number;
  ownerId: string;
  color: string;
}

export interface PersistentUser {
  userId: string;
  color: string;
}

export interface LeaderboardUser {
  userId: string;
  color: string;
  blocks: number;
  online: boolean;
}

export interface CellProps {
  x: number;
  y: number;
  data?: CellType;
  userId: string;
  userColor: string;
}

export interface GridProps {
  size: number;
  cells: Record<string, CellType>;
  userId: string;
  userColor: string;
}

export interface LeaderboardProps {
  open: boolean;
  onClose: () => void;
  leaderboard: LeaderboardUser[];
  currentUserId: string;
}
