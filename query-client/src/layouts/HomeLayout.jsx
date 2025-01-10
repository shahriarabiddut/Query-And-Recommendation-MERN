import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Community from "../components/Community";
import Hero from "../components/Hero";
import HomeQuery from "../components/HomeQuery";
import { useLoaderData } from "react-router-dom";
import MostViewed from "../components/MostViewed";
import GetInTouch from "../components/GetInTouch";

const HomeLayout = () => {
  const { category, queries, counts } = useLoaderData();
  const urlHome = "https://query-server-ph.vercel.app";
  return (
    <HelmetProvider>
      <Helmet>
        <title>Home | {import.meta.env.VITE_NAME || "ProRecommendation"}</title>
      </Helmet>
      <header className="sticky top-0 z-[999]">
        <Header />
      </header>
      <main>
        <Hero />
        <HomeQuery
          category={category}
          queriesData={queries}
          urlHome={urlHome}
          counts={counts}
        />
        <MostViewed title={"Most Viewed Queries"} type={"queriesByView"} />
        <Community />
        <MostViewed
          title={"Most Recommended Queries"}
          type={"queriesByRecommendation"}
        />
        <GetInTouch />
      </main>
      <Footer />
    </HelmetProvider>
  );
};

export default HomeLayout;
