<template>
    <section class="warehouse">
        <div :class="isShow ? 'warehouse__sidebar1' : 'warehouse__sidebar'">
            <Sidebar :isShow="isShow" :isShowItem="isShowItem" :global_sidebar="global_sidebar"/>
        </div>
        <div :class="isShow ? 'warehouse__main' : 'warehouse__main1'">
            <div class="warehouse__navbar">
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

const path = ref("profile_warehouse")
const global_sidebar = ref([
    {name: "Products", path: "/product", icon: "fa-solid fa-list", child: "single_product"},
    {name: "Arrived", path: "/input-invoice", icon: "fa-solid fa-building-circle-check", child: "invoice_item"},
    {name: "Delivered", path: "/output-invoice", icon: "fa-solid fa-building-circle-arrow-right", child: "output_invoice"},
    {name: "Returned", path: "/returned-invoice", icon: "fa-solid fa-building-circle-exclamation", child: "returned_invoice"},
    {name: "Suppliers", path: "/suppliers", icon: "fa-solid fa-truck-field", child: ""}
])
const isShow = ref(false)
const isShowItem = () => {
    isShow.value = !isShow.value
}

onMounted(() => {
    store.dispatch("getMe")
    store.dispatch("getSuppliers")
})

</script>
<style scoped lang="scss">

$bg-color: #F2F7FF;

.warehouse{
    width: 100%;
    height: 100vh;
    display: flex;
    %warehouse__global{
        height: 100%;
        background-color: $bg-color;
        transition: all 0.4s linear;
    }

    .warehouse__main1{
        transition: all 0.4s;
        width: calc(100% - 300px);
        @extend %warehouse__global
    }
    .warehouse__main{
        transition: all 0.4s;
        width: 100%;
        @extend %warehouse__global
    }

    .warehouse__sidebar{
        width: 300px;
    }
    .warehouse__sidebar1{
        width: 72px;
    }

    .warehouse__navbar{
        width: 100%;
        position: sticky;
        top: 0;
    }
}
@media screen and (max-width: 1024px){
    %warehouse__global2{
        height: 100%;
        background-color: $bg-color;
        transition: all 0.4s linear;
    }

    .warehouse__sidebar{
        width: 62px !important;
    }

    .warehouse__main1{
        width: calc(100% - 53px) !important;
        @extend %warehouse__global2
    }
}
    
</style>