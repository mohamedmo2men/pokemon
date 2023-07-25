import React from 'react';
import './Pagination.css'
const Pagination = ( {goToNxPage, goToPrePage}) => {
  return (
    <div>
      {goToPrePage && <button className='btn' onClick={goToPrePage} >Previous Page</button>} 
     { goToNxPage && <button className='btn' onClick={goToNxPage}goToNxPage >Next Page</button>
     } 
    </div>
  );
}

export default Pagination;
