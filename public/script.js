document.getElementById("buildButton").addEventListener("click", function() {
    console.log("docker-compose build hit");
    fetch("/build-command")
      .then(function(response) {
        if (response.ok) {
          console.log("Build Docker command executed successfully.");
        } else {
          console.error("Error executing the Build Docker command.");
        }
      })
      .catch(function(error) {
        console.error("Error executing the Build Docker command:", error);
      });
  });
  
  document.getElementById("upButton").addEventListener("click", function() {
    console.log("docker-compose up hit");
    fetch("/start-command")
      .then(function(response) {
        if (response.ok) {
          console.log("Start Docker command executed successfully.");
        } else {
          console.error("Error executing the Start Docker command.");
        }
      })
      .catch(function(error) {
        console.error("Error executing the Start Docker command:", error);
      });
  });
  
  document.getElementById("downButton").addEventListener("click", function() {
    fetch("/stop-command")
      .then(function(response) {
        if (response.ok) {
          console.log("Stop Docker command executed successfully.");
        } else {
          console.error("Error executing the Stop Docker command.");
        }
      })
      .catch(function(error) {
        console.error("Error executing the Stop Docker command:", error);
      });
  });
  