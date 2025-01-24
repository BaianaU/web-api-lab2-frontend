"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

type ToDoItem = {
  id: number;
  taskName: string;
  completed: boolean;
};

export default function ToDoList() {
  const router = useRouter();
  const [tasks, setTasks] = useState<ToDoItem[]>([]);
  const [taskName, setTaskName] = useState('');
  const [editingTask, setEditingTask] = useState<ToDoItem | null>(null);

  // Redirect if user is not logged in
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/login');
    } else {
      fetchToDoList();
    }
  }, []);

  // Fetch to-do list
  const fetchToDoList = async () => {
    try {
      const response = await api.get('/todos');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to load to-do list:', error);
    }
  };

  // Add or update task
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await api.put(`/todos/${editingTask.id}`, { taskName, completed: editingTask.completed });
        setEditingTask(null);
      } else {
        await api.post('/todos', { taskName, completed: false, userId: localStorage.getItem('userId') });
      }
      setTaskName('');
      fetchToDoList();
    } catch (error) {
      console.error('Error adding/updating task:', error);
    }
  };

  // Delete task
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/todos/${id}`);
      fetchToDoList();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Mark task as completed
  const toggleCompleted = async (task: ToDoItem) => {
    try {
      await api.put(`/todos/${task.id}`, { taskName: task.taskName, completed: !task.completed });
      fetchToDoList();
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  // Handle edit action
  const handleEdit = (task: ToDoItem) => {
    setTaskName(task.taskName);
    setEditingTask(task);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('userId');
    router.push('/login');
  };

  return (
    <div className="container">
      <div className="todo-wrapper">
        <h1>Your To-Do List</h1>
        
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Enter task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
          <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
        </form>

        <ul className="todo-list">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task.id} className={`list-item ${task.completed ? 'completed' : ''}`}>
                <span onClick={() => toggleCompleted(task)} className="task-name">
                  {task.taskName} {task.completed ? '(Completed)' : ''}
                </span>
                <button onClick={() => handleEdit(task)} className="btn-edit">Edit</button>
                <button onClick={() => handleDelete(task.id)} className="btn-delete">Delete</button>
              </li>
            ))
          ) : (
            <p>No tasks found</p>
          )}
        </ul>

        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>
    </div>
  );
}
