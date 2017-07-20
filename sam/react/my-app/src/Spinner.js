import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Spinner extends Component {
    static propTypes = {
        spin: PropTypes.bool.isRequired,
        delay: PropTypes.number,
        styles: PropTypes.object,
        spanStyles: PropTypes.object,
        spinnerIcon: PropTypes.string,
        className: PropTypes.string
    }
    static defaultProps = {
        spinnerIcon: 'fa fa-refresh fa-spin',
        delay: 0
    }

    constructor(props) {
        super(props)
        this.state = {
            spin: props.spin,
            waiting: true
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (!nextProps.spin) {
            this.setState({
                spin: false,
                waiting: false
            })
            clearTimeout(this.timer)
        }
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({
                waiting: false
            })
        }, this.props.delay)
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {
        const {spin, waiting} = this.state
        const {styles, spanStyles, spinnerIcon, className} = this.props
        return (
            <div style={spanStyles} className={className}>
        {(spin && !waiting) &&
        <i className={spinnerIcon} style={styles}/>
        }
      </div>
        )
    }
}