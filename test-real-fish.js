const fs = require('fs');

// Read the fish image and convert to base64
const imageBuffer = fs.readFileSync('/tmp/test-fish.jpg');
const base64Image = imageBuffer.toString('base64');

console.log('Image size:', imageBuffer.length, 'bytes');
console.log('Base64 length:', base64Image.length, 'chars');

async function testAPI() {
  console.log('\nTesting production API with real fish image...');

  try {
    const response = await fetch('https://catch-to-table.vercel.app/api/identify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageBase64: base64Image
      })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const text = await response.text();
    console.log('\nResponse body:');
    console.log(text);

    if (response.ok) {
      try {
        const data = JSON.parse(text);
        console.log('\nParsed data:');
        console.log(JSON.stringify(data, null, 2));
      } catch (e) {
        console.error('Failed to parse JSON:', e.message);
      }
    }
  } catch (error) {
    console.error('Request failed:', error.message);
  }
}

testAPI();
