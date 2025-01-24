"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '../app/services/api';

type ToDoItem = {
  id: number;
  subject: string;
  description: string;
};

export default function ToDoList() {
  const router = useRouter();
  const [tasks, setTasks] = useState<ToDoItem[]>([]);
  const [subject, setsubject] = useState('');
  const [description, setdescription] = useState('');
  // const [editingTask, setEditingTask] = useState<ToDoItem | null>(null);

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
      const userId = localStorage.getItem('userId');
      const response = await api.get('/task/userid', {
        params: {
          userId
        }});
        console.log(response)
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to load to-do list:', error);
    }
  };

  // Add task
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/task', { subject, description, userId: localStorage.getItem('userId') });
      setsubject('');
      fetchToDoList();
    } catch (error) {
      console.error('Error adding/updating task:', error);
    }
  };

  // Delete task
  const handleDelete = async (taskId: number) => {
    try {
      await api.delete(`/task`, {
        params: {
          taskId
        }});
      fetchToDoList();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
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
            placeholder="Enter task subject"
            value={subject}
            onChange={(e) => setsubject(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            required
          />
          <button type="submit">Add Task</button>
        </form>

        <ul className="todo-list">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task.id}>
                <span className="task-name">
                  {task.subject} - {task.description}
                </span>
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
