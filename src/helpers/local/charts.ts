import vega, { Spec } from "vega";

import LineChart from "configs/templates/charts/line-chart.json";
import { convertVegaSvgToPng } from "helpers/local/files";
import NsCharts from "types/charts";


/**
 * Get the JSON template of a chart from its name.
 * @param chart The name of the chart.
 * @returns The JSON template of the chart (or the line chart if invalid).
 */
function getChartTemplateFromName(
    chart: NsCharts.lineChartType
) {
    switch (chart) {
        case "line-chart":
            return LineChart;
        default:
            return LineChart;
    }
}


/**
 * Generate a simple line chart from number array and export it as a PNG image.
 * @param filename The name of the file.
 * @param data The data to use for the chart, one array per line.
 */
export default async function generateLineChart(
    filename: string,
    data: number[][]
) {
    const rawTemplate = getChartTemplateFromName("line-chart");

    // Calculate width based on data length
    rawTemplate.width = 64 + (data.length * 32);

    // Default object
    const obj: {
        name: string;
        values: {
            x: number;
            y: number;
            c: number;
        }[];
    } = {
        name: "table",
        values: []
    };

    const values = [];

    for (const { index, line } of data.map((line, index) => ({ index, line }))) {
        for (let i = 0; i < line.length; i++) {
            values.push({
                x: i,
                y: line[i],
                c: index
            });
        }
    }

    // Add values to object
    obj.values = values;

    // Add object to template
    rawTemplate.data[0] = obj;

    // Vega view
    const view = new vega.View(vega.parse(LineChart as Spec), {
        renderer: "none"
    });

    const svgString = await view.toSVG();
    await convertVegaSvgToPng(svgString, __dirname, filename);
}
