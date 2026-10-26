var experienceApp = new Vue({
    el: "#experience",
    data: {
        loading: true,
        experience: [],
        openIndex: 0,
    },
    mounted() {
        Promise.all([
            import("./experience.mjs"),
            import("./technologies.mjs"),
        ])
            .then(([experienceModule, technologiesModule]) => {
                const technologyMap = {};

                (technologiesModule.technologies || []).forEach(technology => {
                    const logo = technology.logo || "";

                    technologyMap[technology.name] = {
                        name: technology.name,
                        logo: logo
                            ? (logo.indexOf("img/") === 0 ? logo : `img/techs/${logo}`)
                            : "",
                        url: technology.url || "",
                    };
                });

                const technologyFor = name => {
                    return technologyMap[name] || { name: name, logo: "", url: "" };
                };

                const entries = (experienceModule.experience || [])
                    .filter(item => item.show !== false)
                    .map(item => {
                        return Object.assign({}, item, {
                            technologyDetails: (item.technologies || []).map(technologyFor),
                            projects: (item.projects || []).map(project => {
                                return Object.assign({}, project, {
                                    technologyDetails: (project.technologies || []).map(technologyFor),
                                });
                            }),
                        });
                    });

                this.experience = entries;
                this.openIndex = entries.length ? 0 : -1;
            })
            .catch(error => {
                console.error("Could not load experience", error);
            })
            .finally(() => {
                this.loading = false;
            });
    },
    methods: {
        toggle(index) {
            this.openIndex = this.openIndex === index ? -1 : index;
        },
        isOpen(index) {
            return this.openIndex === index;
        },
        initial(company) {
            return (company || "")
                .split(/\s+/)
                .filter(Boolean)
                .slice(0, 2)
                .map(part => part.charAt(0).toUpperCase())
                .join("");
        },
    },
});
