import React, { useState, useMemo } from 'react';
import { VerificationResult } from '../types';
import { 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Plus, 
  TrendingUp, 
  FileText, 
  Calendar,
  Filter,
  CheckCircle,
  XCircle,
  ChevronRight,
  Trash2,
  RotateCcw,
  ShieldAlert,
  ArrowUpDown,
  Building,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

interface HistoryDashboardProps {
  reports: VerificationResult[];
  onSelectReport: (report: VerificationResult) => void;
  onStartNewVerification: () => void;
  onDeleteReport?: (reportId: string) => void;
  onResetSampleData?: () => void;
}

function formatPriceShort(val?: number): string {
  if (!val || val <= 0) return '—';
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
  return `₹${val.toLocaleString('en-IN')}`;
}

export default function HistoryDashboard({ 
  reports, 
  onSelectReport, 
  onStartNewVerification,
  onDeleteReport,
  onResetSampleData
}: HistoryDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'BUY' | 'CAUTION' | 'REJECT'>('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'score_desc' | 'score_asc'>('newest');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Dynamic statistics calculated directly from live reports
  const totalAudits = reports.length;
  const safeCount = reports.filter(r => r.verdict === 'BUY').length;
  const cautionCount = reports.filter(r => r.verdict === 'CAUTION').length;
  const riskCount = reports.filter(r => r.verdict === 'REJECT').length;
  const avgSafetyScore = totalAudits > 0 
    ? Math.round(reports.reduce((acc, r) => acc + (r.safetyScore || 0), 0) / totalAudits) 
    : 0;

  // Filter and sort logic
  const filteredAndSortedReports = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    const filtered = reports.filter(r => {
      const location = (r.plotDetails?.locationName || '').toLowerCase();
      const village = (r.plotDetails?.village || '').toLowerCase();
      const district = (r.plotDetails?.district || '').toLowerCase();
      const survey = (r.plotDetails?.surveyNumber || '').toLowerCase();
      const owner = (r.plotDetails?.pattadarName || r.plotDetails?.scrapedOwnerName || '').toLowerCase();
      const id = (r.id || '').toLowerCase();

      const matchesSearch = !term || 
        location.includes(term) ||
        village.includes(term) ||
        district.includes(term) ||
        survey.includes(term) ||
        owner.includes(term) ||
        id.includes(term);

      const matchesFilter = activeFilter === 'ALL' || r.verdict === activeFilter;

      return matchesSearch && matchesFilter;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'score_desc') {
        return (b.safetyScore || 0) - (a.safetyScore || 0);
      }
      if (sortBy === 'score_asc') {
        return (a.safetyScore || 0) - (b.safetyScore || 0);
      }
      // 'newest' default
      return 0;
    });
  }, [reports, searchTerm, activeFilter, sortBy]);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (onDeleteReport) {
      onDeleteReport(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Verification Insights Headers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-950">Verification Insights</h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Real-time geospatial analytics and complete database audit history.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onResetSampleData && (
            <button
              onClick={onResetSampleData}
              title="Reload sample demo verification audits"
              className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2.5 rounded-lg border border-gray-200 shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
              Reset Demo Data
            </button>
          )}

          <button
            onClick={onStartNewVerification}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Verify New Plot
          </button>
        </div>
      </div>

      {/* Dynamic Metrics Highlights Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Audits */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-800 flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 stroke-[1.8]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Audits</p>
            <p className="text-2xl font-black text-gray-950">{totalAudits}</p>
            <p className="text-[11px] text-gray-500 font-medium">Logged in database</p>
          </div>
        </div>

        {/* Metric 2: Safe Plots */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-emerald-200 transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Safe Plots</p>
            <p className="text-2xl font-black text-emerald-800">{safeCount}</p>
            <p className="text-[11px] text-emerald-600 font-medium">
              {totalAudits > 0 ? `${Math.round((safeCount / totalAudits) * 100)}% verified clear` : '0% verified'}
            </p>
          </div>
        </div>

        {/* Metric 3: Caution Plots */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-amber-200 transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Caution Alerts</p>
            <p className="text-2xl font-black text-amber-700">{cautionCount}</p>
            <p className="text-[11px] text-amber-600 font-medium">Minor caveats / pricing</p>
          </div>
        </div>

        {/* Metric 4: High Risk / Flagged */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-red-200 transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center flex-shrink-0">
            <ShieldAlert className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">High Risk / Flags</p>
            <p className="text-2xl font-black text-rose-700">{riskCount}</p>
            <p className="text-[11px] text-rose-600 font-medium">
              Avg score: <span className="font-bold text-gray-900">{avgSafetyScore}%</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main filter & lists table card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Search, Filter & Sort Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-gray-50/70">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ID, location, survey #, or owner..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-xs font-medium text-gray-900 placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold px-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Tabs */}
            <div className="inline-flex p-1 bg-gray-200/70 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setActiveFilter('ALL')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeFilter === 'ALL' 
                    ? 'bg-white text-gray-950 shadow-sm font-bold' 
                    : 'text-gray-600 hover:text-gray-950'
                }`}
              >
                ALL ({totalAudits})
              </button>
              <button
                onClick={() => setActiveFilter('BUY')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeFilter === 'BUY' 
                    ? 'bg-emerald-700 text-white shadow-sm font-bold' 
                    : 'text-gray-600 hover:text-emerald-800'
                }`}
              >
                SECURE ({safeCount})
              </button>
              <button
                onClick={() => setActiveFilter('CAUTION')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeFilter === 'CAUTION' 
                    ? 'bg-amber-600 text-white shadow-sm font-bold' 
                    : 'text-gray-600 hover:text-amber-800'
                }`}
              >
                CAUTION ({cautionCount})
              </button>
              {riskCount > 0 && (
                <button
                  onClick={() => setActiveFilter('REJECT')}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activeFilter === 'REJECT' 
                      ? 'bg-rose-700 text-white shadow-sm font-bold' 
                      : 'text-gray-600 hover:text-rose-800'
                  }`}
                >
                  HIGH RISK ({riskCount})
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="relative inline-flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort reports"
                className="text-xs font-semibold bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="newest">Sort: Newest</option>
                <option value="score_desc">Safety Score: High to Low</option>
                <option value="score_asc">Safety Score: Low to High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Listing */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-[10px] font-extrabold uppercase tracking-widest text-gray-400 bg-gray-50/80">
                <th className="px-6 py-3.5">Report ID</th>
                <th className="px-6 py-3.5">Location &amp; Survey</th>
                <th className="px-6 py-3.5 text-center">Safety Score</th>
                <th className="px-6 py-3.5">Verdict</th>
                <th className="px-6 py-3.5">Valuation</th>
                <th className="px-6 py-3.5">Report Date</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredAndSortedReports.length > 0 ? (
                filteredAndSortedReports.map((report) => {
                  const locationName = report.plotDetails?.locationName || 
                    (report.plotDetails?.village ? `${report.plotDetails.village}, Sector ${report.plotDetails.surveyNumber}` : `Plot ${report.plotDetails?.surveyNumber || ''}`);
                  const surveyNo = report.plotDetails?.surveyNumber || 'N/A';
                  const plotSize = report.plotDetails?.plotSize ? `${report.plotDetails.plotSize} sq.yds` : 'Extent N/A';
                  const askingPrice = report.plotDetails?.estimatedPrice;
                  const fairPrice = report.predictedTotalMarketValue;

                  return (
                    <tr 
                      key={report.id} 
                      onClick={() => onSelectReport(report)}
                      className="hover:bg-emerald-50/40 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-4 font-mono font-bold text-gray-900 group-hover:text-emerald-700">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${
                            report.verdict === 'BUY' ? 'bg-emerald-500' : report.verdict === 'CAUTION' ? 'bg-amber-500' : 'bg-rose-500'
                          }`} />
                          {report.id}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          <p className="font-bold text-gray-900 group-hover:text-emerald-950">{locationName}</p>
                          <p className="text-[11px] text-gray-400 font-medium">
                            Survey: <span className="font-semibold text-gray-700">{surveyNo}</span> • {plotSize}
                            {report.plotDetails?.pattadarName && (
                              <span className="text-gray-500"> • {report.plotDetails.pattadarName}</span>
                            )}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center gap-2">
                          <div className="w-14 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                (report.safetyScore || 0) >= 80 ? 'bg-emerald-600' : (report.safetyScore || 0) >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                              }`}
                              style={{ width: `${Math.min(100, report.safetyScore || 0)}%` }}
                            />
                          </div>
                          <span className="font-mono font-bold text-gray-900">{report.safetyScore || 0}%</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-md border uppercase tracking-wider ${
                          report.verdict === 'BUY' 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                            : report.verdict === 'CAUTION' 
                            ? 'bg-amber-50 text-amber-800 border-amber-200' 
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}>
                          {report.verdict === 'BUY' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : report.verdict === 'CAUTION' ? (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          )}
                          {report.verdict === 'BUY' ? 'SECURE' : report.verdict === 'CAUTION' ? 'CAUTION' : 'HIGH RISK'}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-xs space-y-0.5">
                          <p className="font-semibold text-gray-900">
                            {formatPriceShort(askingPrice)}
                          </p>
                          {fairPrice && fairPrice > 0 && (
                            <p className="text-[10px] text-gray-400">
                              Fair: {formatPriceShort(fairPrice)}
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-600 font-medium">
                        <span className="flex items-center gap-1.5 text-[11px]">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {report.reportDate || 'Recent'}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectReport(report);
                            }}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-md text-xs transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            VIEW
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>

                          {onDeleteReport && (
                            <button
                              type="button"
                              title="Delete from audit history"
                              onClick={(e) => handleDelete(e, report.id)}
                              className="text-gray-400 hover:text-rose-600 p-1.5 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-gray-400">
                    <div className="max-w-xs mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                        <Search className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      <p className="font-bold text-gray-800 text-sm">No audits match your criteria</p>
                      <p className="text-xs text-gray-500">
                        {searchTerm ? `No results for "${searchTerm}".` : 'No reports under the selected filter.'}
                      </p>
                      <div className="pt-2 flex justify-center gap-2">
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm('')}
                            className="text-xs font-bold text-emerald-700 hover:underline"
                          >
                            Clear search
                          </button>
                        )}
                        {activeFilter !== 'ALL' && (
                          <button
                            onClick={() => setActiveFilter('ALL')}
                            className="text-xs font-bold text-emerald-700 hover:underline"
                          >
                            Show all reports
                          </button>
                        )}
                      </div>
                    </div>
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
