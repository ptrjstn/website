(() => {
  function renderFragments() {
    const footerMount = document.getElementById("sharedFooter");
    if (!footerMount) return;

    const year = String(new Date().getFullYear());
    footerMount.innerHTML = `
    <footer class="foot">
      <span class="muted">© ${year}</span>
    </footer>`;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderFragments, { once: true });
  } else {
    renderFragments();
  }
})();
