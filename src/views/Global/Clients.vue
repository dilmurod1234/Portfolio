<template>
    <section class="clients">
        <clientsModal ref="clients" />
        <button class="product__btn" @click="openModal" v-if="role !== 'director'">Add client</button>
        <appTable :headers="headers" :body="$store?.state?.clients">
            <template #body_action="{ item }">
                <span v-if="item.status !== 'confirmed' && role !== 'director'" class="delete"
                    @click="openModalDelete(item)"><i class="fa-solid fa-trash-can"></i></span>
                <span v-if="item.status !== 'confirmed' && role !== 'director'" class="edit" @click="openModalEdit(item)"><i
                        class="fa-solid fa-pen-to-square"></i></span>
            </template>
        </appTable>
    </section>
    <div class="pagination">
        <VPagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#EAF5FF"
            @update:model-value="$store.dispatch('getClients', params)" />
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import appTable from '@/components/ui/app-table.vue';
import VPagination from "@hennge/vue3-pagination"
import clientsModal from '@/components/pages/clients-modal.vue';
import store from '@/store';

const role = sessionStorage.getItem("role")
const clients = ref()
const params = ref({
    page: 1,
    per_page: 10,
    last_page: null
})
const headers = ref([
    { title: "№", value: "index" },
    { title: "Name", value: "title" },
    { title: "Phone number", value: "phone_number" },
    { title: "Address", value: "address" },
    { title: "Action", value: "action" }
])

onMounted(() => {
    store.dispatch("getClients", params?.value)
})

const openModal = () => {
    clients.value.openModal()
}

const openModalEdit = (item) => {
    clients.value.openModal(item)
}

const openModalDelete = (item) => {
    clients.value.openDeleteModal(item)
}

</script>
<style lang="scss">
$red-color: #ff7976;
$blue-color2: #57caeb;

.clients {
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