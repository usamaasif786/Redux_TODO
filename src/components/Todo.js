import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, removeTodo, editTodo } from "../actions/index";
import "../components/component.css";
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const list = useSelector((state) => state.todoReducers.list);
  const dispatch = useDispatch();

  const handleEdit = (id, currentData) => {
    setEditItemId(id);
    setInputData(currentData);
  };

  const handleSave = (id, newData) => {
    dispatch(editTodo(id, newData));
    setEditItemId(null);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Check if Enter key is pressed
      dispatch(addTodo(inputData));
      setInputData(""); // Clear the input field after adding the item
    }
  };

  /////////// To store our data into Local Database /////
  useEffect(() => {
    const storedList = localStorage.getItem("todoList");
    if (storedList) {
      dispatch({ type: "LOAD_TODO", payload: JSON.parse(storedList) });
    }
  }, [dispatch]);

  // Save data to localStorage whenever the todo list changes
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <figcaption>Add your List here...</figcaption>
          </figure>

          {/* ////////////////  Add List //// */}

          <div className="addItems">
            <div className="input-with-icon">
              <input
                type="text"
                placeholder="Add Items..."
                value={inputData}
                onChange={(event) => setInputData(event.target.value)}
                onKeyPress={handleKeyPress} // Call the handleKeyPress function on key press
              />
              <i
                className="fa fa-plus add-btn"
                onClick={() => {
                  if (inputData.trim() !== "") {
                    dispatch(addTodo(inputData));
                    setInputData("");
                  }
                }}
                // onClick={() => dispatch(addTodo(inputData), setInputData(""))}
              ></i>
            </div>
          </div>

          {/* ////////////////  Show List //// */}
          {/* <div className="showItems">
            {list.map((element) => {
              return (
                <div className="eachItem" key={element.id}>
                  <h3>{element.data}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-trash-alt add-btn"
                      title="Delete Item "
                      onClick={() =>
                        dispatch(deleteTodo(element.id), setInputData(""))
                      }
                    ></i>
                  </div>
                </div>
              );
            })}
          </div> */}
          {/* /////////////////  Edit List /// */}

          <div className="showItems">
            {list.map((element) => {
              return (
                <div className="eachItem" key={element.id}>
                  {editItemId === element.id ? (
                    <input
                      type="text"
                      value={inputData}
                      onChange={(e) => setInputData(e.target.value)}
                    />
                  ) : (
                    <h3>{element.data}</h3>
                  )}

                  <div className="todo-btn">
                    {editItemId === element.id ? (
                      <i
                        className="fa fa-save add-btn"
                        title="Save"
                        onClick={() => handleSave(element.id, inputData)}
                      ></i>
                    ) : (
                      <i
                        className="fa fa-edit add-btn"
                        title="Edit"
                        onClick={() => handleEdit(element.id, element.data)}
                      ></i>
                    )}

                    <i
                      className="far fa-trash-alt add-btn"
                      title="Delete Item"
                      onClick={() =>
                        dispatch(deleteTodo(element.id), setInputData(""))
                      }
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ////////////////  Remove All List //// */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="remove-All"
              onClick={() => dispatch(removeTodo())}
            >
              <span>Delete All List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
