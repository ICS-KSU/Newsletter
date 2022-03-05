import { promises as fs } from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import render from "preact-render-to-string";

const templatesUrl = pathToFileURL("templates/")
const outputUrl = pathToFileURL("dist/")

const files = await fs.readdir(fileURLToPath(templatesUrl));

for (const file of files) {
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
