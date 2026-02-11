import { useState, FormEvent } from 'react';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';
import { db } from '@/services/database';
import type { Gender, ViolenceType, SubstanceType, MedicalHistory } from '@/types';
import { FileText, User, Users, AlertCircle, CheckCircle } from 'lucide-react';

export function CaseFormArabic({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    fileNumber: '',
    completedBy: '',
    sender: '',
    reportSource: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
    gender: 'male' as Gender,
    civilRegistration: true,
    phone: '',
    siblingsCount: 0,
    orderAmongSiblings: 0,
    educationLevel: '',
    institution: '',
    stoppedSchool: false,
    schoolStopDate: '',
    socialCoverage: '',
    substances: [] as SubstanceType[],
    medicalHistory: [] as MedicalHistory[],
    motherFirstName: '',
    motherLastName: '',
    motherBirthDate: '',
    motherBirthPlace: '',
    motherNationalId: '',
    motherPhone: '',
    motherEducation: '',
    motherProfession: '',
    motherAddress: '',
    fatherFirstName: '',
    fatherLastName: '',
    fatherBirthDate: '',
    fatherBirthPlace: '',
    fatherNationalId: '',
    fatherPhone: '',
    fatherEducation: '',
    fatherProfession: '',
    fatherAddress: '',
    parentsStatus: '',
    childLivingPlace: '',
    abuserFirstName: '',
    abuserLastName: '',
    abuserAge: '',
    abuserNationalId: '',
    abuserPhone: '',
    abuserEducation: '',
    abuserProfession: '',
    abuserAddress: '',
    abuserRelation: '',
    violenceTypes: [] as ViolenceType[],
    violenceNature: '',
    childStatement: '',
    childCondition: '',
    childRequests: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCheckbox = (field: 'substances' | 'medicalHistory' | 'violenceTypes', value: any) => {
    const current = formData[field] as any[];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setFormData({ ...formData, [field]: updated });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const birthDate = new Date(formData.birthDate);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      
      await db.addCase({
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`,
        age,
        problemType: 'violence',
        date: new Date().toISOString().split('T')[0]
      } as any);
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      onSuccess?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-slide-up" dir="rtl">
      {showSuccess && (
        <div className="mb-6 p-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl shadow-lg flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-6 h-6" />
          <span className="font-semibold">تم حفظ الملف بنجاح! ✅</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-8 card-hover">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ملف جديد</h2>
        </div>

        {/* معلومات أساسية */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 border-r-4 border-blue-500 pr-3">معلومات أساسية</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input label="رقم الملف" value={formData.fileNumber} onChange={e => setFormData({...formData, fileNumber: e.target.value})} required />
            <Input label="من إنجاز" value={formData.completedBy} onChange={e => setFormData({...formData, completedBy: e.target.value})} required />
            <Input label="المرسل" value={formData.sender} onChange={e => setFormData({...formData, sender: e.target.value})} />
            <Input label="مصدر التبليغ" value={formData.reportSource} onChange={e => setFormData({...formData, reportSource: e.target.value})} />
          </div>
        </div>

        {/* معلومات الطفل */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 border-r-4 border-green-500 pr-3">معلومات حول الطفل (ة)</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input label="الاسم الشخصي" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} required />
            <Input label="الاسم العائلي" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} required />
            <Input label="تاريخ الازدياد" type="date" value={formData.birthDate} onChange={e => setFormData({...formData, birthDate: e.target.value})} required />
            <Input label="مكان الازدياد" value={formData.birthPlace} onChange={e => setFormData({...formData, birthPlace: e.target.value})} />
            <Select label="الجنس" options={[{value:'male',label:'ذكر'},{value:'female',label:'أنثى'}]} value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value as Gender})} />
            <Input label="الهاتف" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
          
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={formData.civilRegistration} onChange={e => setFormData({...formData, civilRegistration: e.target.checked})} className="w-5 h-5" />
              <span>التسجيل بالحالة المدنية</span>
            </label>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input label="عدد الإخوة" type="number" value={formData.siblingsCount} onChange={e => setFormData({...formData, siblingsCount: parseInt(e.target.value)||0})} />
            <Input label="الترتيب بين الإخوة" type="number" value={formData.orderAmongSiblings} onChange={e => setFormData({...formData, orderAmongSiblings: parseInt(e.target.value)||0})} />
            <Input label="المستوى الدراسي" value={formData.educationLevel} onChange={e => setFormData({...formData, educationLevel: e.target.value})} />
          </div>

          <Input label="المؤسسة" value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} />

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={formData.stoppedSchool} onChange={e => setFormData({...formData, stoppedSchool: e.target.checked})} className="w-5 h-5" />
              <span>التوقف عن التمدرس</span>
            </label>
            {formData.stoppedSchool && (
              <Input label="تاريخ التوقف" type="date" value={formData.schoolStopDate} onChange={e => setFormData({...formData, schoolStopDate: e.target.value})} />
            )}
          </div>

          <Input label="نوع التغطية الاجتماعية" value={formData.socialCoverage} onChange={e => setFormData({...formData, socialCoverage: e.target.value})} />

          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 block">عادات سامة:</label>
            <div className="flex flex-wrap gap-4">
              {[{v:'cigarettes',l:'السجائر'},{v:'alcohol',l:'الكحول'},{v:'drugs',l:'المخدرات'},{v:'glue',l:'اللصاق'},{v:'none',l:'لا يتعاطى شيئا'}].map(s => (
                <label key={s.v} className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.substances.includes(s.v as SubstanceType)} onChange={() => handleCheckbox('substances', s.v)} className="w-5 h-5" />
                  <span>{s.l}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 block">السوابق:</label>
            <div className="flex gap-4">
              {[{v:'medical',l:'طبية'},{v:'psychological',l:'نفسية'},{v:'other',l:'أخرى'}].map(h => (
                <label key={h.v} className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.medicalHistory.includes(h.v as MedicalHistory)} onChange={() => handleCheckbox('medicalHistory', h.v)} className="w-5 h-5" />
                  <span>{h.l}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* معلومات الأم */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 border-r-4 border-pink-500 pr-3">معلومات حول الأم</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input label="الاسم الشخصي" value={formData.motherFirstName} onChange={e => setFormData({...formData, motherFirstName: e.target.value})} />
            <Input label="الاسم العائلي" value={formData.motherLastName} onChange={e => setFormData({...formData, motherLastName: e.target.value})} />
            <Input label="تاريخ الازدياد" type="date" value={formData.motherBirthDate} onChange={e => setFormData({...formData, motherBirthDate: e.target.value})} />
            <Input label="مكان الازدياد" value={formData.motherBirthPlace} onChange={e => setFormData({...formData, motherBirthPlace: e.target.value})} />
            <Input label="رقم البطاقة الوطنية" value={formData.motherNationalId} onChange={e => setFormData({...formData, motherNationalId: e.target.value})} />
            <Input label="الهاتف" value={formData.motherPhone} onChange={e => setFormData({...formData, motherPhone: e.target.value})} />
            <Input label="المستوى الدراسي" value={formData.motherEducation} onChange={e => setFormData({...formData, motherEducation: e.target.value})} />
            <Input label="المهنة" value={formData.motherProfession} onChange={e => setFormData({...formData, motherProfession: e.target.value})} />
          </div>
          <Input label="العنوان" value={formData.motherAddress} onChange={e => setFormData({...formData, motherAddress: e.target.value})} />
        </div>

        {/* معلومات الأب */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 border-r-4 border-blue-500 pr-3">معلومات حول الأب</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input label="الاسم الشخصي" value={formData.fatherFirstName} onChange={e => setFormData({...formData, fatherFirstName: e.target.value})} />
            <Input label="الاسم العائلي" value={formData.fatherLastName} onChange={e => setFormData({...formData, fatherLastName: e.target.value})} />
            <Input label="تاريخ الازدياد" type="date" value={formData.fatherBirthDate} onChange={e => setFormData({...formData, fatherBirthDate: e.target.value})} />
            <Input label="مكان الازدياد" value={formData.fatherBirthPlace} onChange={e => setFormData({...formData, fatherBirthPlace: e.target.value})} />
            <Input label="رقم البطاقة الوطنية" value={formData.fatherNationalId} onChange={e => setFormData({...formData, fatherNationalId: e.target.value})} />
            <Input label="الهاتف" value={formData.fatherPhone} onChange={e => setFormData({...formData, fatherPhone: e.target.value})} />
            <Input label="المستوى الدراسي" value={formData.fatherEducation} onChange={e => setFormData({...formData, fatherEducation: e.target.value})} />
            <Input label="المهنة" value={formData.fatherProfession} onChange={e => setFormData({...formData, fatherProfession: e.target.value})} />
          </div>
          <Input label="العنوان" value={formData.fatherAddress} onChange={e => setFormData({...formData, fatherAddress: e.target.value})} />
        </div>

        {/* الوضع العائلي */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="الوضع الحالي للأبوين" value={formData.parentsStatus} onChange={e => setFormData({...formData, parentsStatus: e.target.value})} />
            <Input label="مكان عيش الطفل" value={formData.childLivingPlace} onChange={e => setFormData({...formData, childLivingPlace: e.target.value})} />
          </div>
        </div>

        {/* معلومات المعنف */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 border-r-4 border-red-500 pr-3">معلومات حول المعنف</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input label="الاسم الشخصي" value={formData.abuserFirstName} onChange={e => setFormData({...formData, abuserFirstName: e.target.value})} />
            <Input label="الاسم العائلي" value={formData.abuserLastName} onChange={e => setFormData({...formData, abuserLastName: e.target.value})} />
            <Input label="عمره حوالي" value={formData.abuserAge} onChange={e => setFormData({...formData, abuserAge: e.target.value})} />
            <Input label="رقم البطاقة الوطنية" value={formData.abuserNationalId} onChange={e => setFormData({...formData, abuserNationalId: e.target.value})} />
            <Input label="الهاتف" value={formData.abuserPhone} onChange={e => setFormData({...formData, abuserPhone: e.target.value})} />
            <Input label="المستوى الدراسي" value={formData.abuserEducation} onChange={e => setFormData({...formData, abuserEducation: e.target.value})} />
            <Input label="المهنة" value={formData.abuserProfession} onChange={e => setFormData({...formData, abuserProfession: e.target.value})} />
            <Input label="علاقته بالطفل" value={formData.abuserRelation} onChange={e => setFormData({...formData, abuserRelation: e.target.value})} />
          </div>
          <Input label="العنوان" value={formData.abuserAddress} onChange={e => setFormData({...formData, abuserAddress: e.target.value})} />
        </div>

        {/* العنف */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 border-r-4 border-orange-500 pr-3">طبيعة العنف</h3>
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 block">طبيعة العنف الذي تعرض له:</label>
            <div className="flex gap-4">
              {[{v:'physical',l:'جسدي'},{v:'sexual',l:'جنسي'},{v:'psychological',l:'نفسي'},{v:'social',l:'اجتماعي'}].map(vt => (
                <label key={vt.v} className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.violenceTypes.includes(vt.v as ViolenceType)} onChange={() => handleCheckbox('violenceTypes', vt.v)} className="w-5 h-5" />
                  <span>{vt.l}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">تصريح الطفل:</label>
              <textarea className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none" rows={3} value={formData.childStatement} onChange={e => setFormData({...formData, childStatement: e.target.value})} />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">الحالة التي أتى بها الطفل:</label>
              <textarea className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none" rows={3} value={formData.childCondition} onChange={e => setFormData({...formData, childCondition: e.target.value})} />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">طلبات و تطلعات الطفل:</label>
              <textarea className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none" rows={3} value={formData.childRequests} onChange={e => setFormData({...formData, childRequests: e.target.value})} />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">ملاحظة:</label>
              <textarea className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none" rows={4} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? '⏳ جاري الحفظ...' : '✅ حفظ الملف'}
        </Button>
      </form>
    </div>
  );
}
