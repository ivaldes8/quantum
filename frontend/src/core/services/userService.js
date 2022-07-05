import axios from "axios"

const API_URL = '/api/users'

const createUser = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}/new`, data, config)

    return response.data
}

const updateUser = async (data, token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${API_URL}/${id}`, data, config)

    return response.data
}

const getUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}/all`, config)

    return response.data
}

const deleteUser = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(`${API_URL}/${id}`, config)

    return response.data
}

const getCurrentUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}/me`, config)

    return response.data
}

const updateCurrentUser = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${API_URL}/me`, data, config)

    return response.data
}

const getDashboard = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}/dashboard`, config)

    return response.data
}

const userService = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getCurrentUser,
    updateCurrentUser,
    getDashboard
}

export default userService