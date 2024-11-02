'use client';

import { useContext } from 'react';
import Layout from '@/components/Layout';
import { AppContext } from '@/context/AppContext';

const AgentsPage = () => {
  const { agents } = useContext(AppContext);

  return (
    <Layout>
      <h1>Available Agents</h1>
      <ul>
        {agents.map((agent) => (
          <li key={agent.id}>{agent.name}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default AgentsPage; 