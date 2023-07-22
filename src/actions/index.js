export const addTodo = (data) => {
  return {
    type: "ADD_TODO",
    payload: {
      id: new Date().getTime().toString(),
      data: data,
    },
  };
};

export const editTodo = (id, data) => ({
  type: "EDIT_TODO",
  payload: {
    id: id,
    data: data,
  },
});

export const deleteTodo = (id) => {
  return {
    type: "DELETE_TODO",
    id,
  };
};

export const removeTodo = () => {
  return {
    type: "REMOVE_TODO",
  };
};

// export const loadTodo = (todos) => {
//   return {
//     type: "LOAD_TODO",
//     payload: todos,
//   };
// };
