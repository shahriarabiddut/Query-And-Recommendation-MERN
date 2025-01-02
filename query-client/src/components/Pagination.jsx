import React from 'react'
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';

const Pagination = ({setItemsPerPage,setCurrentPage,currentPage,pages,itemsPerPage}) => {
    const handleItemsPerPage = e => {
        const val = parseInt(e.target.value);
        setItemsPerPage(val);
        setCurrentPage(0);
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }
  return (
    <div className='pagination py-2 flex justify-center items-center gap-2 my-8'>
                    <button onClick={handlePrevPage} className='bg-blue-500 text-white border-blue-500 inline-flex p-2 rounded-md border items-center gap-2'> <CiCircleChevLeft/> Prev</button>
                    {
                        pages.map(page => <button
                            className={`${currentPage === page ? 'bg-blue-500 text-white border-blue-500' : ''} p-2 rounded-md border `}
                            onClick={() => setCurrentPage(page)}
                            key={page}
                        >{page}</button>)
                    }
                    <button onClick={handleNextPage} className='bg-blue-500 text-white border-blue-500 inline-flex p-2 rounded-md border items-center gap-2'> Next <CiCircleChevRight/></button>
                    <select className='px-4 py-2 rounded-md border ' value={itemsPerPage} onChange={handleItemsPerPage} id="itemsPerPage">
                        <option value="6">6</option>
                        <option value="12">12</option>
                        <option value="24">24</option>
                        <option value="60">60</option>
                    </select>
                </div>
  )
}

export default Pagination