import { Reducer } from "redux";
import { CardState, CardTypes } from "./types";

const INITIAL_STATE = [
  
];

const reducer: Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CardTypes.ADD_TO_CART: 
      return [...state, action.payload]
    case CardTypes.REMOVE_ITEM:
      return state.filter((item) => item.id != action.payload);
    default:
      return state;
  }
};

export default reducer;
