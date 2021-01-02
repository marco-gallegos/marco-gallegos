var projects = new Vue({
    el:"#work",
    mounted(){
        console.log("mounted")
        console.log("end mounted")
    },
    data:{
        loading:{
            project:false,
            projects:true,
            technologies:true,
        },
        project_selected:null,
        technologies:[

        ],
        projects:[

        ],
    },
    methods:{
        shiftLoading(key){
            this.loading[key] = !this.loading[key];
        },
        reloadTechs(){
            setTimeout(() => {
                this.shiftLoading('technologies')
            }, 2000);
        },
        reloadProjects(){
            setTimeout(() => {
                this.shiftLoading('projects')
            }, 2000);
        },
    }
})