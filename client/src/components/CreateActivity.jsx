import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getTotalCountries, postActivity } from '../actions';
import "./createActivity.css"



export function CreateActivity(){
  function validate(input){
    let errors={}
  if (input.name.length < 3) {
    errors.name = "El nombre debe tener mas de tres letras";
  }
  if (!input.name.match(/^[A-Za-z]+$/)) {
    errors.name = "El nombre debe contener solamente letras";
  }
  if (!input.duration) {
    errors.duration = "El campo duration es obligatorio";
  }
  if (!input.season) {
    errors.season = "El campo season es obligatorio para llenar";
  }
  if (!input.difficulty) {
    errors.difficulty = "El campo Difficulty es obligatorio para llenar";
  }
  return errors;
}
    const dispatch= useDispatch()
    const countries = useSelector((state) => state.allCountries);
    const[errors,setErrors]=useState({})
    const [input, setInput] = useState({
        name: "",
        difficulty: 0,
        duration: 0,
        season:"",
        country:[],
        
      });

      useEffect(() => {
        dispatch(getTotalCountries());
      }, [dispatch]);

      function handleOnChange(e) {
        setInput((state) => {
          const stateNew = {
            ...state,
            [e.target.name]: e.target.value,
          };
          setErrors(validate(stateNew));
          return stateNew;
        });
      }
      function handleOnClick(e){
        setInput({
          ...input,
          country:input.country.filter(c=>c!==e.target.name)
        })
      }
      
      function handleSelect(e) {
        if (!input.country.includes(e.target.value)) {
          setInput({
            ...input,
            country: [...input.country, e.target.value],
          });
          setErrors(
            validate({ ...input, country: [...input.country, e.target.value] })
          );
        } else {
          alert("Pais seleccionado anteriormente");
        }
      }
      function handleSubmit(e) {

        if (
          input.name.length < 3 ||
          !input.name.match(/^[A-Za-z]+$/) ||
          !input.difficulty ||
          !input.duration ||
          !input.season ||
          input.country.length === 0
        ) {
          e.preventDefault();
          alert("Completar todos los campos");
        } else {
          e.preventDefault();
          dispatch(postActivity(input));
          alert("Actividad creada de manera correcta");
          setInput({
            name: "",
            difficulty: 0,
            duration: 0,
            season: "",
            country: [],
          });
         
        }
      }
     
     
      return(
         
             <form id="form" className="form" onSubmit={handleSubmit}>
             <h3 className="title"> ¡Crear la Actividad!</h3>
             <div>
               <label>Name:</label>
               <input
               onChange={handleOnChange}
               name="name"
               type= "text"
               value={input.name}
               className="input"
               />{" "}
               {errors.name && <p className="error"> {errors.name}</p>}
             </div>
             <div>
               <label>Difficulty:</label>
               <select
               onChange={(e)=>handleOnChange(e)}
               name="difficulty"
               type= "number"
              // value={input.difficulty}
               className="input"
              
               >
                <option disabled selected>Selecciona una opción</option>
                <option value="Muy Facil">Muy Facil</option>
              <option value="Facil">Facil</option>
              <option value="Medio">Medio</option>
              <option value="Dificil">Dificil</option>
              <option value="Muy Dificil">Muy Dificil</option> 
              
            
               
               </select>
               {errors.difficulty && <p className="error"> {errors.difficulty}</p>}
             </div>
             
             <div>
               <label>Season:</label>
               <select
               onChange={handleOnChange}
               name="season"
               type="text"
               //value={input.season}
               className="input"
              
               >
                 <option disabled selected>Selecciona una opción</option>
                <option value="autumn">Autumn</option>
              <option value="winter">Winter</option>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option> 
                 {" "}
             
               </select>
               {errors.season && <p className="error"> {errors.season}</p>}
             </div>
             
               <div>
                 <select name="countries" onChange={(e)=>handleSelect(e)} placeholder="ingresar...">
                 <option disabled selected>Selecciona paises</option>
                 {countries?.map(e=>{
                   return <option key={e.name}  value={e.name}>{e.name}</option>
                 })}
                 </select>
               </div>

               <ul>
                 {input.country.map(e=>{
                   return <li key={e}>
                     <button type="button" name={e} onClick={(eve)=>handleOnClick(eve)}>X</button>
                     <span >{e}</span>
                   </li>
                 })}
               </ul>
             
             <div>
               <label>Duration:</label>
               <select
               onChange={(e)=>handleOnChange(e)}
               name="duration"
               type="number"
               //value={input.duration}
               className="input"
               
               >
                 <option disabled selected>Selecciona una opción</option>
               <option value={15}>15 minutos</option>
              <option value={30}>30 minutos</option>
              <option value={45}>45 minutos</option>
              <option value={60}>60 minutos</option>
              <option value={90}>90 minutos</option>
              <option value={120}>120 minutos</option>
              
              
               
                </select>
                {errors.duration && <p className="error"> {errors.duration}</p>}
             </div>
             <div>
                <Link to="/home"> 
                <button type="submit" className="atras">Atrás</button></Link>
      <button type="submit" className="bottom">Crear Actividad</button>
      </div>  
             </form>
         
      )

}