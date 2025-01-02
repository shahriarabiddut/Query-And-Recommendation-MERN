import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import PageTop from '../components/PageTop';
import Pagination from '../components/Pagination';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const RecomForMe = () => {
    const pageTitle = 'Recommendations For Me';
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const [loader,setLoader] = useState(true);
    const [queryId,setqueryId] = useState(null);
    const [recommendations,setRecommendations] = useState([]);
     // Pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [count, setCount] = useState(0)
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];
    //
    useEffect(()=>{
            axiosSecure.get(`/recommendationsforme?email=${user.email}&page=${currentPage}&size=${itemsPerPage}`).then(res => {setRecommendations(res.data);}).catch((error) =>console.error(error));
            setTimeout(() => {
                setLoader(false);
              }, 3000);
        },[currentPage, itemsPerPage]);
    //  Pagination Functions
    useEffect( () =>{
        axiosSecure(`/recommendationsForMeCount?email=${user.email}`)
        .then(res => setCount(res.data.count))
    }, [])
    //
    return (
        <section className='w-11/12 mx-auto'>
            <Helmet>
                <title>{pageTitle} | {import.meta.env.VITE_NAME || 'ProRecommendation'}</title>
            </Helmet>
            <PageTop title={pageTitle}/>
            <div className='w-11/12 mx-auto'>
            {
                loader ? (
                <Loading />
                ) : recommendations.length !== 0 ? (
                    <>
                        <div>
                        <div className="overflow-x-auto my-10">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Query</th>
                                    <th>Query Product</th>
                                    <th>Recommendation</th>
                                    <th>Recommended Product</th>
                                    <th>Time</th>
                                </tr>
                                </thead>
                                <tbody>
                                {recommendations.map((recommendation) => (
                                    <tr key={recommendation._id}>
                                    <th><Link to={`/queries/${recommendation.queryId}`} className="font-bold text-blue-600">{recommendation.queryTitle}</Link></th>
                                    <th>{recommendation.productName}</th>
                                    <th>{recommendation.recommendationTitle}</th>
                                    <th>{recommendation.recommenderProductName}</th>
                                    <td>{recommendation.createdAt.toLocaleString()}</td>
                                </tr>))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </>
                    ) : 
                    (
                        <div className='grid justify-center my-10 gap-4'>
                        <p className='font-rancho text-5xl'>No Data Found</p>
                        </div>
                    )
            }
            {/* Pagination */}
            {
                recommendations.length !== 0 &&
                <Pagination setItemsPerPage={setItemsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} pages={pages} itemsPerPage={itemsPerPage} />
            }
            {/* Ends */}
            </div>
        </section>
    )
}

export default RecomForMe