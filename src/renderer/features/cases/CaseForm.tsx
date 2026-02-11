import { useState, FormEvent } from 'react';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';
import { db } from '@/services/database';
import type { Gender, ProblemType } from '@/types';
import { User, Calendar, AlertCircle, FileText, CheckCircle } from 'lucide-react';

const genderOptions = [
  { value: 'male', label: '👦 Garçon' },
  { value: 'female', label: '👧 Fille' }
];

const problemOptions = [
  { value: 'violence', label: '⚠️ Violence' },
  { value: 'neglect', label: '🚫 Négligence' },
  { value: 'abuse', label: '🛑 Abus' },
  { value: 'family_issues', label: '👨‍👩‍👧 Problèmes Familiaux' },
  { value: 'education', label: '📚 Éducation' },
  { value: 'health', label: '🏥 Santé' },
  { value: 'other', label: '📋 Autre' }
];

export function CaseForm({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male' as Gender,
    age: '',
    problemType: 'violence' as ProblemType,
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await db.addCase({
        ...formData,
        age: parseInt(formData.age)
      });
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      setFormData({
        name: '',
        gender: 'male',
        age: '',
        problemType: 'violence',
        date: new Date().toISOString().split('T')[0],
        notes: ''
      });
      
      onSuccess?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-slide-up">
      {showSuccess && (
        <div className="mb-6 p-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl shadow-lg flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-6 h-6" />
          <span className="font-semibold">Cas enregistré avec succès! ✅</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6 card-hover">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Nouveau Cas</h2>
        </div>
        
        <Input
          label="Nom Complet"
          icon={<User className="w-5 h-5" />}
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          placeholder="Entrez le nom complet..."
          required
        />

        <div className="grid grid-cols-2 gap-6">
          <Select
            label="Genre"
            options={genderOptions}
            value={formData.gender}
            onChange={e => setFormData({ ...formData, gender: e.target.value as Gender })}
          />
          
          <Input
            label="Âge"
            type="number"
            value={formData.age}
            onChange={e => setFormData({ ...formData, age: e.target.value })}
            placeholder="Ex: 12"
            min="0"
            max="18"
            required
          />
        </div>

        <Select
          label="Type de Problème"
          options={problemOptions}
          value={formData.problemType}
          onChange={e => setFormData({ ...formData, problemType: e.target.value as ProblemType })}
        />

        <Input
          label="Date"
          icon={<Calendar className="w-5 h-5" />}
          type="date"
          value={formData.date}
          onChange={e => setFormData({ ...formData, date: e.target.value })}
          required
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Notes
          </label>
          <textarea
            className="px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none"
            rows={4}
            value={formData.notes}
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Ajoutez des notes supplémentaires..."
          />
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? '⏳ Enregistrement...' : '✅ Enregistrer le Cas'}
        </Button>
      </form>
    </div>
  );
}
