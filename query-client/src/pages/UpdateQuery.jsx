import React, { useContext, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import { cssA, whiteHover } from '../utility/utility';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Community from '../components/Community';
import PageTop from '../components/PageTop';
import { FaDotCircle } from 'react-icons/fa';
import Loading from '../components/Loading';

 // DateTime
 const currentDate = new Date();
 const day = String(currentDate.getDate()).padStart(2, '0');
 const month = currentDate.toLocaleString('default', { month: 'short' });
 const year = currentDate.getFullYear();
 const hours = currentDate.getHours() % 12 || 12; 
 const minutes = String(currentDate.getMinutes()).padStart(2, '0');
 const seconds = String(currentDate.getSeconds()).padStart(2, '0');
 const ampm = currentDate.getHours() >= 12 ? 'PM' : 'AM';
 const formattedDateTime = `${day} ${month} ${year} ${hours}:${minutes}:${seconds} ${ampm}`;
 //
const UpdateQuery = () => {
    const params = useParams();
    const pageTitle = 'Update Query';
    const categoryLoad = useLoaderData();
    // console.log(params.id,category);
    const axiosSecure = useAxiosSecure();
    const {user,showToast} = useAuth();
    const [loader,setLoader] = useState(true);
    const [query,setQuery] = useState([]);
    const [ eCategoryId,seteCategoryId] = useState(1);
    const navigate = useNavigate();

    // To Stop Twice Call inside !hasRun.current 
    const hasRun = useRef(false); 
    useEffect(() => {
    
        if (!hasRun.current) {
            hasRun.current = true;
            axiosSecure.get(`/queryu/${params.id}?email=${user.email}`)
                .then((res) => {
                    setQuery(res.data);
                    seteCategoryId(res.data.categoryId);
                    if (user.email !== res.data.userEmail) {
                        showToast("You don't Have Permission", 'error');
                        navigate('/queries/myqueries');
                    }
                })
                .catch((error) => console.error(error));
    
            setTimeout(() => {
                setLoader(false);
            }, 2000);
        }
    }, []);
    // console.log(formattedDateTime);
    const handleUpdateQuery = (e)=>{
        e.preventDefault();
        const form = e.target;
        const queryTitle = form.queryTitle.value;
        const boycottReason = form.boycottReason.value;
        const productName = form.productName.value;
        const productBrand = form.productBrand.value;
        const image = form.image.value;
        const categoryId = parseInt(form.categoryId.value);
        const category = categoryLoad.find(c=>c.id==categoryId).name;
        const userEmail = form.userEmail.value;
        const userName = form.userName.value;
        const userPhoto = user.photoURL;
        const updatedAt = formattedDateTime;
        const newQuery = { queryTitle,boycottReason,productName,productBrand,image, categoryId, category,userEmail,userName,userPhoto,updatedAt};
        axiosSecure.patch(`/query/update/${query._id}?email=${user.email}`,newQuery)
        .then((res)=>{
          console.log(res.data);
            if(res.data.modifiedCount>0){
                Swal.fire({
                    title: 'Success!',
                    text: 'Successfully Updated Query!',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
            }
        })
        
    
        
    }
  return (
    <>
        <section className='w-11/12 mx-auto'>
            <Helmet>
                <title>{pageTitle} | {import.meta.env.VITE_NAME || 'ProRecommendation'}</title>
            </Helmet>
            <PageTop title={pageTitle}/>
            {
                loader ? (
                <Loading />
                ): (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-2 py-10'>
                <div className="col-span-1 md:col-span-2 py-2">
                <form onSubmit={handleUpdateQuery} className=''>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4 font-barlow">
                        <div className="grid gap-4">
                            <div className='singleCols'>
                              <p className='font-semibold py-2'>Product Name :</p>
                              <label className="input input-bordered flex items-center gap-2">
                              <input type="text" name='productName' className="grow" defaultValue={query.productName} required placeholder="Product Name" />
                              </label>
                            </div>
                            <div className='singleCols'>
                              <p className='font-semibold py-2'>Product Brand :</p>
                              <label className="input input-bordered flex items-center gap-2">
                              <input type="text" name='productBrand' className="grow" defaultValue={query.productBrand} required placeholder="Product Brand" />
                              </label>
                            </div>
                            <div className='singleCols'>
                              <p className='font-semibold py-2'>Product Image-URL : </p>
                              <label className="input input-bordered flex items-center gap-2">
                              <input type="text" name='image' className="grow" defaultValue={query.image} required placeholder="Product Image-URL" />
                              </label>
                            </div>
                        </div>
                        <div className="grid gap-4">
                          
                            <div className='singleCols'>
                              <p className='font-semibold py-2'>Select Category : </p>
                              <label className="input input-bordered flex items-center gap-2">
                              <select className="grow" required value={eCategoryId} onChange={(e)=>seteCategoryId(e.target.value)} name='categoryId'>
                                {categoryLoad.map((cat) => (
                                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                              </select>
                              </label>
                            </div>
                            <div className='singleCols'>
                              <p className='font-semibold py-2'>User : </p>
                              <label className="input input-bordered flex items-center gap-2">
                              <input type="text" name='userName' className="grow" required readOnly value={user.displayName} />
                              </label>
                            </div>
                            <div className='singleCols'>
                              <p className='font-semibold py-2'>User Email: </p>
                              <label className="input input-bordered flex items-center gap-2">
                              <input type="text" name='userEmail' className="grow" required readOnly value={user.email} />
                              </label>
                            </div>
                        </div>
                    </div>
                    <div className="grid py-3">
                      <div className='singleCols'>
                        <p className='font-semibold py-2'>Query Title :</p>
                        <label className="input input-bordered flex items-center gap-2">
                        <input type="text" name='queryTitle' className="grow" defaultValue={query.queryTitle} required placeholder="ex: Is there any Better product that gives me the same quality?" />
                        </label>
                      </div>
                      <div className='singleCols'>
                        <p className='font-semibold py-2'>Boycotting Reason Details :</p>
                        <label className="input input-bordered flex items-center gap-2">
                        <input type="text" name='boycottReason' className="grow" defaultValue={query.boycottReason} required placeholder="the reason you don’t want this product or simply write NO!" />
                        </label>
                      </div>
                    </div>
                    <button type="submit" className={cssA + whiteHover + ' w-full'}> Update Query </button>
                </form>
              </div>
            
            <div className='col-span-1 md:col-span-1 py-4'>
              <div className='px-3'>
                  <div className="shadow-lg bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-blue-500 mb-2 text-center">Intrstructions for Better Query</h3>
                    <p className="text-gray-500 text-justify py-2">The community is here to help you with your queries. Avoid asking opinion-based questions.</p>
                    {/* 1 */}
                    <div className="collapse collapse-arrow bg-base-200 my-2">
                      <input type="radio" name="my-accordion-2" defaultChecked />
                      <div className="collapse-title font-medium"> <span className='font-semibold text-blue-500'>1. </span> Summarize The Problem</div>
                      <div className="collapse-content">
                        <ul>
                          <li className='flex items-center gap-2'> <FaDotCircle/> Include details about your goal</li>
                          <li className='flex items-center gap-2'> <FaDotCircle/> Describe expected and actual results</li>
                          <li className='flex items-center gap-2'> <FaDotCircle/> Include any error messages</li>
                        </ul>
                      </div>
                    </div>
                    {/* 2 */}
                    <div className="collapse collapse-arrow bg-base-200 my-2">
                      <input type="radio" name="my-accordion-2" />
                      <div className="collapse-title font-medium"><span className='font-semibold text-blue-500'>2. </span> Describe what you’ve tried</div>
                      <div className="collapse-content">
                        <p>Show what you’ve tried and tell us what you found (on this site or elsewhere) and why it didn’t meet your needs. You can get better answers when you provide research.</p>
                      </div>
                    </div>
                    {/* 3 */}
                    <div className="collapse collapse-arrow bg-base-200 my-2">
                      <input type="radio" name="my-accordion-2" />
                      <div className="collapse-title font-medium"><span className='font-semibold text-blue-500'>3. </span> Show some example</div>
                      <div className="collapse-content">
                      <p>When appropriate, share the minimum amount of experience here.</p>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            </div>
            )}
            
        </section>
        <Community/>
        </>
  )
}

export default UpdateQuery