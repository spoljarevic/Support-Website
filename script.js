(function () {
  var THEME_KEY = 'theme';

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    updateToggleLabel();
  }

  function updateToggleLabel() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var isDark = getTheme() === 'dark';
    btn.textContent = isDark ? 'Light mode' : 'Dark mode';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    updateToggleLabel();
    toggle.addEventListener('click', function () {
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = this.getAttribute('data-copy');
      var el = document.getElementById(id);
      if (!el) return;
      var text = el.textContent;
      navigator.clipboard.writeText(text).then(function () {
        var was = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = was;
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });
})();
