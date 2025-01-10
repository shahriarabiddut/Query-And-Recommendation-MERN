import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, NavLink } from "react-router-dom";
import Loading from "../components/Loading";
import QueryCard2 from "../components/QueryCard2";
import { cssA, whiteHover } from "../utility/utility";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { TbColumns1, TbColumns2, TbColumns3 } from "react-icons/tb";
import PageTop from "../components/PageTop";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Pagination from "../components/Pagination";
import LayoutSelector from "../components/LayoutSelector";

const Queries = () => {
  const pageTitle = "Queries";
  const axiosSecure = useAxiosSecure();
  const [loader, setLoader] = useState(true);
  const [queries, setQueries] = useState([]);
  const [columns, setColumns] = useState(0);
  const [samePage, setSamePage] = useState(0);
  const [searched, setSearched] = useState("");
  const oldGridClass = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-10 `;
  const gridClass = `grid gap-4 my-10 ${
    columns === 1
      ? "grid-cols-1"
      : columns === 2
      ? "grid-cols-2"
      : columns === 3
      ? "grid-cols-3"
      : columns === 4
      ? "grid-cols-4"
      : "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
  }`;
  const [searchText, setSearchText] = useState("");
  const filteredQueries = queries.filter((query) =>
    query.productName.toLowerCase().includes(searchText.toLowerCase())
  );
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [count, setCount] = useState(0);
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];
  //
  useEffect(() => {
    axiosSecure
      .get(`/queries?page=${currentPage}&size=${itemsPerPage}`)
      .then((res) => setQueries(res.data))
      .catch((error) => console.error(error));
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, [currentPage, itemsPerPage]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (samePage) {
      setLoader(true);
      let searchVal = e.target.productName.value;
      setSearched(searchVal);
      axiosSecure
        .get(`/querySearch?name=${searchVal}`)
        .then((res) => setQueries(res.data))
        .catch((error) => console.error(error));
      setTimeout(() => {
        setLoader(false);
      }, 3000);
    }
  };
  const handleSelectChange = (event) => {
    const value = parseInt(event.target.value);
    setSamePage(value);
  };
  //   Pagination Functions
  useEffect(() => {
    axiosSecure("/queriesCount").then((res) => setCount(res.data.count));
  }, []);
  //
  return (
    <section>
      <Helmet>
        <title>
          {pageTitle} | {import.meta.env.VITE_NAME || "ProRecommendation"}
        </title>
      </Helmet>
      <div className="w-11/12 mx-auto min-h-screen">
        <PageTop title={pageTitle} />
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-4">
          {/* <div className="flex justify-center items-center gap-2 flex-wrap">
            <p className="font-barlowtext-2xl"> Layout : </p>

            <button
              className="p-1 rounded-xl bg-blue-500 text-white flex gap-2 items-center"
              onClick={() => setColumns(1)}
            >
              <TbColumns1 className="text-xl" /> 1 Column
            </button>
            <button
              className="p-1 rounded-xl bg-blue-500 text-white flex gap-2 items-center"
              onClick={() => setColumns(2)}
            >
              <TbColumns2 className="text-xl" /> 2 Columns
            </button>
            <button
              className="p-1 rounded-xl bg-blue-500 text-white flex gap-2 items-center"
              onClick={() => setColumns(3)}
            >
              <TbColumns3 className="text-xl" /> 3 Columns
            </button>
            <button
              className="p-1 rounded-xl bg-blue-500 text-white flex gap-2 items-center"
              onClick={() => setColumns(4)}
            >
              <TbColumns3 className="text-xl" /> 4 Columns
            </button>
          </div> */}
          <LayoutSelector setColumns={setColumns} />
          <div className="my-4 flex justify-center md:justify-end gap-2">
            <select
              className="select select-bordered w-1/4"
              onChange={handleSelectChange}
              defaultValue=""
            >
              <option disabled>Select Page?</option>
              <option value="0">This Page</option>
              <option value="1">All Query</option>
            </select>
            <form onSubmit={handleSubmit} className="flex">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="w-3/4 grow"
                  placeholder="Search by Product Name..."
                  defaultValue={searchText}
                  name="productName"
                  onChange={(e) => {
                    if (samePage == 0) {
                      setSearchText(e.target.value);
                    }
                  }}
                />
                <button>
                  <FaSearch />
                </button>
              </label>
            </form>
          </div>
        </div>

        {searched != "" && (
          <div className="flex flex-wrap gap-3 md:justify-between items-center">
            <h1 className="p-3 bg-slate-100 rounded-sm">
              You have Searched <span className="font-bold ">{searched}</span>
            </h1>
            <Link
              to={"/queries"}
              className="p-2 rounded-xl bg-purple-500 text-white flex gap-2 items-center"
            >
              <FaArrowLeft /> All Queries
            </Link>
          </div>
        )}
        {loader ? (
          <Loading />
        ) : filteredQueries.length !== 0 ? (
          <>
            <div className={gridClass}>
              {filteredQueries.map((query) => (
                <QueryCard2
                  key={query._id}
                  query={query}
                  columns={columns}
                ></QueryCard2>
              ))}
            </div>
          </>
        ) : (
          <div className="grid justify-center my-10 gap-4">
            <p className="font-rancho text-5xl">No Data Found</p>
            <p className="text-center">Need Recomendations ? </p>
            <NavLink to={"/queries/addqueries"} className={cssA + whiteHover}>
              {" "}
              Add New Query
            </NavLink>
          </div>
        )}
        {/* Pagination */}
        {/* <div className='pagination py-2 flex justify-center items-center gap-2 my-8'>
                <button onClick={handlePrevPage} className='bg-blue-500 text-white border-blue-500 inline-flex p-2 rounded-md border items-center gap-2'> <FaArrowLeft/> Prev</button>
                {
                    pages.map(page => <button
                        className={`${currentPage === page ? 'bg-blue-500 text-white border-blue-500' : ''} p-2 rounded-md border `}
                        onClick={() => setCurrentPage(page)}
                        key={page}
                    >{page}</button>)
                }
                <button onClick={handleNextPage} className='bg-blue-500 text-white border-blue-500 inline-flex p-2 rounded-md border items-center gap-2'> Next <FaArrowRight/></button>
                <select className='px-4 py-2 rounded-md border ' value={itemsPerPage} onChange={handleItemsPerPage} id="itemsPerPage">
                    <option value="6">6</option>
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="60">60</option>
                </select>
            </div> */}
        {filteredQueries.length !== 0 && (
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

export default Queries;
