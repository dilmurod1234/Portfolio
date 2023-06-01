<template>
    <section class="single__product">
        <productModal ref="product"/>
        <div class="single__product-features">
            <img :src="single_product?.image" alt="Product img" width="500" height="500">
            <div class="single__product-item">
                <h2>{{ single_product?.title }}</h2>
                <p>
                    <span>Group: </span>
                    <span>{{ single_product?.group?.title }}</span>
                </p>
                <p>
                    <span>Brand: </span>
                    <span>{{ single_product?.brand?.title }}</span>
                </p>
                <p>
                    <span>Price: </span>
                    <span>{{ single_product?.current_selling_price }}</span>
                </p>
                <p>
                    <span>Code: </span>
                    <span>{{ single_product?.code }}</span>
                </p>
                <p>
                    <span>Description</span>
                </p>
                <p>{{ single_product?.description }}</p>
                <div class="single__product-act">
                    <button v-if="role !== 'director'" @click="openModalEdit(single_product)">Edit</button>
                    <button v-if="role !== 'director'" @click="openModalDelete(single_product)">Delete</button>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import http from "@/plugins/axios";
import productModal from "@/components/pages/product-modal.vue";

const url = window.location.href.split("/");
const role = sessionStorage.getItem("role")
const single_product = ref({})
const product = ref()

const getSingleProduct = () => {
    http.get(`/api/warehouse/product/${url[4]}`).then(response => {
        single_product.value = response.data
    })
}

onMounted(() => {
    getSingleProduct()
})

const openModalEdit = (item) => {
    product.value.openModal(item)
}

const openModalDelete = (item) => {
    product.value.openDeleteModal(item)
}

</script>
<style lang="scss">
.single__product {
    padding: 50px 10px;

    .single__product-features {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 40px;
        
        img {
            border-radius: 10px;
        }

        .single__product-item {
            padding: 30px 0;
            h2{
                margin-bottom: 20px;
            }
            p {
                margin-bottom: 5px;
                span:nth-child(odd) {
                    color: #435ebe;
                }

                span {
                    font-size: 20px;
                    color: #5b5b5b;
                }
            }

            p {
                font-size: 14px;
                color: #959595;
            }

            .single__product-act {
                width: 90%;
                margin-top: 40px;
                display: flex;
                gap: 10px;

                button {
                    width: 50%;
                    border: none;
                    color: #fff;
                    background-color: #435ebe;
                    padding: 12px 20px;
                    border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                }

                button:nth-child(even) {
                    background-color: #f74d3a;
                }
            }
        }
    }
}</style>