// Example News Card Component snippet
<div className="news-card">
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
