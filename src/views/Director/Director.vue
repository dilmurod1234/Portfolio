<template>
    <section class="director">
        <div :class="isShow ? 'director__sidebar1' : 'director__sidebar'">
            <Sidebar :isShow="isShow" :isShowItem="isShowItem" :global_sidebar="global_sidebar"/>
        </div>
        <div :class="isShow ? 'director__main' : 'director__main1'">
            <div class="director__navbar">
                <Navbar :path="path"/>
            </div>
            <router-view class="router"></router-view>
        </div>
    </section>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/layout/Navbar.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import store from '@/store';

const path = ref("profile_director")
const global_sidebar = ref([
    {name: "Dashboard", path: "/dashboard", icon: "fa-solid fa-chart-column", child: ""},
    {name: "Dashboard demo", path: "/dashboard_demo", icon: "fa-solid fa-chart-column", child: ""},
    {name: "Products", path: "/product_director", icon: "fa-solid fa-list", child: "single_product"},
    {name: "Arrived", path: "/input-invoice_d", icon: "fa-solid fa-building-circle-check", child: "invoice_item"},
    {name: "Delivered", path: "/output-invoice_d", icon: "fa-solid fa-building-circle-arrow-right", child: "output_invoice"},
    {name: "Returned", path: "/returned-invoice_d", icon: "fa-solid fa-building-circle-exclamation", child: "returned_invoice"},
    {name: "Suppliers", path: "/suppliers_director", icon: "fa-solid fa-truck-field", child: ""},
    {name: "Clients", path: "/clients_director", icon: "fa-solid fa-coins", child: ""},
    {name: "Income", path: "/income_director", icon: "fa-solid fa-coins", child: ""},
    {name: "Expence", path: "/expence_director", icon: "fa-solid fa-coins", child: ""},
])
const isShow = ref(false)
const isShowItem = () => {
    isShow.value = !isShow.value
}

onMounted(() => {
    store.dispatch("getMe")
    store.dispatch("getSuppliers")
    store.dispatch("getGroups")
    store.dispatch("getBrands")
})

</script>
<style scoped lang="scss">

$bg-color: #F2F7FF;

.director{
    width: 100%;
    height: 100vh;
    display: flex;
    %director__global{
        height: 100%;
        background-color: $bg-color;
        transition: all 0.4s linear;
    }

    .director__main1{
        transition: all 0.4s;
        width: calc(100% - 300px);
        @extend %director__global
    }
    .director__main{
        transition: all 0.4s;
        width: 100%;
        @extend %director__global
    }

    .director__sidebar{
        width: 300px;
    }
    .director__sidebar1{
        width: 72px;
    }

    .director__navbar{
        width: 100%;
        position: sticky;
        top: 0;
    }
}
@media screen and (max-width: 1024px){
    %director__global2{
        height: 100%;
        background-color: $bg-color;
        transition: all 0.4s linear;
    }

    .director__sidebar{
        width: 62px !important;
    }

    .director__main1{
        width: calc(100% - 53px) !important;
        @extend %director__global2
    }
}
    
</style>