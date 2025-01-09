import React, { useState } from "react";
import { LiaHomeSolid } from "react-icons/lia";
import { Link, NavLink } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { cssA, whiteHover } from "../utility/utility";
import Achievement from "./Achievement";
import QueryCardHome from "./QueryCardHome";
import Loading from "./Loading";

const HomeQuery = ({ category, queriesData, counts }) => {
  const hoverEffect =
    "bg-gray-200 p-1 rounded-lg hover:bg-blue-700 hover:text-white ";
  const activeEffect = "bg-blue-700 p-1 rounded-lg text-white bold ";
  const [queries, setQueries] = useState(queriesData);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  // console.log(category);
  // console.log(queriesData);
  const handleCategoryBtn = (id) => {
    setLoading(true);
    if (id == 0) {
      axiosSecure.get(`/queries?page=0&size=6`).then((res) => {
        setQueries(res.data);
        setLoading(false);
      });
    } else {
      axiosSecure.get(`/querySameCategory/${id}`).then((res) => {
        setQueries(res.data);
        setLoading(false);
      });
    }
    setSelectedCategory(id);
  };
  return (
    <section>
      <div className="grid grid-cols-3 md:grid-cols-12 w-11/12 mx-auto relative">
        <div className="col-span-3 flex md:sticky lg:sticky top-20 self-start">
          <div className="flex flex-row md:flex-col lg:flex-col gap-2 p-6 w-11/12 mx-auto my-3 bg-white rounded-2xl flex-wrap">
            <button
              className={
                (selectedCategory == 0 ? activeEffect : hoverEffect) +
                " flex items-center justify-center gap-2"
              }
              onClick={() => {
                handleCategoryBtn(0);
              }}
            >
              <LiaHomeSolid /> Home
            </button>
            {category.map((cat) => (
              <button
                onClick={() => {
                  handleCategoryBtn(cat.id);
                }}
                className={
                  (selectedCategory == cat.id ? activeEffect : hoverEffect) +
                  " flex items-center justify-center gap-2"
                }
                key={cat.id}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-3 md:col-span-6 py-4">
          {loading ? (
            <Loading />
          ) : queries.length === 0 ? (
            <div className="grid justify-center my-10 gap-4">
              <p className="font-rancho text-5xl">
                No Data Found in this Category
              </p>
              <p className="text-center">Need Recomendations ? </p>
              <NavLink to={"/queries/addqueries"} className={cssA + whiteHover}>
                Add New Query
              </NavLink>
            </div>
          ) : (
            queries
              .slice(0, 6)
              .map((query) => (
                <QueryCardHome key={query._id} query={query}></QueryCardHome>
              ))
          )}
          <Link to={`/queries/all`}>
            <button className=" bg-blue-600 rounded-xl cursor-pointer p-2 w-full text-xl text-white my-3">
              All Queries
            </button>
          </Link>
        </div>
        <div className="col-span-3">
          <Achievement counts={counts} />
        </div>
      </div>
    </section>
  );
};

export default HomeQuery;
