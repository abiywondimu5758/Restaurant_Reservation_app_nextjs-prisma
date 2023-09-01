"use client";
import { useState } from "react";
import { partySizes, times } from "../../../../data";
import DatePicker from "react-datepicker";
import { CircularProgress } from "@mui/material";
import useAvailabilities from "../../../../hooks/useAvailabilities";
import Link from "next/link";
import { convertToDisplayTime } from "../../../utils/ConvertToDisplayTime";
// import Link from "next/navigation";

export default function Reservations({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { loading, error, data, fetchAvailabilities } = useAvailabilities();
  // console.log("🚀 ~ file: Reservations.tsx:19 ~ data:", data);
  const [time, setTime] = useState(openTime);
  const [partySize, setPartySize] = useState("2");
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split("T")[0]);
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  const handleClick = () => {
    fetchAvailabilities({
      slug,
      day,
      time,
      partySize,
    });
  };

  const filterTimesByRestaurantOpenWindow = () => {
    const timesWithinWindow: typeof times = [];

    let isWithinWindow = false;
    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinWindow = true;
      }
      if (isWithinWindow) {
        timesWithinWindow.push(time);
      }
      if (time.time === closeTime) {
        isWithinWindow = false;
      }
    });
    return timesWithinWindow;
  };

  return (
    <div className="w-[27%] relative text-reg">
      <div className="fixed w-[15%] bg-white rounded p-3 shadow">
        <div className="text-center border-b pb-2 font-bold">
          <h4 className="mr-7 text-lg">Make a Reservation</h4>
        </div>
        <div className="my-3 flex flex-col">
          <label htmlFor="">Party size</label>
          <select
            name=""
            className="py-3 border-b font-light bg-white"
            id=""
            value={partySize}
            onChange={(e) => setPartySize(e.target.value)}
          >
            {partySizes.map((size) => (
              <option value={size.value}>{size.label}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col w-[48%] ">
            <label htmlFor="">Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleChangeDate}
              className="py-3 border-b font-light text-reg w-24 bg-white"
              dateFormat="MMMM d"
              wrapperClassName="w-[48%]"
            />
          </div>
          <div className="flex flex-col w-[48%]">
            <label htmlFor="">Time</label>
            <select
              name=""
              id=""
              className="py-3 border-b font-light bg-white"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              {filterTimesByRestaurantOpenWindow().map((time) => (
                <option value={time.time}>{time.displayTime}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button
            className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
            disabled={loading}
            onClick={handleClick}
          >
            {loading ? <CircularProgress color="inherit" /> : "Find a Time"}
          </button>
        </div>
        {data && data.length ? (
          <div className="mt-4">
            <div className="text-reg">Select a Time</div>
            <div className="flex flex-wrap mt-2">
              {data.map((time) => {
                return time.available ? (
                    
                  <Link
                    href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                    className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
                  >
                    <p className="text-sm font-bold">{convertToDisplayTime(time.time)}</p>
                  </Link>
                ) : (
                  <p className="bg-gray-300 p-2 w-24 mb-3 rounded mr-3"></p>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
