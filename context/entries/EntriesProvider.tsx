import { FC, ReactNode, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';

import { EntriesContext, EntriesReducer } from './';
import { entriesApi } from '../../apis';
import { Entry } from '../../interfaces';

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
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    /*
    const newEntry: Entry = {
      _id: uuidv4(),
      description: description,
      createdAt: Date.now(),
      status: 'pending',
    };
    dispatch({ type: '[Entry] - Add-Entry', payload: newEntry });
    */

    const { data } = await entriesApi.post<Entry>('/entries', { description });
    dispatch({ type: '[Entry] - Add-Entry', payload: data });
  };

  const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
      dispatch({ type: '[Entry] - Update-Entry', payload: data });

      if (showSnackbar) {
        enqueueSnackbar('Entry updated', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
    } catch (error) {
      console.log({ error });
    }
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
