import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLeftLong,faRightLong } from '@fortawesome/free-solid-svg-icons';
import './paginator.css';

const Paginator = ({dataApi,nextPage,previousPage,specifyPage}) =>{

    
  let totalPages = dataApi.lastPage
  let arrayNumberPages = [];

  const iteration = () =>{
    for(let i = 1; i <= totalPages; i++){
        arrayNumberPages.push(i);
    }
    return arrayNumberPages;
  };


 
    return(
        <>
          <div className="paginator-container">
            <p className="p-paginator">{dataApi.firstItem}-{dataApi.lastItem} de {dataApi.total}</p>
          <FontAwesomeIcon className="arrow-left-paginator" onClick={() => previousPage(dataApi.previousPageUrl)} icon={faLeftLong} />
          <div>
             {
                iteration().map((i) => {
                    return <button className="buttons-paginator" onClick={() => specifyPage(i)} key={i}>{i}</button>
                })
             }
          </div>
          <FontAwesomeIcon className="arrow-raigth-paginator" onClick={() => nextPage(dataApi.nextPageUrl)} icon={faRightLong} />
          </div>
        </>
    );

};

export default Paginator;