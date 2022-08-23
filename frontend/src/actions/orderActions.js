import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCEESS, ORDER_CREATE_FAILURE, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCEESS, ORDER_DETAILS_FAILURE } from '../constants/orderConstants'
import { logout } from './userActions'

import axios from 'axios'


export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/orders`, order, config)

        dispatch({
            type: ORDER_CREATE_SUCCEESS,
            payload: data
        })

    } catch (error) {
        dispatch({ type: ORDER_CREATE_FAILURE, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCEESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_DETAILS_FAILURE,
            payload: message,
        })
    }
}
