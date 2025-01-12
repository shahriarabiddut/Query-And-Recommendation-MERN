import React from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const QueryCard = ({ query, type }) => {
  const axiosSecure = useAxiosSecure();
  return (
    <section className="flex">
      <div className="card bg-base-100 border-2 border-blue-400 flex-1">
        <div className="card-body font-barlow">
          <h2 className="card-title text-2xl h-24">{query.queryTitle}</h2>
          <div className="space-y-2">
            <p>Posted On : {query.createdAt}</p>
            {query.recommendationCount === 0 ? (
              <p>No Recommendations</p>
            ) : (
              <p
                className={`${
                  type === "queriesByRecommendation" && "font-semibold"
                }`}
              >
                {" "}
                {query.recommendationCount} Recommendations
              </p>
            )}
            <p className={`${type === "queriesByView" && "font-semibold"}`}>
              {" "}
              {query.views} Views
            </p>
          </div>
          <div className="w-full">
            <NavLink to={`/queries/${query._id}`}>
              {" "}
              <button className=" bg-blue-600 rounded-xl cursor-pointer p-2 w-full text-xl text-white">
                View
              </button>{" "}
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QueryCard;
