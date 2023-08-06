import React, {useEffect, useCallback, useRef} from "react";
import * as d3 from "d3";
import "../../Styles/GanttChart.css"
import {useDispatch, useSelector} from "react-redux";
import {getChartSettingsAsync} from "../../store/chartSettings/thunks";
import {Typography} from "@material-tailwind/react";
import {Player} from "@lottiefiles/react-lottie-player";
import thunk from "../../store/TODOList/thunk";

const GanttChart = (props) => {
    // Redux selectors and dispatch
    const user = useSelector((state) => state.loginReducer);
    const chartSettings = useSelector((state) => state.chartSettingsReducer.chartSettings);
    const todos = useSelector((state) => state.todoReducer.TODOList);
    const habits = useSelector((state) => state.habitReducer.habits);
    const categories = useSelector((state) => state.todoReducer.categories);
    const dispatch = useDispatch();

    // useRef needed for accessing up-to-date store in SetTimeout
    let upToDateChartSettings = useRef(chartSettings);
    let upToDateTodos = useRef(todos);
    let upToDateHabits = useRef(habits);
    let upToDateCategories = useRef(categories);
    let prevTimeout = useRef(-1);
    let currentTimeout = useRef(-1);

    // Function for string to Date handling
    const parseDate = function(date) {
        if (typeof date === 'string') {
            return Date.parse(date);
        }
        return date;
    };

    // Function for converting a Date 'startTime' to occur on the day, month, and year of 'currDate'
    const convertDateToSameDay = function(startTime, currDate) {
        // Date constructor usage is required since the variable is treated as a number
        let retDate = new Date(startTime).setMonth(currDate.getMonth());
        retDate = new Date(retDate).setDate(currDate.getDate());
        retDate = new Date(retDate).setFullYear(currDate.getFullYear());
        return retDate;
    }

    // Chart consts
    const SVG_ID = 'gantt-chart-svg';
    const X_AXIS_SVG_ID = 'gantt-chart-x-axis-svg';
    const CHART_ID = 'gantt-chart-g';
    const X_AXIS_G_ID = 'gantt-x-axis-g'
    const Y_AXIS_G_ID = 'gantt-y-axis-g'
    const CIRCLE_RADIUS = 5;
    const renderChart = useCallback(() => {
        // Filter data to see if the chart needs to be rendered
        const xDomainStart = Date.now() - upToDateChartSettings.current.axisTimeScale * 60 * 60 * 1000;
        const xDomainEnd = Date.now() + upToDateChartSettings.current.axisTimeScale * 60 * 60 * 1000;
        // 'Clone' upToDateTodos.current to bypass read-only for filtering for scaleBand duplicate title handling
        // (duplicate titles without this handling would appear in the same space rather than being different)
        let filteredData = JSON.parse(JSON.stringify(upToDateTodos.current));
        filteredData = filteredData.filter(d => Date.parse(d.endDate) - Date.parse(d.startDate) !== 0 &&
            xDomainStart <= Date.parse(d.endDate) && Date.parse(d.startDate) <= xDomainEnd);

        // Habit day of the week handling
        let currDate = new Date(xDomainStart);
        while (currDate <= xDomainEnd) { // Create habit entries for the days of the week they are on
            upToDateHabits.current.forEach((habit) => {
                if (!(habit.startTime === habit.endTime)) {
                    if (habit.days[currDate.getDay()]) {
                        const startDate = convertDateToSameDay(habit.startTime, currDate);
                        const endDate = convertDateToSameDay(habit.endTime, currDate);
                        if (xDomainStart <= endDate && startDate <= xDomainEnd && startDate < endDate) {
                            filteredData.push({
                                _id: habit["_id"],
                                title: habit.name,
                                startDate: startDate,
                                endDate: endDate
                            });
                        }
                    }
                }
            });
            currDate.setDate(currDate.getDate() + 1);
        }

        // Switch between chart and empty display
        const ganttChart = d3.select('.gantt-chart');
        if (filteredData.length === 0) {
            d3.select('#empty-chart-div').style('display', 'inline-block');
            ganttChart.style('overflow-y', 'visible');
            ganttChart.style('overflow-x', 'visible');
            d3.select('#gantt-chart-x-axis-svg').style('display', 'none');
            d3.select('#gantt-chart-svg').style('display', 'none');
            return;
        } else {
            d3.select('#empty-chart-div').style('display', 'none');
            ganttChart.style('overflow-y', 'auto');
            ganttChart.style('overflow-x', 'hidden');
            d3.select('#gantt-chart-x-axis-svg').style('display', 'block');
            d3.select('#gantt-chart-svg').style('display', 'block');
        }

        // Chart dimension calculation
        let containerWidth, containerHeight, margin, tooltipPadding;
        if (props.containerWidth === undefined) {
            containerWidth = 720;
        }
        if (props.margin === undefined) {
            margin = {
                top: 35,
                right: 20,
                bottom: 25,
                left: 70
            };
        }
        // Increasing containerHeight affects inner chart height
        if (props.containerHeight === undefined) {
            // Variable px per item; add 9 px for relative size
            containerHeight = margin.top + margin.bottom + (upToDateChartSettings.current.axisVerticalScale + 9) * filteredData.length;
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
                let retString = d.substring(0, d.lastIndexOf("-"));
                if (retString.length > 8) {
                    return retString.slice(0, 8) + '...';
                }
                return retString;
            })
            .tickSize(0);

        // Chart group appending
        let svg = d3.select('#' + SVG_ID);
        let chart, xAxisSVG, xAxisG, yAxisG;
        if (svg.empty()) {
            const container = d3.select('.gantt-chart');

            // Create a separate SVG for the x-axis and add background rect
            xAxisSVG = container.append('svg')
                .attr('id', X_AXIS_SVG_ID)
                .attr('width', containerWidth)
                .attr('height', margin.top + CIRCLE_RADIUS)
                .style('position', 'absolute');
            xAxisSVG.append('rect')
                .attr('width', containerWidth)
                .attr('height', margin.top)
                .style('fill', 'white');
            xAxisG = xAxisSVG.append('g')
                .attr('id', X_AXIS_G_ID)
                .attr('class', 'axis x-axis')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)
                .style('font-size', 12);

            svg = container.append('svg')
                .attr('id', SVG_ID)
                .attr('width', containerWidth)
                .attr('height', containerHeight);

            // Add overflow-y for scrolling
            chart = svg.append('g')
                .attr('id', CHART_ID)
                .attr('transform', `translate(${margin.left}, ${margin.top})`)
                .style("overflow-y", "scroll");

            yAxisG = chart.append('g')
                .attr('id', Y_AXIS_G_ID)
                .attr('class', 'axis y-axis')
                .style('font-size', 12);
        } else {
            chart = d3.select('#' + CHART_ID);
            xAxisSVG = d3.select('#' + X_AXIS_SVG_ID);
            xAxisG = d3.select('#' + X_AXIS_G_ID);
            yAxisG = d3.select('#' + Y_AXIS_G_ID);
            svg.attr('height', containerHeight);
        }

        // UpdateVis()
        const xValue = d => parseDate(d.startDate);
        const yValue = d => d.title;

        // Set domains and format data
        const formattedData = filteredData.map((d, i) => {
            d.title = d.title +  '-' + i; // This allows for duplicate habit/to do names
            return d;
        }).sort((a, b) => parseDate(a.startDate) - parseDate(b.startDate));
        xScale.domain([xDomainStart, xDomainEnd])
        yScale.domain(formattedData.map(yValue));

        // RenderVis()
        // Add/update vertical line for current time
        const xCoordNow = xScale(Date.now()) + margin.left;
        const CIRCLE_ID = "now-circle";
        const LINE_ID = "now-line";
        d3.select('#' + CIRCLE_ID).remove();
        d3.select('#' + LINE_ID).remove();
        xAxisSVG.append("circle")
            .attr("id", CIRCLE_ID)
            .attr("class", "circle")
            .attr("cx", xCoordNow)
            .attr("cy", margin.top)
            .attr("r", CIRCLE_RADIUS)
            .style("position", "absolute");
        svg.append("line")
            .attr("id", LINE_ID)
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
                const scaledWidth = xScale(parseDate(d.endDate) - parseDate(d.startDate) + xDomainStart);
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
            .attr('fill', (d) => {
                const categoryColor = upToDateCategories.current.find(c => c["_id"] === d.category);
                if (categoryColor !== undefined) {
                    return categoryColor.color;
                }
                return "#000000";
            })
            .attr('stroke-width', 1)
            .attr('stroke', 'black')
            .attr('rx', 3);

        // Tooltip event listeners
        bars.on('mouseover', (event,d) => {
            d3.select('#gantt-chart-tooltip')
                    .style('display', 'block')
                    .style('left', (event.pageX + tooltipPadding) + 'px')
                    .style('top', (event.pageY + tooltipPadding) + 'px')
                    .html(`
              <div class="tooltip-title">${d.title}</div>
              <div><i>Start Time: ${new Date(d.startDate).toLocaleTimeString()}</i></div>
              <div><i>End Time: ${new Date(d.endDate).toLocaleTimeString()}</i></div>
              <div><i>${function() {
                        if (d.category !== undefined) {
                            const category = upToDateCategories.current
                                .find(c => c["_id"] === d.category);
                            if (category !== undefined) {
                                return "Category: " + category.category;
                            }
                        }
                        return "";
                    }()}</i></div>
              <div>${function() {
                  if (d.description !== undefined) {
                      return d.description;
                  }
                  return "";
                    }()}</div>
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
            d.title = d.title.substring(0, d.title.lastIndexOf("-"));
            return d;
        })
    }, [props]);

    // Get chart settings on first render
    useEffect(() => {
        dispatch(thunk.getCategoryListAsync(user.user.userID));
        dispatch(getChartSettingsAsync(user.user.userID));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update the chart on every minute change (to keep 'now' line accurate)
    // New instance of setTimeOut() every runClock() so no memory build-up due to garbage collector
    const runClock = useCallback(() => {
        // Update the chart on every minute change (to keep 'now' line accurate)
        // New instance of setTimeOut() every runClock() so no memory build-up due to garbage collector
        const now = new Date();
        const timeToNextTick = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
        return setTimeout(() => {
            prevTimeout.current = currentTimeout.current;
            renderChart();
            currentTimeout.current = runClock();
            clearTimeout(prevTimeout.current);
        }, timeToNextTick);
    }, [renderChart]);

    // Sync ref variables and re-render chart whenever data, categories, or chartSettings changes
    useEffect(() => {
        if (todos !== null && habits !== null && chartSettings !== null && categories != null) {
            upToDateTodos.current = todos;
            upToDateHabits.current = habits;
            upToDateChartSettings.current = chartSettings;
            upToDateCategories.current = categories;
            renderChart();
            currentTimeout.current = runClock();
        }

        // Cleanup on unmount
        return () => {
            clearTimeout(prevTimeout.current);
            clearTimeout(currentTimeout.current);
        };

    }, [todos, habits, chartSettings, categories, renderChart, runClock]);

    return(
        <div>
            <div id="empty-chart-div">
                <Typography className="pt-2 px-5">
                    Nothing to display for the current time range.
                </Typography>
                <div className="flex items-center justify-center">
                    <Player
                        src={
                            "https://lottie.host/13926b54-ea64-4465-bbe6-2fc45507cb74/jiSPjnMiBV.json"
                        }
                        style={{ height: "100px", width: "200px", padding: 0 }}
                        autoplay
                        loop
                    />
                </div>
            </div>
            <div id="gantt-chart-tooltip"></div>
        </div>
    );
}

export default GanttChart;