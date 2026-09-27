import { User, Shield, Key, Sliders, Database, CreditCard, ChevronRight, Check } from 'lucide-react';

export default function UserProfile() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-950">Enterprise Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage secure key credentials, database sync status, and account profile.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Card: Account Summary */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center border-2 border-emerald-100">
              <User className="w-12 h-12 stroke-[1.5]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-950">John Doe</h2>
              <p className="text-xs text-gray-500">Chief Investment Officer</p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
              Enterprise Elite Partner
            </span>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-gray-500 uppercase tracking-wider">Account ID</span>
              <span className="font-mono text-gray-950 font-bold">USR-840293</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-gray-500 uppercase tracking-wider">Storage Used</span>
              <span className="font-bold text-gray-950">4.2 GB of 50 GB</span>
            </div>
          </div>
        </div>

        {/* Right Section: Enterprise Settings Categories */}
        <div className="lg:col-span-8 space-y-6">
          {/* Security Protocols */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <Shield className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-950">Security Protocols</h3>
            </div>

            <ul className="divide-y divide-gray-100">
              <li className="py-3 flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-gray-900">Document Encryption keys</p>
                  <p className="text-[10px] text-gray-500">End-to-end AES-256 verification archive</p>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                  Active
                </span>
              </li>

              <li className="py-3 flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-gray-900">Multi-factor Authentication</p>
                  <p className="text-[10px] text-gray-500">Requires FIDO2 key or Google Authenticator</p>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                  Active
                </span>
              </li>
            </ul>
          </div>

          {/* API Integrations */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <Key className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-950">API Integrations</h3>
            </div>
            
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-gray-900 block">Gemini Sandbox API Key</label>
              <div className="flex gap-2">
                <input 
                  type="password" 
                  id="sandboxApiKey"
                  className="flex-grow text-xs border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="AIzaSy..." 
                  defaultValue={localStorage.getItem('sandboxApiKey') || ''}
                  onChange={(e) => localStorage.setItem('sandboxApiKey', e.target.value)}
                />
                <button 
                  type="button" 
                  onClick={() => alert('API Key saved securely to local storage.')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                >
                  Save Key
                </button>
              </div>
              <p className="text-[10px] text-gray-500">
                Override the system's default Gemini ML synthesizer with your own sandbox key for high-fidelity evaluation.
              </p>
            </div>
          </div>

          {/* Connected Registries */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <Database className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-950">Connected land registries</h3>
            </div>

            <ul className="divide-y divide-gray-100 text-xs text-gray-700">
              <li className="py-3 flex items-center justify-between font-semibold">
                <span>National Land Survey Authority (NLSA)</span>
                <span className="text-emerald-700 font-bold">Connected</span>
              </li>
              <li className="py-3 flex items-center justify-between font-semibold">
                <span>Municipal Geo-Mapping Records</span>
                <span className="text-emerald-700 font-bold">Connected</span>
              </li>
              <li className="py-3 flex items-center justify-between font-semibold">
                <span>Supreme Court Deed Litigation Index</span>
                <span className="text-emerald-700 font-bold">Connected</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
