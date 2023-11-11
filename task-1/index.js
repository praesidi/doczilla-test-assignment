import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// TODO: try to get rid of the variable
const fileNamesList = {};

function getAllTextFileNames(directory) {
	if (fs.readdirSync(directory).length < 1) return null;

	fs.readdirSync(directory).forEach((file) => {
		const filePath = path.join(directory, file);
		const isFile = fs.statSync(filePath).isFile();
		const isFolder = fs.lstatSync(filePath).isDirectory();

		if (isFile && path.extname(file) === ".txt") {
			fileNamesList[file] = filePath;
		}

		if (isFolder) {
			getAllTextFileNames(filePath);
		}
	});

	return fileNamesList;
}

function concatTextFiles(directoryPath, outputFileName) {
	getAllTextFileNames(directoryPath);

	const sortedFileNames = Object.keys(fileNamesList).sort();
	let concatenatedContent = "";

	sortedFileNames.forEach((fileName) => {
		const fileContent = fs.readFileSync(fileNamesList[fileName], "utf8");
		concatenatedContent += fileContent;
	});

	const rootDirectory = path.dirname(fileURLToPath(import.meta.url));
	const outputPath = path.join(rootDirectory, outputFileName);
	fs.writeFileSync(outputPath, concatenatedContent);
}

const directoryPath = "test folder";
const outputFileName = "result.txt";

concatTextFiles(directoryPath, outputFileName);
