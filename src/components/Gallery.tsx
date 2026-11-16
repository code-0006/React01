import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Image as ImageIcon, Play, X } from 'lucide-react';
import { galleryItems, type GalleryItem, type GalleryType } from '../data/gallery';

type Filter = 'all' | GalleryType;
const labels: Record<Filter, string> = { all: 'அனைத்தும்', image: 'படங்கள்', video: 'வீடியோக்கள்' };

function GalleryThumb({ item }: { item: GalleryItem }) {
  const [failed, setFailed] = useState(false);
  const thumb = item.type === 'video' || failed ? '/images/logo-showcase.webp' : item.src;
  return (
    <>
      <img
        src={thumb}
        loading="lazy"
        alt={item.title}
        onError={() => setFailed(true)}
      />
      <span className="gallery-card-shade" />
      <span className="gallery-item-type">{item.type === 'video' ? <><Play size={13} fill="currentColor" /> VIDEO</> : <><ImageIcon size={14} /> PHOTO</>}</span>
      <span className="gallery-item-caption"><span>{item.featured ? 'SIGNATURE DESIGN' : 'HAPPY MOON MOMENTS'}</span><ArrowUpRight size={21} /></span>
    </>
  );
}

function GalleryVideo({ item }: { item: GalleryItem }) {
  const [failed, setFailed] = useState(false);
  if (failed) return (
    <div className="gallery-video-unavailable" role="status">
      <img src="/images/logo-showcase.webp" alt="Happy Moon Decoration" />
      <p>இந்த வீடியோ தற்போது காண்பிக்க முடியவில்லை. விரைவில் புதிய வீடியோக்கள் சேர்க்கப்படும்.</p>
    </div>
  );
  return <video src={item.src} key={item.id} controls autoPlay playsInline preload="metadata"
    poster="/images/logo-showcase.webp" onError={() => setFailed(true)}>
    உங்கள் browser இந்த video-ஐ play செய்ய முடியவில்லை.
  </video>;
}

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>('all');
  const [count, setCount] = useState(9);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const startX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const filtered = useMemo(() => galleryItems.filter((item) => filter === 'all' || item.type === filter), [filter]);
  const active = activeIndex === null ? null : filtered[activeIndex];

  const changeFilter = (next: Filter) => { setFilter(next); setCount(9); setActiveIndex(null); };
  const next = () => setActiveIndex((prev) => prev === null ? null : (prev + 1) % filtered.length);
  const previous = () => setActiveIndex((prev) => prev === null ? null : (prev - 1 + filtered.length) % filtered.length);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') previous();
    };
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = originalOverflow; };
  }, [activeIndex, filtered.length]);

  return (
    <section className="gallery-section section-pad" id="gallery">
      <div className="container">
        <div className="section-heading gallery-heading reveal">
          <div><div className="eyebrow dark"><span className="eyebrow-line" /> A GALLERY OF MOMENTS</div><h2>நினைவாகும் <em>அழகிய தருணங்கள்.</em></h2></div>
          <p>ஒவ்வொரு அலங்காரத்திற்கும் தனித்துவம். ஒவ்வொரு கொண்டாட்டத்திற்கும் ஒரு அழகான கதை.</p>
        </div>
        <div className="gallery-tabs" role="group" aria-label="Gallery filter">
          {(['all', 'image', 'video'] as Filter[]).map((name) => (
            <button type="button" key={name} className={filter === name ? 'gallery-tab selected' : 'gallery-tab'} onClick={() => changeFilter(name)} aria-pressed={filter === name}>{labels[name]}<span>{name === 'all' ? galleryItems.length : galleryItems.filter((i) => i.type === name).length}</span></button>
          ))}
        </div>
        <div className="gallery-grid">
          {filtered.slice(0, count).map((item, index) => (
            <button key={item.id} type="button" onClick={() => setActiveIndex(index)} className={`gallery-card gallery-card-${index % 9}`} aria-label={`${item.title} பெரிதாக பார்க்க`}><GalleryThumb item={item} /></button>
          ))}
        </div>
        <div className="gallery-actions">
          {count < filtered.length ? <button className="btn btn-ink" onClick={() => setCount((old) => old + 9)} type="button">மேலும் படைப்புகள் <ArrowRight size={18} /></button> : <a className="text-link dark" href="https://wa.me/94743745875" target="_blank" rel="noopener noreferrer">மேலும் தகவலுக்கு WhatsApp <ArrowUpRight size={18} /></a>}
        </div>
      </div>
      {active && (
        <div role="dialog" aria-modal="true" aria-label="Gallery preview" className="gallery-modal"
          onClick={() => setActiveIndex(null)}
          onTouchStart={(event) => { startX.current = event.touches[0]?.clientX ?? null; }}
          onTouchEnd={(event) => {
            if (startX.current === null) return;
            const distance = (event.changedTouches[0]?.clientX ?? startX.current) - startX.current;
            startX.current = null;
            if (Math.abs(distance) > 55) distance < 0 ? next() : previous();
          }}>
          <div className="modal-header"><span>HAPPY MOON / {String((activeIndex ?? 0) + 1).padStart(2, '0')}</span><button ref={closeRef} type="button" className="modal-close" onClick={() => setActiveIndex(null)} aria-label="Close gallery"><X size={25} /></button></div>
          <button type="button" className="modal-nav modal-prev" onClick={(e) => { e.stopPropagation(); previous(); }} aria-label="Previous"><ArrowLeft size={23} /></button>
          <div className="modal-media" onClick={(e) => e.stopPropagation()}>
            {active.type === 'image' ? <img key={active.id} src={active.src} alt={active.title} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/logo-showcase.webp'; }} /> : <GalleryVideo key={active.id} item={active} />}
          </div>
          <button type="button" className="modal-nav modal-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next"><ArrowRight size={23} /></button>
          <div className="modal-footer">{active.title}<span className="desktop-hint">ESC TO CLOSE</span><span className="touch-hint">← SWIPE →</span></div>
        </div>
      )}
    </section>
  );
}
