//templates/react/_layout.react.js
import { html } from "htm/preact";

export const layout = data => html`
<html>
	<head>
		<title>${data.title}</title>
	</head>
	<body>
		${data.body}
	</body>
</html>
`
