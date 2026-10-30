import React, { useState, useEffect } from 'react';
import { fetchHeadlines, CATEGORIES } from './newsApi';
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
    <div className="app-container">
      <Header />
      
      <main style={{ padding: '20px' }}>
        <h1>SPORTS WIRE — Live Daily Sports News</h1>
        
        {loading ? (
          <p>Loading latest sports news...</p>
        ) : (
          <div className="news-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {articles.map((article) => (
              <div className="news-card" key={article.id}>
                <div className="card-image-wrapper">
                  <span className="badge">{article.trendingBadge}</span>
                  <img src={article.image} alt={article.title} className="card-img" />
                </div>
                
                <div className="card-body">
                  <div className="card-meta">
                    <span className="source-tag">📍 {article.source}</span>
                    <span className="time-tag">⏱️ {article.publishedAt}</span>
                  </div>
                  
                  <h3 className="card-title">{article.title}</h3>
                  <p className="card-desc">{article.description}</p>
                  
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-btn">
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
