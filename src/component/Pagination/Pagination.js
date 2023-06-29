import React, { useEffect, useState } from 'react'

const Pagination = ({numberPages, handleNumberPage, currentPage, handleNextPage,handlePrevPage}) => {
  const pages = [];
  const [currentButtons, setCurrentButtons] = useState(1);
  const [arrCurrentButtons, setArrCurrentButtons] = useState([]);

  for (let i = 1; i <= Math.ceil(numberPages / 5); i++){
      pages.push(i)
  }

  useEffect(()=>{
    let tempNumberPages = [...pages];

    if(currentButtons >= 1 && currentButtons <= 3){
      tempNumberPages = [1,2,3,4,'...', pages.length]
    }
    else if (currentButtons === 4) {
      const sliced = pages.slice(0, 5);
      tempNumberPages = [...sliced, '...', pages.length]
    }

    setArrCurrentButtons(tempNumberPages)
  },[currentButtons])

  const handleCurrentButton = (page) => {
    handleNumberPage(page)
    setCurrentButtons(page)
  }

  return (
    <nav aria-label="Page navigation ">
      <ul className="pagination">
        <li className="page-item">
          <button onClick={handlePrevPage} className="page-link">Previous</button>
        </li>
        {arrCurrentButtons.map((page,index) => (
          <li key={index}
            className={page === currentPage ? 'page-item active' : 'page-item' }>
            <button
            className="page-link" 
            onClick={handleCurrentButton(page)}>{page}</button>
          </li>
          ))}
        <li className="page-item">
          <button onClick={handleNextPage} className="page-link">Next</button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination