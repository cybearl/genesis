import fs from "fs";


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