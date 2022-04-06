/** @format */

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getIdCountries,cleanGetIdCountries } from "../actions";
import "../styles/CountryDetail.css";
import NavBar from "../components/NavBar";
import {Link} from 'react-router-dom'
import Loader from "../components/Loader";
import Activity from "../components/Activity";

export default function CountryDetail() {
    //Dispatch
    const dispatch = useDispatch();
    //Traigo params
    const { id } = useParams();
    //Traigo el estado countryDetail
    const countryDetail = useSelector((state) => state.country);

    //UseEffect para traer el id del country, lo limpio para que se vaya vacio. Si no esta el dispatch como re-render, se crea un loop.
    useEffect(() => {
        dispatch(getIdCountries(id));
        return () => dispatch(cleanGetIdCountries())
    }, [dispatch]);

    return <div>
            <NavBar />
            <div className="countryDetailContainer">

                <h1>Informacion del pais</h1>
                {countryDetail ? (
                <div className="countryInfoContainer">
                    <Link style={{textDecoration:"none"}}className="backToCountries" to="/countries">Volver</Link>
                    
                    <div className="countryDetailName">
                        {countryDetail.nombre} ({countryDetail.id})
                    </div>
                    <div className="img">
                        <img
                            className="countryDetailImg"
                            src={countryDetail.img}
                            alt=""
                        />
                    </div>
                    <div className="detailInfo">
                    <div>
                            <h3>Continente:</h3>{" "}
                            <p> {countryDetail.continente}</p>
                        </div>
                        { countryDetail.capital? (
                        <div>
                            <h3>Capital:</h3> <p>{JSON.parse(countryDetail.capital)}</p>
                        </div>
                        ):null}
                        <div className="countryDetailPopulation">
                            <h3>Poblacion:</h3>{" "}
                            <p>{new Intl.NumberFormat().format(countryDetail.poblacion)} habitantes</p>
                        </div>
                        <div className="countryDetailRegion">
                            <h3>Area:</h3> <p>{new Intl.NumberFormat().format(countryDetail.area)}Km2</p>
                        </div>
                    </div>
                </div>):<div className="loaderCountryDetail"> <Loader/></div>}
                <div className="activities">
                    Actividades que se pueden realizar:
                </div>
                <div className="actividades-contenedor"> {countryDetail.actividades?.length > 0 ? (
          countryDetail.actividades.map((actividad) => {
            const { nombre, descripcion, duracion, dificultad, temporada } =
              actividad;
            return <Activity key={nombre} nombre={nombre} descripcion={descripcion} duracion={duracion} dificultad={dificultad} temporada={temporada}/>
          })): (
          <h1>No hay actividades por mostrar</h1>
        )}
            </div>
            </div>
        </div>
}
