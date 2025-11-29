import React, { useState } from 'react';
import { Leaf, Zap, Car, Home, TrendingDown, TrendingUp, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CarbonDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // ข้อมูลการปล่อย CO2 รายเดือน
  const monthlyData = [
    { month: 'ม.ค.', transport: 120, home: 80, energy: 60 },
    { month: 'ก.พ.', transport: 110, home: 75, energy: 55 },
    { month: 'มี.ค.', transport: 130, home: 85, energy: 65 },
    { month: 'เม.ย.', transport: 125, home: 90, energy: 70 },
    { month: 'พ.ค.', transport: 115, home: 82, energy: 58 },
    { month: 'มิ.ย.', transport: 105, home: 78, energy: 52 },
  ];

  // ข้อมูลแบ่งตามหมวดหมู่
  const categoryData = [
    { name: 'การขนส่ง', value: 705, color: '#10b981' },
    { name: 'บ้าน', value: 490, color: '#3b82f6' },
    { name: 'พลังงาน', value: 360, color: '#f59e0b' },
  ];

  const totalEmissions = categoryData.reduce((sum, item) => sum + item.value, 0);
  const avgDaily = (totalEmissions / 180).toFixed(1);
  const comparedLastMonth = -8.5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-emerald-500 p-3 rounded-2xl shadow-lg">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Carbon Footprint Dashboard</h1>
              <p className="text-gray-600 mt-1">ติดตามและจัดการการปล่อยคาร์บอนของคุณ</p>
            </div>
          </div>
        </div>

        {/* สถิติรวม */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-100 p-3 rounded-xl">
                <Leaf className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-emerald-600 text-sm font-semibold flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                {Math.abs(comparedLastMonth)}%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">รวมทั้งหมด (6 เดือน)</h3>
            <p className="text-3xl font-bold text-gray-800">{totalEmissions.toLocaleString()}</p>
            <p className="text-gray-500 text-sm mt-1">kg CO₂</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">เฉลี่ยต่อวัน</h3>
            <p className="text-3xl font-bold text-gray-800">{avgDaily}</p>
            <p className="text-gray-500 text-sm mt-1">kg CO₂</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-amber-100 p-3 rounded-xl">
                <Car className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">การขนส่ง</h3>
            <p className="text-3xl font-bold text-gray-800">705</p>
            <p className="text-gray-500 text-sm mt-1">kg CO₂</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-teal-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-teal-100 p-3 rounded-xl">
                <Home className="w-6 h-6 text-teal-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">บ้าน</h3>
            <p className="text-3xl font-bold text-gray-800">490</p>
            <p className="text-gray-500 text-sm mt-1">kg CO₂</p>
          </div>
        </div>

        {/* กราฟ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* กราฟเส้น */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-emerald-600" />
              แนวโน้มการปล่อย CO₂
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="transport" stroke="#10b981" strokeWidth={3} name="การขนส่ง" />
                <Line type="monotone" dataKey="home" stroke="#3b82f6" strokeWidth={3} name="บ้าน" />
                <Line type="monotone" dataKey="energy" stroke="#f59e0b" strokeWidth={3} name="พลังงาน" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* กราฟวงกลม */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">สัดส่วนตามหมวดหมู่</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent } : any) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* กราฟแท่ง */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-600" />
            เปรียบเทียบรายเดือน
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} 
              />
              <Legend />
              <Bar dataKey="transport" fill="#10b981" name="การขนส่ง" radius={[8, 8, 0, 0]} />
              <Bar dataKey="home" fill="#3b82f6" name="บ้าน" radius={[8, 8, 0, 0]} />
              <Bar dataKey="energy" fill="#f59e0b" name="พลังงาน" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* คำแนะนำ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 shadow-lg text-white">
            <Car className="w-10 h-10 mb-4 opacity-90" />
            <h3 className="text-lg font-bold mb-2">ใช้รถสาธารณะ</h3>
            <p className="text-emerald-50 text-sm">ลดการปล่อย CO₂ ได้ถึง 30% โดยการเปลี่ยนจากรถส่วนตัวเป็นรถสาธารณะ</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 shadow-lg text-white">
            <Home className="w-10 h-10 mb-4 opacity-90" />
            <h3 className="text-lg font-bold mb-2">ประหยัดพลังงาน</h3>
            <p className="text-blue-50 text-sm">ปิดไฟและเครื่องใช้ไฟฟ้าเมื่อไม่ใช้งาน เพื่อลดค่าไฟและ CO₂</p>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 shadow-lg text-white">
            <Leaf className="w-10 h-10 mb-4 opacity-90" />
            <h3 className="text-lg font-bold mb-2">ปลูกต้นไม้</h3>
            <p className="text-amber-50 text-sm">ต้นไม้ 1 ต้น ดูดซับ CO₂ ได้ประมาณ 20 kg ต่อปี</p>
          </div>
        </div>
      </div>
    </div>
  );
}