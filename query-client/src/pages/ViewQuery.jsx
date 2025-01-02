import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLoaderData, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import PageTop2 from '../components/PageTop2'
import { Helmet } from 'react-helmet-async';
import Recommendation from '../components/Recommendation';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import RecommendationsList from '../components/RecommendationsList';

const ViewQuery = () => {
    const query = useLoaderData();
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()
    const pageTitle = ' Query Details';
    const [loader,setLoader] = useState(true);
    const [addRecommendation,setAddRecommendation] = useState(true);
    const [recommendations,setRecommendations] = useState([]);
    const location = useLocation();
    
    setTimeout(() => {
      setLoader(false);
    }, 3000);
    useEffect(()=>{
      axiosSecure.get(`/recommendations/${query._id}`).then(res => setRecommendations(res.data)).catch((error) =>console.error(error));
    },[])
  return (
    <section >
            <Helmet>
                <title>{query.queryTitle + pageTitle} | {import.meta.env.VITE_NAME || 'ProRecommendation'}</title>
            </Helmet>
            <PageTop2 title={''}/>
            <div className='w-11/12 mx-auto py-10'>
            {
                loader ? (
                <Loading />
                ) : (
                  <>
                  
                  <div className="overflow-x-auto my-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <div className='flex justify-center md:justify-end p-4'><img src={query.image} className='w-1/2' /></div>
                        <div className='flex flex-col gap-2 p-4'>
                          <h1 className='font-barlow text-3xl font-bold py-2'>{query.queryTitle}</h1>
                          
                          <p> <span className='font-bold py-2'>Product Name : </span> {query.productName}</p>
                          <p> <span className='font-bold py-2'>Product Brand : </span> {query.productBrand}</p>
                          <p> <span className='font-bold py-2'>Category : </span> {query.category}</p>
                          <p> <span className='font-bold py-2'>Viewed : </span> {query.views+1} times</p>
                          <p> <span className='font-bold py-2'>Boycotting Reason Details : </span> {query.boycottReason}</p>
                          <div className="flex gap-2 border border-gray-600 rounded-xl p-1 my-2">
                            <div><img src={query.userPhoto} className='w-16 h-16 rounded-2xl' /></div>
                            <div> 
                              <p> <span className='font-bold py-2'>Author : </span> {query.userName}</p>
                              <p> <span className='font-bold py-2'>Asked : </span> {query.createdAt}</p>
                            </div>
                          </div>
                         
                        </div>
                        <div>
                        </div>
                    </div>
                  </div>
                  

                  <div className='py-5'>
                    {
                      addRecommendation ?
                     ( <button className="inline-flex items-center rounded-xl bg-blue-400 hover:bg-white hover:text-blue-500 p-3 text-xl text-white w-full justify-center gap-4 font-semibold" onClick={()=>setAddRecommendation(!addRecommendation)}> Add Your Recommendation</button>)
                       :
                       user == null ?
                       ( <Link state={location.pathname} to={'/auth/login'} className="inline-flex items-center rounded-xl bg-orange-400 hover:bg-white hover:text-orange-500 p-3 text-xl text-white w-full justify-center gap-4 font-semibold" > Please Login To Add Recommendation</Link>)
                       :
                      ( <>
                      <button className="inline-flex items-center rounded-xl bg-purple-400 hover:bg-white hover:text-purple-500 p-3 text-xl text-white w-full justify-center gap-4 font-semibold mb-5" onClick={()=>setAddRecommendation(!addRecommendation)}> Hide Recommendation Form</button>

                     <Recommendation user={user} query={query} setRecommendations={setRecommendations} recommendations={recommendations}/>
                     </>)
                    }
                  </div>

                  </>
                    )
            }
            <div className="py-10">
                  {recommendations.length>0 &&
                    <h1 className="text-center font-barlow text-4xl font-bold border-b border-blue-500 p-3">Recommendations</h1>
                  }
                    {recommendations.map((recommendation) => (
                            <RecommendationsList key={recommendation._id} recommendation={recommendation} setRecommendations={setRecommendations} ></RecommendationsList>
                        ))}
                  </div>
            </div>
            
        </section>
  )
}

export default ViewQuery