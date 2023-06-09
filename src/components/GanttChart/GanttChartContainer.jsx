import GanttChart from "./GanttChart";

const GanttChartContainer = () => {
    return (
        <div className='bg-clip-border rounded-xl bg-white shadow-lg'>
            <div className='gantt-chart'>
                <GanttChart />
            </div>
        </div>
    );
}

export default GanttChartContainer;