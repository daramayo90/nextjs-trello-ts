/**
 * Trabaja de la sig manera
 * Es una func pura, porque debe de resolver todo lo que tiene
 * O todos los valores de retorno solo con los valores que recibe
 * No tiene ninguna interacción con el mundo exterior
 * No se usa localStorage, ni tampoco logs
 * Debe resolver todo, sin salir de la función
 * El reducer es una función sumamente sencilla
 * Simplemente recibe un estado, una acción y produce un nuevo estado
 * El reducer no puede ser asyncrono
 * Se recomienda poner el valor de retorno
 *
 * Las acciones van a tener un tipo, y dependiendo el tipo se harán los cases
 * Ese tipo va a saber qué información hay que cambiar o manipular el estado
 * Se espere que siempre reciba un nuevo estado, no una mutación del estado
 * Eso quiere decir que no va a poder hacer algo como sidemenuOpen = true
 * Por que? Porque estoy cambiando la propiedad utilizando state.
 *
 * Como luce la accion?
 * type UIActionType = type: string
 *
 * El payload puede ser lo que nosotros queramos
 * El payload es la información que va a recibir para modificar o generar un nuevo estado
 *
 * En el switch se recomienda hacer el spread operator del state y luego modificar lo que necesitemos
 * Se regresa un nuevo estado
 *
 * Cuando se mande a llamar una acción del tipo 'UI - Open Sidebar',
 * lo único que se hace es cambiar el sidemenuOpen a true
 */

import { UIState } from './';

type UIActionType = { type: 'UI - Open Sidebar' } | { type: 'UI - Close Sidebar' };

export const UIReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'UI - Open Sidebar':
      return {
        ...state,
        sidemenuOpen: true,
      };

    case 'UI - Close Sidebar':
      return {
        ...state,
        sidemenuOpen: false,
      };

    default:
      return state;
  }
};
