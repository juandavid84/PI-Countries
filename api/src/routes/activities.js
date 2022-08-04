const express = require("express");
const { Country, Activity } = require("../db");
const { Op } = require("sequelize");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const ActivityFound = await Activity.findAll({
        include: {
          model: Country,
        },
      });
      return res.json(ActivityFound);
    } catch (error) {
      console.log(error)
    }
  });

  router.post("/", async (req, res) => {
      const{name,difficulty,duration,season,country}=req.body;
      if(!name||!difficulty||!duration||!season||!country){
        console.log("faltan datos")
       //return res.send(404).json({msg:"Faltan datos"})
      }
      try{
        let [activities,created]= await Activity.findOrCreate({
          
          where:{
            name,
            
            
          },
          defaults:{
            name,
            duration,
            difficulty,
            season,
            
          },
        })
        const countri= await Country.findAll({where:{name:country}})
       console.log(created)
       await activities.addCountries(countri)
      activities= await Activity.findOne({where:{name:name},include:Country})
       return res.json(activities)
      }catch(error){
        console.log(error.message);
        return res.status(404).send(error.message)
      }
    });   
      

    //try {
     // const { name, difficulty, duration, season, countries } = req.body;
  
     // const activityNew = await Activity.create({
        //createActivity,
       // name,
        //difficulty,
       // duration,
        //season,
      //});  
      //if (countries){ 
       // countries.map(async e=>{
         // const country= await Country.findOne({where:{name:e}})
         // const countryActivities = await  country.getActivities({where:{name:name}})
         // if(!countryActivities.length){
          // await activityNew.addCountry(country)
         // } 
        //})
       
      //}
      //res.send('creado')
      
    //     country.forEach(async (country) => {
    //      const countryActivity = await Country.findOne({
    //       where: {
    //          name: country,
    //        },
    //     });
    //     await activityNew.addCountry(countryActivity);
    // });
   //res.status(200).send("Actividad creada con exito");
  //} catch (error) {
    //console.log(error);
    //res.status(500).send("Actividad no puede ser creada", error);
  //}
  

module.exports= router
