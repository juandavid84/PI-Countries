const axios = require("axios");
const { Country ,Activity} = require("../db");


const infoApi= async()=>{
    const apiUrl = await axios.get('https://restcountries.com/v3.1/all')
    const allCountriesInit = await apiUrl.data.map(e=>{
      return{
        name: e.name.common,
        flag:e.flags.png,
        capital:e.capital ? e.capital[0] : 'No tiene capital',
        continents: e.continents? e.continents[0] : 'No tiene continente' ,
        subregion:e.subregion,
        area:e.area,
        population:e.population,
        id:e.cca3
      }
    })
    
    return allCountriesInit
  }




const bulkActivities= async ()=>{
  const activities= [{name:"prueba", difficulty: "facil", duration:3, season:"winter"},{name:"prueba2", difficulty: "facil", duration:3, season:"winter"}]
  const dbActivities= await Activity.findAll();
  if(!dbActivities.length){
    await Activity.bulkCreate(activities)
    console.log("activities populated")
  }
}



//     try {
//         const responseApi= await axios.get("https://restcountries.com/v3/all");
//         const infoCountries= await responseApi.data.map(e=>{
//             return{
//                 id:e.cca3,
//                 name:e.name.common,
//                 flag: e.flags[0],
//                 capital: e.capital?e.capital: "no tiene capital",
//                 region: e.region,
//                 subregion: e.subregion,
//                 area: e.area,
//                 population: e.population,



//             }
//         })
        
//      await Country.bulkCreate(infoCountries)
//      console.log('paises creados')
//     } catch (error) {
//         console.log(error)
//     }
 

module.exports={infoApi,bulkActivities}