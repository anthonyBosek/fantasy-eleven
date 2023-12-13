import { useEffect, useState } from "react";
import axios from "axios";

const Fantasy = () => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const getLeagues = async () => {
      try {
        const res = await axios.get("/leagues");
        setLeagues(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getLeagues();
  }, []);

  return (
    <div>
      <h1>Fantasy</h1>
      <h2>Show all existing Fantasy leagues as cards</h2>
      {console.log(leagues)}
    </div>
  );
};

export default Fantasy;
