import * as d3 from "d3";
import * as topojson from "topojson-client";
const spainJson = require("./spain.json");
const d3Composite = require("d3-composite-projections");
import { latLongCommunities, unemploymentRate2023Q4 } from "./communities";

const aProjection = d3Composite
  .geoConicConformalSpain()
  .scale(500)
  .translate([300, 900]);
const geoPath = d3.geoPath().projection(aProjection);

const geoJson = topojson.feature(spainJson, spainJson.objects.ESP_adm1);

aProjection.fitSize([1024, 800], geoJson as any);

const highestUnemploymentRate = unemploymentRate2023Q4.reduce(
  (max, item) => (item.value > max ? item.value : max),
  0
);

const unemploymentScale = d3
  .scaleLinear()
  .domain([0, highestUnemploymentRate])
  .range([0, 50]); //px

const calculateRadius = (communityName: string) => {
  const entry = unemploymentRate2023Q4.find(
    (item) => item.name === communityName
  );
  return entry ? unemploymentScale(entry.value) : 0;
};

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", 1024)
  .attr("height", 800)
  .attr("style", "background-color:rgb(197, 195, 157)");

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
  .attr("d", geoPath as any);

svg
  .selectAll("circle")
  .data(latLongCommunities)
  .enter()
  .append("circle")
  .attr("r", (d) => calculateRadius(d.name))
  .attr("cx", (d) => aProjection([d.long, d.lat])[0])
  .attr("cy", (d) => aProjection([d.long, d.lat])[1])
  .attr("class", "marker");
