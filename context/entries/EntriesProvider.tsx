import { FC, ReactNode, useEffect, useReducer } from 'react';
import { v4 as uuidv4, v4 } from 'uuid';
import { entriesApi } from '../../apis';

import { Entry } from '../../interfaces';
import { EntriesContext, EntriesReducer } from './';

interface Props {
  children: ReactNode;
}
export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(EntriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = (desc: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description: desc,
      createdAt: Date.now(),
      status: 'pending',
    };

    dispatch({ type: '[Entry] - Add-Entry', payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: '[Entry] - Update-Entry', payload: entry });
  };

  // It executes the first time the app is load
  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: '[Entry] - Refresh-Data', payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
