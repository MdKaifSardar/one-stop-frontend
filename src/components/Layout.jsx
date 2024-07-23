import React from "react";
import { Helmet } from "react-helmet";

const Layout = ({children, description, title, keywords, author}) => {
  return (
    <div>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author}></meta>
        <title>{title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {children}
    </div>
  );
};

Layout.defaultProps = {
  title: "OneStop",
  description: 'this is description',
  author: "teamName",
  keywords: "MERN stack website, HTML, CSS, js",
}

export default Layout;
