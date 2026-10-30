import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { NovaSection } from '@/components/sections';

export const ChatPage: React.FC = () => {
  return (
    <div className="min-h-screen py-20 md:py-32 px-6 md:px-0">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          number="07"
          title="Ask AI"
          description="Chat with Nova, an AI assistant trained on my portfolio."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card/40 backdrop-blur-sm rounded-lg border border-border p-6 md:p-8"
        >
          <NovaSection />
        </motion.div>
      </div>
    </div>
  );
};
