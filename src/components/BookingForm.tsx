import { FormEvent, useState } from 'react';
import { ArrowUpRight, Check, CalendarDays } from 'lucide-react';

const EVENT_OPTIONS = ['திருமணம் / Wedding', 'பிறந்தநாள் / Birthday', 'பள்ளி விழா / School Function', 'கோயில் விழா / Temple Event', 'வீட்டு விழா / Home Celebration', 'மற்றவை / Other'];

export default function BookingForm() {
  const [opened, setOpened] = useState(false);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const field = (key: string) => String(data.get(key) || '').trim();
    const message = [
      'வணக்கம் Happy Moon Decoration! 🌙',
      'எனது நிகழ்விற்கான அலங்காரம் பற்றி தெரிந்துகொள்ள விரும்புகிறேன்.',
      '',
      `பெயர்: ${field('name')}`,
      `தொலைபேசி: ${field('phone') || 'குறிப்பிடப்படவில்லை'}`,
      `நிகழ்வு: ${field('event')}`,
      `தேதி: ${field('date') || 'இன்னும் முடிவாகவில்லை'}`,
      `இடம்: ${field('venue') || 'இன்னும் முடிவாகவில்லை'}`,
      `விவரங்கள்: ${field('notes') || '—'}`,
    ].join('\n');
    const link = `https://wa.me/94743745875?text=${encodeURIComponent(message)}`;
    const win = window.open(link, '_blank', 'noopener,noreferrer');
    if (!win) window.location.href = link;
    setOpened(true);
  };

  return (
    <div className="booking-panel" id="booking">
      <div className="booking-topline"><span>01 / YOUR EVENT</span><CalendarDays size={19} strokeWidth={1.5} /></div>
      <h3>நமது அடுத்த அழகான<br /><em>நிகழ்வு உங்களுடையது.</em></h3>
      <p className="booking-intro">சில விவரங்களை பகிருங்கள். WhatsApp மூலம் எங்களை நேரடியாக தொடர்புகொள்ளலாம்.</p>
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <label>உங்கள் பெயர் <span>*</span><input name="name" required minLength={2} autoComplete="name" placeholder="பெயரை உள்ளிடுங்கள்" /></label>
          <label>தொலைபேசி எண்<input name="phone" inputMode="tel" autoComplete="tel" placeholder="07X XXX XXXX" /></label>
        </div>
        <label>நிகழ்வு வகை <span>*</span>
          <select name="event" defaultValue="" required>
            <option value="" disabled>நிகழ்வைத் தேர்ந்தெடுக்கவும்</option>
            {EVENT_OPTIONS.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <div className="form-row">
          <label>நிகழ்வு தேதி<input name="date" type="date" min={new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)} /></label>
          <label>நிகழ்வு இடம்<input name="venue" placeholder="இடம் / நகரம்" /></label>
        </div>
        <label>கூடுதல் தகவல்கள்<textarea name="notes" rows={3} placeholder="அலங்கார தீம், நிறங்கள், சிறப்பு கோரிக்கைகள்..." /></label>
        <button className="btn btn-gold submit-btn" type="submit">WhatsApp மூலம் அனுப்புங்கள் <ArrowUpRight size={19} /></button>
        {opened && <p className="form-success" role="status"><Check size={16} /> WhatsApp-ல் செய்தியைத் திறக்க முயன்றோம். அனுப்ப Send அழுத்துங்கள்.</p>}
        <p className="form-note">இந்த form தகவலை website server-ல் சேமிக்காது; WhatsApp-க்கு மட்டும் அனுப்பும்.</p>
      </form>
    </div>
  );
}
