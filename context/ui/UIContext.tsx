/**
 * There is only the creation and export of the context
 * Here can be found only the state of the context
 */

import { createContext } from 'react';

interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (set: boolean) => void;
  setIsDragging: (isDragging: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
