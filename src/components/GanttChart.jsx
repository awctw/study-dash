import React, { useState, useEffect } from "react";
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

const GanttChart = () => {
    const [data, setData] = useState([
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
        }
    ]);
}

export default GanttChart;