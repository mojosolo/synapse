import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Message from '@/components/Message';

describe('Message Component', () => {
    test('renders message input', () => {
        const mockOnChange = vi.fn();
        render(
            <Message 
                value="" 
                onChange={mockOnChange}
                placeholder="Test placeholder"
            />
        );
        
        const input = screen.getByPlaceholderText('Test placeholder');
        expect(input).toBeDefined();
    });

    test('handles input changes', () => {
        const mockOnChange = vi.fn();
        render(
            <Message 
                value="" 
                onChange={mockOnChange}
                placeholder="Enter message"
            />
        );

        const input = screen.getByPlaceholderText('Enter message');
        fireEvent.change(input, { target: { value: 'Hello' } });
        
        expect(mockOnChange).toHaveBeenCalled();
    });

    test('displays generation message when specified', () => {
        render(
            <Message 
                value="" 
                onChange={() => {}}
                generationMessage
            />
        );

        expect(screen.getByText(/Generating/i)).toBeDefined();
    });

    test('shows files when provided', () => {
        const files = ['test.pdf'];
        render(
            <Message 
                value="" 
                onChange={() => {}}
                files={files}
            />
        );

        expect(screen.getByText('test.pdf')).toBeDefined();
    });
});