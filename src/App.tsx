import React, { useState } from 'react';
import Header from './components/header/Header';
import TodoList, {
  readTodosFromLocalStorage,
} from './components/todoList/TodoList';
import { DarkModeProvider } from './contexts/DarkModeContext';
import TodoPresenter from './components/todoList/todo_presenter';

function App() {
  const filters = ['all', 'active', 'completed'];
  const [filter, setFilter] = useState<string>('all');

  const presenter = new TodoPresenter(readTodosFromLocalStorage());

  return (
    <DarkModeProvider>
      <>
        <Header filters={filters} filter={filter} onFilterChange={setFilter} />
        <TodoList filter={filter} presenter={presenter} />
      </>
    </DarkModeProvider>
  );
}

export default App;
