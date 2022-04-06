const validateForm = (newActivity,allActivities) => {
    const { nombre, duracion,dificultad,paises, descripcion } = newActivity;
    const errors = {};

    
    
   //  if(allActivities){
   //  for(let i = 0; i<allActivities.length;i++){
   //      if(allActivities[i].nombre.toLowerCase() === nombre.toLowerCase()) {
   //          errors.nombre = "El nombre ingresado ya existe"
   //      }
   //  }}
    if (!nombre.trim()) {
       errors.nombre = "El campo nombre es requerido";
    } else if (nombre.trim().length > 30) {
       errors.nombre = "La extensión máxima de este campo es de 30 caracteres";
    }
 
    if (!duracion) {
       errors.duracion = "El campo duración es requerido";
    } else if (isNaN(parseFloat(duracion))) {
       errors.duracion = "El campo duración debe ser un número";
    } else if (parseFloat(duracion) < 1 || parseFloat(duracion) > 48) {
       errors.duracion = "Los valores aceptados son de 1 a 48"
    }
    if(!dificultad){
        errors.dificultad = "Selecione la dificultad";
    }
 
                ;
    if (!descripcion.trim()) {
       errors.descripcion = "El campo descripción es requerido";
    } else if (descripcion.trim().length > 100) {
       errors.descripcion = "La descripción tiene un límite de 100 caracteres.";
    } else if (descripcion.trim().length< 40) {
        errors.descripcion = "La descripción tiene que tener minimo 40 caracteres.";
     }
 
    if (!paises[0]) {
       errors.paises = "Seleccione al menos un país"
    }
 
    return errors;
 };
 
 export default validateForm;