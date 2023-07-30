const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3123;


app.get('/build-command', (req, res) => {
  exec('echo a | sudo -S docker-compose build', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the Build Docker command: ${error.message}`);
      res.status(500).send('Error executing the Build Docker command');
    } else {
      console.log('Build Docker command executed successfully.');
      res.sendStatus(200);
    }
  });
});

app.get('/start-command', (req, res) => {
  exec('echo a | sudo -S docker-compose up', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the Start Docker command: ${error.message}`);
      res.status(500).send('Error executing the Start Docker command');
    } else {
      console.log('Start Docker command executed successfully.');
      res.sendStatus(200);
    }
  });
});

app.get('/stop-command', (req, res) => {
  exec('echo a | sudo -S docker-compose down', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the Stop Docker command: ${error.message}`);
      res.status(500).send('Error executing the Stop Docker command');
    } else {
      console.log('Stop Docker command executed successfully.');
      res.sendStatus(200);
    }
  });
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
