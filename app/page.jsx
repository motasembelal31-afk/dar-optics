'use client';
import { useState } from 'react';

export default function FinalTryOn() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const runAI = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userImage: image }),
      });
      const data = await res.json();
      if (data.resultImageUrl) setResult(data.resultImageUrl);
      else alert("حدث خطأ في المعالجة");
    } catch (err) {
      alert("تأكد من إعدادات الـ API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#fafafa] font-sans text-gray-900">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
          <span className="text-xl font-black tracking-tighter">دار <span className="text-orange-500">النظارات</span></span>
        </div>
        <div className="text-[10px] bg-orange-100 text-orange-600 px-2 py-1 rounded-md font-bold">AI STUDIO v2.0</div>
      </nav>

      <main className="max-w-xl mx-auto px-5 py-10 space-y-10">
        <header className="text-center space-y-3">
          <h1 className="text-3xl font-extrabold text-gray-900">التجربة الافتراضية</h1>
          <p className="text-gray-500 text-sm leading-relaxed">تخيل شكلك بالنظارة الجديدة بضغطة زر واحدة بفضل تقنية الذكاء الاصطناعي المتطورة.</p>
        </header>

        {/* Display Area */}
        <div className="relative aspect-[4/5] bg-white rounded-[40px] shadow-2xl shadow-orange-100 border-8 border-white overflow-hidden group">
          {!image && !result ? (
            <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-50/30 transition-colors">
              <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-orange-200 mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              </div>
              <span className="font-bold text-gray-400">ارفع صورتك الشخصية</span>
              <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
            </label>
          ) : (
            <img src={result || image} className="w-full h-full object-cover" alt="Preview" />
          )}

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-orange-600 font-black animate-pulse">جاري دمج النظارة واقعياً...</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {!result ? (
            <button
              onClick={runAI}
              disabled={loading || !image}
              className="w-full bg-orange-500 text-white py-5 rounded-3xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 active:scale-[0.98] transition-all disabled:bg-gray-200 disabled:shadow-none"
            >
              بدء التخيل الذكي ✨
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => {setResult(null); setImage(null);}} className="bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold text-sm">صورة جديدة</button>
              <a href={result} download className="bg-gray-900 text-white py-4 rounded-2xl font-bold text-sm text-center">تحميل النتيجة</a>
            </div>
          )}
          
          <p className="text-[10px] text-center text-gray-400">ملاحظة: الذكاء الاصطناعي يقوم برسم النظارة بناءً على أبعاد وجهك الحقيقية.</p>
        </div>
      </main>
    </div>
  );
}
