import React, { useState } from 'react';
import { BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Shield, FileCheck, TrendingUp, AlertCircle, Download, CheckCircle2, Clock, Award, FileText, Database, Target, Globe } from 'lucide-react';

const ESGDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2025-11');
  const [reportFormat, setReportFormat] = useState('pdf');

  // Mock Data
  const esgScores = {
    environmental: 87,
    social: 76,
    governance: 92,
    total: 85
  };

  const radarData = [
    { category: 'Energy', score: 88, fullMark: 100 },
    { category: 'Carbon', score: 85, fullMark: 100 },
    { category: 'Waste', score: 82, fullMark: 100 },
    { category: 'Transport', score: 79, fullMark: 100 },
    { category: 'Water', score: 91, fullMark: 100 },
    { category: 'Safety', score: 94, fullMark: 100 }
  ];

  const completenessData = [
    { framework: 'GRI Standards', completeness: 94, missing: 3, status: 'excellent' },
    { framework: 'ISO 14064', completeness: 89, missing: 5, status: 'good' },
    { framework: 'TCFD', completeness: 76, missing: 8, status: 'warning' },
    { framework: 'SASB', completeness: 82, missing: 6, status: 'good' }
  ];

  const sdgMapping = [
    { sdg: 'SDG 7', name: 'Clean Energy', score: 88, color: '#FCC30B' },
    { sdg: 'SDG 12', name: 'Responsible Consumption', score: 85, color: '#BF8B2E' },
    { sdg: 'SDG 13', name: 'Climate Action', score: 87, color: '#3F7E44' },
    { sdg: 'SDG 9', name: 'Industry Innovation', score: 79, color: '#FD6925' }
  ];

  const auditTrail = [
    { metric: 'Total CO₂e', value: '145.2 tonnes', source: 'Carbon Agent', timestamp: '2025-11-30 14:30', status: 'verified' },
    { metric: 'Energy kWh/Unit', value: '0.425 kWh', source: 'Energy Agent', timestamp: '2025-11-30 14:28', status: 'verified' },
    { metric: 'Waste Diverted', value: '82.4%', source: 'Waste Agent', timestamp: '2025-11-30 14:25', status: 'verified' },
    { metric: 'Transport CO₂', value: '1.76 tonnes', source: 'Transport Agent', timestamp: '2025-11-30 14:22', status: 'verified' }
  ];

  const missingFields = [
    { field: 'GRI 305-4: GHG intensity ratio', priority: 'high', remediation: 'Input production data to calculate intensity', agent: 'Carbon' },
    { field: 'ISO 14064: Scope 3 Category 6', priority: 'medium', remediation: 'Upload business travel records', agent: 'Transport' },
    { field: 'TCFD: Climate risks assessment', priority: 'high', remediation: 'Complete climate scenario analysis', agent: 'Carbon' }
  ];

  const reportHistory = [
    { date: '2025-10', format: 'PDF', status: 'Published', score: 84, downloads: 12 },
    { date: '2025-09', format: 'PDF', status: 'Published', score: 82, downloads: 8 },
    { date: '2025-08', format: 'JSON', status: 'Published', score: 81, downloads: 5 }
  ];

  const agentStatus = [
    { agent: 'Energy', status: 'active', lastSync: '2 min ago', dataPoints: 1245, quality: 98 },
    { agent: 'Carbon', status: 'active', lastSync: '3 min ago', dataPoints: 892, quality: 96 },
    { agent: 'Waste', status: 'active', lastSync: '5 min ago', dataPoints: 567, quality: 94 },
    { agent: 'Transport', status: 'active', lastSync: '4 min ago', dataPoints: 734, quality: 97 }
  ];

  const kpis = {
    totalScore: 85,
    completeness: 87,
    reportsGenerated: 12,
    timeSaved: 156
  };

  const KPICard = ({ icon: Icon, label, value, unit, trend, color }: any) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-100">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-semibold text-purple-600">+{trend}%</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-purple-500 to-violet-600 p-3 rounded-2xl shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                  ESG Reporting Agent
                </h1>
                <p className="text-gray-600 text-sm mt-1">Automated compliance, aggregation & audit trail</p>
              </div>
            </div>
            <div className="flex gap-4">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-6 py-3 bg-white border-2 border-purple-200 rounded-xl font-medium text-gray-700 shadow-md hover:border-purple-400 transition-all cursor-pointer"
              >
                <option value="2025-11">November 2025</option>
                <option value="2025-10">October 2025</option>
                <option value="2025-09">September 2025</option>
              </select>
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
                <Download className="w-5 h-5" />
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard 
            icon={Award} 
            label="ESG Total Score" 
            value={kpis.totalScore} 
            unit="/100"
            trend={3.2}
            color="from-purple-500 to-violet-600"
          />
          <KPICard 
            icon={FileCheck} 
            label="Data Completeness" 
            value={kpis.completeness} 
            unit="%"
            trend={2.5}
            color="from-purple-600 to-violet-600"
          />
          <KPICard 
            icon={FileText} 
            label="Reports Generated" 
            value={kpis.reportsGenerated} 
            unit="reports"
            color="from-violet-500 to-purple-500"
          />
          <KPICard 
            icon={Clock} 
            label="Time Saved" 
            value={kpis.timeSaved} 
            unit="hours"
            trend={15.8}
            color="from-purple-500 to-pink-500"
          />
        </div>

        {/* ESG Score Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Radar Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-xl border-2 border-purple-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">ESG Performance Radar</h2>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#ddd6fe" />
                <PolarAngleAxis dataKey="category" stroke="#7c3aed" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#7c3aed" />
                <Radar name="Score" dataKey="score" stroke="#7c3aed" fill="#a78bfa" fillOpacity={0.6} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '12px',
                    border: '2px solid #7c3aed',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* ESG Pillars */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-purple-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">ESG Pillars</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-700">Environmental</span>
                  <span className="text-2xl font-bold text-green-600">{esgScores.environmental}</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{ width: `${esgScores.environmental}%` }}></div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-700">Social</span>
                  <span className="text-2xl font-bold text-blue-600">{esgScores.social}</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${esgScores.social}%` }}></div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border-2 border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-700">Governance</span>
                  <span className="text-2xl font-bold text-purple-600">{esgScores.governance}</span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-3">
                  <div className="bg-purple-600 h-3 rounded-full" style={{ width: `${esgScores.governance}%` }}></div>
                </div>
              </div>

              <div className="mt-6 p-5 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl text-white">
                <div className="text-sm font-medium mb-1">Total ESG Score</div>
                <div className="text-4xl font-bold">{esgScores.total}/100</div>
              </div>
            </div>
          </div>
        </div>

        {/* Framework Completeness & SDG Mapping */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Framework Completeness */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-purple-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl">
                <FileCheck className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Framework Completeness</h2>
            </div>
            <div className="space-y-4">
              {completenessData.map((framework) => (
                <div key={framework.framework} className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold text-gray-900">{framework.framework}</div>
                      <div className="text-xs text-gray-500">{framework.missing} fields missing</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        framework.status === 'excellent' ? 'text-green-600' :
                        framework.status === 'good' ? 'text-blue-600' :
                        'text-orange-600'
                      }`}>
                        {framework.completeness}%
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        framework.status === 'excellent' ? 'bg-green-500' :
                        framework.status === 'good' ? 'bg-blue-500' :
                        'bg-orange-500'
                      }`}
                      style={{ width: `${framework.completeness}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SDG Mapping */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-purple-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">SDG Alignment</h2>
            </div>
            <div className="space-y-4">
              {sdgMapping.map((sdg) => (
                <div key={sdg.sdg} className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: sdg.color }}
                      >
                        {sdg.sdg.split(' ')[1]}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{sdg.sdg}</div>
                        <div className="text-xs text-gray-500">{sdg.name}</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{sdg.score}%</div>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ width: `${sdg.score}%`, backgroundColor: sdg.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audit Trail & Missing Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Audit Trail */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-purple-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl">
                <Database className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Data Audit Trail</h2>
            </div>
            <div className="space-y-3">
              {auditTrail.map((entry, idx) => (
                <div key={idx} className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{entry.metric}</div>
                      <div className="text-sm text-gray-600 mt-1">{entry.value}</div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
                    <span className="flex items-center gap-1">
                      <Database className="w-3 h-3" />
                      {entry.source}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {entry.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Fields */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-purple-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Missing Data Fields</h2>
            </div>
            <div className="space-y-3">
              {missingFields.map((field, idx) => (
                <div key={idx} className={`p-4 rounded-xl border-l-4 ${
                  field.priority === 'high' ? 'bg-red-50 border-red-500' :
                  'bg-orange-50 border-orange-500'
                } hover:shadow-md transition-shadow`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{field.field}</div>
                      <div className="text-sm text-gray-600 mt-2">{field.remediation}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      field.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {field.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-3">
                    Agent: <span className="font-semibold text-purple-600">{field.agent}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Status */}
        <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-3xl p-6 shadow-xl text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white/20 rounded-xl border border-white/30">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Connected Agents Status</h2>
              <p className="text-purple-100 text-sm">Real-time data pipeline monitoring</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {agentStatus.map((agent) => (
              <div key={agent.agent} className="bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold text-white">{agent.agent}</div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-xs text-purple-100">{agent.status}</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-purple-100">
                  <div>Data Points: <strong className="text-white">{agent.dataPoints.toLocaleString()}</strong></div>
                  <div>Quality: <strong className="text-white">{agent.quality}%</strong></div>
                  <div className="text-xs">{agent.lastSync}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ESGDashboard;