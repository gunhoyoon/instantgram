type Store = {
  dispatch: Function;
  getState: Function;
};

type Next = Function;

type Action = {
  type: string;
  payload?: {};
};
