import { Dispatch, SetStateAction } from 'react';
import { TodoItem } from './models/todo';

export default class TodoPresenter {
  todos: TodoItem[];

  constructor(todos: TodoItem[]) {
    this.todos = todos;
  }

  setTodos(todos: TodoItem[]) {
    this.todos = todos;
  }

  getTodos() {
    return this.todos;
  }

  add(todo: TodoItem, update: Dispatch<SetStateAction<TodoItem[]>>) {
    update([...this.todos, todo]);
  }

  check(todo: TodoItem, update: Dispatch<SetStateAction<TodoItem[]>>) {
    update(this.todos.map((t: TodoItem) => (t.id === todo.id ? todo : t)));
  }

  remove(todo: TodoItem, update: Dispatch<SetStateAction<TodoItem[]>>) {
    update(this.todos.filter((t: TodoItem) => t.id !== todo.id));
  }
}
