export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">E-Commerce App</h1>
        <p className="text-gray-600 mb-6">Complete authentication system with Tailwind CSS styling.</p>
        <div className="space-y-3">
          <a
            href="/register"
            className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors"
          >
            Create Account
          </a>
          <a
            href="/login"
            className="block w-full bg-gray-200 text-gray-900 py-2 px-4 rounded-lg font-semibold text-center hover:bg-gray-300 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    </main>
  );
}
