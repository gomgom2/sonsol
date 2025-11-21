function initFlipCard(options = {}, element = null) {
  const {
    rootSelector = '.flip-box',
    cardSelector = '.card',
    frontSelector = '.front',
    backSelector = '.back',
    axis = 'Y',
    slightDeg = 20,
    fullDeg = 180,
    duration = 800,
    easing = 'ease-in-out',
    runSlightOnEnter = true,
    a11y = true
  } = options;

  const root = element || document.querySelector(rootSelector);
  if (!root) return;

  /* 이하 내용은 그대로 유지 */
  const card = root.querySelector(cardSelector) || root;
  card.style.transformStyle = 'preserve-3d';
  card.style.transition = `transform ${duration}ms ${easing}`;
  [frontSelector, backSelector].forEach(sel => {
    const face = root.querySelector(sel);
    if (face) face.style.backfaceVisibility = 'hidden';
  });
  const back = root.querySelector(backSelector);
  if (back) back.style.transform = `rotate${axis}(${fullDeg}deg)`;

  let flipped = false;

  if (runSlightOnEnter) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          card.style.transform = `rotate${axis}(0deg)`;
          requestAnimationFrame(() => {
            card.style.transform = `rotate${axis}(${slightDeg}deg)`;
            setTimeout(() => {
              card.style.transform = `rotate${axis}(0deg)`;
            }, Math.min(600, duration));
          });
          obs.unobserve(entry.target);
        }
      });
    });
    io.observe(root);
  }

  function toggleFlip() {
    flipped = !flipped;
    card.style.transform = `rotate${axis}(${flipped ? fullDeg : 0}deg)`;
    if (a11y) root.setAttribute('aria-pressed', String(flipped));
  }

  root.addEventListener('pointerup', () => toggleFlip(), { passive: true });
  if (a11y) {
    root.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFlip();
      }
    });
  }

  return { toggle: toggleFlip, isFlipped: () => flipped, root, card };
}