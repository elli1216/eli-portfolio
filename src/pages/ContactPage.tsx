import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { PERSONAL_DATA } from '@/constants/constants';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (you can integrate with a service here)
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:${PERSONAL_DATA.primary_email}`,
      label: PERSONAL_DATA.primary_email,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: PERSONAL_DATA.links.linkedin,
      label: 'LinkedIn',
    },
    {
      name: 'GitHub',
      icon: Github,
      href: PERSONAL_DATA.links.github,
      label: 'GitHub',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: PERSONAL_DATA.links.twitter,
      label: 'Twitter',
    },
  ];

  return (
    <div className="min-h-screen py-20 md:py-32 px-6 md:px-0">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          number="06"
          title="Get In Touch"
          description="Let's work together or just say hello."
        />

        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Your message..."
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                disabled={submitted}
              >
                {submitted ? '✓ Message sent!' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-6"
          >
            <p className="text-lg text-muted-foreground">
              You can also reach me directly on these platforms:
            </p>
            <div className="space-y-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg border border-border/40 bg-card/20 hover:border-primary/60 hover:bg-card/40 transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {link.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{link.label}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
