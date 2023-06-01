<template>
    <section class="product__lists-table">
        <productModal ref="product" />
        <div class="product__lists-act">
            <router-link v-if="role !== 'director'" to="/groups-brands" class="product__link">
                <button>
                    <span>Groups and Brands</span>
                    <i class="fa-solid fa-right-long"></i>
                </button>
            </router-link>
            <router-link v-if="role === 'director'" to="/groups-brands_director" class="product__link">
                <button>
                    <span>Groups and Brands</span>
                    <i class="fa-solid fa-right-long"></i>
                </button>
            </router-link>
            <button v-if="role !== 'director'" class="product__btn" @click="openModal">Add product</button>
        </div>
        <appTable :headers="headers" :body="$store.state.products_list">
            <template #body_group="{ item }">
                <span>{{ item.group.title }}</span>
            </template>
            <template #body_brand="{ item }">
                <span>{{ item.brand.title }}</span>
            </template>
            <template #body_description="{ item }">
                <span class="product__lists-table-text">{{ item.description }}</span>
            </template>
            <template #body_title="{ item }">
                <span class="product__lists-table-text">{{ item.title }}</span>
            </template>
            <template #body_action="{ item }">
                <router-link v-if="role !== 'director'" :to="{ name: 'single_product', params: { id: item.id } }" class="product__lists-icon">
                    <span><i class="fa-solid fa-eye"></i></span>
                </router-link>
                <router-link :to="{ name: 'single_product_d', params: { id: item.id } }" class="product__lists-icon">
                    <span><i class="fa-solid fa-eye"></i></span>
                </router-link>
            </template>
        </appTable>
    </section>
    <div class="pagination">
        <VPagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#EAF5FF" 
        @update:model-value="$store.dispatch('getProducts', params)"/>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import appTable from '@/components/ui/app-table.vue';
import productModal from '@/components/pages/product-modal.vue';
import VPagination from "@hennge/vue3-pagination"
import store from '@/store';

const role = sessionStorage.getItem("role")
const product = ref()
const params = ref({
    page: 1,
    per_page: 10,
    last_page: null
})
const headers = ref([
    { title: "№", value: "index" },
    { title: "Name", value: "title" },
    { title: "Code", value: "code" },
    { title: "Brand", value: "brand" },
    { title: "Group", value: "group" },
    { title: "Arrival price", value: "current_arrival_price" },
    { title: "Selling price", value: "current_selling_price" },
    { title: "Description", value: "description" },
    { title: "Action", value: "action" }
])

onMounted(() => {
    store.dispatch("getProducts", params?.value)
    store.dispatch("getGroups")
    store.dispatch("getBrands")
})

const openModal = () => {
    product.value.openModal()
}

</script>
<style lang="scss">
.product__lists-table {
    width: 100%;
    display: flex;
    flex-direction: column;

    .product__lists-act {
        display: flex;
        align-items: center;
        justify-content: space-between;

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
                    transform: translateX(5px);
                }
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

    .product__lists-table-text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .product__lists-icon {
        span {
            color: #435ebe;
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