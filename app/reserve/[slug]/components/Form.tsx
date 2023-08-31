"use client";
import { useEffect, useState } from "react";
import useReservation from "../../../../hooks/useReservation";
import { CircularProgress } from "@mui/material";

export default function Form({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) {
  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhone: "",
    bookerEmail: "",
    bookerOccasion: "",
    bookerRequest: "",
  });
  const [day, time] = date.split("T");
  const [disabled, setDisabled] = useState(true);
  const [didBook, setDidBook] = useState(false);
  const { error, loading, createReservation } = useReservation();

  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerPhone &&
      inputs.bookerEmail
    ) {
      return setDisabled(false);
    }
    return setDisabled(true);
  }, [inputs]);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    const booking = await createReservation({
      slug,
      day,
      time,
      partySize,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerPhone: inputs.bookerPhone,
      bookerEmail: inputs.bookerEmail,
      bookerOccasion: inputs.bookerOccasion,
      bookerRequest: inputs.bookerRequest,
      setDidBook,
    });
  };

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {didBook ? (
        <div>
          <h1>You are all booked up</h1>
          <p>Enjoy your reservation</p>
        </div>
      ) : (
        <>
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4 bg-white"
            placeholder="First name"
            value={inputs.bookerFirstName}
            onChange={handleChangeInput}
            name="bookerFirstName"
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4 bg-white"
            placeholder="Last name"
            value={inputs.bookerLastName}
            onChange={handleChangeInput}
            name="bookerLastName"
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4 bg-white"
            placeholder="Phone number"
            value={inputs.bookerPhone}
            onChange={handleChangeInput}
            name="bookerPhone"
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4 bg-white"
            placeholder="Email"
            value={inputs.bookerEmail}
            onChange={handleChangeInput}
            name="bookerEmail"
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4 bg-white"
            placeholder="Occasion (optional)"
            value={inputs.bookerOccasion}
            onChange={handleChangeInput}
            name="bookerOccasion"
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4 bg-white"
            placeholder="Requests (optional)"
            value={inputs.bookerRequest}
            onChange={handleChangeInput}
            name="bookerRequest"
          />
          <button
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
            disabled={disabled || loading}
            onClick={handleClick}
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Complete reservation"
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  );
}
