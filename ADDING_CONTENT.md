# How to Add Projects, Certifications & Custom Content

This guide explains how to manage your portfolio website, including adding new projects, certifications, top bar elements, and custom pages with minimal effort.

## Overview

Your website uses a centralized **`data.json`** file to manage almost all content. This means:
- ✅ Add items in **one place** instead of many
- ✅ Navigation, search, and display all update automatically
- ✅ No HTML editing needed for most content updates
- ✅ Easy to maintain and scale

---

## 1. Adding a New Project

### Step 1: Add to `data.json`

Open `data.json` and add a new entry to the `"projects"` array:

```json
{
  "id": "myNewProject",
  "title": "My New Project",
  "href": "projects/myNewProject/",
  "tag": "Python",
  "description": "A short description for the project card.",
  "keywords": "python docker web automation"
}
```

**Fields:**
- `id`: Unique identifier (use camelCase, no spaces)
- `title`: Display name of the project
- `href`: URL path to the project page (must match folder name)
- `tag`: Category shown on the card (e.g., "Python", "Web")
- `description`: A brief summary of the project
- `keywords`: Space-separated search terms (helps with Quick Launch search)

### Step 2: Create the Project Folder & Page

1. Create a new folder: `projects/myNewProject/`
2. Create `projects/myNewProject/index.html` using the template below.

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
    <link rel="stylesheet" href="../../styles.css">
</head>
<body>
    <div class="navbar-container">
        <nav class="navbar">
            <ul id="navList"></ul> <!-- Navigation auto-populates -->
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
    <script src="../../script.js" defer></script>
</body>
</html>
```

---

## 2. Adding a New Certification

### Step 1: Add to `data.json`

Open `data.json` and add a new entry to the `"certifications"` array:

**For a completed certification:**
```json
{
  "id": "newCertId",
  "title": "New Certification Name",
  "image": "../images/certificate-image.png",
  "description": "Description of what you learned.",
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

### Step 2: Add Certificate Image (if completed)

1. Save your certificate image to the `images/` folder.
2. Update the `"image"` field in `data.json` to `../images/your-filename.png`.

---

## 3. Adding New Top Bar Elements (Navigation)

You can add custom links to the top navigation bar directly in `data.json` using the `"navigation"` array.

### Add a Simple Link
```json
"navigation": [
  { "label": "GitHub", "href": "https://github.com/yourusername" }
]
```

### Add a Dropdown Menu
```json
"navigation": [
  {
    "label": "Resources",
    "href": "#",
    "children": [
      { "label": "Blog", "href": "https://blog.example.com" },
      { "label": "Wiki", "href": "/wiki/" }
    ]
  }
]
```

---

## 4. Creating and Adding New Pages

If you want to add a completely new section (like a "Tools" page):

1. **Create the folder and file:** e.g., `tools/index.html`.
2. **Use the Page Template:** Use the same template as the Project page above.
3. **Register in Navigation:** Add the new page to the `"navigation"` array in `data.json`.

---

## 5. Modifying Hero Stats & Skills

The stats and skill pills on the home page are also managed in `data.json`.

### Update Stats
Modify the `"heroStats"` array in `data.json`:
```json
"heroStats": [
  { "value": "10+", "label": "Projects Completed" },
  { "value": "2026", "label": "Graduation Year" }
]
```

### Update Skills
Modify the `"skills"` array in `data.json`:
```json
"skills": ["Python", "Docker", "AWS", "Linux"]
```

---

## Troubleshooting

**Changes not showing up?**
1. **JSON Syntax:** Ensure your `data.json` is valid. A missing or extra comma will break the site.
2. **Hard Refresh:** Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac) to clear the browser cache.
3. **Console Errors:** Right-click the page, select "Inspect", and go to the "Console" tab to see if there are any error messages.

---

## File Structure Reference

```
MyWebsite/
├── data.json                 ← Central content management
├── script.js                 ← Dynamic loading logic
├── index.html                ← Homepage
├── styles.css                ← Global styles
├── images/                   ← Images and certificates
├── projects/                 ← Individual project pages
│   └── myProject/
│       └── index.html
└── newPage/                  ← Your custom pages
    └── index.html
```
