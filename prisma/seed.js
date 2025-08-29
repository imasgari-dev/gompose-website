import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create sample content
  const topic = await prisma.topic.upsert({
    where: { slug: 'fastapi-like' },
    update: {},
    create: {
      slug: 'fastapi-like',
      title: 'Your Framework',
      description: 'Overview of your framework, inspired by FastAPI docs.',
      order: 1,
      sections: {
        create: [{
          slug: 'getting-started',
          title: 'Getting Started',
          order: 1,
          pages: {
            create: [
              { slug: 'introduction', title: 'Introduction', content: '# Introduction\nWelcome!', order: 1 },
              { slug: 'installation', title: 'Installation', content: '# Installation\nHow to install.', order: 2 }
            ]
          }
        },{
          slug: 'features',
          title: 'Features',
          order: 2,
          pages: {
            create: [
              { slug: 'performance', title: 'Performance', content: '# Performance\nIt is fast.', order: 1 },
              { slug: 'typing', title: 'Typing', content: '# Typing\nStatic types FTW.', order: 2 }
            ]
          }
        }]
      }
    }
  });

  await prisma.blogPost.upsert({
    where: { slug: 'hello-world' },
    update: {},
    create: {
      slug: 'hello-world',
      title: 'Hello, world',
      excerpt: 'First post',
      content: '# Blog\nThis is your first blog post.',
      published: true,
      tags: ['intro']
    }
  });
}

main().then(async () => {
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
