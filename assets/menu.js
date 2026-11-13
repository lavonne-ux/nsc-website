
(function () {
  var t = document.getElementById('menu-toggle');
  var n = document.getElementById('site-nav');
  t.addEventListener('click', function () {
    var open = n.classList.toggle('open');
    t.setAttribute('aria-expanded', open ? 'true' : 'false');
    t.textContent = open ? 'Close' : 'Menu';
  });
  n.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && n.classList.contains('open')) {
      n.classList.remove('open'); t.setAttribute('aria-expanded', 'false'); t.textContent = 'Menu';
    }
  });
  document.querySelectorAll('.copy').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.getAttribute('data-copy');
      var done = function () { b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy'; }, 1600); };
      var fallback = function () {
        var target = b.parentElement.querySelector('.v');
        var r = document.createRange(); r.selectNodeContents(target);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        b.textContent = 'Selected';
        setTimeout(function () { b.textContent = 'Copy'; }, 1600);
      };
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, fallback);
        } else { fallback(); }
      } catch (err) { fallback(); }
    });
  });
})();
