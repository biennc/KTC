import Head from 'next/head';

export default function Products() {
  const products = [
    { id: 1, name: "Product 1", price: "$19.99", description: "Description for product 1" },
    { id: 2, name: "Product 2", price: "$29.99", description: "Description for product 2" },
    { id: 3, name: "Product 3", price: "$39.99", description: "Description for product 3" },
  ];

  return (
    <>
      <Head>
        <title>Products - Next.js Pages Router</title>
      </Head>
      <div className="flex flex-col items-center p-8 pb-20 gap-8 sm:p-20">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Products Page</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-blue-600 font-bold">{product.price}</p>
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}