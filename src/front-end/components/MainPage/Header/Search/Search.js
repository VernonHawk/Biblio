import React from "react";
import PropTypes from "prop-types";
import { 
    InputGroup, InputGroupAddon, Input, Button
} from "reactstrap";

import Svg from "components/Misc/Svg";

import "./Search.css";

import icon from "./icon-search.json";

const propTypes = {
    onSearch: PropTypes.func.isRequired
};

class Search extends React.PureComponent {

    state = {
        input: ""
    }

    onSearch = () => this.props.onSearch(this.state.input)

    handleKeyDown = e => {
        if (e.keyCode === 13) { // Enter
            this.onSearch();
        }
    }

    render() {
        return (
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <Button id="btn-search" className="bg-white" onClick={ this.onSearch }>
                        <Svg {...icon} />
                    </Button>
                </InputGroupAddon>
                <Input
                    value={ this.state.input }
                    onInput={ e => this.setState({ input: e.target.value }) }
                    onKeyDown={ this.handleKeyDown }
                />
            </InputGroup>
        );
    }
}

Search.propTypes = propTypes;

export default Search;