import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';

import fortunes from './data.json';

const SiamsiTube = ({ isShaking }) => {
  return (
    <motion.div
      className="siamsi-tube-container"
      animate={isShaking ? {
        rotate: [0, -5, 5, -5, 5, 0],
        x: [0, -2, 2, -2, 2, 0],
      } : {}}
      transition={isShaking ? {
        duration: 0.15,
        repeat: 10,
        ease: "linear"
      } : {}}
      style={{
        width: 120,
        height: 200,
        background: 'linear-gradient(to right, #D32F2F, #9A0007)',
        borderRadius: '10px 10px 60px 60px',
        position: 'relative',
        boxShadow: '0 8px 0 #7B1F1F',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 10
      }}
    >
      <div style={{
        position: 'absolute',
        top: -15,
        width: '90%',
        height: 30,
        background: '#9A0007',
        borderRadius: '50%',
        border: '3px solid #D32F2F'
      }} />
      
      {/* Visual Sticks inside */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          width: 8,
          height: 140,
          background: '#FFF9F9',
          margin: '0 2px',
          borderRadius: 2,
          opacity: 0.8
        }} />
      ))}
    </motion.div>
  );
};

const FortuneStick = ({ number }) => {
  return (
    <motion.div
      initial={{ y: 0, opacity: 0, rotate: 45 }}
      animate={{ y: 220, opacity: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        width: 12,
        height: 180,
        background: 'linear-gradient(to bottom, #FFF9F9, #FFD700)',
        borderRadius: 4,
        position: 'absolute',
        top: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        color: '#D32F2F',
        fontWeight: 'bold',
        fontSize: '1rem',
        border: '1px solid #D32F2F'
      }}
    >
      {number}
    </motion.div>
  );
};

export default function App() {
  const [isShaking, setIsShaking] = useState(false);
  const [result, setResult] = useState(null);

  const startShaking = () => {
    setResult(null);
    setIsShaking(true);
    
    // Simulate shaking duration
    setTimeout(() => {
      setIsShaking(false);
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      setResult(randomNumber);
    }, 1500);
  };

  return (
    <div className="app-container">
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#D32F2F' }}>Digital Siamsi</h1>
        <p style={{ fontSize: '1.2rem', color: '#9A0007', opacity: 0.8 }}>Shake for your fortune</p>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', position: 'relative' }}>
        <div style={{ position: 'relative', height: 450, display: 'flex', justifyContent: 'center' }}>
          <SiamsiTube isShaking={isShaking} />
          <AnimatePresence>
            {result && <FortuneStick number={result} />}
          </AnimatePresence>
        </div>

        <section style={{ height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {!result && !isShaking && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="shake-button"
              onClick={startShaking}
            >
              Shake Now
            </motion.button>
          )}

          {isShaking && (
            <p style={{ fontStyle: 'italic', color: '#D32F2F' }}>Shaking... Focus on your wish...</p>
          )}

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="premium-card"
                style={{ textAlign: 'center', maxWidth: 400 }}
              >
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#D32F2F' }}>#{result}</h2>
                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{fortunes[result - 1]}</p>
                <button
                  onClick={startShaking}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'none',
                    border: '1px solid #D32F2F',
                    color: '#D32F2F',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontWeight: 600
                  }}
                >
                  <RefreshCcw size={16} /> Shake Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <footer style={{ marginTop: 'auto', padding: '2rem', textAlign: 'center', opacity: 0.5, fontSize: '0.9rem' }}>
        &copy; 2026 Digital Siamsi • Traditional Temple Wisdom
      </footer>
    </div>
  );
}
