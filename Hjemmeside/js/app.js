const KEY = 'roomtogether_v4'

const IMG = {
  hero: 'Billeder/pexels-nathanjhilton-38354154.jpg',
  kitchen: 'Billeder/pexels-cottonbro-4778612.jpg',
  attic: 'Billeder/pexels-cottonbro-5088439.jpg',
  window: 'Billeder/pexels-cottonbro-5097360.jpg',
  hallway: 'Billeder/pexels-cottonbro-5932729.jpg',
  stairs: 'Billeder/pexels-duawalidd-29910002.jpg',
  balcony: 'Billeder/pexels-vafphotos-14424558.jpg'
}

const HABIT_KEYS = [
  ['sleep', 'Søvnrytme'],
  ['clean', 'Rengøring'],
  ['guests', 'Gæster'],
  ['noise', 'Støj'],
  ['smoke', 'Rygning'],
  ['pets', 'Husdyr'],
  ['social', 'Socialt niveau']
]

const HABIT_OPTS = {
  sleep: [
    'Tidlig',
    'Tidlig i hverdagen, senere i weekenden',
    'Normal',
    'Fleksibel / tilpasser mig',
    'Skiftende rytme',
    'Natteugle'
  ],
  clean: [
    'Meget ren',
    'Ren i fællesrum, afslappet på eget værelse',
    'Rengøringsplan / faste dage',
    'Normal',
    'Ok med lidt rod midt på ugen',
    'Afslappet'
  ],
  guests: [
    'Sjældent',
    'Ingen overnatning',
    'Kun i dagtimerne',
    'Af og til',
    'Max én overnattende ad gangen',
    'Ok med kæreste der sover over ofte',
    'Gerne fælles middagsgæster',
    'Ofte'
  ],
  noise: [
    'Stille',
    'Stille efter kl. 22',
    'Arbejder hjemme (brug for ro)',
    'Musik med headset',
    'Normal',
    'Ok med TV/musik i dagtimerne',
    'Øver instrument',
    'Livligt'
  ],
  smoke: ['Nej', 'Udendørs', 'Ja'],
  pets: [
    'Nej',
    'Allergisk (kat/hund)',
    'Kun små dyr',
    'Ok med kat, ikke hund',
    'Ok med hund, ikke kat',
    'Ok med andres',
    'Har selv',
    'Har selv + ok med andres'
  ],
  social: [
    'Privat',
    'Introvert men venlig',
    'Helst stille hjem, byliv ude',
    'Hver sin hverdag, social i weekenden',
    'Blandet',
    'Gerne fælles aftensmad',
    'Madklub / fælles aktiviteter',
    'Meget social'
  ]
}

const AREAS = [
  'Nørrebro', 'Vesterbro', 'Østerbro', 'Amager', 'Frederiksberg',
  'Indre By', 'Valby', 'Vanløse', 'Nordvest', 'Islands Brygge'
]

function db() {
  let raw = localStorage.getItem(KEY)
  if (!raw) {
    const seed = seedData()
    localStorage.setItem(KEY, JSON.stringify(seed))
    return seed
  }
  return JSON.parse(raw)
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

function seedData() {
  const habitsA = { sleep: 'Normal', clean: 'Meget ren', guests: 'Af og til', noise: 'Stille', smoke: 'Nej', pets: 'Ok med andres', social: 'Blandet' }
  const habitsB = { sleep: 'Natteugle', clean: 'Normal', guests: 'Ofte', noise: 'Livligt', smoke: 'Udendørs', pets: 'Har selv', social: 'Meget social' }
  const habitsC = { sleep: 'Tidlig', clean: 'Meget ren', guests: 'Sjældent', noise: 'Stille', smoke: 'Nej', pets: 'Nej', social: 'Privat' }
  return {
    users: [
      { id: 'u_admin', name: 'Stefan', email: 'stefan@roomtogether.dk', password: 'admin123', role: 'admin', habits: habitsA, bio: 'Admin', age: 25, work: 'Founder', budget: 0, area: 'Nørrebro', moveIn: '2026-11-01', photo: IMG.hallway },
      { id: 'u1', name: 'Maja', email: 'maja@demo.dk', password: 'demo123', role: 'host', habits: habitsA, bio: 'Studerer psykologi. Elsker aftensmad sammen, men også stille aftener.', age: 23, work: 'Studerende', budget: 0, area: 'Nørrebro', moveIn: '2026-11-01', photo: IMG.kitchen },
      { id: 'u2', name: 'Noah', email: 'noah@demo.dk', password: 'demo123', role: 'host', habits: habitsB, bio: 'Arbejder i startup. Madlavning, musik og weekender i byen.', age: 27, work: 'Arbejder', budget: 0, area: 'Vesterbro', moveIn: '2026-10-15', photo: IMG.window },
      { id: 'u3', name: 'Niklas', email: 'niklas@demo.dk', password: 'demo123', role: 'seeker', habits: habitsC, bio: 'Flytter til København for kandidat. Rolig, tidlig oppe, ingen røg.', age: 24, work: 'Studerende', budget: 5500, area: 'Østerbro', moveIn: '2026-11-15', photo: IMG.stairs }
    ],
    listings: [
      { id: 'l1', userId: 'u1', title: 'Lyst værelse på Nørrebro', area: 'Nørrebro', rent: 5200, deposit: 10400, size: 12, moveIn: '2026-11-01', period: '12 måneder', desc: 'Værelse i 3-værelses med fælles køkken og altan. Tæt på metro.', image: IMG.kitchen, habits: habitsA, createdAt: Date.now() - 86400000 },
      { id: 'l2', userId: 'u2', title: 'Værelse på Vesterbro tæt på Enghave', area: 'Vesterbro', rent: 6100, deposit: 12200, size: 10, moveIn: '2026-10-20', period: 'Ubegrænset', desc: 'Hyggelig lejlighed med to roommates. Åbent hjem, gerne madklub.', image: IMG.attic, habits: habitsB, createdAt: Date.now() - 43200000 },
      { id: 'l3', userId: 'u2', title: 'Værelse med balkonstemning på Amager', area: 'Amager', rent: 4800, deposit: 9600, size: 11, moveIn: '2026-11-10', period: '6–12 måneder', desc: 'Dejligt værelse i lejlighed med balkon og unge roommates. Tæt på metro.', image: IMG.balcony, habits: habitsB, createdAt: Date.now() - 21600000 }
    ],
    favorites: [
      { userId: 'u3', listingId: 'l1' }
    ],
    messages: [
      { id: 'm1', fromId: 'u3', toId: 'u1', text: 'Hej Maja! Jeg søger et roligt sted fra midt november. Må jeg høre mere om værelset?', at: Date.now() - 3600000, listingId: 'l1' },
      { id: 'm2', fromId: 'u1', toId: 'u3', text: 'Hej Niklas! Det lyder godt. Vil du se min profil og skrive lidt om dig selv?', at: Date.now() - 1800000, listingId: 'l1' }
    ],
    reports: [],
    sessionUserId: null
  }
}

function isHost(user) {
  return user && user.role === 'host'
}

function isSeeker(user) {
  return user && user.role === 'seeker'
}

function canList(user) {
  return isHost(user) || (user && user.role === 'admin')
}

function homeFor(user) {
  if (!user) return 'index.html'
  if (user.role === 'admin') return 'admin.html'
  if (isHost(user)) return 'profil.html'
  return 'vaerelser.html'
}

function sessionUser() {
  const data = db()
  return data.users.find(u => u.id === data.sessionUserId) || null
}

function setSession(userId) {
  const data = db()
  data.sessionUserId = userId
  save(data)
}

function logout() {
  setSession(null)
  location.href = 'index.html'
}

function matchScore(a, b) {
  if (!a || !b) return null
  let points = 0
  HABIT_KEYS.forEach(([key]) => {
    if (a[key] === b[key]) points += 2
    else if (closeHabit(key, a[key], b[key])) points += 1
  })
  return Math.round((points / (HABIT_KEYS.length * 2)) * 100)
}

function closeHabit(key, x, y) {
  const opts = HABIT_OPTS[key]
  return Math.abs(opts.indexOf(x) - opts.indexOf(y)) === 1
}

function matchClass(score) {
  if (score == null) return ''
  if (score >= 70) return ''
  if (score >= 45) return 'mid'
  return 'low'
}

function matchLabel(score) {
  if (score == null) return 'Log ind for match'
  return score + '% match'
}

function toast(msg) {
  const el = document.createElement('div')
  el.className = 'toast'
  el.textContent = msg
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 2200)
}

function qs(name) {
  return new URLSearchParams(location.search).get(name)
}

function money(n) {
  return new Intl.NumberFormat('da-DK').format(n) + ' kr'
}

function habitSelects(prefix, values) {
  return HABIT_KEYS.map(([key, label]) => {
    const opts = HABIT_OPTS[key].map(o => `<option ${values && values[key] === o ? 'selected' : ''}>${o}</option>`).join('')
    return `<div class="field"><label>${label}</label><select name="${prefix}${key}">${opts}</select></div>`
  }).join('')
}

function readHabits(form, prefix) {
  const h = {}
  HABIT_KEYS.forEach(([key]) => { h[key] = form[prefix + key].value })
  return h
}

function renderNav(active) {
  const user = sessionUser()
  let links
  if (isSeeker(user)) {
    links = [['vaerelser.html', 'Værelser'], ['favoritter.html', 'Favoritter'], ['beskeder.html', 'Beskeder']]
  } else if (user && user.role === 'admin') {
    links = [['vaerelser.html', 'Værelser'], ['beskeder.html', 'Beskeder'], ['admin.html', 'Admin']]
  } else if (isHost(user)) {
    links = [['vaerelser.html', 'Værelser'], ['profil.html', 'Mine opslag'], ['ansogere.html', 'Ansøgere'], ['beskeder.html', 'Beskeder']]
  } else {
    links = [['vaerelser.html', 'Værelser'], ['index.html#hvordan', 'Sådan virker det'], ['index.html#udlejere', 'For udlejere']]
  }
  const center = links.map(([href, label]) => `<a href="${href}" ${active === href ? 'class="active" aria-current="page"' : ''}>${label}</a>`).join('')
  let right = ''
  if (user) {
    right += `<button class="linkish" onclick="logout()">Log ud</button>`
    right += `<a class="btn btn-primary btn-sm" href="profil.html">${user.name}</a>`
  } else {
    right += `<a class="linkish" href="login.html">Log ind</a>`
    right += `<a class="btn btn-primary btn-sm" href="opret.html">Opret profil</a>`
  }
  document.getElementById('site-nav').innerHTML = `
    <header class="site-header"><div class="wrap nav">
      <a class="brand" href="index.html"><img src="Logo/roomtogether-logo.png" alt="RoomTogether"></a>
      <button class="nav-toggle" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
      <div class="nav-menu">
        <nav class="nav-links">${center}</nav>
        <div class="nav-actions">${right}</div>
      </div>
    </div></header>`
  const header = document.querySelector('.site-header')
  const toggle = header.querySelector('.nav-toggle')
  toggle.onclick = () => {
    const open = header.classList.toggle('open')
    toggle.setAttribute('aria-expanded', open)
  }
  renderFooter()
}

function renderFooter() {
  if (document.querySelector('.footer')) return
  const footer = document.createElement('footer')
  footer.className = 'footer'
  footer.innerHTML = `<div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="Logo/roomtogether-logo.png" alt="RoomTogether">
        <p>Find en roommate, der matcher din hverdag — ikke kun din husleje.</p>
      </div>
      <div>
        <h4>Find bolig</h4>
        <a href="vaerelser.html">Alle værelser</a>
        <a href="vaerelser.html?sort=price">Billigste værelser</a>
        <a href="opret.html?role=seeker">Opret søgeprofil</a>
      </div>
      <div>
        <h4>Udlej</h4>
        <a href="opret.html?role=host">Opret opslag</a>
        <a href="index.html#udlejere">For udlejere</a>
        <a href="index.html#hvordan">Sådan virker det</a>
      </div>
      <div>
        <h4>Konto</h4>
        <a href="login.html">Log ind</a>
        <a href="opret.html">Opret profil</a>
        <a href="glemt-kode.html">Glemt kodeord</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} RoomTogether · København</span>
      <span>Demo: maja@demo.dk (udlejer) · niklas@demo.dk (lejer) · kode: demo123</span>
    </div>
  </div>`
  const scripts = document.querySelector('body > script')
  document.body.insertBefore(footer, scripts)
}

function dateDa(iso) {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('da-DK', { day: 'numeric', month: 'short', year: 'numeric' })
}

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

function availability(listing) {
  if (!listing.moveIn || listing.moveIn <= todayIso()) return { now: true, label: 'Ledig nu' }
  return { now: false, label: 'Ledig fra ' + dateDa(listing.moveIn) }
}

function isFavorite(user, listingId) {
  return isSeeker(user) && db().favorites.some(f => f.userId === user.id && f.listingId === listingId)
}

// Returnerer ny tilstand (true = gemt), eller null hvis brugeren ikke må gemme
function toggleFavorite(listingId) {
  const u = sessionUser()
  if (!u) {
    location.href = 'login.html?next=' + encodeURIComponent(location.pathname.split('/').pop() + location.search)
    return null
  }
  if (!isSeeker(u)) { toast('Kun lejere kan gemme værelser'); return null }
  const d = db()
  const i = d.favorites.findIndex(f => f.userId === u.id && f.listingId === listingId)
  if (i >= 0) d.favorites.splice(i, 1)
  else d.favorites.push({ userId: u.id, listingId })
  save(d)
  toast(i >= 0 ? 'Fjernet fra favoritter' : 'Gemt i favoritter')
  return i < 0
}

function favButtonClick(btn, e) {
  e.preventDefault()
  e.stopPropagation()
  const state = toggleFavorite(btn.dataset.id)
  if (state == null) return
  btn.classList.toggle('on', state)
  btn.setAttribute('aria-pressed', state)
}

function requireLogin(redirect) {
  if (!sessionUser()) {
    location.href = 'login.html?next=' + encodeURIComponent(redirect || location.pathname.split('/').pop())
    return false
  }
  return true
}

function listingCard(listing, score) {
  const host = db().users.find(u => u.id === listing.userId)
  const me = sessionUser()
  const avail = availability(listing)
  const fav = isFavorite(me, listing.id)
  const pill = score == null ? '' : `<span class="match-pill ${matchClass(score)}">${matchLabel(score)}</span>`
  const favBtn = isHost(me) || (me && me.role === 'admin') ? '' :
    `<button class="fav-btn ${fav ? 'on' : ''}" data-id="${listing.id}" aria-pressed="${fav}" aria-label="Gem som favorit" onclick="favButtonClick(this, event)">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 4.3 2.4.7-1.2 2.2-2.4 4.3-2.4 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>
    </button>`
  return `<article class="listing">
    <div class="listing-media">
      ${listing.image ? `<img src="${listing.image}" alt="" loading="lazy">` : ''}
      <span class="badge ${avail.now ? 'badge-now' : ''}">${avail.label}</span>
      ${favBtn}
    </div>
    <div class="listing-body">
      <p class="listing-area">${listing.area}, København</p>
      <h3><a class="listing-link" href="vaerelse.html?id=${listing.id}">${listing.title}</a></h3>
      <p class="listing-desc">${listing.desc || ''}</p>
      <div class="listing-foot">
        <span class="price">${money(listing.rent)}<small>/md</small></span>
        <span class="meta"><span>${listing.size} m²</span>${host ? `<span>${host.name}</span>` : ''}</span>
      </div>
      ${pill ? `<div class="listing-match">${pill}</div>` : ''}
    </div>
  </article>`
}

function chatKey(a, b) {
  return [a, b].sort().join('_')
}

function ensureDemoHint() {
  if (sessionStorage.getItem('nr_hint')) return
  sessionStorage.setItem('nr_hint', '1')
}