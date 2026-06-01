'use client';
import { useState, useEffect } from 'react';

export default function DarOptics() {
  const [step, setStep] = useState('auth'); // auth, upload, menu, products
  const [user, setUser] = useState({ email: '', role: 'guest' });
  const [faces, setFaces] = useState({ front: null, left: null, right: null });
  const [category, setCategory] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // التحقق من صلاحيات معتصم
  useEffect(() => {
    if (user.email === 'motasembelal31@gmail.com') setIsAdmin(true);
  }, [user.email]);

  const whatsappLink = "https://wa.me/qr/WFXDMTVPE2ZSI1";

  return (
    <div dir="rtl" className="min-h-screen bg-white font-sans text-gray-900">
      {/* Header مع اللوجو */}
      <nav className="p-6 flex justify-between items-center border-b border-gray-50">
        <img src="1000030920.jpg" alt="Dar Optics Logo" className="h-16 object-contain" />
        {isAdmin && <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">الآدمن: معتصم</span>}
      </nav>

      <main className="max-w-md mx-auto p-6">
        {/* المرحلة 1: تسجيل الدخول */}
        {step === 'auth' && (
          <div className="text-center space-y-6 mt-10">
            <h1 className="text-2xl font-black text-orange-500">أهلاً بك في دار النظارات</h1>
            <div className="space-y-3">
              <button onClick={() => {setUser({email: 'test@google.com', role: 'user'}); setStep('upload');}} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold">الدخول عبر جوجل</button>
              <button onClick={() => {setUser({email: '', role: 'guest'}); setStep('upload');}} className="w-full py-4 border-2 border-gray-100 rounded-2xl font-bold">الدخول كضيف</button>
            </div>
          </div>
        )}

        {/* المرحلة 2: رفع الـ 3 زوايا */}
        {step === 'upload' && (
          <div className="space-y-6 text-center">
            <h2 className="text-xl font-bold">نحتاج صورك (أمام، يمين، يسار)</h2>
            <div className="grid grid-cols-3 gap-2">
              {['front', 'right', 'left'].map(a => (
                <div key={a} className="h-24 bg-orange-50 rounded-xl border-2 border-dashed border-orange-200 flex items-center justify-center text-xs">ارفع {a}</div>
              ))}
            </div>
            <button onClick={() => setStep('menu')} className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold">حفظ ومتابعة</button>
          </div>
        )}

        {/* المرحلة 3: القائمة الرئيسية (الـ 4 خانات) */}
        {step === 'menu' && (
          <div className="space-y-4">
            <p className="text-center font-bold">اختر القسم:</p>
            {['نظارات شمسي', 'نظارات طبية', 'عدسات لاصقة', 'نظارات حماية'].map((cat, i) => (
              <button key={i} onClick={() => setCategory(i+1)} className="w-full p-6 bg-white shadow-sm border border-gray-100 rounded-3xl text-right flex justify-between items-center hover:border-orange-500 transition-all">
                <span className="font-black text-lg text-gray-700">{cat}</span>
                <span className="text-orange-500">←</span>
              </button>
            ))}
          </div>
        )}

        {/* زر التغيير للآدمن */}
        {isAdmin && (
          <div className="fixed bottom-6 inset-x-6 flex justify-center">
            <button className="bg-orange-600 text-white px-8 py-3 rounded-full shadow-2xl font-bold">تغيير</button>
          </div>
        )}
      </main>
    </div>
  );
}
