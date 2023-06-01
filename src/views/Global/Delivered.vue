<template>
    <section class="invoice">
        <outputModal ref="output"/>
        <button class="product__btn" @click="openModal" v-if="role !== 'director'">Add output invoice</button>
        <appTable :headers="headers" :body="output_invoice">
            <template #body_clients="{ item }">
                <span>{{ item.client.title }}</span>
            </template>
            <template #body_clients_address="{ item }">
                <span>{{ item.client.address }}</span>
            </template>
            <template #body_action="{ item }" #body_status="{item}">
                <router-link v-if="role !== 'director'" :to="{ name: 'output-invoice_item', params: { id: item.id } }"
                    class="product__lists-icon">
                    <span><i class="fa-solid fa-eye"></i></span>
                </router-link>
                <router-link v-else :to="{ name: 'output-invoice_item_d', params: { id: item.id } }"
                    class="product__lists-icon">
                    <span><i class="fa-solid fa-eye"></i></span>
                </router-link>
                <span v-if="item.status !== 'confirmed' && role !== 'director'" class="delete"
                    @click="openModalDelete(item)"><i class="fa-solid fa-trash-can"></i></span>
                <span v-if="item.status !== 'confirmed' && role !== 'director'" class="edit" @click="openModalEdit(item)"><i
                        class="fa-solid fa-pen-to-square"></i></span>
            </template>
        </appTable>
    </section>
    <div class="pagination">
        <VPagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#EAF5FF"
            @update:model-value="getOutputInvoice" />
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import appTable from '@/components/ui/app-table.vue';
import VPagination from "@hennge/vue3-pagination"
import http from '@/plugins/axios';
import outputModal from '@/components/pages/output-modal.vue';

const role = sessionStorage.getItem("role")
const output = ref()
const output_invoice = ref([])
const params = ref({
    page: 1,
    per_page: 10,
    last_page: null
})
const headers = ref([
    { title: "№", value: "index" },
    { title: "Clients", value: "clients" },
    { title: "Total sum", value: "total_sum" },
    { title: "Address", value: "clients_address" },
    { title: "Status", value: "status" },
    { title: "Description", value: "description" },
    { title: "Action", value: "action" }
])

const getOutputInvoice = () => {
    http.get("/api/warehouse/output-invoice", {
        params: {
            per_page: params.value.per_page,
            page: params.value.page
        }
    }).then(res => {
        output_invoice.value = res.data.results
        res.data.results.forEach((item, index) => {
            item.index = params.value.page * params.value.per_page - (params.value.per_page - 1) + index
        })
        params.value.last_page = Math.ceil(res.data.count / params.value.per_page)
    })
}

onMounted(() => {
    getOutputInvoice()
})

const openModal = () => {
    output.value.openModal()
}

const openModalEdit = (item) => {
    output.value.openModal(item)
}

const openModalDelete = (item) => {
    output.value.openDeleteModal(item)
}

</script>
<style lang="scss">
$red-color: #ff7976;
$blue-color2: #57caeb;

.invoice {
    width: 100%;
    display: flex;
    flex-direction: column;

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

    .product__lists-icon {
        span {
            color: #435ebe;
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
}




.pagination {
    width: 98%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 10px 0px;
}
</style>