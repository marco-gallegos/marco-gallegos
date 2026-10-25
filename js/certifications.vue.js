var certificationsApp = new Vue({
    el: "#certifications",
    data: {
        loading: true,
        certifications: [],
    },
    mounted() {
        import("./certifications.mjs")
            .then(module => {
                this.certifications = (module.certifications || [])
                    .filter(certification => certification.show !== false);
            })
            .catch(error => {
                console.error("Could not load certifications", error);
            })
            .finally(() => {
                this.loading = false;
            });
    },
    methods: {
        pdfUrl(certification) {
            return `certifications/${certification.pdf}`;
        },
    },
});
