import React from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const QueryCard = ({ query, handleDelete }) => {
  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img src={query.image} alt="Shoes" className="h-36" />
        </figure>
        <div className="card-body font-barlow">
          <h2 className="card-title text-2xl">{query.queryTitle}</h2>
          <div className="space-y-2">
            <p>Posted On : {query.createdAt}</p>
            {query.recommendationCount === 0 ? (
              <p>No Recommendations</p>
            ) : (
              <p>Recommendations : {query.recommendationCount}</p>
            )}
            <p>Views : {query.views}</p>
          </div>
          <div className="flex justify-between">
            <NavLink to={`/queries/${query._id}`}>
              {" "}
              <button className="inline-flex btn btn-primary text-xl text-white">
                <FaEye /> View
              </button>{" "}
            </NavLink>
            <NavLink to={`/queries/update/${query._id}`}>
              {" "}
              <button className="inline-flex btn btn-info text-xl text-white">
                <FaPen /> Update
              </button>{" "}
            </NavLink>
            <button
              className="inline-flex btn btn-error text-white text-xl"
              onClick={() => {
                handleDelete(query._id);
              }}
            >
              {" "}
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QueryCard;
