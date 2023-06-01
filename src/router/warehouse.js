export default {
    path: '/warehouseman',
    name: 'warehouseman',
    component: () => {
        return import("@/views/Warehouse/Warehouse")
    },
    children: [
        {
            path: "/profile_warehouse",
            name: "profile_warehouse",
            component: () => {
                return import("@/views/Global/Profile")
            }
        },
        {
            path: "/product",
            name: "product",
            component: () => {
                return import("@/views/Global/Product")
            }
        },
        {
            path: "/single_product/:id",
            name: "single_product",
            meta:{
                child: "single_product",
            },
            component: () => {
                return import("@/views/Warehouse/SingleProduct")
            }
        },
        {
            path: "/suppliers",
            name: "suppliers",
            component: () => {
                return import("@/views/Global/Supplier")
            }
        },
        {
            path: "/groups-brands",
            name: "groups-brands",
            meta: {
                child: "single_product"
            },
            component: () => {
                return import("@/views/Global/Groups-Brands")
            }
        },
        {
            path: "/input-invoice",
            name: "input-invoice",
            component: () => {
                return import("@/views/Global/Arrived")
            }
        },
        {
            path: "/input-invoice_item/:id",
            name: "input-invoice_item",
            meta: {
                child: "invoice_item"
            },
            component: () => {
                return import("@/views/Warehouse/InvoiceItem")
            }
        },
        {
            path: "/output-invoice",
            name: "output-invoice",
            component: () => {
                return import("@/views/Global/Delivered")
            }
        },
        {
            path: "/output-invoice_item/:id",
            name: "output-invoice_item",
            meta: {
                child: "output_invoice"
            },
            component: () => {
                return import("@/views/Warehouse/OutputItem")
            }
        },
        {
            path: "/returned-invoice",
            name: "returned-invoice",
            component: () => {
                return import("@/views/Global/Returned")
            }
        },
        {
            path: "/returned-invoice_item/:id",
            name: "returned-invoice_item",
            meta: {
                child: "returned_invoice"
            },
            component: () => {
                return import("@/views/Warehouse/ReturnedItem")
            }
        }
    ]
}