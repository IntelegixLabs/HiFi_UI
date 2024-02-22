import React, { useEffect } from "react";
import { Api } from "@api/Api.jsx";

export default function UserHome() {
  useEffect(() => {
    Api.get("/healthy")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <h1>This is a User Home</h1>
    </div>
  );
}
