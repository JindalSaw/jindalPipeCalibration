import React, { Component } from "react";

class HeatReceipt extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log("product props is", this.props.location.productdetailProps);
    }
    render() {
        return <div>test</div>;
    }
}

export default HeatReceipt;
