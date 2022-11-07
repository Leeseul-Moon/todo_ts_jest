import React, { useEffect, useState } from 'react';
import { TodoItem } from '../../models/todo';
import TodoPresenter from './todo_presenter';
import AddTodoForm from '../addTodoForm/AddTodoForm';
import Todo from '../todo/Todo';
import styles from './TodoList.module.css';

interface Props {
  filter: string;
  presenter: TodoPresenter;
}

function TodoList({ filter, presenter }: Props) {
  const [todos, setTodos] = useState(presenter.getTodos());

  const handleAdd = (todo: TodoItem) => presenter.add(todo, setTodos);
  const handleUpdate = (todo: TodoItem) => presenter.check(todo, setTodos);
  const handleDelete = (todo: TodoItem) => presenter.remove(todo, setTodos);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    presenter.setTodos(readTodosFromLocalStorage());
  }, [todos, presenter]);

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

export function readTodosFromLocalStorage(): TodoItem[] {
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
