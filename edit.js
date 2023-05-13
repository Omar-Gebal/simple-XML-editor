let save = () => {
    //get the values from the <select> elements
    let fitness = document.getElementById('fitness-select').value;
    let sport = document.getElementById('sport-select').value;
    let speed = document.getElementById('speed-select').value;
    let tallness = document.getElementById('tallness-select').value;
    let weight = document.getElementById('weight-select').value;
    //find the rule that matches the sport
    for (let i = 0; i < rules.length; i++) {
        console.log(rules[i].getAttribute("game"));
        if (rules[i].getAttribute("game") === sport) {
            let tuples = rules[i].getElementsByTagName("Tuple");
            for (let j = 0; j < tuples.length; j++) {
                if (tuples[j].getAttribute("Prop") === "fitness") {
                    tuples[j].setAttribute("Val", fitness);
                }
                if (tuples[j].getAttribute("Prop") === "speed") {
                    tuples[j].setAttribute("Val", speed);
                }
                if (tuples[j].getAttribute("Prop") === "tallness") {
                    tuples[j].setAttribute("Val", tallness);
                }
                if (tuples[j].getAttribute("Prop") === "weight") {
                    tuples[j].setAttribute("Val", weight);
                }
            }
        }
    }
    //print the xml
    let serializer = new XMLSerializer();
    let xmlString = serializer.serializeToString(xmlDoc);
    //select new-xml and save the xml to its value
    let newXml = document.getElementById('new-xml');
    //animate newXml to shine red for 0.1 seconds
    newXml.style.color = "lightpink";
    setTimeout(() => {
        newXml.style.color = "rgb(108, 255, 108)";
    }, 500);
    newXml.innerText = xmlString;
    //save the xml to local storage
    localStorage.setItem("xml", xmlString);
}
let populate = () => {

    //add xmlString to the new-xml element
    let newXml = document.getElementById('new-xml');
    newXml.innerText = xmlString;
    //get a list of games from the xml text
    let games = [];
    let levels = ['low', 'medium', 'high'];
    for (let i = 0; i < rules.length; i++) {
        games.push(rules[i].getAttribute("game"));
    }
        
    // Get a reference to the <select> elements
    const fitnessSelect = document.getElementById('fitness-select');
    const sportSelect = document.getElementById('sport-select');
    const speedSelect = document.getElementById('speed-select');
    const tallnessSelect = document.getElementById('tallness-select');
    const weightSelect = document.getElementById('weight-select');

    // Populate the <select> elements with options from the list
    games.forEach(game => {
    const option = document.createElement('option');
    option.value = game;
    option.textContent = game;

    sportSelect.appendChild(option);
    });


    levels.forEach(level => {
        let option = document.createElement('option');
        option.value = level;
        option.textContent = level;
        fitnessSelect.appendChild(option);
    });
    
    levels.forEach(level => {
        let option = document.createElement('option');
        option.value = level;
        option.textContent = level;
        speedSelect.appendChild(option);
    });

    levels.forEach(level => {
        let option = document.createElement('option');
        option.value = level;
        option.textContent = level;
        tallnessSelect.appendChild(option);
    });

    levels.forEach(level => {
        let option = document.createElement('option');
        option.value = level;
        option.textContent = level;
        weightSelect.appendChild(option);
    });
}
let addNewGame = () => {
  // console.log("addNewGame");
  //get the game name from the input with id new-game
  let newGame = document.getElementById('new-game').value;
  //add a new rule to the xmlString
  let newRule = `  <Rule Name="r${rules.length + 1}" game="${newGame}">
          <Tuple Cpt="member" Prop="fitness" Val="low" />
          <Tuple Cpt="member" Prop="speed" Val="low" />
          <Tuple Cpt="member" Prop="tallness" Val="low" />
          <Tuple Cpt="member" Prop="weight" Val="low" />
        </Rule>
        `;
  //add the new rule to the xmlString
  xmlString = xmlString.replace("</Cluster>", newRule + "</Cluster>");
  // console.log(xmlString);
  //parse the new xmlString
  xmlDoc = parser.parseFromString(xmlString, "text/xml");
  rules = xmlDoc.getElementsByTagName("Rule");
     

  //repopulate the select elements
  save();
  //add the new game to the select element
  let sportSelect = document.getElementById('sport-select');
  let option = document.createElement('option');
  option.value = newGame;
  option.textContent = newGame;
  sportSelect.appendChild(option);
  //clear the new-game input
  document.getElementById('new-game').value = "";
  
}
let download = () => {
    let serializer = new XMLSerializer();
    let xmlString = serializer.serializeToString(xmlDoc);
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(xmlString));
    element.setAttribute('download', "new.xml");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
let repopulate = () => {
  //get chosen game
  let chosenGame = document.getElementById('sport-select').value;
  //set the fitness, speed, tallness, weight values to the values of the chosen game
  for (let i = 0; i < rules.length; i++) {
    if (rules[i].getAttribute("game") === chosenGame) {
      let tuples = rules[i].getElementsByTagName("Tuple");
      for (let j = 0; j < tuples.length; j++) {
        if (tuples[j].getAttribute("Prop") === "fitness") {
          document.getElementById('fitness-select').value = tuples[j].getAttribute("Val");
        }
        if (tuples[j].getAttribute("Prop") === "speed") {
          document.getElementById('speed-select').value = tuples[j].getAttribute("Val");
        }
        if (tuples[j].getAttribute("Prop") === "tallness") {
          document.getElementById('tallness-select').value = tuples[j].getAttribute("Val");
        }
        if (tuples[j].getAttribute("Prop") === "weight") {
          document.getElementById('weight-select').value = tuples[j].getAttribute("Val");
        }
      }
    }
  }
}

  let xml = `<?xml version="1.0" encoding="windows-1256"?>
  <Root>
    <Inference Name="differentiation_model">
      <Cluster Name="differentiation_model">
        <Rule Name="r1" game="Football">
          <Tuple Cpt="member" Prop="fitness" Val="high" />
          <Tuple Cpt="member" Prop="speed" Val="low" />
          <Tuple Cpt="member" Prop="tallness" Val="low" />
          <Tuple Cpt="member" Prop="weight" Val="low" />
        </Rule>
        <Rule Name="r2" game="Basketball">
          <Tuple Cpt="member" Prop="fitness" Val="high" />
          <Tuple Cpt="member" Prop="speed" Val="high" />
          <Tuple Cpt="member" Prop="tallness" Val="high" />
          <Tuple Cpt="member" Prop="weight" Val="high" />
        </Rule>
        <Rule Name="r3" game="Volleyball">
          <Tuple Cpt="member" Prop="fitness" Val="high" />
          <Tuple Cpt="member" Prop="speed" Val="medium" />
          <Tuple Cpt="member" Prop="tallness" Val="low" />
          <Tuple Cpt="member" Prop="weight" Val="medium" />
        </Rule>
        <Rule Name="r4" game="Tennis">
          <Tuple Cpt="member" Prop="fitness" Val="high" />
          <Tuple Cpt="member" Prop="speed" Val="high" />
          <Tuple Cpt="member" Prop="tallness" Val="high" />
          <Tuple Cpt="member" Prop="weight" Val="low" />
        </Rule>
        <Rule Name="r5" game="Swimming">
          <Tuple Cpt="member" Prop="fitness" Val="low" />
          <Tuple Cpt="member" Prop="speed" Val="low" />
          <Tuple Cpt="member" Prop="tallness" Val="low" />
          <Tuple Cpt="member" Prop="weight" Val="low" />
        </Rule>
      </Cluster>
    </Inference>
  </Root>`;

  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(xml, "text/xml");
  let rules = xmlDoc.getElementsByTagName("Rule");
  //print the xml
  let serializer = new XMLSerializer();
  let xmlString = serializer.serializeToString(xmlDoc);
  populate();
  //make eventlistener on download button that calls download function
  let downloadButton = document.getElementById('download-button');
  downloadButton.addEventListener('click', download);
  //make eventlistener on add button that calls addNewGame function
  let addButton = document.getElementById('new-game-button');
  addButton.addEventListener('click', addNewGame);

  const fileInput = document.getElementById('file-upload');

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {

      xmlDoc = parser.parseFromString(reader.result,"text/xml");
      let serializer = new XMLSerializer();
      xmlString = serializer.serializeToString(xmlDoc);
      rules = xmlDoc.getElementsByTagName("Rule");
      console.log(rules);
      save();
      populate();
    });

    reader.readAsText(file);
  });
  