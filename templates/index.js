import { promises as fs } from "fs";
import { html } from "htm/preact"

export const title = "Index of ICS Newsletters"

const templates = await fs.readdir("templates")

function toNewsletterListing(mjmlpath) {
  const mjmlName = mjmlpath.slice(0,mjmlpath.length - 5)
  return html`<div>
    <a href="./${mjmlName}.html">${mjmlName}</a>
  </div>`
}


export const body = html`
	<div>
		<h1>Newsletter Index</h1>
        ${templates.filter(file => /.mjml$/.test(file)).map(toNewsletterListing)}
	</div>
`
