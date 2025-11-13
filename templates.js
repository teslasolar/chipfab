// 🔬 LocalChip - Shared Templates
// Single source of truth for navigation, header, footer

const LocalChipTemplates = {
    // Navigation - used on all pages
    nav: (currentPage = '') => `
        <nav>
            <a href="/chipfab/">Home</a>
            <a href="/chipfab/#spec">Spec</a>
            <a href="/chipfab/components/">Components</a>
            <a href="/chipfab/factory3d/index.html" style="background: linear-gradient(45deg, #00ff00, #00ffff); color: #000; font-weight: bold;">🏭 3D Factory</a>
            <a href="/chipfab/docs/">Docs</a>
            <a href="/chipfab/flow/">Flow</a>
            <a href="/chipfab/docs/getting-started.html">Start</a>
            <a href="/chipfab/docs/faq.html">FAQ</a>
        </nav>
    `,

    // Header - optional, for pages that need it
    header: (title, subtitle) => `
        <header>
            <h1>${title}</h1>
            ${subtitle ? `<p class="tagline">${subtitle}</p>` : ''}
        </header>
    `,

    // Footer - consistent across all pages
    footer: () => `
        <footer>
            <p>🚀 Build → Test → Ship | 96% Margin | 60% Yield</p>
            <p style="margin-top: 10px; font-size: 0.9em; opacity: 0.7;">
                <a href="https://github.com/teslasolar/chipfab" target="_blank" style="color: #00ff00;">GitHub</a> |
                <a href="/chipfab/docs/safety.html" style="color: #ff6600;">⚠️ Safety</a> |
                <a href="/chipfab/docs/faq.html" style="color: #00ffff;">FAQ</a>
            </p>
        </footer>
    `,

    // Breadcrumb navigation helper
    breadcrumb: (path) => {
        const parts = path.filter(p => p);
        return `
            <div style="padding: 10px; margin: 10px 0; background: rgba(0,255,0,0.1); border-left: 3px solid #00ff00;">
                <a href="/chipfab/">🏠 Home</a>
                ${parts.map((part, i) => {
                    const url = '/chipfab/' + parts.slice(0, i + 1).join('/');
                    return ` → <a href="${url}">${part.name}</a>`;
                }).join('')}
            </div>
        `;
    },

    // Initialize - inject templates into page
    init: function() {
        // Inject nav if placeholder exists
        const navPlaceholder = document.getElementById('nav-placeholder');
        if (navPlaceholder) {
            navPlaceholder.innerHTML = this.nav();
        }

        // Inject footer if placeholder exists
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = this.footer();
        }

        // Inject header if placeholder exists
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            const title = headerPlaceholder.dataset.title || '🔬 LocalChip';
            const subtitle = headerPlaceholder.dataset.subtitle || '';
            headerPlaceholder.innerHTML = this.header(title, subtitle);
        }

        // Inject breadcrumb if placeholder exists
        const breadcrumbPlaceholder = document.getElementById('breadcrumb-placeholder');
        if (breadcrumbPlaceholder && breadcrumbPlaceholder.dataset.path) {
            const path = JSON.parse(breadcrumbPlaceholder.dataset.path);
            breadcrumbPlaceholder.innerHTML = this.breadcrumb(path);
        }
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => LocalChipTemplates.init());
} else {
    LocalChipTemplates.init();
}
