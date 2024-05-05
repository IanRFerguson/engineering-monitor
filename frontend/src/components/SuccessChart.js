import * as d3 from 'd3';
import { useState, useEffect } from 'react';

function SuccessChart() {
    const [averages, setAverages] = useState([]);
    useEffect(() => {
        fetch("daily_average")
            .then(
                response => response.json()
                    .then(
                        data => setAverages(data)
                    )
                )
            }, []
        )

    var color_ = '#F34605';

     /*   Define shape of chart   */
    // Chart metadata
    var margin = { top: 25, right: 30, bottom: 30, left: 60 },
        width = 1500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Create empty SVG to append details into
    var svg = d3.select("#successRateChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    /*   Define chart axes   */
    // X axis
    var x = d3.scaleTime()
        .domain(d3.extent(averages, function (d) { return Date.parse(d.day_run) }))
        .range([0, width])

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Y axis
    var y = d3.scaleLinear()
        // TODO - This could be dynamic
        .domain([0.75, 1.0])
        .range([height, 0])

    svg.append("g")
        .call(d3.axisLeft(y));

    /*   Setup dynamic components of chart   */
    // Tooltip
    const Tooltip = d3.select("#successRateChart")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

    const mouseover = function (event, d) {
        Tooltip
            .style("opacity", 1)
    }
    const mousemove = function (event, d) {
        Tooltip
            .html(`<b>Failed Workflows:</b> ${d.failed_}`)
            .style("left", `${event.layerX + 10}px`)
            .style("top", `${event.layerY}px`)
    }
    const mouseleave = function (event, d) {
        Tooltip
            .style("opacity", 0)
    }

    /*   Add line to SVG   */
    svg.append("path")
        .datum(averages)
        .attr("fill", "none")
        .attr("stroke", color_)
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function (d) { return x(Date.parse(d.day_run)) })
            .y(function (d) { return y(d.success_rate) })
        )


    /*   Add points to SVG   */
    svg.append("g")
        .selectAll("dot")
        .data(averages)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(Date.parse(d.day_run)) })
        .attr("cy", function (d) { return y(d.success_rate) })
        .attr("r", 5)
        .attr("fill", color_)
        .attr("class", "ppg_circle")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)


    return (
        <div class="successRateChart" id="successRateChart"></div>
    )
}

export default SuccessChart;