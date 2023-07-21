import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, removeTodo, editTodo } from "../actions/index";
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
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <figcaption>Add your List here...</figcaption>
          </figure>

          {/* ////////////////  Add List //// */}

          <div className="addItems">
            <input
              type="text"
              placeholder="Add Items..."
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            <i
              className="fa fa-plus add-btn"
              onClick={() => dispatch(addTodo(inputData), setInputData(""))}
            ></i>
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
                      onClick={() => dispatch(deleteTodo(element.id))}
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
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
