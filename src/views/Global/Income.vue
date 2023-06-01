<template>
    <section>
        <incomeModal ref="income_modal"/>
        <div class="invoice__item-bar">
            <button class="hidden">0</button>
            <button v-if="role !== 'director'" class="product__btn" @click="openModal">Add income</button>
        </div>
        <appTable :headers="headers" :body="finance_income">
           
        </appTable>
    </section>
    <div class="pagination">
        <VPagination v-model="params_item.page" :pages="params_item.last_page" :range-size="1" active-color="#EAF5FF"
            @update:model-value="getIncome" />
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import incomeModal from "@/components/pages/income-modal.vue";
import http from "@/plugins/axios";
import appTable from "@/components/ui/app-table.vue";
import VPagination from "@hennge/vue3-pagination"
import store from "@/store";

const router = useRouter()
const finance_income = ref([])
const income_modal = ref()
const url = window.location.href.split("/")
const role = sessionStorage.getItem("role")

const params_item = ref({
    page: 1,
    per_page: 10,
    last_page: null
})
const headers = ref([
    { title: "№", value: "index" },
    { title: "Income type", value: "income_type" },
    { title: "Invoice", value: "invoice" },
    { title: "Amount", value: "amount" }
])

const getIncome = () => {
    http.get(`/api/finance/income/`, {
        params: {
            invoice: url[4],
            per_page: params_item.value.per_page,
            page: params_item.value.page
        }
    }).then(res => {
        finance_income.value = res.data.results
        res.data.results.forEach((item, index) => {
            item.index = params_item.value.page * params_item.value.per_page - (params_item.value.per_page - 1) + index
        })
        params_item.value.last_page = Math.ceil(res.data.count / params_item.value.per_page)
    })
}

onMounted(() => {
    getIncome()
    store.dispatch("getClients", params_item?.value)
})

const openModal = () => {
    income_modal.value.openModal()
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

    .hidden{
        opacity: 0;
    }

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