"use client";

import { useState } from "react";

type TripType = "" | "day" | "weekend" | "vacation" | "suggest";
type AccommodationPreference = "" | "hotel" | "apartment" | "any";

type TripResult = {
  title?: string;
  suitability?: string;
  dietMode?: {
    glutenFreeRequired?: boolean;
    label?: string;
    note?: string;
  };
  mainDestination?: {
    name?: string;
    description?: string;
    distance?: string;
    drivingTime?: string;
    searchQuery?: string;
  };
  accommodationOptions?: {
    name?: string;
    type?: string;
    description?: string;
    foodInfo?: string;
    parking?: string;
    estimatedPrice?: string;
    searchQuery?: string;
  }[];
restaurants?: {
  name?: string;
  description?: string;
  glutenFreeConfidence?: string;
  distance?: string;
  address?: string;
  rating?: string;
  googleMapsUri?: string;
  searchQuery?: string;
}[];
  parking?: {
    name?: string;
    description?: string;
    searchQuery?: string;
  };
  itinerary?: {
    day?: string;
    items?: {
      time?: string;
      activity?: string;
    }[];
  }[];
  costEstimate?: {
    total?: string;
    details?: (string | { item?: string; cost?: string })[];
  };
whyRecommended?: string[];
finalRecommendation?: string;
exportQuestion?: string;
};

export default function Home() {
  const [result, setResult] = useState<TripResult | null>(null);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState<"cz" | "en">("cz");
  const [tripType, setTripType] = useState<TripType>("");
  const [departureCity, setDepartureCity] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState(10000);
  const [loading, setLoading] = useState(false);
  const [travelers, setTravelers] = useState<string[]>([
    "dad",
    "mom",
    "daughter",
    "son",
  ]);
  const [accommodationPreference, setAccommodationPreference] =
    useState<AccommodationPreference>("");

  const departureCities = [
    "Brno",
    "Praha",
    "Ostrava",
    "Olomouc",
    "Liberec",
    "Jihlava",
    "Zlín",
    "Bratislava",
    "Vídeň",
  ];

  const destinations = [
    "Slovensko",
    "Liberec",
    "Karlštejn",
    "Červená Lhota",
    "Lednice",
    "Mikulov",
    "Pernštejn",
    "Telč",
    "Bouzov",
    "Kroměříž",
    "Trenčín",
    "Oravský hrad",
    "Jižní Čechy",
    "Vysočina",
    "Pálava",
  ];

  const text = {
    cz: {
      title: "Bezlepkový plánovač výletů",
      subtitle: "Naplánujte rodinný výlet s ohledem na bezlepkovou stravu",
      badge: "Rodinné cestování",
      basicInfo: "Základní údaje",
      fromPlaceholder: "Odkud pojedete? Např. Brno",
      destinationPlaceholder:
        "Kam chcete jet? Např. Slovensko, Liberec, Karlštejn",
      tripType: "Typ výletu",
      date: "Datum výletu",
      dateFrom: "Datum od",
      dateTo: "Datum do",
      budget: "Rozpočet",
      dayTrip: "Jednodenní výlet",
      weekend: "Víkend",
      vacation: "Dovolená",
      suggest: "Nechám si doporučit",
      travelers: "Kdo pojede",
      dad: "Táta",
      mom: "Máma",
      daughter: "Dcera",
      son: "Syn",
      accommodationPreference: "Typ ubytování",
      anyAccommodation: "Doporuč nejlepší možnost",
      hotel: "Hotel / penzion",
      apartment: "Apartmán",
      loading: "Připravuji návrh...",
      resultTitle: "Návrh výletu",
      currency: "Kč",
      budgetStep: 1000,
      budgetMin: 1000,
      budgetMax: 150000,
      considers: "Co aplikace zohlední",
      diet: "Strava",
      dietWithSon:
        "Je vybraný syn, proto aplikace bude preferovat bezlepkovou stravu a doporučení vhodná pro bezpečné stravování.",
      dietWithoutSon:
        "Syn není vybraný, proto aplikace nemusí omezovat restaurace a ubytování na bezlepkovou stravu.",
      family: "Účastníci",
      familyText: "Plán se přizpůsobí vybraným osobám a délce pobytu.",
      interests: "Hrady, zámky, rozhledny",
      interestsText: "Návrhy budou preferovat památky, rozhledny a přírodu.",
      accommodationLogic: "Ubytování",
      accommodationLogicText:
        "U víkendu a dovolené aplikace nabídne 3 možnosti podle zvoleného typu ubytování.",
      practicalPlan: "Praktický plán",
      practicalPlanText:
        "Součástí návrhu bude parkování, restaurace, itinerář a orientační rozpočet.",
      destination: "Destinace",
      accommodation: "Ubytování",
      restaurants: "Restaurace",
      parking: "Parkování",
      itinerary: "Itinerář",
      cost: "Cena",
      recommendation: "Doporučení",
      reset: "Nové vyhledávání",
      pdf: "Export do PDF",
      calendar: "Přidat do kalendáře",
      detail: "Zobrazit detail",
      map: "Otevřít mapu",
      exportTitle: "Exportovat itinerář",
      exportSoon: "Export doplníme v dalším kroku.",
      error: "Nepodařilo se vytvořit návrh. Zkus to prosím znovu.",
      foodLabel: "Bezlepkové",
    },
    en: {
      title: "Gluten-Free Trip Planner",
      subtitle: "Plan a family trip with gluten-free dining in mind",
      badge: "Family travel",
      basicInfo: "Basic information",
      fromPlaceholder: "Where are you departing from? E.g. Brno",
      destinationPlaceholder:
        "Where do you want to go? E.g. Slovakia, Liberec, Karlštejn",
      tripType: "Trip type",
      date: "Trip date",
      dateFrom: "Date from",
      dateTo: "Date to",
      budget: "Budget",
      dayTrip: "Day trip",
      weekend: "Weekend",
      vacation: "Vacation",
      suggest: "Suggest for me",
      travelers: "Who is traveling",
      dad: "Dad",
      mom: "Mom",
      daughter: "Daughter",
      son: "Son",
      accommodationPreference: "Accommodation type",
      anyAccommodation: "Recommend the best option",
      hotel: "Hotel / guesthouse",
      apartment: "Apartment",
      loading: "Preparing recommendation...",
      resultTitle: "Trip suggestion",
      currency: "EUR",
      budgetStep: 50,
      budgetMin: 50,
      budgetMax: 6000,
      considers: "What the app considers",
      diet: "Diet",
      dietWithSon:
        "Son is selected, so the app will prioritize gluten-free food options and safer dining recommendations.",
      dietWithoutSon:
        "Son is not selected, so restaurants and accommodation do not need to be limited to gluten-free options.",
      family: "Travelers",
      familyText: "The plan adapts to the selected travelers and trip length.",
      interests: "Castles and viewpoints",
      interestsText:
        "Recommendations will prioritize castles, chateaux, lookout towers and nature.",
      accommodationLogic: "Accommodation",
      accommodationLogicText:
        "For weekends and vacations, the app provides 3 accommodation options based on your preference.",
      practicalPlan: "Practical plan",
      practicalPlanText:
        "The recommendation includes parking, restaurants, itinerary and estimated budget.",
      destination: "Destination",
      accommodation: "Accommodation",
      restaurants: "Restaurants",
      parking: "Parking",
      itinerary: "Itinerary",
      cost: "Cost",
      recommendation: "Recommendation",
      reset: "New search",
      pdf: "Export to PDF",
      calendar: "Add to calendar",
      detail: "View details",
      map: "Open map",
      exportTitle: "Export itinerary",
      exportSoon: "Export will be added in the next step.",
      error: "Failed to generate the recommendation. Please try again.",
      foodLabel: "GF",
    },
  };

  const t = text[language];
  const glutenFreeRequired = travelers.includes("son");

function enrichQuery(query?: string) {
  const base = query || "";
  const place = destination || result?.mainDestination?.name || "";

  if (!base) return place;
  if (place && !base.toLowerCase().includes(place.toLowerCase())) {
    return `${base} ${place}`;
  }

  return base;
}

function createSearchLink(query?: string) {
  return `https://www.google.com/search?q=${encodeURIComponent(enrichQuery(query))}`;
}

function createMapLink(query?: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    enrichQuery(query)
  )}`;
}

  function formatBudget(value: number, lang: "cz" | "en" = language) {
    const currency = lang === "cz" ? "Kč" : "EUR";
    return `${value.toLocaleString(lang === "cz" ? "cs-CZ" : "en-US")} ${currency}`;
  }

  function getTripTypeLabel(type: TripType, lang: "cz" | "en") {
    if (lang === "cz") {
      if (type === "day") return "Jednodenní výlet";
      if (type === "weekend") return "Víkend";
      if (type === "vacation") return "Dovolená";
      if (type === "suggest") return "Nechám si doporučit";
      return "";
    }

    if (type === "day") return "Day trip";
    if (type === "weekend") return "Weekend";
    if (type === "vacation") return "Vacation";
    if (type === "suggest") return "Suggest for me";
    return "";
  }

  function getAccommodationPreferenceLabel(
    preference: AccommodationPreference,
    lang: "cz" | "en"
  ) {
    if (lang === "cz") {
      if (preference === "hotel") return "Hotel / penzion";
      if (preference === "apartment") return "Apartmán";
      if (preference === "any") return "Doporuč nejlepší možnost";
      return "not specified";
    }

    if (preference === "hotel") return "Hotel / guesthouse";
    if (preference === "apartment") return "Apartment";
    if (preference === "any") return "Recommend the best option";
    return "not specified";
  }

  function getButtonText() {
    if (loading) return t.loading;

    if (language === "cz") {
      if (!tripType) return "Navrhnout výlet";
      if (tripType === "day") return "Navrhnout jednodenní výlet";
      if (tripType === "weekend") return "Navrhnout víkend";
      if (tripType === "vacation") return "Navrhnout dovolenou";
      return "Doporučit výlet";
    }

    if (!tripType) return "Plan trip";
    if (tripType === "day") return "Plan day trip";
    if (tripType === "weekend") return "Plan weekend";
    if (tripType === "vacation") return "Plan vacation";
    return "Suggest a trip";
  }

  function toggleTraveler(traveler: string) {
    setTravelers((current) =>
      current.includes(traveler)
        ? current.filter((item) => item !== traveler)
        : [...current, traveler]
    );
  }

  async function generateTrip(
    requestLanguage: "cz" | "en" = language,
    requestBudget: number = budget
  ) {
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: requestLanguage === "cz" ? "Czech" : "English",
          departureCity,
          destination,
          tripType: getTripTypeLabel(tripType, requestLanguage),
          dateFrom,
          dateTo,
          budget: formatBudget(requestBudget, requestLanguage),
          travelers,
          glutenFreeRequired: travelers.includes("son"),
          accommodationPreference: getAccommodationPreferenceLabel(
            accommodationPreference,
            requestLanguage
          ),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      setResult(data);
    } catch (error) {
      console.error(error);
      setError(requestLanguage === "cz" ? text.cz.error : text.en.error);
    } finally {
      setLoading(false);
    }
  }

  function switchLanguage(nextLanguage: "cz" | "en") {
    if (nextLanguage === language) return;

    const convertedBudget =
      nextLanguage === "cz" ? Math.round(budget * 25) : Math.round(budget / 25);

    setLanguage(nextLanguage);
    setBudget(convertedBudget);
    setError("");
  }

  function resetSearch() {
    setResult(null);
    setError("");
    setTripType("");
    setDepartureCity("");
    setDateFrom("");
    setDateTo("");
    setDestination("");
    setAccommodationPreference("");
    setTravelers(["dad", "mom", "daughter", "son"]);
    setBudget(language === "cz" ? 10000 : 400);
  }

  function showExportSoon() {
    alert(t.exportSoon);
  }
  function formatCostDetail(detail: string | { item?: string; cost?: string }) {
  if (typeof detail === "string") {
    return detail;
  }

  const item = detail.item || "";
  const cost = detail.cost || "";

  if (item && cost) return `${item}: ${cost}`;
  if (item) return item;
  if (cost) return cost;

  return "";
}
function formatFoodConfidence(value?: string) {
  const normalized = value?.toLowerCase();

  if (language === "cz") {
    if (normalized === "confirmed") return "potvrzeno";
    if (normalized === "mentioned") return "zmíněno v recenzích";
    if (normalized === "uncertain") return "nejisté – ověřit";
    if (normalized === "not_required") return "není vyžadováno";
    return value || "ověřit";
  }

  if (normalized === "confirmed") return "confirmed";
  if (normalized === "mentioned") return "mentioned in reviews";
  if (normalized === "uncertain") return "uncertain – verify";
  if (normalized === "not_required") return "not required";

  return value || "verify";
}
  const travelerOptions = [
    { key: "dad", label: t.dad, icon: "👨" },
    { key: "mom", label: t.mom, icon: "👩" },
    { key: "daughter", label: t.daughter, icon: "👧" },
    { key: "son", label: t.son, icon: "👦" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-6xl">
<div className="flex justify-end gap-2">
  <button
    onClick={() => switchLanguage("cz")}
    className={`flex min-h-11 items-center gap-2 rounded-xl px-5 py-2 text-base font-semibold transition ${
      language === "cz"
        ? "bg-slate-900 text-white shadow"
        : "bg-white text-slate-700 shadow-sm hover:bg-slate-100"
    }`}
  >
    <span className="relative inline-block h-3 w-5 overflow-hidden rounded-sm border border-slate-300 bg-white">
      <span className="absolute bottom-0 left-0 h-1/2 w-full bg-red-600" />
      <span className="absolute left-0 top-0 h-full w-1/2 bg-blue-700 [clip-path:polygon(0_0,100%_50%,0_100%)]" />
    </span>
    CZ
  </button>

  <button
    onClick={() => switchLanguage("en")}
    className={`flex min-h-11 items-center gap-2 rounded-xl px-5 py-2 text-base font-semibold transition ${
      language === "en"
        ? "bg-slate-900 text-white shadow"
        : "bg-white text-slate-700 shadow-sm hover:bg-slate-100"
    }`}
  >
    <span className="relative inline-block h-3 w-5 overflow-hidden rounded-sm border border-slate-300 bg-blue-700">
      <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-white" />
      <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-white" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-red-600" />
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-red-600" />
    </span>
    EN
  </button>
</div>

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm sm:mt-8 sm:p-8">
          <div className="mb-4 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            {t.badge}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {t.title}
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
            {t.subtitle}
          </p>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-2xl font-semibold text-slate-950">
              {t.basicInfo}
            </h2>

            <div className="mt-5 grid gap-4">
              <input
                list="departure-cities"
                value={departureCity}
                onChange={(event) => setDepartureCity(event.target.value)}
                placeholder={t.fromPlaceholder}
                className="min-h-14 rounded-2xl border border-slate-300 bg-white p-4 text-base text-slate-900 outline-none transition focus:border-slate-900"
              />

              <datalist id="departure-cities">
                {departureCities.map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>

              <input
                list="destinations"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                placeholder={t.destinationPlaceholder}
                className="min-h-14 rounded-2xl border border-slate-300 bg-white p-4 text-base text-slate-900 outline-none transition focus:border-slate-900"
              />

              <datalist id="destinations">
                {destinations.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>

              <select
                value={tripType}
                onChange={(event) => {
                  setTripType(event.target.value as TripType);
                  setDateFrom("");
                  setDateTo("");
                  setAccommodationPreference("");
                }}
                className={`min-h-14 rounded-2xl border border-slate-300 bg-white p-4 text-base outline-none transition focus:border-slate-900 ${
                  tripType ? "text-slate-900" : "text-slate-500"
                }`}
              >
                <option value="" disabled>
                  {t.tripType}
                </option>
                <option value="day">{t.dayTrip}</option>
                <option value="weekend">{t.weekend}</option>
                <option value="vacation">{t.vacation}</option>
                <option value="suggest">{t.suggest}</option>
              </select>

              {tripType === "day" && (
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-700">
                    {t.date}
                  </span>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(event) => setDateFrom(event.target.value)}
                    className="min-h-14 rounded-2xl border border-slate-300 bg-white p-4 text-base text-slate-900 outline-none transition focus:border-slate-900"
                  />
                </label>
              )}

              {(tripType === "weekend" || tripType === "vacation") && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-slate-700">
                      {t.dateFrom}
                    </span>
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(event) => setDateFrom(event.target.value)}
                      className="min-h-14 rounded-2xl border border-slate-300 bg-white p-4 text-base text-slate-900 outline-none transition focus:border-slate-900"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-slate-700">
                      {t.dateTo}
                    </span>
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(event) => setDateTo(event.target.value)}
                      className="min-h-14 rounded-2xl border border-slate-300 bg-white p-4 text-base text-slate-900 outline-none transition focus:border-slate-900"
                    />
                  </label>
                </div>
              )}

              {(tripType === "weekend" || tripType === "vacation") && (
                <select
                  value={accommodationPreference}
                  onChange={(event) =>
                    setAccommodationPreference(
                      event.target.value as AccommodationPreference
                    )
                  }
                  className={`min-h-14 rounded-2xl border border-slate-300 bg-white p-4 text-base outline-none transition focus:border-slate-900 ${
                    accommodationPreference
                      ? "text-slate-900"
                      : "text-slate-500"
                  }`}
                >
                  <option value="" disabled>
                    {t.accommodationPreference}
                  </option>
                  <option value="hotel">{t.hotel}</option>
                  <option value="apartment">{t.apartment}</option>
                  <option value="any">{t.anyAccommodation}</option>
                </select>
              )}

              <div className="rounded-2xl border border-slate-300 bg-white p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-medium text-slate-700">{t.budget}</span>
                  <span className="w-fit rounded-full bg-slate-100 px-4 py-2 text-base font-semibold text-slate-900">
                    {formatBudget(budget)}
                  </span>
                </div>

                <input
                  type="range"
                  min={t.budgetMin}
                  max={t.budgetMax}
                  step={t.budgetStep}
                  value={budget}
                  onChange={(event) => setBudget(Number(event.target.value))}
                  className="mt-5 w-full"
                />

                <div className="mt-2 flex justify-between text-xs text-slate-500">
                  <span>{formatBudget(t.budgetMin)}</span>
                  <span>{formatBudget(t.budgetMax)}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-300 bg-white p-4">
                <div className="mb-3 font-medium text-slate-700">
                  {t.travelers}
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {travelerOptions.map((person) => {
                    const selected = travelers.includes(person.key);

                    return (
                      <button
                        key={person.key}
                        type="button"
                        onClick={() => toggleTraveler(person.key)}
                        className={`rounded-2xl border p-3 text-sm font-semibold transition ${
                          selected
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="mr-1">{person.icon}</span>
                        {person.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => generateTrip()}
                disabled={loading}
                className="min-h-14 rounded-2xl bg-slate-900 p-4 text-base font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {getButtonText()}
              </button>
            </div>
          </div>

          <aside className="rounded-3xl bg-slate-900 p-5 text-white shadow-sm sm:p-6">
            <h2 className="text-2xl font-semibold">{t.considers}</h2>

            <div className="mt-5 grid gap-4 text-sm text-slate-200">
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="font-semibold text-white">{t.diet}</div>
                <p className="mt-1 leading-6">
                  {glutenFreeRequired ? t.dietWithSon : t.dietWithoutSon}
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <div className="font-semibold text-white">{t.family}</div>
                <p className="mt-1 leading-6">{t.familyText}</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <div className="font-semibold text-white">
                  {t.accommodationLogic}
                </div>
                <p className="mt-1 leading-6">{t.accommodationLogicText}</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <div className="font-semibold text-white">{t.interests}</div>
                <p className="mt-1 leading-6">{t.interestsText}</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <div className="font-semibold text-white">
                  {t.practicalPlan}
                </div>
                <p className="mt-1 leading-6">{t.practicalPlanText}</p>
              </div>
            </div>
          </aside>
        </section>

        {error && (
          <section className="mt-5 rounded-3xl bg-red-50 p-6 text-red-700 shadow-sm">
            {error}
          </section>
        )}

        {result && (
          <section className="mt-5 grid gap-5 pb-10">
            <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                {t.resultTitle}
              </div>
              <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
                {result.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                {result.suitability}
              </p>
            </div>

            {result.mainDestination && (
              <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">
                <h3 className="text-xl font-semibold text-slate-950">
                  📍 {t.destination}
                </h3>
                <h4 className="mt-3 text-lg font-semibold text-slate-900">
                  {result.mainDestination.name}
                </h4>
                <p className="mt-2 leading-7 text-slate-600">
                  {result.mainDestination.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">

{result.mainDestination.drivingTime && (
  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
    {language === "cz"
      ? `Cesta z ${departureCity || "výchozího místa"}: ${result.mainDestination.drivingTime}`
      : `Drive from ${departureCity || "departure point"}: ${result.mainDestination.drivingTime}`}
  </span>
)}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href={createSearchLink(result.mainDestination.searchQuery)}
                    target="_blank"
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                  >
                    {t.detail}
                  </a>
                  <a
                    href={createMapLink(result.mainDestination.searchQuery)}
                    target="_blank"
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
                  >
                    {t.map}
                  </a>
                </div>
              </div>
            )}

            {result.accommodationOptions &&
              result.accommodationOptions.length > 0 && (
                <div>
                  <h3 className="mb-3 text-xl font-semibold text-slate-950">
                    🏨 {t.accommodation}
                  </h3>
                  <div className="grid gap-4 lg:grid-cols-3">
                    {result.accommodationOptions.map((item, index) => (
                      <div
                        key={index}
                        className="rounded-3xl bg-white p-5 shadow-sm sm:p-6"
                      >
                        <div className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                          {item.type}
                        </div>
                        <h4 className="text-lg font-semibold text-slate-950">
                          {item.name}
                        </h4>
                        <p className="mt-2 leading-7 text-slate-600">
                          {item.description}
                        </p>
                        {item.foodInfo && (
                          <p className="mt-3 rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-800">
                            {item.foodInfo}
                          </p>
                        )}
                        {item.parking && (
                          <p className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
                            🅿️ {item.parking}
                          </p>
                        )}
                        {item.estimatedPrice && (
                          <p className="mt-3 font-semibold text-slate-900">
                            {item.estimatedPrice}
                          </p>
                        )}
                        <a
                          href={createSearchLink(item.searchQuery)}
                          target="_blank"
                          className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                        >
                          {t.detail}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {result.restaurants && result.restaurants.length > 0 && (
              <div>
                <h3 className="mb-3 text-xl font-semibold text-slate-950">
                  🍽️ {t.restaurants}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {result.restaurants.map((restaurant, index) => (
                    <div
                      key={index}
                      className="rounded-3xl bg-white p-5 shadow-sm sm:p-6"
                    >
                      <h4 className="text-lg font-semibold text-slate-950">
                        {restaurant.name}
                      </h4>
                      <p className="mt-2 leading-7 text-slate-600">
                        {restaurant.description}
                      </p>
                      <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
                        {t.foodLabel}: {formatFoodConfidence(restaurant.glutenFreeConfidence)}
                        {restaurant.distance ? ` · ${restaurant.distance}` : ""}
                      </div>
                      <div className="mt-3 grid gap-2 text-sm text-slate-600">
  {restaurant.rating && (
    <div className="rounded-2xl bg-slate-50 p-3">
      ⭐ {restaurant.rating}
    </div>
  )}

  {restaurant.address && (
    <div className="rounded-2xl bg-slate-50 p-3">
      📍 {restaurant.address}
    </div>
  )}
</div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <a
                          href={createSearchLink(restaurant.searchQuery)}
                          target="_blank"
                          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                        >
                          {t.detail}
                        </a>
                        <a
                          href={restaurant.googleMapsUri || createMapLink(restaurant.searchQuery)}
                          target="_blank"
                          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
                        >
                          {t.map}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.parking && (
              <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">
                <h3 className="text-xl font-semibold text-slate-950">
                  🅿️ {t.parking}
                </h3>
                <h4 className="mt-3 text-lg font-semibold text-slate-900">
                  {result.parking.name}
                </h4>
                <p className="mt-2 leading-7 text-slate-600">
                  {result.parking.description}
                </p>
                <a
                  href={createMapLink(result.parking.searchQuery)}
                  target="_blank"
                  className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                >
                  {t.map}
                </a>
              </div>
            )}

            {result.itinerary && result.itinerary.length > 0 && (
              <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">
                <h3 className="text-xl font-semibold text-slate-950">
                  🗓️ {t.itinerary}
                </h3>

                <div className="mt-5 grid gap-5">
                  {result.itinerary.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <h4 className="text-lg font-semibold text-slate-950">
                        {day.day}
                      </h4>

                      <div className="mt-4 grid gap-3">
                        {day.items?.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="grid gap-2 rounded-2xl bg-white p-4 shadow-sm sm:grid-cols-[90px_1fr]"
                          >
                            <div className="font-semibold text-slate-950">
                              {item.time}
                            </div>
                            <div className="leading-7 text-slate-700">
                              {item.activity}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.costEstimate && (
              <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">
                <h3 className="text-xl font-semibold text-slate-950">
                  💰 {t.cost}
                </h3>
                <div className="mt-3 w-fit rounded-full bg-slate-900 px-4 py-2 font-semibold text-white">
                  {result.costEstimate.total}
                </div>
                <ul className="mt-4 grid gap-2 text-slate-600">
                  {result.costEstimate.details?.map((detail, index) => (
  <li key={index} className="rounded-2xl bg-slate-50 p-3">
    {formatCostDetail(detail)}
  </li>
))}
                </ul>
              </div>
            )}
{result.whyRecommended && result.whyRecommended.length > 0 && (
  <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">
    <h3 className="text-xl font-semibold text-slate-950">
      {language === "cz"
        ? "Proč je tento výlet vhodný"
        : "Why this trip fits"}
    </h3>

    <ul className="mt-4 grid gap-2 text-slate-600">
      {result.whyRecommended.map((reason, index) => (
        <li key={index} className="rounded-2xl bg-emerald-50 p-3">
          {reason}
        </li>
      ))}
    </ul>
  </div>
)}
            <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-sm sm:p-6">
              <h3 className="text-xl font-semibold">{t.recommendation}</h3>
              <p className="mt-2 leading-7 text-slate-200">
                {result.finalRecommendation}
              </p>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-xl font-semibold text-slate-950">
                {t.exportTitle}
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <button
                  onClick={showExportSoon}
                  className="rounded-2xl bg-slate-900 p-4 font-semibold text-white"
                >
                  {t.pdf}
                </button>
                <button
                  onClick={showExportSoon}
                  className="rounded-2xl border border-slate-300 bg-white p-4 font-semibold text-slate-700"
                >
                  {t.calendar}
                </button>
                <button
                  type="button"
                  onClick={resetSearch}
                  className="rounded-2xl border border-slate-300 bg-white p-4 font-semibold text-slate-700"
                >
                  {t.reset}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}