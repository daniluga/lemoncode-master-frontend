import * as d3 from "d3";
import * as topojson from "topojson-client";
const europejson = require("./europe.json");

const aProjection = d3.geoMercator().scale(500).translate([300, 900]);
const geoPath = d3.geoPath().projection(aProjection);

const geoJson = topojson.feature(
  europejson,
  europejson.objects.continent_Europe_subunits
);

aProjection.fitSize([1024, 800], geoJson as any);

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", 1024)
  .attr("height", 800)
  .attr("style", "background-color:rgb(190, 187, 149)");

svg
  .selectAll("path")
  .data(geoJson["features"])
  .enter()
  .append("path")
  .attr("class", "country")
  .attr("d", geoPath as any)
  .on("mouseover", function (d) {
    d3.select(this).attr("class", "selected-country");
  })
  .on("mouseout", function (d) {
    d3.select(this).attr("class", "country");
  });
