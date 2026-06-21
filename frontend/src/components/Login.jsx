import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'Patient', // Patient or Doctor (or Admin)
    name: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
      const res = await axios.post(endpoint, formData);
      const { user } = res.data;
      
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'Doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/patient-dashboard');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Authentication failed');
    }
  };

  return (
    <div className="section animate-fade-in" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-card" style={{ padding: '3rem', width: '100%', maxWidth: '400px' }}>
        <h2 className="section-title" style={{ fontSize: '2rem' }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
          {!isLogin && (
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input type="text" name="name" className="input-field" required onChange={handleChange} />
            </div>
          )}
          
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input type="email" name="email" className="input-field" required onChange={handleChange} />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input type="password" name="password" className="input-field" required onChange={handleChange} />
          </div>

          {!isLogin && (
            <div className="input-group">
              <label className="input-label">Role</label>
              <select name="role" className="input-field" required onChange={handleChange}>
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>
          )}
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Log In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
