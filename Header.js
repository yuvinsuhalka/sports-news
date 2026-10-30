import React from 'react';

export default function Header() {
  return (
    <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#2563eb' }}>
        ⚽ Sports News
      </div>
    </header>
  );
}
