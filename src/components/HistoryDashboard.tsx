import { useState } from 'react';
import { VerificationResult } from '../types';
import { 
  Search, 
  Layers, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Plus, 
  TrendingUp, 
  FileText, 
  Eye, 
  Calendar,
  Filter,
  CheckCircle,
  XCircle,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface HistoryDashboardProps {
  reports: VerificationResult[];
  onSelectReport: (report: VerificationResult) => void;
  onStartNewVerification: () => void;
}

export default function HistoryDashboard({ reports, onSelectReport, onStartNewVerification }: HistoryDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'BUY' | 'CAUTION' | 'REJECT'>('ALL');

  // Filter logic
  const filteredReports = reports.filter(r => {
    const matchesSearch = r.plotDetails.locationName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.plotDetails.surveyNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'ALL' || r.verdict === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Verification Insights Headers */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-950">Verification Insights</h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time geospatial analytics and complete database audit history.
          </p>
        </div>
        <button
          onClick={onStartNewVerification}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-3 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer text-sm self-start md:self-auto"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          Verify New Plot
        </button>
      </div>

      {/* Metrics Highlights Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:translate-y-[-2px] transition-all">
          <div className="w-12 h-12 rounded-lg bg-gray-100 text-gray-800 flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Audits</p>
            <p className="text-2xl font-extrabold text-gray-950">412</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:translate-y-[-2px] transition-all">
          <div className="w-12 h-12 rounded-lg bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Alerts Flagged</p>
            <p className="text-2xl font-extrabold text-red-600">3</p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:translate-y-[-2px] transition-all">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 animate-pulse">
            <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Safe Plots</p>
            <p className="text-2xl font-extrabold text-emerald-700">391</p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:translate-y-[-2px] transition-all">
          <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pending Sync</p>
            <p className="text-2xl font-extrabold text-blue-700">18</p>
          </div>
        </div>
      </div>

      {/* Main filter & lists table card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Search & filters head bar */}
        <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50">
          <div className="relative w-full md:max-w-xs">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reports or survey numbers..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-xs font-semibold text-gray-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              Filter:
            </span>
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg tracking-wider transition-all cursor-pointer ${
                activeFilter === 'ALL' 
                  ? 'bg-gray-950 text-white shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setActiveFilter('BUY')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg tracking-wider transition-all cursor-pointer ${
                activeFilter === 'BUY' 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              SECURE
            </button>
            <button
              onClick={() => setActiveFilter('CAUTION')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg tracking-wider transition-all cursor-pointer ${
                activeFilter === 'CAUTION' 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              CAUTION
            </button>
          </div>
        </div>

        {/* Table Listing */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-[10px] font-extrabold uppercase tracking-widest text-gray-400 bg-gray-50">
                <th className="px-6 py-4">Report ID</th>
                <th className="px-6 py-4">Location &amp; Survey</th>
                <th className="px-6 py-4 text-center">Safety Score</th>
                <th className="px-6 py-4">Verdict</th>
                <th className="px-6 py-4">Report Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <tr 
                    key={report.id} 
                    onClick={() => onSelectReport(report)}
                    className="hover:bg-gray-50/80 transition-all cursor-pointer group"
                  >
                    <td className="px-6 py-4.5 font-mono font-bold text-gray-950 group-hover:text-emerald-700">
                      {report.id}
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="space-y-0.5">
                        <p className="font-bold text-gray-900">{report.plotDetails.locationName}</p>
                        <p className="text-[10px] text-gray-400 font-medium">Survey: {report.plotDetails.surveyNumber} • {report.plotDetails.plotSize} sq.yds</p>
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-center">
                      <div className="inline-flex items-center gap-2">
                        <div className="w-12 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              report.safetyScore >= 80 ? 'bg-emerald-600' : report.safetyScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${report.safetyScore}%` }}
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-gray-800">{report.safetyScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4.5">
                      <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-2.5 py-1 rounded border uppercase tracking-wide ${
                        report.verdict === 'BUY' 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-100' 
                          : report.verdict === 'CAUTION' 
                          ? 'bg-amber-50 text-amber-800 border-amber-100' 
                          : 'bg-red-50 text-red-800 border-red-100'
                      }`}>
                        {report.verdict === 'BUY' ? (
                          <CheckCircle className="w-3.5 h-3.5 fill-emerald-100 text-emerald-700" />
                        ) : report.verdict === 'CAUTION' ? (
                          <AlertTriangle className="w-3.5 h-3.5 fill-amber-100 text-amber-700" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 fill-red-100 text-red-700" />
                        )}
                        {report.verdict === 'BUY' ? 'SECURE' : report.verdict}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-gray-500 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {report.reportDate}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-right">
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectReport(report);
                        }}
                        className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-0.5 group-hover:translate-x-1 transition-transform cursor-pointer"
                      >
                        VIEW
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    <p className="font-bold text-sm">No report matches the search parameters</p>
                    <p className="text-xs text-gray-400 mt-1">Try resetting the filters or typing a different survey number.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
