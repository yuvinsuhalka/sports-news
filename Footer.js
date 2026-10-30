import React from 'react';

export default function Footer() {
  return (
    <footer style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', textAlign: 'center', padding: '20px', color: '#64748b', fontSize: '0.9rem', marginTop: '40px' }}>
      © {new Date().getFullYear()} Sports News Hub — All Rights Reserved.
    </footer>
  );
}
