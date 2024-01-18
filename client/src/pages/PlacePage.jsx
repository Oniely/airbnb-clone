import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    async function fetchData() {
      const { data } = await axios.get(`/place/${id}`);
      setPlace(data);
    }
    fetchData();
  }, [id]);

  if (!place) {
    return;
  }

  return (
    <div className="-mx-8 mt-8 bg-gray-100 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />

      <div className="mb-8 mt-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr,_1fr]">
        <div className="">
          <div className="my-4">
            <h2 className="text-2xl font-semibold">Desciption</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}
          <br />
          Check-out: {place.checkOut}
          <br />
          Max number of guests: {place.maxGuest}
        </div>

        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="-mx-8 border-t bg-white px-8 py-8">
        <div>
          <h2 className="text-2xl font-semibold">Extra Info</h2>
        </div>
        <div className="mt-2 text-sm leading-5 text-gray-700">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
