import { prisma } from '@/lib/prisma'
import { Card, Button, Input, Label, Textarea } from '@/components/ui'
import { revalidatePath } from 'next/cache'

async function createPost(formData: FormData) {
  'use server'
  const tagsRaw = String(formData.get('tags') || '')
  const tags = tagsRaw.split(',').map(s=>s.trim()).filter(Boolean)
  await prisma.blogPost.create({
    data: {
      slug: String(formData.get('slug') || ''),
      title: String(formData.get('title') || ''),
      excerpt: String(formData.get('excerpt') || ''),
      content: String(formData.get('content') || ''),
      tags,
      published: Boolean(formData.get('published'))
    }
  })
  revalidatePath('/admin/posts')
}

async function deletePost(formData: FormData) {
  'use server'
  const id = Number(formData.get('id'))
  await prisma.blogPost.delete({ where: { id } })
  revalidatePath('/admin/posts')
}

export default async function PostsAdmin() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Create Blog Post</h1>
        <form action={createPost} className="grid md:grid-cols-2 gap-4">
          <div><Label>Slug</Label><Input name="slug" required /></div>
          <div><Label>Title</Label><Input name="title" required /></div>
          <div className="md:col-span-2"><Label>Excerpt</Label><Input name="excerpt" /></div>
          <div className="md:col-span-2"><Label>Content (Markdown)</Label><Textarea name="content" /></div>
          <div><Label>Tags (comma separated)</Label><Input name="tags" placeholder="nextjs, prisma" /></div>
          <div className="flex items-center gap-2">
            <input id="published" name="published" type="checkbox" />
            <Label htmlFor="published">Published</Label>
          </div>
          <Button type="submit" className="md:col-span-2">Create</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Existing Posts</h2>
        <div className="space-y-3">
          {posts.map(p => (
            <form key={p.id} action={deletePost} className="flex items-center justify-between bg-[#0d2333] rounded-xl2 border border-white/10 p-3">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-white/60 text-sm">{p.slug}</div>
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
