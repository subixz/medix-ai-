import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Activity, CalendarCheck, FileSearch, ShieldCheck, HeartPulse, BrainCircuit, ActivitySquare } from 'lucide-react';

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.5rem 1rem', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '9999px', border: '1px solid rgba(79, 70, 229, 0.2)' }}>
            <span className="text-gradient" style={{ fontWeight: '600' }}>Next-Gen Healthcare Technology</span>
          </div>
          <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2' }}>
            Smart AI-Powered Medical Diagnosis <br />
            with <span className="text-gradient">Explainable Insights</span>
          </h1>
          <p className="section-subtitle" style={{ fontSize: '1.25rem', marginBottom: '2.5rem' }}>
            MediX AI provides a comprehensive framework for multimodal medical image diagnosis, utilizing Deep Learning to offer clinical decision support and rapid disease detection.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/login" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
              Upload Scan Now
              <Camera size={20} />
            </Link>
            <a href="#about" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="grid grid-cols-2 items-center gap-8 md:grid-cols-1">
            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ paddingBottom: '2rem' }}>
                <BrainCircuit size={64} className="text-gradient" />
              </div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Explainable Multimodal Diagnosis</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                MediX AI combines visual scan data (X-ray, MRI, CT Scans) with textual patient symptoms to produce highly accurate diagnostic predictions.
                Unlike "black box" AIs, our framework leverages Explainable AI (Grad-CAM) to highlight exactly *why* it reached its conclusion, increasing doctor trust.
              </p>
            </div>
            <div>
              <h2 className="section-title" style={{ textAlign: 'left' }}>Bridging the Gap Between AI & Clinical Care</h2>
              <div className="flex flex-col gap-6" style={{ marginTop: '2rem' }}>
                <div className="flex gap-4 items-center">
                  <div className="feature-icon" style={{ margin: 0, background: 'rgba(139, 92, 246, 0.1)' }}>
                    <ActivitySquare color="var(--accent)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.25rem' }}>Deep Learning Precision</h4>
                    <p style={{ color: 'var(--text-muted)' }}>Advanced CNN models trained on thousands of validated medical scans.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="feature-icon" style={{ margin: 0, background: 'rgba(16, 185, 129, 0.1)' }}>
                    <ShieldCheck color="var(--secondary)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.25rem' }}>Transparent Output</h4>
                    <p style={{ color: 'var(--text-muted)' }}>Visual heatmaps showing regions of interest for diseases.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="feature-icon" style={{ margin: 0, background: 'rgba(56, 189, 248, 0.1)' }}>
                    <HeartPulse color="#38bdf8" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.25rem' }}>Automated CDS</h4>
                    <p style={{ color: 'var(--text-muted)' }}>Clinical Decision Support suggesting treatments based on risk level.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scan Types / Info */}
      <section id="scans" className="section">
        <div className="container">
          <h2 className="section-title">Supported Imaging Modalities</h2>
          <p className="section-subtitle">Our AI handles varied modalities to detect distinct disease characteristics.</p>
          
          <div className="grid grid-cols-auto gap-6">
            <div className="glass-card feature-card">
              <h3>X-Ray</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
                Quick, non-invasive imaging used primarily to detect lung diseases (Pneumonia, COVID-19, TB) and bone fractures.
              </p>
            </div>
            <div className="glass-card feature-card">
              <h3>MRI (Magnetic Resonance)</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
                Uses magnetic fields for highly detailed scans of soft tissues. Crucial for detecting brain tumors, neurological anomalies, and joint injuries.
              </p>
            </div>
            <div className="glass-card feature-card">
              <h3>CT Scan</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
                Combines multiple X-rays to create cross-sectional images. Great for detecting lung nodules, hemorrhages, and complex fractures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="section" style={{ background: 'var(--surface)' }}>
        <div className="container text-center">
          <h2 className="section-title">End-to-End Clinical Framework</h2>
          <div className="grid grid-cols-auto gap-8" style={{ marginTop: '3rem' }}>
            <div style={{ padding: '2rem' }}>
              <Activity size={48} color="var(--primary)" style={{ margin: '0 auto 1.5rem' }} />
              <h3 style={{ marginBottom: '1rem' }}>AI-Based Diagnosis</h3>
              <p style={{ color: 'var(--text-muted)' }}>Upload scans instantly for rapid machine learning analysis and prediction generation.</p>
            </div>
            <div style={{ padding: '2rem' }}>
              <FileSearch size={48} color="var(--accent)" style={{ margin: '0 auto 1.5rem' }} />
              <h3 style={{ marginBottom: '1rem' }}>Explainable Heatmaps</h3>
              <p style={{ color: 'var(--text-muted)' }}>Review auto-generated visual evidence confirming where the model localized the disease.</p>
            </div>
            <div style={{ padding: '2rem' }}>
              <CalendarCheck size={48} color="var(--secondary)" style={{ margin: '0 auto 1.5rem' }} />
              <h3 style={{ marginBottom: '1rem' }}>System Appointments</h3>
              <p style={{ color: 'var(--text-muted)' }}>Direct integration allowing patients to consult specialists post-diagnosis online via our built-in system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="flex flex-col gap-8 items-center" style={{ marginTop: '4rem' }}>
            {[
              { s: 'Step 1', t: 'Upload Scan & Symptoms', d: 'Patient provides medical history, text-based symptoms, and corresponding Dicom/JPEG scan files.' },
              { s: 'Step 2', t: 'AI Analyzes Data', d: 'Multimodal neural network runs parallel processing on image boundaries and natural language.' },
              { s: 'Step 3', t: 'Diagnosis & Explanation', d: 'Receive confidence scores, risk metrics, and visual Grad-CAM overlays demonstrating model focus.' },
              { s: 'Step 4', t: 'Consult Doctor', d: 'Share report with verified healthcare professionals via the platform for final prescription.' }
            ].map((step, idx) => (
              <div key={idx} className="glass" style={{ padding: '2rem', width: '100%', maxWidth: '800px', borderRadius: '12px', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--border)' }}>{idx + 1}</div>
                <div>
                  <h3 className="text-gradient" style={{ marginBottom: '0.5rem' }}>{step.t}</h3>
                  <p style={{ color: 'var(--text-main)' }}>{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Awareness */}
      <section className="section" style={{ background: 'var(--surface)', padding: '6rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Health Matters: Early Diagnosis Saves Lives</h2>
          <p className="section-subtitle">
            Preventive healthcare and timely screening drastically increase the survival rate of critical illnesses. Always consult a certified physician for conclusive treatment. Drink water, maintain regular fitness, and listen to your body's symptoms.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Home;
