import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Card, Container, Pill } from '@/components/ui'
import { Banner } from '@/components/images'

export default async function Home() {
  const topics = await prisma.topic.findMany({ orderBy: { order: 'asc' }, include: { sections: { include: { pages: true } } } })
  return (
    <Container>
      <Banner></Banner>
      <br/>
      <section className="text-center space-y-4 mb-10">
        <h1 className="text-4xl font-bold">Gompose</h1>
        <p className="text-white/70 max-w-2xl mx-auto">A ready-to-run and flexible backend framework for Go that gets your services up and running in seconds.</p>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        {topics.map(t => (
          <Card key={t.id} className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-semibold">{t.title}</h2>
              <Pill>{t.sections.length} sections</Pill>
            </div>
            <p className="text-white/70 mb-4">{t.description}</p>
            <Link className="text-accent" href={`/topics/${t.slug}`}>Open topic →</Link>
          </Card>
        ))}
      </div>
    </Container>
  )
}
