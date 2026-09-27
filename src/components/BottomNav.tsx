import { ClipboardList, History, Search, User, ShieldCheck } from 'lucide-react';

interface BottomNavProps {
  currentView: 'home' | 'verify' | 'history' | 'profile';
  onViewChange: (view: 'home' | 'verify' | 'history' | 'profile') => void;
}

export default function BottomNav({ currentView, onViewChange }: BottomNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center py-2 bg-white border-t border-gray-200 shadow-[0px_-4px_20px_rgba(15,23,42,0.05)] rounded-t-xl h-16 pb-safe">
      <button 
        onClick={() => onViewChange('home')}
        className={`flex flex-col items-center justify-center w-20 transition-all ${
          currentView === 'home' 
            ? 'text-emerald-600 font-semibold' 
            : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        <Search className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-wider uppercase font-medium">Explore</span>
      </button>

      <button 
        onClick={() => onViewChange('verify')}
        className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all rounded-full ${
          currentView === 'verify' 
            ? 'bg-emerald-100 text-emerald-800 font-bold shadow-sm' 
            : 'text-gray-500 hover:text-emerald-600'
        }`}
      >
        <ShieldCheck className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-wider uppercase">Verify</span>
      </button>

      <button 
        onClick={() => onViewChange('history')}
        className={`flex flex-col items-center justify-center w-20 transition-all ${
          currentView === 'history' 
            ? 'text-emerald-600 font-semibold' 
            : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        <ClipboardList className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-wider uppercase font-medium">Reports</span>
      </button>

      <button 
        onClick={() => onViewChange('profile')}
        className={`flex flex-col items-center justify-center w-20 transition-all ${
          currentView === 'profile' 
            ? 'text-emerald-600 font-semibold' 
            : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        <User className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-wider uppercase font-medium">Profile</span>
      </button>
    </nav>
  );
}
