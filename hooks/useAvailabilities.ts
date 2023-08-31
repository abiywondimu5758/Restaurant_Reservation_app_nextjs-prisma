import { useState } from "react";
import axios from "axios";

export default function useAvailabilities() {
  const [loading, setLoadingState] = useState(false);
  const [error, setErrorState] = useState(null);
  const [data, setDataState] = useState<
    { time: string; available: boolean }[] | null
  >(null);

  const fetchAvailabilities = async ({
    slug,
    partySize,
    day,
    time,
  }: {
    slug: string;
    partySize: string;
    day: string;
    time: string;
  }) => {
    setLoadingState(true);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/restaurant/${slug}/availability`,
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
      setDataState(response.data);
      setLoadingState(false);
    } catch (error: any) {
      setErrorState(error.response.data.errorMessage);
      setLoadingState(false);
    }
  };

  return { loading, data, error, fetchAvailabilities };
}
