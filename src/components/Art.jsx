const PHONE = '<rect x="38" y="14" width="44" height="92" rx="9"/><path d="M52 23h16"/><circle cx="60" cy="94" r="3" class="ac"/>';
const SHAPES = {
  phone: PHONE,
  laptop: '<rect x="24" y="34" width="72" height="46" rx="5"/><path d="M14 92h92l-6-12H20z"/><path d="M52 86h16" class="ac"/>',
  watch: '<path d="M46 20h28l3 16H43zM43 84h34l-3 16H46z"/><rect x="38" y="36" width="44" height="48" rx="12"/><path d="M60 50v11l8 5" class="ac"/>',
  audio: '<path d="M26 70V60a34 34 0 0 1 68 0v10"/><rect x="20" y="66" width="16" height="28" rx="7"/><rect x="84" y="66" width="16" height="28" rx="7"/><path d="M28 74v12M92 74v12" class="ac"/>',
  camera: '<rect x="18" y="38" width="84" height="54" rx="9"/><path d="M44 38l6-10h20l6 10"/><circle cx="60" cy="65" r="17"/><circle cx="60" cy="65" r="6" class="ac"/>',
  speaker: '<rect x="38" y="16" width="44" height="88" rx="14"/><circle cx="60" cy="42" r="8"/><circle cx="60" cy="78" r="12"/><circle cx="60" cy="78" r="4" class="ac"/>',
  keyboard: '<rect x="12" y="38" width="96" height="46" rx="7"/><path d="M24 52h6M38 52h6M52 52h6M66 52h6M80 52h6M94 52h2"/><path d="M30 68h60" class="ac"/>',
  power: '<rect x="34" y="22" width="52" height="82" rx="10"/><path d="M52 14h16"/><path d="M60 44l-8 16h16l-8 16" class="ac"/>',
  tablet: '<rect x="26" y="16" width="68" height="88" rx="9"/><path d="M52 94h16" class="ac"/>',
};

const ICONS = {
  truck: '<path d="M2 6h11v10H2zM13 10h5l3 3v3h-8"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5L16 9.5"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  phone: '<path d="M6 3h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 12l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z"/>',
  pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  cart: '<path d="M3 4h3l2.5 11h9L20 7H7"/><circle cx="10" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
  moon: '<path d="M20 14A8 8 0 1 1 10 4a6.5 6.5 0 0 0 10 10z"/>',
};

export function Art({ name, size = 96 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: SHAPES[name] || PHONE }} />
  );
}

export function Icon({ name, size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICONS[name] }} />
  );
}
