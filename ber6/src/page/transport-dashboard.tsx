import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Truck, TrendingUp, TrendingDown, AlertTriangle, Fuel, Leaf, MapPin, Clock, Target, Activity, Navigation, Gauge, DollarSign } from 'lucide-react';

const TransportDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [optimizationMode, setOptimizationMode] = useState('co2');

  // Mock Data
  const routeData = [
    { date: 'Mon', co2e_kg: 245, fuel_l: 95, distance_km: 450, deliveries: 12 },
    { date: 'Tue', co2e_kg: 268, fuel_l: 105, distance_km: 485, deliveries: 14 },
    { date: 'Wed', co2e_kg: 232, fuel_l: 88, distance_km: 420, deliveries: 11 },
    { date: 'Thu', co2e_kg: 298, fuel_l: 115, distance_km: 520, deliveries: 16 },
    { date: 'Fri', co2e_kg: 256, fuel_l: 98, distance_km: 465, deliveries: 13 },
    { date: 'Sat', co2e_kg: 189, fuel_l: 72, distance_km: 340, deliveries: 9 },
    { date: 'Sun', co2e_kg: 145, fuel_l: 55, distance_km: 260, deliveries: 7 }
  ];

  const vehiclePerformance = [
    { truck: 'TRK-01', fuel_efficiency: 21.2, co2e_per_tonkm: 0.42, idling_min: 45, status: 'optimal' },
    { truck: 'TRK-02', fuel_efficiency: 18.5, co2e_per_tonkm: 0.48, idling_min: 78, status: 'warning' },
    { truck: 'TRK-03', fuel_efficiency: 22.1, co2e_per_tonkm: 0.39, idling_min: 32, status: 'optimal' },
    { truck: 'TRK-04', fuel_efficiency: 16.8, co2e_per_tonkm: 0.55, idling_min: 95, status: 'critical' },
    { truck: 'TRK-05', fuel_efficiency: 20.3, co2e_per_tonkm: 0.44, idling_min: 52, status: 'normal' }
  ];

  const driverScores = [
    { driver: 'Driver A', ecoScore: 92, harshBraking: 2, harshAccel: 3, idling: 35, status: 'excellent' },
    { driver: 'Driver B', ecoScore: 78, harshBraking: 8, harshAccel: 12, idling: 68, status: 'good' },
    { driver: 'Driver C', ecoScore: 65, harshBraking: 15, harshAccel: 18, idling: 95, status: 'warning' },
    { driver: 'Driver D', ecoScore: 88, harshBraking: 4, harshAccel: 5, idling: 42, status: 'excellent' },
    { driver: 'Driver E', ecoScore: 71, harshBraking: 11, harshAccel: 14, idling: 78, status: 'good' }
  ];

  const consolidationOpportunities = [
    { id: 1, shipments: 'S-1024, S-1025, S-1026', zone: 'North Zone', savings: { fuel: 12, co2e: 31.2, cost: 456 }, status: 'pending' },
    { id: 2, shipments: 'S-1031, S-1032', zone: 'East Zone', savings: { fuel: 8, co2e: 20.8, cost: 304 }, status: 'pending' },
    { id: 3, shipments: 'S-1045, S-1046, S-1047, S-1048', zone: 'Central', savings: { fuel: 15, co2e: 39.0, cost: 570 }, status: 'approved' }
  ];

  const optimizationResults = {
    currentRoutes: 18,
    optimizedRoutes: 14,
    fuelSaved: 87,
    co2eSaved: 226,
    costSaved: 3308,
    distanceReduced: 145
  };

  const emissionsByType = [
    { name: 'Delivery Runs', value: 1245, color: '#ef4444' },
    { name: 'Idling', value: 324, color: '#f87171' },
    { name: 'Empty Returns', value: 187, color: '#fca5a5' }
  ];

  // KPIs
  const kpis = {
    co2ePerTonKm: 0.45,
    fuelPer100Km: 19.8,
    idlingMinPerTrip: 58,
    consolidatedShipments: 12,
    estimatedCO2Saved: 226,
    avgDeliveryTime: 42
  };

  const KPICard = ({ icon: Icon, label, value, unit, trend, color }: any) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-red-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${trend > 0 ? 'bg-red-100' : 'bg-green-100'}`}>
            {trend > 0 ? <TrendingUp className="w-4 h-4 text-red-600" /> : <TrendingDown className="w-4 h-4 text-green-600" />}
            <span className={`text-xs font-semibold ${trend > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {Math.abs(trend)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 p-3 rounded-2xl shadow-lg">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                  Transport Optimization Agent
                </h1>
                <p className="text-gray-600 text-sm mt-1">Route optimization, emissions tracking & driver analytics</p>
              </div>
            </div>
            <div className="flex gap-4">
              <select 
                value={optimizationMode}
                onChange={(e) => setOptimizationMode(e.target.value)}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all cursor-pointer border-0"
              >
                <option value="co2">Minimize CO₂</option>
                <option value="cost">Minimize Cost</option>
                <option value="time">Minimize Time</option>
              </select>
              <div className="flex bg-white rounded-xl p-1 shadow-sm border-2 border-red-200">
                {['Day', 'Week', 'Month'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period.toLowerCase())}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedPeriod === period.toLowerCase()
                        ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-md'
                        : 'text-gray-600 hover:bg-red-50'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <KPICard 
            icon={Activity} 
            label="CO₂e/ton-km" 
            value={kpis.co2ePerTonKm} 
            unit="kg"
            trend={-5.2}
            color="from-red-500 to-rose-500"
          />
          <KPICard 
            icon={Fuel} 
            label="Fuel/100km" 
            value={kpis.fuelPer100Km} 
            unit="L"
            trend={-3.8}
            color="from-red-600 to-rose-600"
          />
          <KPICard 
            icon={Clock} 
            label="Idling/Trip" 
            value={kpis.idlingMinPerTrip} 
            unit="min"
            trend={8.5}
            color="from-rose-500 to-red-500"
          />
          <KPICard 
            icon={Target} 
            label="Consolidated" 
            value={kpis.consolidatedShipments} 
            unit="shipments"
            color="from-red-400 to-rose-400"
          />
          <KPICard 
            icon={Leaf} 
            label="CO₂ Saved" 
            value={kpis.estimatedCO2Saved} 
            unit="kg"
            trend={-12.3}
            color="from-red-500 to-pink-500"
          />
          <KPICard 
            icon={Gauge} 
            label="Avg Delivery" 
            value={kpis.avgDeliveryTime} 
            unit="min"
            trend={-4.1}
            color="from-rose-500 to-red-600"
          />
        </div>

        {/* Optimization Results Banner */}
        <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-3xl p-6 shadow-xl text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl border border-white/30">
                <Navigation className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Route Optimization Active</h2>
                <p className="text-red-50 text-sm">Current optimization mode: {optimizationMode === 'co2' ? 'Minimize CO₂' : optimizationMode === 'cost' ? 'Minimize Cost' : 'Minimize Time'}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold">{optimizationResults.optimizedRoutes}</div>
                <div className="text-red-100 text-sm">Routes</div>
              </div>
              <div>
                <div className="text-3xl font-bold">-{optimizationResults.fuelSaved}L</div>
                <div className="text-red-100 text-sm">Fuel Saved</div>
              </div>
              <div>
                <div className="text-3xl font-bold">-{optimizationResults.co2eSaved}kg</div>
                <div className="text-red-100 text-sm">CO₂e Saved</div>
              </div>
              <div>
                <div className="text-3xl font-bold">฿{optimizationResults.costSaved.toLocaleString()}</div>
                <div className="text-red-100 text-sm">Cost Saved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Emissions Trend */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-xl border-2 border-red-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Transport Emissions Trend</h2>
              <div className="flex gap-2 text-xs">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500"></span> CO₂e</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-rose-500"></span> Fuel</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={routeData}>
                <defs>
                  <linearGradient id="colorCO2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFuel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#fecaca" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '12px',
                    border: '2px solid #ef4444',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Legend />
                <Area type="monotone" dataKey="co2e_kg" stroke="#ef4444" strokeWidth={3} fill="url(#colorCO2)" name="CO₂e (kg)" />
                <Area type="monotone" dataKey="fuel_l" stroke="#f43f5e" strokeWidth={2} fill="url(#colorFuel)" name="Fuel (L)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Emissions Breakdown */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-red-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Emissions by Type</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={emissionsByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent } : any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {emissionsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #ef4444' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vehicle Performance & Driver Scores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vehicle Performance */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-red-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Vehicle Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vehiclePerformance}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#fecaca" />
                <XAxis dataKey="truck" stroke="#6b7280" />
                <YAxis stroke="#6b7280" label={{ value: 'L/100km', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '12px',
                    border: '2px solid #ef4444'
                  }} 
                />
                <Bar dataKey="fuel_efficiency" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-5 gap-2 mt-4">
              {vehiclePerformance.map((v) => (
                <div key={v.truck} className={`text-center p-2 rounded-lg border ${
                  v.status === 'optimal' ? 'bg-green-50 border-green-200' :
                  v.status === 'critical' ? 'bg-red-50 border-red-200' :
                  v.status === 'warning' ? 'bg-orange-50 border-orange-200' :
                  'bg-gray-50 border-gray-200'
                }`}>
                  <div className="text-xs text-gray-600">{v.truck}</div>
                  <div className={`text-sm font-bold ${
                    v.status === 'optimal' ? 'text-green-600' :
                    v.status === 'critical' ? 'text-red-600' :
                    v.status === 'warning' ? 'text-orange-600' :
                    'text-gray-600'
                  }`}>{v.idling_min}m</div>
                </div>
              ))}
            </div>
          </div>

          {/* Driver Eco-Scores */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-red-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Driver Eco-Driving Scores</h2>
            <div className="space-y-3">
              {driverScores.map((driver) => (
                <div key={driver.driver} className="p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-gray-900">{driver.driver}</div>
                    <div className={`text-2xl font-bold ${
                      driver.status === 'excellent' ? 'text-green-600' :
                      driver.status === 'good' ? 'text-blue-600' :
                      'text-orange-600'
                    }`}>
                      {driver.ecoScore}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                    <div>Harsh Brake: <strong className="text-red-600">{driver.harshBraking}</strong></div>
                    <div>Harsh Accel: <strong className="text-red-600">{driver.harshAccel}</strong></div>
                    <div>Idling: <strong className="text-red-600">{driver.idling}m</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Consolidation Opportunities */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-red-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-red-100 to-rose-100 rounded-xl">
              <MapPin className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Shipment Consolidation Opportunities</h2>
              <p className="text-gray-500 text-sm">Merge nearby shipments to reduce emissions</p>
            </div>
          </div>
          <div className="space-y-3">
            {consolidationOpportunities.map((opp) => (
              <div key={opp.id} className="p-5 bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl border border-red-100 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        opp.status === 'approved' ? 'bg-green-100 text-green-700 border border-green-200' :
                        'bg-orange-100 text-orange-700 border border-orange-200'
                      }`}>
                        {opp.status.toUpperCase()}
                      </span>
                      <p className="text-gray-900 font-medium">{opp.zone}</p>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">Shipments: {opp.shipments}</div>
                    <div className="flex gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Fuel className="w-4 h-4 text-red-500" />
                        <span className="text-gray-600">Save: <strong className="text-gray-900">{opp.savings.fuel} L</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600"><strong className="text-gray-900">{opp.savings.co2e} kg CO₂e</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-red-500" />
                        <span className="text-gray-600"><strong className="text-gray-900">฿{opp.savings.cost}</strong></span>
                      </div>
                    </div>
                  </div>
                  <button className={`ml-4 px-6 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 ${
                    opp.status === 'approved' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
                  }`}>
                    {opp.status === 'approved' ? 'Applied' : 'Apply'}
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

export default TransportDashboard;