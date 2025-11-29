import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Leaf, TrendingDown, Factory, Truck, Package, Zap, Calculator, Target } from 'lucide-react';

const CarbonDashboard = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('2025-11');
    const [facility, setFacility] = useState('FAC01');
    const [whatIfMode, setWhatIfMode] = useState(false);
    const [renewablePct, setRenewablePct] = useState(0);
    const [productionDelta, setProductionDelta] = useState(0);

    // Mock data - replace with API calls
    const carbonData = {
        total_co2e_kg: 145230,
        scope: {
            1: 45600,
            2: 62800,
            3: 36830
        },
        intensity: {
            'Product A': 2.4,
            'Product B': 3.1,
            'Product C': 1.8
        },
        time_series: [
            { period: '2025-07', co2e_kg: 138500 },
            { period: '2025-08', co2e_kg: 142300 },
            { period: '2025-09', co2e_kg: 140100 },
            { period: '2025-10', co2e_kg: 143900 },
            { period: '2025-11', co2e_kg: 145230 }
        ],
        confidence: 'high',
        avoided_co2e: 12400,
        carbon_credit_value_thb: 18600
    };

    const scopeData = [
        { name: 'Scope 1', value: carbonData.scope[1], color: '#10b981' },
        { name: 'Scope 2', value: carbonData.scope[2], color: '#34d399' },
        { name: 'Scope 3', value: carbonData.scope[3], color: '#6ee7b7' }
    ];

    const intensityData = Object.entries(carbonData.intensity).map(([product, value]) => ({
        product,
        intensity: value
    }));

    const calculateWhatIf = () => {
        const scope2Reduction = carbonData.scope[2] * (renewablePct / 100);
        const totalReduction = scope2Reduction + (carbonData.total_co2e_kg * (productionDelta / 100));
        return {
            new_total: carbonData.total_co2e_kg - totalReduction,
            reduction: totalReduction,
            credit_value: (totalReduction / 1000) * 150
        };
    };

    const whatIfResult = whatIfMode ? calculateWhatIf() : null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
            {/* Header */}
            <div className="">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-3 rounded-xl shadow-lg">
                                <Leaf className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                    Carbon Agent Dashboard
                                </h1>
                                <p className="text-gray-500 text-sm mt-1">Real-time emissions tracking & optimization</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <select
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                className="px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
                            >
                                <option value="2025-11">Nov 2025</option>
                                <option value="2025-10">Oct 2025</option>
                                <option value="2025-09">Sep 2025</option>
                            </select>
                            <select
                                value={facility}
                                onChange={(e) => setFacility(e.target.value)}
                                className="px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
                            >
                                <option value="FAC01">Facility 01</option>
                                <option value="FAC02">Facility 02</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-emerald-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className="bg-gradient-to-br from-emerald-100 to-green-100 p-3 rounded-xl">
                                <TrendingDown className="w-6 h-6 text-emerald-600" />
                            </div>
                            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                {carbonData.confidence.toUpperCase()}
                            </span>
                        </div>
                        <div className="text-3xl font-bold text-gray-800">
                            {(carbonData.total_co2e_kg / 1000).toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">Total CO₂e (tonnes)</div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-emerald-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-xl">
                                <Factory className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-800">
                            {((carbonData.scope[1] / carbonData.total_co2e_kg) * 100).toFixed(0)}%
                        </div>
                        <div className="text-sm text-gray-500 mt-1">Scope 1 Direct</div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-emerald-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className="bg-gradient-to-br from-emerald-100 to-green-100 p-3 rounded-xl">
                                <Zap className="w-6 h-6 text-emerald-600" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-800">
                            {(carbonData.avoided_co2e / 1000).toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">Avoided (tonnes)</div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className="bg-white/20 p-3 rounded-xl">
                                <Target className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white">
                            ฿{carbonData.carbon_credit_value_thb.toLocaleString()}
                        </div>
                        <div className="text-sm text-emerald-50 mt-1">Carbon Credit Value</div>
                    </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Time Series */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-emerald-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full"></div>
                            Emissions Trend
                        </h3>
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={carbonData.time_series}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                                <XAxis dataKey="period" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '2px solid #10b981', borderRadius: '12px' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="co2e_kg"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    dot={{ fill: '#10b981', r: 6 }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Scope Breakdown */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-emerald-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full"></div>
                            Scope Breakdown
                        </h3>
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={scopeData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {scopeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '2px solid #10b981', borderRadius: '12px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Carbon Intensity & What-If */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Carbon Intensity */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-emerald-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full"></div>
                            Carbon Intensity per Product
                        </h3>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={intensityData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                                <XAxis dataKey="product" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '2px solid #10b981', borderRadius: '12px' }}
                                />
                                <Bar dataKey="intensity" fill="#10b981" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* What-If Scenario */}
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 shadow-lg border-2 border-emerald-200">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <Calculator className="w-6 h-6 text-emerald-600" />
                                What-If Scenario
                            </h3>
                            <button
                                onClick={() => setWhatIfMode(!whatIfMode)}
                                className={`px-4 py-2 rounded-lg font-semibold transition-all ${whatIfMode
                                        ? 'bg-emerald-600 text-white shadow-lg'
                                        : 'bg-white text-emerald-600 border-2 border-emerald-300'
                                    }`}
                            >
                                {whatIfMode ? 'Active' : 'Activate'}
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Renewable Energy % (+)
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={renewablePct}
                                    onChange={(e) => setRenewablePct(Number(e.target.value))}
                                    className="w-full h-3 bg-emerald-200 rounded-lg appearance-none cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, #10b981 0%, #10b981 ${renewablePct}%, #d1fae5 ${renewablePct}%, #d1fae5 100%)`
                                    }}
                                />
                                <div className="text-right text-lg font-bold text-emerald-600 mt-1">
                                    {renewablePct}%
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Production Efficiency (%)
                                </label>
                                <input
                                    type="range"
                                    min="-20"
                                    max="20"
                                    value={productionDelta}
                                    onChange={(e) => setProductionDelta(Number(e.target.value))}
                                    className="w-full h-3 bg-emerald-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="text-right text-lg font-bold text-emerald-600 mt-1">
                                    {productionDelta > 0 ? '+' : ''}{productionDelta}%
                                </div>
                            </div>

                            {whatIfMode && whatIfResult && (
                                <div className="mt-6 p-4 bg-white rounded-xl border-2 border-emerald-300 shadow-md">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-sm text-gray-600">New Total CO₂e</div>
                                            <div className="text-2xl font-bold text-emerald-600">
                                                {(whatIfResult.new_total / 1000).toFixed(1)}t
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Reduction</div>
                                            <div className="text-2xl font-bold text-green-600">
                                                -{(whatIfResult.reduction / 1000).toFixed(1)}t
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="text-sm text-gray-600">Potential Credit Value</div>
                                            <div className="text-2xl font-bold text-emerald-600">
                                                ฿{whatIfResult.credit_value.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarbonDashboard;