const SAURAV_BASE_URL = "https://saurav.tech/NewsAPI/top-headlines/category";

export async function fetchHeadlines(category = "sports") {
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

export const CATEGORIES = ["sports"];
