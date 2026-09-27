import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Satellite, 
  FileText, 
  CheckCircle, 
  HelpCircle, 
  ArrowRight, 
  Layers, 
  MapPin, 
  ShieldAlert, 
  Award,
  BookOpen
} from 'lucide-react';
import { MAP_IMAGE_URLS } from '../data';

interface LandingHeroProps {
  onStartVerification: () => void;
  onViewMethodology: () => void;
}

export default function LandingHero({ onStartVerification, onViewMethodology }: LandingHeroProps) {
  return (
    <div className="space-y-16">
      {/* Hero Header Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-radial from-slate-100 to-rose-50/20 border border-gray-100 min-h-[500px] lg:min-h-[560px] flex items-center px-6 lg:px-12 py-12 md:py-16">
        <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full relative z-10">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
              <Award className="w-4 h-4" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">Enterprise Ready</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-gray-950 leading-[1.1]">
              Secure Your Property Investment with AI Intelligence
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 max-w-xl leading-relaxed">
              Automated plot verification using satellite analysis and document cross-referencing. Eliminate risk before you commit.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button 
                onClick={onStartVerification}
                className="bg-emerald-700 text-white hover:bg-emerald-800 font-bold px-6 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                Start Verification
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={onViewMethodology}
                className="border-2 border-gray-950 text-gray-950 hover:bg-gray-50 font-bold px-6 py-3 rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                View Methodology
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 border-t border-gray-200/80 pt-6">
              <div>
                <p className="text-2xl md:text-3xl font-black text-emerald-600 leading-none mb-1">7 Layers</p>
                <p className="text-[11px] font-semibold text-gray-500 tracking-wider uppercase">GIS & AI Spatial Audit</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-black text-emerald-600 leading-none mb-1">&lt; 1.2 sec</p>
                <p className="text-[11px] font-semibold text-gray-500 tracking-wider uppercase">Real-Time ML Processing</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-black text-emerald-600 leading-none mb-1">95%+</p>
                <p className="text-[11px] font-semibold text-gray-500 tracking-wider uppercase">Boundary Precision</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="absolute inset-0 bg-emerald-100/30 rounded-full blur-3xl animate-pulse"></div>
            
            <div className="relative w-full aspect-square max-w-[420px] rounded-xl border border-gray-200 overflow-hidden group shadow-lg bg-white">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={MAP_IMAGE_URLS.satelliteLandscape} 
                alt="Scanning Land" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              {/* Floating UI Elements */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-3.5 rounded-lg shadow-lg border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Satellite className="w-5 h-5 animate-spin" style={{ animationDuration: '20s' }} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Scanning Area</p>
                  <p className="text-sm font-bold text-gray-950">Sector 7G-14</p>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 bg-emerald-600 text-white p-3.5 rounded-lg shadow-xl flex items-center gap-3 border border-emerald-500/20">
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
                <div>
                  <p className="text-[9px] uppercase tracking-wider opacity-80 font-bold">Zonal Status</p>
                  <p className="text-xs font-bold tracking-widest">100% SECURE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-950">
            Unmatched Verification Depth
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-2xl mt-1">
            Our AI engine processes millions of data points across three critical pillars to ensure your investment is built on solid ground.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Satellite */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:translate-y-[-4px] hover:shadow-md transition-all flex flex-col justify-between group h-full">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-emerald-600 group-hover:bg-emerald-50 transition-colors">
                <Satellite className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-950">Satellite Inspection</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Advanced computer vision detects topographical shifts, encroachment, and historical land usage over 20 years.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button onClick={onStartVerification} className="text-emerald-700 font-bold text-xs tracking-wider uppercase flex items-center gap-1 hover:underline cursor-pointer">
                Explore Tech
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Pillar 2: Document */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:translate-y-[-4px] hover:shadow-md transition-all flex flex-col justify-between group h-full">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-emerald-600 group-hover:bg-emerald-50 transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-950">Document Analysis</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Cross-referencing deed history with municipal archives to find hidden liabilities or ownership conflicts instantly.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button onClick={onStartVerification} className="text-emerald-700 font-bold text-xs tracking-wider uppercase flex items-center gap-1 hover:underline cursor-pointer">
                Sample Report
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Pillar 3: Scoring */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:translate-y-[-4px] hover:shadow-md transition-all flex flex-col justify-between group h-full">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-emerald-600 group-hover:bg-emerald-50 transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-950">AI Risk Scoring</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                A proprietary 0-100 score based on 450+ variables, providing a definitive recommendation for any property plot.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button onClick={onStartVerification} className="text-emerald-700 font-bold text-xs tracking-wider uppercase flex items-center gap-1 hover:underline cursor-pointer">
                How it works
                <HelpCircle className="w-3.5 h-3.5 opacity-70" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Showcase Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-950 leading-tight">
            Academic Precision. Enterprise Efficiency.
          </h2>
          
          <ul className="space-y-6">
            <li className="flex gap-4 items-start">
              <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-950">Multi-Source Verification</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  We don't just use one database. We triangulate results from private registries, zoning offices, and public deeds.
                </p>
              </div>
            </li>
            
            <li className="flex gap-4 items-start">
              <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-950">Time-Series Comparison</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Visualize physical land shifts over decades with integrated AI-assisted overlay modeling.
                </p>
              </div>
            </li>

            <li className="flex gap-4 items-start">
              <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-950">Legal-Ready Reporting</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Every analysis produces a cryptographically signed report, structured perfectly for legal due diligence.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-7 bg-gray-100/70 rounded-2xl p-4 border border-gray-200">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-emerald-600 text-white flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Demo Simulation</h4>
                  <p className="text-sm font-bold text-gray-950">Plot #8821 Analysis</p>
                </div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                HIGH TRUST
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative rounded-lg overflow-hidden border border-gray-100 aspect-square h-40 md:h-auto bg-gray-50">
                <img 
                  className="w-full h-full object-cover" 
                  src={MAP_IMAGE_URLS.topologicalEmerald} 
                  alt="Topological map preview" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay"></div>
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded shadow-sm border border-gray-100 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[10px] font-bold text-gray-950">Sector 42, Green Heights</span>
                </div>
              </div>

              <div className="space-y-4 flex flex-col justify-center">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200/80">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Title Match</p>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full w-[94%]"></div>
                  </div>
                  <p className="text-[10px] font-semibold text-emerald-700 text-right mt-1">94% Confidence</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200/80">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Boundary Integrity</p>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full w-full"></div>
                  </div>
                  <p className="text-[10px] font-semibold text-emerald-700 text-right mt-1">100% Clear</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200/80 flex items-center justify-between">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Risk Indicators</p>
                  <span className="text-xs font-bold text-emerald-600">None Detected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-950 text-white rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/10 blur-[80px] rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Ready to secure your future?</h2>
          <p className="text-sm md:text-base text-gray-400">
            Join 500+ investors who use AI-Plot-Insight for their property due diligence every month.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={onStartVerification}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-lg shadow-lg hover:shadow-emerald-900/30 transition-all cursor-pointer"
            >
              Get Started Now
            </button>
            <button 
              onClick={onViewMethodology}
              className="w-full sm:w-auto bg-transparent border border-gray-700 hover:bg-white/5 text-gray-300 font-bold px-8 py-3.5 rounded-lg transition-all cursor-pointer"
            >
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
