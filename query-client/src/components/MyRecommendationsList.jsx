import React from 'react';
import { Link } from 'react-router-dom';

const MyRecommendationsList = ({ recommendation,recommendations,setRecommendations }) => {
    return (
        <section>
                <div className="recommendation-item p-4 border-2 rounded-xl border-gray-200 flex items-start gap-4">
                    <img 
                        src={recommendation.image} 
                        alt={recommendation.recommenderProductName} 
                        className="w-40 h-40 object-fit" 
                    />
                    <div className="flex-1">
                        <h3 className="font-semibold text-xl font-barlow">{recommendation.recommendationTitle}</h3>
                        <p className="text-sm text-gray-600 my-1">
                            <span className="font-bold">Product:</span> {recommendation.recommenderProductName}
                        </p>
                        <p className="text-sm text-gray-600 my-1">
                            <span className="font-bold">Reason:</span> {recommendation.recommendationReason}
                        </p>
                        <p className="text-sm text-gray-600 my-1">
                            <span className="font-bold">By:</span> {recommendation.recommenderName}
                        </p>
                        <p className="text-sm text-gray-600 my-1">
                            <span className="font-bold">Query Product:</span> {recommendation.productName}
                        </p>
                        <p className="text-sm text-gray-600 my-1">
                        <span className="font-semibold ">Recommended on :</span> <Link to={`/queries/${recommendation.queryId}`} className="font-bold text-blue-600">{recommendation.queryTitle}</Link>
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            Posted : {new Date(recommendation.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>
                
        </section>
    );
};

export default MyRecommendationsList;
