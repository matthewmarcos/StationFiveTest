import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectionMenu from '../selection/SelectionMenu';

class ListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected : [],
            invalidValues: []
        };
    }


    generateInvalidSelections(selected, limitations) {
        return selected.flatMap((id) => {
                return limitations[id] || [];
            })
            /*
            * The hardcoded ids in limitations is type Number.
            * It has to be converted to String to match the ids in the
            * `radioButtons` object
            */
            .map((s) => String(s));
    }


    handleSelect(selectedIndex, ev) {
        const value = ev.target.value
        const { limitations } = this.props;
        let { selected } = this.state;

        selected[selectedIndex] = value;

        // If an item has changed, all succeeding values are cleared
        selected = selected.slice(0, selectedIndex + 1);
        const invalidValues = this.generateInvalidSelections(selected, limitations);

        this.setState({ selected, invalidValues });
    }


    render() {
        const { radioButtons } = this.props;
        return radioButtons
            .map((buttons, idx) => {
                // Disable a `SelectionMenu` if the previous one has no selection
                // except the first one, of course
                const isDisabled = Boolean(idx && !this.state.selected[idx-1])
                return (<SelectionMenu
                    buttons={buttons}
                    isDisabled={isDisabled}
                    selected={this.state.selected}
                    invalidValues={this.state.invalidValues}
                    handleSelect={this.handleSelect.bind(this, idx)}
                    key={idx}
                    name={idx}
                />);
            });
    }
}


ListContainer.propTypes = {
    radioButtons: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string
    }))).isRequired,
    limitations: PropTypes.object.isRequired
};


export default ListContainer;

