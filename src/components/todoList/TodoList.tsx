import React, { useEffect, useState } from 'react';
import { TodoItem } from '../../models/todo';
import AddTodoForm from '../addTodoForm/AddTodoForm';
import Todo from '../todo/Todo';
import styles from './TodoList.module.css';

interface Props {
  filter: string;
}

function TodoList({ filter }: Props) {
  const [todos, setTodos] = useState(() => readTodosFromLocalStorage());

  const handleAdd = (todo: TodoItem) => setTodos([...todos, todo]);
  const handleUpdate = (updated: TodoItem) =>
    setTodos(todos.map((t: TodoItem) => (t.id === updated.id ? updated : t)));
  const handleDelete = (deleted: TodoItem) =>
    setTodos(todos.filter((t: TodoItem) => t.id !== deleted.id));

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filtered = getFilteredItems(todos, filter);
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item: TodoItem) => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <AddTodoForm onAdd={handleAdd} />
    </section>
  );
}

function readTodosFromLocalStorage() {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}

function getFilteredItems(todos: TodoItem[], filter: string) {
  if (filter === 'all') {
    return todos;
  }
  return todos.filter(todo => todo.status === filter);
}

export default TodoList;
