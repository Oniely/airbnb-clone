import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";
import BookingDates from "../components/BookingDates";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    axios.get("/bookings").then((res) => {
      const foundBooking = res.data.find(({ place: { _id } }) => _id === id);
      if (foundBooking) {
        setBooking(foundBooking);
      }
    });
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="mt-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className={"my-2 block"}>
        {booking.place.address}
      </AddressLink>
      <div className="my-6 flex items-center justify-between rounded-2xl bg-gray-200 p-6">
        <div>
          <h2 className="text-2xl">Your booking information</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="rounded-2xl bg-primary p-6 text-white">
          <div>Total price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
};

export default BookingPage;
