import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const Notification = (par) => {
    return setTimeout(() => {
      createToast(par.text, {
             type: par.type,
             position: "top-right",
             showIcon: true,
             timeout: 2000,
           });
    }, );  
}
export default Notification