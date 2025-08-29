"use client"

import { useState } from "react"
import { Container, Input, Button } from "@/components/ui"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
      headers: { "Content-Type": "application/json" },
    })

    setLoading(false)

    if (res.ok) {
      setStatus("✅ Message sent successfully!")
      form.reset()
    } else {
      setStatus("❌ Failed to send. Try again later.")
    }
  }

  return (
   <Container>
      <article className="prose prose-invert max-w-none">
        <h1>Contact</h1>
         <p>
          Have questions, feedback, or want to collaborate? 
          Feel free to reach out using the form below or connect directly via LinkedIn or GitHub.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mt-6">
          <Input name="name" placeholder="Your name" required />
          <Input name="email" type="email" placeholder="Your email" required />
          <textarea
            name="message"
            placeholder="Your message..."
            required
            className="w-full rounded-xl bg-background text-ink p-3 border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent"
            rows={5}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>

        {status && <p className="mt-4">{status}</p>}

        <h2 className="mt-10">Other Ways to Reach Me</h2>
        <ul>
          <li>
            LinkedIn:{" "}
            <a href="https://www.linkedin.com/in/unk-iman-dev" target="_blank" rel="noopener noreferrer">
              Iman Asgari LinkedIn
            </a>
          </li>
          <li>
            GitHub:{" "}
            <a href="https://github.com/Lumicrate/gompose" target="_blank" rel="noopener noreferrer">
              GitHub Repository
            </a>
          </li>
        </ul>
      </article>
    </Container>
  )
}
