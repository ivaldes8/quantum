import axios from "axios"

const API_URL = '/api/actions'

const createAction = async (actionData, investId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}/${investId}`, actionData, config)

    return response.data
}

const updateAction = async (actionData, token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${API_URL}/${id}`, actionData, config)

    return response.data
}

const getActions = async (investId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}/${investId}`, config)

    return response.data
}

const deleteAction = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(`${API_URL}/${id}`, config)

    return response.data
}

const investmentService = {
    createAction,
    updateAction,
    getActions,
    deleteAction
}

export default investmentService