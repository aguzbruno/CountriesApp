/** @format */

import { useEffect } from "react";
import "../styles/Activity.css";

export default function Activity({
    nombre,
    dificultad,
    descripcion,
    duracion,
    temporada,
}) {
    useEffect(()=>{
        for (let i = 1; i <= dificultad; i++) {
            const star = document.getElementById(`${nombre}${descripcion}${i}`);
            star.style.color = "orange";
        }
    })

    return (
        <div className="actividad-contenedor">
            <h1>{nombre}</h1>
            <div className="items-contenedor">
                <div className="dificultad-temporada">
                    <div className="dificultad-actividad">
                        <h4>Dificultad:</h4>
                        <div className="stars">
                        <label id={`${nombre}${descripcion}${1}`} >★</label>
                        <label id={`${nombre}${descripcion}${2}`} >★</label>
                        <label id={`${nombre}${descripcion}${3}`} >★</label>
                        <label id={`${nombre}${descripcion}${4}`} >★</label>
                        <label id={`${nombre}${descripcion}${5}`} >★</label>
                        </div>
                    </div>
                    <div className="temporada-actividad">
                        <h4>Temporada:</h4>
                        <h5>{temporada}</h5>
                    </div>
                </div>
                <div className="descripcion-duracion">
                    <div className="descripcion-actividad">{descripcion}</div>
                    <div className="duracion-actividad">
                        <h4>Duracion:</h4>
                        <h5>{duracion}hrs</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}
