import { Metadata } from "next"
import { Container } from "@/components/ui"

export const metadata: Metadata = {
  title: "About | Gompose",
  description: "Learn about Gompose, the Go framework for building RESTful APIs quickly and efficiently."
}

export default function AboutPage() {
  return (
    <Container>
      <article className="prose prose-invert max-w-none">
        <h1>About Gompose</h1>
        <p>
          <strong>Gompose</strong> is a Go framework designed for quickly building RESTful APIs with support for multiple HTTP engines and databases such as <span className="text-accent">PostgreSQL</span> and <span className="text-accent">MongoDB</span>. It automates repetitive tasks in backend development while keeping full flexibility for developers to choose their preferred stack.
        </p>

        <h2>Why Gompose Exists</h2>
        <p>
          Developing backend services often involves repetitive boilerplate work—creating CRUD endpoints, configuring databases, handling authentication, and setting up middleware. Gompose solves this problem by providing a ready-to-run framework that sets up fully functional APIs in seconds. This allows developers to focus on the business logic and features rather than boilerplate code.
        </p>

        <h2>The Story Behind Gompose</h2>
        <p>
          As a developer, I often found myself repeating the same steps for backend services, even for simple projects. This wasted time and increased the chance for errors. To solve this, I created <strong>Gompose</strong>—a framework that allows you to get fully functional backend APIs running in seconds. You define your entities, register them, and Gompose generates six standard APIs: create, update, patch, delete, retrieve single, and list with pagination, filters, and sorting.
        </p>

        <h2>Contribute & Learn More</h2>
        <p>
          Gompose is actively developed and open-source. Contributions, suggestions, and feedback are welcome!
        </p>
        <ul>
          <li>
            GitHub:{" "}
            <a href="https://github.com/Lumicrate/gompose" target="_blank" rel="noopener noreferrer">
              View the repository
            </a>
          </li>
          <li>
            LinkedIn:{" "}
            <a href="https://www.linkedin.com/in/unk-iman-dev" target="_blank" rel="noopener noreferrer">
              Connect with me
            </a>
          </li>
        </ul>
      </article>
    </Container>
  )
}
