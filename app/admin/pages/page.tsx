import { prisma } from '@/lib/prisma'
import { Card, Button, Input, Label, Textarea } from '@/components/ui'
import { revalidatePath } from 'next/cache'

async function createPage(formData: FormData) {
  'use server'
  const sectionId = Number(formData.get('sectionId') || 0)
  await prisma.page.create({
    data: {
      sectionId,
      slug: String(formData.get('slug') || ''),
      title: String(formData.get('title') || ''),
      content: String(formData.get('content') || ''),
      order: Number(formData.get('order') || 0),
      published: Boolean(formData.get('published'))
    }
  })
  revalidatePath('/admin/pages')
}

async function deletePage(formData: FormData) {
  'use server'
  const id = Number(formData.get('id'))
  await prisma.page.delete({ where: { id } })
  revalidatePath('/admin/pages')
}

export default async function PagesAdmin() {
  const [sections, pages] = await Promise.all([
    prisma.section.findMany({ orderBy: { title: 'asc' }, include: { topic: true } }),
    prisma.page.findMany({ orderBy: [{ sectionId: 'asc' }, { order: 'asc' }], include: { section: { include: { topic: true } } } })
  ])
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Create Page</h1>
        <form action={createPage} className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label>Section</Label>
            <select name="sectionId" className="w-full rounded-xl2 bg-[#0d2333] text-white border border-white/10 px-3 py-2">
              {sections.map(s => <option key={s.id} value={s.id}>{s.topic.title} • {s.title}</option>)}
            </select>
          </div>
          <div><Label>Slug</Label><Input name="slug" required /></div>
          <div><Label>Title</Label><Input name="title" required /></div>
          <div className="md:col-span-2"><Label>Content (Markdown)</Label><Textarea name="content" /></div>
          <div><Label>Order</Label><Input name="order" type="number" defaultValue={0} /></div>
          <div className="flex items-center gap-2">
            <input id="published" name="published" type="checkbox" defaultChecked />
            <Label htmlFor="published">Published</Label>
          </div>
          <Button type="submit" className="md:col-span-2">Create</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Existing Pages</h2>
        <div className="space-y-3">
          {pages.map(p => (
            <form key={p.id} action={deletePage} className="flex items-center justify-between bg-[#0d2333] rounded-xl2 border border-white/10 p-3">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-white/60 text-sm">{p.section.topic.title} • {p.section.title} • {p.slug}</div>
              </div>
              <input type="hidden" name="id" value={p.id} />
              <Button type="submit">Delete</Button>
            </form>
          ))}
        </div>
      </Card>
    </div>
  )
}
