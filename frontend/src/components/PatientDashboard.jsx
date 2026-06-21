import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const PatientDashboard = () => {
  const [file, setFile] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [scanType, setScanType] = useState('X-Ray');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('symptoms', symptoms);
    formData.append('scanType', scanType);

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Error during diagnosis. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout" style={{ marginTop: '70px' }}>
      <aside className="sidebar">
        <h3 style={{ marginBottom: '2rem', fontSize: '1.25rem' }}>Patient Portal</h3>
        <ul className="flex flex-col gap-4">
          <li style={{ padding: '0.75rem', borderRadius: '8px', background: 'var(--primary)', cursor: 'pointer' }}>New Scan</li>
          <li style={{ padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', ':hover': {background: 'var(--surface-light)'} }}>My History</li>
          <li style={{ padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', ':hover': {background: 'var(--surface-light)'} }}>Appointments</li>
        </ul>
      </aside>

      <main className="main-content">
        <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2rem' }}>Upload New Scan</h2>
        
        <div className="grid grid-cols-2 gap-8 md:grid-cols-1">
          {/* Upload Section */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <form onSubmit={handleUpload}>
              <div className="input-group">
                <label className="input-label">Select Scan Modality</label>
                <select className="input-field" value={scanType} onChange={(e) => setScanType(e.target.value)}>
                  <option value="X-Ray">X-Ray (Chest, Bone, etc.)</option>
                  <option value="MRI">MRI Scan</option>
                  <option value="CT Scan">CT Scan</option>
                </select>
              </div>

              <div className="input-group" style={{ marginTop: '1.5rem' }}>
                <label className="input-label">Upload Medical File (DICOM/JPEG/PNG)</label>
                <label className="upload-area">
                  <input type="file" style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" />
                  <UploadCloud size={48} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
                  <p style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>{file ? file.name : 'Click to select or drag and drop file'}</p>
                </label>
              </div>

              <div className="input-group" style={{ marginTop: '1.5rem' }}>
                <label className="input-label">Patient Symptoms / History</label>
                <textarea 
                  className="input-field" 
                  placeholder="E.g., chronic cough for 2 weeks, mild fever..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }} disabled={loading}>
                {loading ? 'Processing MediX AI...' : 'Run AI Diagnosis'}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>AI Diagnosis Output</h3>
            
            {!result && !loading && (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', paddingTop: '4rem' }}>
                <FileText size={64} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <p>Upload a scan to view AI insights, clinical risk, and Grad-CAM heatmaps.</p>
              </div>
            )}

            {loading && (
              <div style={{ textAlign: 'center', color: 'var(--primary)', paddingTop: '4rem' }}>
                <div className="spinner"></div>
                <p className="animate-pulse" style={{ marginTop: '1rem' }}>Running neural networks...</p>
              </div>
            )}

            {result && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
                  <div>
                    <span className="input-label">Detected Pathology</span>
                    <h4 style={{ fontSize: '2rem', color: result.risk_level === 'Critical' ? 'var(--danger)' : 'var(--text-main)' }}>
                      {result.diagnosis}
                    </h4>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="input-label">Confidence</span>
                    <h4 className="text-gradient" style={{ fontSize: '2rem' }}>{(parseFloat(result.confidence) * 100).toFixed(1)}%</h4>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <span className={`badge badge-${result.risk_level.toLowerCase()}`}>
                    Risk Level: {result.risk_level}
                  </span>
                </div>

                <div style={{ background: 'rgba(79, 70, 229, 0.05)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(79, 70, 229, 0.1)', marginBottom: '1.5rem' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}><CheckCircle size={18} color="var(--primary)" /> Explainable AI Overlay (Grad-CAM)</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Grad-CAM heatmap highlights active symptomatic regions dictating this decision.</p>
                  
                  {result.heatmap ? (
                    <img src={result.heatmap} alt="Grad-CAM Heatmap" style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: '8px', border: '1px solid var(--border)' }} />
                  ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      Heatmap generation failed.
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}><AlertTriangle size={18} color="var(--warning)" /> Clinical Summary</h4>
                  <p style={{ color: 'var(--text-muted)' }}>{result.explanation}</p>
                </div>

                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>AI Recommendations</h4>
                  <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    {result.recommendations?.map((rec, i) => <li key={i}>{rec}</li>)}
                  </ul>
                </div>
                
                <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', marginTop: '2rem' }}>
                  <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Recommended Specialists</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Based on your diagnosis ({result.diagnosis}), we recommend consulting one of these verified doctors.</p>
                  
                  <div className="flex flex-col gap-4">
                    {[
                      { name: "Dr. Sarah Jenkins", exp: "15 Years", loc: "New York, District 1", spec: "Pulmonology" },
                      { name: "Dr. Rajesh Kumar", exp: "10 Years", loc: "California, District 4", spec: "Neurology" }
                    ].map((doc, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--background)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div>
                          <h4 style={{ color: 'var(--primary)' }}>{doc.name}</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{doc.spec} • {doc.exp} Experience</p>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{doc.loc}</p>
                        </div>
                        <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={() => {
                          const userStr = localStorage.getItem('user');
                          const patientName = userStr ? JSON.parse(userStr).email : 'Guest Patient';
                          axios.post('http://localhost:5000/api/appointments', {
                            patientName: patientName,
                            doctorName: doc.name,
                            date: new Date().toLocaleDateString(),
                            time: '10:00 AM'
                          }).then(() => alert(`Appointment requested with ${doc.name}!`)).catch(() => alert('Failed to book.'));
                        }}>
                          Book Appt
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
