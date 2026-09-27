import { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Compass, 
  FileText, 
  Activity, 
  ArrowRight, 
  Database, 
  Cpu, 
  Layers, 
  TrendingUp, 
  AlertTriangle, 
  Globe 
} from 'lucide-react';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'architecture' | 'tech_stack' | 'risk_rules';

export default function MethodologyModal({ isOpen, onClose }: MethodologyModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('architecture');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-950/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-emerald-50 rounded-lg border border-emerald-100 text-emerald-700">
              <Cpu className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-gray-950 uppercase tracking-wider">
                AI-Plot-Insight Decision Support Engine
              </h2>
              <p className="text-[10px] text-gray-500 font-semibold tracking-wide">SYSTEM ARCHITECTURE, DATA SOURCES & AI SYSTEM DESIGN</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-gray-100 bg-gray-50 px-6 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`py-3 text-xs font-bold uppercase tracking-wider border-b-2 px-3 transition-all cursor-pointer ${
              activeTab === 'architecture' 
                ? 'border-emerald-600 text-emerald-800' 
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            System Architecture
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tech_stack')}
            className={`py-3 text-xs font-bold uppercase tracking-wider border-b-2 px-3 transition-all cursor-pointer ${
              activeTab === 'tech_stack' 
                ? 'border-emerald-600 text-emerald-800' 
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Data Sources & Models
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('risk_rules')}
            className={`py-3 text-xs font-bold uppercase tracking-wider border-b-2 px-3 transition-all cursor-pointer ${
              activeTab === 'risk_rules' 
                ? 'border-emerald-600 text-emerald-800' 
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Risk Scoring Engine
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow max-h-[65vh]">
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <p className="text-xs text-gray-500 leading-relaxed max-w-2xl">
                The AI-Plot-Insight decision-support engine aggregates raw spatial vectors, cadastral registry datasets, and scanned deeds through a 6-stage analytical processing pipeline to calculate objective land health indexes.
              </p>

              {/* 6-Stage Pipeline Timeline Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Step 1 */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2 hover:bg-emerald-50/20 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">Stage 1</span>
                    <span className="text-[10px] font-mono text-gray-400">Ingestion</span>
                  </div>
                  <h4 className="font-bold text-gray-950 text-xs">User Input Layer</h4>
                  <ul className="text-[11px] text-gray-500 list-disc pl-4 space-y-1">
                    <li>Interactive GPS coordinate mapping pinpoints bounds.</li>
                    <li>Survey/Sub-division number identification.</li>
                    <li>Document Uploads (Sale Deeds, EC, Layout Plans).</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2 hover:bg-emerald-50/20 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">Stage 2</span>
                    <span className="text-[10px] font-mono text-gray-400">Aggregation</span>
                  </div>
                  <h4 className="font-bold text-gray-950 text-xs">Multi-Source Data Aggregation</h4>
                  <ul className="text-[11px] text-gray-500 list-disc pl-4 space-y-1">
                    <li>High-res time-series satellite telemetry (Google Earth Engine).</li>
                    <li>Sourced local cadastral maps (OpenStreetMap India).</li>
                    <li>Pricing datasets (Housing.com, PropTiger, Numbeo API indexes).</li>
                    <li>Official land records (MeeBhoomi / State Portals).</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2 hover:bg-emerald-50/20 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">Stage 3</span>
                    <span className="text-[10px] font-mono text-gray-400">Text Recognition</span>
                  </div>
                  <h4 className="font-bold text-gray-950 text-xs">Data Processing & Verification</h4>
                  <ul className="text-[11px] text-gray-500 list-disc pl-4 space-y-1">
                    <li>Advanced document text and metadata extraction.</li>
                    <li>Cross-referencing legal boundary names with public state deeds.</li>
                    <li>Mandal and Village boundary consistency checks.</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2 hover:bg-emerald-50/20 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">Stage 4</span>
                    <span className="text-[10px] font-mono text-gray-400">AI Engine</span>
                  </div>
                  <h4 className="font-bold text-gray-950 text-xs">AI Core Analysis Modules</h4>
                  <ul className="text-[11px] text-gray-500 list-disc pl-4 space-y-1">
                    <li><strong>Boundary Extraction:</strong> Spatial segmentation boundary model.</li>
                    <li><strong>Encroachment Detection:</strong> Computer vision overlay anomaly matching.</li>
                    <li><strong>Land & Price Prediction:</strong> Predictive regression valuation model.</li>
                    <li><strong>Document Classification:</strong> Legal text verification classification models.</li>
                  </ul>
                </div>

                {/* Step 5 */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2 hover:bg-emerald-50/20 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">Stage 5</span>
                    <span className="text-[10px] font-mono text-gray-400">Heuristics</span>
                  </div>
                  <h4 className="font-bold text-gray-950 text-xs">Risk Assessment Scoring Engine</h4>
                  <ul className="text-[11px] text-gray-500 list-disc pl-4 space-y-1">
                    <li>Rule-based assessment model matching soil types and slope datasets.</li>
                    <li>Automated scoring against legal record, encroachment, and environmental parameters.</li>
                  </ul>
                </div>

                {/* Step 6 */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2 hover:bg-emerald-50/20 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">Stage 6</span>
                    <span className="text-[10px] font-mono text-gray-400">Output</span>
                  </div>
                  <h4 className="font-bold text-gray-950 text-xs">Output - Intelligence Report</h4>
                  <ul className="text-[11px] text-gray-500 list-disc pl-4 space-y-1">
                    <li>Extracted high-fidelity plot bounds overlays.</li>
                    <li>Encroachment, valuation, and hazard indices.</li>
                    <li>Synthesized recommendations (BUY, CAUTION, AVOID) with full logic breakdowns.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tech_stack' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Data Sources column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100 text-blue-700">
                    <Database className="w-5 h-5" />
                    <h3 className="text-xs font-bold uppercase tracking-wider">Aggregated Data Sources</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="bg-blue-50/30 p-2.5 rounded border border-blue-100/50">
                      <p className="text-xs font-bold text-gray-900">Satellite Imagery</p>
                      <p className="text-[11px] text-gray-500">Google Earth Engine multi-spectral raw bands.</p>
                    </li>
                    <li className="bg-blue-50/30 p-2.5 rounded border border-blue-100/50">
                      <p className="text-xs font-bold text-gray-900">Cadastral & Map Data</p>
                      <p className="text-[11px] text-gray-500">OpenStreetMap India & Survey of India GIS vectors.</p>
                    </li>
                    <li className="bg-blue-50/30 p-2.5 rounded border border-blue-100/50">
                      <p className="text-xs font-bold text-gray-900">Property Price Indices</p>
                      <p className="text-[11px] text-gray-500">Housing.com, PropTiger & Numbeo market price feeds.</p>
                    </li>
                    <li className="bg-blue-50/30 p-2.5 rounded border border-blue-100/50">
                      <p className="text-xs font-bold text-gray-900">Land Registries</p>
                      <p className="text-[11px] text-gray-500">MeeBhoomi & state cadastral survey records.</p>
                    </li>
                  </ul>
                </div>

                {/* Tech Stack Column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100 text-purple-700">
                    <Cpu className="w-5 h-5" />
                    <h3 className="text-xs font-bold uppercase tracking-wider">Engine Technologies</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="bg-purple-50/30 p-2.5 rounded border border-purple-100/50">
                      <p className="text-xs font-bold text-gray-900">Backend Core</p>
                      <p className="text-[11px] text-gray-500">TypeScript / Node.js and Express servers with dynamic cross-referencing handlers.</p>
                    </li>
                    <li className="bg-purple-50/30 p-2.5 rounded border border-purple-100/50">
                      <p className="text-xs font-bold text-gray-900">Geospatial Processing</p>
                      <p className="text-[11px] text-gray-500">GeoPandas, Folium, Rasterio, and Shapely spatial math frameworks.</p>
                    </li>
                    <li className="bg-purple-50/30 p-2.5 rounded border border-purple-100/50">
                      <p className="text-xs font-bold text-gray-900">AI Compute</p>
                      <p className="text-[11px] text-gray-500">Cloud-hosted AI pipelines running on secure high-performance instances.</p>
                    </li>
                    <li className="bg-purple-50/30 p-2.5 rounded border border-purple-100/50">
                      <p className="text-xs font-bold text-gray-900">Database Engine</p>
                      <p className="text-[11px] text-gray-500">PostgreSQL / PostGIS spatial indexing tables.</p>
                    </li>
                  </ul>
                </div>

                {/* AI Models Column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100 text-emerald-700">
                    <Layers className="w-5 h-5" />
                    <h3 className="text-xs font-bold uppercase tracking-wider">Underlying AI Engine</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="bg-emerald-50/30 p-2.5 rounded border border-emerald-100/50">
                      <p className="text-xs font-bold text-gray-900">Spatial Segmentation Engine</p>
                      <p className="text-[11px] text-emerald-700 font-semibold">Boundary Extraction & Segmentation</p>
                      <p className="text-[10px] text-gray-500 mt-1">Segments plot perimeters directly from high-resolution orthophotos.</p>
                    </li>
                    <li className="bg-emerald-50/30 p-2.5 rounded border border-emerald-100/50">
                      <p className="text-xs font-bold text-gray-900">Vision Overlay Module</p>
                      <p className="text-[11px] text-emerald-700 font-semibold">Encroachment & Structure Mapping</p>
                      <p className="text-[10px] text-gray-500 mt-1">Isolates unauthorized physical objects matching legal bounds.</p>
                    </li>
                    <li className="bg-emerald-50/30 p-2.5 rounded border border-emerald-100/50">
                      <p className="text-xs font-bold text-gray-900">Valuation Modeling Engine</p>
                      <p className="text-[11px] text-emerald-700 font-semibold">Price Prediction & Score Synthesis</p>
                      <p className="text-[10px] text-gray-500 mt-1">Performs weighted correlation analysis against market factors and infrastructure pipelines.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'risk_rules' && (
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-amber-900 uppercase">Rule Engine Evaluation Logic</h4>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    AI-Plot-Insight uses a specialized deterministic scoring engine combined with predictive risk weights to formulate the final recommendations.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-gray-950 uppercase tracking-wide">Key Scoring Dimensions</h4>
                  <div className="space-y-2.5">
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-xs font-bold text-gray-950">1. Boundary Accuracy (30% weight)</p>
                      <p className="text-[11px] text-gray-500">Matches current orthophoto perimeters to registered spatial survey data.</p>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-xs font-bold text-gray-950">2. Encroachment Risk (25% weight)</p>
                      <p className="text-[11px] text-gray-500">Spatial analysis scans for structures inside the legally registered boundary lines.</p>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-xs font-bold text-gray-950">3. Legal Document Consistency (20% weight)</p>
                      <p className="text-[11px] text-gray-500">Automatic validations matching survey numbers, seller signatures, and history registries.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-gray-950 uppercase tracking-wide">Final Recommendation Matrix</h4>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 p-2.5 border border-emerald-200 bg-emerald-50/50 rounded-lg">
                      <span className="text-xs font-black text-white bg-emerald-700 px-3 py-1 rounded-md uppercase min-w-[70px] text-center">BUY</span>
                      <p className="text-[11px] text-emerald-950 font-medium">Risk Score &lt; 15, document match Verified, zero perimetric encroachments.</p>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 border border-amber-200 bg-amber-50/50 rounded-lg">
                      <span className="text-xs font-black text-white bg-amber-600 px-3 py-1 rounded-md uppercase min-w-[70px] text-center">CAUTION</span>
                      <p className="text-[11px] text-amber-950 font-medium">Risk Score 15-40, minor price variance, or document signatures pending registry sync.</p>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 border border-red-200 bg-red-50/50 rounded-lg">
                      <span className="text-xs font-black text-white bg-red-700 px-3 py-1 rounded-md uppercase min-w-[70px] text-center">AVOID</span>
                      <p className="text-[11px] text-red-950 font-medium">Risk Score &gt; 40, active physical encroachment, high flood risk, or document invalidity.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span>Operational over OpenStreetMap India & GEE Layers</span>
          </div>
          <button 
            onClick={onClose}
            className="bg-emerald-700 text-white font-bold px-6 py-2 rounded-xl text-xs hover:bg-emerald-800 active:scale-95 transition-all cursor-pointer shadow-md hover:shadow-lg"
          >
            Acknowledge Engine Specs
          </button>
        </div>
      </div>
    </div>
  );
}

