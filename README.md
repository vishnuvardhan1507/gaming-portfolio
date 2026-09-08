# WEBLINE // Beyond the Mask

Live portfolio: https://vishnu-gaming-portfolio.vercel.app

The private GitHub repository is connected to the Vercel project `vishnu-gaming-portfolio`.
Pushes to `main` trigger production deployments. Vercel runs `npm ci`, then `npm run build`,
and serves the Vite output from `dist`.

A playable Spider-Man-inspired developer portfolio for Andena Vishnu Vardhan Reddy. The entry screen matches the supplied portrait/city reference with live HTML text and buttons. Miles Morales–style black and crimson visuals surround a first-person rooftop web shooter built with React, Vite, original SVG artwork, and CSS. Fonts and artwork are served locally; no WebGL or backend is required.

The entry background is `public/assets/hero-portrait.png`, edited from the user's reference with the built-in imagegen tool to remove baked-in interface text. The exact edit prompt is recorded in `public/assets/hero-portrait.prompt.txt`. `src/game/portrait.css` controls reference-matching typography, composition, and responsive cropping. Discovery counts remain live gameplay data, rather than the static count pictured in the reference.

## Play locally

```sh
npm install
npm run dev
```

Open the URL printed by Vite. Press **Enter**, choose any of seven rooftops, and web three drones within 30 seconds to unlock that portfolio section.

- Mouse: aim and click. Touch: tap a drone. Keyboard: Tab to a target and Enter/Space to shoot.
- Unlimited shots; misses affect accuracy. Captured drones cannot count twice.
- Timed-mode drones now use 62×52px targets on desktop and 52×48px targets on mobile, with roughly three times the previous oscillation frequency and wider evasive paths. Easy Mode retains larger targets moving at 22% of timed-mode speed.
- `src/game/Equipment.jsx` contains vector adaptations of the supplied red mechanical drone and red web-pattern hand references. Exact transparent bitmap extraction was rejected by the image service, so these are illustrations, not the original image cutouts.
- Web shots originate at the illustrated wrist emitter. The original synthesized sound in `src/game/webAudio.js` layers a mechanical snap, filtered air burst, whipping pitch sweep, and capture impact. It does not use a movie recording; a compressor and short rate limit control overlapping shots.
- Timeout offers Retry, Easy Mode, or Return to Rooftops.
- Easy Mode slows drones to 22% speed and removes the timer. Reduced motion keeps targets stationary. Switching difficulty restarts the current encounter.
- Settings, Quick Access, and hidden browser tabs pause the encounter. Explicitly resume to continue.
- Quick Access provides all content without completing challenges. It does not grant unlocks.
- All seven unlocks award Neighborhood Engineer. Replay/reset requires confirmation.
- Unlocks and difficulty/motion preferences save locally. Sound is off by default each visit.
- Reduced motion stops target movement and decorative animation. It does not remove the timed-mode deadline; choose Easy Mode for unlimited time.

## Project structure

- `src/main.jsx`: entry point.
- `src/game/Game.jsx`: game states, encounter timer/movement, web hits, campaign persistence, settings, and panel navigation.
- `src/game/Scene.jsx`: city layers, illustrated hero, spider insignia, and foreground web-shooter glove.
- `src/game/Content.jsx`: the seven reusable reading panels, project/skill drill-down, and contact drafts.
- `src/game/game.css`: responsive suit-themed interface and animations.
- `src/data.js`: editable portfolio details and project data.
- `src/resume.jsx`: in-page resume and lazy-loaded PDF export.

The encounter uses one requestAnimationFrame loop with elapsed-time movement and timing. Native DOM buttons define both the visible targets and clickable hit areas. Native dialogs provide keyboard focus containment; reading panels scroll independently from the fixed arena.

## Complete your information before publishing

Update `src/data.js` with your email, GitHub and LinkedIn URLs, current internship company/responsibilities, and project repository links. Existing experience, education, project metrics, and publication information come from the supplied brief.

Without a contact address, the form saves a local draft and restores it later. It does **not** send or claim delivery. Once an email is supplied, it opens an email-client draft for the visitor to send. Server-confirmed delivery requires an email backend that is not configured here.

The resume is generated from portfolio data, rather than an imported original PDF. Complete the missing fields before distributing it.

## Build and verify

```sh
npm run build
npm run preview
npm test
```

Deploy `dist/` to a static host. Playwright uses locally installed Chrome; change `channel` in its config if necessary.

Tests cover unlocks, misses/duplicate hits, timeout/retry, difficulty, pause/resume, hidden tabs, campaign completion/reset, nested content, PDF export, contact restoration, actual touch input, target bounds at 320/390/768/1440 pixels, reduced motion, runtime errors, and axe WCAG A/AA checks.

With a preview running, `node scripts/preview-check.mjs` captures the start screen, map, and encounter on desktop/mobile. `node scripts/accessibility-check.mjs` runs a standalone start-screen scan. Set `PREVIEW_URL` if your server is not at `http://localhost:5174`.

Local storage keys: `webline-unlocked`, `webline-easy`, `webline-motion`, and `contactDraft`. Reset Campaign clears only game progression; it preserves the contact draft and accessibility preferences. No progress is uploaded.
