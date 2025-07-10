import { useState } from 'react'
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };
    return (
        <>

            {/* Like Button */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">LikeButton</h2>
                <button
                    onClick={handleLike}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                    {isLiked ? (
                        <AiFillLike className="text-red-500" />
                    ) : (
                        <AiOutlineLike />
                    )}
                    <span className="text-sm">
                        {isLiked ? "Thank you!" : "Click like if this post is useful to you !"}
                    </span>
                </button>
            </div>
        </>
    )
}

export default LikeButton