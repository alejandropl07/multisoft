"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { ZipCodeData } from "@/src/types/zipCodes";
import { toast } from "react-toastify";
import config from "@/config";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
// import { UserContext, useUser } from '@/context/UserContext';
import {
  getZipCodeAvailability,
  saveSessionToFirestore,
  searchSingleZipCode,
  stripeNewCheckout,
} from "@/src/firebase/firebase";
import { useAppSelector } from "@/src/redux/hooks";

mapboxgl.accessToken = config.mapbox.accessToken;

type LeadType = "Seller" | "Buyer" | "Both";

export default function Pricing() {
  // const { user } = useUser();
  const { user } = useAppSelector((state) => state.auth);

  const minBudget = config.testMode ? 1 : config.pricing.minimumPrice;
  const zoom = 10;

  const mapContainer = useRef(null);
  const map: any = useRef(null);
  const [zipCode, setZipCode] = useState("");
  const [leadType, setLeadType] = useState<LeadType | null>("Both");
  const [budget, setBudget] = useState<number>(minBudget);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [zipData, setZipData] = useState<ZipCodeData | any>(null);
  const [leadsEstimate, setLeadsEstimate] = useState<number>(0);
  const [isYearly, setIsYearly] = useState(false);
  const [marketShare, setMarketShare] = useState(0);
  const [touchedHandle, setTouchedHandle] = useState(false);

  const [signInButton, setSignInButton] = useState<null | string>(null);

  const budgetIncrement = config.testMode
    ? 50
    : config.pricing.pricingIncrementMonthly;
  const maxSliderRange =
    leadType === "Buyer"
      ? (zipData?.buyer_max_budget * zipData?.buyer_share) / 100
      : (zipData?.seller_max_budget * zipData?.seller_share) / 100;

  const initializeMap = async () => {
    if (map.current) return; // initialize map only once
    if (!mapContainer.current) return; // ensure map container has been created

    let lng = -70.9;
    let lat = 42.35;

    //check if lat lng is saved in local storage
    const savedLng = localStorage.getItem("lng");
    const savedLat = localStorage.getItem("lat");
    if (savedLng && savedLat) {
      lng = parseFloat(savedLng);
      lat = parseFloat(savedLat);
    }

    // if not lat lng saved in local storage, or geolocation is disabled, get user's location based on IP address
    if (!savedLng && !savedLat) {
      try {
        const response = await fetch("/api/ipstack");
        const data = await response.json();

        if (data?.longitude && data?.latitude) {
          lng = data?.longitude;
          lat = data?.latitude;
        }
      } catch (error) {
        console.log("Could not get user location", error);
      }
    }

    if (!lng || !lat) {
      lng = -70.9;
      lat = 42.35;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: config.mapbox.style,
      center: [lng, lat],
      zoom: zoom,
    });

    // Add the geocoder to the map and add 50px margin to the right
    map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        countries: "us",
        placeholder: "Search by Zip Code",
        marker: false,
        types: "postcode,locality",
      })
    );

    // Add zoom and rotation controls to the map.
    map.current.addControl(new mapboxgl.NavigationControl());
    // Add geolocate control to the map.
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    map.current.on("load", function () {
      map.current.resize();

      map.current.addSource("zipcodes", {
        type: "vector",
        url: "mapbox://certileads.af0p4v2s",
      });

      //Mapbox Add Layers 'Blue'
      map.current.addLayer({
        id: "zipcodes",
        type: "fill",
        source: "zipcodes",
        "source-layer": "cb_2018_us_zcta510_500k-8it2u9",
        paint: {
          "fill-outline-color": "#1182bb",
          "fill-color": "#8cd2de",
          "fill-opacity": 0.1,
        },
      });
      // Mapbox Add Highlighted Layer
      map.current.addLayer({
        id: "zipcode-highlighted",
        type: "fill",
        source: "zipcodes",
        "source-layer": "cb_2018_us_zcta510_500k-8it2u9",
        paint: {
          "fill-outline-color": "#286bce", //#286bce
          "fill-color": "#286bce",
          "fill-opacity": 0.5,
        },
        filter: ["in", "ZCTA5CE10", ""],
      });

      map.current.on("click", function (e: any) {
        const bbox = [
          [e.point.x - 0, e.point.y - 0],
          [e.point.x + 0, e.point.y + 0],
        ];
        const features = map.current.queryRenderedFeatures(bbox, {
          layers: ["zipcodes"],
        });

        const filter = features.reduce(
          function (memo: any, feature: any) {
            memo.push(feature.properties.ZCTA5CE10);
            return memo;
          },
          ["in", "ZCTA5CE10"]
        );
        map.current.setFilter("zipcode-highlighted", filter);
      });
      map.current.on("click", "zip-fill", function (e: any) {
        const zip_code = e.features[0].properties.ZCTA5CE10;

        //save lat lng to local storage
        localStorage.setItem("lng", e.lngLat.lng.toString());
        localStorage.setItem("lat", e.lngLat.lat.toString());

        setZipCode(zip_code);
      });
    });
  };

  // Initialize map when component mounts
  useEffect(() => {
    initializeMap();
  }, []);

  const handleMapClick = async (zipCode: string) => {
    await searchSingleZipCode(zipCode)
      .then(async (data: any) => {
        handleSwitch(data);

        //get availability
        const takenMarketshare = await getZipCodeAvailability({ zipCode })
          .then((response: any) => {
            return response.data?.metadatas;
          })
          .catch((error: any) => {
            console.log(error);
            return [];
          });

        if (takenMarketshare?.length > 0) {
          takenMarketshare.forEach((metadata: any) => {
            if (metadata?.leadType === "Buyer") {
              data.buyer_share =
                data.buyer_share - parseInt(metadata?.marketShare);
            }
            if (metadata?.leadType === "Seller") {
              data.seller_share =
                data.seller_share - parseInt(metadata?.marketShare);
            }
            if (metadata?.leadType === "Both") {
              data.seller_share =
                data.seller_share - parseInt(metadata?.marketShare);
            }
          });
        }

        setZipData(data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSwitch = (zipCodeData) => {
    let newBudget: number;
    const maxBuyerBudget =
      zipCodeData?.buyer_max_budget || config.pricing.maximumPrice;
    const monthlyMaxBudget = maxBuyerBudget;
    const availableMarketShare = zipCodeData?.buyer_share;

    if (budget > (monthlyMaxBudget * availableMarketShare) / 100) {
      newBudget = (monthlyMaxBudget * availableMarketShare) / 100;
      console.log(newBudget);
    }
  };

  const handleLeadsEstimate = () => {
    const maxAvailableBudget =
      leadType === "Buyer"
        ? zipData?.buyer_max_budget
        : zipData?.seller_max_budget || config.pricing.maximumPrice;
    const currentToAvailableBudgetRatio = budget / maxAvailableBudget;

    const newMarketShare: number = Math.round(
      currentToAvailableBudgetRatio * 100
    );
    const newEstimate: number =
      budget /
      (leadType === "Buyer" ? zipData?.buyer_cost : zipData?.seller_cost);

    setMarketShare(newMarketShare);
    setLeadsEstimate(Math.round(newEstimate));
  };

  const handleCheckout = async () => {
    setLoadingCheckout(true);
    //check if user is logged in
    if (user?.email) {
      const paymentData = {
        leadType: leadType,
        budgetAmount: Math.round(
          isYearly
            ? budget * 6 - (budget * 6 * config.pricing.yearlyDiscount) / 100
            : budget
        ), //if yearly, apply discount
        zipCode: zipCode,
        isYearly: isYearly,
        cancelUrl: window.location.href,
        leadsEstimate: leadsEstimate,
        marketShare: marketShare,
      };

      const session: any = await stripeNewCheckout({ paymentData })
        .then(async (response: any) => {
          await saveSessionToFirestore(response.data?.session);
          return response.data?.session;
        })
        .catch((error) => {
          console.log(error);
        });

      localStorage.setItem("pendingCheckout", JSON.stringify(session));

      setLoadingCheckout(false);
      if (session?.url) {
        window.location.href = session?.url;
      } else {
        toast.error("Error creating checkout session. Please try again.");
      }
    } else {
      console.log("user is not logged in");

      setLoadingCheckout(false);
      return;
    }
  };

  useEffect(() => {
    handleLeadsEstimate();
  }, [leadType, budget, zipData]);

  useEffect(() => {
    //this is a safeguard to make sure the budget is never lower than the minimum budget
    if (budget < minBudget) {
      setBudget(minBudget);
    }
  }, [budget]);

  useEffect(() => {
    const element = document.getElementById(
      "signInButton"
    ) as unknown as HTMLButtonElement;
    setSignInButton(element);
    console.log(signInButton);
  }, []);

  useEffect(() => {
    if (zipCode) {
      if (user?.email) {
        handleMapClick(zipCode);
      } else {
        // signInButton.click();
        handleMapClick(zipCode);
      }
    }
  }, [zipCode]);

  return (
    <div>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css"
        type="text/css"
      />
      <div
        ref={mapContainer}
        className="map-container"
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      />
      {zipCode && !zipData && user?.email && (
        <div
          className="p__details__sidebar"
          style={{
            position: "absolute",
            right: 10,
            bottom: 10,
            width: "380px",
            zIndex: 1000,
          }}
        >
          {/* Loading */}
          <div className="intro">
            <div className="d-flex flex-row justify-content-between">
              <p
                className="offcanvas-title text-white"
                id="offcanvasRightLabel"
              >
                {zipCode || "Loading"}
              </p>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={() => {
                  setZipData(null);
                  setZipCode("");
                }}
              ></button>
            </div>
            <div className="countdown__wrapper mb-1">
              <h5>Loading...</h5>
            </div>
          </div>
        </div>
      )}
      {zipData && user?.email && (
        <div
          className="p__details__sidebar"
          style={{
            position: "absolute",
            right: 10,
            bottom: 10,
            width: "380px",
            zIndex: 1000,
          }}
        >
          <div className="intro">
            <div className="d-flex flex-row justify-content-between">
              <p
                className="offcanvas-title text-white"
                id="offcanvasRightLabel"
              >
                {zipCode || "Loading"}
              </p>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={() => {
                  setZipData(null);
                  setZipCode("");
                }}
              ></button>
            </div>
            <div className="countdown__wrapper mb-1">
              <h5>
                Available:
                <span className="ms-2">
                  {leadType === "Buyer" &&
                    zipData?.buyer_share &&
                    `${zipData?.buyer_share}%`}
                  {leadType !== "Buyer" &&
                    zipData?.buyer_share &&
                    `${zipData?.seller_share}%`}
                  {!zipData?.buyer_share && ""}
                </span>
              </h5>
            </div>
            <div className="d-flex flex-column gap-2 mt-1">
              {/* Change Lead Type */}
              <div className="row">
                <div
                  className="col-12"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span className="text-white">
                    {leadType === "Buyer" && (
                      <>
                        <i className="bi bi-person-fill me-2"></i>Buyers Only
                      </>
                    )}
                    {leadType === "Both" && (
                      <>
                        <i className="bi bi-person-fill me-2"></i>Buyers &
                        Sellers
                      </>
                    )}
                    {leadType === "Seller" && (
                      <>
                        <i className="bi bi-person-fill me-2"></i>Sellers Only
                      </>
                    )}
                  </span>
                  <span className="text-white">
                    <button
                      className="btn button button--effect btn-secondary btn-sm"
                      onClick={() => {
                        if (leadType === "Buyer") {
                          setLeadType("Both");
                        } else if (leadType === "Both") {
                          setLeadType("Seller");
                        } else {
                          setLeadType("Buyer");
                        }
                      }}
                    >
                      Change
                    </button>
                  </span>
                </div>
              </div>
              {/* Audience */}
              <div className="row">
                <div
                  className="col-12"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span className="text-white">
                    <i className="bi bi-people-fill me-2"></i>Population
                  </span>
                  <span className="text-white">
                    {((zipData?.population as number) * 1.15)?.toLocaleString(
                      "en-US",
                      {
                        style: "decimal",
                        maximumFractionDigits: 0,
                      }
                    ) || "N/A"}
                  </span>
                </div>
              </div>
              {/* Avg. Home Value */}
              <div className="row">
                <div
                  className="col-12"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span className="text-white">
                    <i className="bi bi-house-up-fill me-2"></i>Avg. Home Value
                  </span>
                  <span className="text-white">
                    {((zipData?.home_value as number) * 1.18)?.toLocaleString(
                      "en-US",
                      {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }
                    ) || "N/A"}
                  </span>
                </div>
              </div>
              {/* Your Share */}
              <div className="row">
                <div
                  className="col-12"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span className="text-white">
                    <i className="bi bi-percent me-2"></i>Your Share
                  </span>
                  <span className="text-white">{marketShare}%</span>
                </div>
              </div>
              {/* Leads */}
              <div className="row">
                <div
                  className="col-12"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{ alignItems: "center", display: "flex" }}
                    className="text-white"
                  >
                    <i className="bi bi-person-lines-fill me-2"></i>
                    <span className="text-white me-2">Leads Estimate</span>
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <span className="text-white">
                      {leadsEstimate && leadType !== "Seller"
                        ? `${Math.floor(leadsEstimate * 0.6)} - ${Math.ceil(
                            leadsEstimate * 1.2
                          )}`
                        : ""}
                      {leadsEstimate && leadType === "Seller"
                        ? `${Math.floor(
                            (leadsEstimate * 0.6) / 2
                          )} - ${Math.ceil((leadsEstimate * 1.2) / 2)}`
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="group brin">
            <div className="row rounded shadow p-3 mb-3 ">
              <div
                className="col-12"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>
                  <i className="bi bi-calendar2-week me-2"></i>Special Offer
                </span>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    checked={isYearly}
                    style={{
                      cursor: "pointer",
                      backgroundColor: isYearly ? "#3f78e0" : "#d1d1d1",
                      borderColor: isYearly ? "#3f78e0" : "#d1d1d1",
                    }}
                    onChange={() => {
                      setIsYearly(!isYearly);
                    }}
                  />
                </div>
              </div>
              <small className="">Pay for 3 months, get 3 months FREE.</small>
            </div>
            <div className="row mb-3">
              <div
                className="col-12"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>
                  <i className="bi bi-calculator-fill me-2"></i>
                  {isYearly ? "Every 6 Months" : "Per Month"}
                </span>
                {isYearly && (
                  <span style={{ fontSize: 16 }}>
                    {(
                      budget * 6 -
                      (budget * 6 * config.pricing.yearlyDiscount) / 100
                    ).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}{" "}
                    /{" "}
                    <s style={{ fontSize: 12 }}>
                      {(budget * 6).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </s>
                  </span>
                )}
                {!isYearly && (
                  <span style={{ fontSize: 20 }}>
                    {budget.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                )}
              </div>
            </div>
            <div className="row justify-content-center mb-3">
              <h5 className=" text-center">Set your Budget</h5>
              <div
                className="col-12"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "flex-start",
                }}
              >
                <i className="bi bi-currency-dollar me-2"></i>
                <style jsx>{`
                  @keyframes pulse {
                    0% {
                      transform: scale(1);
                    }
                    50% {
                      transform: scale(1.5);
                    }
                    100% {
                      transform: scale(1);
                    }
                  }
                `}</style>
                <Slider
                  min={minBudget}
                  max={
                    maxSliderRange > minBudget
                      ? maxSliderRange
                      : minBudget + 1500 || config.pricing.maximumPrice
                  }
                  step={budgetIncrement}
                  value={budget}
                  onChange={(value) => {
                    if (typeof value === "number") {
                      setBudget(value);
                    }
                    if (!touchedHandle) {
                      setTouchedHandle(true);
                    }
                  }}
                  style={{ width: "80%", marginBottom: 20 }}
                  styles={{
                    handle: {
                      height: 24,
                      width: 24,
                      backgroundColor: "#5927e3",
                      animation: !touchedHandle ? "pulse 2s infinite" : "none",
                    },
                    track: {
                      height: 14,
                      backgroundColor: "#5927e3",
                    },
                    rail: {
                      height: 14,
                    },
                  }}
                />
                <div
                  className="d-flex flex-row ms-2"
                  style={{ marginRight: -10 }}
                >
                  <i className="bi bi-currency-dollar"></i>
                  <i
                    className="bi bi-currency-dollar"
                    style={{ marginLeft: -7 }}
                  ></i>
                  <i
                    className="bi bi-currency-dollar"
                    style={{ marginLeft: -7 }}
                  ></i>
                </div>
              </div>
              {maxSliderRange < minBudget && (
                <small className=" text-center">
                  If the audience is small or the market share is insufficient,
                  we will expand to nearby zip codes to increase the reach of
                  our ads.
                </small>
              )}
              <small className=" text-center">
                Drag the slider to set your budget.
              </small>
            </div>
            <div
              className="row"
              style={{
                flexWrap: "nowrap",
                display: "flex",
                alignItems: "center",
              }}
            >
              {zipData?.buyer_share > 0 && (
                <button
                  type="button"
                  className="btn button button--effect btn-primary btn-rounded"
                  disabled={loadingCheckout}
                  onClick={() => {
                    handleCheckout();
                  }}
                >
                  {!loadingCheckout ? "Checkout" : "Loading"}
                </button>
              )}

              {(zipData?.buyer_share <= 0 || zipData?.seller_share <= 0) && (
                <div className="col-6 d-flex flex-column gap-2">
                  <button
                    type="button"
                    className="btn btn-warning btn-rounded btn-sm me-2"
                    disabled={loadingCheckout}
                    onClick={() => {
                      handleCheckout();
                    }}
                  >
                    {!loadingCheckout ? "Backorder" : "Loading"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm p-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    What's this?
                  </button>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title" id="exampleModalLabel">
                            What's a backorder?
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <h5>
                            Your favorite zip code has been claimed by another
                            agent?
                          </h5>
                          <p>
                            We do not want to over saturate zip codes, so we
                            limit the amount of agents that can purchase leads
                            in a zip code.
                          </p>

                          <p>
                            Place a backorder and we'll start running ads to
                            generate leads in the surrounding zip codes. As soon
                            as your favorite zip code becomes available, we'll
                            update our ad campaigns to target that zip code for
                            you.
                          </p>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
