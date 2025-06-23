import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Submit to Netlify using proper encoding
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'form-name': 'contact',
        'name': formData.get('name') as string,
        'email': formData.get('email') as string,
        'project': formData.get('project') as string,
        'message': formData.get('message') as string,
      }).toString()
    })
    .then(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Redirect to home after 3 seconds
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    })
    .catch(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Redirect to home after 3 seconds even on error
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    });
  };

  if (isSubmitted) {
    return (
      <section className="section contact">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'var(--text-4xl)', color: 'var(--accent-gold)', marginBottom: 'var(--space-lg)' }}>
              𓍶
            </div>
            <h2 className="hero-subtitle text-carved" style={{ marginBottom: 'var(--space-lg)' }}>
              Transmission Received
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
              Your coordinates have been absorbed into the void.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
              Returning to the obsidian depths...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section contact">
      <div className="container">
        <h2 className="hero-subtitle text-carved" style={{ marginBottom: 'var(--space-xl)' }}>
          Transmit Coordinates
        </h2>
        
        {/* Netlify-compatible form */}
        <form 
          className="contact-form" 
          onSubmit={handleSubmit}
          name="contact"
          method="POST"
          action="/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          {/* Hidden fields for Netlify */}
          <input type="hidden" name="form-name" value="contact" />
          <div className="hidden">
            <label>
              Don't fill this out if you're human: 
              <input name="bot-field" />
            </label>
          </div>
          
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="project" className="form-label">
              Project Type
            </label>
            <input
              type="text"
              id="project"
              name="project"
              className="form-input"
              placeholder="Branding, Consultation..."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="form-textarea"
              placeholder="Describe your vision..."
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="form-button hover-lift"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Transmitting...' : 'Send to the Void'}
          </button>
        </form>
        
        <div style={{ 
          marginTop: 'var(--space-xl)', 
          fontSize: 'var(--text-xs)', 
          color: 'var(--text-subtle)',
          fontStyle: 'italic'
        }}>
          ⚠ Unsolicited transmissions will be consumed by the void ⚠
        </div>
      </div>
    </section>
  );
};

export default ContactSection;