/** @format */

import "../styles/Card.css";
import { Link } from "react-router-dom";
export default function Card({ nombre, img, continente, id }) {
    return (
        <div className="countryContainer">
            <Link to={"/countries/" + id} style={{ textDecoration: "none" }}>
                <img className="flag" src={img} alt="pais" />
            </Link>
            <div className="nameAndContinent">
                <Link
                    to={"/countries/" + id}
                    style={{ textDecoration: "none" }}
                >
                    <p className="countryName">{nombre}</p>
                </Link>

                <div className="continentName">
                    <Link
                        to={"/countries/" + id}
                        style={{ textDecoration: "none" }}
                    >
                        <button className="verMas">Ver mas</button>
                    </Link>
                    <p className="continentNameP">{continente}</p>
                </div>
            </div>
            <div></div>
        </div>
    );
}
