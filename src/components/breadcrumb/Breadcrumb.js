import React from "react";
import { Breadcrumb as AntBreadcrumb } from "antd"; // Ant Design의 Breadcrumb을 AntBreadcrumb로 임포트
import { useLocation, Link } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter(i => i);

  const breadcrumbItems = pathSnippets.map((_, index, arr) => {
    const url = `/${arr.slice(0, index + 1).join("/")}`;
    const isLast = index === arr.length - 1;
    return isLast ? (
      <AntBreadcrumb.Item key={url}>{_}</AntBreadcrumb.Item>
    ) : (
      <AntBreadcrumb.Item key={url}>
        <Link to={url}>{_}</Link>
      </AntBreadcrumb.Item>
    );
  });

  return <AntBreadcrumb>{breadcrumbItems}</AntBreadcrumb>;
};

export default Breadcrumb;
