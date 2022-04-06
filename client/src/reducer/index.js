
const initialState = {
    country: [],
    countries: [],
    allCountries: [],
    orderAndFilter:{
        sortOrder: "asc",
        sortBy: "nombre",
        continentFilter: "All",
    },
    allActivities:[]
    
}
export default function rootRedcucer(state = initialState, action) {
    switch (action.type) {
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,
                country: []
            }
        case 'FILTER_BY_CONTINENT':
            state.orderAndFilter.continentFilter = action.payload
            return {
                ...state,
                countries: orderAndFilter(state),
                country: []
            }
        case "ORDER_BY_NAME_AND_POPULATION":
            state.orderAndFilter.sortBy = action.payload
            return {
                ...state,
                countries: orderAndFilter(state),
                country: []
            }
        case "ORDER_BY_ASC_DESC":
            state.orderAndFilter.sortOrder = action.payload
            return {
                ...state,
                countries: orderAndFilter(state),
                country: []
            }

        case 'GET_NAME_COUNTRIES':
            if (action.payload.length) {
                return {
                    ...state,
                    countries: action.payload
                }
            } else {
                alert("Ingrese una busqueda correcta")
                return {
                    ...state,
                    countries: []
                }
            }
        case 'GET_ID_COUNTRIES':
            // state.continentFilter='All'
            return {
                ...state,
                country: action.payload
                
            }
        case 'CLEAN_GET_ID_COUNTRIES':
            return{...state,country:[]}

        case 'GET_ACTIVITIES':
            return{
                ...state,
                allActivities:action.payload
            }
        default:
            return state;
    }
}
function orderAndFilter(state) {
    const continentFiltered = filterByContinent(state)
    return orderBy(continentFiltered, state.orderAndFilter.sortOrder, state.orderAndFilter.sortBy)
}
function orderBy(continentFiltered, sortOrder, sortBy) {
    let orderedCountries
    if (sortBy === 'nombre') {
        orderedCountries = continentFiltered.sort((countryA, countryB) => countryA[sortBy].localeCompare(countryB[sortBy]))
    } else {
        orderedCountries = continentFiltered.sort((countryA, countryB) => countryA[sortBy] - countryB[sortBy])
    }
    if (sortOrder === 'desc') return orderedCountries.reverse();
    return orderedCountries
}
function filterByContinent(state) {
    const continentFiltered = state.orderAndFilter.continentFilter === 'All' ? state.allCountries : state.allCountries.filter(obj => obj.continente === state.orderAndFilter.continentFilter)
    return continentFiltered
}


