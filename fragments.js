(() => {
  function renderFragments() {
    const metaMount = document.getElementById("sharedMeta");
    if (metaMount) {
      metaMount.innerHTML = `
    <div class="meta-row">
      <section id="about" class="block">
        <div class="label">about</div>
        <p class="text">my creative playground.</p>
      </section>

      <section id="contact" class="block">
        <div class="label">contact</div>
        <p class="text">
          <a href="mailto:peter.justen@icloud.com">peter.justen@icloud.com</a>
        </p>
      </section>
    </div>`;
    }

    const footerMount = document.getElementById("sharedFooter");
    if (footerMount) {
      footerMount.innerHTML = `
    <footer class="foot">
      <span class="muted">© <span id="year"></span></span>
      <span class="muted">/</span>
      <span class="muted">local</span>
      <button id="themeToggle" class="btn secondary" type="button">theme: classic</button>
    </footer>`;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderFragments, { once: true });
  } else {
    renderFragments();
  }
})();
