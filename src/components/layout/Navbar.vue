<template>
    <section class="warehouse__navbar">
        <div class="warehouse__navbar-prof">
            <img :src="$store?.state?.me?.image" @click="isShow" alt="user">
            <aside :class="isHide ? 'warehouse__user-show' : 'warehouse__user-hide'">
                <ul>
                    <li @click="Go_Profile">Profile</li>
                    <li @click="Log_Out">Log out</li>
                </ul>
            </aside>
        </div>
    </section>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps({
    path: {
        type: String
    }
})
const isHide = ref(false)
const isShow = () => {
    isHide.value = !isHide.value
}
const Log_Out = () => {
    sessionStorage.removeItem("token")
    location.reload()
}
const Go_Profile = () => {
    router.push({ name: props.path })
    isHide.value = false
}
</script>
<style scoped lang="scss">
$bg-color: #fff;
$blue-color: #435ebe;

.warehouse__navbar {
    position: sticky;
    top: 0;
    width: 100%;
    padding: 8px 40px;
    background-color: $bg-color;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.06);
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .warehouse__navbar-prof {
        width: 55px;
        height: 55px;
        background-color: $bg-color;
        border-radius: 50%;
        cursor: pointer;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
            position: relative;
        }

        .warehouse__user-hide {
            display: none;
        }

        .warehouse__user-show {
            display: block;
            position: absolute;
            top: 100%;
            right: 20px;
            width: 100px;
            height: 100px;
            border-radius: 5px;
            box-shadow: 2px 2px 2px 2px rgb(224, 223, 223);

            ul {
                width: 100%;
                height: 100%;
                padding-left: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                list-style: none;
                background-color: $bg-color;

                li {
                    width: 100%;
                    text-align: center;
                    padding: 12px;
                    font-size: 17px;
                    transition: all 0.4s linear;
                    letter-spacing: 0.4px;

                    &:hover {
                        background-color: $blue-color;
                        color: $bg-color;
                    }
                }
            }
        }
    }
}</style>