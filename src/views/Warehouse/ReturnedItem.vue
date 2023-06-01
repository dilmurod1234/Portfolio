<template>
    <section>
        <invoiceReturnedModal ref="returned_modal"/>
        <div class="invoice__item-bar">
            <div class="invoice__item">
                <span class="invoice__item-text">{{ returned_invoice?.client?.title }}</span>
                <span class="invoice__item-text">{{ returned_invoice?.total_sum }}</span>
            </div>
            <button v-if="role !== 'director' && returned_invoice?.status !== 'confirmed'" class="product__btn" @click="openModal">Add product</button>
        </div>
        <appTable :headers="headers" :body="returned_invoice_list">
            <template #body_product="{ item }">
                <span>{{ item.product.title }}</span>
            </template>
            <template #body_code="{ item }">
                <span>{{ item.product.code }}</span>
            </template>
            <template #body_action="{ item }">
                <span class="edit" v-if="returned_invoice?.status !== 'confirmed' && role !== 'director'" @click="openModalEdit(item)"><i class="fa-solid fa-pen-to-square"></i></span>
                <span class="delete" v-if="returned_invoice?.status !== 'confirmed' && role !== 'director'" @click="openModalDelete(item)"><i class="fa-solid fa-trash-can"></i></span>
            </template>
        </appTable>
        <div class="actions">
            <router-link class="btn" to="/returned-invoice" v-if="returned_invoice?.status !== 'confirmed'">Save</router-link>
            <button class="btn" v-if="returned_invoice?.status !== 'confirmed'" @click="confirmInvoice">Confirm</button>
            <button class="btn" v-if="returned_invoice?.status !== 'confirmed'" @click="deleteInvoice">Delete</button>
        </div>
    </section>
    <div class="pagination">
        <VPagination v-model="params_item.page" :pages="params_item.last_page" :range-size="1" active-color="#EAF5FF"
            @update:model-value="getOutputInvoiceItem" />
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import invoiceReturnedModal from "@/components/pages/returned-item-modal.vue";
import Notification from "@/plugins/Notification";
import http from "@/plugins/axios";
import appTable from "@/components/ui/app-table.vue";
import VPagination from "@hennge/vue3-pagination"
import store from "@/store";

const router = useRouter()
const returned_invoice_list = ref([])
const returned_invoice = ref({})
const returned_modal = ref()
const url = window.location.href.split("/")
const role = sessionStorage.getItem("role")

const params_item = ref({
    page: 1,
    per_page: 10,
    last_page: null
})
const headers = ref([
    { title: "№", value: "index" },
    { title: "Product", value: "product" },
    { title: "Code", value: "code" },
    { title: "Price", value: "price" },
    { title: "Quantity", value: "quantity" },
    { title: "Invoice", value: "invoice" },
    { title: "Action", value: "action" }
])

const getOutputInvoiceItem = () => {
    http.get(`/api/warehouse/returned-invoice-item/`, {
        params: {
            invoice: url[4],
            per_page: params_item.value.per_page,
            page: params_item.value.page
        }
    }).then(res => {
        returned_invoice_list.value = res.data.results
        res.data.results.forEach((item, index) => {
            item.index = params_item.value.page * params_item.value.per_page - (params_item.value.per_page - 1) + index
        })
        params_item.value.last_page = Math.ceil(res.data.count / params_item.value.per_page)
    })
}

async function confirmInvoice() {
    try {
        await http.post(`/api/warehouse/returned-invoice/${url[4]}/confirm/`).then(res => {
            if (res.status === 200) {
                router.push({name: "returned-invoice"})
                Notification({ text: "Status confirmed !!!", type: "warning" })
            }
        })
    } catch (error) {
        Notification({ text: "Error !!!", type: "danger" })
    }
}

async function deleteInvoice() {
    try {
        await http.delete(`/api/warehouse/returned-invoice/${url[4]}/`).then(res => {
            if (res.status === 204) {
                router.push({name: "returned-invoice"})
                Notification({ text: "Invoice deleted !!!", type: "danger" })
            }
        })
    } catch (error) {
        Notification({ text: "Something wrong !!!", type: "danger" })
    }
}

const getOutputItem = () => {
    http.get(`/api/warehouse/returned-invoice/${url[4]}/`).then(res => {
        returned_invoice.value = res.data
    })
}

onMounted(() => {
    getOutputInvoiceItem()
    getOutputItem()
    store.dispatch("getProducts")
})

const openModal = () => {
    returned_modal.value.openModal()
}

const openModalEdit = (item) => {
    returned_modal.value.openModal(item)
}

const openModalDelete = (item) => {
    returned_modal.value.openDeleteModal(item)
}

</script>
<style lang="scss">
$blue-color2: #57caeb;
$red-color: #ff7976;

.invoice__item-bar {
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .invoice__item {
        display: flex;
        align-items: center;
        gap: 20px;

        .invoice__item-text {
            padding: 8px 12px;
            color: #435ebe;
            box-shadow: 0px 0px 0px 2px #b9dde7;
            font-size: 20px;
            border-radius: 5px;
        }
    }

    .product__btn {
        width: 20%;
        margin: 10px;
        align-self: flex-end;
        border: none;
        color: #fff;
        background-color: #435ebe;
        padding: 12px 20px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
    }
}

.actions {
    padding: 20px 15px;
    display: flex;
    align-items: center;
    gap: 10px;

    %button {
        width: 80px;
        padding: 10px 15px;
        font-size: 14px;
        border-radius: 5px;
        border: none;
        text-align: center;
        color: #fff;
        cursor: pointer;
    }

    .btn:nth-child(1) {
        @extend %button;
        background-color: #57caeb;
    }

    .btn:nth-child(2) {
        @extend %button;
        background-color: #435ebe;
    }

    .btn:nth-child(3) {
        @extend %button;
        background-color: #ff7976;
    }
}

%action {
    margin: 0px 5px;
    font-size: 18px;
    cursor: pointer;
    border: none;
    border-radius: 3px;
}

.edit {
    @extend %action;

    i {
        padding: 5px;
        color: $blue-color2
    }
}

.delete {
    @extend %action;

    i {
        color: $red-color;
    }
}

.pagination {
    width: 98%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 10px 0px;
}
</style>