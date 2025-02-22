import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:3000'
    baseURL: 'https://task-manager-azure-eight.vercel.app'
})

const useAxios = () => {
    return instance
}

export default useAxios