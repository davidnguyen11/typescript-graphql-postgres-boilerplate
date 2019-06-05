export interface TodoListItem {
  id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export interface InputTodoListItem {
  content: string;
}
