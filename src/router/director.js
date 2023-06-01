
export default {
    path: '/director',
    name: 'director',
    component: () => {
        return import("@/views/Director/Director")
    },
    children: [
        {
            path: "/profile_director",
            name: "profile_director",
            component: () => {
                return import("@/views/Global/Profile")
            }
        },
        {
            path: "/product_director",
            name: "product_director",
            component: () => {
                return import("@/views/Global/Product")
            }
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: () => {
                return import("@/views/Director/Dashboard")
            }
        },
        {
            path: "/dashboard_demo",
            name: "dashboard_demo",
            component: () => {
                return import("@/views/Director/DashboardDemo")
            }
        },
        {
            path: "/income_director",
            name: "income_director",
            component: () => {
                return import("@/views/Global/Income")
            }
        },
        {
            path: "/expence_director",
            name: "expence_director",
            component: () => {
                return import("@/views/Global/Expence")
            }
        },
        {
            path: "/single_product_d/:id",
            name: "single_product_d",
            meta:{
                child: "single_product",
            },
            component: () => {
                return import("@/views/Warehouse/SingleProduct")
            }
        },
        {
            path: "/suppliers_director",
            name: "suppliers_director",
            component: () => {
                return import("@/views/Global/Supplier")
            }
        },
        {
            path: "/groups-brands_director",
            name: "groups-brands_director",
            meta: {
                child: "single_product"
            },
            component: () => {
                return import("@/views/Global/Groups-Brands")
            }
        },
        {
            path: "/clients_director",
            name: "clients_director",
            component: () => {
                return import("@/views/Global/Clients")
            }
        },
        {
            path: "/input-invoice_d",
            name: "input-invoice_d",
            component: () => {
                return import("@/views/Global/Arrived")
            }
        },
        {
            path: "/input-invoice_item_d/:id",
            name: "input-invoice_item_d",
            meta: {
                child: "invoice_item"
            },
            component: () => {
                return import("@/views/Warehouse/InvoiceItem")
            }
        },
        {
            path: "/input-invoice_d",
            name: "input-invoice_d",
            component: () => {
                return import("@/views/Global/Arrived")
            }
        },
        {
            path: "/output-invoice_d",
            name: "output-invoice_d",
            component: () => {
                return import("@/views/Global/Delivered")
            }
        },
        {
            path: "/output-invoice_item_d/:id",
            name: "output-invoice_item_d",
            meta: {
                child: "output_invoice"
            },
            component: () => {
                return import("@/views/Warehouse/OutputItem")
            }
        },
        {
            path: "/returned-invoice_d",
            name: "returned-invoice_d",
            component: () => {
                return import("@/views/Global/Returned")
            }
        },
        {
            path: "/returned-invoice_item_d/:id",
            name: "returned-invoice_item_d",
            meta: {
                child: "returned_invoice"
            },
            component: () => {
                return import("@/views/Warehouse/ReturnedItem")
            }
        }
    ]

}