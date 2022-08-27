import { FC, ReactNode, useReducer } from 'react';
import { v4 as uuidv4, v4 } from 'uuid';

import { Entry } from '../../interfaces';
import { EntriesContext, EntriesReducer } from './';

interface Props {
  children: ReactNode;
}
export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'Pending: This is a new line to put something as an example',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: 'In-Progress: This is a new line to put something as an example',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description: 'Finished: This is a new line to put something as an example',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(EntriesReducer, Entries_INITIAL_STATE);

  return <EntriesContext.Provider value={{ ...state }}>{children}</EntriesContext.Provider>;
};
