'use client';

import { useState } from 'react';
import axios from 'axios';
import styles from './AgentExecutorPanel.module.css';

type CreativityLevel = 'low' | 'medium' | 'high' | 'super';

const AgentExecutorPanel = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [creativity, setCreativity] = useState<CreativityLevel>('medium');

  const handleSubmit = async () => {
    if (!input.trim()) {
      alert('Please enter a valid input.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('/api/agent-system', { 
        input,
        creativity 
      });
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error:', error);
      setOutput('An error occurred while processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  const creativityLevels: CreativityLevel[] = ['low', 'medium', 'high', 'super'];

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2>🤖 AI Agent Executor</h2>
        <p>Unlock the power of hierarchical AI agents</p>
      </div>
      
      <div className={styles.creativityControls}>
        <span>Creativity Level:</span>
        <div className={styles.buttons}>
          {creativityLevels.map((level) => (
            <button
              key={level}
              type="button"
              className={`${styles.levelButton} ${creativity === level ? styles.active : ''}`}
              onClick={() => setCreativity(level)}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <textarea
        className={styles.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What would you like the AI agents to help you with today?"
        rows={5}
      />

      <button
        type="button"
        className={styles.executeButton}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? '🔄 Processing...' : '🚀 Execute'}
      </button>

      {output && (
        <div className={styles.output}>
          <h3>Agent Response:</h3>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};

export default AgentExecutorPanel; 