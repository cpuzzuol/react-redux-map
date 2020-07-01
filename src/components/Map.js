import React from "react";
import { connect } from "react-redux";
import { getData } from "../app/actions/";
import '../App.css';

const mapStateToProps = state => {
  return { mapData: state.mapData.employees }
};

const mapDispatchToProps = dispatch => {
  return {
    getData: () => dispatch(getData())
  }
}

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

    componentDidMount() {
        // calling the new action creator
        this.props.getData();
    }

  render() {
    return (
        <ul>
            <li>WOo</li>
          {this.props.mapData.map(el => (
              <li key={el.id}>{el.employee_name}</li>
          ))}
        </ul>
    );
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);
