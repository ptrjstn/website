(() => {
  function renderFragments() {
    const footerMount = document.getElementById("sharedFooter");
    if (!footerMount) return;

    const year = String(new Date().getFullYear());
    footerMount.innerHTML = `
    <footer class="foot">
      <span class="muted">© ${year}</span>
      <span class="muted">/</span>
      <a class="foot-contact" href="mailto:peter.justen@icloud.com" aria-label="contact">contact</a>
    </footer>`;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderFragments, { once: true });
  } else {
    renderFragments();
  }
})();
