import { prisma } from '@/lib/prisma'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Container } from '@/components/ui'
import Link from 'next/link'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const SITE_URL = process.env.SITE_URL

interface DocPageProps {
  params: { topic: string; section: string; page: string }
}

export default async function DocPage({ params }: DocPageProps) {
  // fetch all required data
  const topic = await prisma.topic.findUnique({ where: { slug: params.topic } })
  if (!topic) return <Container><p>Topic not found</p></Container>

  const section = await prisma.section.findFirst({ where: { topicId: topic.id, slug: params.section } })
  if (!section) return <Container><p>Section not found</p></Container>

  const page = await prisma.page.findFirst({ where: { sectionId: section.id, slug: params.page, published: true } })
  if (!page) return <Container><p>Page not found</p></Container>

  const siblings = await prisma.page.findMany({ where: { sectionId: section.id, published: true }, orderBy: { order: 'asc' } })
  const idx = siblings.findIndex(p => p.id === page.id)
  const prev = idx > 0 ? siblings[idx - 1] : null
  const next = idx < siblings.length - 1 ? siblings[idx + 1] : null

  return (
    <Container>
      <Head page={page} topic={topic} section={section} />
      <div className="grid lg:grid-cols-[250px,1fr] gap-8">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-2">
            <h3 className="font-semibold mb-2">Table of contents</h3>
            <ul className="text-white/80 space-y-1">
              {siblings.map(p => (
                <li key={p.id}>
                  <Link href={`/topics/${topic.slug}/${section.slug}/${p.slug}`}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <article className="prose prose-invert max-w-none">
          <h1>{page.title}</h1>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "")
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-panel rounded px-1 py-0.5 text-ink" {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {page.content}
          </ReactMarkdown>

          <div className="flex justify-between mt-8 pt-4 border-t border-white/10">
            <div>{prev && <Link href={`/topics/${topic.slug}/${section.slug}/${prev.slug}`}>← {prev.title}</Link>}</div>
            <div>{next && <Link href={`/topics/${topic.slug}/${section.slug}/${next.slug}`}>{next.title} →</Link>}</div>
          </div>
        </article>
      </div>
    </Container>
  )
}

// SEO Head component
function Head({ page, topic, section }: { page: any; topic: any; section: any }) {
  const url = `${SITE_URL}/topics/${topic.slug}/${section.slug}/${page.slug}`
  const description = page.excerpt || page.content.slice(0, 150)

  return (
    <>
      <title>{page.title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
      <meta property="og:site_name" content="Gompose" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: page.title,
            author: { "@type": "Person", name: "Iman Asgari" },
            datePublished: page.createdAt.toISOString(),
            dateModified: page.updatedAt.toISOString(),
            image: `${SITE_URL}/og-image.png`,
            url,
            publisher: {
              "@type": "Organization",
              name: "Gompose",
              logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
            },
          }),
        }}
      />
    </>
  )
}
