import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../utility/UserContext";

/* eslint-disable react/prop-types */
const BookingWidget = ({ place }) => {
  const { user } = useContext(UserContext);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    setName(user.name);
  }, [user]);

  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(checkOut, checkIn);
  }

  async function bookThisPlace() {
    if (!user) {
      return setRedirect("/login");
    }

    if (numberOfDays < 1 || numberOfGuests < 1 || !name || !phone) {
      return alert("Provide all information before booking a place");
    }

    const data = {
      place: place._id,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price: numberOfDays * place.price,
    };

    try {
      const { data: bookingData } = await axios.post("/booking", data);
      const bookingId = bookingData._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      console.log(error);
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow">
      <div className="text-center text-2xl tracking-tight">
        Price: ${place.price} / per night
      </div>
      <div className="mt-4 rounded-2xl border">
        <div className="flex">
          <div className="grow px-4 py-3">
            <label htmlFor="checkInDate">Check in:</label>
            <input
              id="checkInDate"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              type="date"
            />
          </div>
          <div className="grow border-l px-4 py-3">
            <label htmlFor="checkOutDate">Check out:</label>
            <input
              id="checkOutDate"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              type="date"
            />
          </div>
        </div>
        <div className="border-t px-4 py-3">
          <label htmlFor="guests">Number of guests:</label>
          <input
            id="guests"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
            type="number"
          />
        </div>
        {checkIn && checkOut && numberOfGuests && (
          <div className="border-t px-4 py-3">
            <label htmlFor="name">Your full name:</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
            <label htmlFor="phone">Phone number:</label>
            <input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
            />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {numberOfDays > 0 && <span> ${numberOfDays * place.price}</span>}
      </button>
    </div>
  );
};

export default BookingWidget;
