import React, { useState, useEffect } from 'react';

// Inline News Fetcher logic taaki alag se file ki zarurat na pade
const SAURAV_BASE_URL = "https://saurav.tech/NewsAPI/top-headlines/category";

async function fetchHeadlines(category = "sports") {
  try {
    const res = await fetch(`${SAURAV_BASE_URL}/${category}/in.json`);
    if (!res.ok) throw new Error("API failed");
    
    const data = await res.json();
    return (data.articles || []).map((a, i) => ({
      id: `${category}-${i}-${a.publishedAt || i}`,
      title: a.title,
      description: a.description || "No description available.",
      url: a.url,
      image: a.urlToImage || "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop",
      source: a.source?.name || "Sports Desk",
      publishedAt: a.publishedAt ? new Date(a.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now",
      category,
      trendingBadge: i === 0 ? "🏆 TOP STORY" : "🔥 HOT"
    }));
  } catch (err) {
    console.error("Fetch error:", err);
    return [
      {
        id: "mock-1",
        title: "India Wins Thrilling Match in Dramatic Finish",
        description: "An incredible performance leads to a historic win.",
        url: "#",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop",
        source: "Live Sports",
        publishedAt: "Just now",
        category,
        trendingBadge: "🏆 TOP STORY"
      }
    ];
  }
}

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
      
      {/* Header */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#2563eb' }}>
          ⚽ Sports News
        </div>
      </header>
      
      {/* Main Content */}
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
      
      {/* Footer */}
      <footer style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', textAlign: 'center', padding: '20px', color: '#64748b', fontSize: '0.9rem', marginTop: '40px' }}>
        © {new Date().getFullYear()} Sports News Hub — All Rights Reserved.
      </footer>
    </div>
  );
}
