import axios from "axios"

const API_URL = '/api/groups'

const createGroup = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, data, config)

    return response.data
}

const updateGroup = async (data, token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${API_URL}/${id}`, data, config)

    return response.data
}

const getGroups = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const getGroup = async (token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}/${id}`, config)

    return response.data
}

const deleteGroup = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(`${API_URL}/${id}`, config)

    return response.data
}

const groupService = {
    createGroup,
    updateGroup,
    getGroups,
    getGroup,
    deleteGroup
}

export default groupService