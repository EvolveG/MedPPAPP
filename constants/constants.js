const onboarding_screens = [
    {
        id: 1,
        backgroundImage: require("../assets/images/background_01.png"),
        bannerImage: require("../assets/images/ManageProgress.png"),
        title: "VISION STATEMENT",
        description: "Mediplus is unmatched in our service offerings in Mozambique. We strive to be the market leader, providing exceptional healthcare cover to all our members, through dedicated team effort and efficient processes."
    },
    {
        id: 2,
        backgroundImage: require("../assets/images/background_02.png"),
        bannerImage: require("../assets/images/RecieveNotification.png"),
        title: "EFFICIENCY",
        description: "Real Time Updates/ Notificatios in on all of our platforms"
    },
    {
        id: 3,
        backgroundImage: require("../assets/images/background_01.png"),
        bannerImage: require("../assets/images/saveTime.png"),
        title: "Start Now...",
        description: "We are committed to providing the highest level of healthcare services to our members by being available all the time."
    }
]


const screens = {
    main_layout: "MainLayout",
    home: "Home",    
    notification: "Notification",
    requests: "Requests",
    documentRequests: "Forms",
    memBerCardRequests: "Membership Cards",
    authorizationRequests: "Authorizations",
    manageDependent: "Manage Dependent",
    history: "Transaction History",
    HealthCare: "Medical Care",
    contacts: "Contacts",
    help: "Help Chat",
    profile: "Profile",
}

const bottom_tabs = [
    {
        id: 0,
        label: screens.home,
    },
    {
        id: 1,
        label: screens.notification,
    },
    {
        id: 2,
        label: screens.HealthCare,
    },
    {
        id: 3,
        label: screens.contacts,
    },
    {
        id: 4,
        label: screens.manageDependent,
    },
    {
        id: 5,
        label: screens.history,
    },
    {
        id: 6,
        label: screens.requests,
    },
    {
        id: 7,
        label: screens.help,
    },
    {
        id: 8,
        label: screens.documentRequests,
    },
    {
        id: 9,
        label: screens.memBerCardRequests,
    },
    {
        id: 10,
        label: screens.authorizationRequests,
    },
    {
        id: 11,
        label: screens.profile,
    },
]


export default {
    screens,
    bottom_tabs,
    onboarding_screens,
}