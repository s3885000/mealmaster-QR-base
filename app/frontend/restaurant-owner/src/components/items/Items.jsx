import PropTypes from "prop-types";
import React from "react";
// import { FileMobile } from "../FileMobile";
import "./items.css";

const MenuItemsCard = ({ className, hasTableCardSelected = true }) => {
  return (
    <div className={`menu-items-card ${className}`}>
      {hasTableCardSelected && (
        <div className="table-card-selected">
          <div className="overlap-2">
            <div className="div-2">
              <div className="overlap-3">
                {/* <div className="div-2">
                  <FileMobile
                    className="file-04-mobile"
                    contentClassName="file-04-mobile-instance"
                    hasName={false}
                    hasUploading={false}
                    overlapClassName="file-mobile-instance"
                    visible={false}
                  />
                </div> */}
                <div className="rectangle-2" />
                <div className="text-wrapper">Spacy fresh crab</div>
                <div className="price">35,000 đ</div>
                <img
                  className="icon-options"
                  alt="Icon options"
                  src="https://anima-uploads.s3.amazonaws.com/projects/64d9fa6d02fb4419cf588807/releases/64d9fcfad59d4c01448dd49a/img/icon-options-15.svg"
                />
              </div>
            </div>
            <div className="group">
              <div className="overlap-group-wrapper">
                <div className="overlap-group-2">
                  <div className="copy">🍖</div>
                  <div className="text-wrapper-2">🍤</div>
                </div>
              </div>
            </div>
            <img
              className="img"
              alt="Shape"
              src="https://anima-uploads.s3.amazonaws.com/projects/64d9fa6d02fb4419cf588807/releases/64d9fcfad59d4c01448dd49a/img/shape-4.svg"
            />
            <img
              className="vector"
              alt="Vector"
              src="https://anima-uploads.s3.amazonaws.com/projects/64d9fa6d02fb4419cf588807/releases/64d9fcfad59d4c01448dd49a/img/vector-3.svg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

MenuItemsCard.propTypes = {
  hasTableCardSelected: PropTypes.bool,
};

export default MenuItemsCard