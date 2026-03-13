// Show screenshots when they load, hide placeholder
document.querySelectorAll('.screen-img').forEach(img => {
  if (img.complete && img.naturalWidth > 0) {
    img.classList.add('loaded');
    img.closest('.phone-screen').querySelector('.screen-placeholder')?.classList.add('hidden');
  } else {
    img.addEventListener('load', () => {
      img.classList.add('loaded');
      img.closest('.phone-screen').querySelector('.screen-placeholder')?.classList.add('hidden');
    });
  }
});

// Form success message
const form = document.getElementById('suggestion-form');
const successMsg = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        successMsg.classList.add('visible');
        btn.textContent = 'Sent!';
        setTimeout(() => {
          successMsg.classList.remove('visible');
          btn.textContent = 'Send Suggestion';
          btn.disabled = false;
        }, 5000);
      } else {
        btn.textContent = 'Send Suggestion';
        btn.disabled = false;
        alert('Something went wrong. Please email us directly at stadiscout@gmail.com');
      }
    } catch {
      btn.textContent = 'Send Suggestion';
      btn.disabled = false;
      alert('Something went wrong. Please email us directly at stadiscout@gmail.com');
    }
  });
}

// Smooth nav link active state
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? '#FFB81C'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));
