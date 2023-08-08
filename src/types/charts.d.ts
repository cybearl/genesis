declare namespace NsCharts {
    /**
     * Available chart types.
     */
    type lineChartType = "line-chart";

    /**
     * [SIMPLE FORMAT] Data for a line chart.
     */
    interface simpleLineChartData {
        values: number[];
    }
}


export default NsCharts;