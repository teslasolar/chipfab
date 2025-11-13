// 🔬 LocalChip - Shared Templates
// Single source of truth for navigation, header, footer

const LocalChipTemplates = {
    // Auto-detect base path (works on GitHub Pages and locally)
    getBasePath: function() {
        const path = window.location.pathname;
        // If on GitHub Pages (has /chipfab/ in path), use /chipfab/
        // Otherwise use relative path
        return path.includes('/chipfab/') ? '/chipfab/' : './';
    },

    // Navigation - used on all pages
    nav: (currentPage = '') => {
        const base = LocalChipTemplates.getBasePath();
        return `
        <nav>
            <a href="${base}">Home</a>
            <a href="${base}#spec">Spec</a>
            <a href="${base}components/">Components</a>
            <a href="${base}factory3d/index.html" style="background: linear-gradient(45deg, #00ff00, #00ffff); color: #000; font-weight: bold;">🏭 3D Factory</a>
            <a href="${base}docs/">Docs</a>
            <a href="${base}flow/">Flow</a>
            <a href="${base}docs/getting-started.html">Start</a>
            <a href="${base}docs/faq.html">FAQ</a>
        </nav>
    `;
    },

    // Header - optional, for pages that need it
    header: (title, subtitle) => `
        <header>
            <h1>${title}</h1>
            ${subtitle ? `<p class="tagline">${subtitle}</p>` : ''}
        </header>
    `,

    // Footer - consistent across all pages
    footer: () => {
        const base = LocalChipTemplates.getBasePath();
        return `
        <footer>
            <p>🚀 Build → Test → Ship | 96% Margin | 60% Yield</p>
            <p style="margin-top: 10px; font-size: 0.9em; opacity: 0.7;">
                <a href="https://github.com/teslasolar/chipfab" target="_blank" style="color: #00ff00;">GitHub</a> |
                <a href="${base}docs/safety.html" style="color: #ff6600;">⚠️ Safety</a> |
                <a href="${base}docs/faq.html" style="color: #00ffff;">FAQ</a>
            </p>
        </footer>
    `;
    },

    // Breadcrumb navigation helper
    breadcrumb: (path) => {
        const base = LocalChipTemplates.getBasePath();
        const parts = path.filter(p => p);
        return `
            <div style="padding: 10px; margin: 10px 0; background: rgba(0,255,0,0.1); border-left: 3px solid #00ff00;">
                <a href="${base}">🏠 Home</a>
                ${parts.map((part, i) => {
                    const url = base + parts.slice(0, i + 1).join('/');
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
