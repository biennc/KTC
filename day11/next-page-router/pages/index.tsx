import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - Next.js Pages Router</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Home Page</h2>
        <p className="text-gray-600">Welcome to our Next.js application with Pages Router</p>
      </div>
    </>
  );
}



