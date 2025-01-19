import axios from "axios";
export const getAddressCoordinates = async (address: string) => {
  try {
    const response: any = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    if (response.data.status === "OK") {
      let data = response.data.results[0].geometry.location;
      return { lat: data.lat, lng: data.lng };
    } else {
      throw new Error("Invalid address");
    }
  } catch (error) {
    throw error;
  }
};

export const getDistanceTimeService = async function (
  origin: string,
  destination: string
) {
  const response: any = await axios.get(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  const data = response.data.rows[0].elements[0];
  return data;
};

export const getAutoCompleteSuggestions = async function (input: string) {
  try {
    const response: any = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    if (response.data.status !== "OK") {
      throw new Error("Invalid input");
    }
    return response.data.predictions;
  } catch (error) {
    throw error;
  }
};
