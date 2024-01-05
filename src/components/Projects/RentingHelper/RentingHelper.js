import React, { useState, useEffect } from "react";
import d3tip from "d3-tip";
// import * as d3legend from "d3-legend";
import "./RentingHelper.css";
import * as d3modules from "d3"
// import { Legend } from 'react-d3-legends';
// import { legendColor } from "https://cdnjs.cloudflare.com/ajax/libs/d3-legend/2.13.0/d3-legend.js"
const d3 = {
    ...d3modules,
    tip: d3tip,
}


class RentingHelper extends React.Component {
    componentDidMount() {
        var margin = { top: 50, right: 200, bottom: 100, left: 200 }
            , width = 1400 - margin.left - margin.right
            , height = 850 - margin.top - margin.bottom;
        let neighborhoodData
        let predictedRent
        let summaryData

        let beds = '0'
        let baths = '1'
        let unit_type = "Condo"
        let laundry_val = 0
        let pets_val = 0
        let parking_val = 0
        let furnished_val = 0

        var bedrooms_options = ['0', '1', '2', '3', '4', '5']
        var bathrooms_options = ['1', '2', '3', '4']
        var unit_type_options = ['Condo', 'Co-op', 'Townhouse', 'Multi-family', 'Apartment', 'Building', 'House']

        let selectedNeighborhood

        var svg = d3.select("body")
            .append("svg")
            .attr("id", "map")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

        // Clickable background
        svg.append("rect")
            .attr("class", "background")
            .style("fill", "transparent")
            .attr("width", width)
            .attr("height", height)
            .on("click", function () {
                d3.selectAll(".neighborhood")
                    .transition()
                    .duration(200)
                    .style("opacity", 1)
                    .style("stroke", "#808080");

                // Deselect the neighborhood
                selectedNeighborhood = null

                //Remove the neighborhood summary
                d3.select("#summary").remove()
                d3.select('#colorLegend').remove()
                d3.select('#predicted_rent').remove()
                d3.select("#colour_indicators").remove()
            });

        //Input form
        var form = svg.append("foreignObject")
            .attr("width", 230)
            .attr("height", 220)
            .attr("x", 20)
            .attr("id", "form")
            .append("xhtml:body")

        //Bedrooms Dropdown
        form.append("text").text("Number of Bedrooms ").attr("id", "bedrooms_title")
        form.append("select")
            .attr("id", "bedroomsDropdown")
            .attr("class", "dropdown")
            .selectAll('myOptions')
            .data(bedrooms_options)
            .enter().append('option')
            .text(function (d) { return d })
            .attr("value", function (d) { return d })
        form.append('br')
        form.append('br')

        //Bathrooms Dropdown
        form.append("text").text("Number of Bathrooms ").attr("id", "bathrooms_title")
        form.append("select")
            .attr("id", "bathroomsDropdown")
            .attr("class", "dropdown")
            .selectAll('myOptions')
            .data(bathrooms_options)
            .enter().append('option')
            .text(function (d) { return d })
            .attr("value", function (d) { return d })
        form.append('br')
        form.append('br')

        //Unit Type Dropdown
        form.append("text").text("Unit Type ").attr("id", "unit_type_title")
        form.append("select")
            .attr("id", "unit_typeDropdown")
            .attr("class", "dropdown")
            .selectAll('myOptions')
            .data(unit_type_options)
            .enter().append('option')
            .text(function (d) { return d })
            .attr("value", function (d) { return d })
        form.append('br')
        form.append('br')

        //Laundry Checkbox
        form.append("input").attr('type', 'checkbox').attr("id", "laundry").attr("class", "checkbox").attr("class", "checkbox")
        form.append("text").text("Laundry in Building").attr("id", "laundry_title")
        form.append('br')
        //Pets Checkbox
        form.append("input").attr('type', 'checkbox').attr("id", "pets").attr("class", "checkbox")
        form.append("text").text("Pets Allowed").attr("id", "pets_title")
        form.append('br')
        //Parking Checkbox
        form.append("input").attr('type', 'checkbox').attr("id", "parking").attr("class", "checkbox")
        form.append("text").text("Parking Available").attr("id", "parking_title")
        form.append('br')
        //Furnished Checkbox
        form.append("input").attr('type', 'checkbox').attr("id", "furnished").attr("class", "checkbox")
        form.append("text").text("Furnished").attr("id", "furnished_title")

        //tooltip
        var tip = d3tip().attr('id', 'tooltip').style('border', '1px solid #fff')
            .style('box-shadow', '1px 1px 4px rgba(0,0,0,0.5)')
            .style('background', '#fff')
            .style('border-radius', 'none').html(function (d) { return d; });

        let drawMap = () => {
            var projection = d3.geoConicConformal().parallels([33, 45])
                .rotate([96, -39]).fitSize([width, height], neighborhoodData)
            var path = d3.geoPath().projection(projection);

            var rentColorScale = d3.scaleQuantile()
                .domain(predictedRent.filter((d) => d.rent !== null && d.rent > 0).map((d) => d.rent))
                .range(d3.schemeBlues[6]);

            var storesColorScale = d3.scaleQuantile()
                .domain(summaryData.filter((d) => d.number_stores !== null).map((d) => d.number_stores))
                .range(["#d7191c", "#fdae61", "#ffffbf", "#a6d96a", "#1a9641"]);

            var restaurantsColorScale = d3.scaleQuantile()
                .domain(summaryData.filter((d) => d.number_restaurants !== null).map((d) => d.number_restaurants))
                .range(["#d7191c", "#fdae61", "#ffffbf", "#a6d96a", "#1a9641"]);

            var crimeColorScale = d3.scaleQuantile()
                .domain(summaryData.filter((d) => d.crime_rate !== null && d.crime_rate !== "n/a").map((d) => d.crime_rate))
                .range(["#1a9641", "#a6d96a", "#ffffbf", "#fdae61", "#d7191c"]);

            var incomeColorScale = d3.scaleQuantile()
                .domain(summaryData.filter((d) => d.average_income !== null && d.crime_rate !== "n/a").map((d) => d.average_income))
                .range(["#d7191c", "#fdae61", "#ffffbf", "#a6d96a", "#1a9641"]);

            var legendColorScale = d3.scaleOrdinal()
                .domain(['Bottom 20%', '20%-40%', '40%-60%', '60%-80%', 'Top 80%'])
                .range(["#d7191c", "#fdae61", "#ffffbf", "#a6d96a", "#1a9641"]);

            let map = svg.append("g");

            map.call(tip)

            //Draw outlines
            map.selectAll('path')
                .data(neighborhoodData.features)
                .enter()
                .append('path')
                // Fill colour based on predicted rental price
                .attr("fill", function (d) {
                    var filtered = predictedRent.filter((val) => val.neighborhood === d.properties.NTAName)
                    var value = filtered.length > 0 ? filtered[0].rent : null

                    return value ? rentColorScale(value) : '#ccc'
                })
                .attr("stroke", "#808080")
                .attr("d", path)
                .attr('class', 'neighborhood')
                // Add tooltip on mouseover
                .on('mouseover', function (d) {
                    var filtered = predictedRent.filter((val) => val.neighborhood === d.properties.NTAName)
                        .filter((val) => val.bath_num === baths)
                        .filter((val) => val.bed_num === beds)
                        .filter((val) => val.unit_type === unit_type)
                        .filter((val) => val.laundry_in_building === laundry_val)
                        .filter((val) => val.pets_allowed === pets_val)
                        .filter((val) => val.parking_available === parking_val)
                        .filter((val) => val.furnished === furnished_val)
                    var rent = filtered.length > 0 ? "$" + filtered[0].rent : "--"

                    if (!selectedNeighborhood) {
                        d3.selectAll(".neighborhood")
                            .transition()
                            .duration(200)
                            .style("opacity", .5)
                            .style("stroke", "#BEBEBE");
                        d3.select(this)
                            .transition()
                            .duration(200)
                            .style("opacity", 1)
                            .style("stroke", "black");
                    }

                    tip.html("<strong> Neighborhood: </strong>" + d.properties.NTAName + "<br> <strong> Predicted Rent: </strong>" + rent)
                    tip.show()
                })
                .on('mouseout', function (d) {
                    if (!selectedNeighborhood) {
                        d3.selectAll(".neighborhood")
                            .transition()
                            .duration(200)
                            .style("opacity", 1)
                            .style("stroke", "#808080");
                    }

                    tip.hide()
                })
                .on('click', function (d) {
                    d3.selectAll(".neighborhood")
                        .transition()
                        .duration(200)
                        .style("opacity", .5)
                        .style("stroke", "#BEBEBE");
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    selectedNeighborhood = d.properties.NTAName
                    updateSummary()
                });

            // Create Legend
            var legend = svg.append("g").attr("id", "legend")
            svg.append("text").attr("id", "legendTitle").attr("x", 800).attr("y", 10).text("Predicted Rent")
            // var legend_data = legendColor().labelFormat(d3.format(".2f"))
            //     .scale(rentColorScale);

            // legend.attr("transform", "translate(" + 800 + ",20)").call(legend_data)

            // Update rental value when different # of beds/baths are selected
            function update() {
                // Update variables to the selected values
                beds = d3.select("#bedroomsDropdown").property("value")
                baths = d3.select("#bathroomsDropdown").property("value")
                unit_type = d3.select("#unit_typeDropdown").property("value")
                if (d3.select("#laundry").property("checked")) {
                    laundry_val = 1
                } else {
                    laundry_val = 0
                }
                if (d3.select("#pets").property("checked")) {
                    pets_val = 1
                } else {
                    pets_val = 0
                }
                if (d3.select("#parking").property("checked")) {
                    parking_val = 1
                } else {
                    parking_val = 0
                }
                if (d3.select("#furnished").property("checked")) {
                    furnished_val = 1
                } else {
                    furnished_val = 0
                }

                // Filter the data based on selection
                var filteredPredictions = predictedRent
                    .filter((val) => val.bath_num === baths)
                    .filter((val) => val.bed_num === beds)
                    .filter((val) => val.unit_type === unit_type)
                    .filter((val) => val.laundry_in_building === laundry_val)
                    .filter((val) => val.pets_allowed === pets_val)
                    .filter((val) => val.parking_available === parking_val)
                    .filter((val) => val.furnished === furnished_val)

                var rentColorScale = d3.scaleQuantile()
                    .domain(filteredPredictions.filter((d) => d.rent !== null).map((d) => d.rent))
                    .range(d3.schemeBlues[6]);

                // Update the map based on the filtered data
                svg.selectAll(".neighborhood").style("fill", function (d) {
                    var filtered = filteredPredictions.filter((val) => val.neighborhood === d.properties.NTAName)
                    var value = filtered.length > 0 ? filtered[0].rent : null
                    return value ? rentColorScale(value) : "#cccccc";
                }).on('mouseover', function (d) {
                    var filtered = predictedRent.filter((val) => val.neighborhood === d.properties.NTAName)
                        .filter((val) => val.bath_num === baths)
                        .filter((val) => val.bed_num === beds)
                        .filter((val) => val.unit_type === unit_type)
                        .filter((val) => val.laundry_in_building === laundry_val)
                        .filter((val) => val.pets_allowed === pets_val)
                        .filter((val) => val.parking_available === parking_val)
                        .filter((val) => val.furnished === furnished_val)
                    var rent = filtered.length > 0 ? "$" + filtered[0].rent : "--"

                    if (!selectedNeighborhood) {
                        d3.selectAll(".neighborhood")
                            .transition()
                            .duration(200)
                            .style("opacity", .5)
                            .style("stroke", "#BEBEBE");
                        d3.select(this)
                            .transition()
                            .duration(200)
                            .style("opacity", 1)
                            .style("stroke", "black");
                    }

                    tip.html("<strong> Neighborhood: </strong>" + d.properties.NTAName + "<br> <strong> Predicted Rent: </strong>" + rent)
                    tip.show()
                })
                    .on('mouseout', function (d) {
                        if (!selectedNeighborhood) {
                            d3.selectAll(".neighborhood")
                                .transition()
                                .duration(200)
                                .style("opacity", 1)
                                .style("stroke", "#808080");
                        }

                        tip.hide()
                    })
                    .on('click', function (d) {
                        d3.selectAll(".neighborhood")
                            .transition()
                            .duration(200)
                            .style("opacity", .5)
                            .style("stroke", "#BEBEBE");
                        d3.select(this)
                            .transition()
                            .duration(200)
                            .style("opacity", 1)
                            .style("stroke", "black");
                        selectedNeighborhood = d.properties.NTAName
                        updateSummary()
                    });

                // var legend = legendColor().labelFormat(d3.format(".2f"))
                //     .scale(rentColorScale);

                // svg.selectAll("#legend").call(legend)

                if (selectedNeighborhood) {
                    var filteredPredictionsSummary = filteredPredictions.filter((val) => val.neighborhood === selectedNeighborhood)

                    //Remove old predicted value
                    d3.select('#predicted_rent').remove()

                    // Show new Predicted Rent value in the neighbourhood summary
                    var showRent = svg.append("foreignObject").attr("width", 200)
                        .attr("height", 85)
                        .attr("x", 1100)
                        .attr("y", 255).attr("id", "predicted_rent").append("xhtml:body")
                    showRent.append('text').attr("id", "predicted_rent_title").text("Predicted Rent")
                    showRent.append('br')
                    showRent.append('text').attr("id", "predicted_change").html(filteredPredictionsSummary.length !== 0 && filteredPredictionsSummary[0].change > 1 ? "&#x2191;" + "" : filteredPredictionsSummary.length !== 0 ? "&#x2193;" + "" : "")
                    showRent.append('text').attr("id", "predicted_rent_num").text(filteredPredictionsSummary.length !== 0 ? "$" + filteredPredictionsSummary[0].rent : "--")
                }
            }

            // Trigger the update function on change of the dropdowns or checkboxes
            d3.select("#bedroomsDropdown").on("change", () => update())
            d3.select("#bathroomsDropdown").on("change", () => update())
            d3.select("#unit_typeDropdown").on("change", () => update())
            d3.selectAll(".checkbox").on("change", () => update())

            // Update the Summary when a neighbourhood is clicked
            function updateSummary() {
                //Remove previous summary
                d3.select("#summary").remove()
                d3.select('#colorLegend').remove()
                d3.select('#predicted_rent').remove()
                d3.select("#colour_indicators").remove()

                if (selectedNeighborhood) {

                    // Create summary
                    var summary = svg.append("foreignObject")
                        .attr("width", 550)
                        .attr("height", 270)
                        .attr("x", 800)
                        .attr("y", 200)
                        .attr("id", "summary")
                        .append("xhtml:body")

                    summary.append("h3").attr("class", "neighborhood_summary_title").text(selectedNeighborhood)

                    //Filter data based on the neighborhood that was clicked
                    var filteredSummaryData = summaryData.filter((val) => val.neighborhood === selectedNeighborhood)

                    var filteredPredictionsSummary = predictedRent
                        .filter((val) => val.bath_num === baths)
                        .filter((val) => val.bed_num === beds)
                        .filter((val) => val.unit_type === unit_type)
                        .filter((val) => val.laundry_in_building === laundry_val)
                        .filter((val) => val.pets_allowed === pets_val)
                        .filter((val) => val.parking_available === parking_val)
                        .filter((val) => val.furnished === furnished_val)
                        .filter((val) => val.neighborhood === selectedNeighborhood)

                    console.log(filteredPredictionsSummary)

                    // Add summary data
                    summary.append("text").attr("class", "neighborhood_summary_text").text("Number of Stores: " + filteredSummaryData[0].number_stores)
                    summary.append('br')
                    summary.append("text").attr("class", "neighborhood_summary_text").text("Number of Restaurants: " + filteredSummaryData[0].number_restaurants)
                    summary.append('br')
                    summary.append("text").attr("class", "neighborhood_summary_text").text(filteredSummaryData[0].crime_rate !== null && filteredSummaryData[0].crime_rate !== "n/a" ? "Crime: " + filteredSummaryData[0].crime_rate.toFixed(3) : "Crime: --")
                    summary.append('br')
                    summary.append("text").attr("class", "neighborhood_summary_text").text(filteredSummaryData[0].average_income !== null && filteredSummaryData[0].average_income !== "n/a" ? "Average Income: $" + filteredSummaryData[0].average_income.toLocaleString("en-US") : "Average Income: $--")
                    summary.append('br')

                    //  Show Predicted Rent value in the neighbourhood summary
                    var showRent = svg.append("foreignObject").attr("width", 200)
                        .attr("height", 85)
                        .attr("x", 1100)
                        .attr("y", 255).attr("id", "predicted_rent").append("xhtml:body")

                    showRent.append('text').attr("id", "predicted_rent_title").text("Predicted Rent")
                    showRent.append('br')
                    showRent.append('text').attr("id", "predicted_change").html(filteredPredictionsSummary.length !== 0 && filteredPredictionsSummary[0].change > 1 ? "&#x2191;" + " " : filteredPredictionsSummary.length !== 0 ? "&#x2193;" + " " : "")
                    showRent.append('text').attr("id", "predicted_rent_num").text(filteredPredictionsSummary.length !== 0 ? "$" + filteredPredictionsSummary[0].rent : "--")

                    // Add colour indicators to see how neighborhood compares to other NYC neighborhoods in each category
                    var colour_indicators = svg.append('g').attr("width", 500)
                        .attr("height", 400)
                        .attr("x", 800)
                        .attr("y", 200)
                        .attr("id", "colour_indicators")

                    colour_indicators.append('rect').attr("width", 15)
                        .attr("height", 15).attr("x", 820)
                        .attr("y", 265).attr("class", "neighborhood_summary_indicators").style("fill", storesColorScale(filteredSummaryData[0].number_stores)).style("stroke", "#808080")

                    colour_indicators.append('rect').attr("width", 15)
                        .attr("height", 15).attr("x", 820)
                        .attr("y", 285).attr("class", "neighborhood_summary_indicators").style("fill", restaurantsColorScale(filteredSummaryData[0].number_restaurants)).style("stroke", "#808080")

                    colour_indicators.append('rect').attr("width", 15)
                        .attr("height", 15).attr("x", 820)
                        .attr("y", 305).attr("class", "neighborhood_summary_indicators").style("fill", crimeColorScale(filteredSummaryData[0].crime_rate)).style("stroke", "#808080")

                    colour_indicators.append('rect').attr("width", 15)
                        .attr("height", 15).attr("x", 820)
                        .attr("y", 325).attr("class", "neighborhood_summary_indicators").style("fill", incomeColorScale(filteredSummaryData[0].average_income)).style("stroke", "#808080")

                    // Create Legend for Indicators
                    const colorLegendData = ['Bottom 20%', '20%-40%', '40%-60%', '60%-80%', 'Top 80%']

                    const colorLegend = d3.select('svg')
                        .append('g')
                        .attr('transform', 'translate(' + 820 + ',' + 430 + ')')
                        .attr("id", "colorLegend")

                    colorLegend.append("text").text("Compared to other NYC neighborhoods:").attr('transform', 'translate(0 ,' + -10 + ')')
                    const colorLegendSelect = colorLegend
                        .selectAll('g')
                        .data(colorLegendData)
                        .enter()
                        .append('g');

                    colorLegendSelect.append('rect')
                        .style('fill', (d, i) => legendColorScale(d))
                        .attr('height', 15)
                        .attr('width', 15)
                        .style("stroke", "#808080");

                    colorLegendSelect.append('text')
                        .attr('x', 18)
                        .attr('y', 10)
                        .attr('dy', '.15em')
                        .text((d, i) => d)
                        .style('text-anchor', 'start')
                        .style('font-size', 12);

                    // Space the groups out horizontally:
                    const padding = 10;
                    colorLegendSelect.attr('transform', function (d, i) {
                        return 'translate(' + (d3.sum(colorLegendData, function (e, j) {
                            if (j < i) { return colorLegendSelect.nodes()[j].getBBox().width; } else { return 0; }
                        }) + padding * i) + ',0)';
                    });
                }
            }
        }
        // read in the neighborhood geojson
        d3.json("ntas_2020.json").then(
            (data, error) => {
                if (error) {
                    console.log(error)
                } else {
                    neighborhoodData = data
                    //read in the predictions
                    d3.dsv(",", "predictions.csv", function (d) {
                        return {
                            neighborhood: d.neighborhood,
                            bed_num: d.bed_num,
                            bath_num: d.bath_num,
                            unit_type: d.unit_type,
                            laundry_in_building: +d.laundry_in_building,
                            pets_allowed: +d.pets_allowed,
                            parking_available: +d.parking_available,
                            furnished: +d.furnished,
                            rent: +d.rent,
                            change: +d.change
                        }
                    }).then(
                        (data, error) => {
                            if (error) {
                                console.log(error)
                            } else {
                                predictedRent = data
                                console.log(predictedRent)
                                //Read in the Summary
                                d3.dsv(",", "summary.csv", function (d) {
                                    return {
                                        neighborhood: d.neighborhood,
                                        number_stores: +d.number_stores,
                                        number_restaurants: +d.number_restaurants,
                                        crime_rate: +d.crime_rate,
                                        average_income: +d.average_income,
                                    }
                                }).then(
                                    (data, error) => {
                                        if (error) {
                                            console.log(error)
                                        } else {
                                            summaryData = data
                                            //Draw the map
                                            drawMap()
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
            }
        )
    }
    render() {
        return
    }
}

export default RentingHelper;


