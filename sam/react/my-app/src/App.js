import React, {Component} from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import Spinner from './Spinner';


function convertImageName(toonName) {
    toonName = toonName.toLowerCase().replace(/\s/g, '');
    if (toonName.includes("chirrut")) {
      return 'images/chirrut.png';
    } else {
      return 'images/' + toonName + '.png';
    }
}

function convertGearTierImagePath(gearTier) {
    return 'images/gear-icon-g' + gearTier + '.svg'
}

function TableCell({toon}) {
    var styles = {
        imageContainer: {
            height: '100%',
            width: '100%',
            borderRadius: 40,
            position: 'absolute'
        },
        parentContainer: {
            height: 80,
            width: 80,
        },

    };
    if (!toon) {
        return (
            <td></td>
        );
    }
    return (
        <td>
            <figure style={styles.parentContainer} className="image">
                <img src={convertImageName(toon.toonName)} style={styles.imageContainer}/>
                <img src={convertGearTierImagePath(toon.gearTier)} style={styles.imageContainer}/>
            </figure>
            <figcaption>
                <p style={styles.toonLabel}>{toon.toonName}</p>
            </figcaption>

        </td>
    );
}

function Squad({haat, styles, rowNum, ...other}) {
    return (
        <tr {...other}>
            <td>{rowNum + 1}</td>
            <td>
                <p style={styles.memberLabel}>{haat.member}</p>
            </td>
            <TableCell toon={haat.squad[0] }/>
            <TableCell toon={haat.squad[1] }/>
            <TableCell toon={haat.squad[2] }/>
            <TableCell toon={haat.squad[3] }/>
            <TableCell toon={haat.squad[4] }/>
        </tr>
    );
}

function GuildTable({haat, styles, loading, phase2, ...other}){
    var phaseRoster = phase2 ? haat.p2 : haat.p3;
    const rows = phaseRoster.map((roster, index) => <Squad haat={roster} styles={styles} rowNum={index} key={index} />);
    return (
        <div className="column">
            <table className='table is-striped'>
                <thead>
                <tr>
                    <th colSpan="6">
                        <h2 className="title is-3 has-text-centered">{haat.guild}</h2>
                    </th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        </div>
    );
}

class App extends Component {

    constructor() {
        super();
        this.state = {
          haats: [],
          loading: true,
          phase2: true
        };
    }

    componentDidMount() {
        fetch('https://kl1f1pqty4.execute-api.us-east-1.amazonaws.com/dev/haats')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("data: " + JSON.stringify(responseJson));
                this.setState({haats: responseJson, loading: false});
            });
    }

    togglePhase = () => {
      console.log("button clicked!");
      var currentPhase2State = this.state.phase2;
      this.setState({phase2: !currentPhase2State});
    }

    currentPhase = () => {
      return this.state.phase2 ? "P2" : "P3"
    }

    render() {
        const styles = {
            memberLabel: {
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'left',
                color: '#343434',
                marginLeft: 20
            },
        };
        const guildTables = this.state.haats.map((haat, index) => <GuildTable haat={haat} styles={styles} loading={true} phase2={this.state.phase2} key={index}/>);
        return (
            <div className="App">
                <header className="hero is-dark is-bold is-medium">
                    <div className="hero-body has-text-centered">
                        <div className="container-fluid">
                            <h1 className="title is-1">HAAT Readiness</h1>
                            <h2 className="subtitle is-3">{this.state.phase2 ? "P2" : "P3"}</h2>
                            <button onClick={this.togglePhase}>
                              Toggle Phase
                            </button>
                        </div>
                    </div>
                </header>

                <section className="section">
                    <div className="container-fluid">
                        <Spinner className="container-fluid has-text-centered" spin={this.state.loading} spinnerIcon="fa fa-empire fa-10x fa-spin"/>
                        <div className='columns'>
                            {guildTables}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default App;
