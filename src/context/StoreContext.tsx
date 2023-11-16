"use client";
import rootReduer from "@/modules";
import { composeWithDevTools } from "redux-devtools-extension";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
type Props = {
  children: React.ReactNode;
};

const store = createStore(rootReduer, composeWithDevTools());
// console.log(store.getState());
export default function StoreContext({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
