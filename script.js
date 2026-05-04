// Edit these lists to grow the home page without touching the HTML structure.
const siteRoot = new URL(".", document.currentScript?.src || window.location.href);

const pageContent = {
    navigation: [
        { label: "Home", href: "#home", className: "active" },
        {
            label: "Projects",
            href: "projects/",
            children: [
                { label: "Penny Doubler", href: "projects/pennyDoubler/" },
                { label: "Proxmox", href: "projects/proxmoxProject/" },
                { label: "Guacamole", href: "projects/guacamole/" },
                { label: "Portainer", href: "projects/portainer/" },
                { label: "Heimdal", href: "projects/heimdal/" },
                { label: "IT Tools", href: "projects/itTools/" }
            ]
        },
        {
            label: "Certifications",
            href: "certificates/",
            children: [
                { label: "All Certifications", href: "certificates/" },
                { label: "In Progress", href: "certificates/#in-progress" }
            ]
        },
        {
            label: "Contact",
            href: "contacts/",
            children: [
                { label: "Email Me", href: "mailto:omarmushtaq2029@gmail.com" }
            ]
        }
    ],
    heroActions: [
        { label: "View Projects", href: "projects/", className: "hero-button-primary" },
        { label: "Contact Me", href: "contacts/", className: "hero-button-secondary" },
        { label: "Quick Launch", href: "#quick-launch", className: "hero-button-tertiary", action: "quickLaunch" }
    ],
    heroStats: [
        { value: "7+", label: "Years Programming" },
        { value: "6", label: "Featured Projects" },
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
    quickLaunch: [
        {
            title: "Penny Doubler",
            type: "Project",
            href: "projects/pennyDoubler/",
            keywords: "python math exponential growth calculator"
        },
        {
            title: "Proxmox",
            type: "Project",
            href: "projects/proxmoxProject/",
            keywords: "virtualization homelab server virtual machines"
        },
        {
            title: "Guacamole",
            type: "Project",
            href: "projects/guacamole/",
            keywords: "remote access browser lab systems"
        },
        {
            title: "Portainer",
            type: "Project",
            href: "projects/portainer/",
            keywords: "docker containers logs dashboard"
        },
        {
            title: "Heimdal",
            type: "Project",
            href: "projects/heimdal/",
            keywords: "self hosting containers services"
        },
        {
            title: "IT Tools",
            type: "Project",
            href: "projects/itTools/",
            keywords: "docker utilities encode decode convert"
        },
        {
            title: "HTML Basics",
            type: "Certification",
            href: "certificates/",
            keywords: "sololearn web structure semantic forms"
        },
        {
            title: "Python Course",
            type: "Certification",
            href: "certificates/",
            keywords: "pyquest variables functions control flow"
        },
        {
            title: "Cybersecurity Basics",
            type: "Certification",
            href: "certificates/#in-progress",
            keywords: "security nist risk current focus"
        },
        {
            title: "Email Omar",
            type: "Contact",
            href: "mailto:omarmushtaq2029@gmail.com",
            keywords: "contact feedback collaboration portfolio"
        }
    ]
};

const getRelativeHref = (href) => {
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return href;
    }

    return new URL(href, siteRoot).href;
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

    if (!navList) {
        return;
    }

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

renderNavigation();
renderHeroActions();
renderHeroStats();
renderSkills();

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

renderBuildConsole();

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

    document.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-quick-launch-trigger]");

        if (trigger) {
            event.preventDefault();
            openLauncher();
            return;
        }

        if (event.target === launcher) {
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

renderQuickLaunch();

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

// Parallax is isolated here so more animated sections can reuse the same data attribute.
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
