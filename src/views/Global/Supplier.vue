<template>
    <section class="groups_brands">
        <supplierModal ref="supplier"/>
        <div class="group_brands__item">
            <div class="groups_brands__table">
                <appTable :headers="headers" :body="$store?.state?.suppliers">
                    <template #body_action="{item}" v-if="role !== 'director'">
                        <span class="edit" @click="openModalEdit(item)"><i class="fa-solid fa-pen-to-square"></i></span>
                        <span class="delete" @click="deleteModal(item)"><i class="fa-solid fa-trash-can"></i></span>
                    </template>
                </appTable>
            </div>
            <aside class="groups_brands_act">
                <button v-if="role !== 'director'" @click="openModal">Create</button>
            </aside>
        </div>
    </section>
</template>
<script setup>
import { ref } from 'vue';
import appTable from '@/components/ui/app-table.vue';
import supplierModal from '@/components/pages/supplier-modal.vue';

const role = sessionStorage.getItem("role")
const supplier = ref()
const headers = ref([
    { title: "№", value: "id" },
    { title: "Name", value: "title" },
    { title: "Address", value: "address" },
    { title: "Credit", value: "credit" },
    { title: "Action", value: "action" },
])
const openModal = () => {
    supplier.value.openModal()
}
const openModalEdit = (item) => {
    supplier.value.openModal(item)
}
const deleteModal = (item) => {
    supplier.value.openDeleteModal(item)
}

</script>
<style lang="scss" scoped>
$blue-color: #435ebe;
$blue-color2: #57caeb;
$input_bg: #edf2f7;
$white-color: #fff;
$red-color: #ff7976;

.groups_brands {
    width: 100%;
    padding: 10px;

    .group_brands__item {
        width: 100%;
        margin-top: 20px;

        .groups_brands__table {
            width: 100%;

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

        .groups_brands_act {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            button {
                padding: 10px 20px;
                color: $white-color;
                background-color: $blue-color2;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                margin-left: 10px;
                letter-spacing: 0.8px;
            }
        }
    }
}</style>