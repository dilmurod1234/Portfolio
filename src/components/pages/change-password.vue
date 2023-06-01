<template>
    <appModal v-model="dialog">
        <div class="profile__item">
            <h1>Change password</h1>
            <Form @submit="Password_Change">
                <label for="change">Old password</label>
                <Field rules="required" :modelValue="form.oldPassword" v-slot="{ errors }" name="Old password">
                    <div class="profile__form-input">
                        <input :type="showPassword1 ? 'text' : 'password'" id="change" v-model="form.oldPassword"
                            placeholder="Old password" />
                        <img src="../../assets/eye.svg" @click="ChangePasswordType1"
                            :class="showPassword1 ? 'profile__hide' : 'profile__show'" alt="eye" />
                        <img src="../../assets/hide.svg" @click="ChangePasswordType1"
                            :class="showPassword1 ? 'profile__show' : 'profile__hide'" alt="hide" />
                    </div>
                    <p class="profile__input-error" v-if="errors && errors.length">
                        {{ errors[0] }}
                    </p>
                </Field>
                <label for="newPassword">New password</label>
                <Field rules="required" :modelValue="form.newPassword" v-slot="{ errors }" name="Password">
                    <div class="profile__form-input">
                        <input :type="showPassword2 ? 'text' : 'password'" id="newPassword" v-model="form.newPassword"
                            placeholder="New password" />
                        <img src="../../assets/eye.svg" @click="ChangePasswordType2"
                            :class="showPassword2 ? 'profile__hide' : 'profile__show'" alt="eye" />
                        <img src="../../assets/hide.svg" @click="ChangePasswordType2"
                            :class="showPassword2 ? 'profile__show' : 'profile__hide'" alt="hide" />
                    </div>
                    <p class="profile__input-error" v-if="errors && errors.length">
                        {{ errors[0] }}
                    </p>
                </Field>
                <label for="confirmPassword">Confirm new password</label>
                <Field rules="required" :modelValue="form.confirmPassword" v-slot="{ errors }" name="Password">
                    <div class="profile__form-input">
                        <input :type="showPassword3 ? 'text' : 'password'" id="confirmPassword"
                            v-model="form.confirmPassword" placeholder="Confirm new password" />
                        <img src="../../assets/eye.svg" @click="ChangePasswordType3"
                            :class="showPassword3 ? 'profile__hide' : 'profile__show'" alt="eye" />
                        <img src="../../assets/hide.svg" @click="ChangePasswordType3"
                            :class="showPassword3 ? 'profile__show' : 'profile__hide'" alt="hide" />
                    </div>
                    <p class="profile__input-error" v-if="errors && errors.length">
                        {{ errors[0] }}
                    </p>
                </Field>
                <button type="submit">Change</button>
            </Form>
        </div>
    </appModal>
</template>
<script setup>
import { ref } from 'vue';
import { Form, Field } from 'vee-validate';
import appModal from '../ui/app-modal.vue';
import http from '@/plugins/axios';
import Notification from '@/plugins/Notification';
const dialog = ref(false)
const showPassword1 = ref(false);
const showPassword2 = ref(false);
const showPassword3 = ref(false);
const form = ref({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
})

const openPasswordModal = () => {
    dialog.value = !dialog.value
}

const ChangePasswordType1 = () => {
    showPassword1.value = !showPassword1.value
}

const ChangePasswordType2 = () => {
    showPassword2.value = !showPassword2.value
}

const ChangePasswordType3 = () => {
    showPassword3.value = !showPassword3.value
}

async function Password_Change() {
    try {
        await http.post("/api/user/change-password/", {
            old_password: form.value.oldPassword,
            new_password: form.value.newPassword,
            new_password_confirm: form.value.confirmPassword
        }).then(res => {
            if (res.status === 200) {
                Notification({ text: "Password changed !", type: "success" })
            }
        })
        dialog.value = false
    } catch (error) {
        Notification({ text: "Error !!!", type: "danger" })
    }
}
defineExpose({ openPasswordModal })
</script>
<style lang="scss">
$blue-color: #435ebe;
$input_bg: #edf2f7;

.profile__item {
    width: 100%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
        font-weight: 600;
        font-size: 30px;
        color: #272a2c;
        margin: 20px auto;
    }

    Form {
        width: 60%;
        display: flex;
        flex-direction: column;
        gap: 10px;

        .profile__image {
            display: flex;
            align-items: center;
        }

        .profile__file-input {
            display: none;
        }

        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            cursor: pointer;
        }

        .profile__form-input {
            width: 100%;
            display: flex;
            align-items: center;
            background-color: $input_bg;
            border-radius: 5px;

            %input_act {
                cursor: pointer;
                background-color: transparent;
                margin-right: 10px;
            }

            .profile__show {
                @extend %input_act;
                width: 20px;
                height: 20px;
                display: block;
            }

            .profile__hide {
                @extend %input_act;
                width: 20px;
                height: 20px;
                display: none;
            }
        }

        input {
            width: 100%;
            font-weight: 400;
            font-size: 14px;
            height: 45px;
            padding-left: 15px;
            color: #272a2c;
            background: $input_bg;
            border-radius: 5px;
            outline: none;
            margin-right: 5px;
            border: none;
        }

        .profile__input-error {
            margin-top: 5px;
            color: red;
            font-size: 15px;
            font-weight: 500;
        }

        button {
            margin-top: 40px;
            border: none;
            padding: 10px 0px;
            color: #fff;
            font-size: 16px;
            background-color: $blue-color;
            border-radius: 5px;
            cursor: pointer;
        }
    }
}
</style>