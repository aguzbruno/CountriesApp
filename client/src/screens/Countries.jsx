/** @format */

import "../styles/Countries.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllCountries,
    filterCountriesByContinent,
    orderByName,
    filterByPopulation,
} from "../actions";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import Paginado from "../components/Paginado.jsx";
import Loader from "../components/Loader";


export default function Countries() {
    //Dispatch
    const dispatch = useDispatch();
    //Arreglo de paises
    const countries = useSelector((state) => state.countries);
    //Filtros y ordenamientos
    const orderAndFilter = useSelector((state)=> state.orderAndFilter);
    const [valueFiltrado, setValueFiltrado] = useState({   sortOrder: orderAndFilter.sortOrder,
    sortBy: orderAndFilter.sortBy,
    continentFilter: orderAndFilter.continentFilter,})
    //Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const countriesPerPage = 10;
    const indexOfLastCountry = currentPage * countriesPerPage-1;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    
    const [currentCountries,setCurrentCountries] = useState(countries?.slice(0,9))
    //Use effect que carga al iniciar la pagina, pero no al volver
    useEffect(() => {
        if(countries.length<1) dispatch(getAllCountries());
        console.log(countries)
    });

    //Use effect que cambia el nro de paises por pagina dependiendo en que pagina este
    useEffect(() => {
        if(currentPage===1){
            console.log(countries)
            setCurrentCountries(countries?.slice(0,9))
        }
        if(currentPage===2){
            console.log(countries)
            setCurrentCountries(countries?.slice(9,19))
        }
        if(currentPage !==1 && currentPage !==2){ 
            setCurrentCountries(countries?.slice(
                indexOfFirstCountry,
                indexOfLastCountry
            ))
        }

    }, [countries,currentPage,valueFiltrado]);

    // Funcion de Paginado
    function paginado (pageNumber) {
        setCurrentPage(pageNumber);
    };
    // Funcion de filtrado de continente
    function handleFilterContinent(e) {
        e.preventDefault();
        setValueFiltrado({...valueFiltrado,continentFilter:e.target.value})
        console.log(valueFiltrado)
        dispatch(filterCountriesByContinent(e.target.value));
        setCurrentPage(1);
    }
    // Funcion de ordenamiento por ascendente y descendente
    function handleOrderByAsc(e) {
        e.preventDefault();
        setValueFiltrado({...valueFiltrado,sortOrder:e.target.value})
        console.log(valueFiltrado)
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
    }
    // Funcion de ordenamiento por nombre y poblacion
    function handlePopulation(e) {
        e.preventDefault();
        setValueFiltrado({...valueFiltrado,sortBy:e.target.value})
        console.log(valueFiltrado)
        dispatch(filterByPopulation(e.target.value));
        setCurrentPage(1);
        
    }

    return  (
        <>
            <NavBar searcher={true} />
            <div className="fullSize">
                <div className="filtros">
                    
                    <div className="orderByName">
                        <p>Ordenar por:</p>
                        <select value ={valueFiltrado.sortBy} onChange={(e) => handlePopulation(e)}>
                        <option value="nombre">Nombre</option>
                        <option value="poblacion">Poblacion</option>
                    </select>
                    </div>
                    
                <div className="filterContinent">
                    <p>Ordenar de:</p>
                    
                    <select value ={valueFiltrado.sortOrder} onChange={(e) => handleOrderByAsc(e)}>
                            <option value="asc">Menor a mayor</option>
                            <option value="desc">Mayor a menor</option>
                        </select>
                    
                </div>
                <div className="filterContinent">
                        <p>Filtrar por continente:</p>
                        <select value ={valueFiltrado.continentFilter} onChange={(e) => handleFilterContinent(e)}>
                            <option value="All">Todos</option>
                            <option value="Africa">Africa</option>
                            <option value="Americas">Americas</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europa</option>
                            <option value="Oceania">Oceania</option>
                        </select>
                    </div>
                </div>
                
                {currentCountries ? (
                <div className="allCountriesContainer">
                    
                    {currentCountries?.map((obj) => {
                        return (
                            <div key={obj.id}>
                                    <Card
                                        id = {obj.id}
                                        nombre={obj.nombre}
                                        img={obj.img}
                                        continente={obj.continente}
                                    ></Card>
                            </div>
                        );
                    })}
                </div>):<div className="loader"><Loader/></div>
                }
                 {countries[0] ? (
                <Paginado
                    paginado={paginado}
                    countriesPerPage={countriesPerPage}
                    allCountries={countries?.length}
                    currentPage={currentPage}
                />):null}
            </div>
        </>
    )
}
