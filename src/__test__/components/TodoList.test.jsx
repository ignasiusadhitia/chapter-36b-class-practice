import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import TodoList from "../../components/redux/TodoList";
import todoReducer from "../../components/redux/todoSlice";

// Helper function untuk membungkus komponen dengan Redux Provider
const renderWithRedux = (
  component,
  {
    initialState,
    store = configureStore({
      reducer: { todos: todoReducer },
      preloadedState: initialState,
    }),
  } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe("TodoList component", () => {
  test("renders an empty todo list initially", () => {
    renderWithRedux(<TodoList />);
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument(); // Pastikan daftar kosong
  });

  test("adds a new todo", () => {
    renderWithRedux(<TodoList />);
    fireEvent.change(screen.getByPlaceholderText(/add a new todo/i), {
      target: { value: "Learn Redux" },
    }); // Isi input
    fireEvent.click(screen.getByText(/add todo/i)); // Klik tombol "Add Todo"
    expect(screen.getByText("Learn Redux")).toBeInTheDocument(); // Pastikan todo baru ditambahkan
  });

  test("removes a todo", () => {
    renderWithRedux(<TodoList />, {
      initialState: {
        todos: {
          items: [{ id: 1, text: "Learn Redux" }],
        },
      },
    });
    fireEvent.click(screen.getByText(/remove/i)); // Klik tombol "Remove"
    expect(screen.queryByText("Learn Redux")).not.toBeInTheDocument(); // Pastikan todo dihapus
  });
});
