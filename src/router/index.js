import { createRouter, createWebHistory } from 'vue-router'
import auth from './auth'
import director from './director'
import warehouse from './warehouse'
import finance from './finance'
import sales from './sales'

const routes = [
  auth,
  warehouse,
  director,
  finance,
  sales
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem("token")
  let role = sessionStorage.getItem("role")
  let name = to.name === "login"
  if (!token && !name) {
    return next({ name: "login" })
  } else {
    if (token && name) {
      if (role === "warehouseman") {
        return next({ name: "warehouseman" })
      } else if (role === "director") {
        return next({ name: "director" })
      } else if (role === "salesman") {
        return next({ name: "salesman" })
      } else if (role === "financier") {
        return next({ name: "financier" })
      }
    } else {
      next()
    }
  }
})

export default router