import React from "react";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";
import IconArrowUp from "../../assets/icon-arrow-up.svg";
import IconRocket from "../../assets/icon-rocket.svg";
import IconLock from "../../assets/icon-lock.svg";
import IconTrash from "../../assets/icon-trash.svg";

function CatalogNavBar({ catalogFilter, setRange, setDataStart, history }) {
  return (
    <div className="catalog-nav-bar__wrapper">
      <div
        className={
          catalogFilter === "priorities"
            ? "catalog-nav-bar__link--highlight"
            : "catalog-nav-bar__link--lowlight"
        }
        onClick={() => {
          setRange({ start: 0, end: 10 });
          setDataStart(0);
          ReactGA.event({
            category: "Catalog",
            action: "User chose a filter",
            label: "priorities"
          });
          history.push("/catalog/priorities");
        }}
      >
        <img className="catalog__icon" src={IconArrowUp} alt="icon"></img>
        <span className="catalog-filter-label">PRIORITIES</span>
      </div>

      <div
        className={
          catalogFilter === "latest"
            ? "catalog-nav-bar__link--highlight"
            : "catalog-nav-bar__link--lowlight"
        }
        onClick={() => {
          setRange({ start: 0, end: 10 });
          setDataStart(0);
          ReactGA.event({
            category: "Catalog",
            action: "User chose a filter",
            label: "latest"
          });
          history.push("/catalog/latest");
        }}
      >
        <img className="catalog__icon" src={IconRocket} alt="icon"></img>
        <span className="catalog-filter-label">LAUNCHES</span>
      </div>

      <div
        className={
          catalogFilter === "undisclosed"
            ? "catalog-nav-bar__link--highlight"
            : "catalog-nav-bar__link--lowlight"
        }
        onClick={() => {
          setRange({ start: 0, end: 10 });
          setDataStart(0);
          ReactGA.event({
            category: "Catalog",
            action: "User chose a filter",
            label: "undisclosed"
          });
          history.push("/catalog/undisclosed");
        }}
      >
        <img className="catalog__icon" src={IconLock} alt="icon"></img>
        <span className="catalog-filter-label">UNDISCLOSED</span>
      </div>

      <div
        className={
          catalogFilter === "debris"
            ? "catalog-nav-bar__link--highlight"
            : "catalog-nav-bar__link--lowlight"
        }
        onClick={() => {
          setRange({ start: 0, end: 10 });
          setDataStart(0);
          ReactGA.event({
            category: "Catalog",
            action: "User chose a filter",
            label: "debris"
          });
          history.push("/catalog/debris");
        }}
      >
        <img className="catalog__icon" src={IconTrash} alt="icon"></img>
        <span className="catalog-filter-label">DEBRIS</span>
      </div>

      <div
        className={
          catalogFilter === "all"
            ? "catalog-nav-bar__link--highlight"
            : "catalog-nav-bar__link--lowlight"
        }
        onClick={() => {
          setRange({ start: 0, end: 10 });
          setDataStart(0);
          ReactGA.event({
            category: "Catalog",
            action: "User chose a filter",
            label: "all"
          });
          history.push("/catalog/all");
        }}
      >
        <span className="catalog-filter-label">ALL</span>
      </div>
    </div>
  );
}

export default withRouter(CatalogNavBar);
