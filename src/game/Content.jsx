import React, { lazy, Suspense, useState } from 'react';
import { profile, missions, branches } from '../data';
const Resume = lazy(() => import('../resume'));
export const destinations = [
  ['profile', 'Profile', 'The person behind the mask'],
  ['skills', 'Skills', 'The technical arsenal'],
  ['projects', 'Projects', 'Four systems. Real-world impact.'],
  ['experience', 'Experience', 'The engineering journey'],
  ['achievements', 'Achievements', 'Research and milestones'],
  ['resume', 'Resume', 'Your complete dossier'],
  ['contact', 'Contact', 'Start the next collaboration'],
];
const Tags = ({ items }) => (
  <div className="tags">
    {items.map((x) => (
      <span key={x}>{x}</span>
    ))}
  </div>
);
export default function Content({ section, detail, onDetail }) {
  const [filter, setFilter] = useState('All');
  if (detail?.type === 'project') {
    const m = missions.find((m) => m.id === detail.id);
    return (
      <>
        <span className="eyebrow">
          PROJECT {m.id} / {m.category} / {m.year}
        </span>
        <h2>{m.name}</h2>
        <p>{m.description}</p>
        <Tags items={m.tech} />
        {m.id === '01' && (
          <div className="architecture">
            USER QUERY ↓ GUARDRAIL ↓ SUPERVISOR
            <br />↙ SQL AGENT &nbsp; | &nbsp; RAG / KNOWLEDGE ↘<br />
            VALIDATOR → RESPONSE
          </div>
        )}
        <h3>System approach</h3>
        <ol>
          {m.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <div className="result">
          <span className="eyebrow">{m.id === '01' ? 'DESIGN OBJECTIVE' : 'PROJECT OUTCOME'}</span>
          <p>{m.result}</p>
        </div>
        {m.code ? (
          <a className="button" href={m.code} target="_blank" rel="noreferrer">
            View code ↗
          </a>
        ) : null}
      </>
    );
  }
  if (detail?.type === 'skill') {
    const b = branches.find((b) => b.skills.includes(detail.id));
    const related = missions.filter(
      (m) => m.tech.includes(detail.id) || (detail.id === 'Multi-Agent Systems' && m.id === '01'),
    );
    return (
      <>
        <span className="eyebrow">SKILL / {b.name}</span>
        <h2>{detail.id}</h2>
        <h3>Experience / usage</h3>
        <p>{b.description}</p>
        <h3>Related projects</h3>
        {related.length ? (
          related.map((m) => (
            <button
              className="content-card"
              key={m.id}
              onClick={() => onDetail({ type: 'project', id: m.id })}
            >
              {m.name} ↗
            </button>
          ))
        ) : (
          <p>No project-specific usage documented yet. Listed in the technical toolkit.</p>
        )}
        <h3>Associated technologies</h3>
        <Tags items={b.skills.filter((s) => s !== detail.id)} />
      </>
    );
  }
  if (section === 'profile')
    return (
      <>
        <h2>
          Andena Vishnu
          <br />
          Vardhan Reddy<span className="red">.</span>
        </h2>
        <p className="lead">AI Engineer × Full-Stack Developer</p>
        <p>
          Computer Science graduate with a strong foundation in software development, machine
          learning, AI systems, and full-stack development. Experienced in building intelligent
          applications, machine learning systems, APIs, and academic research projects.
        </p>
        <p>
          Interested in developing intelligent software systems that combine AI with practical
          real-world applications.
        </p>
        <div className="facts">
          <div>
            <b>India</b>
            <span>Location</span>
          </div>
          <div>
            <b>8.41</b>
            <span>CGPA · VIT-AP</span>
          </div>
          <div>
            <b>AI / ML</b>
            <span>Specialization</span>
          </div>
        </div>
        <div className="result">
          Open to opportunities · Integrated M.Tech CSE, VIT-AP University, 2021–2026
        </div>
      </>
    );
  if (section === 'skills')
    return (
      <>
        <h2>The technical arsenal.</h2>
        {branches.map((b) => (
          <article className="content-block" key={b.name}>
            <h3>{b.name}</h3>
            <div className="skill-buttons">
              {b.skills.map((s) => (
                <button key={s} onClick={() => onDetail({ type: 'skill', id: s })}>
                  {s} ↗
                </button>
              ))}
            </div>
          </article>
        ))}
      </>
    );
  if (section === 'projects')
    return (
      <>
        <h2>Built to make an impact.</h2>
        <div className="filters">
          {['All', 'AI / ML', 'IoT'].map((f) => (
            <button key={f} aria-pressed={f === filter} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
        {missions
          .filter((m) => filter === 'All' || (filter === 'IoT' ? m.id === '04' : m.id !== '04'))
          .map((m) => (
            <button
              className="content-card project-card"
              key={m.id}
              onClick={() => onDetail({ type: 'project', id: m.id })}
            >
              <span className="eyebrow">
                {m.id} / {m.year} · {m.status}
              </span>
              <h3>{m.name} ↗</h3>
              <p>{m.short}</p>
              <Tags items={m.tech.slice(0, 4)} />
            </button>
          ))}
      </>
    );
  if (section === 'experience')
    return (
      <>
        <h2>Every chapter builds.</h2>
        <article className="content-block">
          <span className="eyebrow">24 JULY 2026 — PRESENT / ACTIVE</span>
          <h3>AI Intern</h3>
          <p>{profile.internshipCompany}</p>
          <ul>
            {profile.internshipDetails
              .filter((x) => !x.startsWith('['))
              .map((x) => (
                <li key={x}>{x}</li>
              ))}
          </ul>
        </article>
        <article className="content-block">
          <span className="eyebrow">03 JUNE — 03 AUGUST 2024</span>
          <h3>Full Stack Intern</h3>
          <p>NexusIQ Solutions LLP · Hyderabad, Telangana</p>
          <p>
            Engineered RESTful APIs enabling seamless frontend-backend communication, contributing
            to approximately <strong>30% improvement in application response time</strong>.
            Collaborated on backend logic and deployment.
          </p>
          <Tags items={['REST APIs', 'Backend Development', 'Full-Stack Development']} />
        </article>
        <h3>Education</h3>
        {[
          [
            'VIT-AP University',
            'Integrated M.Tech · Computer Science & Engineering',
            '2021–2026 · CGPA 8.41',
          ],
          ['Jagans Junior College', 'Intermediate · MPC', '2019–2021 · 91.7%'],
          ['Rainbow School', 'CBSE', '2018–2019 · 426 / 500'],
        ].map(([a, b, c]) => (
          <article className="content-block" key={a}>
            <h3>{a}</h3>
            <p>
              {b}
              <br />
              {c}
            </p>
          </article>
        ))}
      </>
    );
  if (section === 'achievements')
    return (
      <>
        <h2>Work worth recognizing.</h2>
        <article className="content-block">
          <span className="eyebrow">RESEARCH PUBLISHED / AUGUST 2025</span>
          <h3>Smart Surveillance with Hand Gesture Detection for Silent Emergency Alerts</h3>
          <p>
            4th International Conference on Advances in Software Engineering and Information
            Technology — ASIT 2025
          </p>
          <button className="button" onClick={() => onDetail({ type: 'project', id: '02' })}>
            Explore research ↗
          </button>
        </article>
        <article className="content-block">
          <span className="eyebrow">2024–25 / TOURNAMENT WINNER</span>
          <h3>Winner of Intra-University Cricket Tournament</h3>
        </article>
      </>
    );
  if (section === 'resume')
    return (
      <Suspense fallback={<p>Loading resume…</p>}>
        <Resume />
      </Suspense>
    );
  return <Contact />;
}
function Contact() {
  const [status, setStatus] = useState('');
  const [manualCopy, setManualCopy] = useState(false);
  const [draft, setDraft] = useState(() => {
    const defaults = {
      name: '',
      email: '',
      message: '',
    };
    try {
      const saved = JSON.parse(localStorage.getItem('contactDraft'));
      // Remove the former owner-prefilled values from existing local drafts too.
      if (saved?.name === profile.name) saved.name = '';
      if (saved?.email === profile.email) saved.email = '';
      if (
        saved?.message ===
        "Hi, I'm Andena Vishnu Vardhan Reddy, an AI Engineer and Full-Stack Developer. I'm open to opportunities in AI, software development, and collaborative projects. Let's connect and build something meaningful together."
      ) {
        saved.message = '';
      }
      return Object.fromEntries(
        Object.entries(defaults).map(([key, value]) => [
          key,
          typeof saved?.[key] === 'string' && saved[key].trim() ? saved[key] : value,
        ]),
      );
    } catch {
      return defaults;
    }
  });
  const emailDetails = `To: ${profile.email}\nSubject: Portfolio enquiry from ${draft.name}\n\n${draft.message}\n\nReply to: ${draft.email}`;
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailDetails);
      setManualCopy(false);
      setStatus(
        'Email details copied. Paste them into a new email, then press Send. Nothing has been sent yet.',
      );
    } catch {
      setManualCopy(true);
      setStatus(
        'Select and copy the email details below, then paste them into a new email and press Send.',
      );
    }
  };
  const submit = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('contactDraft', JSON.stringify(draft));
    } catch {}
    if (!profile.email) {
      try {
        localStorage.setItem('contactDraft', JSON.stringify(draft));
        setStatus('Draft saved on this device. Message delivery is not configured yet.');
      } catch {
        setStatus('Local saving is unavailable. Please copy your message before closing.');
      }
      return;
    }
    location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Portfolio enquiry from ' + draft.name)}&body=${encodeURIComponent(draft.message + '\n\nReply to: ' + draft.email)}`;
    setStatus(
      'Your email app should open with a draft. Review it and press Send in that app. If nothing opened, use Copy email details below. Nothing has been sent yet.',
    );
  };
  return (
    <>
      <h2>
        The next mission?
        <br />
        <span className="red">Let's build it.</span>
      </h2>
      <p>
        Have an idea worth building? I'm open to AI engineering roles, full-stack projects, and
        thoughtful collaborations. Tell me what you're working on—let's create something useful.
      </p>
      <div className="social-links">
        {[
          ['GitHub', profile.github],
          ['LinkedIn', profile.linkedin],
        ].map(([label, url]) =>
          url ? (
            <a key={label} href={url} target="_blank" rel="noreferrer">
              {label} ↗
            </a>
          ) : null,
        )}
      </div>
      <form onSubmit={submit}>
        {[
          ['name', 'Your name', 'text'],
          ['email', 'Email address', 'email'],
          ['message', 'Your message', 'textarea'],
        ].map(([key, label, type]) => (
          <label key={key}>
            {label}
            {type === 'textarea' ? (
              <textarea
                required
                minLength={10}
                maxLength={5000}
                rows={4}
                value={draft[key] || ''}
                onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
              />
            ) : (
              <input
                required
                type={type}
                maxLength={key === 'name' ? 100 : 254}
                autoComplete={key}
                value={draft[key] || ''}
                onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
              />
            )}
          </label>
        ))}
        <button className="button primary" type="submit">
          {profile.email ? 'Open email draft' : 'Save transmission draft'} ↗
        </button>
        <p className="note">
          {profile.email
            ? 'Next: review the draft in your email app and press Send. This website does not send messages directly.'
            : 'Contact details are being added. Drafts stay on your device.'}
        </p>
        <p role="status">{status}</p>
        {status && profile.email && (
          <>
            <button type="button" className="button" onClick={copyEmail}>
              Copy email details
            </button>
            <p className="note">
              No email app? Open Gmail or your preferred email service, compose a message to{' '}
              {profile.email}, and paste your message.
            </p>
            {manualCopy && (
              <label>
                Email details to copy
                <textarea
                  readOnly
                  value={emailDetails}
                  rows={8}
                  onFocus={(e) => e.target.select()}
                />
              </label>
            )}
          </>
        )}
      </form>
    </>
  );
}
