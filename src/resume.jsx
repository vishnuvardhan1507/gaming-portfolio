import React, { useEffect, useRef, useState } from 'react';
import { Download, Printer } from 'lucide-react';
import { profile, missions, branches, publication } from './data';

export default function Resume({ autoDownload = false }) {
  const [status, setStatus] = useState('');
  const downloaded = useRef(false);
  const download = async () => {
    setStatus('Preparing PDF…');
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });
      let y = 20;
      const write = (text, size = 10, bold = false, color = [50, 45, 57]) => {
        doc.setFont('helvetica', bold ? 'bold' : 'normal');
        doc.setFontSize(size);
        doc.setTextColor(...color);
        const lines = doc.splitTextToSize(
          text
            .replaceAll('×', ' / ')
            .replaceAll('≈', 'Approx. ')
            .replaceAll('—', '-')
            .replaceAll('–', '-')
            .replaceAll('→', '->')
            .replaceAll('·', ' / '),
          174,
        );
        const lineHeight = size * 0.45;
        for (const line of lines) {
          if (y + lineHeight > 280) {
            doc.addPage();
            y = 20;
          }
          doc.text(line, 18, y);
          y += lineHeight;
        }
        y += 2;
      };
      const heading = (t) => {
        y += 5;
        write(t, 11, true, [101, 61, 144]);
      };
      write(profile.name.toUpperCase(), 18, true);
      write('AI ENGINEER / FULL-STACK DEVELOPER', 10, false, [101, 61, 144]);
      write(
        ['India', profile.email, profile.github, profile.linkedin].filter(Boolean).join(' | '),
        9,
      );
      heading('PROFILE');
      write(
        'Computer Science graduate with a strong foundation in software development, machine learning, AI systems, and full-stack development. Interested in intelligent software that combines AI with practical real-world applications.',
      );
      heading('EXPERIENCE');
      if (!profile.internshipCompany.startsWith('[')) {
        write(`AI Intern | ${profile.internshipCompany}`, 11, true);
        write('24 July 2026 - Present', 9);
        profile.internshipDetails.filter((t) => !t.startsWith('[')).forEach((t) => write('- ' + t));
      } else {
        write('AI Intern | 24 July 2026 - Present', 11, true);
        write('Company and role details to be added.', 9);
      }
      write('Full Stack Intern | NexusIQ Solutions LLP', 11, true);
      write('03 June - 03 August 2024 | Hyderabad, Telangana', 9);
      write(
        'Engineered RESTful APIs for frontend-backend communication, contributing to approximately 30% improvement in application response time. Collaborated on backend logic and deployment.',
      );
      heading('SELECTED PROJECTS');
      missions.forEach((m) => {
        write(`${m.name} | ${m.year}`, 11, true);
        write(m.description);
        write(`Technologies: ${m.tech.join(', ')}`, 9);
        write(m.result, 9);
      });
      heading('TECHNICAL SKILLS');
      branches.forEach((b) => write(`${b.name}: ${b.skills.join(', ')}`, 9));
      heading('EDUCATION');
      write('VIT-AP University | Integrated M.Tech, Computer Science & Engineering', 11, true);
      write('2021-2026 | CGPA: 8.41');
      write('Jagans Junior College | Intermediate, MPC | 2019-2021 | 91.7%');
      write('Rainbow School | CBSE | 2018-2019 | 426 / 500');
      heading('PUBLICATION & ACHIEVEMENTS');
      write(
        `${publication.title}. ${publication.journal}, ${publication.citation}. Scopus-indexed; EID: ${publication.eid}.`,
      );
      write(publication.authors, 9);
      write(publication.url, 9);
      write('Winner of Intra-University Cricket Tournament, 2024-25.');
      doc.save('Andena-Vishnu-Vardhan-Reddy-Resume.pdf');
      setStatus('PDF downloaded. Generated from the portfolio details.');
    } catch {
      setStatus('PDF export could not load. Use Print / Save PDF as an alternative.');
    }
  };
  useEffect(() => {
    if (autoDownload && !downloaded.current) {
      downloaded.current = true;
      download();
    }
  }, [autoDownload]);
  return (
    <>
      <div className="resume-actions">
        <button className="button primary" onClick={download}>
          <Download size={14} /> DOWNLOAD PDF
        </button>
        <button className="button secondary" onClick={() => window.print()}>
          <Printer size={14} /> PRINT / SAVE PDF
        </button>
      </div>
      <p className="resume-note" role="status">
        {status || 'Download or print a copy of my experience, projects, and skills.'}
      </p>
      <article className="resume-document">
        <h3>{profile.name}</h3>
        <p>AI Engineer × Full-Stack Developer · India</p>
        {profile.email && <p>{profile.email}</p>}
        <h4>Profile</h4>
        <p>
          Computer Science graduate with a strong foundation in software development, machine
          learning, AI systems, and full-stack development. Experienced in building intelligent
          applications, machine learning systems, APIs, and academic research projects.
        </p>
        <h4>Experience</h4>
        <strong>AI Intern · 24 July 2026–Present</strong>
        <p>
          {profile.internshipCompany.startsWith('[')
            ? 'Company and role details to be added.'
            : profile.internshipCompany}
        </p>
        {profile.internshipDetails
          .filter((t) => !t.startsWith('['))
          .map((t) => (
            <p key={t}>{t}</p>
          ))}
        <strong>Full Stack Intern · NexusIQ Solutions LLP</strong>
        <p>03 June–03 August 2024 · Hyderabad, Telangana</p>
        <p>
          Engineered RESTful APIs for frontend-backend communication, contributing to approximately
          30% improvement in application response time. Collaborated on backend logic and
          deployment.
        </p>
        <h4>Selected projects</h4>
        {missions.map((m) => (
          <div key={m.id}>
            <strong>
              {m.name} · {m.year}
            </strong>
            <p>{m.description}</p>
            <p>{m.result}</p>
          </div>
        ))}
        <h4>Technical skills</h4>
        {branches.map((b) => (
          <p key={b.name}>
            <b>{b.name}:</b> {b.skills.join(', ')}
          </p>
        ))}
        <h4>Education</h4>
        <p>
          <b>VIT-AP University</b> · Integrated M.Tech, Computer Science & Engineering
          <br />
          2021–2026 · CGPA 8.41
        </p>
        <p>
          <b>Jagans Junior College</b> · Intermediate, MPC · 2019–2021 · 91.7%
        </p>
        <p>
          <b>Rainbow School</b> · CBSE · 2018–2019 · 426 / 500
        </p>
        <h4>Publication & achievements</h4>
        <p>
          <strong>{publication.title}</strong>
          <br />
          {publication.authors}
          <br />
          {publication.journal} · {publication.citation}
          <br />
          Scopus-indexed · EID: {publication.eid}
          <br />
          <a href={publication.url} target="_blank" rel="noreferrer">
            Read publication ↗
          </a>
        </p>
        <p>Winner of Intra-University Cricket Tournament · 2024–25</p>
      </article>
    </>
  );
}
