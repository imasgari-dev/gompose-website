import { prisma } from '@/lib/prisma'
import { Card, Button, Input, Label } from '@/components/ui'
import { revalidatePath } from 'next/cache'

async function createTopic(formData: FormData) {
  'use server'
  const data = {
    slug: String(formData.get('slug') || ''),
    title: String(formData.get('title') || ''),
    description: String(formData.get('description') || ''),
    order: Number(formData.get('order') || 0)
  }
  await prisma.topic.create({ data })
  revalidatePath('/admin/topics')
}

async function deleteTopic(formData: FormData) {
  'use server'
  const id = Number(formData.get('id'))
  await prisma.topic.delete({ where: { id } })
  revalidatePath('/admin/topics')
}

export default async function TopicsAdmin() {
  const topics = await prisma.topic.findMany({ orderBy: { order: 'asc' } })
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Create Topic</h1>
        <form action={createTopic} className="grid md:grid-cols-2 gap-4">
          <div><Label>Slug</Label><Input name="slug" required /></div>
          <div><Label>Title</Label><Input name="title" required /></div>
          <div className="md:col-span-2"><Label>Description</Label><Input name="description" /></div>
          <div><Label>Order</Label><Input name="order" type="number" defaultValue={0} /></div>
          <Button type="submit" className="md:col-span-2">Create</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Existing Topics</h2>
        <div className="space-y-3">
          {topics.map(t => (
            <form key={t.id} action={deleteTopic} className="flex items-center justify-between bg-[#0d2333] rounded-xl2 border border-white/10 p-3">
              <div>
                <div className="font-medium">{t.title}</div>
                <div className="text-white/60 text-sm">{t.slug}</div>
              </div>
              <input type="hidden" name="id" value={t.id} />
              <Button type="submit">Delete</Button>
            </form>
          ))}
        </div>
      </Card>
    </div>
  )
}
