/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  ARTICLES as DEFAULT_ARTICLES,
  BLOG_CATEGORIES as DEFAULT_CATEGORIES,
  BLOG_TAGS as DEFAULT_TAGS,
  AUTHORS as DEFAULT_AUTHORS,
} from '@/data/blog';

const BlogContext = createContext(null);

const LS_KEY_ARTICLES = 'alqudabea_blog_articles';
const LS_KEY_CATEGORIES = 'alqudabea_blog_categories';
const LS_KEY_TAGS = 'alqudabea_blog_tags';

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch { /* quota exceeded — silently ignore */ }
}

export function BlogProvider({ children }) {
  const [articles, setArticles] = useState(() => load(LS_KEY_ARTICLES, DEFAULT_ARTICLES));
  const [categories, setCategories] = useState(() => load(LS_KEY_CATEGORIES, DEFAULT_CATEGORIES));
  const [tags, setTags] = useState(() => load(LS_KEY_TAGS, DEFAULT_TAGS));

  // Persist on change
  useEffect(() => { save(LS_KEY_ARTICLES, articles); }, [articles]);
  useEffect(() => { save(LS_KEY_CATEGORIES, categories); }, [categories]);
  useEffect(() => { save(LS_KEY_TAGS, tags); }, [tags]);

  // ── Article CRUD ──────────────────────────────────────
  const addArticle = useCallback((article) => {
    const now = new Date().toISOString();
    const id = `post-${Date.now()}`;
    const slug = article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setArticles((prev) => [{ ...article, id, slug, createdAt: now, updatedAt: now }, ...prev]);
    return id;
  }, []);

  const updateArticle = useCallback((id, updates) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a))
    );
  }, []);

  const deleteArticle = useCallback((id) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }, []);

  // ── Category CRUD ─────────────────────────────────────
  const addCategory = useCallback((cat) => {
    const newCat = { ...cat, id: cat.id || cat.label.toLowerCase().replace(/\s+/g, '-'), count: 0 };
    setCategories((prev) => [...prev, newCat]);
  }, []);

  const updateCategory = useCallback((id, updates) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  }, []);

  const deleteCategory = useCallback((id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }, []);

  // ── Tag CRUD ──────────────────────────────────────────
  const addTag = useCallback((tag) => {
    setTags((prev) => [...prev, tag].filter((v, i, a) => a.indexOf(v) === i).sort());
  }, []);

  const deleteTag = useCallback((tag) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  }, []);

  // ── Reset to defaults ─────────────────────────────────
  const resetToDefaults = useCallback(() => {
    setArticles(DEFAULT_ARTICLES);
    setCategories(DEFAULT_CATEGORIES);
    setTags(DEFAULT_TAGS);
  }, []);

  const value = useMemo(
    () => ({
      articles,
      categories,
      tags,
      authors: DEFAULT_AUTHORS,
      addArticle,
      updateArticle,
      deleteArticle,
      addCategory,
      updateCategory,
      deleteCategory,
      addTag,
      deleteTag,
      resetToDefaults,
    }),
    [articles, categories, tags, addArticle, updateArticle, deleteArticle, addCategory, updateCategory, deleteCategory, addTag, deleteTag, resetToDefaults]
  );

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}

export function useBlog() {
  const ctx = useContext(BlogContext);
  if (!ctx) throw new Error('useBlog must be used within BlogProvider');
  return ctx;
}
