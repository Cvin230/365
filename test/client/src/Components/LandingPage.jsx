import React, { useState } from "react";
import { constants } from "../constants";
import { useTrackingContext } from "../hooks/useTrackingContext";
import TrackingStatus from "./TrackingStatus";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import css from "../styles/LandingPage.module.css";

import benefitIcon2 from "../Assets/fastDelivery.png";

import TrackPackage from "../Assets/trackorder.jpg";

import Benefits from "./Benefits";

function LandingPage() {
  const { dispatch } = useTrackingContext();
  const [tracking, setTracking] = useState("");
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(details, "details");
  const handleTracking = async (e) => {
    e.preventDefault();

    if (!tracking) {
      console.error("Error: Tracking number is empty");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://three65test.onrender.com/api/tracking/" + tracking
      );
      console.log(response, "response");

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: "SET_TRACKING", payload: json });
        setDetails(json);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
    setTracking("");
  };

  return (
    <div className={css.mainContainer}>
      {/* start of the nav bar */}
      <div className={css.NavbarConatainer}>
        <nav className={css.navBarWrap}>
          <div className={css.brandWrap}>
            <p>
              <span>Ship</span>365
            </p>
          </div>
          <button className={css.ctaBtn}>How it works</button>
        </nav>
      </div>
      {/* end of the nav bar */}
      <img src={TrackPackage} alt="" className={css.heroLeftBanner} />

      {/* start of the hero section */}
      <div className={css.heroSectionContainer}>
        <div className={css.heroSectionContent}>
          <p className={css.headline}>{constants.heroSection.headline}</p>
        </div>
      </div>

      <div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              style={{ height: "40px", width: "50%" }}
              type="text"
              name="tn"
              placeholder="Enter USPS tracking number"
              onChange={(e) => setTracking(e.target.value)}
              value={tracking}
            />
            <button
              style={{ width: "30%", height: "40px" }}
              onClick={handleTracking}
            >
              Track Package
            </button>
          </div>
          {loading && <div style={{ alignSelf: "center" }}>Loading...</div>}
        </form>

        {details ? (
          <TrackingStatus
            status={details.status}
            address={details.address}
            updateTime={formatDistanceToNow(new Date(details.updatedAt), {
              addSuffix: true,
            })}
          />
        ) : null}
      </div>

      {/* </div> */}
      {/* </div> */}

      {/* end of the resturants */}
      <div className={css.benefitsContainer}>
        <p className={css.featureHeadline}>
          {constants.featuresSection.headline}
        </p>
        <Benefits src={benefitIcon2} />
      </div>
      <div className={css.benefitsContainer}>
        <Benefits
          title={constants.faq.faq1.headline}
          description={constants.faq.faq1.subscribe}
        />
      </div>
      <div className={css.benefitsContainer}>
        <Benefits
          title={constants.faq.faq2.headline}
          description={constants.faq.faq2.subscribe}
        />
      </div>
      <div className={css.benefitsContainer}>
        <Benefits
          title={constants.faq.faq3.headline}
          description={constants.faq.faq3.subscribe}
        />
      </div>
      <div className={css.benefitsContainer}>
        <Benefits
          title={constants.faq.faq4.headline}
          description={constants.faq.faq4.subscribe}
        />
      </div>
      <div className={css.benefitsContainer}>
        <Benefits
          title={constants.faq.faq5.headline}
          description={constants.faq.faq5.subscribe}
        />
      </div>
      <div className={css.benefitsContainer}>
        <Benefits
          title={constants.faq.faq6.headline}
          description={constants.faq.faq6.subscribe}
        />
      </div>
      <div className={css.benefitsContainer}>
        <Benefits
          title={constants.faq.faq7.headline}
          description={constants.faq.faq7.subscribe}
        />
      </div>
      <div className={css.benefitsContainer}>
        <Benefits
          title={constants.faq.faq8.headline}
          description={constants.faq.faq8.subscribe}
        />
      </div>
      <div className={css.benefitsContainer}>
        <Benefits
          title={constants.faq.faq9.headline}
          description={constants.faq.faq9.subscribe}
        />
      </div>
      <div className={css.benefitsContainer}>
        <Benefits
          title={constants.faq.faq10.headline}
          description={constants.faq.faq10.subscribe}
        />
      </div>
      <div className={css.benefitsContainer}>
        <Benefits
          title={constants.faq.faq11.headline}
          description={constants.faq.faq11.subscribe}
        />
      </div>
      <div className={css.benefitsContainer}>
        <Benefits
          title={constants.faq.faq12.headline}
          description={constants.faq.faq12.subscribe}
        />
      </div>
      <div className={css.benefitsContainer}>
        <Benefits
          title={constants.faq.faq13.headline}
          description={constants.faq.faq13.subscribe}
        />
      </div>
      <div className={css.benefitsContainer}>
        <Benefits
          title={constants.faq.faq14.headline}
          description={constants.faq.faq14.subscribe}
        />
      </div>

      {/* end of the footer */}
      <div className={css.footerContainer}>
        <div className={css.footerContentWrap}>
          <div className={css.brandContentWrap}>
            <div className={css.footerbrandWrap}>
              <p>
                <span>Ship</span>365
              </p>
            </div>
            <p className={css.brandQuote}>{constants.footer.brand.quote}</p>
          </div>
        </div>
        <p className={css.copyright}>{constants.footer.copyright}</p>
      </div>
    </div>
  );
}

export default LandingPage;
