'use client';

import Link from 'next/link';

const PROJECTS = [
  { id: 1, name: 'Todo App', description: 'Master React fundamentals' },
  { id: 2, name: 'Note-Taking App', description: 'Learn useEffect and localStorage' },
  { id: 3, name: 'Weather App', description: 'Learn API integration' },
  { id: 4, name: 'Counter Game', description: 'Learn component composition' },
  { id: 5, name: 'Photo Gallery', description: 'Learn list rendering and filtering' },
  { id: 6, name: 'Blog with API', description: 'Learn backend with Next.js' },
  { id: 7, name: 'Comment System', description: 'Learn POST/DELETE requests' },
  { id: 8, name: 'File Upload', description: 'Learn file handling' },
  { id: 9, name: 'Real-Time Chat', description: 'Learn WebSockets' },
  { id: 10, name: 'Analytics Dashboard', description: 'Learn data visualization' },
  { id: 11, name: 'User Registration', description: 'Learn authentication' },
  { id: 12, name: 'User Profiles', description: 'Learn authorization' },
  { id: 13, name: 'OAuth Integration', description: 'Learn social login' },
  { id: 14, name: 'Email Verification', description: 'Learn email services' },
  { id: 15, name: 'Multi-Tenant SaaS', description: 'Learn multi-tenant architecture' },
  { id: 16, name: 'Search Engine', description: 'Learn full-text search' },
  { id: 17, name: 'File Manager', description: 'Learn hierarchical data' },
  { id: 18, name: 'Image Processing', description: 'Learn media processing' },
  { id: 19, name: 'Email Campaign', description: 'Learn background jobs' },
  { id: 20, name: 'Payment Processing', description: 'Learn Stripe integration' },
];

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-2">Portfolio Projects</h1>
      <p className="text-gray-600 mb-8">Live projects built with Next.js & React</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/crypto">
          <div className="p-6 border border-blue-500 rounded-lg hover:shadow-lg cursor-pointer bg-blue-50">
            <h2 className="text-xl font-bold mb-2">Crypto Dashboard</h2>
            <p className="text-gray-600">Real-time cryptocurrency data with interactive charts</p>
          </div>
        </Link>

        <Link href="/todos">
          <div className="p-6 border rounded-lg hover:shadow-lg cursor-pointer">
            <h2 className="text-xl font-bold mb-2">Todo App</h2>
            <p className="text-gray-600">Master React fundamentals</p>
          </div>
        </Link>

        {PROJECTS.slice(1).map((project) => (
          <div key={project.id} className="p-6 border rounded-lg hover:shadow-lg">
            <h2 className="text-xl font-bold mb-2">{project.name}</h2>
            <p className="text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}