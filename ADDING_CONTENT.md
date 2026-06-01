# How to Add Projects & Certifications

This guide explains how to add new projects and certifications to your portfolio website with minimal effort.

## Overview

Your website now uses a centralized **`data.json`** file to manage all projects and certifications. This means:
- ✅ Add items in **one place** instead of three
- ✅ Navigation, search, and display all update automatically
- ✅ No HTML editing needed for basic content
- ✅ Easy to maintain and scale

---

## Adding a New Project

### Step 1: Add to `data.json`

Open `data.json` and add a new entry to the `"projects"` array:

```json
{
  "id": "myNewProject",
  "title": "My New Project",
  "href": "projects/myNewProject/",
  "keywords": "python docker web automation"
}
```

**Fields:**
- `id`: Unique identifier (use camelCase, no spaces)
- `title`: Display name of the project
- `href`: URL path to the project page (must match folder name)
- `keywords`: Space-separated search terms (helps with Quick Launch search)

### Step 2: Create the Project Folder & Page

1. Create a new folder: `projects/myNewProject/`
2. Create `projects/myNewProject/index.html` with your project content

**Template:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>My New Project | Omar Mushtaq Portfolio</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#111315">
    <meta name="description" content="A description of my new project.">
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
    <div class="navbar-container">
        <nav class="navbar">
            <ul>
                <li><a href="../">Home</a></li>
                <li class="dropdown">
                    <a href="../projects/" class="dropdown-toggle">Projects</a>
                    <ul class="dropdown-menu">
                        <li><a href="../projects/">All Projects</a></li>
                        <!-- Other projects auto-populate from data.json -->
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="../certificates/" class="dropdown-toggle">Certifications</a>
                    <ul class="dropdown-menu">
                        <li><a href="../certificates/">All Certifications</a></li>
                        <li><a href="../certificates/#in-progress">In Progress</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="../contacts/" class="dropdown-toggle">Contact</a>
                    <ul class="dropdown-menu">
                        <li><a href="../contacts/">Contact Page</a></li>
                        <li><a href="mailto:omarmushtaq2029@gmail.com">Email Me</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
    <main class="page-shell">
        <section class="page-hero scroll-reveal">
            <p class="eyebrow">Project</p>
            <h1>My New Project</h1>
            <p class="page-lead">A detailed description of what this project does and why it matters.</p>
        </section>

        <!-- Add your project content here -->
        <section class="scroll-reveal">
            <h2>Project Details</h2>
            <p>Describe your project, its features, technologies used, and what you learned.</p>
        </section>
    </main>
    <script src="../script.js" defer></script>
</body>
</html>
```

### That's it!

Once you save `data.json`, the new project will automatically appear in:
- ✅ Navigation menu (Projects dropdown)
- ✅ Quick Launch search (press `/` or click the button)
- ✅ Home page console profiles (if relevant)

---

## Adding a New Certification

### Step 1: Add to `data.json`

Open `data.json` and add a new entry to the `"certifications"` array:

**For a completed certification:**
```json
{
  "id": "newCertId",
  "title": "New Certification Name",
  "image": "../images/certificate-image.png",
  "description": "Description of what you learned in this course.",
  "issuer": "Course Provider Name",
  "status": "Completed"
}
```

**For a certification in progress:**
```json
{
  "id": "newCertId",
  "title": "Certification In Progress",
  "description": "Description of what you're currently learning.",
  "issuer": "Course Provider Name",
  "status": "In Progress",
  "targetDate": "7/15"
}
```

**Fields:**
- `id`: Unique identifier (use camelCase)
- `title`: Name of the certification
- `image`: Path to certificate image (only for completed certs)
- `description`: What you learned or are learning
- `issuer`: Organization that issued/offers the certification
- `status`: Either `"Completed"` or `"In Progress"`
- `targetDate`: Expected completion date (only for in-progress certifications)

### Step 2: Add Certificate Image (if completed)

1. Save your certificate image to the `images/` folder
2. Update the `"image"` field in `data.json` to match the filename

**Supported formats:** PNG, JPG, WebP

### That's it!

The new certification will automatically appear in:
- ✅ Certifications page (`certificates/`)
- ✅ Quick Launch search
- ✅ Correct section (Completed or In Progress)
- ✅ Updated certification count

---

## Examples

### Example: Adding a Python Django Project

**In `data.json`:**
```json
{
  "id": "djangoBlog",
  "title": "Django Blog Platform",
  "href": "projects/djangoBlog/",
  "keywords": "python django web database backend api"
}
```

**Create folder:** `projects/djangoBlog/index.html`

### Example: Adding a Security+ Certification

**In `data.json`:**
```json
{
  "id": "securityPlus",
  "title": "CompTIA Security+",
  "description": "Studying for the Security+ certification covering cryptography, identity management, risk management, and security controls.",
  "issuer": "CompTIA",
  "status": "In Progress",
  "targetDate": "8/30"
}
```

---

## Tips & Best Practices

✅ **Do:**
- Use descriptive keywords in projects (helps search)
- Keep project folder names simple (no spaces, camelCase)
- Use consistent image sizes for certifications
- Update the description to reflect what the project/cert is about

❌ **Avoid:**
- Duplicate project IDs or titles
- Using special characters in folder names
- Images larger than 2MB (compress first)
- Very long descriptions (keep it concise)

---

## Troubleshooting

**New project doesn't appear in navigation?**
- Check that `href` matches the actual folder path
- Make sure JSON syntax is valid (no trailing commas)
- Browser may need to refresh (hard refresh: Ctrl+Shift+R)

**Quick Launch search not finding items?**
- Ensure `keywords` are relevant and descriptive
- Keywords are case-insensitive, so "Python" and "python" both work
- The search matches title, type, and keywords

**Certificate image not showing?**
- Verify the `image` path is correct and relative
- Check that the file exists in the `images/` folder
- Ensure the filename case matches exactly (case-sensitive on some systems)

---

## File Structure Reference

```
MyWebsite/
├── data.json                 ← Edit here to add projects/certs
├── script.js                 ← Auto-loads from data.json
├── index.html
├── styles.css
├── certificates/
│   └── index.html
├── contacts/
│   └── index.html
├── projects/
│   ├── pennyDoubler/
│   │   └── index.html
│   ├── proxmoxProject/
│   │   └── index.html
│   └── myNewProject/         ← Create new folders here
│       └── index.html        ← With index.html in each
└── images/
    ├── certificate1.png
    ├── certificate2.png
    └── certificate3.png      ← Add cert images here
```

---

## Questions?

If you need help or want to customize further, all the content is centralized in `data.json` making it easy to manage!
