import fs from "fs";


/**
 * List all json files in a directory.
 * @param dirPath The path to the directory where to list the json files.
 * @param removeExtension If true, remove the '.json' extension from the file names.
 * @returns The list of json files.
 */
export function getJsonFiles(dirPath: string, removeExtension = true) {
    const files = fs.readdirSync(dirPath);
    const jsonFiles: string[] = [];

    for (const file of files) {
        if (file.endsWith(".json")) {
            let filename = file;

            if (removeExtension) {
                filename = file.slice(0, -5);
            }

            jsonFiles.push(filename);
        }
    }

    return jsonFiles;
}