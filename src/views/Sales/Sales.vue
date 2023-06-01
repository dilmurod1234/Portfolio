<template>
    <section class="salesman">
        <div :class="isShow ? 'salesman__sidebar1' : 'salesman__sidebar'">
            <Sidebar :isShow="isShow" :isShowItem="isShowItem" :global_sidebar="global_sidebar"/>
        </div>
        <div :class="isShow ? 'salesman__main' : 'salesman__main1'">
            <div class="salesman__navbar">
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

const path = ref("profile_salesman")
const global_sidebar = ref([
    { name: "Clients", path: "/clients", icon: "fa-solid fa-coins", child: ""}
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

.salesman{
    width: 100%;
    height: 100vh;
    display: flex;
    %salesman__global{
        height: 100%;
        background-color: $bg-color;
        transition: all 0.4s linear;
    }

    .salesman__main1{
        transition: all 0.4s;
        width: calc(100% - 300px);
        @extend %salesman__global
    }
    .salesman__main{
        transition: all 0.4s;
        width: 100%;
        @extend %salesman__global
    }

    .salesman__sidebar{
        width: 300px;
    }
    .salesman__sidebar1{
        width: 72px;
    }

    .salesman__navbar{
        width: 100%;
        position: sticky;
        top: 0;
    }
}
@media screen and (max-width: 1024px){
    %salesman__global2{
        height: 100%;
        background-color: $bg-color;
        transition: all 0.4s linear;
    }

    .salesman__sidebar{
        width: 62px !important;
    }

    .salesman__main1{
        width: calc(100% - 53px) !important;
        @extend %salesman__global2
    }
}
    
</style>