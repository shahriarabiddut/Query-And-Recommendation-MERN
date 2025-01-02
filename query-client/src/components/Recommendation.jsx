import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { cssA, whiteHover } from '../utility/utility';
import Swal from 'sweetalert2';

const Recommendation = ({user,query,setRecommendations,recommendations}) => {
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
    const axiosSecure = useAxiosSecure()
    const handleAddQuery = (e)=>{
        e.preventDefault();
        const form = e.target;
        const recommendationTitle = form.recommendationTitle.value;
        const recommenderProductName = form.productName.value;
        const image = form.image.value;
        const recommendationReason = form.recommendationReason.value;
        const queryId = query._id;
        const queryTitle  = query.queryTitle;
        const productName  = query.productName;
        const userEmail = query.userEmail ;
        const userName = query.userName ;
        const recommenderEmail = form.recommenderEmail.value;
        const recommenderName = form.recommenderName.value;
        const createdAt = formattedDateTime;
        const vote = 0;
        const recommendationCount = query.recommendationCount + 1;

        const newQuery = { recommendationTitle,recommendationReason,recommenderProductName,image,recommenderEmail,recommenderName,queryId,queryTitle,productName,userName,userEmail,vote,createdAt};
        axiosSecure.post(`/recommendation`,newQuery)
        .then((res)=>{
          console.log(res.data);
            if(res.data.insertedId){
                Swal.fire({
                    title: 'Success!',
                    text: 'Successfully Added A REcommendation!',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
                  setRecommendations([...recommendations,newQuery])
                  const secondQuery = {recommendationCount};
                  axiosSecure.patch(`/recommendation/query/${queryId}`,secondQuery)
                  .then((res)=>{
                    console.log(res.data);
                    })
            }
            form.reset();
        })
        
    
        
    }
  return (
    <div>
        <form onSubmit={handleAddQuery} className=''>
        <div className="grid py-3">
                <div className='singleCols'>
                <p className='font-semibold py-2'>Recommendation  Title :</p>
                <label className="input input-bordered flex items-center gap-2">
                <input type="text" name='recommendationTitle' className="grow" required placeholder="ex: I found it great" />
                </label>
                </div>
                <div className='singleCols'>
                <p className='font-semibold py-2'>Recommendation Reason :</p>
                <label className="input input-bordered flex items-center gap-2">
                <input type="text" name='recommendationReason' className="grow" required placeholder="the reason you want to Recommend this product !" />
                </label>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4 font-barlow">
            
                <div className="grid gap-4">
                    <div className='singleCols'>
                        <p className='font-semibold py-2'>Product Name : (if different then change)</p>
                        <label className="input input-bordered flex items-center gap-2">
                        <input type="text" name='productName' className="grow" defaultValue={query.productName} required placeholder="Product Name" />
                        </label>
                    </div>
                    <div className='singleCols'>
                        <p className='font-semibold py-2'>Product Image-URL : (if different then change)</p>
                        <label className="input input-bordered flex items-center gap-2">
                        <input type="text" name='image' className="grow" defaultValue={query.image} required placeholder="Product Image-URL" />
                        </label>
                    </div>
                </div>
                <div className="grid gap-4">

                    <div className='singleCols'>
                        <p className='font-semibold py-2'>Recommender User : </p>
                        <label className="input input-bordered flex items-center gap-2">
                        <input type="text" name='recommenderName' className="grow" required readOnly value={user?.displayName} />
                        </label>
                    </div>
                    <div className='singleCols'>
                        <p className='font-semibold py-2'>Recommender Email: </p>
                        <label className="input input-bordered flex items-center gap-2">
                        <input type="text" name='recommenderEmail' className="grow" required readOnly value={user?.email} />
                        </label>
                    </div>
                </div>
            </div>
            
            <button type="submit" className={cssA + whiteHover + ' w-full'}> Add Recommendation </button>
        </form>
    </div>
  )
}

export default Recommendation