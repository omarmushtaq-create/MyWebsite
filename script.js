// Centralized script that loads from data.json and dynamically populates all pages
// Determine the site root relative to the script's location
const scriptUrl = new URL(document.currentScript.src);
const siteRoot = new URL(".", scriptUrl);

let pageContent = {
    navigation: [],
    heroActions: [
        { label: "View Projects", href: "projects/", className: "hero-button-primary" },
        { label: "Contact Me", href: "contacts/", className: "hero-button-secondary" },
        { label: "Quick Launch", href: "#quick-launch", className: "hero-button-tertiary", action: "quickLaunch" }
    ],
    heroStats: [
        { value: "7+", label: "Years Programming" },
        { value: "8", label: "Featured Projects" },
        { value: "IT", label: "Platt Tech Focus" }
    ],
    skills: ["Python", "C++", "HTML", "CSS", "JavaScript", "Docker", "Proxmox"],
    consoleProfiles: [
        {
            label: "Python",
            command: "python portfolio.py --focus problem-solving",
            output: [
                "Loading skill profile: Python",
                "7+ years of programming practice detected",
                "Project match: Penny Doubler",
                "Strengths: logic, math, automation, debugging"
            ]
        },
        {
            label: "Web",
            command: "npm run design-system --portfolio",
            output: [
                "Loading skill profile: HTML + CSS + JavaScript",
                "Homepage components: nav, cards, quick launch, animations",
                "Project match: portfolio website",
                "Strengths: responsive layout, interaction, visual polish"
            ]
        },
        {
            label: "Homelab",
            command: "docker compose up --lab-stack",
            output: [
                "Loading skill profile: Docker + self-hosting",
                "Services detected: Portainer, Heimdal, IT Tools",
                "Project match: container dashboards and utilities",
                "Strengths: deployment, troubleshooting, server management"
            ]
        },
        {
            label: "Virtualization",
            command: "proxmox status --projects",
            output: [
                "Loading skill profile: Proxmox + remote access",
                "VM management and lab systems online",
                "Project match: Proxmox and Guacamole",
                "Strengths: infrastructure, access control, systems thinking"
            ]
        }
    ],
    quickLaunch: [],
    projects: [],
    certifications: []
};

// Fetch and load data from data.json
const loadData = async () => {
    try {
        const response = await fetch(new URL("data.json", siteRoot).href);
        if (!response.ok) throw new Error(`Failed to load data.json: ${response.status}`);
        
        const data = await response.json();
        pageContent.projects = data.projects || [];
        pageContent.certifications = data.certifications || [];
        pageContent.heroStats = data.heroStats || pageContent.heroStats;
        pageContent.skills = data.skills || pageContent.skills;
        
    // Build navigation dynamically
    const customNav = data.navigation || [];
    
    const projectsNav = pageContent.projects.length > 0 ? {
        label: "Projects",
        href: "projects/",
        children: [
            { label: "All Projects", href: "projects/" },
            ...pageContent.projects.map(project => {
                // Ensure href starts with projects/ if it doesn't already
                let projectHref = project.href;
                if (projectHref && !projectHref.startsWith("projects/") && !projectHref.startsWith("http")) {
                    // Check if it's already a relative path that should be prefixed
                    projectHref = `projects/${projectHref.replace(/^\//, '')}`;
                }
                return {
                    label: project.title,
                    href: projectHref
                };
            })
        ]
    } : null;

        const certificationsNav = {
            label: "Certifications",
            href: "certificates/",
            children: [
                { label: "All Certifications", href: "certificates/" },
                { label: "In Progress", href: "certificates/#in-progress" }
            ]
        };

        pageContent.navigation = [
            { label: "Home", href: "/", className: "active" },
            ...customNav,
            ...(projectsNav ? [projectsNav] : []),
            certificationsNav,
            {
                label: "Contact",
                href: "contacts/",
                children: [
                    { label: "Contact Page", href: "contacts/" },
                    { label: "Email Me", href: "mailto:omarmushtaq2029@gmail.com" }
                ]
            }
        ];
        
        // Ensure only the correct link is active
        const currentPath = window.location.pathname;
        pageContent.navigation.forEach(item => {
            const itemUrl = new URL(getRelativeHref(item.href));
            const itemPath = itemUrl.pathname;
            
            // Basic matching for home, and matching directory roots
            const isHome = (currentPath === "/" || currentPath.endsWith("/index.html")) && (itemPath === "/" || itemPath.endsWith("/index.html"));
            const isMatch = isHome || (itemPath !== "/" && currentPath.includes(itemPath));
            
            if (isMatch) {
                item.className = (item.className || "") + " active";
            } else {
                item.className = (item.className || "").replace("active", "").trim();
            }
        });
    } catch (error) {
        console.error("Error loading data.json:", error);
        
        // Fallback navigation if data.json fails
        pageContent.navigation = [
            { label: "Home", href: "/" },
            { label: "Projects", href: "projects/" },
            { label: "Certifications", href: "certificates/" },
            { label: "Contact", href: "contacts/" }
        ];

        // Ensure active class on fallback navigation
        const currentPath = window.location.pathname;
        pageContent.navigation.forEach(item => {
            const itemUrl = new URL(getRelativeHref(item.href));
            const itemPath = itemUrl.pathname;
            const isHome = (currentPath === "/" || currentPath.endsWith("/index.html")) && (itemPath === "/" || itemPath.endsWith("/index.html"));
            const isMatch = isHome || (itemPath !== "/" && currentPath.includes(itemPath));
            if (isMatch) item.className = "active";
        });
    } finally {
        // Build quick launch entries (if data failed, map will work on empty arrays)
        pageContent.quickLaunch = [
            ...pageContent.projects.map(project => ({
                title: project.title,
                type: "Project",
                href: project.href,
                keywords: project.keywords
            })),
            ...pageContent.certifications.map(cert => ({
                title: cert.title,
                type: "Certification",
                href: cert.status === "In Progress" ? "certificates/#in-progress" : "certificates/",
                keywords: (cert.issuer || "").toLowerCase() + " " + (cert.description || "").toLowerCase()
            })),
            {
                title: "Email Omar",
                type: "Contact",
                href: "mailto:omarmushtaq2029@gmail.com",
                keywords: "contact feedback collaboration portfolio"
            }
        ];

        // Render all components
        renderNavigation();
        renderHeroActions();
        renderHeroStats();
        renderSkills();
        renderBuildConsole();
        renderQuickLaunch();
        renderProjectsPage();
        renderCertificationsPage();

        // Re-initialize scroll reveal for dynamically added items
        const newRevealItems = document.querySelectorAll(".scroll-reveal");
        newRevealItems.forEach((item) => {
            if (typeof revealObserver !== "undefined") {
                revealObserver.observe(item);
            } else {
                // Fallback: if observer isn't ready yet, it will be handled by the global observer initialization
                item.classList.add("is-visible");
            }
        });
    }
};

// Load data when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Apply theme immediately to prevent flicker
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            document.documentElement.setAttribute("data-theme", savedTheme);
            const metaTheme = document.querySelector('meta[name="theme-color"]');
            if (metaTheme) {
                metaTheme.setAttribute("content", savedTheme === "dark" ? "#0f172a" : "#f0f4ff");
            }
        }
        loadData();
    });
} else {
    // Apply theme immediately if already loaded
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.setAttribute("content", savedTheme === "dark" ? "#0f172a" : "#f0f4ff");
        }
    }
    loadData();
}

const getRelativeHref = (href) => {
    if (!href) return "#";
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http")) {
        return href;
    }
    if (href === "/") {
        return new URL(".", siteRoot).href;
    }
    // Remove leading slash for URL constructor if it's meant to be relative to siteRoot
    const cleanHref = href.startsWith("/") ? href.slice(1) : href;
    return new URL(cleanHref, siteRoot).href;
};

const createLink = ({ label, href, className = "" }) => {
    const link = document.createElement("a");
    link.href = getRelativeHref(href);
    link.textContent = label;

    if (className) {
        link.className = className;
    }

    return link;
};

const renderNavigation = () => {
    const navList = document.querySelector("#navList");
    const navbar = document.querySelector(".navbar");

    if (!navList) {
        return;
    }

    navList.innerHTML = ""; // Clear existing navigation

    pageContent.navigation.forEach((item) => {
        const listItem = document.createElement("li");

        if (item.children?.length) {
            listItem.className = "dropdown";

            const toggle = createLink({
                label: item.label,
                href: item.href,
                className: "dropdown-toggle"
            });
            const menu = document.createElement("ul");
            menu.className = "dropdown-menu";

            item.children.forEach((child) => {
                const menuItem = document.createElement("li");
                menuItem.append(createLink(child));
                menu.append(menuItem);
            });

            listItem.append(toggle, menu);
        } else {
            listItem.append(createLink(item));
        }

        navList.append(listItem);
    });

    // Add Theme Toggle if it doesn't exist
    if (navbar && !document.querySelector(".theme-toggle")) {
        const themeToggle = document.createElement("button");
        themeToggle.className = "theme-toggle";
        themeToggle.setAttribute("aria-label", "Toggle dark mode");
        themeToggle.innerHTML = `
            <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        `;
        
        themeToggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const nextTheme = currentTheme === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", nextTheme);
            localStorage.setItem("theme", nextTheme);
            
            // Update meta theme-color
            const metaTheme = document.querySelector('meta[name="theme-color"]');
            if (metaTheme) {
                metaTheme.setAttribute("content", nextTheme === "dark" ? "#0f172a" : "#f0f4ff");
            }
        });
        
        navbar.append(themeToggle);
    }
};

const renderHeroActions = () => {
    const heroActions = document.querySelector("#heroActions");

    if (!heroActions) {
        return;
    }

    pageContent.heroActions.forEach((action) => {
        const actionLink = createLink({
            ...action,
            className: `hero-button ${action.className}`.trim()
        });

        if (action.action === "quickLaunch") {
            actionLink.dataset.quickLaunchTrigger = "true";
            actionLink.setAttribute("role", "button");
            actionLink.setAttribute("aria-haspopup", "dialog");
        }

        heroActions.append(actionLink);
    });
};

const renderHeroStats = () => {
    const heroStats = document.querySelector("#heroStats");

    if (!heroStats) {
        return;
    }

    pageContent.heroStats.forEach((stat) => {
        const statCard = document.createElement("article");
        statCard.className = "stat-card";
        statCard.innerHTML = `
            <span class="stat-value">${stat.value}</span>
            <span class="stat-label">${stat.label}</span>
        `;
        heroStats.append(statCard);
    });
};

const renderSkills = () => {
    const skillStrip = document.querySelector("#skillStrip");

    if (!skillStrip) {
        return;
    }

    pageContent.skills.forEach((skill) => {
        const skillPill = document.createElement("span");
        skillPill.className = "skill-pill";
        skillPill.textContent = skill;
        skillStrip.append(skillPill);
    });
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const renderBuildConsole = () => {
    const filters = document.querySelector("#consoleFilters");
    const output = document.querySelector("#consoleOutput");

    if (!filters || !output) {
        return;
    }

    let activeIndex = 0;
    let typingTimer;

    const typeProfile = (profile) => {
        window.clearInterval(typingTimer);

        const lines = [`$ ${profile.command}`, ...profile.output.map((line) => `> ${line}`)];
        const text = lines.join("\n");
        let index = 0;
        output.textContent = "";

        if (prefersReducedMotion) {
            output.textContent = text;
            return;
        }

        typingTimer = window.setInterval(() => {
            output.textContent = text.slice(0, index);
            index += 1;

            if (index > text.length) {
                window.clearInterval(typingTimer);
            }
        }, 14);
    };

    const setActiveProfile = (nextIndex) => {
        activeIndex = nextIndex;

        filters.querySelectorAll("button").forEach((button, index) => {
            const isActive = index === activeIndex;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        typeProfile(pageContent.consoleProfiles[activeIndex]);
    };

    pageContent.consoleProfiles.forEach((profile, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = profile.label;
        button.setAttribute("aria-pressed", "false");
        button.addEventListener("click", () => setActiveProfile(index));
        filters.append(button);
    });

    setActiveProfile(activeIndex);
};

// FIX #3: Render projects page dynamically from data.json
const renderProjectsPage = () => {
    const projectGrid = document.querySelector("#projectGrid");
    
    if (!projectGrid) {
        return;
    }

    projectGrid.innerHTML = "";

    pageContent.projects.forEach((project) => {
        const projectCard = document.createElement("article");
        projectCard.className = "project-card";
        
        const tag = project.tag || "Project";
        projectCard.innerHTML = `
            <span class="project-tag">${tag}</span>
            <h2>${project.title}</h2>
            <p>${project.description || ""}</p>
            <a class="projectButton" href="${getRelativeHref(project.href)}">Open Project</a>
        `;
        
        projectGrid.append(projectCard);
    });
};

// FIX #3: Render certifications page dynamically from data.json
const renderCertificationsPage = () => {
    const completedGrid = document.querySelector("#completedGrid");
    const inProgressGrid = document.querySelector("#inProgressGrid");
    const certSummary = document.querySelector("#certificationSummary");

    if (!completedGrid || !inProgressGrid) {
        return;
    }

    completedGrid.innerHTML = "";
    inProgressGrid.innerHTML = "";

    const completed = pageContent.certifications.filter(c => c.status === "Completed");
    const inProgress = pageContent.certifications.filter(c => c.status === "In Progress");

    // Update summary stats
    if (certSummary) {
        certSummary.innerHTML = `
            <article class="stat-card">
                <span class="stat-value">${completed.length}</span>
                <span class="stat-label">Completed Certifications</span>
            </article>
            <article class="stat-card">
                <span class="stat-value">${inProgress.length}</span>
                <span class="stat-label">Currently In Progress</span>
            </article>
        `;
    }

    // Render completed certifications
    completed.forEach((cert) => {
        const certCard = document.createElement("article");
        certCard.className = "certification-card";
        
        let cardHTML = "";
        if (cert.image) {
            cardHTML += `
                <img
                    class="certification-image"
                    src="${cert.image}"
                    alt="${cert.title} certificate"
                    decoding="async"
                    loading="lazy"
                >
            `;
        }
        
        cardHTML += `
            <h3>${cert.title}</h3>
            <p>${cert.description}</p>
            <div class="certification-meta">
                <span>Issuer: ${cert.issuer}</span>
                <span>Status: ${cert.status}</span>
            </div>
        `;
        
        certCard.innerHTML = cardHTML;
        completedGrid.append(certCard);
    });

    // Render in-progress certifications
    inProgress.forEach((cert) => {
        const certCard = document.createElement("article");
        certCard.className = "certification-card";
        
        certCard.innerHTML = `
            <span class="project-tag">Current Focus</span>
            <h3>${cert.title}</h3>
            <p>${cert.description}</p>
            <div class="certification-meta">
                <span>Target Date: ${cert.targetDate || "TBD"}</span>
                <span>Status: ${cert.status}</span>
            </div>
            <a class="projectButton" href="../contacts/">Ask About My Progress</a>
        `;
        
        inProgressGrid.append(certCard);
    });
};

const renderQuickLaunch = () => {
    const launcher = document.createElement("section");
    launcher.className = "quick-launch";
    launcher.setAttribute("aria-hidden", "true");
    launcher.innerHTML = `
        <div class="quick-launch-panel" role="dialog" aria-modal="true" aria-labelledby="quickLaunchTitle">
            <div class="quick-launch-header">
                <div>
                    <p class="eyebrow">Quick Launch</p>
                    <h2 id="quickLaunchTitle">Find Anything</h2>
                </div>
                <button class="quick-launch-close" type="button" aria-label="Close quick launch">x</button>
            </div>
            <label class="quick-launch-search">
                <span>Search</span>
                <input id="quickLaunchInput" type="search" autocomplete="off" placeholder="Try Docker, Python, security...">
            </label>
            <div class="quick-launch-results" id="quickLaunchResults"></div>
        </div>
    `;

    const floatingButton = document.createElement("button");
    floatingButton.className = "quick-launch-button";
    floatingButton.type = "button";
    floatingButton.dataset.quickLaunchTrigger = "true";
    floatingButton.setAttribute("aria-label", "Open quick launch");
    floatingButton.textContent = "/";

    document.body.append(launcher, floatingButton);

    const input = launcher.querySelector("#quickLaunchInput");
    const results = launcher.querySelector("#quickLaunchResults");
    const closeButton = launcher.querySelector(".quick-launch-close");

    const renderResults = () => {
        const query = input.value.trim().toLowerCase();
        const matches = pageContent.quickLaunch.filter((item) => {
            const haystack = `${item.title} ${item.type} ${item.keywords}`.toLowerCase();
            return !query || haystack.includes(query);
        });

        results.innerHTML = matches.length ? matches.map((item) => `
            <a class="quick-launch-result" href="${getRelativeHref(item.href)}">
                <span class="quick-launch-type">${item.type}</span>
                <strong>${item.title}</strong>
            </a>
        `).join("") : `<p class="quick-launch-empty">No matching items found.</p>`;
    };

    const openLauncher = () => {
        launcher.classList.add("is-open");
        launcher.setAttribute("aria-hidden", "false");
        renderResults();
        window.setTimeout(() => input.focus(), 20);
    };

    const closeLauncher = () => {
        launcher.classList.remove("is-open");
        launcher.setAttribute("aria-hidden", "true");
        input.value = "";
    };

    // FIX #1: Prevent closing when clicking on dropdown menu
    document.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-quick-launch-trigger]");

        if (trigger) {
            event.preventDefault();
            openLauncher();
            return;
        }

        // Only close if clicking outside the panel
        if (event.target === launcher || (launcher.classList.contains("is-open") && !launcher.contains(event.target))) {
            closeLauncher();
        }
    });

    closeButton.addEventListener("click", closeLauncher);
    input.addEventListener("input", renderResults);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && launcher.classList.contains("is-open")) {
            closeLauncher();
        }

        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
            event.preventDefault();
            openLauncher();
        }
    });

    renderResults();
};

const revealItems = document.querySelectorAll(".scroll-reveal");

if (!prefersReducedMotion) {
    document.body.classList.add("page-is-entering");

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.classList.add("page-is-visible");
        });
    });
}

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            }
        });
    },
    {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px"
    }
);

revealItems.forEach((item) => revealObserver.observe(item));

const parallaxItems = document.querySelectorAll("[data-parallax-speed]");

const updateParallax = () => {
    const scrollY = window.scrollY;

    parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.parallaxSpeed) || 0;
        item.style.setProperty("--parallax-shift", `${scrollY * speed}px`);
    });
};

updateParallax();
window.addEventListener("scroll", updateParallax, { passive: true });

const shouldAnimateNavigation = (link) => {
    if (!link || prefersReducedMotion) {
        return false;
    }

    if (link.target && link.target !== "_self") {
        return false;
    }

    if (link.hasAttribute("download")) {
        return false;
    }

    const href = link.getAttribute("href");

    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return false;
    }

    const nextUrl = new URL(link.href, window.location.href);

    if (nextUrl.origin !== window.location.origin) {
        return false;
    }

    return !(nextUrl.pathname === window.location.pathname && nextUrl.search === window.location.search);
};

document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");

    if (!shouldAnimateNavigation(link)) {
        return;
    }

    event.preventDefault();
    document.body.classList.remove("page-is-visible");

    window.setTimeout(() => {
        window.location.href = link.href;
    }, 260);
});

const pennyForm = document.querySelector("#pennyForm");

const formatCurrency = (value) => new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
}).format(value);

const calculatePennyDoubler = (name, days) => {
    let penny = 0.01;
    let pennyTotal = 0.01;
    let dailyTotal = 10000;
    const rows = [{
        day: 1,
        penny,
        pennyTotal,
        dailyTotal
    }];

    for (let day = 2; day <= days; day += 1) {
        penny *= 2;
        pennyTotal += penny;
        dailyTotal += 10000;

        rows.push({
            day,
            penny,
            pennyTotal,
            dailyTotal
        });
    }

    let winner = "Tie";
    let summary = `After ${days} day${days === 1 ? "" : "s"}, ${name} would make the same amount with both choices.`;

    if (pennyTotal > dailyTotal) {
        winner = "Penny";
        summary = `After ${days} day${days === 1 ? "" : "s"}, the doubling penny wins with ${formatCurrency(pennyTotal)}.`;
    } else if (dailyTotal > pennyTotal) {
        winner = "$10,000";
        summary = `After ${days} day${days === 1 ? "" : "s"}, the $10,000 per day choice wins with ${formatCurrency(dailyTotal)}.`;
    }

    return {
        rows,
        pennyTotal,
        dailyTotal,
        winner,
        summary
    };
};

const renderPennyDoubler = () => {
    if (!pennyForm) {
        return;
    }

    const formData = new FormData(pennyForm);
    const name = String(formData.get("pennyName") || "you").trim() || "you";
    const daysInput = Number(formData.get("pennyDays"));
    const days = Math.min(Math.max(Math.trunc(daysInput || 30), 1), 365);
    const result = calculatePennyDoubler(name, days);

    document.querySelector("#pennyDays").value = days;
    document.querySelector("#pennyTotal").textContent = formatCurrency(result.pennyTotal);
    document.querySelector("#dailyTotal").textContent = formatCurrency(result.dailyTotal);
    document.querySelector("#winnerLabel").textContent = result.winner;
    document.querySelector("#pennySummary").textContent = result.summary;

    document.querySelector("#pennyTableBody").innerHTML = result.rows.map((row) => `
        <tr>
            <td>${row.day}</td>
            <td>${formatCurrency(row.penny)}</td>
            <td>${formatCurrency(row.pennyTotal)}</td>
            <td>${formatCurrency(row.dailyTotal)}</td>
        </tr>
    `).join("");
};

if (pennyForm) {
    pennyForm.addEventListener("submit", (event) => {
        event.preventDefault();
        renderPennyDoubler();
    });

    renderPennyDoubler();
}
