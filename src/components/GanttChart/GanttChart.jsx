import { useState, useEffect, useCallback } from "react";
import * as d3 from "d3";
import "../../Styles/GanttChart.css"

const Days = {
    Sunday: Symbol("Sunday"),
    Monday: Symbol("Monday"),
    Tuesday: Symbol("Tuesday"),
    Wednesday: Symbol("Wednesday"),
    Thursday: Symbol("Thursday"),
    Friday: Symbol("Friday"),
    Saturday: Symbol("Saturday")
}

const GanttChart = (props) => {
    const [data] = useState([
        {
            id: 1,
            userId: 1,
            name: "Current Habit",
            isRepeating: true,
            daysOfTheWeek: new Set([Days.Monday, Days.Wednesday, Days.Friday]),
            startTime: new Date(Date.now()),
            endTime: new Date(Date.now() + 60 * 60000),
            description: "Habit taking place right now for 1 hour; repeats MWF.",
            color: '#03FCA5',
            percentCompletion: 75
        },
        {
            id: 2,
            userId: 1,
            name: "Past Todo",
            isRepeating: false,
            daysOfTheWeek: null,
            startTime: new Date(Date.now() - 180 * 60000),
            endTime: new Date(Date.now() + 240 * 60000),
            description: "One-time todo which took place 3 hours ago.",
            color: '#A103FC',
            percentCompletion: 75
        },
        {
            id: 3,
            userId: 1,
            name: "Future Todo",
            isRepeating: true,
            daysOfTheWeek: new Set([Days.Monday, Days.Wednesday, Days.Friday]),
            startTime: new Date(Date.now() + 120 * 60000),
            endTime: new Date(Date.now() + 180 * 60000),
            description: "Todo taking place in 2 hours; repeats MWF.",
            color: '#F403FC',
            percentCompletion: 75
        },
        {
            id: 4,
            userId: 1,
            name: "Past Habit",
            isRepeating: false,
            daysOfTheWeek: null,
            startTime: (function() {
                const date = new Date();
                date.setDate(date.getDate() - 1);
                date.setHours(date.getHours() + 2);
                return date;
            })(),
            endTime: (function() {
                const date = new Date();
                date.setDate(date.getDate() - 1);
                date.setHours(date.getHours() + 5);
                return date;
            })(),
            description: "Habit that took place 2 days in the past.",
            color: '#03DBFC',
            percentCompletion: 100
        },
        {
            id: 5,
            userId: 1,
            name: "Far Future Habit",
            isRepeating: false,
            daysOfTheWeek: null,
            startTime: (function() {
                const date = new Date();
                date.setDate(date.getDate() + 1);
                date.setHours(date.getHours() - 5);
                return date;
            })(),
            endTime: (function() {
                const date = new Date();
                date.setDate(date.getDate() + 1);
                date.setHours(date.getHours() - 3);
                return date;
            })(),
            description: "Habit taking place 2 days in the future.",
            color: '#AD8886',
            percentCompletion: 0
        },
        {
            id: 6,
            userId: 1,
            name: "Past Todo",
            isRepeating: false,
            daysOfTheWeek: null,
            startTime: new Date(Date.now() - 180 * 60000),
            endTime: new Date(Date.now() + 240 * 60000),
            description: "One-time todo which took place 3 hours ago.",
            color: '#A103FC',
            percentCompletion: 75
        },
        {
            id: 7,
            userId: 1,
            name: "Past Todo",
            isRepeating: false,
            daysOfTheWeek: null,
            startTime: new Date(Date.now() - 180 * 60000),
            endTime: new Date(Date.now() + 240 * 60000),
            description: "One-time todo which took place 3 hours ago.",
            color: '#A103FC',
            percentCompletion: 75
        },
        {
            id: 8,
            userId: 1,
            name: "Past Todo",
            isRepeating: false,
            daysOfTheWeek: null,
            startTime: new Date(Date.now() - 180 * 60000),
            endTime: new Date(Date.now() + 240 * 60000),
            description: "One-time todo which took place 3 hours ago.",
            color: '#A103FC',
            percentCompletion: 75
        }
    ]);

    const SVG_ID = 'gantt-chart-svg';
    const CHART_ID = 'gantt-chart-g';
    const X_AXIS_G_ID = 'gantt-x-axis-g'
    const Y_AXIS_G_ID = 'gantt-y-axis-g'
    const renderChart = useCallback(() => {
        // Chart dimension calculation
        let containerWidth, containerHeight, margin, tooltipPadding;
        if (props.containerWidth === undefined) {
            containerWidth = 720;
        }
        if (props.containerHeight === undefined) {
            containerHeight = 300;
        }
        if (props.margin === undefined) {
            margin = {
                top: 50,
                right: 20,
                bottom: 25,
                left: 100
            };
        }
        if (props.tooltipPadding === undefined) {
            tooltipPadding = 15;
        }
        const width = containerWidth - margin.left - margin.right;
        const height = containerHeight - margin.top - margin.bottom;

        // Create scales
        const xScale = d3.scaleTime()
            .range([0, width]);
        const yScale = d3.scaleBand()
            .range([0, height])
            .paddingInner(0.4)
            .paddingOuter(0.25);

        // Create axes
        const xAxis = d3.axisTop(xScale)
            .tickSizeOuter(0);
        const yAxis = d3.axisLeft(yScale)
            .tickFormat(function(d) {
                return d.substring(0, d.lastIndexOf("-"))
            })
            .tickSize(0);

        // Chart group appending
        let svg = d3.select('#' + SVG_ID);
        let chart, xAxisG, yAxisG;
        if (svg.empty()) {
            svg = d3.select('.gantt-chart').append('svg')
                .attr('id', SVG_ID)
                .attr('width', containerWidth)
                .attr('height', containerHeight);

            chart = svg.append('g')
                .attr('id', CHART_ID)
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            xAxisG = chart.append('g')
                .attr('id', X_AXIS_G_ID)
                .attr('class', 'axis x-axis')
                .style('font-size', 12)

            yAxisG = chart.append('g')
                .attr('id', Y_AXIS_G_ID)
                .attr('class', 'axis y-axis')
                .style('font-size', 12)
        } else {
            chart = d3.select('#' + CHART_ID);
            xAxisG = d3.select('#' + X_AXIS_G_ID);
            yAxisG = d3.select('#' + Y_AXIS_G_ID);
        }

        // UpdateVis()
        const xValue = d => d.startTime;
        const yValue = d => d.name;

        // Set domains and filter/format data
        const xDomainStart = Date.now() - 24 * 60 * 60 * 1000;
        const xDomainEnd = Date.now() + 24 * 60 * 60 * 1000;
        const filteredData = data.filter(d => xDomainStart <= d.endTime && d.startTime <= xDomainEnd);
        const formattedData = filteredData.map((d, i) => {
            d.name = d.name +  '-' + i; // This allows for duplicate habit/to do names
            return d;
        }).sort((a, b) => a.startTime - b.startTime);
        xScale.domain([xDomainStart, xDomainEnd])
        yScale.domain(formattedData.map(yValue));

        // RenderVis()
        // Add vertical line for current time
        const xCoordNow = xScale(Date.now()) + margin.left;
        svg.append("circle")
            .attr("class", "circle")
            .attr("cx", xCoordNow)
            .attr("cy", margin.top)
            .attr("r", 5)
        svg.append("line")
            .attr("class", "line")
            .attr("x1", xCoordNow)
            .attr("y1", margin.top)
            .attr("x2", xCoordNow)
            .attr("y2", height + margin.top)
            .style("stroke-width", 2)
            .style("stroke", "black")
            .style("fill", "none");

        // Add bars
        let bars = chart.selectAll('.bar')
            .data(filteredData, d => d.id)
            .join('rect');

        // Style bars
        bars.style('opacity', 0.5)
            .style('opacity', 1)
            .attr('class', 'bar')
            .attr('x', d => {
                const x = xScale(xValue(d));
                if (x < 0) {
                    return 0
                }
                return x;
            })
            .attr('width', d => {
                const scaledWidth = xScale(d.endTime - d.startTime + xDomainStart);
                let x = xScale(xValue(d));
                if (x < 0) {
                    x = 0
                }
                if (x + scaledWidth > xScale(xDomainEnd)) {
                    return xScale(xDomainEnd) - x;
                }
                return scaledWidth;
            })
            .attr('height', yScale.bandwidth())
            .attr('y', d => yScale(yValue(d)))
            .attr('fill', d => d.color)
            .attr('stroke-width', 1)
            .attr('stroke', 'black');

        // Tooltip event listeners
        bars.on('mouseover', (event,d) => {
                d3.select('#gantt-chart-tooltip')
                    .style('display', 'block')
                    .style('left', (event.pageX + tooltipPadding) + 'px')
                    .style('top', (event.pageY + tooltipPadding) + 'px')
                    .html(`
              <div class="tooltip-title">${d.name}</div>
              <div><i>Completion: ${d.percentCompletion}%</i></div>
              <div><i>Start Time: ${d.startTime.toLocaleTimeString()}</i></div>
              <div><i>End Time: ${d.endTime.toLocaleTimeString()}</i></div>
              <div>${d.description}</div>
            `);
            })
            .on('mousemove', (event) => {
                d3.select('#gantt-chart-tooltip')
                    .style('left', (event.pageX + tooltipPadding) + 'px')
                    .style('top', (event.pageY + tooltipPadding) + 'px')
            })
            .on('mouseleave', () => {
                d3.select('#gantt-chart-tooltip').style('display', 'none');
            });

        // Call axes
        xAxisG.call(xAxis);
        yAxisG.call(yAxis);

        // Reset data formatting
        formattedData.map(d => {
            d.name = d.name.substring(0, d.name.lastIndexOf("-"));
            return d;
        })
    }, [data, props]);

    // Update the chart if data changes
    useEffect(() => {
        renderChart();
    }, [data, props, renderChart]);

    // Update the chart on every minute change (to keep 'now' line accurate)
    // New instance of setTimeOut() every runClock() so no memory build-up due to garbage collector
    const runClock = () => {
        const now = new Date();
        const timeToNextTick = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
        setTimeout(() => {
           renderChart();
           runClock();
        }, timeToNextTick);
    }

    // Clock start
    runClock();

    return <div id="gantt-chart-tooltip"></div>
}

export default GanttChart;