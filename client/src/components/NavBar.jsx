/** @format */

import Space from "../space-background.mp4";
import MiniEarth from "../only-earth.mp4";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";
import Searcher from "../components/Searcher"

export default function NavBar({searcher}) {
    //Constante para desactivar la barra de busqueda, si no se le pasa parametro no esta
    const searcherOn=searcher;
    return (
        <div className="navBarAllContainer">
            {searcherOn? (
            <div className="searcher">
            <Searcher/>
            </div>):(null)}
            <Link to="/">
            <video className="miniEarth" autoPlay loop muted>
                <source src={MiniEarth} type="video/mp4" />
            </video>
            </Link>
            <video className="backgroundVideo" autoPlay loop muted>
                <source src={Space} type="video/mp4" />
            </video>
            <Link
                to="/countries"
                style={{ textDecoration: "none" }}
                className="home"
            >
                {" "}
                Descubrir el mundo{" "}
            </Link>
            <Link
                to="/activities"
                style={{ textDecoration: "none" }}
                className="actividades"
            >
                {" "}
                Crear actividades{" "}
            </Link>
        </div>
    );
}
