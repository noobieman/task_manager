// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="fas fa-tasks me-2 text-purple"></i>
            Task Manager
          </Link>
          <div className="navbar-nav ms-auto">
            <Link to="/login" className="btn btn-outline-purple me-2">Sign In</Link>
            <Link to="/register" className="btn btn-purple">Sign Up</Link>
          </div>
        </div>
      </nav>

      <div className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="hero-title">Organize Your Tasks Efficiently</h1>
              <p className="hero-subtitle">A modern task management system that helps you stay productive and meet your deadlines.</p>
              <div className="hero-buttons">
                <Link to="/register" className="btn btn-purple btn-lg me-3">Get Started</Link>
                <Link to="/login" className="btn btn-outline-purple btn-lg">Sign In</Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2ZjQyYzEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM4YzY4Y2QiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2Y1ZjdmZiIgcng9IjI1IiByeT0iMjUiLz48Y2lyY2xlIGN4PSIyNTAiIGN5PSIxNTAiIHI9IjcwIiBmaWxsPSJ1cmwoI2cpIi8+PHJlY3QgeD0iMTUwIiB5PSIyNTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAiIHJ4PSI1IiByeT0iNSIgZmlsbD0idXJsKCNnKSIgb3BhY2l0eT0iMC43Ii8+PHJlY3QgeD0iMTUwIiB5PSIyNzAiIHdpZHRoPSIxNTAiIGhlaWdodD0iMTAiIHJ4PSI1IiByeT0iNSIgZmlsbD0idXJsKCNnKSIgb3BhY2l0eT0iMC41Ii8+PHJlY3QgeD0iMTUwIiB5PSIyOTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAiIHJ4PSI1IiByeT0iNSIgZmlsbD0idXJsKCNnKSIgb3BhY2l0eT0iMC44Ii8+PHJlY3QgeD0iMTUwIiB5PSIzMTAiIHdpZHRoPSIxODAiIGhlaWdodD0iMTAiIHJ4PSI1IiByeT0iNSIgZmlsbD0idXJsKCNnKSIgb3BhY2l0eT0iMC42Ii8+PC9zdmc+" alt="Task Management" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Why Choose Our Task Manager</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="feature-card text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="fas fa-tachometer-alt fa-2x text-purple"></i>
                </div>
                <h5>Easy to Use</h5>
                <p>Intuitive interface that makes task management simple and efficient.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="fas fa-bell fa-2x text-purple"></i>
                </div>
                <h5>Smart Reminders</h5>
                <p>Get notified about upcoming deadlines and important tasks.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="fas fa-mobile-alt fa-2x text-purple"></i>
                </div>
                <h5>Responsive Design</h5>
                <p>Access your tasks from any device, anywhere, anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white py-4 mt-auto">
        <div className="container text-center">
          <p className="mb-0">&copy; 2023 Task Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;