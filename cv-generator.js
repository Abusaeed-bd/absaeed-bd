(() => {
  const btn = document.getElementById('downloadCvBtn');
  if (!btn) return;

  const text = (selector, fallback = '') => {
    const el = document.querySelector(selector);
    return el ? el.textContent.trim().replace(/\s+/g, ' ') : fallback;
  };

  const all = (selector) => [...document.querySelectorAll(selector)];

  function createCV() {
    const name = text('.hero h1 span', 'Md. Abusaeed');
    const role = text('.hero .eyebrow', 'IT Professional • Data & Reporting');
    const summary = text('.hero .lead');
    const aboutParagraphs = all('#about .about-copy > p').map(el => el.textContent.trim());

    const skills = all('#skills .card').map(card => ({
      title: text.call(null, ''),
      name: card.querySelector('h3')?.textContent.trim() || '',
      desc: card.querySelector('p')?.textContent.trim() || ''
    }));

    const experience = all('#experience .timeline-item').map(item => ({
      period: item.querySelector('.timeline-meta')?.textContent.trim() || '',
      title: item.querySelector('h3')?.textContent.trim() || '',
      company: item.querySelector('.company')?.textContent.trim() || '',
      desc: item.querySelector('.timeline-card p:not(.company)')?.textContent.trim() || ''
    }));

    const workAreas = all('#work .work-card').map(card => ({
      title: card.querySelector('h3')?.textContent.trim() || '',
      desc: card.querySelector('p')?.textContent.trim() || ''
    }));

    const education = all('#education .edu-card').map(card => ({
      year: card.querySelector('.year')?.textContent.trim() || '',
      title: card.querySelector('h3')?.textContent.trim() || '',
      institute: card.querySelector('p')?.textContent.trim() || '',
      detail: card.querySelector('small')?.textContent.trim() || ''
    }));

    const contactRows = all('#contact .contact-card a, #contact .contact-card .contact-row').map(row => ({
      label: row.querySelector('small')?.textContent.trim() || '',
      value: row.querySelector('strong')?.textContent.trim() || ''
    }));

    const contact = Object.fromEntries(contactRows.map(x => [x.label.toLowerCase(), x.value]));

    const photo = document.querySelector('.portrait-ring img')?.src || '';

    const root = document.createElement('div');
    root.id = 'generated-cv';
    root.innerHTML = `
      <style>
        #generated-cv{font-family:Arial,Helvetica,sans-serif;color:#17252d;background:#fff;width:794px;box-sizing:border-box;padding:34px 38px 30px;line-height:1.4}
        #generated-cv *{box-sizing:border-box}
        #generated-cv .cv-header{display:flex;justify-content:space-between;gap:28px;border-bottom:3px solid #13abc0;padding-bottom:22px;margin-bottom:22px}
        #generated-cv .cv-name{font-size:34px;line-height:1.05;margin:0 0 7px;font-weight:800;color:#15242b}
        #generated-cv .cv-role{font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:#0799b0;font-weight:700;margin-bottom:12px}
        #generated-cv .cv-contact{font-size:11.5px;color:#52636c;line-height:1.7}
        #generated-cv .cv-photo{width:108px;height:108px;border-radius:50%;object-fit:cover;border:5px solid #19afc2;flex:0 0 auto}
        #generated-cv .cv-grid{display:grid;grid-template-columns:1fr 2.1fr;gap:28px}
        #generated-cv .cv-section{margin:0 0 20px}
        #generated-cv .cv-section h2{font-size:13px;letter-spacing:1.4px;text-transform:uppercase;color:#0799b0;margin:0 0 10px;border-bottom:1px solid #d9e8ec;padding-bottom:6px}
        #generated-cv .cv-section p{font-size:11.5px;margin:0 0 8px;color:#354951}
        #generated-cv .skill{margin-bottom:10px}
        #generated-cv .skill strong{display:block;font-size:11.5px;margin-bottom:2px;color:#1b2f37}
        #generated-cv .skill span{font-size:10.5px;color:#63757d}
        #generated-cv .item{margin-bottom:14px;break-inside:avoid}
        #generated-cv .item-top{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
        #generated-cv .item h3{font-size:12.5px;margin:0;color:#182b33}
        #generated-cv .item .meta{font-size:10px;color:#0799b0;font-weight:700;white-space:nowrap}
        #generated-cv .company{font-size:11px;font-weight:700;color:#50636b;margin:2px 0 4px}
        #generated-cv .item p{font-size:10.8px;margin:0;color:#4a5c64}
        #generated-cv .work-list{margin:0;padding-left:17px}
        #generated-cv .work-list li{font-size:10.8px;margin-bottom:6px;color:#40545c}
        #generated-cv .footer-note{margin-top:12px;padding-top:8px;border-top:1px solid #e7eef0;font-size:9.5px;color:#7a8b91;text-align:center}
      </style>
      <div class="cv-header">
        <div>
          <h1 class="cv-name">${name}</h1>
          <div class="cv-role">${role}</div>
          <div class="cv-contact">
            ${contact.location ? `📍 ${contact.location}<br>` : ''}
            ${contact.phone ? `☎ ${contact.phone}<br>` : ''}
            ${contact.email ? `✉ ${contact.email}` : ''}
          </div>
        </div>
        ${photo ? `<img class="cv-photo" src="${photo}" alt="${name}">` : ''}
      </div>

      <div class="cv-grid">
        <aside>
          <section class="cv-section">
            <h2>Profile</h2>
            <p>${summary}</p>
          </section>
          <section class="cv-section">
            <h2>Skills</h2>
            ${skills.map(s => `<div class="skill"><strong>${s.name}</strong><span>${s.desc}</span></div>`).join('')}
          </section>
          <section class="cv-section">
            <h2>Education</h2>
            ${education.map(e => `<div class="item"><div class="item-top"><h3>${e.title}</h3><span class="meta">${e.year}</span></div><div class="company">${e.institute}</div><p>${e.detail}</p></div>`).join('')}
          </section>
        </aside>

        <main>
          <section class="cv-section">
            <h2>Professional Summary</h2>
            ${(aboutParagraphs.length ? aboutParagraphs : [summary]).map(p => `<p>${p}</p>`).join('')}
          </section>
          <section class="cv-section">
            <h2>Experience</h2>
            ${experience.map(e => `<div class="item"><div class="item-top"><h3>${e.title}</h3><span class="meta">${e.period}</span></div><div class="company">${e.company}</div><p>${e.desc}</p></div>`).join('')}
          </section>
          <section class="cv-section">
            <h2>Core Work Areas</h2>
            <ul class="work-list">${workAreas.map(w => `<li><strong>${w.title}:</strong> ${w.desc}</li>`).join('')}</ul>
          </section>
        </main>
      </div>
      <div class="footer-note">Generated from ${window.location.hostname || 'portfolio website'} • ${new Date().getFullYear()}</div>
    `;

    return root;
  }

  btn.addEventListener('click', async (event) => {
    event.preventDefault();
    const oldText = btn.textContent;
    btn.textContent = 'Preparing CV…';
    btn.style.pointerEvents = 'none';

    try {
      const cv = createCV();
      cv.style.position = 'fixed';
      cv.style.left = '-99999px';
      cv.style.top = '0';
      document.body.appendChild(cv);

      const filename = 'Md_Abusaeed_CV.pdf';
      await html2pdf().set({
        margin: 0,
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
        jsPDF: { unit: 'px', format: [794, 1123], orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      }).from(cv).save();

      cv.remove();
    } catch (err) {
      console.error(err);
      alert('Could not generate the CV. Please refresh the page and try again.');
    } finally {
      btn.textContent = oldText;
      btn.style.pointerEvents = '';
    }
  });
})();
