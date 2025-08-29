import { prisma } from '@/lib/prisma'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Container } from '@/components/ui'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"
import type { BlogPost as PrismaBlogPost } from '@prisma/client'

interface BlogPostPageProps {
  params: { slug: string }
}

type BlogPost = PrismaBlogPost
const SITE_URL = process.env.SITE_URL

async function getPost(slug: string): Promise<BlogPost | null> {
  return prisma.blogPost.findUnique({ where: { slug } })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug)
  if (!post || !post.published) return <Container><p>Not found.</p></Container>

  return (
    <Container>
      <Head post={post} />
      <article className="prose prose-invert max-w-none">
        <h1>{post.title}</h1>
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
          {post.content}
        </ReactMarkdown>
      </article>
    </Container>
  )
}

function Head({ post }: { post: BlogPost }) {
  return (
    <>
      <title>{post.title}</title>
      <meta name="description" content={post.excerpt || post.content.slice(0, 150)} />
      <link rel="canonical" href={`${SITE_URL}/blog/${post.slug}`} />

      {/* Open Graph */}
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.excerpt || post.content.slice(0, 150)} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`${SITE_URL}/blog/${post.slug}`} />
      <meta property="og:image" content="/og-image.png" />
      <meta property="og:site_name" content="Gompose" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.excerpt || post.content.slice(0, 150)} />
      <meta name="twitter:image" content="/og-image.png" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            author: { "@type": "Person", name: "Iman Asgari" },
            datePublished: post.createdAt.toISOString(),
            dateModified: post.updatedAt.toISOString(),
            image: `${SITE_URL}/og-image.png`,
            url: `${SITE_URL}/blog/${post.slug}`,
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