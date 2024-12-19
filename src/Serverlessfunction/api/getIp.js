import React, { useState, useEffect } from "react";

const DisplayIp = () => {
  const [ip, setIp] = useState("");

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch("/api/getIp");
        const data = await response.json();
        setIp(data.ip);
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    };

    fetchIp();
  }, []);

  return (
    <div className="ip-container">
      <h1>Your IP Address:</h1>
      <p>{ip || "Fetching..."}</p>
    </div>
  );
};

export default DisplayIp;
