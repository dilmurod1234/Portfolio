<template>
    <appModal v-model="dialog">
        <div class="modal1">
            <Form @submit="sendProduct">
                <h3 v-if="!forms.id">Add product</h3>
                <h3 v-else>Edit product</h3>
                <div class="modal__form-img">
                    <img :src="forms.image">
                    <div class="modal__form-change-img">
                        <label for="file">Select image</label>
                        <input class="form__input" type="file" id="file" @change="handleChangeImg($event)">
                    </div>
                </div>
                <label for="title">Product name</label>
                <Field rules="required" :modelValue="forms.title" v-slot="{ errors }" name="Product name">
                    <input class="form__input" type="text" v-model="forms.title" id="title" placeholder="Product name" />
                    <p class="login__input-error" v-if="errors && errors.length">
                        {{ errors[0] }}
                    </p>
                </Field>
                <label for="code">Product code</label>
                <Field rules="required" :modelValue="forms.code" v-slot="{ errors }" name="Product code">
                    <input class="form__input" type="text" v-model="forms.code" id="code" placeholder="Product code" />
                    <p class="login__input-error" v-if="errors && errors.length">
                        {{ errors[0] }}
                    </p>
                </Field>
                <label for="current_arrival_price">Arrival price</label>
                <Field rules="required" :modelValue="forms.current_arrival_price" v-slot="{ errors }" name="Arrival price">
                    <input class="form__input" type="text" v-model="forms.current_arrival_price" id="current_arrival_price"
                        placeholder="Arrival price" />
                    <p class="login__input-error" v-if="errors && errors.length">
                        {{ errors[0] }}
                    </p>
                </Field>
                <label for="current_selling_price">Selling price</label>
                <Field rules="required" :modelValue="forms.current_selling_price" v-slot="{ errors }" name="Selling price">
                    <input class="form__input" type="text" v-model="forms.current_selling_price" id="current_selling_price"
                        placeholder="Selling price" />
                    <p class="login__input-error" v-if="errors && errors.length">
                        {{ errors[0] }}
                    </p>
                </Field>
                <label for="group">Select group</label>
                <Field rules="required" :modelValue="forms.group" v-slot="{ errors }" name="Group">
                    <select v-model="forms.group">
                        <option disabled selected hidden value="">Select your group</option>
                        <option v-for="item in $store?.state?.groups" :key="item.id" :value="item.id">
                            {{ item.title }}
                        </option>
                    </select>
                    <p class="login__input-error" v-if="errors && errors.length">
                        {{ errors[0] }}
                    </p>
                </Field>
                <label for="brand">Select brand</label>
                <Field rules="required" :modelValue="forms.brand" v-slot="{ errors }" name="brand">
                    <select v-model="forms.brand">
                        <option disabled selected hidden value="">Select your brand</option>
                        <option v-for="item in $store?.state?.brands" :key="item.id" :value="item.id">
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
                <button type="submit" v-if="!forms.id">Add product</button>
                <button type="submit" v-else>Edit product</button>
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
import { ref, defineExpose } from 'vue';
import { Form, Field } from 'vee-validate';
import appModal from '../ui/app-modal.vue';
import Notification from '@/plugins/Notification';
import http from '@/plugins/axios';
import { useRouter } from 'vue-router';
const router = useRouter()
const dialog = ref(false)
const dialog2 = ref(false)
const forms = ref({
    title: "",
    code: "",
    image: null,
    current_selling_price: "",
    current_arrival_price: "",
    group: null,
    brand: null,
    description: ""
})

const handleChangeImg = (evt) => {
    forms.value.image = evt.target.files[0]
}

const openModal = (value) => {
    if (value && value.id){
        forms.value = {...value}
    }
    dialog.value = true
}

const openDeleteModal = (value) => {
    if (value && value.id){
        forms.value = {...value}
    }
    dialog2.value = true
}

async function sendProduct() {
    const form = new FormData()
    form.append("title", forms.value.title)
    form.append("code", forms.value.code)
    form.append("image", forms.value.image)
    form.append("current_arrival_price", forms.value.current_arrival_price)
    form.append("current_selling_price", forms.value.current_selling_price)
    form.append("brand", forms.value.brand - 0)
    form.append("group", forms.value.group - 0)
    form.append("description", forms.value.description)
    try {
        if (!forms.value.id) {
            await http.post("/api/warehouse/product/", form, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then(res => {
                if (res.status === 200) {
                }
            })
        } else {
            await http.put(`/api/warehouse/product/${forms.value.id}/`, form).then(res => {
                if (res.status === 200) {
                }
            })
        }
        dialog.value = false
        if (!forms.value.id) {
            Notification({ text: "Product added !!!", type: "success" })
            window.location.reload()
        } else {
            Notification({ text: "Product updated !!!", type: "warning" })
            window.location.reload()
        }
    } catch (error) {
        console.log(error)
        Notification({ text: "Something wrong !!!", type: "danger" })
    }
}

async function deleteModal() {
    try {
        await http.delete(`/api/warehouse/product/${forms.value.id}/`).then(res => {
            if (res.status === 204) {
                router.push({name: "product"})
            }
        })
        dialog2.value = false
        Notification({ text: "Product deleted !!!", type: "danger" })
    } catch (error) {
        Notification({ text: "Something wrong !!!", type: "danger" })
    }
}

defineExpose({ openModal, openDeleteModal })

</script>
<style scoped lang="scss">
$blue-color: #435ebe;
$input_bg: #edf2f7;
$hover-color: #f0f1f5;
$blue-color2: #57caeb;
$red-color: #ff7976;

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