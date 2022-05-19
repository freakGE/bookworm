import React from "react";
import Helmet from "react-helmet";

// import Thumbnail from "../images/Thumbnail.png";

export default function MetaTags() {
  return (
    <Helmet>
      <title>bookWorm</title>
      <meta name="description" content="Top Books" />
      <meta property="og:type" content="website" />
      {/* <meta property="og:url" content="https://freakge.github.io/weather" /> */}
      {/* <meta property="og:image" content={Thumbnail} /> */}
      <meta name="keywords" content="Book, Book APP, BookWorm APP" />

      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Trocchi&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
}
