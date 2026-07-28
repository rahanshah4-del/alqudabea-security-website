import { useRef, useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Container } from '@/components/Container';
import { SITE_URL, breadcrumbSchema } from '@/config/seo';
import { ARTICLES, BLOG_CATEGORIES, AUTHORS, getRelatedArticles } from '@/data/blog';

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const contentRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: contentRef });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const article = ARTICLES.find((a) => a.slug === slug);

  const renderedContent = useMemo(() => {
    if (!article) { return []; }
    return article.content.split('\n').map((line, i) => {
      const key = `l-${i}`;
      if (line.startsWith('## ')) { return <h2 key={key} className="mt-10 mb-4 font-sans text-2xl font-semibold text-neutral-100">{line.slice(3)}</h2>; }
      if (line.startsWith('**') && line.endsWith('**')) { return <h3 key={key} className="mt-8 mb-3 font-sans text-lg font-semibold text-neutral-200">{line.replace(/\*\*/g, '')}</h3>; }
      if (line.startsWith('- ')) { return <li key={key} className="ml-4 text-neutral-400" style={{ listStyleType: 'disc' }}>{line.slice(2)}</li>; }
      if (line === '') { return <br key={key} />; }
      return <p key={key} className="text-neutral-400 leading-relaxed">{line}</p>;
    });
  }, [article]);

  if (!article) { return <Navigate to="/blog" replace />; }

  const related = getRelatedArticles(article, 3);
  const author = AUTHORS[article.author];
  const category = BLOG_CATEGORIES.find((c) => c.slug === article.category);
  const idx = ARTICLES.findIndex((a) => a.id === article.id);
  const prev = idx > 0 ? ARTICLES[idx - 1] : null;
  const next = idx < ARTICLES.length - 1 ? ARTICLES[idx + 1] : null;

  const PAGE_TITLE = `${article.title} — ALQUDABEA Blog`;
  const BREADCRUMB = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }, { name: article.title, url: `/blog/${article.slug}` }]);
  const ARTICLE_SCHEMA = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: article.title, description: article.excerpt,
    datePublished: article.publishedDate,
    author: { '@type': 'Person', name: author?.name || 'ALQUDABEA' },
    publisher: { '@type': 'Organization', name: 'ALQUDABEA SECURITY SERVICES W.L.L.', url: SITE_URL },
    articleSection: category?.label,
    keywords: article.tags?.join(', '),
  };


  return (
    <>
      <SEO title={PAGE_TITLE} description={article.excerpt} path={`/blog/${article.slug}`} schema={[BREADCRUMB, ARTICLE_SCHEMA]} />
      <main>
        <motion.div className="bg-accent-500 fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left" style={{ scaleX: scaleY }} />
        <article className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="from-accent-500/[0.05] to-surface-root absolute inset-0 bg-gradient-to-b" />
          </div>
          <Container size="small">
            <Link to="/blog" className="text-accent-400 mb-6 inline-flex items-center gap-1.5 text-sm font-medium hover:text-accent-300"><ArrowLeft className="h-4 w-4" /> Back to Blog</Link>
            {category && <span className="font-mono text-xs font-medium tracking-[0.2em] text-accent-400 uppercase">{category.label}</span>}
            <h1 className="mt-3 max-w-3xl font-sans text-3xl font-bold tracking-[-0.02em] lg:text-5xl">
              <span className="text-gradient">{article.title}</span>
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
              {author && <span className="inline-flex items-center gap-2"><span className="bg-accent-500/10 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-accent-400">{author.avatar}</span>{author.name}, {author.role}</span>}
              <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{article.publishedDate}</span>
              <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{article.readTime} read</span>
            </div>
          </Container>
        </article>
        <section className="pb-20 lg:pb-28">
          <Container size="small">
            <div className="grid gap-16 lg:grid-cols-[1fr_200px]">
              <div ref={contentRef} className="max-w-none text-base leading-relaxed">
                {renderedContent}
              </div>
              <aside className="hidden lg:block">
                <div className="sticky top-28 space-y-6">
                  <div className="glass rounded-xl p-4">
                    <h4 className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider">Tags</h4>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {article.tags.map((t) => (<span key={t} className="bg-surface-raised border-theme rounded-md border px-2 py-0.5 font-mono text-[10px] text-neutral-500">{t}</span>))}
                    </div>
                  </div>
                  <button onClick={() => { navigator.clipboard.writeText(window.location.href); }} className="glass flex w-full items-center gap-2 rounded-xl p-3 text-sm text-neutral-400 transition-colors hover:text-neutral-200">
                    <Share2 className="h-4 w-4" /> Share Article
                  </button>
                </div>
              </aside>
            </div>
          </Container>
        </section>
        <section className="border-theme-muted border-t py-12">
          <Container>
            <div className="flex items-center justify-between gap-4">
              {prev ? (
                <Link to={`/blog/${prev.slug}`} className="group flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-200">
                  <ChevronLeft className="h-4 w-4" /> <span className="hidden sm:inline">{prev.title.slice(0, 40)}...</span>
                </Link>
              ) : <div />}
              {next ? (
                <Link to={`/blog/${next.slug}`} className="group flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-200">
                  <span className="hidden sm:inline">{next.title.slice(0, 40)}...</span> <ChevronRight className="h-4 w-4" />
                </Link>
              ) : <div />}
            </div>
          </Container>
        </section>
        {related.length > 0 && (
          <section className="bg-surface-muted/40 py-16 lg:py-24">
            <Container>
              <h2 className="font-sans text-2xl font-semibold text-neutral-100">Related Articles</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((ra) => (
                  <Link key={ra.id} to={`/blog/${ra.slug}`} className="card-premium group flex flex-col gap-3 p-5">
                    <span className="font-mono text-[10px] font-medium tracking-wider text-accent-400 uppercase">{BLOG_CATEGORIES.find((c) => c.slug === ra.category)?.label}</span>
                    <h3 className="font-sans font-semibold text-neutral-100 transition-colors group-hover:text-accent-400 line-clamp-2">{ra.title}</h3>
                    <p className="text-xs text-neutral-500 line-clamp-2">{ra.excerpt}</p>
                    <span className="text-xs text-neutral-600">{ra.readTime} &bull; {ra.publishedDate}</span>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>
    </>
  );
}
