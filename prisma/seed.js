import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.contact.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();

  await prisma.project.createMany({
    data: [
      {
        title: 'Portfolio Website',
        description: 'Personal portfolio with React frontend and Express API backend.',
        tech: 'React, Vite, Node.js, Express, Prisma',
        github: 'https://github.com/example/portfolio',
        demo: 'https://portfolio-demo.example.com',
      },
      {
        title: 'Task Management API',
        description: 'REST API for tasks with authentication and role-based access.',
        tech: 'Node.js, Express, PostgreSQL, Prisma, JWT',
        github: 'https://github.com/example/task-api',
        demo: 'https://task-api-demo.example.com',
      },
      {
        title: 'E-commerce Dashboard',
        description: 'Admin dashboard for products, orders, and customer analytics.',
        tech: 'React, Tailwind CSS, Chart.js, Express',
        github: 'https://github.com/example/ecommerce-dashboard',
        demo: 'https://ecommerce-dashboard.example.com',
      },
    ],
  });

  await prisma.skill.createMany({
    data: [
      { name: 'Frontend', tool: 'React' },
      { name: 'Frontend', tool: 'Tailwind CSS' },
      { name: 'Backend', tool: 'Node.js' },
      { name: 'Backend', tool: 'Express' },
      { name: 'Database', tool: 'PostgreSQL' },
      { name: 'ORM', tool: 'Prisma' },
      { name: 'Version Control', tool: 'Git' },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed data inserted successfully.');
  })
  .catch(async (error) => {
    console.error('Seed failed:', error);
    await prisma.$disconnect();
    process.exit(1);
  });

