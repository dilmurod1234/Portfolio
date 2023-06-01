<template>
    <appModal v-model="dialog">
        <Form @submit="sendExpence">
            <h2>Add expence</h2>
            <div v-if="invoiceitem" class="Login__roles">
                <h6 class="p-text">Select invoice</h6>
                <select @change="handlechange2" v-model="form.invoice">
                    <option disabled selected hidden value="">Select invoice</option>
                    <option v-for="item in invoice " :key="item.id" :value="item.id">
                        {{ item.supplier.title }}
                    </option>
                </select>
            </div>
            <div v-if="returneditem" class="Login__roles">
                <h6 class="p-text">Select returned invoice</h6>
                <select @change="handlechange" v-model="form.return">
                    <option disabled selected hidden value="">Select returned invoice</option>
                    <option v-for="item in returned" :key="item.id" :value="item.id">
                        {{ item.client.title }}
                    </option>
                </select>
            </div>
            <label for="login">Amount</label>
            <Field rules="required" name="Amount" :modelValue="form.amount" v-slot="{ errors }">
                <input type="text" v-model="form.amount" id="login" placeholder="Amount">
                <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
            </Field>
            <label for="description">Description</label>
            <Field rules="required" name="Description" :modelValue="form.description" v-slot="{ errors }">
                <textarea v-model="form.description" class="form__text" id="description"
                    placeholder="Description..."></textarea>
                <p class="login__input-error" v-if="errors && errors.length">
                    {{ errors[0] }}
                </p>
            </Field>
            <button type="submit">Add expence</button>
        </Form>
    </appModal>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Form, Field } from 'vee-validate';
import appModal from '@/components/ui/app-modal.vue';
import http from '@/plugins/axios';
import Notification from '@/plugins/Notification';

const invoiceitem = ref(true)
const returneditem = ref(true)
const invoice = ref([])
const returned = ref([])
const dialog = ref(false)
const openModal = () => {
    dialog.value = true
}
const handlechange = () => {
    invoiceitem.value = false
}
const handlechange2 = () => {
    returneditem.value = false
}
const form = ref({
    amount: '',
    invoice: null,
    return: null,
    description: ''
})
const getInovice = () => {
    http.get('/api/warehouse/input-invoice/').then(res => {
        console.log(res.data.results)
        invoice.value = res.data.results
    })
}
const getReturn = () => {
    http.get('/api/warehouse/returned-invoice/').then(res => {
        console.log(res.data.results)
        returned.value = res.data.results
    })
}
const sendExpence = () => {
    if (returneditem.value) {
        http.post('/api/finance/expense/', {
            returned_invoice: form.value.return,
            amount: form.value.amount,
            description: form.value.description
        }).then(res => {
            if (res.status === 201) {
                location.reload()
                Notification({text: "Returned invoice added", type: "success"})
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    if (invoiceitem.value) {
        http.post('/api/finance/expense/', {
            invoice: form.value.invoice,
            amount: form.value.amount,
            description: form.value.description
        }).then(res => {
            if (res.status === 201) {
                location.reload()
                Notification({text: "Invoice added", type: "success"})
            }
        }).catch((err) => {
            console.log(err)
        })
    }
}
onMounted(() => {
    getInovice()
    getReturn()
})
defineExpose({ openModal })
</script>
<style lang="scss" scoped>
$blue-color :#435ebe;
$input-bg: #edf2f7;
$blue-color2: #57caeb;

.Login__roles {
    display: flex;
    flex-direction: column;


    .p-text {
        margin: 10px 0;
        font-weight: 500;
        font-size: 16px;
        color: #2c2728;
    }
}

input {
    width: 100%;
    font-weight: 400;
    font-size: 14px;
    height: 45px;
    padding-left: 15px;
    color: #272a2c;
    background: $input-bg;
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
    margin: 10px 0;
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

Form {
    width: 80%;
    margin: 15px auto;
    display: flex;
    flex-direction: column;

    h2 {
        margin: 10px 0;
        font-size: 25px;
        text-align: center;
    }

    select {
        width: 100%;
        height: 35px;
        font-size: 16px;
        border-radius: 5px;
        background-color: $input_bg;
        border: none;
    }

    .form__text {
        width: 100%;
        font-weight: 400;
        font-size: 14px;
        height: 45px;
        padding-left: 15px;
        color: #272a2c;
        background: #edf2f7;
        border-radius: 5px;
        outline: none;
        border: none;
    }
}
</style>