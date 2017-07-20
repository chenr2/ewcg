import React, {Component} from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import Spinner from './Spinner';


function convertImageName(toonName) {
    toonName = toonName.toLowerCase().replace(/\s/g, '');
    return 'images/' + toonName + '.png';
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
        // tableCellStyle: {
        //   height:150,
        //   width: 150,
        // },
        // toonLabel: {
        //   fontSize: 14,
        //   fontWeight: 'bold',
        //   textAlign: 'center',
        //   color: '#343434'
        // }
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

function Squad({haat, styles, ...other}) {
    return (
        <tr {...other}>
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

class App extends Component {
    constructor() {
        super();
        this.state = {haats: [], loading: true};
    }

    componentDidMount() {
        fetch('https://pb2jondbda.execute-api.us-east-1.amazonaws.com/Prod/haats')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("data: " + JSON.stringify(responseJson));
                this.setState({haats: responseJson, loading: false});
            });
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
        // this.state.haats.map TODO
        // yarn build to push
        const rows = this.state.haats.map((haat, index) => <Squad haat={haat} styles={styles} key={index}/>);

        return (
            <div className="App">
                <header className="hero is-dark is-bold is-medium">
                    <div className="hero-body has-text-centered">
                        <div className="container-fluid">
                            <h1 className="title is-1">HAAT P3 Readiness</h1>
                            <h2 className="subtitle is-3">comparing your things</h2>
                        </div>
                    </div>
                </header>

                <section className="section">
                    <div className="container-fluid">
                        <div className='columns'>
                            <div className="column">
                                <table className='table is-striped'>
                                    <thead>
                                        <tr>
                                            <th colSpan="6">
                                                <h2 className="title is-3 has-text-centered">EWCG</h2>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {rows}
                                    </tbody>
                                </table>
                                <Spinner className="container-fluid has-text-centered" spin={this.state.loading} spinnerIcon="fa fa-empire fa-10x fa-spin"/>

                            </div>
                            <div className="column">
                                <table className='table is-striped'>
                                    <thead>
                                        <tr>
                                            <th colSpan="6">
                                                <h2 className="title is-3 has-text-centered">Battlefrontiers</h2>
                                            </th>
                                        </tr>
                                    </thead>
                                <tbody>
                                    {rows}
                                    </tbody>
                                </table>
                                <Spinner className="container-fluid has-text-centered" spin={this.state.loading} spinnerIcon="fa fa-first-order fa-10x fa-spin"/>

                        </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default App;
