import Link from 'next/link'
import React from 'react'

const BlogPage = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Blog</h2>
            <Link href="/" className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors">
                {'<< '}Back to Home
            </Link>
        </div>
    )
}

export default BlogPage