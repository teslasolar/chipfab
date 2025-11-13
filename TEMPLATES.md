# 📐 LocalChip Templating System

**Problem:** Navigation and common elements duplicated across 33+ HTML files
**Solution:** Single source of truth in `templates.js`

## 🚀 Quick Start

### Using Templates in New Pages

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your Page | LocalChip</title>
    <link rel="stylesheet" href="../style.css">
    <script src="../templates.js"></script>
</head>
<body>
    <!-- Auto-injected header -->
    <div id="header-placeholder"
         data-title="🎯 Your Title"
         data-subtitle="Your subtitle here"></div>

    <!-- Auto-injected navigation -->
    <div id="nav-placeholder"></div>

    <!-- Your content here -->
    <section>
        <h2>Your Content</h2>
        <p>Page-specific content goes here</p>
    </section>

    <!-- Auto-injected footer -->
    <div id="footer-placeholder"></div>
</body>
</html>
```

## 📝 Template Options

### Navigation Only
```html
<div id="nav-placeholder"></div>
```
Auto-injects the standard navigation bar.

### Header with Title
```html
<div id="header-placeholder"
     data-title="🎯 Page Title"
     data-subtitle="Optional subtitle"></div>
```

### Footer
```html
<div id="footer-placeholder"></div>
```

### Breadcrumb Navigation
```html
<div id="breadcrumb-placeholder"
     data-path='[{"name":"Docs"},{"name":"Safety"}]'></div>
```

## 🔧 Updating Navigation Site-Wide

Edit **one file**: `templates.js`

```javascript
nav: (currentPage = '') => `
    <nav>
        <a href="/chipfab/">Home</a>
        <a href="/chipfab/components/">Components</a>
        // Add new link here
        <a href="/chipfab/new-section/">New Section</a>
    </nav>
`
```

All pages update automatically! 🎉

## 🔄 Migrating Existing Pages

### Before (duplicated nav on every page)
```html
<nav>
    <a href="../index.html">← Home</a>
    <a href="../factory3d/index.html">🏭 3D Factory</a>
</nav>
```

### After (templated)
```html
<script src="../templates.js"></script>
...
<div id="nav-placeholder"></div>
```

## 📂 File Structure

```
chipfab/
├── templates.js          # Single source of truth
├── index.html            # Main page
├── components/
│   ├── design.html       # Uses templates.js
│   └── wafer.html        # Uses templates.js
├── docs/
│   └── safety.html       # Uses templates.js
└── factory3d/
    └── index.html        # Custom nav (full screen)
```

## ✅ Benefits

- **Single source**: Edit nav once, updates everywhere
- **Consistency**: All pages use same navigation
- **Maintenance**: 10x easier to update site-wide elements
- **No build step**: Pure JavaScript, works on GitHub Pages
- **Backward compatible**: Existing pages still work

## 🎯 Best Practices

1. **New pages**: Always use template placeholders
2. **Special pages**: Can still use custom nav if needed (like 3D factory)
3. **Update templates.js**: When adding site-wide features
4. **Keep paths relative**: Templates handle path resolution

## 🔮 Future Enhancements

- [ ] Add theme switcher to templates
- [ ] Include search functionality
- [ ] Add language selection
- [ ] Analytics tracking code
- [ ] Cookie consent banner

---

**Note:** The 3D factory page uses custom navigation for full-screen experience.
Regular content pages should use the templating system.
