import * as d3 from "d3";
import * as topojson from "topojson-client";
const eurobasketjson = require("./eurobasket.json");
import { finalStandingsEurobasket2022 } from "./stats";

const colorScale = d3
  .scaleOrdinal([
    "gold",
    "silver",
    "#b58e4e", //bronze
    "#006400",
    "#6D9062",
    "#DFF8D5",
    "#74B2DF",
    "black",
  ])
  .domain([
    "champion",
    "runner-up",
    "bronze",
    "semifinals",
    "quarterfinals",
    "knockout-stage",
    "group-stage",
    "DSQ",
  ]);

const assignCountryColor = (country: string) => {
  const countryFound = finalStandingsEurobasket2022.find(
    (item) => item.country === country
  );
  return countryFound ? colorScale(countryFound.result) : "white";
};

const aProjection = d3.geoMercator().scale(500).translate([300, 900]);
const geoPath = d3.geoPath().projection(aProjection);

const geoJson = topojson.feature(
  eurobasketjson,
  eurobasketjson.objects.continent_Europe_subunits
);

aProjection.fitSize([1024, 800], geoJson as any);

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", 1024)
  .attr("height", 800)
  .attr("style", "background-color:rgb(216, 215, 197)");

const div = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

svg
  .selectAll("path")
  .data(geoJson["features"])
  .enter()
  .append("path")
  .attr("class", "country")
  .attr("d", geoPath as any)
  .style("fill", (d: any) => assignCountryColor(d.properties.geounit))
  .on("mouseover", function (mouseEvent: MouseEvent, datum: any) {
    const countryName = datum.properties.geounit;
    const countryResult = finalStandingsEurobasket2022.find(
      (item) => item.country === countryName
    );
    const result = countryResult ? countryResult.result : "DNQ";

    const coords = { x: mouseEvent.pageX, y: mouseEvent.pageY };
    div.transition().duration(200).style("opacity", 0.9);
    div
      .html(`<span>${countryName}: ${result}</span>`)
      .style("left", `${coords.x}px`)
      .style("top", `${coords.y - 28}px`);

    d3.select(this).attr("class", "selected-country");
  })
  .on("mouseout", function (d) {
    d3.select(this).attr("class", "country");
    div.transition().duration(600).style("opacity", 0);
  });
