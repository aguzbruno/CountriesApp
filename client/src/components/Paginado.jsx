/** @format */

import "../styles/Paginado.css";

export default function Paginado({
    allCountries,
    countriesPerPage,
    paginado,
    currentPage,
}) {
    //Inicio el paginado con 0 paginas
    const pageNumbers = [];
    //Hago el redondeo hacia abajo y saco la cuenta de cuantas paginas deberia haber, si hay 9 por pagina hay 28 paginas, si hay 10 hay 25
    for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
        pageNumbers.push(i);
    }

    //Funcion siguiente, el window scroll para que suba la ventana al apretar el boton. Desaparece cuando no hay mas paginas (en el renderizado)
    function next() {
            paginado(currentPage + 1);
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
    }
    //Funcion ir al final, el window scroll para que suba la ventana al apretar el boton. Desaparece cuando no hay mas paginas(en el renderizado)
    function goToEnd() {
        paginado(pageNumbers.length);
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }
    //Funcion anterior, el window scroll para que suba la ventana al apretar el boton. Aparece en la segunda pagina (en el renderizado)
    function previous() {
        if (currentPage !== 1) {
            paginado(currentPage - 1);
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        }
    }
    //Funcion ir al primero, el window scroll para que suba la ventana al apretar el boton. Aparece en la tercer pagina (en el renderizado)
    function first() {
        paginado(1);
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }
    return (
        <nav className={"paginadoAllContainer"}>
            <div className={"paginadoContainer"}>
                {currentPage > 2 ? (
                    <button className="nextButton" onClick={first}>
                        Primera{" "}
                    </button>
                ) : null}
                {currentPage !== 1 ? (
                    <button className="previousButton" onClick={previous}>
                        {" "}
                        Anterior{" "}
                    </button>
                ) : null}
                <div>{currentPage}</div>
                <div style={{ width: "5rem" }}> de {pageNumbers.length}</div>
                {currentPage < pageNumbers.length ? (
                    <button className="nextButton" onClick={next}>
                        Siguiente{" "}
                    </button>
                ) : null}
                {currentPage < pageNumbers.length - 1 ? (
                    <button className="nextButton" onClick={goToEnd}>
                        Ultima{" "}
                    </button>
                ) : null}
            </div>
        </nav>
    );
}
