/** @format */

import NavBar from "../components/NavBar";
import "../styles/FormActivity.css";
import { useState, useEffect } from "react";
import { getAllCountries, postActivity,getAllActivities } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import validateForm from "./validateForm.js";

export default function FormActivity() {
    //Dispatch
    const dispatch = useDispatch();
    //Luego de hacer la llamada a la api get countries, me traigo el estado global de all countries
    const allCountries = useSelector((state) => state.allCountries);
    const allActivities = useSelector((state) => state.allActivities);
    //Seteo mi arreglo de paises, ya que no quiero que se repitan al seleccionar
    const [paises,setPaises] = useState([]);
    //Creo un arreglo del arreglo paises, por si el usuario va cambiando de los seleccionados
    const initialPaisesForm = {
        current: "",
        seleccionados: [],
        ids: [],
    };
    const [paisesForm, setPaisesForm] = useState(initialPaisesForm);
    //Creo un estado de errores (para validacion de formulario)
    const [errors, setErrors] = useState({});
    //Establezco la actividad inicial, y con ello el valor inicial de los inputs para resetearlos
    const [newActivity, setNewActivity] = useState({
        nombre: "",
        descripcion: "",
        dificultad: "",
        duracion: "",
        temporada: "Otoño",
        paises: [],
    });

    //Asigno los ids al arreglo paises cuando se seleccionen en el formulario
    useEffect(() => {
        setNewActivity((prev) => ({ ...prev, paises: paisesForm.ids }));
    }, [paisesForm.ids]);

    //Use effect para traer allCountries, en caso de que no se traiga antes en otra ruta
    useEffect(() => {
        dispatch(getAllCountries());
        dispatch(getAllActivities());
    }, []);

    // Use effect para que cuando allCountries se llene, tambien llene Paises
    useEffect(() => {
        setPaises(allCountries)
    }, [allCountries]);

    

    //Funcion para manejar el foco. Ver de arreglar porque no actualiza en el momento
    function handleBlur(e, inputName, num) {
        handlerInputs(e, inputName, num);
        console.log(allActivities)
        
    }

    //Funcion para manejar todos los input excepto el de paises
    function handlerInputs(e, inputName, num) {
        e.preventDefault();
        if (inputName === "dificultad") {
            for (let i = 1; i <= num; i++) {
                const star = document.getElementById(i);
                star.style.color = "orange";
            }
            for (let i = 5; i > num; i--) {
                const star = document.getElementById(i);
                star.style.color = "gray";
            }
            setNewActivity({ ...newActivity, [inputName]: num });
            setErrors(validateForm({...newActivity,[inputName]: num },allActivities));
        } else {
            setNewActivity({ ...newActivity, [inputName]: e.target.value });
            console.log(newActivity)
            setErrors(validateForm({...newActivity,[inputName]: e.target.value },allActivities));
        }
    }

    //Funcion para manejar el input de paises
    function handleAddCountry(e) {
        e.preventDefault();
        //Cuando selecciono un pais lo busco en la lista
        const paisSeleccionado = paises.find(
            (pais) => pais.nombre === paisesForm.current
        );
        //Si no esta en la lista aviso al usuario
        if (!paisSeleccionado) {
            alert("Seleccione un pais correcto");
            return;
        }
        //En esta linea lo saco de la lista de paises a seleccionar, ya que ya lo seleccione
        setPaises(paises.filter((obj) => obj.nombre !== paisesForm.current));
        //Creo una varible con un objeto con el pais seleccionado junto con su id y lo agrego al estado
        if (!paisesForm.ids.includes(paisSeleccionado.id)) {
            let newState = {
                current: "",
                seleccionados: [...paisesForm.seleccionados, paisSeleccionado],
                ids: [...paisesForm.ids, paisSeleccionado.id],
            };
            setPaisesForm(newState);
            console.log(paisesForm);
        }
        setErrors(validateForm({ ...newActivity, paises:[...paises,paisSeleccionado]},allActivities));
    }
    //Funcion para eliminar un pais seleccionado.
    function handleDeleteCountry(e) {
        const { name } = e.target;
        e.preventDefault();
        //Al eliminar un pais de los seleccionados, tambien tengo que agregarlo al array de paises a seleccionar
        const countryToDelete = paisesForm.seleccionados.find(
            (pais) => pais.id === name
        );
        setPaises([...paises, countryToDelete]);
        //En esta linea finalmente si los elimino de los seleccionados, al igual que elimino el id
        setPaisesForm({
            ...paisesForm,
            seleccionados: paisesForm.seleccionados.filter(
                (pais) => pais.id !== name
            ),
            ids: paisesForm.ids.filter((idPais) => name !== idPais),
        });
    }
    //Funcion para resetear el form
    function resetForm(e) {
        e.preventDefault();
        for (let i = 1; i <= 5; i++) {
            const star = document.getElementById(i);
            star.style.color = "gray";
        }
        setNewActivity({
            nombre: "",
            descripcion: "",
            dificultad: "",
            duracion: "",
            temporada: "Otoño",
            paises: [],
        });
        setPaisesForm(initialPaisesForm);
        setPaises(allCountries)
    }

    //Funcion para el boton crear actividad
    function createActivity(e) {
        e.preventDefault();
        let errors = validateForm(newActivity);
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            dispatch(postActivity(newActivity));
            console.log(newActivity);
            alert("Se ha creado correctamente la actividad");
            resetForm(e);
        } else {
            alert("Por favor llene el formulario");
        }
    }

    return (
        <>
            <NavBar />
            <form className="activityContainer">
                <h1>Crear nueva actividad:</h1>
                <p>Nombre de la actividad:</p>
                <input
                    type="text"
                    value={newActivity.nombre}
                    onChange={(e) => {
                        handleBlur(e, "nombre");
                    }}
                />
                {errors.nombre && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                        {errors.nombre}
                    </p>
                )}
                <p>Breve descripción:</p>
                <textarea
                    value={newActivity.descripcion}
                    onChange={(e) => {
                        handleBlur(e, "descripcion");
                    }}
                    type="text"
                />
                {errors.descripcion && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                        {errors.descripcion}
                    </p>
                )}
                <p>Nivel de dificultad:</p>
                <div className="dificultyStars">
                    <button
                        id="5"
                        onClick={(e) => {
                            handleBlur(e, "dificultad", 5);
                        }}
                    >
                        ★
                    </button>
                    <button
                        id="4"
                        onClick={(e) => {
                            handleBlur(e, "dificultad", 4);
                        }}
                    >
                        ★
                    </button>
                    <button
                        id="3"
                        onClick={(e) => {
                            handleBlur(e, "dificultad", 3);
                        }}
                    >
                        ★
                    </button>
                    <button
                        id="2"
                        onClick={(e) => {
                            handleBlur(e, "dificultad", 2);
                        }}
                    >
                        ★
                    </button>
                    <button
                        id="1"
                        onClick={(e) => {
                            handleBlur(e, "dificultad", 1);
                        }}
                    >
                        ★
                    </button>
                </div>
                {errors.dificultad && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                        {errors.dificultad}
                    </p>
                )}
                <p>Duracion en horas</p>
                <input
                    value={newActivity.duracion}
                    onChange={(e) => {
                        handleBlur(e, "duracion");
                    }}
                />
                {errors.duracion && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                        {errors.duracion}
                    </p>
                )}

                <p>Temporada del año para realizarla</p>
                <select
                    name=""
                    id=""
                    value={newActivity.temporada}
                    onChange={(e) => {
                        handleBlur(e, "temporada");
                    }}
                >
                    <option value="Otoño"> Otoño </option>
                    <option value="Verano"> Verano </option>
                    <option value="Primavera"> Primavera </option>
                    <option value="Invierno"> Invierno </option>
                </select>
                <p>Seleccione los países donde se puedan realizar</p>
                <div className="addCountryContainer">
                    <input
                        autoComplete="off"
                        type="text"
                        list="paises"
                        value={paisesForm.current}
                        name="current"
                        onChange={(e) =>
                            setPaisesForm({
                                ...paisesForm,
                                current: e.target.value,
                            })
                        }
                    />
                    <datalist id="paises">
                        {paises.map((pais) => (
                            <option key={pais.id} value={pais.nombre}>
                                {pais.nombre}
                            </option>
                        ))}
                    </datalist>

                    <button
                        className="addCountry"
                        onClick={(e) => {
                            handleAddCountry(e);
                        }}
                    >
                        Agregar Pais
                    </button>
                </div>
                {errors.paises && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                        {errors.paises}
                    </p>
                )}
                <div className="flagsContainer">
                    {paisesForm.seleccionados.map((obj) => {
                        return (
                            <div key={obj.id} className="flagContainer">
                                <button
                                    className="botonDelete"
                                    name={obj.id}
                                    onClick={(e) => {
                                        handleDeleteCountry(e);
                                    }}
                                >
                                    X
                                </button>{" "}
                                <img
                                    className="bandera"
                                    src={obj.img}
                                    alt={obj.nombre}
                                    title={`Eliminar ${obj.nombre}`}
                                    name={obj.id}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="buttonsActivity">
                    <button
                        onClick={(e) => {
                            resetForm(e);
                        }}
                    >
                        Limpiar campos
                    </button>
                    {Object.keys(errors).length === 0 && (
                        <button
                            onClick={(e) => {
                                createActivity(e, newActivity);
                            }}
                        >
                            Crear actividad
                        </button>
                    )}
                </div>
            </form>
        </>
    );
}
