import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo } from "./todoSlice";

const TodoList = () => {
  const todos = useSelector((state) => state.todos.items);
  const dispatch = useDispatch();
  const [newtodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newtodo.trim() !== "") {
      dispatch(addTodo({ id: Date.now(), text: newtodo }));
      setNewTodo("");
    }
  };
  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Add a new todo"
        value={newtodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
