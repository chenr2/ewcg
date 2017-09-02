import React, {Component} from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import Spinner from './Spinner';

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
            <p style={styles.toonLabel}>G{toon.gearTier} {toon.rarity}-Star</p>
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

function GuildTable({haat, styles, loading, toon}){
    const rows = haat.hoth_soldiers.map((roster, index) => <Squad haat={roster} styles={styles} rowNum={index} key={index} />);
    return (
        <div className="column">
            <table className='table is-striped'>
                <thead>
                <tr>
                    <th colSpan="6">
                        <h2 className="title is-3 has-text-centered">{toon}</h2>
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
          toon: "Hoth Rebel Soldier",
          haats: [],
          loading: true
        };
    }

    refresh(){
      fetch('https://kozilxgx0i.execute-api.us-east-1.amazonaws.com/dev/haats/123')
          .then((response) => response.json())
          .then((responseJson) => {
            console.log("data: " + JSON.stringify(responseJson));
            this.setState({haats: responseJson, loading: false});
          });
    }

    componentDidMount() {
        this.refresh();
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
        const guildTables = this.state.haats.map((haat, index) => <GuildTable haat={haat} styles={styles} loading={true} toon={this.state.toon} key={index}/>);
        return (
            <div className="App">
                <header className="hero is-dark is-bold is-medium">
                    <div className="hero-body has-text-centered">
                        <div className="container-fluid">
                            <h1 className="title is-1">Characters of interest</h1>
                        </div>
                    </div>
                </header>

                <section className="section">
                    <div className="container-fluid">
                        <Spinner className="container-fluid has-text-centered" spin={this.state.loading} spinnerIcon="fa fa-rebel fa-10x fa-spin"/>
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
