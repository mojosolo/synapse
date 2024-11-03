import { useState, KeyboardEvent } from 'react';
import Icon from '@/components/Icon';
import styles from './Composer.module.css';

type ComposerProps = {
    onSend: (message: string) => void;
    isLoading?: boolean;
    placeholder?: string;
};

const Composer = ({ onSend, isLoading = false, placeholder = "Type your message..." }: ComposerProps) => {
    const [input, setInput] = useState('');

    const handleSubmit = () => {
        if (!input.trim()) return;
        onSend(input);
        setInput('');
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className={styles.composer}>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    className={styles.input}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholder}
                    disabled={isLoading}
                />
                <button
                    className={`${styles.sendButton} ${!input.trim() && styles.disabled}`}
                    onClick={handleSubmit}
                    disabled={isLoading || !input.trim()}
                >
                    {isLoading ? (
                        <Icon name="loading" className={styles.loadingIcon} />
                    ) : (
                        <Icon name="send" className={styles.sendIcon} />
                    )}
                </button>
            </div>
        </div>
    );
};

export default Composer; 