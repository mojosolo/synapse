import { useState } from 'react';
import axios from 'axios';
import Composer from '@/components/Composer';
import styles from '../styles/AgentFactory.module.css';

const AgentFactory = () => {
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async (message: string) => {
        setIsLoading(true);
        try {
            const response = await axios.post('/api/agent-system', { input: message });
            setOutput(response.data.output);
        } catch (error) {
            console.error('Error:', error);
            setOutput('An error occurred while processing your request.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Synapse AI</h1>
                <p>Your guide to reducing human suffering</p>
            </div>
            
            {output && (
                <div className={styles.output}>
                    <pre>{output}</pre>
                </div>
            )}
            
            <Composer 
                onSend={handleSend}
                isLoading={isLoading}
                placeholder="Ask me anything..."
            />
        </div>
    );
};

export default AgentFactory; 