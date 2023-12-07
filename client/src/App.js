import { useState, useEffect } from "react";

const TEAMID = [
  33, 34, 35, 36, 39, 40, 42, 44, 45, 47, 48, 49, 50, 51, 52, 55, 62, 65, 66,
  1359,
];

const App = () => {
  const [data, setData] = useState([]);
  // const [logos, setLogos] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      // fetch(
      //   "https://api-football-v1.p.rapidapi.com/v3/teams?league=39&season=2023",
      //   {
      //     method: "GET",
      //     headers: {
      //       "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
      //       "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
      //     },
      //   }
      // )
      //   .then((res) => res.json())
      //   .then((data) => setData(data.response))
      //   .catch((err) => console.log(err));
    };
    // fetchData();
    const fetchSquad = () => {
      // for (let i = 0; i < TEAMID.length; i++) {
      //   const id = TEAMID[i];
      //   fetch(
      //     `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=${id}`,
      //     {
      //       method: "GET",
      //       headers: {
      //         "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
      //         "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
      //       },
      //     }
      //   )
      //     .then((res) => res.json())
      //     .then((squad) => {})
      //     .catch((err) => console.log(err));
      // }
      // const options = {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(squad.response),
      // };
      // fetch("http://localhost:8888/squads", options)
      //   .then((res) => res.json())
      //   .then((sq) => console.log(sq))
      //   .catch((err) => console.log(err));
    };
    // fetchSquad();
    const addImage = () => {
      // for (let i = 0; i < TEAMID.length; i++) {
      //   const id = TEAMID[i];
      //   fetch(`https://media.api-sports.io/football/teams/${id}.png`, {
      //     method: "GET",
      //   })
      //     .then((res) => res.blob())
      //     .then((blob) => {
      //       const url = URL.createObjectURL(blob);
      //       const img = new Image();
      //       img.src = url;
      //       img.onload = () => {
      //         const canvas = document.createElement("canvas");
      //         const ctx = canvas.getContext("2d");
      //         canvas.width = img.width;
      //         canvas.height = img.height;
      //         ctx.drawImage(img, 0, 0);
      //         const dataURL = canvas.toDataURL("image/png");
      //         const options = {
      //           method: "POST",
      //           headers: {
      //             "Content-Type": "application/json",
      //           },
      //           body: JSON.stringify({ id, dataURL }),
      //         };
      //         fetch(`http://localhost:8888/logos`, options)
      //           .then((res) => res.json())
      //           .then((data) => console.log(data))
      //           .catch((err) => console.log(err));
      //       };
      //     })
      //     .catch((err) => console.log(err));
      // }
    };
    // addImage();
  }, []);

  useEffect(() => {
    const postToDbJSON = () => {
      // const url = "http://localhost:8888/teams";
      // const options = {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // };
      // fetch(url, options)
      //   .then((res) => res.json())
      //   .then((data) => console.log(data))
      //   .catch((err) => console.log(err));
    };
    // postToDbJSON();
    // }, [data]);
  }, []);

  useEffect(() => {
    const getLogos = () => {
      // fetch("http://localhost:8888/logos")
      //   .then((res) => res.json())
      //   .then((data) => setLogos(data))
      //   .catch((err) => console.log(err));
    };
    // getLogos();
  }, []);

  return (
    <div className="App">
      <h1>App</h1>
    </div>
  );
};

export default App;
