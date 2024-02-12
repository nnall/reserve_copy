import React, { useEffect, useState } from "react";
// import hero from "../images/hero.png";
// import HeroImage from "../tools/hero";
// import CardHome from "../tools/single_card";
// import ReviewCard from "../tools/reviews";

function ArgyleComponent({ userCredentials }) {
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch the user token and id from your API
    fetch("https://api-sandbox.argyle.com/v2/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          btoa("3f6086f9-b438-436e-bd7e-e5c4a280c1df:YMBnLR9VCr7yOsiL"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserToken(data.user_token);
        setUserId(data.id);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    if (userToken) {
      const script = document.createElement("script");
      script.src = "https://plugin.argyle.com/argyle.web.v5.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const linkInstance = window.Argyle.create({
          linkKey: "01880252-1bf4-1396-a763-ff106de9c0c6",
          userToken: userToken,
          userId: userId,
          sandbox: true,
          userCredentials: userCredentials,
          onAccountConnected: (payload) =>
            console.log("onAccountConnected", payload),
          onAccountCreated: (payload) =>
            console.log("onAccountCreated", payload),
          onAccountError: (payload) => console.log("onAccountError", payload),
          onAccountRemoved: (payload) =>
            console.log("onAccountRemoved", payload),
          onDDSError: (payload) => console.log("onDDSError", payload),
          onDDSSuccess: (payload) => console.log("onDDSSuccess", payload),
          onCantFindItemClicked: (payload) =>
            console.log("onCantFindItemClicked", payload),
          onClose: () => console.log("onClose"),
          onDocumentsSubmitted: (payload) =>
            console.log("onDocumentsSubmitted", payload),
          onFormSubmitted: (payload) => console.log("onFormSubmitted", payload),
          onUIEvent: (payload) => console.log("onUIEvent", payload),
          onError: (payload) => console.log("onError", payload),
          onTokenExpired: (updateToken) => {
            console.log("onTokenExpired");
          },
        });

        linkInstance.open();
        console.log("Argyle closed");
      };

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [userToken, userId, userCredentials]);

  return (
    <div>
      {/* <HeroImage /> */}
      <div className="container">
        {/* <CardHome /> */}
        <h2 className="text-center mt-5">See What Everyone Is Saying</h2>
        {/* <ReviewCard /> */}
      </div>
    </div>
  );
}

export default ArgyleComponent;
