<template>
    <router-link v-if="role !== 'director'" to="/product" class="product__link">
        <button>
            <i class="fa-solid fa-left-long"></i>
            <span>Back</span>
        </button>
    </router-link>
    <router-link v-if="role === 'director'" to="/product_director" class="product__link">
        <button>
            <i class="fa-solid fa-left-long"></i>
            <span>Back</span>
        </button>
    </router-link>
    <section class="groups_brands">
        <groupsModal ref="groups"/>
        <brandsModal ref="brands"/>
        <div class="group_brands__item">
            <div class="groups_brands__table">
                <h3>Groups</h3>
                <appTable :headers="headers" :body="$store?.state?.groups">
                    <template #body_action="{ item }" v-if="role !== 'director'">
                        <span class="delete" @click="deleteModal(item)"><i class="fa-solid fa-trash-can"></i></span>
                    </template>
                </appTable>
            </div>
            <aside class="groups_brands_act">
                <button v-if="role !== 'director'" @click="openModal">Create</button>
            </aside>
        </div>
        <div class="group_brands__item">
            <div class="groups_brands__table">
                <h3>Brands</h3>
                <appTable :headers="headers2" :body="$store?.state?.brands">
                    <template #body_action="{ item }" v-if="role !== 'director'">
                        <span class="delete" @click="deleteModal1(item)"><i class="fa-solid fa-trash-can"></i></span>
                    </template>
                </appTable>
            </div>
            <aside class="groups_brands_act">
                <button v-if="role !== 'director'" @click="openModal1">Create</button>
            </aside>
        </div>
    </section>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import store from '@/store';
import appTable from '@/components/ui/app-table.vue';
import groupsModal from '@/components/pages/groups-modal.vue';
import brandsModal from '@/components/pages/brands-modal.vue';
const role = sessionStorage.getItem("role")
const groups = ref()
const brands = ref()
const params_group = ref({
    page: 1,
    per_page: 10,
    last_page: null
})
const params_brand = ref({
    page: 1,
    per_page: 10,
    last_page: null
})
const headers = ref([
    { title: "№", value: "index" },
    { title: "Name", value: "title" },
    { title: "Action", value: "action" }
])
const headers2 = ref([
    { title: "№", value: "index" },
    { title: "Name", value: "title" },
    { title: "Action", value: "action" }
])

onMounted(()=> {
    store.dispatch("getGroups", params_group?.value)
    store.dispatch("getBrands", params_brand?.value)
})

const openModal = () => {
    groups.value.openModal()
}

const deleteModal = (item) => {
    groups.value.openDeleteModal(item)
}

const openModal1 = () => {
    brands.value.openModal1()
}

const deleteModal1 = (item) => {
    brands.value.openDeleteModal1(item)
}

</script>
<style lang="scss" scoped>
$blue-color: #435ebe;
$blue-color2: #57caeb;
$input_bg: #edf2f7;
$white-color: #fff;
$red-color: #ff7976;

.product__link {
    button {
        margin: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        font-size: 18px;
        border: none;
        color: #fff;
        background-color: #435ebe;
        padding: 12px 20px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        font-weight: 500;
        background-color: #435ebe;

        i {
            font-size: 14px;
            transition: all 0.3s linear;
        }

        &:hover i {
            transform: translateX(-5px);
        }
    }
}
.groups_brands {
    width: 100%;
    display: flex;
    
    .group_brands__item {
        width: 100%;
        margin-top: 20px;


        .groups_brands__table {
            width: 100%;

            h3 {
                text-align: center;
                padding: 20px 0;
                font-size: large;
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
}
</style>