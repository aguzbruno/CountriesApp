import {useDispatch} from "react-redux";
import {getNameCountries,filterCountriesByContinent,orderByName,filterByPopulation} from "../actions"
import {useState} from 'react'
import "../styles/Searcher.css"


export default function Searcher(){
    //Dispatch
    const dispatch = useDispatch()
    //Creo estado para manejar el buscador
    const [busqueda,setBusqueda] = useState("")

    function despacharFiltros (){
        dispatch(filterCountriesByContinent('All'));
        dispatch(orderByName('nombre'))
        dispatch(filterByPopulation('asc'));
    }
    //Funcion para manejar el buscador y enviar la peticion
    function handleSearchChange (e){
        e.preventDefault()
        despacharFiltros();
        setBusqueda (e.target.value);
        console.log(e.target.value)
        dispatch(getNameCountries(e.target.value))
    }
    return <div className="searchContainer">
    <input className="searchInput" type="text" placeholder="Buscar pais.." onChange={(e)=>{handleSearchChange(e)}} />
    </div>
}