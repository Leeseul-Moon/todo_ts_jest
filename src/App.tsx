import React, { useState } from 'react';
import Header from './components/header/Header';
import TodoList from './components/todoList/TodoList';
import { DarkModeProvider } from './contexts/DarkModeContext';

function App() {
  const filters = ['all', 'active', 'completed'];
  const [filter, setFilter] = useState<string>('all');
  return (
    <DarkModeProvider>
      <>
        <Header filters={filters} filter={filter} onFilterChange={setFilter} />
        <TodoList filter={filter} />
      </>
    </DarkModeProvider>
  );
}

export default App;
