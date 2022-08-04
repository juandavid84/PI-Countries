import React from 'react'

export default function Paginado({countriesPerPage,allCountries,paginado,currentPage}){
    let pageNumbers=[]
    for(let i=1;i< allCountries/countriesPerPage;i++){
        pageNumbers.push(i)
    }
    const finalPage=pageNumbers[pageNumbers.length-1]
     pageNumbers=pageNumbers.filter(e=>
        e>=currentPage-2&&e<=currentPage+2
    )
    //let x=1
    return(
        <nav>
            <ul>
                <button className={currentPage===1||pageNumbers.length===0?"hide":""}onClick={()=>paginado(currentPage-1)}>{"<--"}</button>
                {pageNumbers&&
                pageNumbers.map((number,i)=>
                    // <li className="number" key={number}>
                    <button className={number===currentPage?"current":""} key={i} onClick={()=>{paginado(number)}}>{number}</button>
                    
                    // </li>
                    
                )} 
                <button className={currentPage===finalPage||pageNumbers.length===0?"hide":""}onClick={()=>paginado(currentPage+1)}>{"-->"}</button>
            </ul>
        </nav>
    )
}
