import { Dispatch, SetStateAction } from 'react';
import { TodoItem } from '../../models/todo';

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
    this.todos = [...this.todos, todo];
    update(this.todos);
  }

  check(todo: TodoItem, update: Dispatch<SetStateAction<TodoItem[]>>) {
    this.todos = this.todos.map((t: TodoItem) => (t.id === todo.id ? todo : t));
    update(this.todos);
  }

  remove(todo: TodoItem, update: Dispatch<SetStateAction<TodoItem[]>>) {
    this.todos = this.todos.filter((t: TodoItem) => t.id !== todo.id);
    update(this.todos);
  }
}
