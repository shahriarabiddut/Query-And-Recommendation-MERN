import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import axios from "axios";

const RecommendationsList = ({ recommendation }) => {
  const axiosPublic = useAxiosPublic();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    const recommenderPhoto = axiosPublic
      .get(`/recommenderUser?email=${recommendation.recommenderEmail}`)
      .then((res) => setPhoto(res.data.photo));
  }, []);
  return (
    <section>
      <div className="recommendation-item p-4 border-b border-gray-200 flex items-start gap-4 flex-col md:flex-row">
        <img
          src={recommendation.image}
          alt={recommendation.recommenderProductName}
          className="w-40 h-40 object-fit"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-xl font-barlow">
            {recommendation.recommendationTitle}
          </h3>
          <p className="text-sm text-gray-600 my-1">
            <span className="font-bold">Product:</span>{" "}
            {recommendation.recommenderProductName}
          </p>
          <p className="text-sm text-gray-600 my-1">
            <span className="font-bold">Reason:</span>{" "}
            {recommendation.recommendationReason}
          </p>

          <p className="text-xs text-gray-500 mt-2">
            Recommended on:{" "}
            {new Date(recommendation.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex-end py-4">
          <img
            src={photo}
            className="w-20 rounded-full"
            alt="Create API and Fetch User Image"
          />
          <p className="text-sm text-gray-600 my-1 flex gap-2 items-center">
            <FaUser />{" "}
            <span className="font-bold">{recommendation.recommenderName}</span>
          </p>
          <p className="text-center">Answered</p>
        </div>
      </div>
    </section>
  );
};

export default RecommendationsList;
