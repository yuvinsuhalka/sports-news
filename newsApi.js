// Updated & Reliable News Fetcher
const SAURAV_BASE_URL = "https://saurav.tech/NewsAPI/top-headlines/category";
const FALLBACK_URL = "https://inshortsapi.vercel.app/news?category=sports";

export async function fetchHeadlines(category = "sports") {
  try {
    // Primary Attempt: Saurav API
    const res = await fetch(`${SAURAV_BASE_URL}/${category}/in.json`);
    if (!res.ok) throw new Error("Primary API failed");
    
    const data = await res.json();
    return formatArticles(data.articles || [], category);
  } catch (err) {
    console.warn("Primary news API unreachable, switching to fallback source...", err);
    
    try {
      // Secondary Fallback Attempt (Inshorts mirror)
      const resFallback = await fetch(FALLBACK_URL);
      const fallbackData = await resFallback.json();
      
      return (fallbackData.data || []).map((a, i) => ({
        id: `fallback-${i}-${Date.now()}`,
        title: a.title,
        description: a.content || a.decription,
        url: a.readMoreUrl || a.url || "#",
        image: a.imageUrl || "https://via.placeholder.com/600x400?text=Sports+News",
        source: a.author || "Inshorts Wire",
        publishedAt: a.date || new Date().toISOString(),
        category: category,
        trendingBadge: i < 3 ? "🔥 HOT" : "⚡ LATEST" // Enhanced UI Data
      }));
    } catch (fallbackErr) {
      console.error("Both news feeds failed:", fallbackErr);
      return getMockArticles(category); // Local offline backup so UI never breaks!
    }
  }
}

// Helper: Normalize & Clean Data
function formatArticles(articles, category) {
  return articles
    .filter((a) => a.title && a.title !== "[Removed]")
    .map((a, i) => ({
      id: `${category}-${i}-${a.publishedAt || i}`,
      title: a.title,
      description: a.description || "No full description provided for this headline.",
      url: a.url,
      image: a.urlToImage || "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop",
      source: a.source?.name || "Sports Wire Desk",
      publishedAt: a.publishedAt ? new Date(a.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now",
      category,
      trendingBadge: i === 0 ? "🏆 TOP STORY" : "⚡ SPORTS"
    }));
}

// Helper: Local Fallback Data (Jab Internet/APIs dono down hon)
function getMockArticles(category) {
  return [
    {
      id: "mock-1",
      title: "India Dominates Thrilling Final Match in Shocking Style",
      description: "An unbelievable tactical display leads the team to a massive victory in front of a packed stadium.",
      url: "#",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop",
      source: "Live Sports Desk",
      publishedAt: "Just now",
      category: category,
      trendingBadge: "🏆 TOP STORY"
    },
    {
      id: "mock-2",
      title: "Major Roster Overhaul Announced Ahead of Upcoming Season",
      description: "Coaches reveal major team updates following intense training sessions this week.",
      url: "#",
      image: "https://images.unsplash.com/photo-1517649763962-0c623266010b?w=600&auto=format&fit=crop",
      source: "Global Arena",
      publishedAt: "10 mins ago",
      category: category,
      trendingBadge: "🔥 HOT"
    }
  ];
}

export const CATEGORIES = ["sports", "technology", "business"];
