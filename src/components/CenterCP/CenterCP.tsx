import React, { ReactNode } from 'react';

interface CenterCPProps {
  children: ReactNode;
}

const CenterCP: React.FC<CenterCPProps> = ({ children }) => {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {children}
    </div>
  );
};

export default CenterCP;
