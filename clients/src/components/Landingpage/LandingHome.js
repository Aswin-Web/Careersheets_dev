import React, { useEffect } from "react";
// import Review from "./Review";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ReactGA from "react-ga";

const Home = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);
  return (
    <div>
      <Header />
      <Main/>
      {/* <Review/> */}
      <Footer/>
    </div>
  );
};

export default Home;
