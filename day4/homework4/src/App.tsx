import React from 'react';
import ButtonAccordions from './ButtonAccordions';
import LikeButton from './LikeButton';
import Rating from './Rating';
import SlideWithThumb from './SlideWithThumb';
import ButtonTabs from './ButonTabs';

const App: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-8">Homework Session2</h1>

        {/* Like Button */}
        <LikeButton/>

        {/* Rating */}
        <Rating />

        {/* Slide with Thumb */}
        <SlideWithThumb />
        
        {/* Button Tabs */}
        <ButtonTabs />
        
        {/* Button Accordions */}
          <ButtonAccordions />
      </div>
    </div>
  );
};

export default App;

// import React, { useState, useEffect } from 'react';

// interface Countdown {
//   days: number;
//   hours: number;
//   minutes: number;
//   seconds: number;
// }

// const App = () => {
//   // Countdown timer state
//   const [countdown, setCountdown] = useState<Countdown>({
//     days: 6,
//     hours: 17,
//     minutes: 17,
//     seconds: 39
//   });

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCountdown(prev => {
//         const { days, hours, minutes, seconds } = prev;
        
//         if (seconds > 0) {
//           return { ...prev, seconds: seconds - 1 };
//         } else if (minutes > 0) {
//           return { ...prev, minutes: minutes - 1, seconds: 59 };
//         } else if (hours > 0) {
//           return { ...prev, hours: hours - 1, minutes: 59, seconds: 59 };
//         } else if (days > 0) {
//           return { ...prev, days: days - 1, hours: 23, minutes: 59, seconds: 59 };
//         } else {
//           clearInterval(timer);
//           return { days: 0, hours: 0, minutes: 0, seconds: 0 };
//         }
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // Data for Tin Mới section
//   const tinMoiItems = [
//     {
//       image: 'https://ecshopvietnam.com/ecshopstore/cdn/article_thumb/202103/an-tuong-dau-tien-samsung-galaxy-a32-4g-voi-hon-6-trieu-da-co-man-hinh-super-amoled-90hz-sthumb-1615348455.jpg',
//       title: 'An toàn hơn với Samsung Galaxy A32 4G: Vỏ lót 6 triệu đ với màn hình Super AMOLED 90Hz',
//       views: '140 lượt xem',
//     },
//     {
//       image: 'https://ecshopvietnam.com/ecshopstore/cdn/article_thumb/202103/google-pixel-5a-du-kien-se-duoc-ra-mat-cung-thoi-diem-voi-android-12-sthumb-1615348330.jpg',
//       title: 'Google Pixel 5a với kiến trúc dược ra mắt cùng thời điểm với Android 12',
//       views: '127 lượt xem',
//     },
//     {
//       image: 'https://ecshopvietnam.com/ecshopstore/cdn/article_thumb/202103/galaxy-a52-4g-lo-dien-tren-google-play-console-xac-nhan-dung-chip-snapdragon-720-sthumb-1615348215.jpg',
//       title: 'Galaxy A52 4G lên đời trên Google Play Console với Snapdragon 720',
//       views: '55 lượt xem',
//     },
//     {
//       image: 'https://ecshopvietnam.com/ecshopstore/cdn/article_thumb/202103/galaxy-a82-5g-chuan-bi-ra-mat-voi-chip-flagship-va-man-hinh-truot-doc-dao-samfans-gom-lua-di-la-vua-sthumb-1615347528.jpg',
//       title: 'Galaxy A82 5G chuẩn bị ra mắt với chip flagship và màn hình truot được',
//       views: '55 lượt xem',
//     },
//   ];

//   // Data for Phụ kiện trong tháng section
//   const phuKienItems = [
//     {
//       image: 'https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-4/Apple-USBC-To-SDCard-A.jpg?raw=true',
//       title: 'Cáp chuyển đổi USB-C sang SD',
//       price: '1.290.000đ',
//       oldPrice: '7.90.000đ',
//       discount: '25% off',
//     },
//     {
//       image: 'https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-4/type-c-20-w.png?raw=true',
//       title: 'Adapter sạc Apple Type C 20W',
//       price: '520.000đ',
//     },
//     {
//       image: 'https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-4/cap-lightning-to-usb-cable-md818zma-1.jpg?raw=true',
//       title: 'Cáp sạc Lightning 2m',
//       price: '840.000đ',
//     },
//     {
//       image: 'https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-4/airpod-3.png?raw=true',
//       title: 'AirPods 3',
//       price: '890.000đ',
//       oldPrice: '450.000đ',
//       discount: '20% off',
//     },
//   ];

//   // Data for Deal of the day section
//   const dealItems = [
//     {
//       image: 'https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-5/1.jpg?raw=true',
//       title: 'LG White Front Load Steam Washer',
//       price: '$1,422.7',
//       oldPrice: '$2,025.5',
//       discount: '18% off',
//       rating: '★★★★☆',
//       sold: '10',
//     },
//     {
//       image: 'https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-5/2.jpg?raw=true',
//       title: 'Edifier Powered Bookshelf Speakers',
//       price: '$96',
//       oldPrice: '$185',
//       discount: '18% off',
//       rating: '★★★★☆',
//       sold: '15',
//     },
//     {
//       image: 'https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-5/3.jpg?raw=true',
//       title: 'Amcrest Security Camera in White',
//       price: '$62.99',
//       oldPrice: '$45.9',
//       discount: '18% off',
//       rating: '★★★★☆',
//       sold: '20',
//     },
//     {
//       image: 'https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-5/4.jpg?raw=true',
//       title: 'Grand Slam Indoor Of Show Jumping',
//       price: '$41.99',
//       oldPrice: '$22.09',
//       discount: '18% off',
//       rating: '★★★★☆',
//       sold: '22',
//     },
//     {
//       image: 'https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-5/5.jpg?raw=true',
//       title: 'Sony WF-1000XM5 Earphone White',
//       price: '$106.66',
//       oldPrice: '$50.09',
//       discount: '18% off',
//       rating: '★★★★☆',
//       sold: '10',
//     },
//     {
//       image: 'https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-5/6.jpg?raw=true',
//       title: 'Korea Long Sofa Fabric in Blue Navy Color',
//       price: '$670.2',
//       oldPrice: '$557.8',
//       discount: '18% off',
//       rating: '★★★★☆',
//       sold: '79',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 font-sans p-4 md:p-6">
//       <div className="container mx-auto max-w-7xl">
//         {/* Tin Mới Section */}
//         <section className="mb-8 bg-white p-4 md:p-6 rounded-lg shadow">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl md:text-2xl font-bold">TIN MỚI</h2>
//             <a href="#" className="text-blue-500 hover:underline text-sm md:text-base">Xem thêm</a>
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//             {tinMoiItems.map((item, index) => (
//               <div key={index} className="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-shadow">
//                 <img 
//                   src={item.image} 
//                   alt={item.title} 
//                   className="w-full h-40 object-cover rounded-lg mb-3"
//                   loading="lazy"
//                 />
//                 <p className="text-sm font-medium mb-1 line-clamp-2">{item.title}</p>
//                 <p className="text-xs text-gray-500">{item.views}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Phụ kiện trong tháng Section */}
//         <section className="mb-8 bg-white p-4 md:p-6 rounded-lg shadow">
//           <h2 className="text-xl md:text-2xl font-bold mb-4">Phụ kiện trong tháng</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//             {phuKienItems.map((item, index) => (
//               <div key={index} className="rounded-lg p-3 hover:shadow-md transition-shadow">
//                 <img 
//                   src={item.image} 
//                   alt={item.title} 
//                   className="w-full h-40 object-contain mx-auto mb-3"
//                   loading="lazy"
//                 />
//                 <p className="text-sm font-medium mb-1">{item.title}</p>
//                 <div className="flex items-center justify-start">
//                   <span className="text-red-500 font-semibold">{item.price}</span>
//                   {item.oldPrice && (
//                     <del className="px-2 text-xs text-gray-500">{item.oldPrice}</del>
//                   )}
//                 </div>
//                 {item.discount && (
//                   <span className="inline-block mt-1 text-xs bg-orange-100 text-orange-500 px-2 py-1 rounded">
//                     {item.discount}
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Deal of the day Section */}
//         <section className="bg-white p-4 md:p-6 rounded-lg shadow">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
//             <h2 className="text-xl md:text-2xl font-bold">Deal of the day</h2>
//             <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-lg">
//               <span className="text-sm font-medium text-gray-700">End in:</span>
//               <div className="flex gap-1">
//                 <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
//                   {countdown.days}d
//                 </span>
//                 <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
//                   {countdown.hours}h
//                 </span>
//                 <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
//                   {countdown.minutes}m
//                 </span>
//                 <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
//                   {countdown.seconds}s
//                 </span>
//               </div>
//             </div>
//           </div>
          
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
//             {dealItems.map((item, index) => (
//               <div key={index} className="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-shadow">
//                 <img 
//                   src={item.image} 
//                   alt={item.title} 
//                   className="w-full h-32 object-contain mx-auto mb-3"
//                   loading="lazy"
//                 />
//                 <p className="text-sm font-medium mb-1 line-clamp-2">{item.title}</p>
//                 <div className="flex items-center justify-between mb-1">
//                   <span className="text-red-500 font-semibold">{item.price}</span>
//                   <del className="text-xs text-gray-500">{item.oldPrice}</del>
//                 </div>
//                 <div className="flex items-center justify-between text-xs">
//                   <span className="text-yellow-500">{item.rating}</span>
//                   <span className="text-gray-500">Sold: {item.sold}</span>
//                 </div>
//                 <span className="inline-block mt-1 text-xs bg-green-100 text-green-500 px-2 py-1 rounded">
//                   {item.discount}
//                 </span>
//               </div>
//             ))}
//           </div>
          
//           <div className="text-right mt-4">
//             <a href="#" className="text-blue-500 hover:underline">View all</a>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default App;