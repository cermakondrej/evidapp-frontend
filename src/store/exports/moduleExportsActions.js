import axios from "@/axios.js"

export default {
    fetchTemplate() {
        return new Promise((resolve, reject) => {
            axios.get(`/exports/template`,
                {
                    responseType: 'arraybuffer',
                })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    createVariable(context, payload) {
        return new Promise((resolve, reject) => {
            axios.post("/exports/variable",  payload)
                .then((response) => {
                    //TODO store it into store in version2 and do other actions
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    createEmployee(context, payload) {
        return new Promise((resolve, reject) => {
            axios.post("/exports/employee",  payload)
                .then((response) => {
                    //TODO store it into store in version2 and do other actions
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

}
