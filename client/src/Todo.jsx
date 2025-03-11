import React from "react";

export default function Todo(props) {
  const { todo, setTodos } = props;

  // Function to update the status of a todo
  const updateTodo = async (todoId, todoStatus) => {
    try {
      const res = await fetch(`/api/todos/${todoId}`, {
        method: "PUT",
        body: JSON.stringify({ status: !todoStatus }), // Toggle the status
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();

      if (json.acknowledged) {
        // Update the todos state
        setTodos((currentTodos) =>
          currentTodos.map((currentTodo) =>
            currentTodo._id === todoId
              ? { ...currentTodo, status: !currentTodo.status }
              : currentTodo
          )
        );
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (todoId) => {
    const res = await fetch(`/api/todos/${todoId}`, {
        method: "DELETE"
    });
    const json = await res.json();
    
    if (json.acknowledged) {
        props.setTodos(currentTodos => {
            return currentTodos
                .filter((currentTodo) => (currentTodo._id !== todoId));
        });
    }
}

  return (
    <div className="todo">
      <p>{todo.todo}</p>
      <div className="mutations">
        <button
          className="todo__status"
          onClick={() => updateTodo(todo._id, todo.status)}
        >
          {todo.status ? "☑" : "☐"}
        </button>
        <button
          className="todo__delete"
          onClick={() => deleteTodo(todo._id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}