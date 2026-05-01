// Edit these lists to grow the home page without touching the HTML structure.
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
            href: "cirtificates/",
            children: [
                { label: "All Certifications", href: "cirtificates/" },
                { label: "In Progress", href: "cirtificates/#in-progress" },
                { label: "Roadmap", href: "cirtificates/#roadmap" }
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
        { label: "Contact Me", href: "contacts/", className: "hero-button-secondary" }
    ],
    heroStats: [
        { value: "7+", label: "Years Programming" },
        { value: "6", label: "Featured Projects" },
        { value: "IT", label: "Platt Tech Focus" }
    ],
    skills: ["Python", "C++", "HTML", "CSS", "JavaScript", "Docker", "Proxmox"]
};

const createLink = ({ label, href, className = "" }) => {
    const link = document.createElement("a");
    link.href = href;
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
        heroActions.append(createLink({
            ...action,
            className: `hero-button ${action.className}`.trim()
        }));
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

const revealItems = document.querySelectorAll(".scroll-reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
