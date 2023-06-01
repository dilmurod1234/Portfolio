<template>
    <appModal v-model="dialog">
        <div class="modal1">
            <h3 v-if="!forms.id">Add client</h3>
            <h3 v-else>Edit client</h3>
            <Form @submit="sendClient">
                <label for="title">Client name</label>
                <Field rules="required" :modelValue="forms.title" v-slot="{ errors }" name="Client name">
                    <input v-model="forms.title" type="text" id="title" class="form__input" placeholder="Client name">
                    <p class="login__input-error" v-if="errors && errors.length">
                        {{ errors[0] }}
                    </p>
                </Field>
                <label for="phone_number">Phone number</label>
                <Field rules="required" :modelValue="forms.phone_number" v-slot="{ errors }" name="Phone number">
                    <input v-model="forms.phone_number" type="text" id="phone_number" class="form__input"
                        placeholder="Phone number">
                    <p class="login__input-error" v-if="errors && errors.length">
                        {{ errors[0] }}
                    </p>
                </Field>
                <label for="address">Address</label>
                <Field rules="required" :modelValue="forms.address" v-slot="{ errors }" name="Address">
                    <input v-model="forms.address" type="text" id="address" class="form__input" placeholder="Address">
                    <p class="login__input-error" v-if="errors && errors.length">
                        {{ errors[0] }}
                    </p>
                </Field>
                <button type="submit" v-if="!forms.id">Add client</button>
                <button type="submit" v-else>Edit client</button>
            </Form>
        </div>
    </appModal>
    <appModal v-model="dialog2">
        <div class="modal1">
            <h3>Are you sure you want to deletes ?</h3>
            <div class="modal__act">
                <button class="btn1" @click="dialog2 = false">Cancel</button>
                <button class="btn2" @click="deleteModal">Delete</button>
            </div>
        </div>
    </appModal>
</template>
<script setup>
import { ref, defineExpose, watch } from 'vue';
import appModal from '../ui/app-modal.vue';
import { Form, Field } from 'vee-validate';
import Notification from '@/plugins/Notification';
import http from '@/plugins/axios';
const dialog = ref(false)
const dialog2 = ref(false)
const forms = ref({
    title: "",
    address: "",
    phone_number: ""
})

const openModal = (value) => {
    if (value && value.id) {
        forms.value = { ...value }
    }
    dialog.value = true
}

watch(dialog, (value) => {
    if (!value) {
        forms.value.id = null
        forms.value.title = ''
        forms.value.address = ''
        forms.value.phone_number = ''
    }
})

const openDeleteModal = (value) => {
    if (value && value.id) {
        forms.value = { ...value }
    }
    dialog2.value = true
}

async function sendClient() {
    try {
        if (!forms.value.id) {
            await http.post("/api/sales/client/", {
                title: forms.value.title,
                phone_number: forms.value.phone_number,
                address: forms.value.address
            }).then(res => {
                if (res.status === 201) {
                }
            })
        } else {
            await http.put(`/api/sales/client/${forms.value.id}/`, {
                title: forms.value.title,
                phone_number: forms.value.phone_number,
                address: forms.value.address
            }).then(res => {
                if (res.status === 200) {
                }
            })
        }
        if (!forms.value.id) {
            location.reload()
            Notification({ text: "Client added !!!", type: "success" })
        } else {
            location.reload()
            Notification({ text: "Client updated !!!", type: "warning" })
        }
        dialog.value = false
    } catch (error) {
        console.log(error)
        Notification({ text: "Something wrong !!!", type: "danger" })
    }
}

async function deleteModal() {
    try {
        await http.delete(`/api/sales/client/${forms.value.id}/`).then(res => {
            if (res.status === 204) {
                location.reload()
                Notification({ text: "Client deleted !!!", type: "danger" })
            }
        })
        dialog2.value = false
    } catch (error) {
        Notification({ text: "Something wrong !!!", type: "danger" })
    }
}

defineExpose({ openModal, openDeleteModal })

</script>
<style lang="scss">
$blue-color2: #57caeb;
$red-color: #ff7976;
$input_bg: #edf2f7;
$blue-color: #435ebe;

.modal1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3 {
        margin: 10px 0px;
        padding: 10px;
        font-size: 25px;
        text-align: center;
    }

    .modal__act {
        display: flex;
        align-items: center;
        gap: 10px;

        .btn1 {
            margin-top: 20px;
            border: none;
            padding: 10px 5px;
            color: #fff;
            font-size: 16px;
            background-color: $blue-color2;
            border-radius: 5px;
            cursor: pointer;
        }

        .btn2 {
            margin-top: 20px;
            border: none;
            padding: 10px 5px;
            color: #fff;
            font-size: 16px;
            background-color: $red-color;
            border-radius: 5px;
            cursor: pointer;
        }
    }

    Form {
        width: 70%;
        margin: 20px 0;
        display: flex;
        flex-direction: column;

        select {
            width: 100%;
            height: 35px;
            font-size: 16px;
            border-radius: 5px;
            background-color: $input_bg;
            border: none;
        }

        textarea {
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

        .modal__form-img {
            width: 100%;
            display: flex;
            justify-content: center;
            cursor: pointer;

            .modal__form-change-img {
                position: absolute;
                width: 80px;
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                background-color: rgba(240, 241, 245, 0.7);
                border-radius: 50%;

                label {
                    text-align: center;
                    font-size: 14px;
                    cursor: pointer;
                }

                input {
                    opacity: 0;
                    cursor: pointer;
                }
            }

            img {
                width: 80px;
                height: 80px;
                object-fit: cover;
                border-radius: 50%;
                position: relative;
            }
        }

        .Login__form-input {
            width: 100%;
            display: flex;
            align-items: center;
            background-color: $input_bg;

            %input_act {
                cursor: pointer;
                background-color: transparent;
                margin-right: 10px;
            }

            .Login__show {
                @extend %input_act;
                display: block;
            }

            .Login__hide {
                @extend %input_act;
                display: none;
            }
        }

        .form__input {
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

        .login__input-error {
            margin-top: 5px;
            color: red;
            font-size: 15px;
            font-weight: 500;
        }

        label {
            margin: 10px 0px;
            font-weight: 500;
            font-size: 16px;
            color: #2c2728;
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

    @media screen and (max-width: 576px) {
        Form {
            width: 90%;
        }

        .modal_act {
            margin-top: 20px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 14px;

            %btn {
                padding: 10px 30px;
                border-radius: 3px;
                font-size: 16px;
            }
        }
    }
}
</style>