<template>
    <appModal v-model="dialog">
        <div class="modal1">
            <h3>Add income</h3>
            <Form @submit="sendIncome">
                <label>Select income type</label>
                <Field rules="required" :modelValue="forms.income_type" v-slot="{ errors }" name="Income type">
                    <div class="Login__roles">
                        <select v-model="forms.income_type" @change="handleChange">
                            <option disabled selected hidden value="">Select income type</option>
                            <option value="from_sales">From sales</option>
                            <option value="from_outside">From outside</option>
                        </select>
                    </div>
                    <p class="login__input-error" v-if="errors && errors.length">
                        {{ errors[0] }}
                    </p>
                </Field>
                <label v-if="forms.title === 'from_sales'">Select sales</label>
                <Field rules="required" v-if="forms.title === 'from_sales'" :modelValue="forms.invoice" v-slot="{ errors }" name="Invoice">
                    <div class="Login__roles">
                        <select v-model="forms.invoice">
                            <option disabled selected hidden value="">Select sales</option>
                            <option v-for="item in $store?.state?.clients" :key="item.id" :value="item.id">
                                {{ item.title }}
                            </option>
                        </select>
                    </div>
                    <p class="login__input-error" v-if="errors && errors.length">
                        {{ errors[0] }}
                    </p>
                </Field>
                <label for="amount">Amount</label>
                <Field rules="required" :modelValue="forms.amount" v-slot="{ errors }" name="Amount">
                    <input v-model="forms.amount" type="text" id="amount" class="form__input" placeholder="Amount">
                    <p class="login__input-error" v-if="errors && errors.length">
                        {{ errors[0] }}
                    </p>
                </Field>
                <button type="submit">Add income</button>
            </Form>
        </div>
    </appModal>
</template>
<script setup>
import { ref, defineExpose } from 'vue';
import appModal from '../ui/app-modal.vue';
import { Form, Field } from 'vee-validate';
import Notification from '@/plugins/Notification';
import http from '@/plugins/axios';
const dialog = ref(false)
const forms = ref({
    income_type: "",
    amount: "",
    invoice: null,
    title: ""
})

const openModal = () => {
    dialog.value = true
}

const handleChange = (evt) => {
    if(evt.target.value === "from_sales"){
        forms.value.title = "from_sales"
    }else{
        forms.value.title = "from_outside"
    }
}

async function sendIncome() {
    try {
        await http.post("/api/finance/income/", {
            income_type: forms.value.income_type,
            invoice: forms.value.invoice,
            amount: forms.value.amount
        }).then(res => {
            if (res.status === 201) {
            }
        })
        location.reload()
        Notification({ text: "income added !!!", type: "success" })
        dialog.value = false
    } catch (error) {
        console.log(error)
        Notification({ text: "Something wrong !!!", type: "danger" })
    }
}

defineExpose({ openModal })

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