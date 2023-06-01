<template>
    <appModal v-model="dialog">
        <div class="modal1">
            <h3 v-if="!forms.id">Add returned invoice</h3>
            <h3 v-else>Edit returned invoice</h3>
            <Form @submit="sendInvoice">
                <label v-if="!forms.id" for="client">Select client</label>
                <Field v-if="!forms.id" rules="required" :modelValue="forms.client" v-slot="{ errors }" name="client">
                    <select v-model="forms.client">
                        <option disabled selected hidden value="">Select your client</option>
                        <option v-for="item in $store?.state?.clients" :key="item.id" :value="item.id">
                            {{ item.title }}
                        </option>
                    </select>
                    <p class="login__input-error" v-if="errors && errors.length">
                        {{ errors[0] }}
                    </p>
                </Field>
                <label for="description">Description</label>
                <Field rules="required" :modelValue="forms.description" v-slot="{ errors }" name="Description">
                    <textarea id="description" cols="10" rows="4" v-model="forms.description"></textarea>
                    <p class="login__input-error" v-if="errors && errors.length">
                        {{ errors[0] }}
                    </p>
                </Field>
                <button type="submit" v-if="!forms.id">Add returned invoice</button>
                <button type="submit" v-else>Edit returned invoice</button>
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
import { ref, defineExpose, onMounted } from 'vue';
import appModal from '../ui/app-modal.vue';
import { Form, Field } from 'vee-validate';
import Notification from '@/plugins/Notification';
import http from '@/plugins/axios';
import { useRouter } from 'vue-router';
import store from '@/store';
const router = useRouter()
const dialog = ref(false)
const dialog2 = ref(false)
const forms = ref({
    client: null,
    description: ""
})

onMounted(() => {
    store.dispatch("getClients")
})

const openModal = (value) => {
    if (value && value.id) {
        forms.value = { ...value }
    }
    dialog.value = true
}

const openDeleteModal = (value) => {
    if (value && value.id) {
        forms.value = { ...value }
    }
    dialog2.value = true
}

async function sendInvoice() {
    try {
        if (!forms.value.id) {
            await http.post("/api/warehouse/returned-invoice/", {
                client: forms.value.client,
                description: forms.value.description,
            }).then(res => {
                if (res.status === 201) {
                    router.push({name: "returned-invoice_item", params: {id: res.data.id}})
                }
            })
        } else {
            await http.put(`/api/warehouse/returned-invoice/${forms.value.id}/`, {
                description: forms.value.description
            }).then(res => {
                if (res.status === 200) {
                    location.reload()
                    Notification({ text: "Product updated !!!", type: "warning" })
                }
            })
        }
        if(!forms.value.id){
            Notification({ text: "Product added !!!", type: "success" })
        }
        dialog.value = false
    } catch (error) {
        console.log(error)
        Notification({ text: "Something wrong !!!", type: "danger" })
    }
}

async function deleteModal() {
    try {
        await http.delete(`/api/warehouse/returned-invoice/${forms.value.id}/`).then(res => {
            if (res.status === 204) {
                location.reload()
                Notification({ text: "Product deleted !!!", type: "danger" })
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