<template>
    <section class="finance">
        <div :class="isShow ? 'finance__sidebar1' : 'finance__sidebar'">
            <Sidebar :isShow="isShow" :isShowItem="isShowItem" :global_sidebar="global_sidebar"/>
        </div>
        <div :class="isShow ? 'finance__main' : 'finance__main1'">
            <div class="finance__navbar">
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

const path = ref("profile_finance")
const global_sidebar = ref([
    {name: "Income", path: "/income", icon: "fa-solid fa-coins", child: ""},
    {name: "Expence", path: "/expence", icon: "fa-solid fa-coins", child: ""}
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

.finance{
    width: 100%;
    height: 100vh;
    display: flex;
    %finance__global{
        height: 100%;
        background-color: $bg-color;
        transition: all 0.4s linear;
    }

    .finance__main1{
        transition: all 0.4s;
        width: calc(100% - 300px);
        @extend %finance__global
    }
    .finance__main{
        transition: all 0.4s;
        width: 100%;
        @extend %finance__global
    }

    .finance__sidebar{
        width: 300px;
    }
    .finance__sidebar1{
        width: 72px;
    }

    .finance__navbar{
        width: 100%;
        position: sticky;
        top: 0;
    }
}
@media screen and (max-width: 1024px){
    %finance__global2{
        height: 100%;
        background-color: $bg-color;
        transition: all 0.4s linear;
    }

    .finance__sidebar{
        width: 62px !important;
    }

    .finance__main1{
        width: calc(100% - 53px) !important;
        @extend %finance__global2
    }
}
    
</style>