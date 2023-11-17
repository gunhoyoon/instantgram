export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export type Todos = Todo[];

export type ModifyTodo = (id: number, text: string) => void;

export type RomoveTodo = (id: number) => {
  type: string;
  payload: {
    id: number;
  };
};

export type ToggleTodo = (id: number) => {
  type: string;
  payload: {
    id: number;
  };
};
