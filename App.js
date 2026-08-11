import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import Header from "./components/Header";
import Ticker from "./components/Ticker";
import CategoryTabs from "./components/CategoryTabs";
import NewsGrid from "./components/NewsGrid";
import Footer from "./components/Footer";
import { fetchHeadlines, CATEGORIES } from "./api/newsApi";

const REFRESH_MS = 10 * 60 * 1000; // auto-refresh every 10 minutes
const MAX_CARDS = 6; // sports desk shows a smaller, tighter set

export default function App() {
  const [category, setCategory] = useState("sports");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const load = useCallback(async (cat) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchHeadlines(cat);
      setArticles(data);
      setLastUpdated(new Date());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(category);
    const id = setInterval(() => load(category), REFRESH_MS);
    return () => clearInterval(id);
  }, [category, load]);

  return (
    <div className="app">
      <Header />
      <Ticker headlines={articles.slice(0, 12)} />
      <main className="main">
        <div className="main-row">
          {CATEGORIES.length > 1 ? (
            <CategoryTabs
              categories={CATEGORIES}
              active={category}
              onSelect={setCategory}
            />
          ) : (
            <span className="tab tab-active">sports desk</span>
          )}
          <button className="refresh-btn" onClick={() => load(category)}>
            ↻ Refresh
          </button>
        </div>
        {lastUpdated && (
          <p className="updated-msg">
            Last updated {lastUpdated.toLocaleTimeString("en-IN")}
          </p>
        )}
        <NewsGrid articles={articles.slice(0, MAX_CARDS)} loading={loading} error={error} />
      </main>
      <Footer />
    </div>
  );
}
