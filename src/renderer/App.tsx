import { useState } from 'react';
import { CaseFormArabic } from '@/features/cases/CaseFormArabic';
import { CaseList } from '@/features/cases/CaseList';
import { Dashboard } from '@/features/dashboard/Dashboard';
import { LayoutDashboard, FileText, List, Shield } from 'lucide-react';

type View = 'dashboard' | 'new-case' | 'cases';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const navItems = [
    { id: 'dashboard' as View, label: 'Tableau de Bord', icon: LayoutDashboard, gradient: 'from-blue-500 to-indigo-600' },
    { id: 'new-case' as View, label: 'Nouveau Cas', icon: FileText, gradient: 'from-emerald-500 to-green-600' },
    { id: 'cases' as View, label: 'Liste des Cas', icon: List, gradient: 'from-purple-500 to-pink-600' }
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-72 glass border-r border-white/20 flex flex-col">
        {/* Logo */}
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl shadow-blue-500/50">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">CAPE</h1>
              <p className="text-xs text-slate-600 font-medium">Protection de l'Enfance</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl font-semibold transition-all duration-300 group ${
                  isActive
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg transform scale-105`
                    : 'text-slate-700 hover:bg-white/50 hover:scale-102'
                }`}
              >
                <div className={`p-2 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-white/20' 
                    : 'bg-slate-100 group-hover:bg-slate-200'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-xs text-slate-600 font-medium">🔒 Données 100% Locales</p>
            <p className="text-xs text-slate-500 mt-1">Sécurisé & Confidentiel</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h2 className="text-4xl font-black text-slate-800 mb-2">
              {navItems.find(item => item.id === currentView)?.label}
            </h2>
            <p className="text-slate-600">Gestion professionnelle des cas de protection</p>
          </div>

          {/* Content */}
          <div className="animate-slide-up">
            {currentView === 'dashboard' && <Dashboard />}
            {currentView === 'new-case' && <CaseFormArabic onSuccess={() => setCurrentView('cases')} />}
            {currentView === 'cases' && <CaseList />}
          </div>
        </div>
      </main>
    </div>
  );
}
