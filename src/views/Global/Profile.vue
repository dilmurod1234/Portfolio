<template>
    <section class="profile">
        <editModal ref="profile_modal"/>
        <changeRole ref="change_role"/>
        <changePassword ref="change_password"/>
        <div class="profile__items">
            <div class="profile__item1">
                <div class="profile__item1-img">
                    <img :src="$store?.state?.me?.image" alt="User img">
                </div>
                <p>{{ $store?.state?.me?.first_name }} {{ $store?.state?.me?.last_name }}</p>
                <button class="profile__item1-edit" @click="openModalEdit($store?.state?.me)">Edit profile</button>
            </div>
            <div class="profile__item2">
                <p>
                    <span>Phone number</span>
                    <i class="fa-solid fa-right-long"></i>
                    <span>{{ $store?.state?.me?.phone_number }}</span>
                </p>
                <p>
                    <span>Email</span>
                    <i class="fa-solid fa-right-long"></i>
                    <span>{{ $store?.state?.me?.email }}</span>
                </p>
                <p>
                    <span>Username</span>
                    <i class="fa-solid fa-right-long"></i>
                    <span>{{ $store?.state?.me?.username }}</span>
                </p>
                <p>
                    <span>Roles</span>
                    <i class="fa-solid fa-right-long"></i>
                    <span v-for="item in $store?.state?.me?.roles" :key="item">{{ item }}</span>
                </p>
                <p>
                    <span>Current role</span>
                    <i class="fa-solid fa-right-long"></i>
                    <span>{{ $store?.state?.me?.current_role }}</span>
                    <button class="profile__item-change_role" @click="Open_Change_Role_Modal">change</button>
                </p>
                <button class="profile__item2-change-p" @click="Open_Change_Password_Modal">Change password</button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import editModal from '@/components/pages/edit-modal.vue';
import changeRole from '@/components/pages/change-role.vue';
import changePassword from '@/components/pages/change-password.vue';
import store from '@/store';

const profile_modal = ref()
const change_role = ref()
const change_password = ref()

onMounted(()=>{
    store.dispatch("getMe")
})

const openModalEdit = (item) => {
    profile_modal.value.openModal(item)
}

const Open_Change_Role_Modal = () => {
    change_role.value.openRoleModal()
}

const Open_Change_Password_Modal = () => {
    change_password.value.openPasswordModal()
}

</script>

<style scoped lang="scss">
$white-color: #FFFFFF;
$blue-color: #435ebe;
$green-color: #e7e732;
.profile{
    padding: 10px;
    margin: 10px;
    .profile__items{
        width: 100%;
        height: 100%;
        background-color: $white-color;
        margin-top: 25px;
        border-radius: 10px;
        padding: 50px 15px;
        display: flex;
        gap: 40px;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        .profile__item1{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            p{
                font-size: 22px;
                font-weight: 500;
            }
            .profile__item1-img{
                width: 240px;
                height: 240px;
                cursor: pointer;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                }
            }
            .profile__item1-edit{
                width: 100%;
                padding: 10px 0px;
                border: none;
                background-color: $blue-color;
                color: $white-color;
                border-radius: 5px;
                font-size: 17px;
                cursor: pointer;
            }
        }
        .profile__item2{
            p{
                display: flex;
                align-items: center;
                gap: 10px;
                cursor: pointer;
                font-size: 18px;
                padding: 5px 0px;
                font-weight: 500;
                i{
                    font-size: 14px;
                    transition: all 0.3s linear;
                }
                &:hover i{
                    transform: translateX(5px);
                    color: $blue-color;
                }
                .profile__item-change_role{
                    padding: 5px 10px;
                    border: none;
                    background-color: $blue-color;
                    color: $white-color;
                    font-size: 16px;
                    border-radius: 5px;
                    cursor: pointer;
                }
                img{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
            }
            .profile__item2-change-p{
                margin-top: 20px;
                width: 100%;
                padding: 10px 0px;
                background-color: $green-color;
                color: #000;
                border-radius: 5px;
                border: none;
                font-size: 17px;
                cursor: pointer;
            }
        }
    }
}

</style>