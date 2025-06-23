import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    // Only prevent default if we're handling it ourselves (for loading state)
    // But still allow Netlify to process the form
    setIsSubmitting(true);
    
    // Reset loading state after a delay
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

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