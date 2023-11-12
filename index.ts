import { load } from "cheerio";

const BASE_URL = "https://rte.orpgujarat.com/Common/SchoolList";

// pathe where you want to save this json data
const PATH_NAME = "data_final.json";

// enum in sequence of original table so i dont have to remember the index of <td> in <tr>
enum Data {
  SchoolName,
  Address,
  Ward,
  District,
  Board,
  Type,
  Medium,
  Location,
}

let json = [];

for (let j = 1; j < 991; j++) {
  console.log("Getting Data for page " + BASE_URL + "?page=" + j);

  // Gets the data from respective page url and convert into text
  const data = await fetch(BASE_URL + "?page=" + j);
  const text = await data.text();
  console.log("Got Data for page ");

  // loads text into cheerio
  const $ = load(text);

  // Rows of table
  const tr = $("tr")
    .map((_, el) => $(el))
    .toArray();
  console.log("Scraping The data from page ");

  // loop through all row of table and get data from <td> tag
  for (let i = 1; i < tr.length; i++) {
    const row = tr[i];
    const rawData = row
      .children("td")
      .map((_, el) => $(el))
      .toArray();

    const data = {
      schoolName: sanitizeText(rawData[Data.SchoolName].text()),

      // idk what this regex is but got it from here => https://stackoverflow.com/a/1493071
      diseCode: sanitizeText(rawData[Data.SchoolName].text()).match(
        /\[(.*?)\]/
      )![1],
      address: sanitizeText(rawData[Data.Address].text()),
      ward: sanitizeText(rawData[Data.Ward].text()),
      district: sanitizeText(rawData[Data.District].text()),
      board: sanitizeText(rawData[Data.Board].text()),
      type: sanitizeText(rawData[Data.Type].text()),
      medium:
        rawData[Data.Medium].text().split("\n").length > 2
          ? rawData[Data.Medium].text().split("\n")[2].trim()
          : rawData[Data.Medium].text(),
      location: rawData[Data.Location]
        .children("a")
        .map((_, el) => $(el))
        .toArray()[0]
        .attr("href"),
    };
    json.push(data);
  }
}

function sanitizeText(text: string) {
  return text
    .split("\n")
    .map((text) => text.trim())
    .join(" ")
    .trim();
}

console.log(json.length);
await Bun.write(PATH_NAME, JSON.stringify({ data: json }));
