import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx'


export default function SelectOrCreate(){
   return <div>
       <NavBar/>
       <div style={{position:"absolute", top:"50%",left:"50%", display:"flex",gap:"2rem"}}>
        <Link  to="/activities/select">Seleccionar actividad</Link>
        <Link to="/activities/create">Crear actividad desde 0</Link>
        </div>
    </div>
}