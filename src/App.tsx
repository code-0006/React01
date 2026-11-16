import { useEffect, useState, type CSSProperties, type MouseEvent } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, CalendarCheck2, Cake, Check, ChevronRight,
  Flower2, Gift, GraduationCap, Heart, House, MapPin, Menu, MessageCircle,
  PhoneCall, Sparkles, Star, X, Landmark, Clock3, ChevronLeft
} from 'lucide-react';
import MoonScene from './components/MoonScene';
import SocialLinks from './components/SocialLinks';
import Gallery from './components/Gallery';
import BookingForm from './components/BookingForm';

const WHATSAPP = 'https://wa.me/94743745875';
const MAPS = 'https://maps.google.com/?q=Kaithady+North,+Kaithady,+Sri+Lanka';

const NAV = [
  { href: '#home', label: 'முகப்பு' },
  { href: '#about', label: 'எங்களைப் பற்றி' },
  { href: '#services', label: 'சேவைகள்' },
  { href: '#gallery', label: 'படைப்புகள்' },
  { href: '#contact', label: 'தொடர்பு' },
];

function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 25);
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    const onHash = () => setOpen(false);
    window.addEventListener('keydown', onEscape);
    window.addEventListener('hashchange', onHash);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener('keydown', onEscape);
      window.removeEventListener('hashchange', onHash);
    };
  }, [isOpen]);
  return (
    <header className={`site-header ${scrolled || isOpen ? 'header-scrolled' : ''}`}>
      <div className="nav-container container">
        <a href="#home" className="brand" onClick={() => setOpen(false)} aria-label="Happy Moon Decoration home">
          <img src="/images/logo-mark.webp" alt="Happy Moon Decoration emblem" />
          <span><b>Happy <em>Moon</em></b><small>DECORATION</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">{NAV.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <a className="nav-book" href={WHATSAPP} target="_blank" rel="noopener noreferrer">BOOK YOUR DATE <ArrowUpRight size={17} /></a>
        <button className="menu-toggle" type="button" aria-controls="mobile-primary-menu" aria-expanded={isOpen} aria-label={isOpen ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      </div>
      {isOpen && <nav id="mobile-primary-menu" className="mobile-nav" aria-label="Mobile navigation">
        {NAV.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<ChevronRight size={18} /></a>)}
        <a className="mobile-book" href={WHATSAPP} onClick={() => setOpen(false)} target="_blank" rel="noopener noreferrer">WhatsApp முன்பதிவு <ArrowUpRight size={18} /></a>
      </nav>}
    </header>
  );
}

const PARTICLES = Array.from({ length: 19 }, (_, i) => ({
  left: `${(i * 47 + 11) % 96}%`,
  top: `${(i * 29 + 7) % 92}%`,
  delay: `${(i * 0.73) % 6}s`,
  duration: `${3.6 + (i % 5) * 0.8}s`,
}));
function AnimatedFireflies({ variant = 'hero' }: { variant?: 'hero' | 'contact' }) {
  return <div className={`fireflies fireflies-${variant}`} aria-hidden="true">
    {PARTICLES.map((p, index) => <i key={index} style={{
      left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.duration,
    } as CSSProperties}/>)}
  </div>;
}

function Hero() {
  return (
    <section id="home" className="hero" onPointerMove={(event) => {
      if (event.pointerType === 'touch') return;
      const bounds = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty('--hero-cursor-x', `${event.clientX - bounds.left}px`);
      event.currentTarget.style.setProperty('--hero-cursor-y', `${event.clientY - bounds.top}px`);
    }}>
      <div className="hero-halo hero-halo-one" /><div className="hero-halo hero-halo-two" />
      <div className="hero-noise" /><AnimatedFireflies /><div className="hero-beam hero-beam-1"/><div className="hero-beam hero-beam-2"/><div className="hero-orbit-outline"/><div className="hero-glitter" aria-hidden="true">✦ &nbsp; ✧ &nbsp; ✦</div>
      <div className="container hero-grid">
        <div className="hero-content"><div className="hero-number">EST. IN KAITHADY <span>✧</span> CRAFTED FOR MEMORIES</div>
          <div className="hero-eyebrow"><Star size={14} fill="currentColor" /> JAFFNA'S CREATIVE EVENT STUDIO <span className="eyebrow-dot" /></div>
          <h1>We make<br />moments feel<br /><em>magical<span className="tiny-star">✳</span></em></h1>
          <div className="hero-statement"><span className="hero-statement-line" /><p>உங்கள் ஒவ்வொரு சிறப்பு தருணத்தையும்<br /><strong>அழகான நினைவுகளாக மாற்றுகிறோம்.</strong></p></div>
          <div className="hero-buttons">
            <a className="btn btn-gold" href="#gallery">எங்கள் படைப்புகள் <ArrowUpRight size={19} /></a>
            <a className="btn btn-outline-light" href="#booking">உங்கள் நிகழ்வை திட்டமிட <ArrowRight size={18} /></a>
          </div>
          <div className="hero-footnote"><div className="hero-footline" /><span><Sparkles size={16} /> DECORATE. CELEBRATE. SHINE.</span></div>
        </div>
        <div className="hero-visual"><div className="hero-visual-aura"/><div className="hero-floating-word hero-floating-word-one">MAKE A WISH ✦</div><div className="hero-floating-word hero-floating-word-two">MAGICAL MOMENTS</div>
          <div className="scene-wrap"><MoonScene /></div>
          <div className="hero-stamp"><span>MADE WITH</span><Heart size={21} fill="currentColor" /><span>LOVE & LIGHT</span></div><div className="hero-spark hero-spark-a">✴</div><div className="hero-spark hero-spark-b">✶</div>
          <div className="hero-art-caption"><div className="hero-art-rule" /><span>01 / THE HAPPY MOON WORLD</span></div>
        </div>
      </div>
      <a href="#about" className="hero-scroll" aria-label="Scroll to about"><span>SCROLL TO EXPLORE</span><ArrowDown size={17} /></a>
      <div className="hero-side-text">YOUR CELEBRATION IS OUR CANVAS</div>
    </section>
  );
}

function Ticker() {
  const words = ['திருமண அலங்காரம்', 'பிறந்தநாள் அலங்காரம்', 'மலர் அலங்காரம்', 'கோயில் திருவிழா', 'SPECIAL CELEBRATIONS', 'HAPPY MOON DECORATION'];
  return (
    <div className="ticker" aria-label="Our event decoration services"><div className="ticker-track">
      {[0, 1].map((copy) => <div className="ticker-group" key={copy} aria-hidden={copy === 1}>{words.map((word) => <span key={word}><i>✦</i> {word}</span>)}</div>)}
    </div></div>
  );
}

function About() {
  return (
    <section className="about section-pad" id="about">
      <div className="container about-grid">
        <div className="about-visual reveal">
          <div className="about-picture"><div className="about-glow" aria-hidden="true"/><div className="about-picture-inner"><img src="/images/logo-showcase.webp" alt="Happy Moon Decoration floral lighting and balloon branding design" loading="lazy" /></div></div>
          <div className="about-photo-small"><img src="/images/logo-crescent.webp" alt="Happy Moon Decoration moon and flower design" loading="lazy" /></div>
          <div className="about-seal"><span>CREATING</span><strong>MAGIC</strong><span>SINCE DAY ONE</span></div>
          <div className="about-flower">✳</div><div className="about-orbit orbit-one" aria-hidden="true"/><div className="about-orbit orbit-two" aria-hidden="true"/><div className="about-caption-float">BEAUTY IN EVERY DETAIL <span>✦</span></div>
        </div>
        <div className="about-copy reveal">
          <div className="eyebrow dark"><span className="eyebrow-line" /> WELCOME TO HAPPY MOON</div>
          <h2>Every detail<br /><em>tells a story.</em></h2>
          <h3>சாதாரண தருணங்களை அசாதாரண நினைவுகளாக மாற்றுகிறோம்.</h3>
          <p>கைதடியை மையமாகக் கொண்டு இயங்கும் <strong>Happy Moon Decoration</strong>, உங்கள் திருமணம், பிறந்தநாள், குடும்ப விழா மற்றும் சிறப்பு நிகழ்வுகளுக்கு நேர்த்தியான அலங்காரங்களை உருவாக்குகிறது.</p>
          <p>மலர்கள், பலூன்கள், மின்னொளிகள், திரை அலங்காரங்கள் மற்றும் உங்களுக்குப் பிடித்த வண்ணத் தீம்கள் — ஒவ்வொரு நிகழ்வுக்கும் தனித்துவமான அழகை அளிக்கிறோம்.</p>
          <div className="about-features"><span><Check size={16} /> தனிப்பயன் அலங்காரம்</span><span><Check size={16} /> சிறப்பு தீம் வடிவமைப்பு</span><span><Check size={16} /> அன்பான, நேர்த்தியான சேவை</span></div>
          <a href="#services" className="text-link">எங்கள் சேவைகளை அறியுங்கள் <ArrowUpRight size={19} /></a>
        </div>
      </div>
    </section>
  );
}


function MagicMoment() {
  return <section className="magic-moment" aria-label="Our celebration promise">
    <div className="magic-moment-glow" aria-hidden="true"/>
    <div className="container magic-moment-grid">
      <div className="magic-moment-art reveal">
        <div className="magic-moment-frame"><img src="/images/logo-crescent.webp" loading="lazy" alt="Happy Moon Decoration moon and floral artwork"/></div>
        <div className="magic-moment-orbit magic-orbit-one" aria-hidden="true"/>
        <div className="magic-moment-orbit magic-orbit-two" aria-hidden="true"/>
        <span className="magic-moment-spark sparkle-a" aria-hidden="true">✦</span>
        <span className="magic-moment-spark sparkle-b" aria-hidden="true">✧</span>
      </div>
      <div className="magic-moment-copy reveal">
        <div className="eyebrow"><span className="eyebrow-line"/> MAGIC IS IN THE DETAILS</div>
        <span className="magic-moment-index">✧ HAPPY MOON SIGNATURE ✧</span>
        <h2>A little sparkle.<br/><em>A lifetime of memories.</em></h2>
        <p>ஒவ்வொரு அழகான அலங்காரத்திலும் அன்பும், ஒளியும், தனித்துவமும் இணைகின்றன.</p>
        <a className="magic-moment-link" href="#gallery">DISCOVER OUR CREATIONS <ArrowUpRight size={19}/></a>
      </div>
    </div>
  </section>;
}

const SIGNATURES = [
  { src: '/images/logo-crescent.webp', id: '01', title: 'The Moonlight Story', tag: 'MOON • FLOWERS • MAGIC' },
  { src: '/images/logo-showcase.webp', id: '02', title: 'Golden Hour Dreams', tag: 'LIGHTS • BALLOONS • LUXURY' },
  { src: '/images/logo-mark.webp', id: '03', title: 'Timeless Signature', tag: 'HAPPY MOON • GOLD • ELEGANCE' },
];
function SignatureShowcase() {
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setSelected((x) => (x + 1) % SIGNATURES.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused]);
  return <section className="signature-section" aria-label="Signature decoration concepts">
    <div className="container signature-header reveal"><div><div className="eyebrow dark"><span className="eyebrow-line"/> SIGNATURE CREATIONS</div><h2>The art of <em>celebration.</em></h2></div><p>எங்கள் பிராண்டின் மூன்று தனித்துவமான வடிவமைப்புகள்.</p></div>
    <div className="signature-deck" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {SIGNATURES.map((item, i) => {
        const offset = ((i - selected + SIGNATURES.length) % SIGNATURES.length);
        const side = offset === 0 ? 'center' : offset === 1 ? 'right' : 'left';
        return <button key={item.id} type="button" onClick={() => { setSelected(i); setPaused(true); }} className={`signature-slide signature-${side}`} aria-label={`Show ${item.title}`} aria-current={i === selected ? 'true' : undefined}>
          <img src={item.src} alt={item.title} loading="lazy"/><span className="signature-slide-glass"/>
          <span className="signature-slide-label"><small>{item.tag}</small><b>{item.title}</b></span><span className="signature-slide-num">{item.id} / 03</span>
        </button>;
      })}
    </div>
    <div className="signature-controls"><button type="button" aria-label="Previous signature" onClick={() => {setSelected((x)=>(x+SIGNATURES.length-1)%SIGNATURES.length); setPaused(true);}}><ChevronLeft size={22}/></button><span>0{selected+1} <i/> 0{SIGNATURES.length}</span><button type="button" aria-label="Next signature" onClick={() => {setSelected((x)=>(x+1)%SIGNATURES.length);setPaused(true);}}><ChevronRight size={22}/></button></div>
  </section>;
}

function SparkleDivider() {
  const phrases = ['HAPPY MOON DECORATION', 'MAKE EVERY MOMENT MAGICAL', 'அலங்கரி • கொண்டாடு • பிரகாசி', 'DECORATE • CELEBRATE • SHINE'];
  return <div className="sparkle-divider" aria-label="Happy Moon Decoration"><div className="sparkle-divider-track">{[0,1].map((k) => <div className="sparkle-divider-group" key={k} aria-hidden={k === 1}>{phrases.map((p) => <span key={p}><span>✳</span> {p}</span>)}</div>)}</div></div>;
}

const services = [
  { num: '01', icon: Heart, title: 'திருமண அலங்காரம்', en: 'WEDDING DECOR', desc: 'திருமண மேடை, மலர் மாலைகள், வரவேற்பு நுழைவாயில், ஒளி மற்றும் திரை அலங்காரம்.', color: 'rose' },
  { num: '02', icon: Cake, title: 'பிறந்தநாள் விழா', en: 'BIRTHDAY MAGIC', desc: 'பலூன் ஆர்ச், கேக் மேசை, தீம் பின்னணி, புகைப்படம் எடுக்கும் அழகான இடம்.', color: 'amber' },
  { num: '03', icon: GraduationCap, title: 'பள்ளி விழாக்கள்', en: 'SCHOOL FUNCTIONS', desc: 'பரிசளிப்பு விழா, ஆண்டு விழா, மேடை மற்றும் சிறப்பு வரவேற்பு அலங்காரம்.', color: 'violet' },
  { num: '04', icon: Landmark, title: 'கோயில் விழாக்கள்', en: 'TEMPLE CELEBRATIONS', desc: 'பாரம்பரிய மலர் அலங்காரம், தோரணங்கள், திருவிழா ஒளி வடிவமைப்பு.', color: 'olive' },
  { num: '05', icon: House, title: 'வீட்டு நிகழ்வுகள்', en: 'INTIMATE MOMENTS', desc: 'வளைகாப்பு, நிச்சயதார்த்தம், குடும்ப விழா மற்றும் வீட்டுக் கொண்டாட்டங்கள்.', color: 'peach' },
  { num: '06', icon: Gift, title: 'தனிப்பயன் தீம்கள்', en: 'BESPOKE CONCEPTS', desc: 'நிறங்கள், மலர்கள், பலூன்கள் மற்றும் ஒளிகளை இணைக்கும் உங்கள் கனவு தீம்.', color: 'gold' }
];

function Services() {
  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = event.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (event.clientX - r.left) / r.width - 0.5;
    const y = (event.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(920px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-7px)`;
  };
  const reset = (event: MouseEvent<HTMLElement>) => { event.currentTarget.style.transform = ''; };
  return (
    <section className="services section-pad" id="services">
      <div className="services-glow" />
      <div className="container">
        <div className="section-heading service-header reveal"><div><div className="eyebrow"><span className="eyebrow-line" /> WHAT WE CREATE</div><h2>Made for your<br /><em>most beautiful days.</em></h2></div><p>உங்கள் கொண்டாட்டம் எதுவாக இருந்தாலும், அதற்கேற்ற அழகான அலங்காரம் எங்களிடம்.</p></div>
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return <article key={service.num} className={`service-card color-${service.color} reveal`} style={{'--reveal-delay': `${index * 85}ms`} as CSSProperties} onMouseMove={onMouseMove} onMouseLeave={reset}>
              <div className="service-top"><span>{service.num} / 06</span><ArrowUpRight size={20} /></div>
              <div className="service-icon"><div className="service-icon-halo" aria-hidden="true"/><Icon size={36} strokeWidth={1.25} /><span className="service-icon-spark" aria-hidden="true">✦</span></div>
              <div className="service-bottom"><span className="service-en">{service.en}</span><h3>{service.title}</h3><p>{service.desc}</p><a href={`${WHATSAPP}?text=${encodeURIComponent(`வணக்கம்! ${service.title} பற்றி விபரம் வேண்டும்.`)}`} target="_blank" rel="noopener noreferrer" aria-label={`${service.title} பற்றி WhatsApp செய்ய`}>விவரம் கேட்க <ArrowRight size={16} /></a></div>
            </article>;
          })}
        </div>
        <p className="services-after"><Star size={15} fill="currentColor" /> YOUR DREAM. OUR DETAIL. A BEAUTIFUL MEMORY. <Star size={15} fill="currentColor" /></p>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="process section-pad">
      <div className="container process-grid">
        <div className="process-title reveal"><div className="eyebrow dark"><span className="eyebrow-line" /> THE HAPPY MOON EXPERIENCE</div><h2>Dream it.<br /><em>We decorate it.</em></h2><p>உங்கள் நிகழ்வைத் திட்டமிடுவது மிகவும் எளிது. மூன்று படிகளில் அழகான கொண்டாட்டம்.</p><a className="btn btn-ink" href="#booking">இப்போதே தொடங்குங்கள் <ArrowUpRight size={18} /></a></div>
        <div className="process-list reveal">
          <div><span>01</span><div><h3>உங்கள் கனவைச் சொல்லுங்கள்</h3><p>நிகழ்வு, தேதி, இடம் மற்றும் நீங்கள் விரும்பும் தீம் பற்றி பகிருங்கள்.</p></div><MessageCircle size={25} /></div>
          <div><span>02</span><div><h3>அழகாக திட்டமிடுவோம்</h3><p>நிகழ்வுக்கு ஏற்ற வண்ணங்கள், பொருட்கள், அலங்கார அமைப்பைத் தேர்ந்தெடுப்போம்.</p></div><Flower2 size={25} /></div>
          <div><span>03</span><div><h3>மகிழ்ச்சியாக கொண்டாடுங்கள்</h3><p>அந்த சிறப்பு நாளை அழகாக மாற்றும் அலங்காரத்தை நாங்கள் உருவாக்குகிறோம்.</p></div><CalendarCheck2 size={25} /></div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact section-pad" id="contact">
      <AnimatedFireflies variant="contact" />
      <div className="container contact-grid">
        <div className="contact-copy reveal">
          <div className="eyebrow"><span className="eyebrow-line" /> LET'S MAKE IT MEMORABLE</div>
          <h2>Your day.<br /><em>Our magic.</em></h2>
          <p className="contact-ta">உங்கள் அடுத்த கொண்டாட்டத்தை இன்னும் அழகாக மாற்றலாமா? இன்றே எங்களுடன் தொடர்புகொள்ளுங்கள்.</p>
          <div className="contact-details">
            <div className="contact-info-row"><span className="detail-icon phone-icon"><PhoneCall size={23} fill="currentColor" /></span>
              <div><strong>தொலைபேசி</strong><p><a href="tel:+94743745875">0743745875</a> <span className="contact-separator">/</span> <a href="tel:+94741340367">0741340367</a></p></div>
            </div>
            <div className="contact-info-row"><span className="detail-icon whatsapp-icon"><MessageCircle size={23} /></span>
              <div><strong>WhatsApp</strong><p><a href="https://wa.me/94743745875" target="_blank" rel="noopener noreferrer">0743745875</a> <span className="contact-separator">/</span> <a href="https://wa.me/94741340367" target="_blank" rel="noopener noreferrer">0741340367</a></p></div>
            </div>
            <div className="contact-info-row"><span className="detail-icon location-icon"><MapPin size={24} fill="currentColor" /></span>
              <div><strong>இடம்</strong><p><a href={MAPS} target="_blank" rel="noopener noreferrer">கைதடி வடக்கு, கைதடி</a></p></div>
            </div>
            <div className="contact-info-row"><span className="detail-icon hours-icon"><Clock3 size={23} /></span>
              <div><strong>நேரம்</strong><p>காலை 8 மணி — இரவு 9 மணி (அனைத்து நாட்களும்)</p></div>
            </div>
          </div>
          <SocialLinks />
          <div className="contact-star" aria-hidden="true">✳</div>
        </div>
        <div className="reveal"><BookingForm /></div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main"><div className="footer-brand"><img src="/images/logo-mark.webp" alt="Happy Moon Decoration" /><div><strong>Happy <em>Moon</em></strong><small>DECORATION</small></div></div><p>Turning moments into beautiful memories.<br />அலங்கரி. கொண்டாடு. பிரகாசி.</p><a href="#home" className="back-to-top">BACK TO TOP <ArrowUpRight size={18} /></a></div>
      <div className="container footer-bottom"><small>© {new Date().getFullYear()} Happy Moon Decoration. All rights reserved.</small><span>MADE WITH <Heart size={13} fill="currentColor" /> IN KAITHADY, JAFFNA</span></div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        document.documentElement.style.setProperty('--page-progress', `${max ? Math.min(100, Math.max(0, window.scrollY/max*100)) : 0}%`);
        raf = 0;
      });
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
    const items = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((el) => el.classList.add('visible'));
      return () => { window.removeEventListener('scroll', onScroll); window.cancelAnimationFrame(raf); };
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); } });
    }, { threshold: 0.06, rootMargin: '0px 0px 35px 0px' });
    items.forEach((el) => obs.observe(el));
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll); window.cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <Navbar />
      <div className="scroll-progress" aria-hidden="true"/><main><Hero /><Ticker /><About /><MagicMoment /><Services /><SparkleDivider /><SignatureShowcase /><Gallery /><Process /><Contact /></main>
      <Footer />
      <a className="floating-whatsapp" href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={26} /><span>CHAT WITH US</span></a>
      <div className="mobile-quickbar" aria-label="Quick contact actions">
        <a href="tel:+94743745875"><PhoneCall size={18} /> அழைக்கவும்</a>
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} /> WhatsApp முன்பதிவு</a>
      </div>
    </>
  );
}
