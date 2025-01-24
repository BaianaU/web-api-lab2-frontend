/* eslint-disable @typescript-eslint/no-unused-vars */

import { useForm } from 'react-hook-form';
import { api } from '../services/api';

type ToDoItemData = {
  taskName: string;
  userId: number;
};

export default function ToDoListForm() {
  const { register, handleSubmit, reset } = useForm<ToDoItemData>();

  const onSubmit = async (data: ToDoItemData) => {
    try {
      await api.post('/todos', data); // API endpoint for adding a new task
      alert('Task added successfully');
      reset();
    } catch (error) {
      alert('Failed to add task');
    }
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('taskName', { required: true })}
          placeholder="Task Name"
        />
        <input
          {...register('userId', { required: true })}
          type="number"
          placeholder="User ID"
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
