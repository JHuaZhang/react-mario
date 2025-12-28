import React from 'react';
import { makeAutoObservable } from 'mobx';
import { FormModel } from 'react-antd-xform';

interface Store {
  model: FormModel;
}

export class ConfigStore implements Store {
  model = new FormModel({});

  constructor() {
    makeAutoObservable(this, {});
  }
}

export const StoreContext = React.createContext<ConfigStore>({} as ConfigStore);

export function useStore() {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error('You have forgot to use StoreProvider, shame on you.');
  }
  return store;
}
