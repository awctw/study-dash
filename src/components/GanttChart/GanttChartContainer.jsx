import GanttChart from "./GanttChart";

const GanttChartContainer = () => {
    return (
        <div className='bg-clip-border rounded-xl bg-white shadow-lg'>
            <h1 className='ml-10 mt-3 text-5xl font-bold leading-none tracking-tight dark:text-white'>Gantt Chart</h1>
            <div className='gantt-chart'>
                <GanttChart />
            </div>
        </div>
    );
}

export default GanttChartContainer;