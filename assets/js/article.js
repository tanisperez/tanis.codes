(function () {
    'use strict';

    // Prism's toolbar/show-language plugins already wrap each code block in
    // .code-toolbar > .toolbar with a language label. There is no
    // copy-to-clipboard plugin in the bundle, so we add our own button into
    // that same toolbar once Prism has run.
    function initCopyCodeButtons() {
        var toolbars = document.querySelectorAll('.code-toolbar .toolbar');
        if (!toolbars.length) return;

        toolbars.forEach(function (toolbar) {
            if (toolbar.querySelector('.copy-code-button')) return;

            var wrapper = toolbar.closest('.code-toolbar');
            var codeEl = wrapper && wrapper.querySelector('pre code');
            if (!codeEl) return;

            var item = document.createElement('div');
            item.className = 'toolbar-item';

            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'copy-code-button';
            button.textContent = 'Copy code';

            button.addEventListener('click', function () {
                if (!navigator.clipboard || !navigator.clipboard.writeText) return;

                navigator.clipboard.writeText(codeEl.textContent).then(function () {
                    var original = button.textContent;
                    button.textContent = 'Copied!';
                    button.disabled = true;
                    setTimeout(function () {
                        button.textContent = original;
                        button.disabled = false;
                    }, 1500);
                }).catch(function () {
                    /* clipboard write denied/unavailable: no-op */
                });
            });

            item.appendChild(button);
            toolbar.appendChild(item);
        });
    }

    // Reading progress bar: fills .reading-progress__fill based on how far
    // the reader has scrolled through .post-content.
    function initReadingProgress() {
        var fill = document.querySelector('.reading-progress__fill');
        var article = document.querySelector('.post-content');
        if (!fill || !article) return;

        var ticking = false;

        function update() {
            ticking = false;

            var articleTop = article.getBoundingClientRect().top + window.scrollY;
            var articleHeight = article.offsetHeight;
            var viewportHeight = window.innerHeight;

            var total = articleHeight;
            var scrolled = window.scrollY + viewportHeight - articleTop;
            var percent = total > 0 ? (scrolled / total) * 100 : 0;
            percent = Math.min(100, Math.max(0, percent));

            fill.style.width = percent + '%';
        }

        function onScroll() {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(update);
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        update();
    }

    // Prism highlights code (and builds .code-toolbar) on DOMContentLoaded,
    // via a script tag that runs after this one, so its own listener fires
    // after ours. Waiting for 'load' guarantees Prism has already run.
    window.addEventListener('load', function () {
        initCopyCodeButtons();
        initReadingProgress();
    });
})();
