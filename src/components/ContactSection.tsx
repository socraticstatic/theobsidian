import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent to the void...');
      setFormData({ name: '', email: '', project: '', message: '' });
    }, 1500);
  };

  return (
    <section className="section contact">
      <div className="container">
        <h2 className="hero-subtitle text-carved" style={{ marginBottom: 'var(--space-xl)' }}>
          Transmit Coordinates
        </h2>
        
        <form 
          className="contact-form" 
          onSubmit={handleSubmit}
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="contact" />
          <div className="hidden">
            <input name="bot-field" />
          </div>
          
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.project}
              onChange={handleChange}
              className="form-input"
              placeholder="Branding, Web Development, Consultation..."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
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