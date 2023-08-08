import fs from "fs";

import sharp from "sharp";

import logger from "utils/logger";


/**
 * List all files with a specific extension, in a directory.
 * @param dirPath The path to the directory where to list the files.
 * @param extension The extension of the files to list.
 * @param removeExtension If true, removes the extension (optional, defaults to true).
 * @returns The list of files.
 */
export function getFiles(
    dirPath: string,
    extension: string,
    removeExtension = true
) {
    if (!fs.existsSync(dirPath)) {
        return [];
    }

    const allFiles = fs.readdirSync(dirPath);
    const filteredFiles: string[] = [];

    for (const file of allFiles) {
        if (file.endsWith(extension)) {
            let filename = file;

            if (removeExtension) {
                filename = file.slice(0, -extension.length);
            }

            filteredFiles.push(filename);
        }
    }

    return filteredFiles;
}


/**
 * Converts a SVG image generated via Vega to a PNG image and save it.
 * @param svg The SVG string to convert.
 * @param path The final path where to save the PNG.
 * @param filename The name of the file (optional, defaults to "chart").
 * @returns The path to the PNG image.<<
 */
export async function convertVegaSvgToPng(
    svg: string,
    path: string,
    filename = "chart"
) {
    const svgBuffer = Buffer.from(svg);

    try {
        await sharp(svgBuffer)
            .toFormat("png")
            .toFile(`${path}/${filename}.png`);
    } catch (err) {
        logger.error("Error while converting SVG to PNG:");
        console.error(err);
    }

    return `${path}/${filename}.png`;
}