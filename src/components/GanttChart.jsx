import { useState, useEffect } from "react";
import * as d3 from "d3";

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
                date.setDate(date.getDate() - 2);
                date.setHours(date.getHours() - 5);
                return date;
            })(),
            endTime: (function() {
                const date = new Date();
                date.setDate(date.getDate() - 2);
                date.setHours(date.getHours() - 3);
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
                date.setDate(date.getDate() + 2);
                date.setHours(date.getHours() - 5);
                return date;
            })(),
            endTime: (function() {
                const date = new Date();
                date.setDate(date.getDate() + 2);
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

    useEffect(() => {
        let vis = {};

        // Create initial scales
        vis.width = props.containerWidth - props.margin.left - props.margin.right;
        vis.height = props.containerHeight - props.margin.top - props.margin.bottom;

        // Create scales
        vis.xScale = d3.scaleTime()
            .range([0, vis.width]);

        vis.yScale = d3.scaleBand()
            .range([0, vis.height])
            .paddingInner(0.8);

        vis.xAxis = d3.axisTop(vis.xScale);

        vis.yAxis = d3.axisLeft(vis.yScale)
            .tickFormat(function(d) {
                return d.substring(0, d.lastIndexOf("-"))
            })
            .tickSize(0);

        vis.svg = d3.select(props.parentElement).append('svg')
            .attr('width', props.containerWidth)
            .attr('height', props.containerHeight);

        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${props.margin.left}, ${props.margin.top})`);

        vis.xAxisG = vis.chart.append('g')
            .attr('class', 'axis x-axis');

        vis.yAxisG = vis.chart.append('g')
            .attr('class', 'axis y-axis');

        vis.xValue = d => d.startTime;
        vis.yValue = d => d.name;

        const xDomainStart = Date.now() - 12 * 60 * 60 * 1000;
        const xDomainEnd = Date.now() + 12 * 60 * 60 * 1000;
        const filteredData = data.filter(d => xDomainStart <= d.startTime && d.endTime <= xDomainEnd);
        const formattedData = filteredData.map((d, i) => {
           d.name = d.name +  '-' + i;
           return d;
        });
        vis.xScale.domain([Date.now() - 12 * 60 * 60 * 1000, Date.now() + 12 * 60 * 60 * 1000])
        vis.yScale.domain(formattedData.map(vis.yValue));

        const xCoordNow = vis.xScale(Date.now()) + props.margin.left;
        vis.svg.append("circle")
            .attr("class", "circle")
            .attr("cx", xCoordNow)
            .attr("cy", props.margin.top)
            .attr("r", 5)
        vis.svg.append("line")
            .attr("class", "line")
            .attr("x1", xCoordNow)
            .attr("y1", props.margin.top)
            .attr("x2", xCoordNow)
            .attr("y2", vis.height + props.margin.top)
            .style("stroke-width", 2)
            .style("stroke", "black")
            .style("fill", "none");

        d3.select(props.parentElement)
            .style("overflow-y", "scroll")
            .style("-webkit-overflow-scrolling", "touch");

        let bars = vis.chart.selectAll('.bar')
            .data(filteredData, d => d.id)
            .join('rect');

        bars.style('opacity', 0.5)
            .style('opacity', 1)
            .attr('class', 'bar')
            .attr('x', d => vis.xScale(vis.xValue(d)))
            .attr('width', d => {
                const scaledWidth = vis.xScale(vis.xValue(d));
                const x = vis.xScale(vis.xValue(d));
                if (x + scaledWidth > vis.width) {
                    return vis.width - x
                }
                return scaledWidth;
            })
            .attr('height', vis.yScale.bandwidth())
            .attr('y', d => vis.yScale(vis.yValue(d)))
            .attr('fill', d => d.color);

        vis.xAxisG
            .transition().duration(1000)
            .call(vis.xAxis);

        vis.yAxisG.call(vis.yAxis);
    }, [data, props]);
}

export default GanttChart;