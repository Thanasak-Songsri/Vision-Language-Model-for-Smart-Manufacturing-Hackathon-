import React, { useState } from 'react';
import {
    Recycle,
    Factory,
    AlertTriangle,
    TrendingUp,
    Activity,
    CheckCircle2,
    ArrowRight,
    BrainCircuit,
    Trash2,
    DollarSign
} from 'lucide-react';
import {
    LineChart, Line, BarChart, Bar, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    ReferenceLine, ComposedChart
} from 'recharts';

// --- Types & Interfaces ---
interface ScrapData {
    date: string;
    actualScrapRate: number;
    predictedScrapRate: number;
    upperLimit: number;
}

interface DestinationData {
    date: string;
    recycle: number;
    landfill: number;
}

interface Hotspot {
    id: number;
    line: string;
    scrapRate: number;
    status: 'Critical' | 'Warning' | 'Normal';
    issue: string;
}

interface Recommendation {
    id: number;
    type: 'Immediate' | 'Long-term';
    action: string;
    impact: string;
    rootCause: string;
    confidence: number;
}

export default function WasteCircularityDashboard() {
    const [selectedPeriod, setSelectedPeriod] = useState('week');

    // --- Mock Data ---
    const scrapTrendData: ScrapData[] = [
        { date: 'Mon', actualScrapRate: 2.1, predictedScrapRate: 2.0, upperLimit: 4.5 },
        { date: 'Tue', actualScrapRate: 1.8, predictedScrapRate: 1.9, upperLimit: 4.5 },
        { date: 'Wed', actualScrapRate: 3.5, predictedScrapRate: 2.2, upperLimit: 4.5 },
        { date: 'Thu', actualScrapRate: 5.2, predictedScrapRate: 4.8, upperLimit: 4.5 },
        { date: 'Fri', actualScrapRate: 4.1, predictedScrapRate: 4.0, upperLimit: 4.5 },
        { date: 'Sat', actualScrapRate: 2.5, predictedScrapRate: 2.3, upperLimit: 4.5 },
        { date: 'Sun (Pred)', actualScrapRate: 0, predictedScrapRate: 2.1, upperLimit: 4.5 },
    ];

    const destinationData: DestinationData[] = [
        { date: 'Mon', recycle: 450, landfill: 120 },
        { date: 'Tue', recycle: 480, landfill: 100 },
        { date: 'Wed', recycle: 420, landfill: 150 },
        { date: 'Thu', recycle: 390, landfill: 210 },
        { date: 'Fri', recycle: 460, landfill: 110 },
        { date: 'Sat', recycle: 500, landfill: 80 },
        { date: 'Sun', recycle: 510, landfill: 60 },
    ];

    const hotspots: Hotspot[] = [
        { id: 1, line: 'Line A-04', scrapRate: 12.5, status: 'Critical', issue: 'Material Batch Defect' },
        { id: 2, line: 'Line B-02', scrapRate: 6.8, status: 'Warning', issue: 'Temp Fluctuation' },
        { id: 3, line: 'Line A-01', scrapRate: 2.1, status: 'Normal', issue: '-' },
    ];

    const recommendations: Recommendation[] = [
        {
            id: 1,
            type: 'Immediate',
            action: 'Recalibrate Line A-04 Cutter Speed',
            impact: 'Est. Save: 45kg Scrap/hr',
            rootCause: 'Vibration Sensor > 3.0g (SHAP +0.4)',
            confidence: 92
        },
        {
            id: 2,
            type: 'Immediate',
            action: 'Check Raw Material Batch #RM-902',
            impact: 'Prevent 200kg Waste',
            rootCause: 'Batch ID High Correlation',
            confidence: 88
        },
        {
            id: 3,
            type: 'Long-term',
            action: 'Schedule Preventive Maint. on Line B-02',
            impact: 'Improve Reliability by 15%',
            rootCause: 'Cycle Time Drift Detected',
            confidence: 75
        },
    ];

    // --- KPI Calculations ---
    const totalRecycle = destinationData.reduce((acc, curr) => acc + curr.recycle, 0);
    const totalLandfill = destinationData.reduce((acc, curr) => acc + curr.landfill, 0);
    const totalWaste = totalRecycle + totalLandfill;

    const diversionRate = ((totalRecycle / totalWaste) * 100).toFixed(1);
    const avgScrapRate = (scrapTrendData.slice(0, 6).reduce((acc, curr) => acc + curr.actualScrapRate, 0) / 6).toFixed(2);
    const predictedSavings = "125,000";

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 p-6 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-3 rounded-2xl shadow-lg">
                            <Recycle className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent flex items-center gap-2">
                                Waste & Circularity Agent
                                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full border border-amber-200 flex items-center gap-1">
                                    <BrainCircuit className="w-3 h-3" /> AI Active
                                </span>
                            </h1>
                            <p className="text-gray-600 mt-1 text-sm">Real-time Scrap Prediction & Circular Economy Optimization</p>
                        </div>
                    </div>

                    <div className="flex bg-white rounded-xl p-1 shadow-sm border-2 border-amber-200">
                        {['Day', 'Week', 'Month'].map((period) => (
                            <button
                                key={period}
                                onClick={() => setSelectedPeriod(period.toLowerCase())}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    selectedPeriod === period.toLowerCase()
                                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md'
                                        : 'text-gray-600 hover:bg-amber-50'
                                }`}
                            >
                                {period}
                            </button>
                        ))}
                    </div>
                </div>

                {/* KPI Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Diversion Rate */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-100 hover:shadow-xl transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl">
                                <Recycle className="w-6 h-6 text-amber-600" />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                                <TrendingUp className="w-3 h-3" /> +2.4%
                            </span>
                        </div>
                        <h3 className="text-gray-600 text-sm font-medium">Landfill Diversion Rate</h3>
                        <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-3xl font-bold text-gray-800">{diversionRate}%</span>
                            <span className="text-sm text-gray-400">Target: 85%</span>
                        </div>
                    </div>

                    {/* Scrap Rate */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-100 hover:shadow-xl transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl">
                                <Factory className="w-6 h-6 text-orange-600" />
                            </div>
                            <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                                Number(avgScrapRate) > 3 ? 'text-orange-600 bg-orange-50' : 'text-amber-600 bg-amber-50'
                            }`}>
                                {Number(avgScrapRate) > 3 ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                                Avg {avgScrapRate}%
                            </span>
                        </div>
                        <h3 className="text-gray-600 text-sm font-medium">Current Scrap Rate</h3>
                        <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-3xl font-bold text-gray-800">{scrapTrendData[4].actualScrapRate}%</span>
                            <span className="text-sm text-gray-400">Last Shift</span>
                        </div>
                    </div>

                    {/* Waste Volume */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-100 hover:shadow-xl transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl">
                                <Trash2 className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                        <h3 className="text-gray-600 text-sm font-medium">Total Waste (Week)</h3>
                        <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-3xl font-bold text-gray-800">{(totalWaste / 1000).toFixed(1)}t</span>
                            <span className="text-sm text-gray-400">kg</span>
                        </div>
                    </div>

                    {/* Predicted Savings */}
                    <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white/20 rounded-xl">
                                <DollarSign className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xs font-semibold text-white bg-white/20 px-2 py-1 rounded-full">
                                AI Projected
                            </span>
                        </div>
                        <h3 className="text-amber-50 text-sm font-medium">Potential Savings</h3>
                        <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-3xl font-bold text-white">{predictedSavings}</span>
                            <span className="text-sm text-amber-50">/mo</span>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Main Chart: Actual vs Predicted Scrap */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-amber-600" />
                                    Scrap Rate Prediction (Model v1.2)
                                </h2>
                                <p className="text-sm text-gray-500">Comparing actual scrap % vs. model predictions</p>
                            </div>
                            <div className="flex gap-2 text-xs">
                                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-orange-500"></span> Actual</span>
                                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Predicted</span>
                            </div>
                        </div>

                        <ResponsiveContainer width="100%" height={320}>
                            <ComposedChart data={scrapTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fde68a" />
                                <XAxis dataKey="date" stroke="#92400e" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#92400e" fontSize={12} tickLine={false} axisLine={false} unit="%" />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: '2px solid #fbbf24', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <ReferenceLine y={4.5} stroke="#f97316" strokeDasharray="3 3" label={{ position: 'right', value: 'Threshold', fill: '#f97316', fontSize: 10 }} />

                                <Area type="monotone" dataKey="predictedScrapRate" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorPredicted)" name="AI Prediction" strokeDasharray="5 5" />
                                <Line type="monotone" dataKey="actualScrapRate" stroke="#f97316" strokeWidth={3} dot={{ r: 4, fill: '#f97316' }} activeDot={{ r: 6 }} name="Actual Scrap" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Side Chart: Waste Destination */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-100">
                        <h2 className="text-lg font-bold text-gray-800 mb-2">Waste Composition</h2>
                        <p className="text-sm text-gray-500 mb-6">Recycled vs Landfill Mass (kg)</p>

                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart data={destinationData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fde68a" />
                                <XAxis dataKey="date" stroke="#92400e" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#92400e" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#fef3c7' }}
                                    contentStyle={{ borderRadius: '12px', border: '2px solid #fbbf24', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend iconType="circle" />
                                <Bar dataKey="recycle" name="Recycled" stackId="a" fill="#f59e0b" radius={[0, 0, 4, 4]} />
                                <Bar dataKey="landfill" name="Landfill" stackId="a" fill="#d1d5db" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bottom Section: Hotspots & AI Agent Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Hotspots List */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-amber-500" />
                                Waste Hotspots
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {hotspots.map((spot) => (
                                <div key={spot.id} className="flex items-center justify-between p-4 rounded-xl bg-amber-50 border-2 border-amber-100">
                                    <div>
                                        <div className="font-bold text-gray-800">{spot.line}</div>
                                        <div className="text-xs text-gray-500 mt-1">{spot.issue}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-lg font-bold ${
                                            spot.status === 'Critical' ? 'text-orange-600' : 
                                            spot.status === 'Warning' ? 'text-amber-500' : 
                                            'text-yellow-600'
                                        }`}>
                                            {spot.scrapRate}%
                                        </div>
                                        <div className="text-xs font-medium text-gray-400">Scrap Rate</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 py-2 text-sm text-amber-600 font-medium hover:bg-amber-50 rounded-lg transition-colors">
                            View All Lines
                        </button>
                    </div>

                    {/* AI Recommendations */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-white/20 rounded-lg border border-white/30">
                                <BrainCircuit className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Agent Recommendations</h2>
                                <p className="text-amber-50 text-sm">Corrective actions based on root-cause analysis</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recommendations.map((rec) => (
                                <div key={rec.id} className="bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                                            rec.type === 'Immediate'
                                                ? 'bg-orange-500/30 text-orange-100 border border-orange-400/30'
                                                : 'bg-yellow-500/30 text-yellow-100 border border-yellow-400/30'
                                        }`}>
                                            {rec.type}
                                        </span>
                                        <span className="text-xs text-amber-100 flex items-center gap-1">
                                            Confidence: {rec.confidence}%
                                        </span>
                                    </div>

                                    <h3 className="font-semibold text-white mb-2 group-hover:text-yellow-200 transition-colors">{rec.action}</h3>

                                    <div className="space-y-2">
                                        <div className="flex items-start gap-2 text-xs text-amber-50 bg-black/20 p-2 rounded-lg">
                                            <Activity className="w-3 h-3 mt-0.5 text-yellow-300" />
                                            Root Cause: {rec.rootCause}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-yellow-200">
                                            <TrendingUp className="w-3 h-3" />
                                            Impact: {rec.impact}
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button className="flex items-center gap-1 text-xs font-medium text-amber-900 bg-white hover:bg-amber-50 px-3 py-1.5 rounded-lg transition-colors">
                                            Execute Action <ArrowRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}