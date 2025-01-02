import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import QueryCard3 from '../components/QueryCard3';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MostViewed = () => {
    const axiosSecure = useAxiosSecure();
    const [loader,setLoader] = useState(true);
    const [queries,setQueries] = useState([]);
    //
    useEffect(()=>{
        axiosSecure.get(`/queriesByView`).then(res=>{setQueries(res.data);setLoader(false);});
    },[]);
    //
    return (
        <section className="bg-gray-200 py-10">
            <div className='w-11/12 mx-auto py-10'>
            <h2 className="text-4xl font-rancho text-center py-5">Most Viewed Queries</h2>
            <div className='flex justify-center'><progress className="progress w-56 bg-blue-600"></progress></div>
            {
                loader ? (
                <Loading />
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-10 ">
                        {queries.map((query) => (
                            <QueryCard3 key={query._id} query={query} setQueries={setQueries} queries={queries}></QueryCard3>
                        ))}
                        </div>
                    </>
                    )
            }
            </div>
        </section>
    )
}

export default MostViewed