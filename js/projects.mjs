export var projects = [
    {
        name:"Memory Reports",
        folder:"memoryreports",
        date:"2020/12/01",
        short_description:"Ticket system with real time notifications",
        description:"This is a project to solve support tickets on physical sites, this project implments real time notifications using webpushjs and recurrent notifications using pushjs on client side, is written using Vue JS for the frontend with Vuetify UI framework and NodeJS on the backend with MongoDB for data store.",
        full_description:"This is a project to solve support tickets on physical sites, this project implments real time notifications using webpushjs on the server side and recurrent notifications using pushjs on client side, is written using Vue JS for the frontend with Vuetify UI framework and NodeJS on the backend with MongoDB for data store served as a rest API, the objective is get time reports and maintenance notifications.",
        url: "https://memoryreports.com/",
        cover:"cover.jpg",
        images:[

        ],
        repos:[
        ],
        private:true,
        technologies:[
            "Vue",
            "Vuetify",
            "NodeJS",
            "MongoDB",
            "Flutter",
        ],
        notes:"",
        show:true,
    },
    {
        name:"IotIN",
        folder:"iotin",
        date:"2020/06/01",
        short_description: "Access control and assistance system",
        description: "Access control and assistance system build using a SOA oriented architecture that provides encrypted codes and facial recognition, the goal of this project is provide a secure, low cost and easy integration access control system to any company with the benefits of cutting edge technologies",
        full_description: "Access control system build using a SOA oriented architecture that provides encrypted codes and facial recognition, the goal of this project is provide a secure, low cost and easy integration access control system to any company with the benefits of cutting edge technologies",
        url: null,
        cover:"",
        repos: [
            "https://github.com/marco-gallegos/shaka",
        ],
        private:false,
        technologies:[
            "Python",
            "NodeJS",
            "Ionic",
            "Angular",
            "Vue",
            "AWSS3",
            "Raspberry",
            "Arduino",
            "Sqlite",
            "Mysql",
        ],
        notes:"This a multiple repository project and not all are public by now",
        show:true,
    },
    {
        name:"Electro Revolution",
        folder:"electrorevolution",
        date:"2019/10/01",
        short_description:"Refactored administrative platform",
        description: "Administrative platform inspired and required as a new version of a previous Microsoft Access administrative system.",
        full_description: "Administrative platform inspired and required as a new version of a previous Microsoft Access administrative system, is build on the top of laravel 6 with some features in vuejs as library and using MySQL as SGBD.",
        url: "http://administracion.ecsn.com.mx/",
        cover: "cover.jpg",
        repos: [
            "",
        ],
        private:true,
        technologies:[
            "Laravel",
            "Vue",
            "Mysql",
            "Bootstrap",
        ],
        notes:"",
        show:true,
    },
    {
        name:"Foodex",
        folder:"foodex",
        date:"2018/12/01",
        short_description:"Platform to manage dinning service",
        description: "Is a web platform to manage employees access and previous registration to the dining service, the goal is to digitize and automate this process to get a better result on nominal discounts and control excess food.",
        full_description: "Is a web platform to manage employees access and previous registration to the dining service, the goal is to digitize and automate this process to get a better result on nominal discounts and control excess food.",
        url: "https://comedor.grupoascencio.com.mx/",
        cover: "cover.jpg",
        repos: [
            "",
        ],
        private:true,
        technologies: [
            "Laravel",
            "Vue",
            "Bootstrap",
            "Mysql",
        ],
        notes:"",
        show:true,
    },
    {
        name:"CAIN",
        folder:"cain",
        date:"2020/01/01",
        short_description:"CAIN is a intranet system with BI reports",
        description: "",
        full_description: "CAIN (CIOSA Artificial Intelligence Nova) is datawarehouse and Artifial Intelligence BI system served as a GraphQL API using microservices on GoLang and Python with a ReactJS Frontend, the objective is generate a real time version of the ciosa 'indicators' availables on any device and any time.",
        url: "http://189.201.177.25:100/login",
        cover: "cover.jpg",
        repos: [
            "",
        ],
        private:true,
        technologies:[
            "React",
            "Bootstrap",
            "Python",
            "Golang",
            "Laravel",
            "Postgres",
            "Hadoop",
            "SQLServer",
            "Docker",
        ],
        notes:"",
        show:true,
    },
    {
        name:"Commit Cli",
        folder:"commitcli",
        date:"2021/01/01",
        short_description:"A commit formatter served as a cli",
        description: "",
        full_description: "Inspired by the personal usage of the odoo commit format described in the official guideline this project is a terminal utility to make commits in this predefined format by default, the objective is make a cli to automate the commit formatting task and enhance the productivity. i want to eventually add another famous formats",
        url: "https://pypi.org/project/commitcli/",
        cover: "cover.jpg",
        repos: [
            "https://github.com/marco-gallegos/commit-cli",
        ],
        private:false,
        technologies:[
            "Python",
            "Git",
        ],
        notes:"",
        show:true,
    },
    {
        name:"Timezone Bot",
        folder:"timezone_bot",
        date:"2019/01/01",
        short_description:"A USD dollar to Mexican peso value scrapper",
        description: "A USD dollar to Mexican peso value scrapper using webscrapping in the website",
        full_description: "This project uses python to make scrapping from a webpage ( https://www.eldolar.info/es-MX/mexico/dia/hoy ) that contains all the main mexican banks dollar value and store the selected value in the configured database, this project is currently working a tc provider into a ERP software on Grupo Ascencio, this project is growing up to use a api and a app",
        url: "",
        cover: "cover.png",
        repos: [
            "https://github.com/marco-gallegos/tipocambio",
        ],
        private:true,
        technologies:[
            "Python",
            "Docker",
            "ReactNative",
            "Sqlite",
            "Mysql",
        ],
        notes:"this project lives in a client server",
        show:true,
    },
]