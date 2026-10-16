# RoomTogether (prototype)

Simpel HTML/CSS/JS-prototype til at teste logikken for roommate-matching i København.

## Kør lokalt

Åbn `index.html` i browseren, eller fra mappen:

```bash
npx --yes serve .
```

## Demo-login

- Udlejer (Maja): `maja@demo.dk` / `demo123`
- Lejer (Niklas): `niklas@demo.dk` / `demo123`
- Admin: `stefan@roomtogether.dk` / `admin123`

### Hvad hver rolle ser

- **Maja:** Mine opslag · Ansøgere · Beskeder (ikke favorit-værelser)
- **Niklas:** Værelser · Favoritter · Beskeder · Profil (kan ikke oprette opslag)

Data gemmes i browserens `localStorage` (ingen server endnu).

## Farver

- `#FFEAC5` `#FFDBB5` `#6C4E31` `#603F26`
