import { redirect } from 'next/navigation'
import { createSession, getSession } from '@/lib/auth'
import { Container, Card, Input, Label, Button } from '@/components/ui'

export const dynamic = 'force-dynamic'

async function doLogin(formData: FormData) {
  'use server'
  const username = formData.get('username')?.toString() || ''
  const password = formData.get('password')?.toString() || ''
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    await createSession(username)
    redirect('/admin')
  }
  redirect('/login?error=1')
}

export default async function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  const session = await getSession()
  if (session) redirect('/admin')
  const error = searchParams.error
  return (
    <Container>
      <div className="max-w-md mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
          {error && <p className="text-red-400 mb-2">Invalid credentials.</p>}
          <form action={doLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" placeholder="admin" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" required />
            </div>
            <Button type="submit" className="w-full">Sign in</Button>
          </form>
        </Card>
      </div>
    </Container>
  )
}
