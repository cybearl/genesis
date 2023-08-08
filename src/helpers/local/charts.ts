import fs from "fs";

import sharp from "sharp";
import vega, { Spec } from "vega";

import LineChart from "./charts/line-chart.json";


const view = new vega.View(vega.parse(LineChart as Spec), { renderer: "none" });

view.toSVG().then(async function (svg) {

    await sharp(Buffer.from(svg))
        .toFormat("png")
        .toFile("fileName.png");

}).catch(function (err) {
    console.error(err);
});