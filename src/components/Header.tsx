import { Menu, ShieldAlert, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'verify' | 'history' | 'profile';
  onViewChange: (view: 'home' | 'verify' | 'history' | 'profile') => void;
  brandName?: string;
}

export default function Header({ currentView, onViewChange, brandName = 'AI-Plot-Insight' }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-[9999] flex justify-between items-center px-6 h-16 bg-white border-b border-gray-200 shadow-sm transition-all duration-200">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => onViewChange('home')}
      >
        <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-100 transition-colors">
          <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
        </span>
        <span className="font-sans text-lg font-bold tracking-tight text-gray-950 uppercase">
          {brandName}
        </span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <button 
          onClick={() => onViewChange('home')}
          className={`font-sans text-sm font-semibold tracking-wide transition-all uppercase py-1 ${
            currentView === 'home' 
              ? 'text-emerald-600 border-b-2 border-emerald-600' 
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          HOME
        </button>
        <button 
          onClick={() => onViewChange('verify')}
          className={`font-sans text-sm font-semibold tracking-wide transition-all uppercase py-1 ${
            currentView === 'verify' 
              ? 'text-emerald-600 border-b-2 border-emerald-600' 
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          VERIFY PLOT
        </button>
        <button 
          onClick={() => onViewChange('history')}
          className={`font-sans text-sm font-semibold tracking-wide transition-all uppercase py-1 ${
            currentView === 'history' 
              ? 'text-emerald-600 border-b-2 border-emerald-600' 
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          REPORTS
        </button>
      </nav>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => onViewChange('history')}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          title="Audit History"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
