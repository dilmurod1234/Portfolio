<template>
    <appModal v-model="dialog">
        <div class="modal1">
            <h3 v-if="id">Edit Profile</h3>
            <h3 v-else>Add Supplier</h3>
            <Form @submit="sendSupplier">
                <label for="product_name">Supplier name</label>
                <Field rules="required" :modelValue="forms.title" v-slot="{ errors }" name="Supplier name">
                    <input class="form__input" type="text" v-model="forms.title" id="product_name"
                        placeholder="Supplier name" />
                    <p class="login__input-error" v-if="errors && errors.length">
                        {{ errors[0] }}
                    </p>
                </Field>
                <label for="product_address">Address</label>
                <Field rules="required" :modelValue="forms.address" v-slot="{ errors }" name="Address">
                    <input class="form__input" type="text" v-model="forms.address" id="product_address"
                        placeholder="Address" />
                    <p class="login__input-error" v-if="errors && errors.length">
                        {{ errors[0] }}
                    </p>
                </Field>
                <button type="submit" v-if="id">Edit Supplier</button>
                <button type="submit" v-else>Add Supplier</button>
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
import { Form, Field } from 'vee-validate';
import appModal from '../ui/app-modal.vue';
import Notification from '@/plugins/Notification';
import http from '@/plugins/axios';
const dialog = ref(false)
const dialog2 = ref(false)
const id = ref(null)

const forms = ref({
    title: "",
    address: ""
})

const openModal = (value) => {
    if (value && value.id) {
        forms.value = { ...value }
        id.value = value.id
    }
    dialog.value = true
}
watch(dialog, (value) => {
    if (!value) {
        id.value = null
        forms.value.title = ''
        forms.value.address = ''
    }
})

const openDeleteModal = (value) => {
    if (value && value.id) {
        forms.value = value
        id.value = value.id
    }
    dialog2.value = true
}

async function sendSupplier() {
    try {
        if (!id.value) {
            await http.post("/api/warehouse/supplier/", {
                title: forms.value.title,
                address: forms.value.address
            }).then(res => {
                if (res.status === 201) {
                    location.reload()
                }
            })
        } else {
            await http.put(`/api/warehouse/supplier/${id.value}/`, {
                title: forms.value.title,
                address: forms.value.address
            }).then(res => {
                if (res.status === 200) {
                    location.reload()
                }
            })
        }
        dialog.value = false
        if (!id.value) {
            Notification({ text: "Supplier added !!!", type: "success" })
        } else {
            Notification({ text: "Supplier updated !!!", type: "warning" })
        }
    }
    catch (error) {
        Notification({ text: "Something wrong !!!", type: "danger" })
    }
}

async function deleteModal() {
    try {
        await http.delete(`/api/warehouse/supplier/${id.value}/`).then(res => {
            if(res.status === 204){
                location.reload()
            }
        })
        dialog2.value = false
        Notification({text: "Supplier deleted !!!", type: "danger"})
    } catch (error) {
        Notification({text: "Something wrong !!!", type: "danger"})
    }
}

defineExpose({ openModal, openDeleteModal })

</script>
<style lang="scss">
$input_bg: #edf2f7;
$blue-color: #435ebe;
$red-color: #ff7976;
$blue-color2: #57caeb;

.modal1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3 {
        text-align: center;
        margin: 10px 0px;
        font-size: 25px;
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

        .modal__act {
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
}</style>