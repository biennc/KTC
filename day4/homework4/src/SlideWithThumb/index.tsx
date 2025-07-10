import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SlideWithThumb = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const images = [
    'https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-5/2.jpg?raw=true',
    'https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-5/1.jpg?raw=true',
    'https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-5/3.jpg?raw=true',
    'https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-5/4.jpg?raw=true',
    'https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-5/5.jpg?raw=true',
    'https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-5/6.jpg?raw=true'
  ];
  return (
    
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Slide with Thumb</h2>
          <div className="relative">
            {/* Main Image */}
            <div className="relative flex items-center justify-center mb-4">
              <button 
                onClick={prevSlide}
                className="absolute left-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
              >
                <FaChevronLeft className="text-gray-600" />
              </button>
              
              <img 
                src={images[currentSlide]} 
                alt={`Slide ${currentSlide + 1}`}
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
              
              <button 
                onClick={nextSlide}
                className="absolute right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
              >
                <FaChevronRight className="text-gray-600" />
              </button>
            </div>
            
            {/* Thumbnails */}
            <div className="flex justify-center space-x-2">
              {images.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-[50px] h-[50px] fit-crop rounded-lg overflow-hidden border-2 transition-colors ${
                    index === currentSlide ? 'border-orange-400' : 'border-gray-300'
                  }`}
                >
                  <img 
                    src={thumb} 
                    alt={`Thumb ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
  )
}

export default SlideWithThumb