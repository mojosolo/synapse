import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/AgentFactory.module.css';

const AgentFactory = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) {
      alert('Please enter a valid input.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('/api/agent-system', { input });
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error interacting with the agent factory:', error);
      setOutput('An error occurred while processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Agent Factory</h1>
      <textarea
        className={styles.textarea}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your request here..."
        rows={5}
      />
      <button
        className={styles.button}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Submit'}
      </button>
      {output && (
        <div className={styles.output}>
          <h2>Output:</h2>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};

export default AgentFactory; 