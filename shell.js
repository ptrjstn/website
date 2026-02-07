(() => {
  const THEME_KEY = "site_theme";

  function setYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  function getTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === "function" ? "function" : "classic";
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === "function") {
      root.setAttribute("data-theme", "function");
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function updateThemeButton(theme) {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    btn.textContent = theme === "function" ? "theme: function" : "theme: classic";
    btn.className = theme === "function" ? "btn primary" : "btn secondary";
  }

  function pickTargetWidth() {
    const dropsWrap = document.querySelector(".drops-fade");
    if (dropsWrap) return dropsWrap.getBoundingClientRect().width;

    const wrap = document.querySelector(".wrap");
    if (!wrap) return 0;
    const cs = window.getComputedStyle(wrap);
    return wrap.clientWidth - parseFloat(cs.paddingLeft || 0) - parseFloat(cs.paddingRight || 0);
  }

  function fitTopBottom(el, fitWidth) {
    const cs = window.getComputedStyle(el);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return "+----------+";

    ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const unit = Math.max(1, ctx.measureText("-").width);
    let widthChars = Math.max(12, Math.floor(fitWidth / unit));

    while (widthChars >= 12) {
      const candidate = "+" + "-".repeat(Math.max(1, widthChars - 2)) + "+";
      if (ctx.measureText(candidate).width <= fitWidth + 0.5) return candidate;
      widthChars -= 1;
    }

    return "+----------+";
  }

  function renderAsciiShell() {
    const headerEl = document.querySelector('[data-ascii="header"]');
    if (!headerEl) return;

    const fitWidth = pickTargetWidth();
    if (!fitWidth) return;

    const headerTopBottom = fitTopBottom(headerEl, fitWidth);
    const widthChars = headerTopBottom.length;
    const title = (headerEl.dataset.title || "").toLowerCase();
    const padSpace = Math.max(0, widthChars - 2 - title.length);
    const left = Math.floor(padSpace / 2);
    const right = padSpace - left;
    const mid = "|" + " ".repeat(left) + title + " ".repeat(right) + "|";

    headerEl.textContent = headerTopBottom + "\n" + mid + "\n" + headerTopBottom;

    const lineEls = document.querySelectorAll('[data-ascii="line"]');
    lineEls.forEach((lineEl) => {
      const lineTopBottom = fitTopBottom(lineEl, fitWidth);
      lineEl.textContent = lineTopBottom;
    });
  }

  function initThemeToggle() {
    let theme = getTheme();
    applyTheme(theme);
    updateThemeButton(theme);

    const btn = document.getElementById("themeToggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
      theme = theme === "function" ? "classic" : "function";
      localStorage.setItem(THEME_KEY, theme);
      applyTheme(theme);
      updateThemeButton(theme);
      renderAsciiShell();
    });
  }

  function initShell() {
    initThemeToggle();
    setYear();
    renderAsciiShell();

    window.addEventListener("resize", renderAsciiShell);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(renderAsciiShell).catch(() => {});
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShell, { once: true });
  } else {
    initShell();
  }
})();
