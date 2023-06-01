export default {
    path: '/financier',
    name: 'financier',
    component: () => {
        return import("@/views/Finance/Finance")
    },
    children: [
        {
            path: "/profile_financier",
            name: "profile_financier",
            component: () => {
                return import("@/views/Global/Profile")
            }
        },
        {
            path: "/income",
            name: "income",
            component: () => {
                return import("@/views/Global/Income")
            }
        },
        {
            path: "/expence",
            name: "expence",
            component: () => {
                return import("@/views/Global/Expence")
            }
        }
    ]
}