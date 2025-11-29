import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Zap, TrendingUp, AlertTriangle, DollarSign, Leaf, Activity, Clock, Target } from 'lucide-react';

const EnergyDashboard = () => {
  const [selectedFacility, setSelectedFacility] = useState('FAC01');

  // Mock data
  const forecastData = [
    { time: '16:00', actual: 95, forecast: 92, lower: 85, upper: 99 },
    { time: '17:00', actual: 108, forecast: 105, lower: 98, upper: 112 },
    { time: '18:00', actual: null, forecast: 118, lower: 110, upper: 126 },
    { time: '19:00', actual: null, forecast: 125, lower: 116, upper: 134 },
    { time: '20:00', actual: null, forecast: 115, lower: 106, upper: 124 },
    { time: '21:00', actual: null, forecast: 98, lower: 90, upper: 106 },
    { time: '22:00', actual: null, forecast: 85, lower: 78, upper: 92 },
    { time: '23:00', actual: null, forecast: 72, lower: 66, upper: 78 }
  ];

  const machineData = [
    { machine: 'M01', kwh: 145, efficiency: 92, status: 'normal' },
    { machine: 'M02', kwh: 98, efficiency: 88, status: 'normal' },
    { machine: 'M03', kwh: 178, efficiency: 95, status: 'optimal' },
    { machine: 'M04', kwh: 76, efficiency: 85, status: 'warning' },
    { machine: 'M05', kwh: 132, efficiency: 90, status: 'normal' }
  ];

  const touData = [
    { hour: '00-06', price: 3.2, load: 45, type: 'off-peak' },
    { hour: '06-09', price: 4.8, load: 85, type: 'shoulder' },
    { hour: '09-17', price: 5.5, load: 125, type: 'peak' },
    { hour: '17-22', price: 4.8, load: 95, type: 'shoulder' },
    { hour: '22-24', price: 3.2, load: 55, type: 'off-peak' }
  ];

  const anomalies = [
    { time: '14:30', machine: 'M04', type: 'High Idle Power', severity: 'medium', value: '+22%' },
    { time: '11:15', machine: 'M02', type: 'Low Power Factor', severity: 'low', value: '0.79' },
    { time: '09:45', machine: 'M01', type: 'Voltage Drop', severity: 'high', value: '365V' }
  ];

  const recommendations = [
    { id: 1, action: 'Shift M02 production to 22:00-02:00', savings: { kwh: 45, thb: 234, co2e: 19.8 }, priority: 'high' },
    { id: 2, action: 'Reduce M04 idle power baseline', savings: { kwh: 12, thb: 65, co2e: 5.3 }, priority: 'medium' },
    { id: 3, action: 'Schedule M01 maintenance next week', savings: { kwh: 28, thb: 152, co2e: 12.3 }, priority: 'low' }
  ];

  const kpis = {
    kwhPerUnit: 0.425,
    peakKw: 187,
    forecastAccuracy: 94.2,
    anomalyCount: 3,
    monthSavings: 12450,
    co2Avoided: 487
  };

  const KPICard = ({ icon: Icon, label, value, unit, trend, color }: any) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-600">{label}</p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{unit}</p>
          </div>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${trend > 0 ? 'bg-blue-100' : 'bg-red-100'}`}>
            <TrendingUp className={`w-4 h-4 ${trend > 0 ? 'text-blue-600' : 'text-red-600 rotate-180'}`} />
            <span className={`text-xs font-semibold ${trend > 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {Math.abs(trend)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-2xl shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Energy Intelligence Agent
                </h1>
                <p className="text-gray-600 text-sm mt-1">Real-time monitoring, forecasting & optimization</p>
              </div>
            </div>
            <div className="flex gap-4">
              <select 
                value={selectedFacility}
                onChange={(e) => setSelectedFacility(e.target.value)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all cursor-pointer border-0"
              >
                <option value="FAC01">Facility 01</option>
                <option value="FAC02">Facility 02</option>
              </select>
              <div className="px-6 py-3 bg-white rounded-xl border-2 border-blue-200 text-gray-700 font-medium shadow-md">
                {new Date().toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' })}
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <KPICard 
            icon={Activity} 
            label="kWh/Unit" 
            value={kpis.kwhPerUnit} 
            unit="kWh"
            trend={-3.2}
            color="from-blue-500 to-cyan-500"
          />
          <KPICard 
            icon={Zap} 
            label="Peak kW" 
            value={kpis.peakKw} 
            unit="kW"
            trend={-1.8}
            color="from-blue-600 to-cyan-600"
          />
          <KPICard 
            icon={Target} 
            label="Forecast Accuracy" 
            value={kpis.forecastAccuracy} 
            unit="%"
            trend={2.1}
            color="from-cyan-500 to-blue-500"
          />
          <KPICard 
            icon={AlertTriangle} 
            label="Anomalies" 
            value={kpis.anomalyCount} 
            unit="events"
            color="from-blue-400 to-cyan-400"
          />
          <KPICard 
            icon={DollarSign} 
            label="Monthly Savings" 
            value={kpis.monthSavings.toLocaleString()} 
            unit="THB"
            trend={8.5}
            color="from-blue-500 to-indigo-500"
          />
          <KPICard 
            icon={Leaf} 
            label="CO₂e Avoided" 
            value={kpis.co2Avoided} 
            unit="kg"
            trend={5.3}
            color="from-cyan-500 to-blue-600"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Forecast Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-xl border-2 border-blue-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">24h Energy Forecast</h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">MAPE: 8.3%</span>
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-lg text-sm font-medium">Real-time</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" label={{ value: 'kWh', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '12px',
                    border: '2px solid #3b82f6',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Legend />
                <Area type="monotone" dataKey="upper" stroke="none" fill="#dbeafe" fillOpacity={0.3} name="Upper Bound" />
                <Area type="monotone" dataKey="lower" stroke="none" fill="#dbeafe" fillOpacity={0.3} name="Lower Bound" />
                <Area type="monotone" dataKey="forecast" stroke="#3b82f6" strokeWidth={3} fill="url(#colorForecast)" name="Forecast" />
                <Area type="monotone" dataKey="actual" stroke="#06b6d4" strokeWidth={3} fill="url(#colorActual)" name="Actual" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Anomalies */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-blue-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Active Anomalies</h2>
            </div>
            <div className="space-y-3">
              {anomalies.map((anomaly, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-xl border-l-4 ${
                    anomaly.severity === 'high' ? 'bg-red-50 border-red-500' :
                    anomaly.severity === 'medium' ? 'bg-blue-50 border-blue-500' :
                    'bg-cyan-50 border-cyan-500'
                  } hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-semibold text-gray-900">{anomaly.machine}</div>
                    <div className="text-xs text-gray-500">{anomaly.time}</div>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">{anomaly.type}</div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${
                      anomaly.severity === 'high' ? 'text-red-600' :
                      anomaly.severity === 'medium' ? 'text-blue-600' :
                      'text-cyan-600'
                    }`}>
                      {anomaly.value}
                    </span>
                    <button className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-xs font-medium shadow-sm hover:shadow transition-shadow">
                      Investigate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Machine Performance */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Machine Energy Consumption</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={machineData}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                <XAxis dataKey="machine" stroke="#6b7280" />
                <YAxis stroke="#6b7280" label={{ value: 'kWh', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '12px',
                    border: '2px solid #3b82f6',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Bar dataKey="kwh" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-5 gap-2 mt-4">
              {machineData.map((m) => (
                <div key={m.machine} className="text-center p-2 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                  <div className="text-xs text-gray-600">{m.machine}</div>
                  <div className="text-sm font-bold text-blue-600">{m.efficiency}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* TOU Pricing */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Time-of-Use Pricing & Load</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={touData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                <XAxis dataKey="hour" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" label={{ value: 'THB/kWh', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" label={{ value: 'kW', angle: 90, position: 'insideRight' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '12px',
                    border: '2px solid #3b82f6',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={3} name="Price (THB/kWh)" dot={{ fill: '#3b82f6', r: 5 }} />
                <Line yAxisId="right" type="monotone" dataKey="load" stroke="#06b6d4" strokeWidth={3} name="Load (kW)" dot={{ fill: '#06b6d4', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-6 shadow-xl text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white/20 rounded-xl border border-white/30">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">AI-Powered Recommendations</h2>
              <p className="text-blue-50 text-sm">Optimized actions for energy efficiency</p>
            </div>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-5 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        rec.priority === 'high' ? 'bg-red-500/30 text-red-100 border border-red-400/30' :
                        rec.priority === 'medium' ? 'bg-blue-500/30 text-blue-100 border border-blue-400/30' :
                        'bg-cyan-500/30 text-cyan-100 border border-cyan-400/30'
                      }`}>
                        {rec.priority.toUpperCase()}
                      </span>
                      <p className="text-white font-medium">{rec.action}</p>
                    </div>
                    <div className="flex gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-cyan-200" />
                        <span className="text-blue-100">Save: <strong className="text-white">{rec.savings.kwh} kWh</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-cyan-200" />
                        <span className="text-blue-100"><strong className="text-white">{rec.savings.thb} THB</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-cyan-200" />
                        <span className="text-blue-100"><strong className="text-white">{rec.savings.co2e} kg CO₂e</strong></span>
                      </div>
                    </div>
                  </div>
                  <button className="ml-4 px-6 py-2 bg-white text-blue-600 rounded-xl font-medium shadow-lg hover:bg-blue-50 transition-all hover:-translate-y-0.5">
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyDashboard;