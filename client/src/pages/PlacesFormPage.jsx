import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import PhotosUploader from "../components/PhotosUploader";
import Perks from "../components/Perks";
import AccountNav from "../components/AccountNav";

const PlacesFormPage = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(1000);

  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    async function fetchData() {
      try {
        const { data } = await axios.get(`/user-places/${id}`);
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuest);
        setPrice(data.price);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  function inputHeader(text) {
    return <h2 className="mt-4 text-2xl">{text}</h2>;
  }
  function inputDesciption(text) {
    return <p className="text-sm text-gray-500">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDesciption(description)}
      </>
    );
  }

  async function savePlace(e) {
    e.preventDefault();

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    if (id) {
      try {
        await axios.patch(`/user-places/${id}`, placeData);
        setRedirect("/account/user-places");
      } catch (error) {
        const {
          response: {
            data: { name: msg },
          },
        } = error;
        console.log(error);
        alert(msg);
      }
    } else {
      try {
        await axios.post("/user-places", placeData);
        setRedirect("/account/user-places");
      } catch (error) {
        const {
          response: {
            data: { name: msg },
          },
        } = error;
        console.log(error);
        alert(msg);
      }
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          "Title",
          "title for your place, should be short and catchy as in advertisment",
        )}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title, for example: My lovely apt"
        />

        {preInput("Address", "Address to this place")}
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {preInput("Photos", "more = better")}
        <PhotosUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />

        {preInput("Description", "description of the place")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {preInput("Perks", "select all the perks of your place")}
        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} setPerks={setPerks} />
        </div>

        {preInput("Extra Info", "House rules, etc.")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        {preInput(
          "Check in&out time, max guests",
          "add check in and out times, remember to have some time window for cleaning the room between guests.",
        )}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <div>
            <h3 className="mb-1 mt-2">Check in time</h3>
            <input
              type="text"
              placeholder="14"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mb-1 mt-2">Check out time</h3>
            <input
              type="text"
              placeholder="09"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mb-1 mt-2">Max number of guests</h3>
            <input
              type="number"
              placeholder="1"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mb-1 mt-2">Price per night</h3>
            <input
              type="number"
              placeholder="1000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
