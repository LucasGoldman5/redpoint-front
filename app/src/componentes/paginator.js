import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLeftLong,faRightLong } from '@fortawesome/free-solid-svg-icons';
import './paginator.css';

const Paginator = ({dataApi,nextPage,previousPage,specifyPage}) =>{

    
    const totalPages = dataApi.paginator.lastPage;
    const arrayNumberPages = [];
    
    for (let i = 1; i <= totalPages; i++) {
      arrayNumberPages.push(i);
    }
    
    return (
      <>
        <div className="paginator-container">
          <p className="p-paginator">Items {dataApi.paginator.firstItem}-{dataApi.paginator.lastItem} de {dataApi.paginator.total}</p>
          <div className="paginator-container-arrows">
          <FontAwesomeIcon className="arrow-left-paginator" onClick={() => previousPage(dataApi.paginator.previousPageUrl)} icon={faLeftLong} />
          <p>Pag</p>
            <div>
                {
                (arrayNumberPages.length > 1) ? (
                    arrayNumberPages.map((i) => (
                    <button className={(i.toString() === dataApi.paginator.currentPage.split("=")[1])?"buttons-paginator-on":"buttons-paginator"} onClick={() => specifyPage(i)} key={i}>{i}</button>
                    ))
                ) : (
                    <button className="buttons-paginator">0</button>
                )
                }
            </div>
          <FontAwesomeIcon className="arrow-right-paginator" onClick={() => nextPage(dataApi.paginator.nextPageUrl)} icon={faRightLong} />
          </div>
        </div>
      </>
    );
}

export default Paginator;