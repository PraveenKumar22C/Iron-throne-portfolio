## Packages
(none needed)

## Notes
Uses framer-motion (already installed) for cinematic scene transitions and staggered reveals.
Background music expected at client/public/audio/bgm.mp3 (must be user-click started; no autoplay).
Hidden admin route: /contact-inbox (lists messages from GET /api/contact).
SEO handled per route via a small runtime helper that sets document.title + meta/OG tags.
Tailwind already configured to read CSS variables for colors; this frontend sets a GoT-inspired palette in index.css.
