const express= require("express");
const{Country,Activity}= require("../db");
const { Op } = require("sequelize");
const router= express.Router();
const{infoApi}= require("../controllers/GeneralControllers");

router.get("/", async(req,res)=>{
  //const countries = await infoApi()
  const {name} = req.query
  
  // const allcountries = await Country.findAll()
  // console.log(allcountries)
  
  // if(!allcountries.length) await Country.bulkCreate(countries)
  
  if(name){
    // const getCountry=countries.filter((e)=> e.name.toLowerCase().includes(name.toLowerCase()))
    // getCountry.length>0 ? res.json(getCountry) : res.json(404).send('No existe') 
    const getCountries = await Country.findAll({where:{
      name:{
        [Op.iLike]:'%'+ name + '%'}},
        include:{
          model:Activity,
          attributes:['name','difficulty','duration','season'],
          through:{
            attributes:[]
          }
        }})
        res.json(getCountries)
  }else{
    const getCountry = await Country.findAll({include:{
      model:Activity,
      attributes:['name','difficulty','duration','season'],
      through:{
        attributes:[]
      }
    }})
    res.json(getCountry)
  }
    
//     const{name}= req.query;
//     const totalCountries = await Country.findAll({
//         include: {
//           model: Activity,
//         },
//       });
      
//       try {
//         if (name) {
//             const countryQuery = await Country.findAll({
//               where: {
//                 name: {
//                   [Op.iLike]: `%${name}%`,
//                 },
//               },
//               include: Activity,
//             });
//             if (countryQuery.length === 0) {
//               return res.status(404).send("No existe el pais");
//             }
//             return res.json(countryQuery);
//           } else {
//             return res.json(totalCountries);
//           }
//       } catch (error) {
//           console.log(error)
//       }
 })

router.get("/:id",async(req,res)=>{
 const countryId=req.params.id.toUpperCase();
 try {
    const countrySearch= await Country.findByPk(countryId, {
        include: Activity,
       });
      countrySearch
       ? res.json(countrySearch)
      : res.status(404).send(`${countryId} No existe`);
 } catch (error) {
    console.log(error) 
 }

 })
// router.post("/",async(req,res)=>{
//  await infoApi()
//  res.status(200).send("countries creadas")
//  })


 
module.exports= router;
