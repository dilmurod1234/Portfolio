<template>
    <appModal v-model="dialog" :width="'40%'">
        <div class="profile__roles">
            <p>Select your role</p>
            <select v-model="current_role.selected_role">
                <option disabled selected hidden value="">Select your role</option>
                <option v-for="(item, index) in current_role.roles" :key="index">
                    {{ item }}
                </option>
            </select>
            <div class="profile__roles-action">
                <button @click="Role_change">Save</button>
            </div>
        </div>
    </appModal>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Notification from '@/plugins/Notification';
import appModal from '../ui/app-modal.vue';
import http from '@/plugins/axios';
const router = useRouter()

const current_role = ref({
    roles: [
        "director",
        "salesman",
        "warehouseman",
        "financier"
    ],
    selected_role: ""
})
const dialog = ref(false)

const openRoleModal = () => {
    dialog.value = !dialog.value
}

async function Role_change() {
    try {
        await http.post("/api/user/change-role/", {
            role: current_role.value.selected_role
        }).then(res => {
            sessionStorage.removeItem("role")
            sessionStorage.setItem("role", current_role.value.selected_role)
            if (res.status === 200) {
                if (current_role.value.selected_role === "director") {
                    router.push({ name: "profile_director" })
                } else if (current_role.value.selected_role === "salesman") {
                    router.push({ name: "profile_salesman" })
                } else if (current_role.value.selected_role === "warehouseman") {
                    router.push({ name: "profile_warehouse" })
                } else if (current_role.value.selected_role === "financier") {
                    router.push({ name: "profile_financier" })
                }
            }
        })
    } catch (error) {
        Notification({ text: "Error !!!", type: "danger" })
    }
}

defineExpose({ openRoleModal })

</script>
<style lang="scss">
$blue-color: #435ebe;

.profile__roles {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;

    p {
        font-size: 30px;
        margin-bottom: 20px;
        word-spacing: 0.5px;
    }

    select {
        width: 100%;
        height: 35px;
        font-size: 16px;
        border-radius: 5px;
    }

    .profile__roles-action {
        width: 100%;
        margin-top: 25px;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        button {
            border: none;
            color: #fff;
            background-color: $blue-color;
            padding: 12px 20px;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }
    }
}
</style>