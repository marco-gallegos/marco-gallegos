// Experience shown in the home-page timeline.
//
// Add one object per role, newest first. `period` is the text shown on the
// timeline. `technologies` must use names from js/technologies.mjs when you
// want the matching logo to appear in the stack chips.
//
// Optional fields:
// - current: true adds the "Current" badge.
// - initials: text used inside the company mark when no logo is supplied.
// - logo: filename under img/ (e.g. "logos/acme.svg"); otherwise initials are used.
// - url: company website.
// - projects: selected work rendered inside the expanded detail.
// - show: false hides the entry without deleting it.

export var experience = [
    {
        company: "JLL",
        initials: "JLL",
        role: "Software Engineer",
        location: "Guadalajara, Mexico",
        period: "Mar 2025 — Present",
        current: true,
        summary: "Enterprise software engineering for a global real-estate services company.",
        highlights: [
            "Build and maintain full-stack features for enterprise web applications.",
            "Work across Python, JavaScript/TypeScript and modern cloud tooling.",
            "Focus on clean APIs, maintainable code and reliable delivery.",
        ],
        projects: [],
        technologies: [
            "Python",
            "Javascript",
            "React",
            "NodeJS",
            "Docker",
            "AWSS3",
        ],
        url: "https://www.jll.com/",
        show: true,
    },
    {
        company: "CyberPuerta",
        initials: "CP",
        role: "Frontend Developer SR → Cell Lead",
        location: "Guadalajara, Mexico",
        period: "Jul 2023 — Feb 2025",
        summary: "E-commerce frontend engineering and technical leadership.",
        highlights: [
            "Led a frontend cell, coordinating delivery, code reviews and technical decisions.",
            "Built customer-facing storefront features as a Senior Frontend Developer.",
            "Partnered with product, design and backend teams to ship improvements.",
        ],
        projects: [],
        technologies: [
            "Javascript",
            "Vue",
            "React",
            "NodeJS",
            "Docker",
        ],
        url: "https://www.cyberpuerta.mx/",
        show: true,
    },
    {
        company: "Codigo MX",
        initials: "CM",
        role: "Full Stack Developer",
        location: "Remote",
        period: "Oct 2021 — Jul 2023",
        summary: "Full-stack delivery for US and LATAM client products.",
        highlights: [
            "Built end-to-end features across frontend, APIs and relational databases.",
            "Worked in remote, cross-cultural teams with direct client communication.",
            "Contributed to maintainable architectures and delivery workflows.",
        ],
        projects: [],
        technologies: [
            "Python",
            "Laravel",
            "Vue",
            "Javascript",
            "Mysql",
            "Docker",
        ],
        url: "https://www.codigomx.io/",
        show: true,
    },
    {
        company: "Tek Provider",
        initials: "TP",
        role: "Full Stack Developer",
        location: "Guadalajara, Mexico",
        period: "Mar 2021 — Oct 2021",
        summary: "Full-stack development for credit-lifecycle software.",
        highlights: [
            "Developed web features for business credit workflows.",
            "Worked across PHP/Laravel, JavaScript and relational databases.",
            "Collaborated with a Guadalajara-based engineering team.",
        ],
        projects: [],
        technologies: [
            "Php",
            "Laravel",
            "Javascript",
            "Mysql",
        ],
        url: "",
        show: true,
    },
    {
        company: "Grupo Ciosa",
        initials: "GC",
        role: "Data Engineer",
        location: "Guadalajara, Mexico",
        period: "Feb 2020 — Nov 2020",
        summary: "Data engineering and BI for the CAIN analytics platform.",
        highlights: [
            "Built data services and pipelines for CAIN, a data warehouse and real-time BI platform.",
            "Worked with microservices in Go and Python, a React frontend and SQL/NoSQL stores.",
            "Helped turn operational data into indicators available across devices.",
        ],
        projects: [
            {
                name: "CAIN — CIOSA Artificial Intelligence Nova",
                description: "Data warehouse and real-time BI platform with a GraphQL API, microservices and a React frontend.",
                technologies: ["React", "Golang", "Python", "Postgres", "SQLServer", "Hadoop", "Docker"],
                url: "",
            },
        ],
        technologies: [
            "Python",
            "Golang",
            "React",
            "Postgres",
            "SQLServer",
            "Hadoop",
            "Docker",
        ],
        url: "https://www.ciosa.com/",
        show: true,
    },
    {
        company: "Grupo Ascencio",
        initials: "GA",
        role: "IT Support & Software Developer",
        location: "Guadalajara, Mexico",
        period: "2015 — 2020",
        summary: "Internal tools and automation for an electrical-distribution company.",
        highlights: [
            "Supported and developed internal systems for operations and employee services.",
            "Built Foodex, a dining-service registration platform, and TC Bot, a USD/MXN rate scraper integrated with the ERP.",
            "Automated manual processes and improved access to operational data.",
        ],
        projects: [
            {
                name: "Foodex",
                description: "Dining-service platform for employee registration and access control, built with Laravel, Vue and MySQL.",
                technologies: ["Laravel", "Vue", "Bootstrap", "Mysql"],
                url: "",
            },
            {
                name: "TC Bot",
                description: "USD/MXN exchange-rate scraper that feeds a rate provider into the company ERP.",
                technologies: ["Python", "Sqlite", "Docker"],
                url: "",
            },
        ],
        technologies: [
            "Laravel",
            "Vue",
            "Bootstrap",
            "Mysql",
            "Python",
            "Sqlite",
            "Docker",
        ],
        url: "https://grupoascencio.com.mx/",
        show: true,
    },
];
