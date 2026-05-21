// TOC scrollspy: highlights the current section in the right-side sidebar
// while scrolling. No-op on pages without `.toc-sidebar`.
(function () {
  "use strict";

  function init() {
    var sidebar = document.querySelector(".toc-sidebar");
    if (!sidebar) return;

    var links = Array.prototype.slice.call(
      sidebar.querySelectorAll('a[href^="#"]')
    );
    if (links.length === 0) return;

    // Build map: id -> link
    var linkById = Object.create(null);
    var headings = [];
    links.forEach(function (a) {
      var id = decodeURIComponent(a.getAttribute("href").slice(1));
      if (!id) return;
      var el = document.getElementById(id);
      if (!el) return;
      linkById[id] = a;
      headings.push(el);
    });
    if (headings.length === 0) return;

    var currentActive = null;
    function setActive(id) {
      if (!id || !linkById[id]) return;
      if (currentActive === linkById[id]) return;
      if (currentActive) currentActive.classList.remove("active");
      currentActive = linkById[id];
      currentActive.classList.add("active");
    }

    // Track which headings are currently intersecting; pick the topmost one.
    var visible = new Set();

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var id = entry.target.id;
          if (entry.isIntersecting) {
            visible.add(id);
          } else {
            visible.delete(id);
          }
        });

        if (visible.size > 0) {
          // Pick the visible heading with the smallest top offset (closest to top of viewport).
          var topId = null;
          var topY = Infinity;
          visible.forEach(function (id) {
            var el = document.getElementById(id);
            if (!el) return;
            var y = el.getBoundingClientRect().top;
            if (y < topY) {
              topY = y;
              topId = id;
            }
          });
          if (topId) setActive(topId);
        } else {
          // None intersecting (e.g. between sections or scrolled past).
          // Fallback: pick the last heading whose top is above the offset line.
          var line = 100; // px from viewport top
          var lastAbove = null;
          for (var i = 0; i < headings.length; i++) {
            var rect = headings[i].getBoundingClientRect();
            if (rect.top - line <= 0) {
              lastAbove = headings[i];
            } else {
              break;
            }
          }
          if (lastAbove) setActive(lastAbove.id);
        }
      },
      {
        // Treat a heading as "active" once it crosses ~80px from the top
        // and stays active until ~30% from the bottom.
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      }
    );

    headings.forEach(function (h) {
      observer.observe(h);
    });

    // Initial highlight: first heading or whatever the URL hash points to.
    if (location.hash) {
      var hashId = decodeURIComponent(location.hash.slice(1));
      if (linkById[hashId]) setActive(hashId);
    } else {
      setActive(headings[0].id);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
