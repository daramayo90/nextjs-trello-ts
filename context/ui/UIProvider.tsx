/**
 * It defines the state and how it looks the application
 * Es el que proveerá de toda la información a la aplicación
 */

import { FC, ReactNode, useReducer } from 'react';
import { UIContext, UIReducer } from './';

interface Props {
  children: ReactNode;
}

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: 'UI - Open Sidebar' });
  };

  const closeSideMenu = () => {
    dispatch({ type: 'UI - Close Sidebar' });
  };

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: 'UI - Set isAddingEntry', payload: isAdding });
  };

  const setIsDragging = (isDragging: boolean) => {
    dispatch({ type: 'UI - Set isDragging', payload: isDragging });
  };

  return (
    <UIContext.Provider
      value={{ ...state, openSideMenu, closeSideMenu, setIsAddingEntry, setIsDragging }}>
      {children}
    </UIContext.Provider>
  );
};
