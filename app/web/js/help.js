
let currentStep = 1;

// ── Quick select buttons ──
function quickSelect(btn, type) {
  document.querySelectorAll('.quick-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  // Auto fill help type select in step 2
  const sel = document.getElementById('helpType');
  for (let i = 0; i < sel.options.length; i++) {
    if (sel.options[i].text.toLowerCase().includes(type.toLowerCase())) {
      sel.selectedIndex = i;
      break;
    }
  }
}

// ── Step navigation ──
function goStep(from, to) {
  if (to > from && !validateStep(from)) return;

  document.getElementById('step' + from).classList.remove('active');

  // update dots
  const dot = document.getElementById('dot' + from);
  dot.classList.remove('active');
  dot.classList.add('done');
  dot.innerHTML = '<i class="fas fa-check" style="font-size:0.75rem"></i>';

  if (from < to) {
    const line = document.getElementById('line' + from);
    if (line) line.classList.add('done');
  } else {
    // going back
    const dot2 = document.getElementById('dot' + to);
    dot2.classList.remove('done');
    dot2.innerHTML = to;
    const line = document.getElementById('line' + to);
    if (line) line.classList.remove('done');
    dot.classList.remove('done');
    dot.classList.add('active');
    dot.innerHTML = from;
  }

  if (to <= from) {
    const dotF = document.getElementById('dot' + from);
    dotF.classList.remove('done');
    dotF.classList.add('active');
    dotF.innerHTML = from;
  }

  if (to === 4) buildReview();

  document.getElementById('step' + to).classList.add('active');
  document.getElementById('dot' + to).classList.add('active');
  currentStep = to;
  window.scrollTo({ top: 300, behavior: 'smooth' });
}

// ── Validation ──
function validateStep(step) {
  let ok = true;

  const hide = id => { document.getElementById(id).style.display = 'none'; };
  const show = id => { document.getElementById(id).style.display = 'block'; ok = false; };

  if (step === 1) {
    hide('nameErr'); hide('locationErr');
    if (!document.getElementById('name').value.trim()) show('nameErr');
    if (!document.getElementById('location').value.trim()) show('locationErr');
  }

  if (step === 2) {
    hide('disErr'); hide('helpTypeErr');
    if (!document.querySelector('input[name="disability"]:checked')) show('disErr');
    if (!document.getElementById('helpType').value) show('helpTypeErr');
  }

  if (step === 3) {
    hide('urgErr'); hide('descErr');
    if (!document.querySelector('input[name="urgency"]:checked')) show('urgErr');
    if (!document.getElementById('description').value.trim()) show('descErr');
  }

  return ok;
}

// ── Build review summary ──
function buildReview() {
  const dis = document.querySelector('input[name="disability"]:checked');
  const urg = document.querySelector('input[name="urgency"]:checked');
  document.getElementById('reviewBox').innerHTML = `
        <b>Name:</b> ${document.getElementById('name').value}<br>
        <b>Location:</b> ${document.getElementById('location').value}<br>
        <b>Email:</b> ${document.getElementById('email').value || '—'}<br>
        <b>Phone:</b> ${document.getElementById('phone').value || '—'}<br>
        <b>Disability:</b> ${dis ? dis.value : '—'}<br>
        <b>Support Needed:</b> ${document.getElementById('helpType').value}<br>
        <b>Urgency:</b> ${urg ? urg.value : '—'}<br>
        <b>Message:</b> ${document.getElementById('description').value}
      `;
}

// ── Submit ──
function submitForm() {
  // Hide all steps, show success
  document.getElementById('step4').classList.remove('active');
  document.getElementById('successState').style.display = 'block';

  // TODO: replace with fetch() to backend /api/help
}

