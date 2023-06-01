import http from '@/plugins/axios'
import { createStore } from 'vuex'
export default createStore({
  state: {
    me: {},
    suppliers: [],
    products_list: [],
    groups: [],
    brands: [],
    clients: []
  },
  getters: {

  },
  mutations: {
    getMe(state, data) {
      state.me = data
    },
    getSuppliers(state, data) {
      state.suppliers = data
    },
    getGroups(state, data) {
      state.groups = data
    },
    getBrands(state, data) {
      state.brands = data
    },
    getProducts(state, data) {
      state.products_list = data
    },
    getClients(state, data){
      state.clients = data
    }
  },
  actions: {
    getMe({ commit }) {
      http.get("/api/user/me").then(res => {
        commit("getMe", res.data)
      })
    },
    getSuppliers({ commit }) {
      http.get("/api/warehouse/supplier/").then(res => {
        commit("getSuppliers", res.data.results)
      })
    },
    getClients({ commit }, param) {
      http.get("/api/sales/client", {
        params: {
          per_page: param?.per_page,
          page: param?.page
        }
      }).then(response => {
        response.data.results.forEach((item, index) => {
          item.index = param?.page * param?.per_page - (param?.per_page - 1) + index
        })
        param.last_page = Math.ceil(response.data.count / param?.per_page)
        commit("getClients", response?.data?.results)
      })
    },
    getProducts({ commit }, param) {
      http.get("/api/warehouse/product/", {
        params: {
          per_page: param?.per_page,
          page: param?.page
        }
      }).then(response => {
        response.data.results.forEach((item, index) => {
          item.index = param?.page * param?.per_page - (param?.per_page - 1) + index
        })
        param.last_page = Math.ceil(response.data.count / param?.per_page)
        commit("getProducts", response?.data?.results)
      })
    },
    getGroups({ commit }, param) {
      http.get("/api/warehouse/group/", {
        params: {
          per_page: param?.per_page,
          page: param?.page
        }
      }).then((res) => {
        res.data.results.forEach((item, index) => {
          item.index = param?.page * param?.per_page - (param?.per_page - 1) + index;
        })
        commit("getGroups", res?.data?.results)
      })
    },
    getBrands({ commit }, param) {
      http.get("/api/warehouse/brand/", {
        params: {
          per_page: param?.per_page,
          page: param?.page
        }
      }).then((res) => {
        res.data.results.forEach((item, index) => {
          item.index = param?.page * param?.per_page - (param?.per_page - 1) + index;
        })
        commit("getBrands", res?.data?.results)
      })
    },
  },
})
