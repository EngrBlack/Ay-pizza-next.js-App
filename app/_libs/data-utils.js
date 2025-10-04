import { data } from "autoprefixer";

const BASE_URL = "https://nominatim.openstreetmap.org/reverse";

export async function getAddress(lat, lon) {
  if (!lat || !lon) {
    throw new Error("Missing coordinates");
  }

  const res = await fetch(
    `${BASE_URL}?lat=${lat}&lon=${lon}&format=json&addressdetails=1`,
    {
      headers: {
        "User-Agent": "AyPizzaApp/1.0 (aypizza@gmail.com)",
        "Accept-Language": "en",
      },
    }
  );

  if (!res.ok) throw new Error("Failed getting address");

  data = await res.json();
  return data;
}
