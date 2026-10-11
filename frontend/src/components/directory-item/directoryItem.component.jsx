import React from "react";
import "./directoryItem.styles.scss";
import { Link } from "react-router-dom";

function DirectoryItem(props) {
  const { title, imageUrl, linkUrl } = props.item;
  // console.log(props);

  return (
    <Link
      className={`directory-item${props.item.size ? " directory-item--large" : ""}`}
      to={`/${linkUrl}`}
    >
      <div
        className="directory-item--image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="directory-item--title">
        {title}
      </div>
    </Link>
  );
}

export default DirectoryItem;
