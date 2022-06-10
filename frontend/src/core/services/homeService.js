import axios from "axios"

const API_URL = '/api/home'

const updateHome = async (data, token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${API_URL}/${id}`, data, config)

    return response.data
}

const getHome = async () => {

    const response = await axios.get(API_URL)

    return response.data
}

const groupService = {
    updateHome,
    getHome
}

export default groupService