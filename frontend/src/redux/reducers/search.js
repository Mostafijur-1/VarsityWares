// src/reducer.js
const initialState = {
  name: "search",
  searchTerm: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
