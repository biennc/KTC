import { useState } from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa';

const Rating = () => {
  const [rating, setRating] = useState(1);

  const getRatingText = (value: number) => {
    switch (value) {
      case 1:
        return 'Realy Bad';
      case 2:
        return 'Bad';
      case 3:
        return 'Normal';
      case 4:
        return 'Amazing';
      case 5:
        return 'Excellently!';
      default:
        return '';
    }
  };

  const handleRating = (value: number) => {
    setRating(value);
  };
  return (
    
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Rating</h2>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(star)}
                      className="text-xl hover:scale-110 transition-transform"
                    >
                      {star <= rating ? (
                        <FaStar className="text-orange-400" />
                      ) : (
                        <FaRegStar className="text-gray-300" />
                      )}
                    </button>
                  ))}
                </div>
                <span className="ml-2 text-lg font-medium text-gray-700">{getRatingText(rating)}</span>
              </div>
            </div>
  )
}

export default Rating