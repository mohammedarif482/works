import mocImg from './assets/stickers/moc.jpg'
import vinesImg from './assets/stickers/vines.jpg'
import giftdImg from './assets/stickers/giftd.jpg'
import adowlzLogo from './assets/stickers/adowlz.svg'
import ometricsLogo from './assets/stickers/0metrics.svg'

// All site content lives here so components stay presentational.

export const copy = {
  builder: {
    cap: 'Products and platforms built, from idea to launch',
    lede: 'Founder-built products and client platforms. Most run on Flutter, Node and Supabase, with an analytics layer from day one.',
  },
  pm: {
    cap: 'Products taken from problem to launch, with the metrics to show for it',
    lede: 'Each one started with a user problem and a metric. I wrote the spec, designed the flow, shipped it and measured onboarding, share rate and engagement.',
  },
}

export const studios = [
  { n: 'Made of Curiosity', s: 'Product studio · Founder' },
  { n: 'Adowlz', s: 'Creative & digital agency · Tech Lead' },
  { n: 'Bookwie', s: 'Salon booking · Founder' },
]

export const navLinks = [
  { id: 'top', label: 'Dashboard' },
  { id: 'work', label: 'Products' },
  { id: 'journey', label: 'Journey' },
  { id: 'journal', label: 'Journal', href: '#/journal' },
  { id: 'experiments', label: 'Experiments', href: '#/experiments' },
]

export const footprint = [
  { v: 3, label: 'Cities: Dubai, Bangalore, Cochin' },
  { v: 2, label: 'Countries: UAE & India' },
  { v: 2, label: 'Studios: Adowlz & MOC' },
]

export const tasks = [
  {
    name: 'Bookwie',
    icon: 'board',
    badges: [{ t: 'Live', c: 'b-go' }],
    stamp: { t: 'Shipped', s: 'with real users' },
    fields: [
      ['What', 'Salon booking platform'],
      ['Company', 'Bookwie Connects Pvt Ltd'],
      ['Focus', 'Onboarding & retention'],
    ],
    foot: { note: 'Hooked loop applied', cta: 'See case', style: 'soft' },
  },
  {
    name: '0metrics',
    icon: 'bars',
    hero: true,
    badges: [{ t: 'Newest', c: 'b-hot' }, { t: 'Product', c: 'b-sun' }],
    fields: [
      ['Topic', 'Goals & OKRs'],
      ['What it does', 'Tracks business numbers and fires alerts when they drift'],
      ['Status', 'Built'],
    ],
    // hand: the foot note is a handwritten sticky note instead of plain text
    foot: { note: 'Data-first, like every MOC product', hand: true, cta: 'Ask me about it', style: 'ink' },
  },
  {
    name: 'Visualize',
    icon: 'pulse',
    badges: [{ t: 'SaaS', c: 'b-go' }],
    fields: [
      ['What', 'B2B KPI analytics'],
      ['Work', 'Build, hardening, UX'],
      ['Tested', 'Share rate, engagement'],
    ],
    // a Figma-style selection box around one field
    select: { field: 'Tested', label: 'measured, not guessed' },
  },
]

// Hero stickers: asides in Arif's own voice.
export const stickers = { avatar: 'has taste™', avatarHref: '#/journal/has-taste', wa: 'hit me up', bag: ['Fragile', 'experiments inside'], bagHref: '#/experiments' }

export const asks = [
  { href: '#work', text: 'Show me the products you have shipped end to end' },
  { href: '#journey', text: 'How did a tinkerer end up building data products?' },
  { href: '#contact', text: 'Hire Arif as a Growth or 0→1 Product Manager' },
]

export const workTabs = [
  { id: 'fullstack', label: 'Fullstack' },
  { id: 'ecomm', label: 'Ecomm' },
  { id: 'sites', label: 'Business Websites' },
]

export const projects = [
  { name: 'Bookwie', cat: 'fullstack', glyph: 'Bw', bg: 'var(--sun)', fg: 'var(--sun-ink)', tag: 'Live', tagClass: 'b-go', wide: true,
    desc: 'Salon booking platform. I designed it in Figma end to end and used the Hooked model to shape onboarding and repeat bookings.',
    meta: ['Flutter', 'Supabase', 'Figma'] },
  { name: '0metrics', cat: 'fullstack', glyph: '0m', bg: '#ffd6c9', fg: '#3a160c', tag: 'New', tagClass: 'b-hot',
    desc: 'Tracks business numbers against goals and OKRs, then raises alerts.',
    meta: ['Next.js', 'Alerts'] },
  { name: 'Visualize', cat: 'fullstack', glyph: 'Vz', bg: '#c9e7ff', fg: '#0b2a44', tag: 'SaaS',
    desc: 'B2B KPI and analytics platform. Owned build, hardening and UX.',
    meta: ['Node.js', 'AWS'] },
  { name: 'Pitstop', cat: 'fullstack', glyph: 'Ps', bg: '#d9f2c4', fg: '#18320b', tag: 'GTM',
    desc: 'WhatsApp-native platform for used car dealers.',
    meta: ['Meta APIs', 'Cloudflare'] },
  { name: 'LevelUp', cat: 'fullstack', glyph: 'Lu', bg: 'var(--pill)', fg: 'var(--pill-ink)', tag: 'Client rebuild', wide: true,
    desc: 'Rebuilding a Flutter and Firebase social activities app around sports and player levels, for Android and iOS.',
    meta: ['Flutter', 'Firebase', 'iOS + Android'] },
  { name: 'giftd', cat: 'ecomm', glyph: 'gd', bg: '#ffe9b8', fg: '#3a2a05', tag: 'First venture', wide: true,
    desc: 'D2C marketplace for creativepreneurs. Where it started.',
    meta: ['Marketplace'] },
  { name: 'FitBridge', cat: 'fullstack', glyph: 'Fb', bg: '#c7f0e6', fg: '#0b3329', tag: 'B2B',
    desc: 'White-label platform for gyms, with its own pitch and GTM.',
    meta: ['White-label'] },
]

export const journey = [
  { n: 'Stage 1 · Make', title: 'Sketches, poems, crafts',
    body: 'I grew up making things by hand. That taught me taste, and patience with a blank page.',
    sticker: { kind: 'brush', t: 'no ⌘Z on paper' },
    art: 'linear-gradient(120deg,#ffd6c9,var(--sun),#c9e7ff)' },
  { n: 'Stage 2 · Code', title: 'Into tech',
    body: 'Flutter, Node.js, Next.js, Supabase, Firebase, AWS. I learned to ship the thing I drew.',
    sticker: { kind: 'code', t: '{ ship: true }' },
    art: 'repeating-linear-gradient(90deg,var(--line) 0 2px,transparent 2px 14px),var(--card-soft)' },
  { n: 'Stage 3 · Build', title: 'Studios & ventures',
    body: 'Co-founded Adowlz, then started MOC to house products like Bookwie and 0metrics, each layered around data.',
    art: 'radial-gradient(circle at 20% 60%,var(--go) 0 14px,transparent 15px),radial-gradient(circle at 50% 40%,var(--sun) 0 20px,transparent 21px),radial-gradient(circle at 80% 55%,var(--hot) 0 12px,transparent 13px),var(--card-soft)' },
  { n: 'Stage 4 · Grow', title: 'Product, on purpose',
    body: "Now moving into Growth and 0→1 PM roles, bringing a builder's instincts and a habit of testing them against numbers.",
    art: 'linear-gradient(180deg,transparent 40%,var(--go) 40% 44%,transparent 44%),linear-gradient(20deg,transparent 48%,var(--ink) 48% 51%,transparent 51%),var(--card-soft)' },
]

// What people say. Use real quotes only, with the person's OK.
// draft: true shows a review on the dev server only; it never ships in `npm run build`.
// If no reviews are published, the section is hidden on the live site.
export const reviews = [
  { quote: 'Responsive, quick to align and even quicker to deliver. Great understanding from the get-go of the necessary requirements, and goes out of the way to provide the right support.',
    name: 'Abhimit Suman', profile: 'https://www.linkedin.com/in/abhimit-suman/',
    role: 'Founder, SignalMint', url: 'https://www.signalmint.in/' },
  { draft: true, quote: 'Placeholder. A second quote, ideally about how you work: speed, ownership, product sense.',
    name: 'Reviewer name', role: 'CEO, Company' },
  { draft: true, quote: 'Placeholder. A third quote, ideally one with a number in it.',
    name: 'Reviewer name', role: 'Product Lead, Company' },
].filter((r) => import.meta.env.DEV || !r.draft)

export const stack = ['Flutter', 'Node.js', 'Next.js', 'Supabase', 'Firebase', 'AWS', 'Meta APIs', 'Cloudflare', 'LLMs', 'Figma', 'Mixpanel', 'SQL']

export const facts = [
  ['Based in', 'Kerala, India'],
  ['Works across', 'UAE & India'],
  ['Open to', 'Bangalore, Mumbai, Chennai, Kerala, remote'],
  ['Role', 'Growth / 0→1 PM'],
  ['LinkedIn', 'in/mohammedarif02'],
]

// The contact facts print as a receipt.
export const receipt = { shop: 'arif.builds', order: 'Order #0001', total: ['Total', 'Taste + data = a story that hooks'], thanks: 'Thanks for scrolling this far ✦' }

export const linkedin = 'https://www.linkedin.com/in/mohammedarif02'
// Country code + number, digits only (e.g. 919876543210).
export const whatsapp = 'https://wa.me/917306882706'

// Stickers dropped on the grass under the contact card. Mouse users can knock them around or drag them.
// x is an offset from the centre, y from the top of the pile, r is the resting tilt.
// Brand stickers are the studios and products behind the site.
export const drops = [
  { kind: 'img', src: mocImg, alt: 'Made of Curiosity', h: 72, x: -370, y: 8, r: -6 },
  { kind: 'pill', t: 'LinkedIn', href: linkedin, bg: '#2d5bff', fg: '#fff', x: -160, y: 30, r: -6 },
  { kind: 'pill', t: 'WhatsApp', href: whatsapp, bg: '#c6ff00', fg: '#0e1b2c', x: 30, y: 6, r: 5 },
  { kind: 'logo', src: adowlzLogo, alt: 'Adowlz', bg: '#14142b', h: 24, x: 240, y: 24, r: 4 },
  { kind: 'badge', ring: 'taste · drag me · taste · drag me · ', icon: 'palette', bg: '#ff3ea5', x: -480, y: 116, r: -8 },
  { kind: 'img', src: vinesImg, alt: 'Vines by Made of Curiosity', h: 112, round: true, x: -300, y: 122, r: 8 },
  { kind: 'pill', t: 'Journal', href: '#/journal', bg: '#ff7a00', fg: '#fff', x: -120, y: 140, r: 4 },
  { kind: 'logo', src: ometricsLogo, alt: '0metrics', bg: '#0b0b0b', h: 22, x: 70, y: 118, r: -5 },
  { kind: 'img', src: giftdImg, alt: 'Giftd', h: 66, x: 300, y: 122, r: -4 },
  { kind: 'badge', ring: 'data · drag me · data · drag me · ', icon: 'chart', bg: '#00e5ff', x: 470, y: 100, r: 10 },
  { kind: 'pill', t: 'Experiments', href: '#/experiments', bg: '#9d4dff', fg: '#fff', x: -30, y: 236, r: -5 },
]
