import * as functions from 'firebase-functions';
const fetch = require('node-fetch');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const getStationData = functions.https.onRequest(async (req, res) => {
	functions.logger.info('Retrieving station data...!', { structuredData: true });

	res.header('Access-Control-Allow-Origin', '*');

	if (req.method === 'OPTIONS') {
		// Send response to OPTIONS requests
		res.set('Access-Control-Allow-Methods', 'GET');
		res.set('Access-Control-Allow-Headers', 'Content-Type');
		res.set('Access-Control-Max-Age', '3600');
		res.status(204).send('');
	} else {
		const response = await fetch('https://www.salzburg.gv.at/lawine/Station.js', {
			headers: { 'Content-Type': 'application/javascript' }
		});

		const body = await response.text();
		let jsonResponse = body;

		if (body.startsWith('stationData = ')) jsonResponse = jsonResponse.slice(13);
		jsonResponse = JSON.parse(jsonResponse);

		res.status(200).json(jsonResponse);
	}
});
