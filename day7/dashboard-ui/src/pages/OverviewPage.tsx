import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const OverviewPage: React.FC = () => {
  // Dữ liệu cho các chỉ số tổng quan
  const metrics = [
    { title: "Total patients", value: "2,456", change: "+12%", color: "bg-purple-100", textColor: "text-purple-700" },
    { title: "Available staff", value: "24", change: "+2", color: "bg-blue-100", textColor: "text-blue-700" },
    { title: "Avg. treat. costs", value: "$2.536", change: "-$2", color: "bg-green-100", textColor: "text-green-700" },
    { title: "Available cars", value: "8", change: "+2", color: "bg-yellow-100", textColor: "text-yellow-700" },
  ];

  // Dữ liệu cho biểu đồ Outpatients vs. Inpatients
  const trendData = [
    { month: 'Oct 2019', outpatients: 2600, inpatients: 1800 },
    { month: 'Nov 2019', outpatients: 3000, inpatients: 2000 },
    { month: 'Dec 2019', outpatients: 2800, inpatients: 1900 },
    { month: 'Jan 2020', outpatients: 3200, inpatients: 2200 },
    { month: 'Feb 2020', outpatients: 3500, inpatients: 2400 },
    { month: 'Mar 2020', outpatients: 4000, inpatients: 3000 },
  ];

  // Dữ liệu cho biểu đồ Patients by Gender
  const genderData = [
    { name: 'Female', value: 65 },
    { name: 'Male', value: 35 },
  ];
  
  const genderColors = ['#8884d8', '#82ca9d'];

  // Dữ liệu cho biểu đồ Time Admitted
  const timeData = [
    { time: '07 am', count: 50 },
    { time: '08 am', count: 120 },
    { time: '09 am', count: 140 },
    { time: '10 am', count: 100 },
    { time: '11 am', count: 80 },
    { time: '12 pm', count: 60 },
  ];

  // Dữ liệu cho Patients By Division
  const divisions = [
    { name: 'CT', patients: 247, color: 'bg-purple-600' },
    { name: 'Cardiology', patients: 164, color: 'bg-blue-500' },
    { name: 'Neurology', patients: 86, color: 'bg-green-500' },
    { name: 'Surgery', patients: 120, color: 'bg-yellow-500' },
    { name: 'PTC', patients: 95, color: 'bg-red-500' },
  ];

  // Dữ liệu cho Patients this month
  const calendarData = [
    { day: 14, count: 3 },
    { day: 15, count: 5 },
    { day: 16, count: 2 },
    { day: 17, count: 8 },
    { day: 18, count: 4 },
    { day: 19, count: 6 },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Overview</h1>
      
      {/* Bổ sung các chỉ số tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div 
            key={index} 
            className={`${metric.color} rounded-xl p-4 shadow-md transition-all hover:shadow-lg`}
          >
            <div className="text-gray-600 text-sm mb-1">{metric.title}</div>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold text-gray-800">{metric.value}</div>
              <div className={`text-sm font-medium ${metric.textColor}`}>{metric.change}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Outpatients vs. Inpatients Trend - Chiếm 2 cột */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Outpatients vs. Inpatients Trend</h2>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Outpatients</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Inpatients</span>
              </div>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" domain={[0, 5000]} tickCount={6} />
              <Tooltip 
                formatter={(value) => [value.toLocaleString(), 'Patients']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="outpatients" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="inpatients" 
                stroke="#82ca9d" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Patients by Gender - Chiếm 1 cột */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Patients by Gender</h2>
          
          <div className="flex flex-col items-center">
            <div className="relative">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={genderColors[index % genderColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Percentage']}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center w-<100>">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-700">29%</div>
                  <div className="text-sm text-gray-500">Inpatients</div>
                  <div className="text-sm text-gray-500">Outpatients</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-600 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Female</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-teal-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Male</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Time Admitted - Chiếm 1 cột */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Time Admitted</h2>
          
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#666" />
              <YAxis stroke="#666" domain={[0, 150]} />
              <Tooltip 
                formatter={(value) => [`${value} patients`, 'Count']}
              />
              <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Patients By Division - Chiếm 1 cột */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Patients By Division</h2>
          
          <div className="space-y-4">
            {divisions.map((division, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`w-3 h-3 ${division.color} rounded-full mr-3`}></div>
                  <span className="text-gray-700">{division.name}</span>
                </div>
                <div className="text-gray-700 font-medium">{division.patients}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Patients this month - Chiếm 1 cột */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Patients this month</h2>
          
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs text-gray-500 font-medium">{day}</div>
            ))}
            
            {/* Các ngày trống đầu tháng */}
            {Array.from({ length: 13 }, (_, i) => i + 1).map(day => (
              <div key={`empty-${day}`} className="h-10"></div>
            ))}
            
            {/* Các ngày có dữ liệu */}
            {calendarData.map((dayData, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-2 border border-gray-200 rounded-lg hover:bg-purple-50 transition-colors">
                <div className="text-gray-700">{dayData.day}</div>
                {dayData.count > 0 && (
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs text-purple-700 mt-1">
                    {dayData.count}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;