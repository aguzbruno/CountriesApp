import axios from 'axios';

//RUTAS
export function getAllCountries() {
    return async function (dispatch) {
        const response = await axios.get('/countries');
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: response.data
        })

    }
}
export function getNameCountries(nombre) {
    return async function (dispatch) {
        const response = await axios.get('/countries?nombre=' + nombre);
        console.log(response.data)
        return dispatch({
            type: "GET_NAME_COUNTRIES",
            payload: response.data
        })
    }
}

export function getIdCountries(id) {
    return async function (dispatch) {
        const response = await axios.get('/countries/' + id);
        return dispatch({
            type: "GET_ID_COUNTRIES",
            payload: response.data
        })
    }
}

export function postActivity(newActivity) {
    return async function (dispatch) {
        const response = await axios.post('/activities', 
        { nombre:newActivity.nombre,
        descripcion:newActivity.descripcion,
        dificultad:newActivity.dificultad,
        duracion:newActivity.duracion,
        temporada:newActivity.temporada,
        paises:newActivity.paises})
        return dispatch({
            type: "POST_ACTIVITIES",
            payload: response
        })
    }
}

export function getAllActivities() {
    return async function (dispatch) {
        const response = await axios.get('/activities');
        return dispatch({
            type: 'GET_ACTIVITIES',
            payload: response.data
        })

    }
}


//FILTROS Y ORDENAMIENTOS
export function filterCountriesByContinent(payload) {
    return {
        type: "FILTER_BY_CONTINENT",
        payload
    }
}
export function orderByName(payload) {
    return {
        type: "ORDER_BY_ASC_DESC",
        payload
    }
}
export function filterByPopulation(payload) {
    return {
        type: "ORDER_BY_NAME_AND_POPULATION",
        payload
    }
}
//LIMPIAR EL COUNTRYDETAIL
export function cleanGetIdCountries(payload){
    return {
        type: "CLEAN_GET_ID_COUNTRIES",
        payload
    }
}
