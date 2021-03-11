'use strict';
const PDFDocument = require('pdfkit');
const faker = require('faker');
const getStream = require('get-stream');
module.exports.test1 = async() => {
	const doc = new PDFDocument();
	const randomName = faker.name.findName();
	doc.text(randomName, {align: 'right'});
	doc.text(faker.address.streetAddress(), {align: 'right'});
	doc.text(faker.address.secondaryAddress(), {align: 'right'});
	doc.text(faker.address.zipCode() + ' ' + faker.address.city(), {align: 'right'});
	doc.moveDown();
	doc.text('Dear ' + randomName + ',');
	doc.moveDown();
	for (let i = 0; i < 3; i++) {
		doc.text(faker.lorem.paragraph());
		doc.moveDown();
	}
	doc.text(faker.name.findName(), {align: 'right'});
	doc.end();
	const pdfBuffer = await getStream.buffer(doc);
	const pdfBase64 = pdfBuffer.toString('base64');
	return {
		statusCode: 200,
		headers: {
			'Content-Length': Buffer.byteLength(pdfBase64),
			'Content-Type': 'application/pdf',
			'Content-disposition': 'attachment;filename=test.pdf'
		},
		isBase64Encoded: true,
		body: pdfBase64
	};
};
module.exports.test2 = async(event) => {
	const {headers, multiValueHeaders, requestContext, body} = event;
	const res = typeof body === 'object' ? JSON.stringify(body) : body;
	return {
		statusCode: 200,
		headers: {
			'Content-Type': 'application/json',
		},
		body: res,
	};
};
