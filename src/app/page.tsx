'use client';

import React, { useState } from 'react';

// Tipe Data untuk Mempermudah State Management
type Mode = 'ai' | 'manual' | 'radar';
type AiStep = 'input' | 'select_footage' | 'rendering' | 'result';

export default function Home() {
  const [activeMode, setActiveMode] = useState<Mode>('ai');
  const [aiStep, setAiStep] = useState<AiStep>('input');
  
  // Form States
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState('30');
  const [manualUrl, setManualUrl] = useState('');
  const [startTime, setStartTime] = useState('0');
  const [endTime, setEndTime] = useState('30');
  const [cropRatio, setCropRatio] = useState('916'); // 9:16 vertical default
  
  // Progress bar simulation state
  const [renderProgress, setRenderProgress] = useState(0);

  // Mock Data Video Rekomendasi AI berdasarkan prompt cerita
  const mockFootageOptions = [
    { id: 1, title: 'Suasana Universitas Elit di China (Cinematic)', duration: '15s', category: 'Edukasi', icon: '🇨🇳' },
    { id: 2, title: 'Anak Muda Diskusi Rencana Bisnis Startup', duration: '20s', category: 'Bisnis', icon: '💻' },
    { id: 3, title: 'Kerja Lembur Malam Hari di Kantor', duration: '10s', category: 'Hustle', icon: '🌃' },
    { id: 4, title: 'Momen Salaman Kerjasama Tim Kreatif', duration: '15s', category: 'Sinergi', icon: '🤝' },
  ];

  // Mock Data Radar Tren Viral Terkini
  const mockTrendingTrends = [
    { id: 1, title: 'Transformasi Hustle Culture Anak Kuliahan', platform: 'TikTok', views: '4.2M', growth: '+142%', hook: 'Gue rela lepas beasiswa demi bangun ini...' },
    { id: 2, title: 'Merintis Usaha Dari Nol Bareng Sahabat', platform: 'YouTube Shorts', views: '1.8M', growth: '+89%', hook: 'Jangan pernah bisnis sama temen kalau gak mau...' },
    { id: 3, title: 'Kisah Sukses Mahasiswa Rantau Asia Timur', platform: 'TikTok', views: '2.9M', growth: '+115%', hook: 'Kuliah di luar negeri ternyata gak seindah...' },
  ];

  // Handler simulasi proses rendering AI
  const startAiRendering = () => {
    setAiStep('rendering');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setRenderProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setAiStep('result');
      }
    }, 200);
  };

  // Mengisi prompt otomatis dari data viral radar
  const handleUseTrend = (trendTitle: string, trendHook: string) => {
    setPrompt(`Buatkan video tentang: ${trendTitle}. Gunakan kalimat pembuka (hook): "${trendHook}"`);
    setActiveMode('ai');
    setAiStep('input');
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-800 bg-[#161b26] px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">✂️</span>
            <h1 className="text-xl font-black tracking-wider text-blue-500 bg-clip-text">CLIPMASTER <span className="text-white">AI</span></h1>
          </div>
          <div className="flex space-x-2 bg-gray-950 p-1 rounded-xl border border-gray-800">
            <button 
              onClick={() => { setActiveMode('ai'); setAiStep('input'); }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${activeMode === 'ai' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              ✨ AI Story Generated
            </button>
            <button 
              onClick={() => setActiveMode('manual')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${activeMode === 'manual' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              ⚙️ Manual Clipper
            </button>
            <button 
              onClick={() => setActiveMode('radar')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${activeMode === 'radar' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              🔥 Viral Radar
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4 sm:p-8">
        
        {/* ======================================= */}
        {/* MODE 1: AI STORY GENERATED (DENGAN AI) */}
        {/* ======================================= */}
        {activeMode === 'ai' && (
          <div className="max-w-3xl mx-auto bg-[#161b26] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            
            {/* STEP 1: INPUT PROMPT & DURASI */}
            {aiStep === 'input' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2 text-white">Buat Video Otomatis dari Cerita</h2>
                  <p className="text-sm text-gray-400">Tulis premis cerita, AI akan meramu script, mencari video, dan merender hasilnya.</p>
                </div>

                <div className="mb-6">
                  <label className="block text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">Deskripsi Cerita / Narasi Ide</label>
                  <textarea 
                    className="w-full h-36 p-4 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-blue-500 transition placeholder-gray-600 resize-none"
                    placeholder='Contoh: Dibesarkan dengan layak dan kuliah di China, tapi memilih merintis usaha sendiri bersama teman-temannya. Tunjukkan perjuangan dari bawah sampai sukses.'
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">Target Durasi Video</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { val: '15', label: '15 Detik', desc: 'Sangat Pendek (TikTok)' },
                      { val: '30', label: '30 Detik', desc: 'Rekomendasi (Reels)' },
                      { val: '60', label: '60 Detik', desc: 'Mendalam (Shorts)' }
                    ].map((item) => (
                      <div 
                        key={item.val}
                        onClick={() => setDuration(item.val)}
                        className={`p-3 rounded-xl border cursor-pointer text-center transition ${duration === item.val ? 'border-blue-500 bg-blue-600/10' : 'border-gray-800 bg-gray-950 hover:border-gray-700'}`}
                      >
                        <p className="font-bold text-sm text-white">{item.label}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => prompt.trim() !== '' && setAiStep('select_footage')}
                  disabled={prompt.trim() === ''}
                  className={`w-full py-4 rounded-xl font-bold tracking-wide transition flex items-center justify-center space-x-2 ${prompt.trim() !== '' ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                >
                  <span>Analis Konten & Cari Footage</span>
                  <span>🚀</span>
                </button>
              </div>
            )}

            {/* STEP 2: PILIH VIDEO REKOMENDASI AI */}
            {aiStep === 'select_footage' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2 text-white">Rekomendasi Konten AI Terdeteksi ✨</h2>
                  <p className="text-sm text-gray-400">Berdasarkan narasi ceritamu, AI menemukan klip video mentah terbaik berikut. Centang video yang ingin kamu masukkan ke hasil akhir.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {mockFootageOptions.map((video) => (
                    <div key={video.id} className="border border-gray-800 bg-gray-950 p-4 rounded-xl flex items-center justify-between hover:border-gray-700 transition">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl bg-gray-900 p-2 rounded-lg border border-gray-800">{video.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-white leading-tight">{video.title}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-[10px] bg-blue-900/40 text-blue-400 px-1.5 py-0.5 rounded font-mono">{video.duration}</span>
                            <span className="text-[10px] text-gray-500">{video.category}</span>
                          </div>
                        </div>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-blue-500 cursor-pointer" />
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setAiStep('input')}
                    className="w-1/3 bg-gray-950 border border-gray-800 hover:bg-gray-900 text-gray-300 py-3.5 rounded-xl font-bold transition text-sm"
                  >
                    Ubah Narasi
                  </button>
                  <button 
                    onClick={startAiRendering}
                    className="w-2/3 bg-green-600 hover:bg-green-500 text-white py-3.5 rounded-xl font-bold transition text-sm shadow-lg shadow-green-600/10 flex items-center justify-center space-x-2"
                  >
                    <span>Mulai Gabungkan & Render Video ({duration}s)</span>
                    <span>🎬</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: RENDERING ANIMATION */}
            {aiStep === 'rendering' && (
              <div className="py-12 text-center">
                <div className="inline-block animate-spin text-4xl mb-4 text-blue-500">⏳</div>
                <h3 className="text-xl font-bold text-white mb-2">Sedang Merakit Video Kamu...</h3>
                <p className="text-sm text-gray-400 max-w-sm mx-auto mb-6">AI sedang menyinkronkan teks narasi suara, memotong klip video, dan menyesuaikan musik latar.</p>
                <div className="w-full bg-gray-950 rounded-full h-3 max-w-md mx-auto p-0.5 border border-gray-800">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-200" style={{ width: `${renderProgress}%` }}></div>
                </div>
                <p className="text-xs font-mono text-blue-400 mt-2">{renderProgress}% Selesai</p>
              </div>
            )}

            {/* STEP 4: RESULT / PREVIEW VIDEO */}
            {aiStep === 'result' && (
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-4">✨ Video Berhasil Dibuat!</h3>
                
                {/* Simulated Vertical Video Player Container */}
                <div className="w-full max-w-[280px] h-[450px] bg-gray-950 border border-gray-800 mx-auto rounded-2xl flex flex-col items-center justify-center relative overflow-hidden mb-6 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10 p-4 flex flex-col justify-end text-left">
                    <p className="text-xs font-semibold text-white">@kreator_ai</p>
                    <p className="text-[11px] text-gray-300 mt-1 line-clamp-2">{prompt}</p>
                  </div>
                  <span className="text-6xl animate-pulse">🎬</span>
                  <p className="text-xs text-gray-500 mt-4 font-mono">[Simulasi Hasil Video 9:16]</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                  <button 
                    onClick={() => setAiStep('input')}
                    className="flex-1 bg-gray-950 border border-gray-800 hover:bg-gray-900 text-white py-3 rounded-xl font-bold text-sm"
                  >
                    Buat Baru Lagi
                  </button>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); alert('Mengunduh klip video mp4...'); }}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/20"
                  >
                    <span>Download MP4</span>
                    <span>📥</span>
                  </a>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ======================================= */}
        {/* MODE 2: MANUAL CLIPPER (TANPA GENERATED) */}
        {/* ======================================= */}
        {activeMode === 'manual' && (
          <div className="max-w-3xl mx-auto bg-[#161b26] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 text-white">Clip Video Manual</h2>
              <p className="text-sm text-gray-400">Tempel tautan video dari YouTube atau TikTok, potong manual bagian yang kamu inginkan.</p>
            </div>

            <div className="mb-6">
              <label className="block text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">Tautan URL Video Sumber</label>
              <input 
                type="text" 
                className="w-full p-4 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-blue-500 placeholder-gray-600"
                placeholder="https://www.youtube.com/watch?v=... atau link video TikTok"
                value={manualUrl}
                onChange={(e) => setManualUrl(e.target.value)}
              />
            </div>

            {/* Pengaturan Durasi Presisi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">Detik Mulai (Start)</label>
                <input 
                  type="number" 
                  className="w-full p-3 bg-gray-950 border border-gray-800 rounded-xl text-white font-mono"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">Detik Berakhir (End)</label>
                <input 
                  type="number" 
                  className="w-full p-3 bg-gray-950 border border-gray-800 rounded-xl text-white font-mono"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            {/* Aspek Rasio Potong Krop */}
            <div className="mb-8">
              <label className="block text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">Pilihan Aspek Rasio Video</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: '916', label: '📱 9:16 Vertical', desc: 'TikTok / Shorts' },
                  { id: '11', label: '🔲 1:1 Square', desc: 'Instagram Post' },
                  { id: '169', label: '🖥️ 16:9 Wide', desc: 'Video Asli' }
                ].map((ratio) => (
                  <div
                    key={ratio.id}
                    onClick={() => setCropRatio(ratio.id)}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition ${cropRatio === ratio.id ? 'border-blue-500 bg-blue-600/10' : 'border-gray-800 bg-gray-950 hover:border-gray-700'}`}
                  >
                    <p className="text-sm font-bold text-white">{ratio.label}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{ratio.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => alert(`Memproses video manual dari detik ${startTime} ke ${endTime} dengan rasio format ${cropRatio}...`)}
              disabled={manualUrl.trim() === ''}
              className={`w-full py-4 rounded-xl font-bold tracking-wide transition ${manualUrl.trim() !== '' ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
            >
              Potong & Unduh Klip Video ✂️
            </button>
          </div>
        )}

        {/* ======================================= */}
        {/* MODE 3: VIRAL RADAR (TREN VIRAL AI)     */}
        {/* ======================================= */}
        {activeMode === 'radar' && (
          <div>
            <div className="mb-6 text-center max-w-xl mx-auto">
              <h2 className="text-3xl font-black mb-2 text-white">🔥 VIRAL RADAR DASHBOARD</h2>
              <p className="text-sm text-gray-400">Data tren ter-update hari ini yang sedang meledak di algoritma TikTok dan Shorts. Gunakan ide tren ini langsung ke AI Generator.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockTrendingTrends.map((trend) => (
                <div key={trend.id} className="bg-[#161b26] border border-gray-800 p-6 rounded-2xl flex flex-col justify-between hover:border-blue-500/50 transition shadow-xl">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-bold uppercase">{trend.platform}</span>
                      <span className="text-xs font-mono font-bold text-green-400">{trend.growth} Berita Meroket</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-snug">{trend.title}</h3>
                    <p className="text-xs text-gray-400 bg-gray-950 p-2.5 rounded-lg border border-gray-900 font-serif italic mb-4">
                      Hook Viral: "{trend.hook}"
                    </p>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-4 flex items-center justify-between">
                      <span>Estimasi Penonton:</span>
                      <span className="font-bold text-gray-300">{trend.views} views</span>
                    </div>
                    <button 
                      onClick={() => handleUseTrend(trend.title, trend.hook)}
                      className="w-full bg-blue-600/10 hover:bg-blue-600 border border-blue-500/30 hover:border-blue-500 text-blue-400 hover:text-white py-2.5 rounded-xl text-xs font-bold transition"
                    >
                      Bawa Ide ke AI Story Generator 🪄
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
