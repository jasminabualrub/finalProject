import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap";

function Pajenation({postPerPage,totalPosts,paginate}) {
  const pageNumber=[];
  const handelPageClick=(e)=>{
    setActivePage(e);
    paginate(e);
  }
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumber.push(i);
  }
  const [activePage,setActivePage]=useState[1];
  return (
    <nav aria-label="...">
    <ul className="pagination">
      {pageNumber.map((e)=>{
        <li key={e} className={`page-item ${activePage===e?"active":""}`}>
          <Link href= "!#"onClick={()=>{handelPageClick(e);paginate(e)}}>{e}</Link>
        </li>
      })}
    </ul>
  </nav>
  )
}

export default Pajenation