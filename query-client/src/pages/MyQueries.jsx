import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, NavLink } from "react-router-dom";
import Loading from "../components/Loading";
import PageTop2 from "../components/PageTop2";
import Pagination from "../components/Pagination";
import QueryCard from "../components/QueryCard";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { cssA, whiteHover } from "../utility/utility";
import { FaPen, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const MyQueries = () => {
  const pageTitle = "My Queries";
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loader, setLoader] = useState(true);
  const [queries, setQueries] = useState([]);
  const [format, setFormat] = useState(0);
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
        `/query?email=${user.email}&page=${currentPage}&size=${itemsPerPage}`
      )
      .then((res) => setQueries(res.data))
      .catch((error) => console.error(error));
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, [currentPage, itemsPerPage]);
  //  Pagination Functions
  useEffect(() => {
    axiosSecure(`/myQueriesCount?email=${user.email}`).then((res) =>
      setCount(res.data.count)
    );
  }, []);
  // Delete
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
        axiosSecure.delete(`/query/${_id}?email=${user.email}`).then((res) => {
          // console.log(data)
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your data has been deleted.",
              icon: "success",
            });
            const remainingQueries = queries.filter((eq) => eq._id != _id);
            setQueries(remainingQueries);
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
  //
  return (
    <section>
      <Helmet>
        <title>
          {pageTitle} | {import.meta.env.VITE_NAME || "ProRecommendation"}
        </title>
      </Helmet>
      <PageTop2 title={pageTitle} />
      <div className="w-11/12 mx-auto min-h-screen">
        <select
          className="select select-bordered "
          onChange={(event) => {
            setFormat(parseInt(event.target.value, 10));
          }}
        >
          <option disabled defaultValue={"Table"}>
            Choose Format
          </option>
          <option value="0">Table Format</option>
          <option value="1">Card Format</option>
        </select>
        {loader ? (
          <Loading />
        ) : queries.length === 0 ? (
          <div className="grid justify-center my-10 gap-4">
            <p className="font-rancho text-5xl">No Data Found</p>
            <p className="text-center">Need Recomendations ? </p>
            <NavLink to={"/queries/addqueries"} className={cssA + whiteHover}>
              {" "}
              Add New Query
            </NavLink>
          </div>
        ) : format == 0 ? (
          <div className="overflow-x-auto my-4 bg-orange-50">
            <table className="table table-zebra font-barlow text-xl">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Product</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {queries.map((query) => (
                  <tr key={query._id}>
                    <td>
                      <Link
                        to={`/queries/${query._id}`}
                        className="text-blue-500 hover:text-cyan-500 font-semibold"
                      >
                        {" "}
                        {query.queryTitle}{" "}
                      </Link>
                    </td>
                    <td>{query.productName}</td>
                    <td>{query.createdAt}</td>
                    {/* <td className="flex items-center gap-2 flex-wrap">
                      <Link to={`/equipments/update/${equipment._id}`}>
                        <button className={cssB + whiteHover}>
                          <FaPen /> Update
                        </button>
                      </Link>
                      <Link to={`/equipments/${equipment._id}`}>
                        <button className={cssB + whiteHover}>
                          <FaEye /> View
                        </button>
                      </Link>
                      <button
                        className={cssA + whiteHover}
                        onClick={() => {
                          handleDeleteHere(equipment._id);
                        }}
                      >
                        <FaTrash></FaTrash> Delete
                      </button>
                    </td> */}
                    <td>
                      <Link to={`/queries/update/${query._id}`}>
                        {" "}
                        <button className="inline-flex m-1 btn btn-info text-xl text-white">
                          <FaPen /> Update
                        </button>{" "}
                      </Link>
                      <button
                        className="inline-flex m-1 btn btn-error text-white text-xl"
                        onClick={() => {
                          handleDelete(query._id);
                        }}
                      >
                        {" "}
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* Pagination */}
              {/* {queries.length !== 0 && (
                <tfoot>
                  <tr>
                    <td colSpan={"4"}>
                      <Pagination
                        setItemsPerPage={setItemsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        pages={pages}
                        itemsPerPage={itemsPerPage}
                      />
                    </td>
                  </tr>
                </tfoot>
              )} */}
            </table>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-10 ">
              {queries.map((query) => (
                <QueryCard
                  key={query._id}
                  query={query}
                  handleDelete={handleDelete}
                ></QueryCard>
              ))}
            </div>
          </>
        )}
        {/* Pagination */}
        {queries.length !== 0 && (
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

export default MyQueries;
