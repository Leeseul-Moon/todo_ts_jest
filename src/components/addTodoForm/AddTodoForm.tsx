import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoItem } from '../../models/todo';
import styles from './AddTodoForm.module.css';

interface Props {
  onAdd: (todo: TodoItem) => void;
}

function AddTodoForm({ onAdd }: Props) {
  const [text, setText] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      return;
    }
    onAdd({ id: uuidv4(), text, status: 'active' });
    setText('');
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Add Todo"
        value={text}
        onChange={handleChange}
      />
      <button className={styles.button}>Add</button>
    </form>
  );
}

export default AddTodoForm;
