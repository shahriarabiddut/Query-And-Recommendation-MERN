import React from "react";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const QueryCardHome = ({ query }) => {
  return (
    <section>
      <div className=" p-5 rounded-xl border-2 border-gray-200 flex items-start gap-4 my-1">
        <img
          src={query.image}
          alt={query.productName}
          className="w-32 h-32 object-fit"
        />
        <div className="flex-1">
          <NavLink
            to={`/queries/${query._id}`}
            className="font-semibold text-xl font-barlow text-blue-600"
          >
            {query.queryTitle}
          </NavLink>
          <p className="text-sm text-gray-600 my-1">
            <span className="font-bold">Product:</span> {query.productName}
          </p>
          <p className="text-sm text-gray-600 my-1">
            <span className="font-bold">Reason:</span> {query.boycottReason}
          </p>
          <p className="text-sm text-gray-600 my-1">
            {query.recommendationCount === 0 ? (
              <span className="font-bold">No Recommendations</span>
            ) : (
              <>
                <span className="font-bold">Recommendations </span> :
                {query.recommendationCount}
              </>
            )}
          </p>
          <p className="flex gap-2 text-xs text-gray-500 mt-2">
            <span>Posted on: {new Date(query.createdAt).toLocaleString()}</span>
            <span className="font-semibold inline-flex items-center gap-1">
              <FaUser className="text-cyan-500" /> {query.userName}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default QueryCardHome;
