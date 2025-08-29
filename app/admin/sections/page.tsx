import { prisma } from '@/lib/prisma'
import { Card, Button, Input, Label } from '@/components/ui'
import { revalidatePath } from 'next/cache'

async function createSection(formData: FormData) {
  'use server'
  const topicId = Number(formData.get('topicId') || 0)
  await prisma.section.create({
    data: {
      topicId,
      slug: String(formData.get('slug') || ''),
      title: String(formData.get('title') || ''),
      order: Number(formData.get('order') || 0)
    }
  })
  revalidatePath('/admin/sections')
}

async function deleteSection(formData: FormData) {
  'use server'
  const id = Number(formData.get('id'))
  await prisma.section.delete({ where: { id } })
  revalidatePath('/admin/sections')
}

export default async function SectionsAdmin() {
  const [topics, sections] = await Promise.all([
    prisma.topic.findMany({ orderBy: { order: 'asc' } }),
    prisma.section.findMany({ orderBy: [{ topicId: 'asc' }, { order: 'asc' }], include: { topic: true } })
  ])
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Create Section</h1>
        <form action={createSection} className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Topic</Label>
            <select name="topicId" className="w-full rounded-xl2 bg-[#0d2333] text-white border border-white/10 px-3 py-2">
              {topics.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
            </select>
          </div>
          <div><Label>Slug</Label><Input name="slug" required /></div>
          <div><Label>Title</Label><Input name="title" required /></div>
          <div><Label>Order</Label><Input name="order" type="number" defaultValue={0} /></div>
          <Button type="submit" className="md:col-span-2">Create</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Existing Sections</h2>
        <div className="space-y-3">
          {sections.map(s => (
            <form key={s.id} action={deleteSection} className="flex items-center justify-between bg-[#0d2333] rounded-xl2 border border-white/10 p-3">
              <div>
                <div className="font-medium">{s.title}</div>
                <div className="text-white/60 text-sm">{s.topic.title} • {s.slug}</div>
              </div>
              <input type="hidden" name="id" value={s.id} />
              <Button type="submit">Delete</Button>
            </form>
          ))}
        </div>
      </Card>
    </div>
  )
}
