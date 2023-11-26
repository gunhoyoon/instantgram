export type Store = {
  counter: {
    number: number;
  };
  todos: Todos;
};

export type InitType = {
  id?: number;
  text?: string;
  done?: boolean;
};

export type Action = {
  type: string;
  payload: {
    id: number;
    text: string;
    done: boolean;
  };
};

export type Todo = {
  id: number;
  text: string;
  done: boolean;
}; // todo엔 무조건 있는 타입

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
