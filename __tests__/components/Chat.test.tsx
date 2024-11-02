import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Chat from '@/components/Chat';

const mockMessage = "Test message content";

describe('Chat Component', () => {
    test('renders chat interface', () => {
        render(
            <Chat>
                <div>{mockMessage}</div>
            </Chat>
        );
        
        expect(screen.getByText(mockMessage)).toBeDefined();
    });

    test('displays correct background image', () => {
        const bgImage = "/images/bg-1.jpg";
        render(
            <Chat background={bgImage}>
                <div>Test content</div>
            </Chat>
        );

        const image = document.querySelector('img');
        expect(image?.src).toContain('bg-1.jpg');
    });

    test('handles new chat state', () => {
        render(
            <Chat newChat>
                <div>New chat content</div>
            </Chat>
        );

        expect(screen.getByText(/Unlock the power of AI/i)).toBeDefined();
    });

    test('displays generation message when specified', () => {
        render(
            <Chat generationMessage>
                <div>Content</div>
            </Chat>
        );

        expect(screen.getByText(/Generating/i)).toBeDefined();
    });
});