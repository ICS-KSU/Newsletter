import { promises as fs } from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import render from "preact-render-to-string";

const templatesUrl = pathToFileURL("templates/")
const resourcesUrl = pathToFileURL("resources/")
const outputUrl = pathToFileURL("dist/")

const templates = await fs.readdir(fileURLToPath(templatesUrl));

for (const file of templates) {
	if (/^_/.test(file)) continue;
	if (!/\.js$/.test(file)) continue;
	const outfile = new URL(file.replace(/\.js$/, ".html"), outputUrl);
	const path = new URL(file, templatesUrl);
	const { title: pageTitle, body: pageBody, layout: pageLayout } = await import(path);
	const body = typeof (pageBody) === "function" ? await pageBody() : pageBody;
	const { layout } = await import(new URL(pageLayout ?? "_layout.js", templatesUrl));
	const output = render(layout({ title: pageTitle, body }));
	await fs.writeFile(fileURLToPath(outfile), output);
}

const resources = await fs.readdir(fileURLToPath(resourcesUrl));

for (const file of resources) {
	const outfile = new URL(file, outputUrl);
	const path = new URL(file, resourcesUrl);
	await fs.copyFile(fileURLToPath(path), fileURLToPath(outfile));
}
