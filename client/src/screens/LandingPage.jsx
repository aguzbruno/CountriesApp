/** @format */

import Earth from "../earth.mp4";
import "../../src/styles/LandingPage.css";
import { NavLink } from "react-router-dom";

export default function LandingPage() {
    return (
        <>
        <header>
            <video
                autoPlay
                loop
                muted
            >
                <source src={Earth} type="video/mp4" />
            </video>
            <div className="landing-contenedor">
                <h1>Entra y descubre un mundo nuevo</h1>
                <NavLink to="/countries" className="button-landing">
                    Ingresa
                </NavLink>
            </div>
        </header>
        </>
    );
}
