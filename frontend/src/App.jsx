import React, { useState } from 'react';
import axios from 'axios';
import { Copy, Sparkles, Send, Check, Hash, Smile, Instagram, Music, Linkedin, Twitter, Youtube } from 'lucide-react';
import Pricing from './Pricing';
import './App.css';

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: <Instagram size={18} /> },
  { id: 'tiktok', name: 'TikTok', icon: <Music size={18} /> },
  { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin size={18} /> },
  { id: 'twitter', name: 'Twitter/X', icon: <Twitter size={18} /> },
  { id: 'youtube', name: 'YouTube', icon: <Youtube size={18} /> },
];

const tones = [
  { id: 'professional', name: 'Professional' },
  { id: 'casual', name: 'Casual' },
  { id: 'funny', name: 'Funny' },
  { id: 'inspirational', name: 'Inspirational' },
  { id: 'witty', name: 'Witty' },
];

function App() {
  const [view, setView] = useState('generator'); // 'generator' or 'pricing'
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [tone, setTone] = useState('professional');
  const [includeEmoji, setIncludeEmoji] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!content) return;
    setLoading(true);
    try {
      const response = await axios.post('/api/generate', {
        content,
        platform,
        tone,
        include_emoji: includeEmoji,
        include_hashtags: includeHashtags,
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error generating caption:', error);
      alert('Failed to generate caption. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `${result.caption} ${result.emojis || ''}\n\n${result.hashtags ? result.hashtags.join(' ') : ''}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container">
      <header>
        <div className="logo">
          <Sparkles className="logo-icon" />
          <h1>CaptionCraft AI</h1>
        </div>
        <p>Elevate your social media game with AI-powered captions.</p>
      </header>

      <nav>
        <button 
          className={`nav-link ${view === 'generator' ? 'active' : ''}`}
          onClick={() => setView('generator')}
        >
          Generator
        </button>
        <button 
          className={`nav-link ${view === 'pricing' ? 'active' : ''}`}
          onClick={() => setView('pricing')}
        >
          Pricing
        </button>
      </nav>

      <main>
        {view === 'generator' ? (
          <>
            <section className="generator-card">
              <div className="form-group">
                <label>What's your post about?</label>
                <textarea
                  placeholder="e.g., A beautiful sunset at the beach during my summer vacation..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="options-grid">
                <div className="form-group">
                  <label>Platform</label>
                  <div className="platform-selector">
                    {platforms.map((p) => (
                      <button
                        key={p.id}
                        className={`platform-btn ${platform === p.id ? 'active' : ''}`}
                        onClick={() => setPlatform(p.id)}
                        title={p.name}
                      >
                        {p.icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Tone</label>
                  <select value={tone} onChange={(e) => setTone(e.target.value)}>
                    {tones.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="toggle-group">
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={includeEmoji}
                    onChange={(e) => setIncludeEmoji(e.target.checked)}
                  />
                  <Smile size={18} />
                  <span>Emojis</span>
                </label>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={includeHashtags}
                    onChange={(e) => setIncludeHashtags(e.target.checked)}
                  />
                  <Hash size={18} />
                  <span>Hashtags</span>
                </label>
              </div>

              <button
                className="generate-btn"
                onClick={handleGenerate}
                disabled={loading || !content}
              >
                {loading ? 'Generating...' : (
                  <>
                    <Send size={18} />
                    Generate Caption
                  </>
                )}
              </button>
            </section>

            {result && (
              <section className="result-card">
                <div className="result-header">
                  <h3>Generated Caption</h3>
                  <button className="copy-btn" onClick={copyToClipboard}>
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="result-content">
                  <p className="caption-text">
                    {result.caption}
                    {result.emojis && <span className="result-emojis"> {result.emojis}</span>}
                  </p>
                  {result.hashtags && result.hashtags.length > 0 && (
                    <p className="hashtags">{result.hashtags.join(' ')}</p>
                  )}
                </div>
              </section>
            )}
          </>
        ) : (
          <Pricing />
        )}
      </main>

      <footer>
        <p>&copy; 2025 CaptionCraft AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
/home/engine/.bashrc: line 1: syntax error near unexpected token `('
/home/engine/.bashrc: line 1: `. /etc/profile.d/workload-containment.shn# ~/.bashrc: executed by bash(1) for non-login shells.'
/home/engine/.bashrc: line 1: syntax error near unexpected token `('
/home/engine/.bashrc: line 1: `. /etc/profile.d/workload-containment.shn# ~/.bashrc: executed by bash(1) for non-login shells.'
/home/engine/.bashrc: line 1: syntax error near unexpected token `('
/home/engine/.bashrc: line 1: `. /etc/profile.d/workload-containment.shn# ~/.bashrc: executed by bash(1) for non-login shells.'
/home/engine/.bashrc: line 1: syntax error near unexpected token `('
/home/engine/.bashrc: line 1: `. /etc/profile.d/workload-containment.shn# ~/.bashrc: executed by bash(1) for non-login shells.'
/home/engine/.bashrc: line 1: syntax error near unexpected token `('
/home/engine/.bashrc: line 1: `. /etc/profile.d/workload-containment.shn# ~/.bashrc: executed by bash(1) for non-login shells.'
/home/engine/.bashrc: line 1: syntax error near unexpected token `('
/home/engine/.bashrc: line 1: `. /etc/profile.d/workload-containment.shn# ~/.bashrc: executed by bash(1) for non-login shells.'
