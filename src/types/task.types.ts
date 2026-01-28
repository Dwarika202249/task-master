export type Priority = 'high' | 'medium' | 'low';
export type Filter = 'all' | 'active' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}