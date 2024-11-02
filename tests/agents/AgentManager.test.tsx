import { render, screen } from '@testing-library/react';
import AgentManager from '@/agents/AgentManager';

describe('AgentManager Component', () => {
  it('renders without crashing', () => {
    render(<AgentManager />);
    expect(screen.getByText('Available Agents')).toBeInTheDocument();
  });

  // Add more tests for Agent interactions
}); 