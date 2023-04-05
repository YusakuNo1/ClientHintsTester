import express from 'express';

const app = express();
const port = 3000;

const requestClientHintsHistory = [];

app.get('/', async (req, res) => {
  requestClientHintsHistory.push({
    timeStamp: new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
    'sec-ch-viewport-width': req.headers['sec-ch-viewport-width'] as string,
    'sec-ch-viewport-height': req.headers['sec-ch-viewport-height'] as string,
    'sec-ch-prefers-color-scheme': req.headers['sec-ch-prefers-color-scheme'] as string,
    'device-memory': req.headers['device-memory'] as string,
    'downlink': req.headers['downlink'] as string,
    'ect': req.headers['ect'] as string,
    'rtt': req.headers['rtt'] as string,
  });
  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('accept-ch', 'sec-ch-viewport-width, sec-ch-viewport-height, sec-ch-prefers-color-scheme, device-memory, downlink, ect, rtt');

  res.write(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Client Hints Test Page</title>
      </head>
      <body>
        ${requestClientHintsHistory.map((requestClientHints) => {
          return `
            <div>
              <div>Seattle Time: ${requestClientHints['timeStamp']}</div>
              <div>sec-ch-viewport-width: ${requestClientHints['sec-ch-viewport-width']}</div>
              <div>sec-ch-viewport-height: ${requestClientHints['sec-ch-viewport-height']}</div>
              <div>sec-ch-prefers-color-scheme: ${requestClientHints['sec-ch-prefers-color-scheme']}</div>
              <div>device-memory: ${requestClientHints['device-memory']}</div>
              <div>downlink: ${requestClientHints['downlink']}</div>
              <div>ect: ${requestClientHints['ect']}</div>
              <div>rtt: ${requestClientHints['rtt']}</div>
            </div>
          `;
        }).join('<hr />')}
      </body>
    </html>`
  );

  res.end();
});

app.get('/clear', async (req, res) => {
  requestClientHintsHistory.splice(0, requestClientHintsHistory.length);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  res.write(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Client Hints Test Page</title>
      </head>
      <body>
      History is cleared.
      </body>
    </html>`
  );

  res.end();
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
