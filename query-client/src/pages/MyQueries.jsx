import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import Loading from '../components/Loading';
import PageTop2 from '../components/PageTop2';
import Pagination from '../components/Pagination';
import QueryCard from '../components/QueryCard';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { cssA, whiteHover } from '../utility/utility';

const MyQueries = () => {
    const pageTitle = 'My Queries';
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const [loader,setLoader] = useState(true);
    const [queries,setQueries] = useState([]);
    // Pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [count, setCount] = useState(0)
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];
    //
    useEffect(()=>{
        axiosSecure.get(`/query?email=${user.email}&page=${currentPage}&size=${itemsPerPage}`).then(res => setQueries(res.data)).catch((error) =>console.error(error));
        setTimeout(() => {
            setLoader(false);
          }, 3000);
    },[currentPage, itemsPerPage]);
    //  Pagination Functions
    useEffect( () =>{
        axiosSecure(`/myQueriesCount?email=${user.email}`)
        .then(res => setCount(res.data.count))
    }, [])
    //
    return (
        <section >
            <Helmet>
                <title>{pageTitle} | {import.meta.env.VITE_NAME || 'ProRecommendation'}</title>
            </Helmet>
            <PageTop2 title={pageTitle}/>
            <div className='w-11/12 mx-auto'>
            {
                loader ? (
                <Loading />
                ) : queries.length !== 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-10 ">
                        {queries.map((query) => (
                            <QueryCard key={query._id} query={query} setQueries={setQueries} queries={queries}></QueryCard>
                        ))}
                        </div>
                    </>
                    ) : 
                    (
                        <div className='grid justify-center my-10 gap-4'>
                        <p className='font-rancho text-5xl'>No Data Found</p>
                        <p className='text-center'>Need Recomendations ? </p>
                        <NavLink to={'/queries/addqueries'}  className={cssA+whiteHover} > Add New Query</NavLink>
                        </div>
                    )
            }
            {/* Pagination */}
            {
                queries.length !== 0 &&
                <Pagination setItemsPerPage={setItemsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} pages={pages} itemsPerPage={itemsPerPage} />
            }
            {/* Ends */}
            </div>
        </section>
    )
}

export default MyQueries