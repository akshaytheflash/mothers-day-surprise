'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import {
  generateShareableUrl,
  getWhatsAppUrl,
  compressImage,
  generateId,
} from '@/lib/utils';
import { SiteContent, BalloonData, BALLOON_COLORS, defaultContent, DEFAULT_FINAL_MESSAGE } from '@/data/siteContent';

interface FormField {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}

function InputField({ label, value, onChange, placeholder, type = 'text' }: FormField) {
  return (
    <div className="space-y-2">
      <label
        className="block text-sm font-medium"
        style={{ color: 'rgba(61,44,44,0.75)', fontFamily: 'Poppins, sans-serif' }}
      >
        {label}
      </label>
      <input
        type={type}
        className="input-premium"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

function BalloonCard({
  balloon,
  index,
  onChange,
  onRemove,
}: {
  balloon: BalloonData;
  index: number;
  onChange: (updated: BalloonData) => void;
  onRemove: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file, 600, 600, 0.7);
      onChange({ ...balloon, image: compressed });
    } catch (err) {
      console.error('Image compression failed', err);
    }
  };

  const selectedColor = BALLOON_COLORS.find((c) => c.value === balloon.color) || BALLOON_COLORS[0];

  return (
    <motion.div
      className="card-premium p-5 space-y-4 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
            style={{ background: selectedColor.gradient, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
          >
            {index + 1}
          </div>
          <span
            className="font-medium text-sm"
            style={{ color: 'rgba(61,44,44,0.8)', fontFamily: 'Poppins, sans-serif' }}
          >
            Balloon {index + 1}
          </span>
        </div>
        <button
          onClick={onRemove}
          className="w-7 h-7 rounded-full flex items-center justify-center text-sm transition-colors hover:bg-rose-100"
          style={{ color: 'rgba(201, 107, 107, 0.6)' }}
        >
          ✕
        </button>
      </div>

      {/* Color selector */}
      <div>
        <label
          className="block text-xs font-medium mb-2"
          style={{ color: 'rgba(61,44,44,0.6)', fontFamily: 'Poppins, sans-serif' }}
        >
          Balloon Color
        </label>
        <div className="flex gap-2 flex-wrap">
          {BALLOON_COLORS.map((c) => (
            <button
              key={c.value}
              onClick={() => onChange({ ...balloon, color: c.value, colorHex: c.hex })}
              className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
              style={{
                background: c.gradient,
                borderColor: balloon.color === c.value ? '#c96b6b' : 'rgba(255,255,255,0.7)',
                boxShadow:
                  balloon.color === c.value
                    ? '0 0 0 2px rgba(201,107,107,0.4)'
                    : '0 2px 6px rgba(0,0,0,0.1)',
              }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      {/* Photo upload */}
      <div>
        <label
          className="block text-xs font-medium mb-2"
          style={{ color: 'rgba(61,44,44,0.6)', fontFamily: 'Poppins, sans-serif' }}
        >
          Memory Photo (optional)
        </label>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        {balloon.image ? (
          <div className="relative">
            <img
              src={balloon.image}
              alt="Memory"
              className="w-full h-32 object-cover rounded-xl"
            />
            <button
              onClick={() => onChange({ ...balloon, image: '' })}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-xs shadow"
              style={{ color: '#c96b6b' }}
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors hover:border-rose-300 hover:bg-rose-50"
            style={{ borderColor: 'rgba(201, 107, 107, 0.25)', background: 'rgba(255,255,255,0.5)' }}
          >
            <span className="text-2xl">📷</span>
            <span className="text-xs" style={{ color: 'rgba(61,44,44,0.5)', fontFamily: 'Poppins, sans-serif' }}>
              Upload a photo
            </span>
          </button>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          className="block text-xs font-medium mb-2"
          style={{ color: 'rgba(61,44,44,0.6)', fontFamily: 'Poppins, sans-serif' }}
        >
          Sweet Message
        </label>
        <textarea
          className="input-premium resize-none"
          rows={3}
          value={balloon.message}
          onChange={(e) => onChange({ ...balloon, message: e.target.value })}
          placeholder="Write a sweet message for this balloon..."
        />
      </div>
    </motion.div>
  );
}

export default function CustomizeForm() {
  const [motherName, setMotherName] = useState('Mummy');
  const [senderName, setSenderName] = useState('Aastha');
  const [heroPhoto, setHeroPhoto] = useState('');
  const [finalMessage, setFinalMessage] = useState('');
  const [balloons, setBalloons] = useState<BalloonData[]>(defaultContent.balloons);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<'form' | 'preview'>('form');
  const heroPhotoRef = useRef<HTMLInputElement>(null);

  const handleHeroPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImage(file, 800, 800, 0.75);
    setHeroPhoto(compressed);
  };

  const addBalloon = () => {
    const colors = BALLOON_COLORS;
    const c = colors[balloons.length % colors.length];
    setBalloons([
      ...balloons,
      { id: generateId(), color: c.value, colorHex: c.hex, image: '', message: '' },
    ]);
  };

  const updateBalloon = (id: string, updated: BalloonData) => {
    setBalloons(balloons.map((b) => (b.id === id ? updated : b)));
  };

  const removeBalloon = (id: string) => {
    setBalloons(balloons.filter((b) => b.id !== id));
  };

  const handleGenerate = () => {
    const content: SiteContent = {
      motherName: motherName || 'Mummy',
      senderName: senderName || 'Me',
      heroPhoto,
      finalMessage: finalMessage || DEFAULT_FINAL_MESSAGE,
      theme: 'blush',
      createdAt: new Date().toISOString(),
      balloons,
    };
    const url = generateShareableUrl(content);
    setGeneratedUrl(url);
    setStep('preview');
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (step === 'preview') {
    return (
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-md w-full space-y-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-6xl mb-4">🌺</div>
            <h2
              className="font-playfair mb-2"
              style={{
                fontSize: '36px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #c96b6b, #d4a853)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Your Surprise Is Ready
            </h2>
            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '17px',
                fontStyle: 'italic',
                color: 'rgba(61,44,44,0.6)',
              }}
            >
              Share this magical link with {motherName}
            </p>
          </motion.div>

          {/* Preview card */}
          <motion.div
            className="card-premium p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl">💌</div>
              <div>
                <p className="font-medium text-sm" style={{ color: '#3d2c2c', fontFamily: 'Poppins, sans-serif' }}>
                  For {motherName}
                </p>
                <p className="text-xs" style={{ color: 'rgba(61,44,44,0.5)', fontFamily: 'Poppins, sans-serif' }}>
                  From {senderName} · {balloons.length} balloon surprises
                </p>
              </div>
            </div>

            {/* URL display */}
            <div
              className="rounded-xl p-3 mb-4 flex items-center gap-2"
              style={{ background: 'rgba(201, 107, 107, 0.06)', border: '1px solid rgba(201,107,107,0.15)' }}
            >
              <span className="text-sm flex-1 break-all font-mono" style={{ color: '#c96b6b', fontSize: '11px' }}>
                {generatedUrl.slice(0, 80)}...
              </span>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <motion.button
                onClick={handleCopy}
                className="btn-premium w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {copied ? '✅ Link Copied!' : '📋 Copy Link'}
              </motion.button>

              <motion.a
                href={getWhatsAppUrl(generatedUrl, motherName)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full text-center font-semibold flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  color: 'white',
                  textDecoration: 'none',
                  display: 'flex',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '15px',
                  boxShadow: '0 4px 20px rgba(37, 211, 102, 0.3)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>💬</span>
                <span>Share on WhatsApp</span>
              </motion.a>

              <motion.a
                href={generatedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full text-center font-semibold flex items-center justify-center gap-2"
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  color: '#c96b6b',
                  textDecoration: 'none',
                  border: '1.5px solid rgba(201,107,107,0.2)',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '15px',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>🌸</span>
                <span>Open Surprise</span>
              </motion.a>
            </div>
          </motion.div>

          <motion.button
            onClick={() => setStep('form')}
            className="w-full text-center text-sm"
            style={{ color: 'rgba(61,44,44,0.4)', fontFamily: 'Poppins, sans-serif' }}
            whileHover={{ color: '#c96b6b' }}
          >
            ← Edit again
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="max-w-lg mx-auto space-y-8">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm mb-4"
            style={{
              background: 'rgba(255,255,255,0.5)',
              border: '1.5px solid rgba(255,255,255,0.7)',
              color: '#c96b6b',
              fontFamily: 'Poppins, sans-serif',
              backdropFilter: 'blur(12px)',
            }}>
            🌺 Mother's Day · May 2026
          </div>
          <h1
            className="font-playfair mb-2"
            style={{
              fontSize: 'clamp(32px, 8vw, 48px)',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #c96b6b, #d4a853)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Surprise Mom
          </h1>
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '17px',
              fontStyle: 'italic',
              color: 'rgba(61,44,44,0.6)',
            }}
          >
            Pop-the-balloon cards · a personal message · made with love
          </p>
        </motion.div>

        {/* Section 1 – About Her */}
        <motion.div
          className="card-premium p-6 space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">👩</span>
            <h3
              className="font-playfair font-semibold"
              style={{ fontSize: '20px', color: '#3d2c2c' }}
            >
              About Her
            </h3>
          </div>

          <InputField
            label="Mother's Name"
            value={motherName}
            onChange={setMotherName}
            placeholder="e.g. Mummy, Mama, Mom..."
          />
          <InputField
            label="Your Name (Sender)"
            value={senderName}
            onChange={setSenderName}
            placeholder="e.g. Aastha"
          />

          {/* Hero photo */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'rgba(61,44,44,0.75)', fontFamily: 'Poppins, sans-serif' }}
            >
              Her Photo (optional)
            </label>
            <input
              ref={heroPhotoRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleHeroPhoto}
            />
            {heroPhoto ? (
              <div className="relative">
                <img
                  src={heroPhoto}
                  alt="Hero"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mx-auto block"
                />
                <button
                  onClick={() => setHeroPhoto('')}
                  className="absolute top-0 right-1/2 translate-x-12 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center text-xs"
                  style={{ color: '#c96b6b' }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => heroPhotoRef.current?.click()}
                className="w-full h-28 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors hover:border-rose-300 hover:bg-rose-50"
                style={{ borderColor: 'rgba(201, 107, 107, 0.25)', background: 'rgba(255,255,255,0.5)' }}
              >
                <span className="text-3xl">📷</span>
                <span className="text-sm" style={{ color: 'rgba(61,44,44,0.5)', fontFamily: 'Poppins, sans-serif' }}>
                  Upload her photo
                </span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Section 2 – Balloon Cards */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 px-2">
            <span className="text-xl">🎈</span>
            <h3
              className="font-playfair font-semibold"
              style={{ fontSize: '20px', color: '#3d2c2c' }}
            >
              Balloon Cards
            </h3>
          </div>

          <AnimatePresence>
            {balloons.map((b, i) => (
              <BalloonCard
                key={b.id}
                balloon={b}
                index={i}
                onChange={(updated) => updateBalloon(b.id, updated)}
                onRemove={() => removeBalloon(b.id)}
              />
            ))}
          </AnimatePresence>

          <motion.button
            onClick={addBalloon}
            className="w-full py-4 rounded-2xl border-2 border-dashed flex items-center justify-center gap-2 text-sm font-medium transition-all hover:bg-rose-50"
            style={{
              borderColor: 'rgba(201, 107, 107, 0.3)',
              color: '#c96b6b',
              fontFamily: 'Poppins, sans-serif',
              background: 'rgba(255,255,255,0.4)',
            }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <span className="text-lg">+</span>
            <span>Add Another Balloon</span>
          </motion.button>
        </motion.div>

        {/* Section 3 – Final Message */}
        <motion.div
          className="card-premium p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">💌</span>
            <h3
              className="font-playfair font-semibold"
              style={{ fontSize: '20px', color: '#3d2c2c' }}
            >
              Final Letter
            </h3>
          </div>
          <textarea
            className="input-premium resize-none"
            rows={8}
            value={finalMessage}
            onChange={(e) => setFinalMessage(e.target.value)}
            placeholder="Leave blank and a beautiful message will be written for you… ✨"
          />
        </motion.div>

        {/* Generate button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            onClick={handleGenerate}
            className="btn-premium w-full text-lg py-5"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🌺 Generate Surprise Link
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
