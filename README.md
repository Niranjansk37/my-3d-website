# 3D Interactive Website

A fully functional 3D interactive website built with Three.js and modern web technologies.

## Features

✨ **3D Background**: Interactive particle system with geometric shapes
🎨 **Modern Design**: Cyberpunk-inspired color scheme with gradient effects
📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
⚡ **Smooth Animations**: Scroll-based animations and parallax effects
🎯 **Interactive Elements**: Hover effects, 3D models, and dynamic content
📧 **Contact Form**: Functional contact form with validation
🔥 **Performance Optimized**: Efficient rendering and smooth 60fps animations

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations and transitions
- **JavaScript (ES6+)**: Interactive functionality
- **Three.js**: 3D graphics and animations
- **WebGL**: Hardware-accelerated graphics

## How to Open in VS Code

### Method 1: Using Live Server (Recommended)

1. **Install Live Server Extension**:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
   - Search for "Live Server" by Ritwick Dey
   - Click Install

2. **Open the Project**:
   - File → Open Folder
   - Select the folder containing these files

3. **Launch the Website**:
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Your default browser will open with the website
   - Changes will auto-reload

### Method 2: Direct Browser Open

1. **Locate the file**:
   - Navigate to the folder containing `index.html`

2. **Open in browser**:
   - Double-click `index.html`
   - Or right-click → Open with → Your Browser

### Method 3: Using Python Server

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then visit: `http://localhost:8000`

## File Structure

```
project/
│
├── index.html          # Main HTML file
├── style.css           # All styles and animations
├── script.js           # JavaScript and Three.js logic
└── README.md           # This file
```

## Features Breakdown

### 1. Hero Section
- Animated gradient text with glitch effect
- Interactive 3D particle background
- Smooth scroll indicator

### 2. About Section
- Rotating 3D icosahedron
- Feature list with custom bullets
- Responsive grid layout

### 3. Projects Section
- Three unique 3D models (Sphere, Torus Knot, Octahedron)
- Hover effects with card elevation
- Interactive project buttons

### 4. Contact Section
- Working contact form
- Form validation
- Styled input fields with focus effects
- Contact information cards

### 5. Navigation
- Fixed navbar with blur effect
- Mobile-responsive burger menu
- Smooth scrolling to sections
- Active state tracking

## Customization Guide

### Change Colors

In `style.css`, modify the CSS variables:

```css
:root {
    --primary-color: #00ffff;    /* Cyan */
    --secondary-color: #ff00ff;  /* Magenta */
    --dark-bg: #0a0a0a;         /* Dark background */
    --light-text: #ffffff;       /* White text */
    --gray-text: #a0a0a0;       /* Gray text */
}
```

### Modify 3D Elements

In `script.js`, find the respective functions:

- **Particle System**: `createParticleSystem()`
- **Background Shapes**: `createGeometricShapes()`
- **About Section**: `initAboutCanvas()`
- **Project Models**: `initProjectCanvases()`

### Add New Sections

1. Add HTML in `index.html`:
```html
<section id="new-section" class="new-section">
    <div class="container">
        <h2 class="section-title">New Section</h2>
        <!-- Your content -->
    </div>
</section>
```

2. Add styles in `style.css`:
```css
.new-section {
    min-height: 100vh;
    padding: 120px 0;
}
```

3. Add navigation link:
```html
<li><a href="#new-section" class="nav-link">New Section</a></li>
```

## Performance Tips

1. **Reduce Particles**: In `createParticleSystem()`, change `particlesCount` to a lower number
2. **Simplify Models**: Use simpler geometries or reduce segments
3. **Disable Effects**: Comment out animations you don't need
4. **Optimize Images**: Use compressed images if you add any

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

**Note**: Requires WebGL support. Check at: https://get.webgl.org/

## Troubleshooting

### White/Black Screen
- Check browser console for errors (F12)
- Ensure Three.js CDN is accessible
- Try a different browser

### No 3D Effects
- Your GPU may not support WebGL
- Update graphics drivers
- Try Chrome or Firefox

### Slow Performance
- Reduce particle count in `script.js`
- Close other browser tabs
- Check GPU usage in Task Manager

### Mobile Issues
- Some older mobile devices may struggle with 3D rendering
- Consider reducing effects for mobile using media queries

## Deployment

### GitHub Pages
1. Create a GitHub repository
2. Push your files
3. Go to Settings → Pages
4. Select main branch
5. Your site will be live at `https://username.github.io/repo-name`

### Netlify
1. Drag and drop your folder to Netlify
2. Or connect your GitHub repository
3. Instant deployment with custom domain support

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project folder
3. Follow prompts for deployment

## Contributing

Feel free to fork, modify, and use this project for your own purposes!

## License

MIT License - Free to use for personal and commercial projects

## Credits

- Built with [Three.js](https://threejs.org/)
- Inspired by modern web design trends
- Created with ❤️ for the developer community

## Support

If you encounter any issues or have questions:
1. Check the browser console for errors
2. Verify all files are in the same directory
3. Ensure you have internet connection (for Three.js CDN)
4. Try using Live Server instead of opening directly

---

**Enjoy building with 3D! 🚀**
