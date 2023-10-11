import { icons, images } from "./";

const myProfile = {
    name: "Gualter Fone",
    profile_image: images.profile1,
    address: "No. 88, Jln Padungan, Kuching",
    menbership_ID:"1029921",
    email:"gualter@fone.co.mz",
    idNumb:"12782167821M",
    balance:"12,722.00",
    percentage:"12%",
    dependents:3,
    status:"Active",
    IdType:1
}

const categories = [
    {
        id: "01",
        name: "Amina Cheia",
        profile_image: images.profile1,
        address: "No. 88, Jln Padungan, Kuching",
        menbership_ID:"1029921",
        email:"gualter@fone.co.mz",
        gender: "F",
        idNumb:"12782167821M",
        balance:"12,722.00",
        percentage:"12%",
        dependents:3,
        status:"Active",
        IdType:1,
        benefits: [1,2,3,4,5,6,7,8,9,10,11],
        expenses: [
            { id: 1, title: "Tuition Fee", description: 'Milk',  total: 20000, amount: 1000, status: 'Confirmed', location: "ByProgrammers' tuition center", date: '2023-01-10' },
            { id: 2, title: "Tuition Fee", description: 'Bread', total: 30000, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2023-01-10' },
            { id: 3, title: "Tuition Fee", description: 'Bread', total: 25000, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2023-05-12' },
            { id: 4, title: "Tuition Fee", description: 'Bread', total: 15000, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2023-01-12' },
            { id: 5, title: "Tuition Fee", description: 'Bread', total: 50000, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2023-05-12' },
            { id: 6, title: "Tuition Fee", description: 'Bread', total: 10000, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2023-01-12' },
            { id: 7, title: "Tuition Fee", description: 'Bread', total: 30000, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2023-09-12' },
            { id: 8, title: "Tuition Fee", description: 'Bread', total: 17000, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2023-09-12' },
            { id: 9, title: "Tuition Fee", description: 'Bread', total: 30000, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: 'Jan 2022' },
        ],        
    },
    {
        id:"02",
        name: "Gualter Fone",
        profile_image: images.profile1,
        address: "No. 88, Jln Padungan, Kuching",
        menbership_ID:"1029921",
        email:"gualter@fone.co.mz",
        idNumb:"12782167821M",
        gender: "M",
        balance:"12,722.00",
        percentage:"12%",
        dependents:3,
        status:"Active",
        IdType:2,
        benefits: [1,2,3,4,5,6,7,8,9,10,11],
        expenses: [
            { id: 1, title: "Tuition Fee", description: 'Milk', total: 1330, amount: 1000, status: 'Confirmed', location: "ByProgrammers' tuition center", date: '2023-01-10' },
            { id: 2, title: "Tuition Fee", description: 'Bread', total: 33335, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2023-03-12' },
            { id: 3, title: "Tuition Fee", description: 'Bread', total: 33335, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2023-05-12' },
            { id: 4, title: "Tuition Fee", description: 'Bread', total: 33335, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2023-01-12' },
            { id: 5, title: "Tuition Fee", description: 'Bread', total: 33335, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2023-09-12' },
        ],
    },
    {
        id: "03",
        name: "Adrien Chale",
        profile_image: images.profile1,
        address: "No. 88, Jln Padungan, Kuching",
        menbership_ID:"1029921",
        email:"adrienchale@fone.co.mz",
        idNumb:"12782167821M",
        gender: "M",
        balance:"12,722.00",
        percentage:"12%",
        dependents:3,
        status:"Active",
        IdType:2,
        benefits: [1,2,3,4,5,6,7,8,9,10,11],
        expenses: [
            { id: 1, title: "Tuition Fee", description: 'Milk', total: 14440, amount: 1000, status: 'Confirmed', location: "ByProgrammers' tuition center", date: 'Feb 2022' },
            { id: 2, title: "Tuition Fee", description: 'Bread', total: 54444, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2022-01-12' },
            { id: 3, title: "Tuition Fee", description: 'Bread', total: 5444, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2022-01-12' },
            { id: 4, title: "Tuition Fee", description: 'Bread', total: 44445, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2022-01-12' },
            { id: 5, title: "Tuition Fee", description: 'Bread', total: 44445, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2022-01-12' },
            { id: 6, title: "Tuition Fee", description: 'Bread', total: 544, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2022-01-12' },
            { id: 7, title: "Tuition Fee", description: 'Bread', total: 54444, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2022-01-12' },
        ],
    }
]

const benefits = [{
    id: 1,
    name: "Medical Appliences",
    icons: icons.mediicalApliences,
    description: "Savings that are remaining",
    categoriesBenefits: [1, 2, 3],
    totalAmount: 20000
},{
    id: 2,
    name: "Blood Transfusion Services",    
    icons: icons.bloodTrans,
    description: "Savings that are remaining",
    categoriesBenefits: [1, 2, 3],
    totalAmount: 30000
},{
    id: 3,
    name: "Dentures",
    icons: icons.dentures,
    description: "Savings that are remaining",
    categoriesBenefits: [1, 2, 3],
    totalAmount: 9000
},{
    id: 4,
    name: "Funeral Benefit",
    icons: icons.funeral1,
    description: "Savings that are remaining",
    categoriesBenefits: [1, 2, 3],
    totalAmount: 25000
},{
    id: 5,
    name: "Internal Prosthesis - Evars",
    icons: icons.specialisedRadiology,
    description: "Savings that are remaining",
    categoriesBenefits: [1, 2, 3],
    totalAmount: 24000
},{
    id: 6,
    name: "Internal Prosthesis - Functional",
    icons: icons.internalPros,
    description: "Savings that are remaining",
    categoriesBenefits: [1, 2, 3],
    totalAmount: 40000
},{
    id: 7,
    name: "Internal Prosthesis - Reconstructive",
    icons: icons.internalPros,
    description: "Savings that are remaining",
    categoriesBenefits: [1, 2, 3],
    totalAmount: 21000
},{
    id: 8,
    name: "Internal Prosthesis - Vascular",
    icons: icons.internalPros,
    description: "Savings that are remaining",
    categoriesBenefits: [1, 2, 3],
    totalAmount: 20000
},{
    id: 9,
    name: "Optometry - Lenses & Glasses",
    icons: icons.optometry,
    description: "Savings that are remaining",
    categoriesBenefits: [1, 2, 3],
    totalAmount: 22200
},{
    id: 10,
    name: "Oncology Limit",
    icons: icons.OncologyL1,
    description: "Savings that are remaining",
    categoriesBenefits: [1, 2, 3],
    totalAmount: 33300
},
{
    id: 11,
    name: "Radiology",
    icons: icons.OncologyL,
    description: "Savings that are remaining",
    categoriesBenefits: [1, 2, 3],
    totalAmount: 25550
},]

const categoriesBenefits = [{
    id: 1,
    name: "Consulta",
    description: "Consultation of the benefit",
    total: 30000,
    icons: icons.authorization,
    used: 28000, 
    remaining: 2000,
    expenses: [
        { id: 1, title: "Tuition Fee", description: 'Milk', total: 14440, amount: 1000, status: 'Confirmed', location: "ByProgrammers' tuition center", date: 'Feb 2022' },
        { id: 2, title: "Tuition Fee", description: 'Bread', total: 54444, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2022-01-12' },
        { id: 3, title: "Tuition Fee", description: 'Bread', total: 5444, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2022-01-12' },
    ],
},{
    id: 2,
    name: "Analises",
    description: "Examination of the benefits",
    total: 25000,
    icons: icons.analisys,
    used:13000,
    remaining: 12000,
    expenses: [
        { id: 1, title: "Tuition Fee", description: 'Milk', total: 14440, amount: 1000, status: 'Confirmed', location: "ByProgrammers' tuition center", date: 'Feb 2022' },
        { id: 2, title: "Tuition Fee", description: 'Bread', total: 54444, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2022-01-12' },
    ],
},{
    id: 3,
    name: "Medication",
    description: "Medications of the benefits",
    total: 15000,
    icons: icons.medications,
    used:8000,
    remaining: 7000,
    expenses: [
        { id: 1, title: "Tuition Fee", description: 'Milk', total: 14440, amount: 1000, status: 'Confirmed', location: "ByProgrammers' tuition center", date: 'Feb 2022' },
        { id: 2, title: "Tuition Fee", description: 'Bread', total: 54444, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2022-01-12' },
        { id: 3, title: "Tuition Fee", description: 'Bread', total: 5444, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2022-01-12' },
        { id: 4, title: "Tuition Fee", description: 'Bread', total: 44445, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2022-01-12' },
        { id: 5, title: "Tuition Fee", description: 'Bread', total: 44445, amount: 1000, status: 'Confirmed',  location: "ByProgrammers' tuition center", date: '2022-01-12' },
      ],
}]





const hamburger = {
    id: 1,
    name: "Amina Chale",
    description: "Savings that are remaining",
    categories: [1, 2],
    price: 15.99,
    calories: 78,
    isFavourite: true
}

const hotTacos = {
    id: 2,
    name: "Adrien Chale",
    description: "Savings that are remaining",
    categories: [1, 3],
    price: 10.99,
    calories: 78,
    isFavourite: false
}

const vegBiryani = {
    id: 3,
    name: "Gualter Fone",
    description: "Savings that are remaining",
    categories: [1, 2, 3],
    price: 25.99,
    calories: 78,
    isFavourite: true
}

const wrapSandwich = {
    id: 4,
    name: "Wrap Sandwich",
    description: "Grilled vegetables sandwich",
    categories: [1, 2],
    price: 10.99,
    calories: 78,
    isFavourite: true
}

const transactionHistory = [ {
    id: 1,
    name: "Gualter Fone",
    description: "Consulta de Vista",
    categoriesTypeHosp: 2,
    contact: 849902092,
    location: "Hospital Privado",
    date: "14:20 12 Apr",
    value:"-2000",
    typeService:"Radiology"
},
{
    id: 2,
    name: "Adrien Chale",
    description: "Situado no bairro central",
    categoriesTypeHosp: 2,
    contacto: 870590903,
    location: "Hospital Central",
    date: "15:20 12 June",
    value:"-100",
    typeService:"Medication"
},
{
    id: 3,
    name: "Hama",
    description: "localizado na Somerchild",
    categoriesTypeHosp: 1,
    contacto: 870590903,
    location: "Clinica da Somerchild",
    date: "10:20 12 May",
    value:"-10000",
    typeService:"Analisys"
},
{
    id: 4,
    name: "Hama",
    description: "localizado na Somerchild",
    categoriesTypeHosp: 1,
    contacto: 870590903,
    location: "House Clinic",
    date: "12:20 12 Apr",
    value:"-7000",
    typeService:"Dentist Consultation"
},
{
    id: 5,
    name: "Gualter Fone",
    description: "localizado na Somerchild",
    categoriesTypeHosp: 1,
    contacto: 870590903,
    location: "House Clinic",
    date: "17:55 12 Apr",
    value:"-7000",
    typeService:"Transplant"
}]

const notificationHistory = [ {
    id: 1,
    name: "Gualter Fone",
    description: "Your request has been approved",
    date: "14:20 12 Apr",
    status:"Approved",
    requestType: "Authorisation - Cronic Medication",
    location: "Mediplus",
    contacto: "870222222",    
    pdfExists:1,
},
{
    id: 2,
    name: "Hama",
    description: "Please reply to the email regarding your data",
    date: "15:20 12 June",
    status:"In Process",
    requestType: "Authorisation for delivery",
    location: "Mediplus",
    contacto: 870509999,
    pdfExists:0,
},
{
    id: 3,
    name: "Adrien Chale",
    description: "Your card has been issued",
    date: "10:20 12 May",
    status:"Rejected",
    requestType: "Membership Card",
    location: "Mediplus",
    contacto: 870590902,    
    pdfExists:0,
}]




const menu = [
    {
        id: 1,
        name: "Clinicas",
        list: [
            hamburger, hotTacos, vegBiryani,
        ]
    },
    {
        id: 2,
        name: "Hospitais",
        list: [
            hamburger, vegBiryani, wrapSandwich,
        ]
    },
    {
        id: 3,
        name: "Optometrias",
        list: [
            hamburger, hotTacos, wrapSandwich,
        ]
    },
    {
        id: 4,
        name: "Dentistas",
        list: [
            hamburger, hotTacos, vegBiryani,
        ]
    },
    {
        id: 5,
        name: "Fisioterapia",
        list: [
            hamburger, vegBiryani, wrapSandwich,
        ]
    },
    {
        id: 6,
        name: "Recommended",
        list: [
            hamburger, hotTacos, wrapSandwich,
        ]
    },
    {
        id: 7,
        name: "Popular",
        list: [
            hamburger, hotTacos, wrapSandwich,
        ]
    },

]

export const newFacebookIP = [
    {
        id: 1,
        name: "Barbarians",
        thumbnail: require("../assets/images/series/barbarians/barbarians_cover.jpg"),
        stillWatching: [
            {
                id: 1,
                profile: require("../assets/images/dummy_profile/1.jpg")
            },
            {
                id: 2,
                profile: require("../assets/images/dummy_profile/2.jpg")
            },
            {
                id: 3,
                profile: require("../assets/images/dummy_profile/3.jpg")
            },
            {
                id: 4,
                profile: require("../assets/images/dummy_profile/4.jpg")
            },
            {
                id: 5,
                profile: require("../assets/images/dummy_profile/5.jpg")
            },
            {
                id: 6,
                profile: require("../assets/images/dummy_profile/6.jpg")
            },
        ],
        details: {
            image: require("../assets/images/series/barbarians/barbarians.jpg"),
            age: "16+",
            genre: "Historical Drama",
            ratings: 7.2,
            season: "SEASON 1",
            currentEpisode: 'S1 : E1 "Episode 1 : Vikings"',
            runningTime: "45m",
            progress: "0%"
        }
    },
    {
        id: 2,
        name: "Bridgerton",
        thumbnail: require("../assets/images/series/bridgerton/bridgerton_cover.jpg"),
        stillWatching: [
            {
                id: 1,
                profile: require("../assets/images/dummy_profile/6.jpg")
            },
            {
                id: 2,
                profile: require("../assets/images/dummy_profile/7.jpg")
            },
            {
                id: 3,
                profile: require("../assets/images/dummy_profile/3.jpg")
            },
            {
                id: 4,
                profile: require("../assets/images/dummy_profile/4.jpg")
            }
        ],
        details: {
            image: require("../assets/images/series/bridgerton/bridgerton.jpg"),
            age: "18+",
            genre: "Romance",
            ratings: 7.3,
            season: "SEASON 1",
            currentEpisode: 'S1 : E6 "Episode 6 : Swish"',
            runningTime: "45m",
            progress: "50%"
        }
    },
    {
        id: 3,
        name: "Money Heist",
        thumbnail: require("../assets/images/series/money_heist/money_heist_cover.jpg"),
        stillWatching: [],
        details: {
            image: require("../assets/images/series/money_heist/money_heist.jpg"),
            age: "16+",
            genre: "Crime",
            ratings: 8.3,
            season: "SEASON 1",
            currentEpisode: 'S1 : E15 "Episode 15 : Bella ciao"',
            runningTime: "45m",
            progress: "50%"
        }
    },
    {
        id: 4,
        name: "Salvation",
        thumbnail: require("../assets/images/series/salvation/salvation_cover.jpg"),
        stillWatching: [
            {
                id: 1,
                profile: require("../assets/images/dummy_profile/1.jpg")
            },
            {
                id: 2,
                profile: require("../assets/images/dummy_profile/2.jpg")
            },
            {
                id: 3,
                profile: require("../assets/images/dummy_profile/3.jpg")
            },
        ],
        details: {
            image: require("../assets/images/series/salvation/salvation.jpg"),
            age: "13+",
            genre: "Sci-Fi",
            ratings: 7.0,
            season: "SEASON 1",
            currentEpisode: 'S1 : E1 "Episode 1 : Pilot"',
            runningTime: "45m",
            progress: "0%"
        }
    },
]

export default {
    newFacebookIP,
    notificationHistory,
    transactionHistory,
    myProfile,
    categories,
    menu,
    wrapSandwich,
    vegBiryani,
    hotTacos,
    hamburger,
    benefits,
    categoriesBenefits
}