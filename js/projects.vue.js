
var projects = new Vue({
    el:"#work",
    mounted(){
        //console.log("mounted")
        this.reloadTechs();
        //console.log("end mounted")
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
        all_projects:[

        ],
        project:{},

        filter_tech:null
    },
    methods:{
        shiftLoading(key){
            this.loading[key] = !this.loading[key];
        },
        reloadTechs(){
            var vm  =this;
            
            import('./technologies.mjs').then(module => {
                vm.technologies = module.technologies;
                let technologies = null;
                technologies = vm.technologies.map(technologie => {
                    technologie.logo = `img/techs/${technologie.logo}`;
                    return technologie;
                });
                vm.technologies = technologies;
                this.shiftLoading('technologies')

                vm.reloadProjects();
            })
        },
        /**
         * 
         */
        reloadProjects(){
            var vm  =this;

            import('./projects.mjs').then(module => {
                vm.all_projects = module.projects;
                vm.updateProjectsInfo();
                vm.getProjectsByTechnology(null);
                this.shiftLoading('projects')
            })
        },

        getProjectsByTechnology(technology){
            if(technology==null){
                this.projects = this.all_projects;
            }
        },
        loadProjectModalData(index){
            var vm = this;
            vm.project = vm.projects[index];
        },
        getTechnologie(name){
            var tech=null;
            tech= this.technologies.filter(tech => tech.name == name );
            if (tech.length > 0){
                return tech[0];
            }else{
                return { name: name };
            }
        },
        updateProjectsInfo(){
            var vm = this;
            var new_projects = this.all_projects.map(project => {
                let technologies = project.technologies.map(techname => {
                    return vm.getTechnologie(techname);
                })
                
                project.technologies = technologies;
                return project;
            });
            vm.all_projects = new_projects;
        },

        filter_projects(){
            var vm = this;
            vm.shiftLoading('projects');

            if (vm.filter_tech == "null"){
                vm.projects = vm.all_projects;
            }else{
                var new_projects = this.all_projects.filter(project => {
                    var has_tech = false;
                    project.technologies.forEach(tech => {
                        if (tech.name == vm.filter_tech){
                            has_tech = true;
                            return true;
                        }
                    });
                    if (has_tech){
                        return project;
                    }
                });
                vm.projects = new_projects
            }

            vm.shiftLoading('projects');
        }
    }
})