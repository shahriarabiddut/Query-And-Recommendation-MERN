import React from 'react'
import { FaEye, FaPen, FaTrash } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import useAxiosSecure from '../hooks/useAxiosSecure'
import Swal from 'sweetalert2'
import useAuth from '../hooks/useAuth'

const QueryCard = ({query,setQueries,queries}) => {
    const axiosSecure = useAxiosSecure();
    const{user} = useAuth();
    const handleDelete = (_id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/query/${_id}?email=${user.email}`)
                .then(res=>{
                    // console.log(data)
                    if(res.data.deletedCount>0){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your data has been deleted.",
                            icon: "success"
                          });
                          const remainingQueries = queries.filter(eq=> eq._id != _id);
                          setQueries(remainingQueries)
                    }else{
                        Swal.fire({
                            title: "Error!",
                            text: "There was something Wrong.",
                            icon: "error"
                          });
                    }
                })
                
              
            }
          });
    }
  return (
    <>
    <div className="card bg-base-100 shadow-xl">
        <figure>
            <img
            src={query.image}
            alt="Shoes" 
            className='h-36'
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
            <div className="flex justify-between">
            <NavLink to={`/queries/${query._id}`}> <button className="inline-flex btn btn-primary text-xl text-white"><FaEye/> View</button> </NavLink>
            <NavLink to={`/queries/update/${query._id}`}> <button className="inline-flex btn btn-info text-xl text-white"><FaPen/> Update</button> </NavLink>
            <button className="inline-flex btn btn-error text-white text-xl" onClick={()=>{handleDelete(query._id)}}> <FaTrash/> Delete</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default QueryCard