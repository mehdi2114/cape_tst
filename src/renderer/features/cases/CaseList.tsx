import { useState, useEffect } from 'react';
import { Input } from '@/components/Input';
import { db } from '@/services/database';
import type { Case } from '@/types';
import { Search, Users, Calendar, AlertTriangle } from 'lucide-react';

export function CaseList() {
  const [cases, setCases] = useState<Case[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    setLoading(true);
    const allCases = await db.getAllCases();
    setCases(allCases);
    setLoading(false);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = await db.searchCases(query);
      setCases(results);
    } else {
      loadCases();
    }
  };

  const getProblemIcon = (type: string) => {
    const icons: Record<string, string> = {
      violence: '⚠️',
      neglect: '🚫',
      abuse: '🛑',
      family_issues: '👨👩👧',
      education: '📚',
      health: '🏥',
      other: '📋'
    };
    return icons[type] || '📋';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="glass rounded-2xl p-6 card-hover">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Liste des Cas</h2>
        </div>
        
        <Input
          icon={<Search className="w-5 h-5" />}
          placeholder="Rechercher par nom ou notes..."
          value={searchQuery}
          onChange={e => handleSearch(e.target.value)}
        />
      </div>

      {cases.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-slate-400" />
          <p className="text-xl text-slate-600">Aucun cas trouvé</p>
          <p className="text-slate-500 mt-2">Commencez par ajouter un nouveau cas</p>
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden card-hover">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Genre</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Âge</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Problème</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cases.map((c, idx) => (
                  <tr key={c.id} className="hover:bg-blue-50/50 transition-colors duration-200" style={{ animationDelay: `${idx * 50}ms` }}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-slate-800">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full text-sm font-medium ${
                        c.gender === 'male' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-pink-100 text-pink-700'
                      }">
                        {c.gender === 'male' ? '👦 Garçon' : '👧 Fille'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-700 font-medium">{c.age} ans</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-700">
                        {getProblemIcon(c.problemType)} {c.problemType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(c.date).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="glass rounded-xl p-4 flex items-center justify-between">
        <span className="text-slate-600 font-medium">📊 Total: <span className="text-blue-600 font-bold text-lg">{cases.length}</span> cas</span>
      </div>
    </div>
  );
}
