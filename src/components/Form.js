import React, { Component } from "react";

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { value } = event.target;
        this.setState(() => {
            return {
                value
            };
        });
    }

    render() {
        return (
            <div>
                <p>Form Input:</p>
                <form>
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </form>
            </div>

        );
    }
}

export default Form;