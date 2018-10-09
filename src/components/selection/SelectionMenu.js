import React from 'react';
import PropTypes from 'prop-types';

const renderButtons = ({buttons, selected, name, invalidValues, handleSelect}) => {
    return buttons.map((button, idx) => {
        const { value, id } = button;
        const isChecked = (selected.indexOf(id) !== -1);
        const isInvalid = (invalidValues.indexOf(id) !== -1);

        return (
            <div key={idx}>
                <input
                    type="radio"
                    name={'option' + name}
                    value={id}
                    onChange={handleSelect}
                    checked={isChecked}
                    disabled={isInvalid}
                /> { value } <br/>
            </div>
        );
    });
};

/* SelectionMenu: a group of radio buttons
*/
const SelectionMenu = (props) => {
    return (
        <form>
            <fieldset
                style={{
                    border: 0
                }}
                disabled={props.isDisabled}>
                {renderButtons(props)}
                <hr/>
            </fieldset>
        </form>
    );
};


SelectionMenu.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string
    })).isRequired,
    isDisabled: PropTypes.bool.isRequired,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
    invalidValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleSelect: PropTypes.func.isRequired,
    name: PropTypes.number.isRequired
};


export default SelectionMenu;

