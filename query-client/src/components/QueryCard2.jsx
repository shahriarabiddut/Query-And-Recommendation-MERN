import React from "react";
import { Link, NavLink } from "react-router-dom";

const QueryCard = ({ query, columns }) => {
  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
            src={query.image}
            alt="Shoes"
            className={`p-2 ${
              columns === 1
                ? "h-80 w-80"
                : columns === 2
                ? "h-72 w-72 "
                : columns === 3
                ? "h-64 w-64 "
                : "h-72 w-72 "
            }`}
          />
        </figure>
        <div className="card-body font-barlow">
          <Link to={`/queries/${query._id}`}>
            <h2
              className={`card-title text-2xl  hover:text-blue-400 text-cyan-600 ${
                columns === 3 ? "h-24" : columns === 4 ? "h-28" : ""
              }`}
              title="Click to See Details"
            >
              {query.queryTitle}
            </h2>
          </Link>
          <div className="space-y-2 ">
            <p>Posted On : {query.createdAt}</p>
            {query.recommendationCount === 0 ? (
              <p>No Recommendations</p>
            ) : (
              <p className="font-semibold">
                {query.recommendationCount} Recommendations{" "}
              </p>
            )}
            <p>{query.views} Views </p>
          </div>
          <div className="flex ">
            <NavLink
              to={`/queries/${query._id}`}
              className="flex items-center rounded-lg bg-blue-400 hover:bg-white hover:text-blue-500 p-3 text-xl text-white w-full justify-center gap-4 font-semibold "
            >
              {" "}
              Recommend
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default QueryCard;
