import React from "react";
import { connect } from "react-redux";
import { changeAddress } from "../app/actions/";
import '../App.css';

const mapStateToProps = state => {
  return { searchAddress: state.searchAddress.address }
};

const mapDispatchToProps = dispatch => {
  return {
    changeAddress: addr => dispatch(changeAddress(addr))
  }
}

class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getAddress() {
    return this.props.searchAddress
  }

  handleSubmitAddress = e => {
    e.preventDefault()
    // TODO: http call that gets the information given the address
    console.log("SUBMITTING ADDRESS: " + this.getAddress())
  };

  render() {
    return (
        <div>
          <input
              onChange={e => this.props.changeAddress(e.target.value)}
              value={this.getAddress()}
          />
          <button className="add-todo" onClick={this.handleSubmitAddress}>
            Search
          </button>
        </div>
    );
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Address);
