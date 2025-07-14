import Head from 'next/head';

export default function Blog() {
  const posts = [
    { id: 1, title: 'Getting Started with Next.js', excerpt: 'Learn the basics of Next.js and how to create your first app.' },
    { id: 2, title: 'Understanding Pages Router', excerpt: 'Deep dive into the Pages Router architecture in Next.js.' },
    { id: 3, title: 'Migrating to App Router', excerpt: 'Learn how to migrate from Pages Router to App Router in Next.js.' },
  ];

  return (
    <>
      <Head>
        <title>Blog - Next.js Pages Router</title>
      </Head>
      <div className="flex flex-col items-center p-8 pb-20 gap-8 sm:p-20">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Blog Page</h2>
        <div className="max-w-4xl w-full space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600">{post.excerpt}</p>
              <button className="mt-4 text-blue-600 font-medium hover:text-blue-800">
                Read more →
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}