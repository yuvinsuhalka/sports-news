import React, { useState, useEffect } from 'react';
import { fetchHeadlines } from './newsApi';
import Header from './Header';
import Footer from './Footer';

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchHeadlines('sports');
        setArticles(data);
      } catch (error) {
        console.error("Error loading news:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Header />
      
      <main style={{ padding: '32px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px', color: '#111827', fontWeight: 'bold' }}>Sports News</h1>
        <p style={{ color: '#4b5563', marginBottom: '24px' }}>Live daily sports headlines and updates.</p>
        
        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#4b5563' }}>Loading latest sports news...</p>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '20px' 
          }}>
            {articles.map((article) => (
              <div 
                key={article.id} 
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ position: 'relative', height: '180px' }}>
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: '#ef4444',
                    color: 'white',
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    borderRadius: '20px',
                    zIndex: 2
                  }}>
                    {article.trendingBadge}
                  </span>
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280', marginBottom: '8px' }}>
                    <span>📍 {article.source}</span>
                    <span>⏱️ {article.publishedAt}</span>
                  </div>
                  
                  <h3 style={{ fontSize: '1.1rem', color: '#111827', marginBottom: '8px', lineHeight: '1.4' }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#4b5563', flexGrow: '1', marginBottom: '16px', lineHeight: '1.4' }}>
                    {article.description}
                  </p>
                  
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{
                      display: 'inline-block',
                      padding: '10px 16px',
                      background: '#2563eb',
                      color: 'white',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      textAlign: 'center',
                      fontSize: '0.9rem'
                    }}
                  >
                    Read Full Story ➔
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
