/**
 * There is only the creation and export of the context
 * Here can be found only the state of the context
 */

import { createContext } from 'react';

interface ContextProps {
  sidemenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);
