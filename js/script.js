
/* DOM */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));



(function projectSearchInit() {
  const search = $('#projectSearch');
  const cards = $$('.projects-container .project-item');
  if (!search || cards.length === 0) return;

  const titleOf = (el) =>
    (el.getAttribute('data-title') || el.querySelector('h3')?.textContent || '').toLowerCase();

  const filter = (q) => {
    const needle = (q || '').trim().toLowerCase();
    cards.forEach(card => {
      const title = titleOf(card);
      card.style.display = needle === '' || title.includes(needle) ? '' : 'none';
    });
  };

  search.addEventListener('input', e => filter(e.target.value));
  filter('');
})();

/* Contact Form Validation */
(function contactFormInit() {
  const form = $('#contact form');
  if (!form) return;

  const name = $('#name');
  const email = $('#email');
  const message = $('#message');

  const nameErr = $('#nameError');
  const emailErr = $('#emailError');
  const msgErr = $('#messageError');

  const statusEl = $('#formStatus');

  const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const setError = (input, errEl, msg) => {
    errEl.textContent = msg || '';
    msg ? input.setAttribute('aria-invalid', 'true') : input.removeAttribute('aria-invalid');
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;

    if (!name.value.trim()) { setError(name, nameErr, 'Name is required.'); ok = false; }
    else setError(name, nameErr, '');

    const em = email.value.trim();
    if (!em) { setError(email, emailErr, 'Email is required.'); ok = false; }
    else if (!isEmail(em)) { setError(email, emailErr, 'Enter a valid email.'); ok = false; }
    else setError(email, emailErr, '');

    if (!message.value.trim()) { setError(message, msgErr, 'Message cannot be empty.'); ok = false; }
    else setError(message, msgErr, '');

    statusEl.hidden = false;
    statusEl.textContent = ok ?
      '✅ Message sent! Thanks for reaching out.' :
      'Please fix the errors above.';

    if (ok) form.reset();
  });
})();

/* 4) GITHUB REPO COUNT FETCH */
(function githubStatsInit() {
  const form = $('#ghForm') || $('#githubForm');
  const input = $('#ghInput');
  const status = $('#ghStatus') || $('#ghResult');
  const result = $('#ghResult') || $('#ghStatus');
  const retry = $('#ghRetry');

  if (!form || !input || !status || !result) return;

  const loading = () => {
    status.textContent = 'Loading…';
    status.hidden = false;
    result.hidden = true;
    retry && (retry.hidden = true);
  };

  const fail = (msg) => {
    status.textContent = msg || 'Could not fetch GitHub data.';
    status.hidden = false;
    result.hidden = true;
    retry && (retry.hidden = false);
  };

  const success = (txt) => {
    result.textContent = txt;
    status.hidden = true;
    result.hidden = false;
    retry && (retry.hidden = true);
  };

  const parseUsername = raw => {
    if (!raw) return '';
    let v = raw.trim();
    v = v.replace(/^https?:\/\/(www\.)?github\.com\//i, '');
    v = v.replace(/^@/, '');
    return v.split(/[/?#]/)[0];
  };

  const run = async () => {
    const username = parseUsername(input.value);
    if (!username) return fail('Enter a valid GitHub username or link.');

    try {
      loading();
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
      if (!res.ok) throw 0;
      const data = await res.json();
      success(`${username} has ${data.public_repos} public repositories.`);
    } catch {
      fail('Unable to load data. Check your connection or username.');
    }
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    run();
  });
  retry?.addEventListener('click', run);
})();