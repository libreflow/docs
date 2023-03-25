import * as fs from "fs";

if(process.argv.length < 3) {
	console.log("Please provide the filepath of the summary.json file");
	process.exit(1);
}

const filePath = process.argv[2];

try {
	const jsonData = fs.readFileSync(filePath);

	const outline = JSON.parse(jsonData);

	createFoldersAndFiles(outline, './src/content/docs');
} catch(err) {
	console.log("Error reading or parsing the summary.json file: " + err.message);
	process.exit(1);
}

function secureKey(key, i) {
	return i.toString().padStart(2, "0") + "-" + key.toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-').replace(/[-]+/g, "-").replace(/^-+|-+$/g, "")
}

function createFoldersAndFiles(outline, path, section = "") {
	let i = 0;
	for(const key in outline) {
		let urlKey;

		if (typeof outline[key] == "string" && outline[key] !== "") {
			urlKey = secureKey(outline[key], i);
		} else {
			urlKey = secureKey(key, i)
		}

		const newPath = `${path}/${urlKey}`;

		if(typeof outline[key] == "string") {
			if (fs.existsSync(newPath + ".mdx")) {
				i++;
				continue;
			}
			// create a file if it is an empty array
			fs.writeFileSync(`${newPath}.mdx`, `---\ntitle: ${key}\nsection: ${section}\ndate: ${new Date().toISOString()}\n---`);
			console.log(`Created file ${newPath}.mdx`);
		} else {
			// create a folder and recursively call the function for non-empty arrays
			try {
				if (fs.existsSync(newPath)) {
					createFoldersAndFiles(outline[key], newPath, key);
					i++;
					continue;
				}
				fs.mkdirSync(newPath);
				createFoldersAndFiles(outline[key], newPath, key);
				console.log(`Created directory ${newPath}`);
				
			} catch(err) {
				console.log(`Error creating directory ${newPath}: ${err.message}`);
			}
		}
		i++;
	}
}
