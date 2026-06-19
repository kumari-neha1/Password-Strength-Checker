const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');
const scoreText = document.getElementById('score-text');
const toggleBtn = document.getElementById('toggle-btn');

const criteria = {
  len: value => value.length >= 8,
  upper: value => /[A-Z]/.test(value),
  lower: value => /[a-z]/.test(value),
  num: value => /\d/.test(value),
  special: value => /[^A-Za-z0-9]/.test(value)
};

function updatePasswordStrength() {
  const value = passwordInput.value;
  const checks = Object.fromEntries(
    Object.entries(criteria).map(([key, test]) => [key, test(value)])
  );

  Object.entries(checks).forEach(([key, passed]) => {
    const el = document.getElementById(key);
    const text = el.textContent.replace(/^([✓✗]\s)/, '');
    el.className = passed ? 'valid' : 'invalid';
    el.textContent = `${passed ? '✓' : '✗'} ${text}`;
  });

  const score = Object.values(checks).filter(Boolean).length;
  let label = 'Very Weak';
  let color = '#ef4444';

  if (score === 5) {
    label = 'Strong';
    color = '#16a34a';
  } else if (score === 4) {
    label = 'Good';
    color = '#22c55e';
  } else if (score === 3) {
    label = 'Fair';
    color = '#f59e0b';
  } else if (score === 2) {
    label = 'Weak';
    color = '#f97316';
  }

  const percent = (score / 5) * 100;
  strengthBar.style.width = `${percent}%`;
  strengthBar.style.background = color;
  strengthText.textContent = label;
  strengthText.style.color = color;
  scoreText.textContent = `${score} / 5`;
}

passwordInput.addEventListener('input', updatePasswordStrength);

toggleBtn.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  toggleBtn.textContent = isPassword ? 'Hide' : 'Show';
});

updatePasswordStrength();
