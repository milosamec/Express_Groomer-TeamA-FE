import { POPULATE } from '../actions/index';

const initialState = {
  profiles: [],
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case POPULATE:
      console.log(action.payload);
      return {
        ...state,
        profiles: state.profiles.append(action.payload),
      };

    default:
      return state;
  }
};
