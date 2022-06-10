import axios from "axios"

const API_URL = '/api/homeCards'

const createHomeCard = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, data, config)

    return response.data
}

const updateHomeCard = async (data, token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${API_URL}/${id}`, data, config)

    return response.data
}

const getHomeCards = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const deleteHomeCard = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(`${API_URL}/${id}`, config)

    return response.data
}

const groupService = {
    createHomeCard,
    updateHomeCard,
    getHomeCards,
    deleteHomeCard
}

export default groupService