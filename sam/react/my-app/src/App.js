import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var rosters = [{"member": "Schlitz", "score": 54, "squad": [{"gearTier": 11, "toonName": "Emperor Palpatine", "memberName": "Schlitz"}, {"gearTier": 11, "toonName": "Royal Guard", "memberName": "Schlitz"}, {"gearTier": 11, "toonName": "Stormtrooper Han", "memberName": "Schlitz"}, {"gearTier": 10, "toonName": "Sun Fac", "memberName": "Schlitz"}, {"gearTier": 11, "toonName": "TIE Fighter Pilot", "memberName": "Schlitz"}]}, {"member": "Ben", "score": 53, "squad": [{"gearTier": 11, "toonName": "Emperor Palpatine", "memberName": "Ben"}, {"gearTier": 10, "toonName": "Royal Guard", "memberName": "Ben"}, {"gearTier": 11, "toonName": "Stormtrooper Han", "memberName": "Ben"}, {"gearTier": 10, "toonName": "Sun Fac", "memberName": "Ben"}, {"gearTier": 11, "toonName": "TIE Fighter Pilot", "memberName": "Ben"}]}, {"member": "Revanchist", "score": 53, "squad": [{"gearTier": 11, "toonName": "Emperor Palpatine", "memberName": "Revanchist"}, {"gearTier": 10, "toonName": "Royal Guard", "memberName": "Revanchist"}, {"gearTier": 11, "toonName": "Stormtrooper Han", "memberName": "Revanchist"}, {"gearTier": 10, "toonName": "Sun Fac", "memberName": "Revanchist"}, {"gearTier": 11, "toonName": "TIE Fighter Pilot", "memberName": "Revanchist"}]}, {"member": "JED", "score": 52, "squad": [{"gearTier": 11, "toonName": "Emperor Palpatine", "memberName": "JED"}, {"gearTier": 9, "toonName": "Royal Guard", "memberName": "JED"}, {"gearTier": 11, "toonName": "Stormtrooper Han", "memberName": "JED"}, {"gearTier": 10, "toonName": "Sun Fac", "memberName": "JED"}, {"gearTier": 11, "toonName": "TIE Fighter Pilot", "memberName": "JED"}]}, {"member": "SpaceballsTheFlamethrower", "score": 52, "squad": [{"gearTier": 11, "toonName": "Emperor Palpatine", "memberName": "SpaceballsTheFlamethrower"}, {"gearTier": 10, "toonName": "Royal Guard", "memberName": "SpaceballsTheFlamethrower"}, {"gearTier": 11, "toonName": "Stormtrooper Han", "memberName": "SpaceballsTheFlamethrower"}, {"gearTier": 9, "toonName": "Sun Fac", "memberName": "SpaceballsTheFlamethrower"}, {"gearTier": 11, "toonName": "TIE Fighter Pilot", "memberName": "SpaceballsTheFlamethrower"}]}, {"member": "Knox2", "score": 51, "squad": [{"gearTier": 11, "toonName": "Finn", "memberName": "Knox2"}, {"gearTier": 11, "toonName": "Poe Dameron", "memberName": "Knox2"}, {"gearTier": 11, "toonName": "R2-D2", "memberName": "Knox2"}, {"gearTier": 8, "toonName": "Resistance Pilot", "memberName": "Knox2"}, {"gearTier": 10, "toonName": "Resistance Trooper", "memberName": "Knox2"}]}, {"member": "Teng", "score": 51, "squad": [{"gearTier": 11, "toonName": "Emperor Palpatine", "memberName": "Teng"}, {"gearTier": 10, "toonName": "Royal Guard", "memberName": "Teng"}, {"gearTier": 11, "toonName": "Stormtrooper Han", "memberName": "Teng"}, {"gearTier": 8, "toonName": "Sun Fac", "memberName": "Teng"}, {"gearTier": 11, "toonName": "TIE Fighter Pilot", "memberName": "Teng"}]}, {"member": "LudicrousSpeeed", "score": 49, "squad": [{"gearTier": 11, "toonName": "Emperor Palpatine", "memberName": "LudicrousSpeeed"}, {"gearTier": 10, "toonName": "Royal Guard", "memberName": "LudicrousSpeeed"}, {"gearTier": 11, "toonName": "Stormtrooper Han", "memberName": "LudicrousSpeeed"}, {"gearTier": 8, "toonName": "Sun Fac", "memberName": "LudicrousSpeeed"}, {"gearTier": 9, "toonName": "TIE Fighter Pilot", "memberName": "LudicrousSpeeed"}]}, {"member": "SwiftaGokun", "score": 49, "squad": [{"gearTier": 10, "toonName": "Emperor Palpatine", "memberName": "SwiftaGokun"}, {"gearTier": 10, "toonName": "Royal Guard", "memberName": "SwiftaGokun"}, {"gearTier": 11, "toonName": "Stormtrooper Han", "memberName": "SwiftaGokun"}, {"gearTier": 9, "toonName": "Sun Fac", "memberName": "SwiftaGokun"}, {"gearTier": 9, "toonName": "Teebo", "memberName": "SwiftaGokun"}]}, {"member": "Wicked1", "score": 49, "squad": [{"gearTier": 11, "toonName": "Emperor Palpatine", "memberName": "Wicked1"}, {"gearTier": 9, "toonName": "Royal Guard", "memberName": "Wicked1"}, {"gearTier": 11, "toonName": "Stormtrooper Han", "memberName": "Wicked1"}, {"gearTier": 9, "toonName": "Sun Fac", "memberName": "Wicked1"}, {"gearTier": 9, "toonName": "TIE Fighter Pilot", "memberName": "Wicked1"}]}, {"member": "Dowsekid", "score": 47, "squad": [{"gearTier": 10, "toonName": "Emperor Palpatine", "memberName": "Dowsekid"}, {"gearTier": 8, "toonName": "Royal Guard", "memberName": "Dowsekid"}, {"gearTier": 10, "toonName": "Stormtrooper Han", "memberName": "Dowsekid"}, {"gearTier": 8, "toonName": "Sun Fac", "memberName": "Dowsekid"}, {"gearTier": 11, "toonName": "TIE Fighter Pilot", "memberName": "Dowsekid"}]}, {"member": "Mercury", "score": 47, "squad": [{"gearTier": 11, "toonName": "Emperor Palpatine", "memberName": "Mercury"}, {"gearTier": 9, "toonName": "Royal Guard", "memberName": "Mercury"}, {"gearTier": 11, "toonName": "Stormtrooper Han", "memberName": "Mercury"}, {"gearTier": 7, "toonName": "Sun Fac", "memberName": "Mercury"}, {"gearTier": 9, "toonName": "TIE Fighter Pilot", "memberName": "Mercury"}]}, {"member": "SydosMoru", "score": 47, "squad": [{"gearTier": 10, "toonName": "Emperor Palpatine", "memberName": "SydosMoru"}, {"gearTier": 9, "toonName": "Royal Guard", "memberName": "SydosMoru"}, {"gearTier": 11, "toonName": "Stormtrooper Han", "memberName": "SydosMoru"}, {"gearTier": 7, "toonName": "Sun Fac", "memberName": "SydosMoru"}, {"gearTier": 10, "toonName": "TIE Fighter Pilot", "memberName": "SydosMoru"}]}, {"member": "Combs", "score": 44, "squad": [{"gearTier": 10, "toonName": "Emperor Palpatine", "memberName": "Combs"}, {"gearTier": 9, "toonName": "Royal Guard", "memberName": "Combs"}, {"gearTier": 9, "toonName": "Stormtrooper Han", "memberName": "Combs"}, {"gearTier": 8, "toonName": "Sun Fac", "memberName": "Combs"}, {"gearTier": 8, "toonName": "Teebo", "memberName": "Combs"}]}, {"member": "LaserBrain", "score": 42, "squad": [{"gearTier": 11, "toonName": "Emperor Palpatine", "memberName": "LaserBrain"}, {"gearTier": 11, "toonName": "Royal Guard", "memberName": "LaserBrain"}, {"gearTier": 11, "toonName": "Stormtrooper Han", "memberName": "LaserBrain"}, {"gearTier": 9, "toonName": "Teebo", "memberName": "LaserBrain"}]}, {"member": "Vexel", "score": 42, "squad": [{"gearTier": 11, "toonName": "Emperor Palpatine", "memberName": "Vexel"}, {"gearTier": 10, "toonName": "Royal Guard", "memberName": "Vexel"}, {"gearTier": 10, "toonName": "Sun Fac", "memberName": "Vexel"}, {"gearTier": 11, "toonName": "TIE Fighter Pilot", "memberName": "Vexel"}]}, {"member": "Juno", "score": 41, "squad": [{"gearTier": 11, "toonName": "Emperor Palpatine", "memberName": "Juno"}, {"gearTier": 10, "toonName": "Royal Guard", "memberName": "Juno"}, {"gearTier": 9, "toonName": "Stormtrooper Han", "memberName": "Juno"}, {"gearTier": 11, "toonName": "TIE Fighter Pilot", "memberName": "Juno"}]}, {"member": "KChizzy", "score": 41, "squad": [{"gearTier": 11, "toonName": "Emperor Palpatine", "memberName": "KChizzy"}, {"gearTier": 9, "toonName": "Royal Guard", "memberName": "KChizzy"}, {"gearTier": 11, "toonName": "Stormtrooper Han", "memberName": "KChizzy"}, {"gearTier": 10, "toonName": "Teebo", "memberName": "KChizzy"}]}, {"member": "KChizzy", "score": 41, "squad": [{"gearTier": 8, "toonName": "Finn", "memberName": "KChizzy"}, {"gearTier": 7, "toonName": "Poe Dameron", "memberName": "KChizzy"}, {"gearTier": 10, "toonName": "R2-D2", "memberName": "KChizzy"}, {"gearTier": 9, "toonName": "Resistance Pilot", "memberName": "KChizzy"}, {"gearTier": 7, "toonName": "Resistance Trooper", "memberName": "KChizzy"}]}, {"member": "Lazerhadden", "score": 41, "squad": [{"gearTier": 11, "toonName": "Emperor Palpatine", "memberName": "Lazerhadden"}, {"gearTier": 9, "toonName": "Royal Guard", "memberName": "Lazerhadden"}, {"gearTier": 11, "toonName": "Stormtrooper Han", "memberName": "Lazerhadden"}, {"gearTier": 10, "toonName": "Teebo", "memberName": "Lazerhadden"}]}, {"member": "Stratefyte", "score": 41, "squad": [{"gearTier": 11, "toonName": "Emperor Palpatine", "memberName": "Stratefyte"}, {"gearTier": 10, "toonName": "Royal Guard", "memberName": "Stratefyte"}, {"gearTier": 11, "toonName": "Stormtrooper Han", "memberName": "Stratefyte"}, {"gearTier": 9, "toonName": "TIE Fighter Pilot", "memberName": "Stratefyte"}]}, {"member": "Joraxa", "score": 39, "squad": [{"gearTier": 8, "toonName": "Chief Chirpa", "memberName": "Joraxa"}, {"gearTier": 11, "toonName": "Emperor Palpatine", "memberName": "Joraxa"}, {"gearTier": 9, "toonName": "Royal Guard", "memberName": "Joraxa"}, {"gearTier": 11, "toonName": "Stormtrooper Han", "memberName": "Joraxa"}]}, {"member": "Phantomz", "score": 39, "squad": [{"gearTier": 10, "toonName": "Emperor Palpatine", "memberName": "Phantomz"}, {"gearTier": 9, "toonName": "Royal Guard", "memberName": "Phantomz"}, {"gearTier": 11, "toonName": "Stormtrooper Han", "memberName": "Phantomz"}, {"gearTier": 9, "toonName": "TIE Fighter Pilot", "memberName": "Phantomz"}]}, {"member": "Stratefyte", "score": 39, "squad": [{"gearTier": 8, "toonName": "Finn", "memberName": "Stratefyte"}, {"gearTier": 8, "toonName": "Poe Dameron", "memberName": "Stratefyte"}, {"gearTier": 8, "toonName": "R2-D2", "memberName": "Stratefyte"}, {"gearTier": 8, "toonName": "Resistance Pilot", "memberName": "Stratefyte"}, {"gearTier": 7, "toonName": "Resistance Trooper", "memberName": "Stratefyte"}]}, {"member": "Knox2", "score": 38, "squad": [{"gearTier": 10, "toonName": "Emperor Palpatine", "memberName": "Knox2"}, {"gearTier": 9, "toonName": "Royal Guard", "memberName": "Knox2"}, {"gearTier": 8, "toonName": "Stormtrooper Han", "memberName": "Knox2"}, {"gearTier": 11, "toonName": "TIE Fighter Pilot", "memberName": "Knox2"}]}, {"member": "ShawnSolo", "score": 38, "squad": [{"gearTier": 10, "toonName": "Emperor Palpatine", "memberName": "ShawnSolo"}, {"gearTier": 8, "toonName": "Royal Guard", "memberName": "ShawnSolo"}, {"gearTier": 10, "toonName": "Stormtrooper Han", "memberName": "ShawnSolo"}, {"gearTier": 10, "toonName": "TIE Fighter Pilot", "memberName": "ShawnSolo"}]}, {"member": "fsgod88", "score": 38, "squad": [{"gearTier": 11, "toonName": "Emperor Palpatine", "memberName": "fsgod88"}, {"gearTier": 8, "toonName": "Royal Guard", "memberName": "fsgod88"}, {"gearTier": 10, "toonName": "Stormtrooper Han", "memberName": "fsgod88"}, {"gearTier": 9, "toonName": "TIE Fighter Pilot", "memberName": "fsgod88"}]}, {"member": "FammA", "score": 37, "squad": [{"gearTier": 10, "toonName": "Emperor Palpatine", "memberName": "FammA"}, {"gearTier": 8, "toonName": "Royal Guard", "memberName": "FammA"}, {"gearTier": 10, "toonName": "Stormtrooper Han", "memberName": "FammA"}, {"gearTier": 9, "toonName": "Teebo", "memberName": "FammA"}]}, {"member": "Hambone", "score": 37, "squad": [{"gearTier": 11, "toonName": "Emperor Palpatine", "memberName": "Hambone"}, {"gearTier": 10, "toonName": "Royal Guard", "memberName": "Hambone"}, {"gearTier": 9, "toonName": "Stormtrooper Han", "memberName": "Hambone"}, {"gearTier": 7, "toonName": "Teebo", "memberName": "Hambone"}]}, {"member": "Scorpiuscat", "score": 35, "squad": [{"gearTier": 8, "toonName": "Chief Chirpa", "memberName": "Scorpiuscat"}, {"gearTier": 10, "toonName": "Emperor Palpatine", "memberName": "Scorpiuscat"}, {"gearTier": 9, "toonName": "Royal Guard", "memberName": "Scorpiuscat"}, {"gearTier": 8, "toonName": "Stormtrooper Han", "memberName": "Scorpiuscat"}]}, {"member": "SifoDiaz", "score": 35, "squad": [{"gearTier": 10, "toonName": "Emperor Palpatine", "memberName": "SifoDiaz"}, {"gearTier": 8, "toonName": "Royal Guard", "memberName": "SifoDiaz"}, {"gearTier": 8, "toonName": "Stormtrooper Han", "memberName": "SifoDiaz"}, {"gearTier": 9, "toonName": "TIE Fighter Pilot", "memberName": "SifoDiaz"}]}, {"member": "dstelma", "score": 35, "squad": [{"gearTier": 11, "toonName": "Emperor Palpatine", "memberName": "dstelma"}, {"gearTier": 8, "toonName": "Royal Guard", "memberName": "dstelma"}, {"gearTier": 8, "toonName": "Stormtrooper Han", "memberName": "dstelma"}, {"gearTier": 8, "toonName": "TIE Fighter Pilot", "memberName": "dstelma"}]}, {"member": "Iamcodey", "score": 33, "squad": [{"gearTier": 10, "toonName": "Emperor Palpatine", "memberName": "Iamcodey"}, {"gearTier": 9, "toonName": "Stormtrooper Han", "memberName": "Iamcodey"}, {"gearTier": 7, "toonName": "Sun Fac", "memberName": "Iamcodey"}, {"gearTier": 7, "toonName": "Teebo", "memberName": "Iamcodey"}]}, {"member": "Artwalker", "score": 31, "squad": [{"gearTier": 8, "toonName": "Emperor Palpatine", "memberName": "Artwalker"}, {"gearTier": 7, "toonName": "Royal Guard", "memberName": "Artwalker"}, {"gearTier": 7, "toonName": "Stormtrooper Han", "memberName": "Artwalker"}, {"gearTier": 9, "toonName": "Teebo", "memberName": "Artwalker"}]}, {"member": "Ben", "score": 26, "squad": [{"gearTier": 7, "toonName": "Poe Dameron", "memberName": "Ben"}, {"gearTier": 11, "toonName": "R2-D2", "memberName": "Ben"}, {"gearTier": 8, "toonName": "Resistance Pilot", "memberName": "Ben"}]}, {"member": "Revanchist", "score": 26, "squad": [{"gearTier": 8, "toonName": "Poe Dameron", "memberName": "Revanchist"}, {"gearTier": 10, "toonName": "R2-D2", "memberName": "Revanchist"}, {"gearTier": 8, "toonName": "Resistance Pilot", "memberName": "Revanchist"}]}, {"member": "Sad279", "score": 26, "squad": [{"gearTier": 10, "toonName": "Emperor Palpatine", "memberName": "Sad279"}, {"gearTier": 8, "toonName": "Stormtrooper Han", "memberName": "Sad279"}, {"gearTier": 8, "toonName": "TIE Fighter Pilot", "memberName": "Sad279"}]}];

/*
fetch('https://pb2jondbda.execute-api.us-east-1.amazonaws.com/Prod/haats')
.then(function(response) {
  console.log(response);
  console.log(response.text());
  console.log(response.body);
  return response.json(); 
}).then(function(data){
  console.log(data);
});
*/

function convertImageName(toonName){
  toonName = toonName.toLowerCase().replace(/\s/g, '');
  return 'images/' + toonName + '.png';
}

function TableCell({ toon }) {
  const imageContainer = {
    height:80,
    width: 80,
    borderRadius: 40
  };
  if (!toon) {
    return (
      <td></td>
    );
  }
  return (
    <td>
        <img src={convertImageName(toon.toonName)} style={imageContainer} /> 
        <p>{toon.toonName}</p>
        <p>{toon.gearTier}</p>
    </td>
  );
}

function TableRow(){

}

class App extends Component {
  render() {
    var rows = [];
    for (var i = 0; i < rosters.length; i++ ) {
      rows.push(
        <tr>
          <td>{rosters[i].member}</td>
          <TableCell toon={rosters[i].squad[0] } />
          <TableCell toon={rosters[i].squad[1] } />
          <TableCell toon={rosters[i].squad[2] } />
          <TableCell toon={rosters[i].squad[3] } />
          <TableCell toon={rosters[i].squad[4] } />
        </tr>
      );
    }
    return (
      <div className="App">
        <div className="App-header">
          <h1>HAAT P3 Readiness</h1>
        </div>
        <p className="App-intro">
          EWCG
        </p>
          <table>
             <tbody>
               {rows}
             </tbody>
          </table>
      </div>
    );
  }
}

export default App;
