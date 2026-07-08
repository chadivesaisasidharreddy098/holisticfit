export interface User {
  id: string;
  username: string;
  email: string;
  gender: string;
  coins: number;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  coins: number;
  completed: boolean;
  userId: string;
  createdAt: string;
  lastCompleted: string | null; // ISO string
  isCustom?: boolean;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  imageUrl: string;
  isCustom?: boolean;
}

export interface RedemptionCode {
  id: string;
  code: string;
  userId: string;
  rewardId: string;
  createdAt: string;
  used: boolean;
}
