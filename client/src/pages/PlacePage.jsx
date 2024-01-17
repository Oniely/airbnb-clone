import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    async function fetchData() {
      const { data } = await axios.get(`/place/${id}`);
      setPlace(data);
      console.log(id, data);
    }
    fetchData();
  }, [id]);

  if (!place) {
    return;
  }

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 min-h-screen bg-white">
        <div className="grid gap-4 bg-black p-8 text-white">
          <div>
            <h2 className="text-3xl">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-8 top-8 flex gap-1 rounded-2xl bg-white px-4 py-2 text-black shadow shadow-black"
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
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
              <span>Close photos</span>
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div className="flex justify-center" key={place._id}>
                <img
                  className="object-cover object-center"
                  src={`http://localhost:4000/uploads/${photo}`}
                  alt="photo"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="-mx-8 mt-8 bg-gray-100 px-8 py-8">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="my-3 flex gap-1 font-semibold underline"
        target="_blank"
        rel="noreferrer"
        href={`https://maps.google.com/?q=${place.address}`}
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
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        {place.address}
      </a>
      <div className="relative">
        <div className="grid grid-cols-[2fr,_1fr] gap-2 rounded-3xl overflow-hidden">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  className="aspect-square h-full w-full object-cover object-center"
                  src={`http://localhost:4000/uploads/${place.photos[0]}`}
                  alt="photo"
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                className="aspect-square object-cover object-center"
                src={`http://localhost:4000/uploads/${place.photos[1]}`}
                alt="photo"
              />
            )}
            {place.photos?.[2] && (
              // made a div here and made the image relative and use top-2 to make a gap
              // and use overflow-hidden to not make an overflow and make a perfect square triple image
              <div className="overflow-hidden">
                <img
                  className="relative top-2 aspect-square object-cover object-center"
                  src={`http://localhost:4000/uploads/${place.photos[2]}`}
                  alt="photo"
                />
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="absolute bottom-2 right-2 flex items-center gap-1 rounded-2xl bg-white px-4 py-2 shadow-md shadow-gray-500"
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
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <span>Show more photos</span>
        </button>
      </div>
    </div>
  );
};

export default PlacePage;
