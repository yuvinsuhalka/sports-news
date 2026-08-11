// Free, no-API-key news mirror (updates every ~15 min, India edition).
// If you have your own NewsAPI/GNews key, swap the fetch URL below.
const BASE_URL = "https://saurav.tech/NewsAPI/top-headlines/category";
const COUNTRY = "in";

export async function fetchHeadlines(category = "general") {
  const url = `${BASE_URL}/${category}/${COUNTRY}.json`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`News request failed: ${res.status}`);
  }
  const data = await res.json();
  const articles = (data.articles || [])
    .filter((a) => a.title && a.title !== "[Removed]")
    .map((a, i) => ({
      id: `${category}-${i}-${a.publishedAt || i}`,
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.urlToImage,
      source: a.source?.name || "Unknown source",
      publishedAt: a.publishedAt,
      category,
    }));
  return articles;
}

// Sports-only edition — the free source has one combined "sports" feed
// (not split by individual sport/league).
export const CATEGORIES = ["sports"];
