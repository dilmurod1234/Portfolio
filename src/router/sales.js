export default {
    path: '/salesman',
    name: 'salesman',
    component: () => {
        return import("@/views/Sales/Sales")
    },
    children: [
        {
            path: "/profile_salesman",
            name: "profile_salesman",
            component: () => {
                return import("@/views/Global/Profile")
            }
        },
        {
            path: "/clients",
            name: "clients",
            component: () => {
                return import("@/views/Global/Clients")
            }
        }
    ]
}