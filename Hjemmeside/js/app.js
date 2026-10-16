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
  let links = [['vaerelser.html', 'Værelser']]
  if (isSeeker(user)) {
    links.push(['favoritter.html', 'Favoritter'], ['beskeder.html', 'Beskeder'], ['profil.html', 'Profil'])
  } else if (user && user.role === 'admin') {
    links.push(['profil.html', 'Profil'], ['beskeder.html', 'Beskeder'], ['admin.html', 'Admin'])
  } else if (isHost(user)) {
    links.push(['profil.html', 'Mine opslag'], ['ansogere.html', 'Ansøgere'], ['beskeder.html', 'Beskeder'])
  }
  let right = links.map(([href, label]) => `<a href="${href}" ${active === href ? 'style="background:rgba(108,78,49,.12)"' : ''}>${label}</a>`).join('')
  if (user) {
    if (user.role === 'admin' || user.email === 'stefan@roomtogether.dk') {
      if (!links.some(([h]) => h === 'admin.html')) right += `<a href="admin.html">Admin</a>`
    }
    right += `<button class="linkish" onclick="logout()">Log ud</button>`
    right += `<a class="btn btn-primary btn-sm" href="profil.html">${user.name}</a>`
  } else {
    right += `<a href="login.html">Log ind</a>`
    right += `<a class="btn btn-primary btn-sm" href="opret.html">Opret profil</a>`
  }
  document.getElementById('site-nav').innerHTML = `
    <header class="site-header"><div class="wrap nav">
      <a class="brand" href="index.html"><img src="Logo/roomtogether-logo.png" alt="RoomTogether"></a>
      <nav class="nav-links">${right}</nav>
    </div></header>`
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
  const pill = score == null ? '' : `<span class="match-pill ${matchClass(score)}">${matchLabel(score)}</span>`
  return `<a class="listing" href="vaerelse.html?id=${listing.id}">
    <div class="listing-media">
      ${listing.image ? `<img src="${listing.image}" alt="">` : ''}
      <span class="badge">${listing.area}</span>
    </div>
    <div>
      <h3>${listing.title}</h3>
      <div class="meta"><span>${money(listing.rent)}/md</span><span>${listing.size} m²</span><span>${listing.moveIn}</span></div>
      <div class="meta" style="margin-top:.45rem">${pill}<span>${host ? host.name : ''}</span></div>
    </div>
  </a>`
}

function chatKey(a, b) {
  return [a, b].sort().join('_')
}

function ensureDemoHint() {
  if (sessionStorage.getItem('nr_hint')) return
  sessionStorage.setItem('nr_hint', '1')
}