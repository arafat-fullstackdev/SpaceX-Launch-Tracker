import React, { useState, useEffect } from "react";

const SPACEX_API_URL = "https://api.spacexdata.com/v3/launches/latest";
function LaunchTracker() {
  //? define var
  const [launch, setLaunch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(SPACEX_API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setLaunch(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); //dependency array

  return (
    <div>
      <h1>SpaceX Launch Tracker</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {launch && (
        <div>
          <h2>{launch.mission.name}</h2>
          <p>Date: {new Date(launch.launch_date_utc).toLocaleDateString()}</p>
          <p>Rocket: {launch.rocket.rocket_name}</p>
          <p>Launch Site: {launch.launch_site_name_long}</p>
          <p>
            Details:{" "}
            {launch.details
              ? launch.details
              : "No details available fro this time"}
          </p>
          {launch.links.webcast && (
            <a
              href={launch.links.webcast}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Launch
            </a>
          )}
        </div>
      )}
    </div>
  );
}
export default LaunchTracker;
