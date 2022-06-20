
export const setAuthUser = (userData) => {
    return {
        type: 'SET_AUTH_USER',
        payload: userData
    }
}

export const setPorject = (obj) => {
    return {
        type: 'SET_PROJECT',
        payload: obj
    }
}

export const setPresentId = (id) => {
    return {
        type: 'SET_PRESENTATION_PROJECT_ID',
        payload: id
    }
}

export const setSideBar = (status) => {
    return {
        type: 'SET_SIDEBAR',
        payload: status
    }
}