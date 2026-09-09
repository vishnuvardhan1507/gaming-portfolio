import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowUpRight,
  Settings,
  ArrowLeft,
  X,
  LockKeyhole,
  Check,
  BookOpen,
  Code2,
  Briefcase,
  Trophy,
  FileText,
  Mail,
  User,
} from 'lucide-react';
import Scene, { Spider } from './Scene';
import { WebPattern, MaskArt } from './ComicArt';
import { DroneArtwork, ReferenceGlove } from './Equipment';
import { playWebShot } from './webAudio';
import DroneBurst from './DroneBurst';
import Content, { destinations } from './Content';
const icons = [User, Code2, Briefcase, BookOpen, Trophy, FileText, Mail];
const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};
function Dialog({ title, onClose, children, wide = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const prior = document.activeElement;
    ref.current.showModal();
    return () => {
      if (prior?.isConnected) prior.focus();
      else document.getElementById('webline-home')?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={wide ? 'dialog reading' : 'dialog'}
      aria-labelledby="dialog-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="dialog-bar">
        <span id="dialog-title">{title}</span>
        <button className="icon-button" onClick={onClose} aria-label="Close panel">
          <X />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export default function Game() {
  const [mode, setMode] = useState('start'),
    [overlay, setOverlay] = useState(null),
    [section, setSection] = useState('profile'),
    [history, setHistory] = useState([]),
    [unlocked, setUnlocked] = useState(() => {
      const v = read('webline-unlocked', []);
      return Array.isArray(v)
        ? [...new Set(v.filter((x) => destinations.some((d) => d[0] === x)))]
        : [];
    }),
    [easy, setEasy] = useState(() => read('webline-easy', false) === true),
    [reduced, setReduced] = useState(
      () =>
        matchMedia('(prefers-reduced-motion: reduce)').matches ||
        read('webline-motion', false) === true,
    ),
    [sound, setSound] = useState(false),
    [paused, setPaused] = useState(false),
    [hits, setHits] = useState([]),
    [shots, setShots] = useState(0),
    [seconds, setSeconds] = useState(30),
    [shot, setShot] = useState(null),
    [announcement, setAnnouncement] = useState(''),
    [completion, setCompletion] = useState(false);
  const arena = useRef(null),
    reading = useRef(null),
    drones = useRef([]),
    reticle = useRef(null),
    round = useRef({ active: false, hits: [], shots: 0, remaining: 30000, elapsed: 0 }),
    audio = useRef(null),
    shotId = useRef(0);
  useEffect(() => {
    if (overlay === 'content' && reading.current) {
      reading.current.focus({ preventScroll: true });
      reading.current.closest('dialog').scrollTop = 0;
    }
  }, [overlay, section, history.length]);
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? 'reduced' : 'full';
    save('webline-motion', reduced);
  }, [reduced]);
  useEffect(() => {
    save('webline-unlocked', unlocked);
  }, [unlocked]);
  useEffect(() => {
    save('webline-easy', easy);
  }, [easy]);
  useEffect(() => {
    const m = matchMedia('(prefers-reduced-motion: reduce)');
    const fn = (e) => setReduced(e.matches);
    m.addEventListener('change', fn);
    return () => m.removeEventListener('change', fn);
  }, []);
  const pause = () => {
    if (round.current.active) {
      setPaused(true);
      setOverlay('pause');
    }
  };
  useEffect(() => {
    const fn = () => {
      if (document.hidden) pause();
    };
    document.addEventListener('visibilitychange', fn);
    return () => document.removeEventListener('visibilitychange', fn);
  }, []);
  useEffect(() => {
    if (!shot) return;
    const id = setTimeout(() => setShot(null), reduced ? 100 : 380);
    return () => clearTimeout(id);
  }, [shot, reduced]);
  useEffect(() => {
    if (mode !== 'success') return;
    const id = setTimeout(
      () => {
        setMode('content');
        setOverlay('content');
      },
      reduced ? 0 : 1500,
    );
    return () => clearTimeout(id);
  }, [mode, reduced]);
  useEffect(() => {
    if (mode !== 'encounter' || paused || overlay) return;
    let frame,
      last = performance.now();
    const tick = (now) => {
      const r = round.current,
        dt = now - last;
      last = now;
      if (!r.active) return;
      r.elapsed += dt;
      if (!easy) {
        r.remaining = Math.max(0, r.remaining - dt);
        setSeconds(Math.ceil(r.remaining / 1000));
        if (r.remaining === 0) {
          r.active = false;
          setMode('timeout');
          setOverlay('timeout');
          setAnnouncement('Time expired. Retry or switch to Easy Mode.');
          return;
        }
      }
      const bounds = arena.current?.getBoundingClientRect();
      if (bounds)
        drones.current.forEach((el, i) => {
          if (!el || r.hits.includes(i)) return;
          const t = (r.elapsed / 1000) * (easy ? 0.22 : 1);
          const halfWidth = el.offsetWidth / 2 + 5;
          const halfHeight = el.offsetHeight / 2 + 5;
          const x = Math.max(
            halfWidth,
            Math.min(
              bounds.width - halfWidth,
              (bounds.width * (i + 0.5)) / 3 +
                (reduced
                  ? 0
                  : (Math.sin(t * 2.7 + i * 2) * 0.1 + Math.sin(t * 4.1 + i) * 0.02) *
                    bounds.width),
            ),
          );
          const rawY =
            bounds.height * (i % 2 ? 0.6 : 0.36) +
            (reduced ? 0 : Math.cos(t * 2.2 + i) * Math.min(110, bounds.height * 0.2));
          const y = Math.max(halfHeight, Math.min(bounds.height - halfHeight, rawY));
          el.style.left = `${x}px`;
          el.style.top = `${y}px`;
        });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [mode, paused, easy, reduced, overlay]);
  function tone(capture = false) {
    if (!sound) return;
    try {
      const ctx =
        audio.current ?? (audio.current = new (window.AudioContext || window.webkitAudioContext)());
      ctx.resume();
      playWebShot(ctx, capture);
    } catch {}
  }
  function aimAt(x, y, bounds) {
    const angle = Math.max(
      -70,
      Math.min(
        70,
        (Math.atan2(x - bounds.width / 2, Math.max(1, bounds.height - y)) * 180) / Math.PI,
      ),
    );
    arena.current?.style.setProperty('--aim-angle', `${angle}deg`);
  }
  function projectile(e) {
    const b = arena.current?.getBoundingClientRect();
    if (!b) return;
    const target = e.currentTarget.getBoundingClientRect();
    const x = e.detail === 0 ? target.left + target.width / 2 : e.clientX,
      y = e.detail === 0 ? target.top + target.height / 2 : e.clientY;
    aimAt(x - b.left, y - b.top, b);
    const emitter = arena.current.querySelector('.web-emitter');
    const port = emitter?.getBoundingClientRect();
    setShot({
      id: ++shotId.current,
      x: x - b.left,
      y: y - b.top,
      w: b.width,
      h: b.height,
      originX: port ? port.left + port.width / 2 - b.left : b.width * 0.2,
      originY: port ? port.top + port.height / 2 - b.top : b.height,
    });
  }
  function begin(id = section, forceEasy = easy) {
    round.current = {
      active: true,
      destination: id,
      hits: [],
      shots: 0,
      remaining: 30000,
      elapsed: 0,
    };
    setSection(id);
    setHistory([]);
    setEasy(forceEasy);
    setHits([]);
    setShots(0);
    setSeconds(30);
    setPaused(false);
    setOverlay(null);
    setMode('encounter');
    setAnnouncement(
      `Web three drones to unlock ${id}. ${forceEasy ? 'No time limit.' : '30 seconds.'}`,
    );
    requestAnimationFrame(() => drones.current[0]?.focus({ preventScroll: true }));
  }
  function select(id, e) {
    projectile(e);
    tone();
    if (unlocked.includes(id)) {
      setSection(id);
      setHistory([]);
      setMode('content');
      setOverlay('content');
    } else begin(id);
  }
  function fire(e, i) {
    e.stopPropagation();
    const r = round.current;
    if (!r.active || paused || overlay || r.hits.includes(i)) return;
    projectile(e);
    tone(i !== undefined);
    r.shots++;
    setShots(r.shots);
    if (i === undefined) return;
    r.hits.push(i);
    setHits([...r.hits]);
    setAnnouncement(`${r.hits.length} of 3 drones captured`);
    if (r.hits.length === 3) {
      r.active = false;
      const next = [...new Set([...unlocked, section])];
      setUnlocked(next);
      setCompletion(next.length === 7 && unlocked.length < 7);
      setMode('success');
      setAnnouncement(`${section} unlocked`);
    } else {
      const next = [0, 1, 2].find((n) => !r.hits.includes(n));
      drones.current[next]?.focus({ preventScroll: true });
    }
  }
  function close() {
    if (overlay === 'content') {
      setHistory([]);
      if (completion) {
        setCompletion(false);
        setOverlay('complete');
        setMode('map');
      } else if (round.current.active) {
        setSection(round.current.destination);
        setMode('encounter');
        setPaused(true);
        setOverlay('pause');
      } else {
        setOverlay(null);
        setMode('map');
      }
    } else if (round.current.active) {
      setPaused(true);
      setOverlay('pause');
    } else {
      setOverlay(null);
      if (mode !== 'start') setMode('map');
    }
  }
  function quick(id) {
    setSection(id);
    setHistory([]);
    if (round.current.active) {
      setPaused(true);
    }
    setMode('content');
    setOverlay('content');
  }
  function home() {
    round.current.active = false;
    setPaused(false);
    setOverlay(null);
    setMode('map');
  }
  const label = destinations.find((d) => d[0] === section)?.[1];
  return (
    <div className={`game-shell ${mode === 'start' ? 'portrait-entry' : ''}`}>
      <Scene start={mode === 'start'} />
      <header className="game-header">
        <button
          id="webline-home"
          className="brand"
          aria-label="Webline home"
          onClick={() => {
            round.current.active = false;
            setMode('start');
            setOverlay(null);
          }}
        >
          <Spider />
          <span>WEBLINE</span>
        </button>
        <div className="header-right">
          <button
            className="icon-button"
            aria-label="Settings"
            onClick={() => {
              if (round.current.active) setPaused(true);
              setOverlay('settings');
            }}
          >
            <Settings size={21} />
          </button>
        </div>
      </header>
      <main className="game-main">
        {mode === 'start' ? (
          <section className="start-screen">
            <div className="start-copy">
              <h1>
                EVERY GREAT
                <br />
                STORY STARTS
                <br />
                WITH A <span>LEAP.</span>
              </h1>
              <p className="identity">ANDENA VISHNU VARDHAN REDDY</p>
              <p className="role">
                AI Engineer <span>×</span> Full-Stack Developer
              </p>
              <p className="intro">I build systems that think.</p>
              <div className="start-actions">
                <button
                  className="button primary"
                  onClick={() => {
                    setMode('map');
                    setAnnouncement('Choose a rooftop destination');
                  }}
                >
                  ENTER <ArrowUpRight />
                </button>
                <button className="text-button" onClick={() => setOverlay('quick')}>
                  Explore portfolio <ArrowUpRight size={17} />
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section className="play-screen">
            <div className="mission-heading">
              <div>
                <h1>
                  {mode === 'encounter'
                    ? `Unlock ${label}.`
                    : mode === 'success'
                      ? 'Access granted.'
                      : 'CHOOSE YOUR MISSION.'}
                </h1>
                <p>
                  {mode === 'encounter'
                    ? 'Web all three drones. Click or tap to shoot.'
                    : mode === 'success'
                      ? `${label} unlocked.`
                      : 'Choose a section. Web three drones to unlock it.'}
                </p>
              </div>
              <div className="mission-stats">
                <div>
                  <span>{mode === 'encounter' ? 'CAPTURED' : 'DISCOVERED'}</span>
                  <strong>
                    {mode === 'encounter' ? hits.length : unlocked.length}
                    <small> / {mode === 'encounter' ? 3 : 7}</small>
                  </strong>
                </div>
                {mode === 'encounter' && (
                  <>
                    <div>
                      <span>TIME LEFT</span>
                      <strong className={seconds <= 10 ? 'red' : ''} data-testid="timer">
                        {easy ? '∞' : seconds}
                        <small>{easy ? '' : 's'}</small>
                      </strong>
                    </div>
                    <div>
                      <span>ACCURACY</span>
                      <strong data-testid="accuracy">
                        {shots ? Math.round((hits.length / shots) * 100) : 100}
                        <small>%</small>
                      </strong>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div
              ref={arena}
              className={`arena ${mode === 'encounter' ? 'shooting' : ''}`}
              data-difficulty={easy ? 'easy' : 'timed'}
              data-firing={!!shot}
              data-effects-paused={paused || !!overlay}
              onClick={mode === 'encounter' ? (e) => fire(e, undefined) : undefined}
              onPointerMove={(e) => {
                const bounds = e.currentTarget.getBoundingClientRect();
                if (mode === 'encounter' && !paused && !overlay) {
                  aimAt(e.clientX - bounds.left, e.clientY - bounds.top, bounds);
                }
                if (reticle.current) {
                  const b = e.currentTarget.getBoundingClientRect();
                  reticle.current.style.left = `${e.clientX - b.left}px`;
                  reticle.current.style.top = `${e.clientY - b.top}px`;
                }
              }}
            >
              {mode === 'encounter' || mode === 'success' ? (
                <>
                  <div className="arena-grid" aria-hidden="true" />
                  {[0, 1, 2].map((i) => (
                    <button
                      key={i}
                      ref={(el) => (drones.current[i] = el)}
                      className={`drone ${hits.includes(i) ? 'captured' : ''}`}
                      aria-label={`Web drone ${i + 1}`}
                      disabled={hits.includes(i) || mode !== 'encounter' || paused}
                      onClick={(e) => fire(e, i)}
                      style={{ left: `${((i + 0.5) * 100) / 3}%`, top: `${i % 2 ? 60 : 36}%` }}
                    >
                      {hits.includes(i) ? <DroneBurst reduced={reduced} /> : <DroneArtwork />}
                    </button>
                  ))}
                  <div className="shooter-pivot" aria-hidden="true">
                    <ReferenceGlove />
                  </div>
                  {mode === 'success' && (
                    <div className="success-flash">
                      <Check size={40} />
                      <strong>SECTION UNLOCKED</strong>
                    </div>
                  )}
                  <span ref={reticle} className="aim-reticle" aria-hidden="true" />
                </>
              ) : (
                <div className="destination-grid">
                  {destinations.map(([id, name], i) => {
                    const Icon = icons[i];
                    return (
                      <button
                        key={id}
                        aria-label={`ROOFTOP 0${i + 1}: ${name}. ${unlocked.includes(id) ? 'Open dossier' : 'Shoot to unlock'}`}
                        className={`destination ${unlocked.includes(id) ? 'unlocked' : ''}`}
                        onClick={(e) => select(id, e)}
                      >
                        <WebPattern />
                        {i === 0 ? <MaskArt /> : <Icon className="card-art" aria-hidden="true" />}
                        <span className="destination-status" aria-hidden="true">
                          {unlocked.includes(id) ? <Check size={22} /> : <LockKeyhole size={20} />}
                        </span>
                        <Icon className="destination-icon" size={27} />
                        <strong>{name}</strong>
                        <ArrowUpRight className="destination-arrow" aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
              )}
              {shot && !reduced && (
                <svg
                  key={shot.id}
                  className="web-shot"
                  viewBox={`0 0 ${shot.w} ${shot.h}`}
                  aria-hidden="true"
                >
                  <path
                    d={`M${shot.originX} ${shot.originY} Q${(shot.originX + shot.x) / 2} ${shot.y} ${shot.x} ${shot.y}`}
                    stroke="white"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d={`M${shot.originX + 3} ${shot.originY} Q${(shot.originX + shot.x) / 2 + 10} ${shot.y + 20} ${shot.x} ${shot.y}`}
                    stroke="#ced6ef"
                    fill="none"
                  />
                  <circle
                    cx={shot.x}
                    cy={shot.y}
                    r="24"
                    stroke="white"
                    fill="none"
                    strokeDasharray="3 6"
                  />
                  <path
                    d={`M${shot.x - 32} ${shot.y}h64M${shot.x} ${shot.y - 32}v64`}
                    stroke="white"
                  />
                </svg>
              )}
            </div>
            <div className="arena-bottom">
              {mode === 'encounter' && <span>Click / tap to fire · Tab + Enter for keyboard</span>}
              <button
                className="text-button"
                onClick={mode === 'encounter' ? pause : () => setOverlay('settings')}
              >
                {mode === 'encounter'
                  ? 'Pause mission'
                  : 'Difficulty: ' + (easy ? 'Easy' : 'Timed')}{' '}
                <Settings size={16} />
              </button>
            </div>
          </section>
        )}
      </main>

      <div className="sr-only" role="status" aria-live="polite">
        {announcement}
      </div>
      {overlay && (
        <Dialog
          key={overlay}
          title={
            overlay === 'content'
              ? `${label} // DOSSIER`
              : overlay === 'quick'
                ? 'QUICK ACCESS'
                : overlay === 'settings'
                  ? 'SUIT SETTINGS'
                  : overlay === 'pause'
                    ? 'MISSION PAUSED'
                    : overlay === 'timeout'
                      ? 'TIME EXPIRED'
                      : overlay === 'complete'
                        ? 'CAMPAIGN COMPLETE'
                        : 'RESET CAMPAIGN'
          }
          onClose={close}
          wide={overlay === 'content'}
        >
          {overlay === 'content' ? (
            <>
              <div className="panel-tools">
                {history.length > 0 && (
                  <button className="text-button" onClick={() => setHistory((h) => h.slice(0, -1))}>
                    <ArrowLeft size={18} /> Back
                  </button>
                )}
              </div>
              <div
                ref={reading}
                tabIndex={-1}
                className="reading-body"
                key={section + history.length}
              >
                <Content
                  section={section}
                  detail={history.at(-1)}
                  onDetail={(d) => setHistory((h) => [...h, d])}
                />
              </div>
            </>
          ) : overlay === 'quick' ? (
            <>
              <div className="quick-grid">
                {destinations.map(([id, name]) => (
                  <button key={id} onClick={() => quick(id)}>
                    <strong>{name} ↗</strong>
                  </button>
                ))}
              </div>
            </>
          ) : overlay === 'settings' ? (
            <>
              <div className="settings-list">
                <button
                  aria-pressed={easy}
                  onClick={() => {
                    const next = !easy;
                    setEasy(next);
                    if (round.current.active) {
                      begin(section, next);
                      setPaused(true);
                      setOverlay('settings');
                    }
                  }}
                >
                  <span>
                    Easy Mode
                    <small>Slow-moving drones. No countdown. Restarts an active encounter.</small>
                  </span>
                  <b>{easy ? 'ON' : 'OFF'}</b>
                </button>
                <button aria-pressed={reduced} onClick={() => setReduced(!reduced)}>
                  <span>
                    Reduce motion<small>Stationary targets and immediate hit feedback.</small>
                  </span>
                  <b>{reduced ? 'ON' : 'OFF'}</b>
                </button>
                <button aria-pressed={sound} onClick={() => setSound(!sound)}>
                  <span>
                    Web-shooter sound
                    <small>Play web-shot and capture effects.</small>
                  </span>
                  <b>{sound ? 'ON' : 'OFF'}</b>
                </button>
              </div>
              {mode !== 'start' && (
                <button className="button" onClick={() => setOverlay('quick')}>
                  Explore portfolio <ArrowUpRight size={17} />
                </button>
              )}
              <button className="button danger" onClick={() => setOverlay('reset')}>
                Reset Campaign
              </button>
            </>
          ) : overlay === 'reset' ? (
            <>
              <h2>Start a fresh story?</h2>
              <p>
                This clears all seven saved unlocks and the current encounter. Your contact draft is
                kept.
              </p>
              <div className="actions">
                <button
                  className="button primary"
                  onClick={() => {
                    setUnlocked([]);
                    setCompletion(false);
                    home();
                  }}
                >
                  Confirm reset
                </button>
                <button className="button" onClick={() => setOverlay('settings')}>
                  Cancel
                </button>
              </div>
            </>
          ) : overlay === 'pause' ? (
            <>
              <h2>Catch your breath.</h2>
              <p>Your hits and remaining time are saved. Resume when you're ready.</p>
              <div className="actions">
                <button
                  className="button primary"
                  onClick={() => {
                    setPaused(false);
                    setOverlay(null);
                  }}
                >
                  Resume mission
                </button>
                <button className="button" onClick={home}>
                  Return to Rooftops
                </button>
              </div>
            </>
          ) : overlay === 'timeout' ? (
            <>
              <h2>Another shot at greatness.</h2>
              <p>
                You captured {hits.length} of 3 drones. Try again or take your time in Easy Mode.
              </p>
              <div className="actions">
                <button className="button primary" onClick={() => begin()}>
                  Retry
                </button>
                <button className="button" onClick={() => begin(section, true)}>
                  Easy Mode
                </button>
                <button className="text-button" onClick={home}>
                  Return to Rooftops
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="completion-mark">
                <Spider />
              </div>
              <h2>
                Neighborhood
                <br />
                <span className="red">Engineer.</span>
              </h2>
              <p>You explored the work behind the mask. Let's build the next chapter together.</p>
              <div className="actions">
                <button className="button primary" onClick={() => quick('contact')}>
                  Contact Vishnu ↗
                </button>
                <button className="button" onClick={() => setOverlay('reset')}>
                  Replay campaign
                </button>
                <button className="text-button" onClick={home}>
                  Return to Rooftops
                </button>
              </div>
            </>
          )}
        </Dialog>
      )}
    </div>
  );
}
