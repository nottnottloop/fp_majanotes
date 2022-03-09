const fs = require("fs");

function createNewDataFile(file, err) {
	//this code is executed if the file does not exist (node calls this ENOENT). in this case, we will make a new file
	//we set the notesJson and notesData to nothing so that the rest of the code will work correctly
	console.log("\nError: " + err);
	console.log(`Creating new ${file}`);
	//check if data directory exists. if not, create it
	if (!fs.existsSync("data")) {
		fs.mkdirSync("data");
	}
}

module.exports = {
	createNewDataFile: createNewDataFile
}