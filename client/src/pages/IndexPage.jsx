import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("/places");
      setPlaces(data);
    }
    fetchData();
  }, []);

  return (
    <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={`/place/${place._id}`} key={place._id}>
            <div className="flex rounded-2xl">
              {place.photos?.[0] && (
                <img
                  className="aspect-square rounded-2xl object-cover object-center"
                  src={`http://localhost:4000/uploads/${place.photos[0]}`}
                  alt="photo"
                />
              )}
            </div>
            <h2 className="truncate text-sm">{place.title}</h2>
            <h3 className="truncate text-sm font-bold text-gray-500">
              {place.address}
            </h3>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
}

export default IndexPage;
