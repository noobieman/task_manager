import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });

  const navigate = useNavigate();

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, [filter, searchTerm]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = {};
      
      if (filter !== 'all') {
        params.status = filter;
      }
      
      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await api.get('/api/tasks', { params });
      const normalized = (response.data.tasks || []).map(t => ({
        ...t,
        id: t.id || t._id,
      }));
      setTasks(normalized);
      setError('');
    } catch (err) {
      console.error('Fetch tasks error:', err);
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to fetch tasks. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        // Update existing task
        await api.put(`/api/tasks/${editingTask.id || editingTask._id}`, formData);
        setSuccess('Task updated successfully!');
      } else {
        // Create new task
        await api.post('/api/tasks', formData);
        setSuccess('Task created successfully!');
      }
      
      setShowModal(false);
      setFormData({ title: '', description: '', status: 'pending' });
      setEditingTask(null);
      fetchTasks(); // Refresh the task list
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Save task error:', err);
      if (err.response?.data?.errors) {
        setError(err.response.data.errors[0].msg);
      } else {
        setError('Failed to save task. Please try again.');
      }
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status
    });
    setShowModal(true);
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await api.delete(`/api/tasks/${taskId}`);
      setSuccess('Task deleted successfully!');
      fetchTasks(); // Refresh the task list
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Delete task error:', err);
      setError('Failed to delete task. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
    setFormData({ title: '', description: '', status: 'pending' });
    setError('');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'in-progress': return 'status-in-progress';
      default: return 'status-pending';
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <div className="spinner-border text-purple" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <span className="navbar-brand">
            <i className="fas fa-tasks me-2 text-purple"></i>
            Task Manager
          </span>
          <div className="navbar-nav ms-auto">
            <button className="btn btn-outline-purple" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt me-1"></i> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        {/* Alerts */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}
        
        {success && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {success}
            <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
          </div>
        )}

        {/* Dashboard Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">My Tasks</h1>
          <button 
            className="btn btn-purple"
            onClick={() => setShowModal(true)}
          >
            <i className="fas fa-plus me-2"></i> Add New Task
          </button>
        </div>

        {/* Filters and Search */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="filter-buttons">
              <button 
                className={`btn ${filter === 'all' ? 'btn-purple' : 'btn-outline-purple'} me-2`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`btn ${filter === 'pending' ? 'btn-purple' : 'btn-outline-purple'} me-2`}
                onClick={() => setFilter('pending')}
              >
                Pending
              </button>
              <button 
                className={`btn ${filter === 'in-progress' ? 'btn-purple' : 'btn-outline-purple'} me-2`}
                onClick={() => setFilter('in-progress')}
              >
                In Progress
              </button>
              <button 
                className={`btn ${filter === 'completed' ? 'btn-purple' : 'btn-outline-purple'}`}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="search-box">
              <input
                type="text"
                className="form-control"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search search-icon"></i>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-tasks empty-icon"></i>
            <h3>No tasks found</h3>
            <p>Get started by creating your first task!</p>
            <button 
              className="btn btn-purple"
              onClick={() => setShowModal(true)}
            >
              Create Your First Task
            </button>
          </div>
        ) : (
          <div className="tasks-grid">
            {filteredTasks.map(task => (
              <div key={task.id || task._id} className="task-card">
                <div className="task-header">
                  <span className={`status-badge ${getStatusBadgeClass(task.status)}`}>
                    {task.status}
                  </span>
                  <div className="task-actions">
                    <button className="btn btn-outline-purple" onClick={() => handleEdit(task)}>
                      <i className="fas fa-edit me-1"></i> Edit
                    </button>
                    <button className="btn btn-outline-danger" onClick={() => handleDelete(task.id)}>
                      <i className="fas fa-trash me-1"></i> Delete
                    </button>
                  </div>
                </div>
                <h4 className="task-title">{task.title}</h4>
                <p className="task-description">{task.description}</p>
                <div className="task-footer">
                  <small className="text-muted">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Task Modal */}
        {showModal && (
          <div className="modal-backdrop show" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingTask ? 'Edit Task' : 'Create New Task'}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      maxLength={100}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description *</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      maxLength={500}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-purple">
                    {editingTask ? 'Update Task' : 'Create Task'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


