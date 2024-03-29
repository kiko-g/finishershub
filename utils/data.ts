import { Game } from "@/@types"

export const games: Game[] = ["All", "MW2019", "MW2022"]

export const tagsAndDescriptions = [
  { name: "None", description: "Nothing too special about the finishers in the clip" },
  { name: "Pernoca", description: "Involves at least one pernoca" },
  { name: "Self", description: "Involves opp self reviving and getting punished" },
  { name: "Public", description: "At least one opp teammate watching" },
  { name: "Co-op", description: "Finishers club cooperation aka tiki-taka" },
  { name: "Storm", description: "At least one finisher inside or very near the storm" },
  { name: "Insane", description: "Insane situation" },
  { name: "Edited", description: "Clip has been edited (is not raw)" },
  { name: "Hop", description: "At least one finisher happens after agile hop" },
  { name: "Hop V", description: "At least one finisher is done on the greenie balcony hop" },
  { name: "Angled", description: "Taboo player rotation (minimum 45 deg angle)" },
  { name: "Elite", description: "Clip is of absolute prime quality" },
  { name: "Endgame", description: "Finisher happens near the end of the game" },
  { name: "OG", description: "Clip is from the good old days" },
  { name: "Virgula", description: "At least one virgula: 180 degrees access to the back" },
].sort((a, b) => a.name.localeCompare(b.name))

export const tags = tagsAndDescriptions.map((item) => item.name).sort((a, b) => a.localeCompare(b))

export const authors = ["Bagger", "Levels", "Reicalo", "Koba", "Junhó", "Castro", "Japa", "Zé"].sort((a, b) =>
  a.localeCompare(b),
)

export const getMaps = (game: string) => {
  const mw2019Maps = ["Verdansk", "Rebirth", "Fortune's Keep"]
  const mw2022Maps = ["Al Mazrah", "Ashika"]

  if (game === "MW2019") return mw2019Maps
  else if (game === "MW2022") return mw2022Maps

  return [mw2019Maps, mw2022Maps].flat().sort((a, b) => a.localeCompare(b))
}

export const getLocations = (game: string, map: string) => {
  if (map === "Verdansk") {
    return verdanskLocations
  } else if (map === "Rebirth") {
    return rebirthLocations
  } else if (map === "Fortune's Keep") {
    return fortunesKeepLocations
  } else if (map === "Ashika") {
    return ashikaLocations
  } else if (map === "Al Mazrah") {
    return alMazrahLocations
  } else if (game === "MW2019") {
    return [verdanskLocations, rebirthLocations, fortunesKeepLocations].flat().sort((a, b) => a.localeCompare(b))
  } else if (game === "MW2022") {
    return [ashikaLocations, alMazrahLocations].flat().sort((a, b) => a.localeCompare(b))
  } else {
    return [verdanskLocations, rebirthLocations, fortunesKeepLocations, ashikaLocations, alMazrahLocations]
      .flat()
      .sort((a, b) => a.localeCompare(b))
  }
}

export const verdanskLocations = [
  "Gulag",
  "Military Base",
  "Quarry",
  "Dam",
  "Downtown",
  "Superstore",
  "Airport",
  "Storage Town",
  "Farmland",
  "Port",
  "Park",
  "Hospital",
  "Hills",
  "Lumber",
  "Prison",
  "Promenade East",
  "Promenade West",
  "Misc",
].sort((a, b) => a.localeCompare(b))

export const rebirthLocations = [
  "Living Quarters Main",
  "Living Quarters Street",
  "Chemical Engineering",
  "Nova 6 Factory",
  "Decon Zone",
  "Control Center",
  "Security Area",
  "Harbor",
  "Bioweapon Labs",
  "Prison Top",
  "Prison Bottom",
  "Prison Lobby",
  "Prison Cafeteria",
  "Prison Courtyard",
  "Tower",
  "Tower House",
  "Greenie",
  "HQ",
  "Misc",
].sort((a, b) => a.localeCompare(b))

export const fortunesKeepLocations = [
  "Town",
  "Overlook",
  "Graveyard",
  "Terraces",
  "Gatehouse",
  "Grotto",
  "Keep",
  "Bay",
  "Winery",
  "Lighthouse",
  "Camp",
  "Smuggler's Cove",
].sort((a, b) => a.localeCompare(b))

export const alMazrahLocations = [
  "Gulag",
  "Airport",
  "Ahkdar Village",
  "Al Mazrah City",
  "Al Sharim Pass",
  "Caves",
  "Oasis",
  "Taraq Village",
  "Rohan Oil",
  "Quarry",
  "Hydroelectric",
  "Port",
  "Sa'id City",
  "Cemetery",
  "Sawah Village",
  "Sarrif Bay",
  "Fortress",
  "Observatory",
  "Marshlands",
].sort((a, b) => a.localeCompare(b))

export const ashikaLocations = [
  "Helicopter",
  "Tsuki Main",
  "Tsuki Dojo",
  "Tsuki Outer",
  "Factory",
  "Port",
  "Residential",
  "Farms",
  "Beach Club",
  "Town Center",
  "Shipwreck",
  "Vasco",
  "Misc",
].sort((a, b) => a.localeCompare(b))

export const socials = [
  {
    shown: true,
    label: "github",
    url: "https://github.com/kiko-g",
    svg: [
      "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z",
    ],
    viewBox: "0 0 496 512",
  },
  {
    shown: true,
    label: "twitch",
    url: "https://www.twitch.tv/scumbag_kiko",
    svg: [
      "M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z",
    ],
    viewBox: "0 0 512 512",
  },
  {
    shown: true,
    label: "twitter",
    url: "https://twitter.com/finishershub",
    svg: [
      "M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z",
    ],
    viewBox: "0 0 512 512",
  },
  {
    shown: true,
    label: "youtube",
    url: "https://www.youtube.com/@scumbag_kiko/videos",
    svg: [
      "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z",
    ],
    viewBox: "0 0 576 512",
  },
]
