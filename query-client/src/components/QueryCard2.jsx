import React from 'react'
import { NavLink } from 'react-router-dom'

const QueryCard = ({query,columns}) => {
  return (
    <>
    <div className="card bg-base-100 shadow-xl">
        <figure>
            <img
            src={query.image}
            alt="Shoes" 
            className={` py-2 ${
                columns === 1 ? "h-64"
              : columns === 2 ? "h-52"
              : columns === 3 ? "h-48"
              : "h-40"
        }`}
            />
        </figure>
        <div className="card-body font-barlow">
            <h2 className="card-title text-2xl">{query.queryTitle}</h2>
            <div className='space-y-2'>
                <p>Posted On : {query.createdAt}</p>
                {
                    query.recommendationCount === 0 ?
                    <p>No Recommendations</p>
                    :
                    <p>Recommendations : {query.recommendationCount}</p>
                }
                <p>Views : {query.views}</p>
            </div>
            <div className="flex ">
            <NavLink to={`/queries/${query._id}`} className="flex items-center rounded-xl bg-blue-400 hover:bg-white hover:text-blue-500 p-3 text-xl text-white w-full justify-center gap-4 font-semibold "> Recommend</NavLink>
            </div>
        </div>
    </div>
    </>
  )
}

export default QueryCard