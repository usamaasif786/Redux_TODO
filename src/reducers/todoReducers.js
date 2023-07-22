const initialData = {
  list: [],
};

const todoReducers = (state = initialData, action) => {
  switch (action.type) {
    case "ADD_TODO":
      const { id, data } = action.payload;
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: id,
            data: data,
          },
        ],
      };
    case "EDIT_TODO":
      const updatedList = state.list.map((item) =>
        item.id === action.payload.id
          ? { ...item, data: action.payload.data }
          : item
      );
      return {
        ...state,
        list: updatedList,
      };
    case "DELETE_TODO":
      const newList = state.list.filter((element) => element.id !== action.id);
      return {
        ...state,
        list: newList,
      };
    case "REMOVE_TODO":
      return {
        ...state,
        list: [],
      };
    // case "LOAD_TODO": // New case for loading todos from local storage
    //   return {
    //     ...state,
    //     list: action.payload,
    //   };

    default:
      return state;
  }
};

export default todoReducers;
