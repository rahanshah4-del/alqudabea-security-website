import { useState } from 'react';
import {
  FileText, Plus, Trash2, Search, Edit3, Eye, Tag, FolderOpen,
  X, Check, BarChart3, Users, Layers, Hash, BookOpen, ChevronDown,
  Calendar, Clock, RefreshCw, AlertTriangle,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { useBlog } from '@/context/BlogContext';
import { cn } from '@/utils/cn';

const FORM_FIELDS = ['title', 'slug', 'excerpt', 'content', 'category', 'author', 'imageUrl', 'featured', 'tags'];

const emptyForm = {
  title: '', slug: '', excerpt: '', content: '', category: '',
  author: 'ahmed-al-mahmood', imageUrl: '', featured: false, tags: [],
  readTime: '5 min read', date: new Date().toISOString().split('T')[0],
};

const inputCls = 'w-full rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-2.5 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none transition-colors';
const textareaCls = 'w-full rounded-xl border border-theme-muted bg-surface-muted/40 px-4 py-3 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none transition-colors resize-y';

const badgeCls = 'inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium';

export default function BlogPage() {
  const {
    articles, categories, tags, authors,
    addArticle, updateArticle, deleteArticle,
    addCategory, deleteCategory, addTag, deleteTag,
    resetToDefaults,
  } = useBlog();

  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [showDelete, setShowDelete] = useState(null);
  const [tab, setTab] = useState('posts'); // posts | categories | tags
  const [newCatLabel, setNewCatLabel] = useState('');
  const [newTag, setNewTag] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [showReset, setShowReset] = useState(false);

  // ── Filters ───────────────────────────────────────────
  const filtered = articles.filter((a) => {
    if (search) {
      const q = search.toLowerCase();
      if (!a.title.toLowerCase().includes(q) && !a.excerpt?.toLowerCase().includes(q)) return false;
    }
    if (filterCat && a.category !== filterCat) return false;
    return true;
  });

  const catCounts = {};
  articles.forEach((a) => { catCounts[a.category] = (catCounts[a.category] || 0) + 1; });

  // ── Form handlers ─────────────────────────────────────
  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (article) => {
    setEditingId(article.id);
    setForm({
      title: article.title || '',
      slug: article.slug || '',
      excerpt: article.excerpt || '',
      content: article.content || '',
      category: article.category || '',
      author: article.author || 'ahmed-al-mahmood',
      imageUrl: article.imageUrl || '',
      featured: article.featured || false,
      tags: article.tags || [],
      readTime: article.readTime || '5 min read',
      date: article.date || article.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
    });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim() || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      category: form.category,
      author: form.author,
      imageUrl: form.imageUrl.trim(),
      featured: form.featured,
      tags: form.tags,
      readTime: form.readTime,
      date: form.date,
    };

    if (editingId) {
      updateArticle(editingId, payload);
    } else {
      addArticle(payload);
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const confirmDelete = (article) => setShowDelete(article);
  const handleDelete = () => {
    if (showDelete) { deleteArticle(showDelete.id); setShowDelete(null); }
  };

  const handleTagKey = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const t = tagInput.trim();
      if (!form.tags.includes(t)) {
        setForm((prev) => ({ ...prev, tags: [...prev.tags, t] }));
      }
      setTagInput('');
      // Also add to global tags
      if (!tags.includes(t)) addTag(t);
    }
  };

  const removeFormTag = (t) => setForm((prev) => ({ ...prev, tags: prev.tags.filter((x) => x !== t) }));

  // ── Stats ─────────────────────────────────────────────
  const stats = [
    { icon: FileText, label: 'Total Posts', value: articles.length, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { icon: Layers, label: 'Categories', value: categories.length, color: 'text-violet-400', bg: 'bg-violet-500/10' },
    { icon: Hash, label: 'Tags', value: tags.length, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { icon: Users, label: 'Authors', value: Object.keys(authors).length, color: 'text-green-400', bg: 'bg-green-500/10' },
  ];

  return (
    <div className="space-y-6">
      <SEO title="Blog Management — Admin" noIndex />

      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-sans text-2xl font-bold tracking-[-0.02em] text-theme-primary">Blog Management</h1>
          <p className="mt-1 text-sm text-theme-muted">{articles.length} posts · {categories.length} categories · {tags.length} tags</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowReset(true)}
            className="flex items-center gap-2 rounded-xl border border-theme-muted px-4 py-2.5 text-sm font-medium text-theme-muted transition-all hover:bg-surface-overlay hover:text-theme-primary"
          >
            <RefreshCw className="h-4 w-4" /> Reset
          </button>
          <button
            onClick={openNew}
            className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"
          >
            <Plus className="h-4 w-4" /> New Post
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-theme-muted bg-surface-raised p-4 text-center">
            <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className={`mt-2 font-sans text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-theme-muted uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-xl bg-surface-muted/40 p-1">
          {[
            { key: 'posts', label: 'Posts', icon: FileText },
            { key: 'categories', label: 'Categories', icon: FolderOpen },
            { key: 'tags', label: 'Tags', icon: Tag },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all',
                tab === t.key ? 'bg-accent-500 text-white' : 'text-theme-muted hover:text-theme-primary'
              )}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'posts' && (
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-theme-muted" />
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-xl border border-theme-muted bg-surface-muted/40 py-2.5 pl-10 pr-4 text-sm text-theme-primary placeholder:text-theme-muted focus:border-accent-500 focus:outline-none w-56"
              />
            </div>
            <select
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
              className="rounded-xl border border-theme-muted bg-surface-muted/40 px-3 py-2.5 text-sm text-theme-primary focus:border-accent-500 focus:outline-none"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* ── Posts Tab ──────────────────────────────────── */}
      {tab === 'posts' && (
        <div className="rounded-2xl border border-theme-muted bg-surface-raised overflow-hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <FileText className="h-12 w-12 text-theme-muted" />
              <p className="mt-4 text-sm text-theme-muted">No blog posts found</p>
              <button onClick={openNew} className="mt-3 text-sm text-accent-400 hover:underline">Create your first post</button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-theme-muted text-left">
                    <th className="px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-theme-muted">Post</th>
                    <th className="px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-theme-muted hidden md:table-cell">Category</th>
                    <th className="px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-theme-muted hidden lg:table-cell">Tags</th>
                    <th className="px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-theme-muted hidden sm:table-cell">Author</th>
                    <th className="px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-theme-muted hidden sm:table-cell">Date</th>
                    <th className="px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-theme-muted text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a) => {
                    const cat = categories.find((c) => c.id === a.category);
                    const author = authors[a.author];
                    return (
                      <tr key={a.id} className="border-b border-theme-muted/50 hover:bg-surface-muted/20 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 shrink-0 rounded-lg bg-accent-500/10 flex items-center justify-center">
                              <FileText className="h-4 w-4 text-accent-400" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-theme-primary truncate max-w-64">{a.title}</p>
                              <p className="text-[11px] text-theme-muted truncate max-w-64">{a.excerpt?.slice(0, 60)}</p>
                              {a.featured && <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-400">⭐ Featured</span>}
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 hidden md:table-cell">
                          {cat && <span className={cn(badgeCls, 'bg-accent-500/10 text-accent-400')}><FolderOpen className="h-3 w-3" /> {cat.label}</span>}
                        </td>
                        <td className="px-5 py-3.5 hidden lg:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {a.tags?.slice(0, 3).map((t) => (
                              <span key={t} className="rounded-md bg-surface-muted/60 px-2 py-0.5 text-[10px] text-theme-muted">{t}</span>
                            ))}
                            {a.tags?.length > 3 && <span className="text-[10px] text-theme-muted">+{a.tags.length - 3}</span>}
                          </div>
                        </td>
                        <td className="px-5 py-3.5 hidden sm:table-cell">
                          <span className="text-xs text-theme-secondary">{author?.name || '—'}</span>
                        </td>
                        <td className="px-5 py-3.5 hidden sm:table-cell">
                          <span className="text-xs text-theme-muted flex items-center gap-1"><Calendar className="h-3 w-3" /> {a.date || a.createdAt?.split('T')[0] || '—'}</span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <a href={`/blog/${a.slug}`} target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-theme-muted hover:bg-surface-overlay hover:text-blue-400 transition-all" title="View"><Eye className="h-4 w-4" /></a>
                            <button onClick={() => openEdit(a)} className="rounded-lg p-2 text-theme-muted hover:bg-surface-overlay hover:text-amber-400 transition-all" title="Edit"><Edit3 className="h-4 w-4" /></button>
                            <button onClick={() => confirmDelete(a)} className="rounded-lg p-2 text-theme-muted hover:bg-danger-500/10 hover:text-danger-400 transition-all" title="Delete"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── Categories Tab ─────────────────────────────── */}
      {tab === 'categories' && (
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-6">
          <div className="flex items-center gap-3 mb-6">
            <input
              type="text"
              placeholder="New category name..."
              value={newCatLabel}
              onChange={(e) => setNewCatLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newCatLabel.trim()) {
                  addCategory({ label: newCatLabel.trim(), slug: newCatLabel.toLowerCase().replace(/\s+/g, '-') });
                  setNewCatLabel('');
                }
              }}
              className={cn(inputCls, 'max-w-xs')}
            />
            <button
              onClick={() => {
                if (newCatLabel.trim()) {
                  addCategory({ label: newCatLabel.trim(), slug: newCatLabel.toLowerCase().replace(/\s+/g, '-') });
                  setNewCatLabel('');
                }
              }}
              className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>

          <div className="space-y-2">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between rounded-xl bg-surface-muted/40 px-4 py-3">
                <div className="flex items-center gap-3">
                  <FolderOpen className="h-4 w-4 text-accent-400" />
                  <span className="text-sm font-medium text-theme-primary">{cat.label}</span>
                  <span className="text-[11px] text-theme-muted">({catCounts[cat.id] || 0} posts)</span>
                </div>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="rounded-lg p-2 text-theme-muted hover:bg-danger-500/10 hover:text-danger-400 transition-all"
                  title="Delete category"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tags Tab ───────────────────────────────────── */}
      {tab === 'tags' && (
        <div className="rounded-2xl border border-theme-muted bg-surface-raised p-6">
          <div className="flex items-center gap-3 mb-6">
            <input
              type="text"
              placeholder="New tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newTag.trim()) {
                  addTag(newTag.trim());
                  setNewTag('');
                }
              }}
              className={cn(inputCls, 'max-w-xs')}
            />
            <button
              onClick={() => {
                if (newTag.trim()) { addTag(newTag.trim()); setNewTag(''); }
              }}
              className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((t) => {
              const count = articles.filter((a) => a.tags?.includes(t)).length;
              return (
                <div key={t} className="flex items-center gap-2 rounded-xl bg-surface-muted/40 px-3 py-2">
                  <Tag className="h-3.5 w-3.5 text-theme-muted" />
                  <span className="text-sm text-theme-primary">{t}</span>
                  <span className="text-[10px] text-theme-muted">({count})</span>
                  <button
                    onClick={() => deleteTag(t)}
                    className="ml-1 rounded-md p-0.5 text-theme-muted hover:bg-danger-500/10 hover:text-danger-400 transition-all"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── New/Edit Post Modal ────────────────────────── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} type="button" aria-label="Close" />

          <div className="glass relative mx-4 w-full max-w-3xl rounded-3xl p-6 lg:p-8 shadow-overlay">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-sans text-xl font-bold text-theme-primary">
                {editingId ? 'Edit Post' : 'New Blog Post'}
              </h2>
              <button onClick={() => setShowForm(false)} className="rounded-xl p-2 text-theme-muted hover:bg-surface-overlay transition-all"><X className="h-5 w-5" /></button>
            </div>

            <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
              {/* Title */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-theme-secondary">Title *</label>
                <input type="text" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Enter post title..." className={inputCls} />
              </div>

              {/* Slug */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-theme-secondary">Slug</label>
                <input type="text" value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} placeholder="auto-generated-if-empty" className={inputCls} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Category */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-theme-secondary">Category</label>
                  <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className={inputCls}>
                    <option value="">Select category...</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>

                {/* Author */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-theme-secondary">Author</label>
                  <select value={form.author} onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))} className={inputCls}>
                    {Object.entries(authors).map(([key, a]) => <option key={key} value={key}>{a.name}</option>)}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-theme-secondary">Publish Date</label>
                  <input type="date" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} className={inputCls} />
                </div>

                {/* Read Time */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-theme-secondary">Read Time</label>
                  <input type="text" value={form.readTime} onChange={(e) => setForm((p) => ({ ...p, readTime: e.target.value }))} placeholder="5 min read" className={inputCls} />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-theme-secondary">Excerpt</label>
                <textarea value={form.excerpt} onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))} placeholder="Brief description of the post..." rows={2} className={textareaCls} />
              </div>

              {/* Content (Markdown) */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-theme-secondary">Content (Markdown)</label>
                <textarea value={form.content} onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))} placeholder={`## Section Title\n\nYour content here. Use **bold**, - lists, etc.\n\n**Key Point**\n\nMore details here.`} rows={12} className={cn(textareaCls, 'font-mono text-xs')} />
              </div>

              {/* Image URL */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-theme-secondary">Image URL</label>
                <input type="url" value={form.imageUrl} onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))} placeholder="https://..." className={inputCls} />
              </div>

              {/* Tags */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-theme-secondary">Tags</label>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {form.tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 rounded-lg bg-accent-500/10 px-2.5 py-1 text-xs text-accent-400">
                      {t} <button onClick={() => removeFormTag(t)} className="hover:text-danger-400"><X className="h-3 w-3" /></button>
                    </span>
                  ))}
                </div>
                <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleTagKey} placeholder="Type tag and press Enter..." className={inputCls} />
              </div>

              {/* Featured Toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))} className="h-4 w-4 rounded border-theme-muted bg-surface-muted text-accent-500 focus:ring-accent-500" />
                <span className="text-sm text-theme-secondary">⭐ Featured Post</span>
              </label>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-theme-muted pt-5">
              <button onClick={() => setShowForm(false)} className="rounded-xl border border-theme-muted px-5 py-2.5 text-sm font-medium text-theme-secondary transition-all hover:bg-surface-overlay">Cancel</button>
              <button onClick={handleSave} className="flex items-center gap-2 rounded-xl bg-accent-500 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-400 disabled:opacity-50" disabled={!form.title.trim()}>
                <Check className="h-4 w-4" /> {editingId ? 'Update Post' : 'Publish Post'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation ─────────────────────────── */}
      {showDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDelete(null)} type="button" />
          <div className="glass relative mx-4 w-full max-w-sm rounded-3xl p-8 text-center shadow-overlay">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-danger-500/10 border border-danger-500/20">
              <AlertTriangle className="h-7 w-7 text-danger-400" />
            </div>
            <h2 className="mt-5 font-sans text-xl font-bold text-theme-primary">Delete Post</h2>
            <p className="mt-2 text-sm text-theme-muted">Are you sure you want to delete <strong>&ldquo;{showDelete.title}&rdquo;</strong>? This action cannot be undone.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowDelete(null)} className="flex-1 rounded-xl border border-theme-muted py-2.5 text-sm font-medium text-theme-secondary transition-all hover:bg-surface-overlay">Cancel</button>
              <button onClick={handleDelete} className="flex-1 rounded-xl bg-danger-500 py-2.5 text-sm font-medium text-white transition-all hover:bg-danger-400">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Reset Confirmation ──────────────────────────── */}
      {showReset && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowReset(false)} type="button" />
          <div className="glass relative mx-4 w-full max-w-sm rounded-3xl p-8 text-center shadow-overlay">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <RefreshCw className="h-7 w-7 text-amber-400" />
            </div>
            <h2 className="mt-5 font-sans text-xl font-bold text-theme-primary">Reset Blog Data</h2>
            <p className="mt-2 text-sm text-theme-muted">This will restore all default blog posts, categories, and tags. Any changes you made will be lost.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowReset(false)} className="flex-1 rounded-xl border border-theme-muted py-2.5 text-sm font-medium text-theme-secondary transition-all hover:bg-surface-overlay">Cancel</button>
              <button onClick={() => { resetToDefaults(); setShowReset(false); }} className="flex-1 rounded-xl bg-amber-500 py-2.5 text-sm font-medium text-white transition-all hover:bg-amber-400">Reset</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
