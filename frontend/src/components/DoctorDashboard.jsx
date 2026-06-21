import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, FileSearch, Calendar, CheckSquare } from 'lucide-react';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch mock appointments / generic patients data
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/appointments');
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="dashboard-layout" style={{ marginTop: '70px' }}>
      <aside className="sidebar">
        <h3 style={{ marginBottom: '2rem', fontSize: '1.25rem' }}>Doctor Portal</h3>
        <ul className="flex flex-col gap-4">
          <li style={{ padding: '0.75rem', borderRadius: '8px', background: 'var(--primary)', cursor: 'pointer' }}>My Patients</li>
          <li style={{ padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', ':hover': {background: 'var(--surface-light)'} }}>AI Validations</li>
          <li style={{ padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', ':hover': {background: 'var(--surface-light)'} }}>Prescriptions</li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
          <h2 className="section-title" style={{ textAlign: 'left', margin: 0 }}>Pending Clinical AI Validations</h2>
          <span className="badge badge-low" style={{ padding: '0.5rem 1rem' }}>Dr. Smith (Neurology / Pulmonology)</span>
        </div>
        
        <div className="grid grid-cols-auto gap-6">
          {/* Mock Patient Ticket */}
          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="flex justify-between items-center">
              <div>
                <h4 style={{ fontSize: '1.25rem' }}>Patient: John Doe</h4>
                <p style={{ color: 'var(--text-muted)' }}>Age: 45 | Modality: Chest X-Ray</p>
              </div>
              <Users size={32} color="var(--primary)" />
            </div>

            <div style={{ background: 'var(--background)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--danger)' }}>
              <p className="input-label" style={{ marginBottom: '0.5rem' }}>AI Pre-Diagnosis</p>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Pneumonia (94.2% Conf.)</h4>
              <p style={{ color: 'var(--text-muted)' }}>Grad-CAM localized high-intensity infiltrates in lower left lobe.</p>
            </div>

            <div className="flex gap-4">
              <button className="btn btn-primary" style={{ flex: 1 }}>
                <FileSearch size={18} /> Review Scan
              </button>
              <button className="btn btn-secondary" style={{ flex: 1 }}>
                <CheckSquare size={18} /> Approve AI
              </button>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="flex justify-between items-center">
              <div>
                <h4 style={{ fontSize: '1.25rem' }}>Patient: Jane Smith</h4>
                <p style={{ color: 'var(--text-muted)' }}>Age: 62 | Modality: Brain MRI</p>
              </div>
              <Users size={32} color="var(--primary)" />
            </div>

            <div style={{ background: 'var(--background)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--warning)' }}>
              <p className="input-label" style={{ marginBottom: '0.5rem' }}>AI Pre-Diagnosis</p>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Mild Cognitive Impairment (82.4% Conf.)</h4>
              <p style={{ color: 'var(--text-muted)' }}>Slight atrophy evident in temporal regions.</p>
            </div>

            <div className="flex gap-4">
              <button className="btn btn-primary" style={{ flex: 1 }}>
                <FileSearch size={18} /> Review Scan
              </button>
              <button className="btn btn-secondary" style={{ flex: 1 }}>
                <CheckSquare size={18} /> Approve AI
              </button>
            </div>
          </div>
        </div>

        <h3 style={{ marginTop: '4rem', marginBottom: '1.5rem' }}><Calendar size={24} style={{ display: 'inline', marginRight: '0.5rem' }} /> Upcoming Appointments</h3>
        <div className="glass-card" style={{ padding: '2rem' }}>
          {appointments.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No appointments scheduled.</p>
          ) : (
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Patient Name</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Date</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(app => (
                  <tr key={app.id} style={{ borderBottom: '1px solid var(--surface-light)' }}>
                    <td style={{ padding: '1rem' }}>{app.patientName}</td>
                    <td style={{ padding: '1rem' }}>{app.date}</td>
                    <td style={{ padding: '1rem' }}>{app.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
