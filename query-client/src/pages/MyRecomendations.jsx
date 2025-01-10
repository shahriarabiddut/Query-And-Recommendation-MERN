import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import PageTop from "../components/PageTop";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Pagination from "../components/Pagination";

const MyRecomendations = () => {
  const pageTitle = "My Recommendations";
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loader, setLoader] = useState(true);
  const [queryId, setqueryId] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [count, setCount] = useState(0);
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];
  //
  useEffect(() => {
    axiosSecure
      .get(
        `/recommendations?email=${user.email}&page=${currentPage}&size=${itemsPerPage}`
      )
      .then((res) => {
        setRecommendations(res.data);
      })
      .catch((error) => console.error(error));
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, [currentPage, itemsPerPage]);
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/recommendation/${_id}?email=${user.email}`)
          .then((res) => {
            // console.log(data)
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your data has been deleted.",
                icon: "success",
              });
              const remainingRecommendation = recommendations.filter(
                (eq) => eq._id != _id
              );
              setRecommendations(remainingRecommendation);
              axiosSecure
                .patch(`/recommendation/querycountrem/${queryId}`)
                .then((res) => {
                  console.log(res.data);
                });
            } else {
              Swal.fire({
                title: "Error!",
                text: "There was something Wrong.",
                icon: "error",
              });
            }
          });
      }
    });
  };
  //  Pagination Functions
  useEffect(() => {
    axiosSecure(`/myRecommendationsCount?email=${user.email}`).then((res) =>
      setCount(res.data.count)
    );
  }, []);
  //
  return (
    <section className="w-11/12 mx-auto min-h-screen">
      <Helmet>
        <title>
          {pageTitle} | {import.meta.env.VITE_NAME || "ProRecommendation"}
        </title>
      </Helmet>
      <PageTop title={pageTitle} />
      <div className="w-11/12 mx-auto">
        {loader ? (
          <Loading />
        ) : recommendations.length !== 0 ? (
          <>
            <div>
              <div className="overflow-x-auto my-10">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Recommended Product</th>
                      <th>Query Product</th>
                      <th>Time</th>
                      <th>Query</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recommendations.map((recommendation) => (
                      <tr key={recommendation._id}>
                        <th>{recommendation.recommendationTitle}</th>
                        <th>{recommendation.recommenderProductName}</th>
                        <th>{recommendation.productName}</th>
                        <td>{recommendation.createdAt.toLocaleString()}</td>
                        <th>
                          <Link
                            to={`/queries/${recommendation.queryId}`}
                            className="font-bold text-blue-600"
                          >
                            {recommendation.queryTitle}
                          </Link>
                        </th>
                        <td>
                          <button
                            className="inline-flex btn btn-error text-white text-xs"
                            onClick={() => {
                              handleDelete(recommendation._id);
                              setqueryId(recommendation.queryId);
                            }}
                          >
                            {" "}
                            <FaTrash /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="grid justify-center my-10 gap-4">
            <p className="font-rancho text-5xl">No Data Found</p>
          </div>
        )}
        {/* Pagination */}
        {recommendations.length !== 0 && (
          <Pagination
            setItemsPerPage={setItemsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pages={pages}
            itemsPerPage={itemsPerPage}
          />
        )}
        {/* Ends */}
      </div>
    </section>
  );
};

export default MyRecomendations;
