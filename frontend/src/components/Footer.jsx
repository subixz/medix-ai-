import React from 'react';
import { Mail, Phone, MapPin, ShieldAlert } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3 className="text-gradient" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>MediX AI</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Explainable Generative AI Framework for Multimodal Medical Image Diagnosis and Clinical Decision Support.
            </p>
            <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <ShieldAlert size={16} color="var(--warning)" />
              <small>Disclaimer: AI is for assistance, not a replacement for doctors.</small>
            </div>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1rem', color: 'white' }}>Quick Links</h4>
            <div className="flex flex-col gap-2" style={{ color: 'var(--text-muted)' }}>
              <a href="/" className="hover:text-white">Home</a>
              <a href="#about" className="hover:text-white">About Us</a>
              <a href="#features" className="hover:text-white">Features</a>
              <a href="#how-it-works" className="hover:text-white">How It Works</a>
            </div>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1rem', color: 'white' }}>Contact Info</h4>
            <div className="flex flex-col gap-4" style={{ color: 'var(--text-muted)' }}>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>support@medix.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+1 800 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>AI Health Center, NY</span>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem', color: 'white' }}>Project Info</h4>
            <div className="flex flex-col gap-2" style={{ color: 'var(--text-muted)' }}>
              <span><strong>Aswin / Team MediX</strong></span>
              <span>College Name</span>
              <span>Guide: Prof. Guide Name</span>
              <span>Academic Year 2026</span>
            </div>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}>
          <p>&copy; {new Date().getFullYear()} MediX AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
