import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Banner = ({ className, screenTitleClassName, text = "Home" }) => {
  return (
    <div className={`navigation-header ${className}`}>
      <div className="main-wrapper">
        <div className="main">
          <div className={`screen-title ${screenTitleClassName}`}>{text}</div>
          <div className="notification">
            <div className="group-wrapper">
              <img
                className="group-2"
                alt="Group"
                src="https://anima-uploads.s3.amazonaws.com/projects/64d9fa6d02fb4419cf588807/releases/64d9fcfad59d4c01448dd49a/img/group@2x.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

NavigationHeader.propTypes = {
  text: PropTypes.string,
};