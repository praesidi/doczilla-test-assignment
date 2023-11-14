import fs, { rmSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const fileNamesList = {};

function findAllTextFileNames(directory) {
	if (fs.readdirSync(directory).length < 1) return null;

	fs.readdirSync(directory).forEach((file) => {
		const filePath = path.join(directory, file);
		const isFile = fs.statSync(filePath).isFile();
		const isFolder = fs.lstatSync(filePath).isDirectory();

		if (isFile && path.extname(file) === ".txt") {
			fileNamesList[file] = filePath;
		}

		if (isFolder) {
			findAllTextFileNames(filePath);
		}
	});

	return fileNamesList;
}

const dependencyList = [];

function buildDependencyList() {
	Object.keys(fileNamesList).forEach((fileName, index) => {
		const fileContent = fs.readFileSync(fileNamesList[fileName], "utf-8");
		const matches = fileContent.match(/require `(.*?)`/g);
		if (matches) {
			matches.forEach((match) => {
				const dependency = match.replace(/['"`]+/g, "").match(/[^/]*$/)[0];
				const isLinked = dependencyList.some(
					(item) => item[dependency] === fileName
				);
				if (!isLinked) {
					dependencyList.push({ [fileName]: dependency });
				} else {
					throw "Linked Dependency";
				}
			});
		}
	});
}

function sortFiles() {
	const sortedFileNames = Object.keys(fileNamesList).sort();

	dependencyList.forEach((dependency) => {
		const fileIndex = sortedFileNames.indexOf(Object.keys(dependency)[0]);
		const dependencyIndex = sortedFileNames.indexOf(
			dependency[Object.keys(dependency)[0]]
		);

		const removedElement = sortedFileNames.splice(fileIndex, 1)[0];
		sortedFileNames.splice(dependencyIndex, 0, removedElement);
	});

	return sortedFileNames;
}

function concatTextFiles(directoryPath, outputFileName) {
	findAllTextFileNames(directoryPath);
	buildDependencyList();

	const sortedFiles = sortFiles();
	console.log(dependencyList, sortedFiles);
	let concatenatedContent = "";

	sortedFiles.forEach((fileName) => {
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
