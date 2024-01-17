import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../utility/UserContext";
import Loading from "../components/Loading";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const { ready } = useContext(UserContext)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get('/user-places');
        setPlaces(data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [])

  if (!ready) {
    return (
      <Loading />
    )
  }

  return (
    <div>
      <AccountNav />
      <div className="text-center mt-8">
        <Link
          className="inline-flex gap-1 rounded-full bg-primary px-6 py-2 text-white"
          to={"/account/user-places/new"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {places.length > 0 && places.map(place => (
          <Link to={`/account/user-places/${place._id}`} key={place._id}>
            <div className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
              <div className="flex w-44 h-44 bg-gray-200 grow shrink-0">
                {place.photos.length > 0 && (
                  <img className="w-full h-full object-cover object-center" src={`http://localhost:4000/uploads/${place.photos[0]}`} alt="photo" />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlacesPage;
