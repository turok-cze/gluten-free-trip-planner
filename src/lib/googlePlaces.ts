type GooglePlace = {
  displayName?: { text?: string };
  formattedAddress?: string;
  rating?: number;
  googleMapsUri?: string;
};

export type PlaceOption = {
  name: string;
  address: string;
  rating: string;
  googleMapsUri: string;
};

export async function searchRestaurants(city: string): Promise<PlaceOption[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey || "",
        "X-Goog-FieldMask":
          "places.displayName,places.formattedAddress,places.rating,places.googleMapsUri",
      },
      body: JSON.stringify({
        textQuery: `gluten free restaurant ${city}`,
        languageCode: "cs",
        maxResultCount: 6,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Google Places error: ${response.status}`);
  }

  const data = await response.json();

  return (data.places || []).map((place: GooglePlace) => ({
    name: place.displayName?.text || "Unknown place",
    address: place.formattedAddress || "",
    rating: place.rating ? String(place.rating) : "N/A",
    googleMapsUri: place.googleMapsUri || "",
  }));
}