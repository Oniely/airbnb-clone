import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from '../components/PlaceImg'

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/user-places");
        setPlaces(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 rounded-full bg-primary px-6 py-2 text-white"
          to={"/account/user-places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={`/account/user-places/${place._id}`} key={place._id}>
              <div className="flex cursor-pointer gap-4 rounded-2xl bg-gray-100 p-4">
                <div className="flex h-44 w-44 shrink-0 grow bg-gray-200">
                  <PlaceImg place={place} />
                </div>
                <div className="shrink grow-0">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="mt-2 text-sm">{place.description}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
