import React from "react";
import {connect} from "react-redux";
import { getReps, getSenators, incrementDingsByAmount } from "./mapdataSlice";
import { geoCentroid } from "d3-geo";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    Annotation
} from "react-simple-maps";
import styles from './Map.module.css';
import allStates from '../../data/allstates.json'

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const mapStateToProps = state => {
    return {
        reps: state.mapData.reps,
        numDings: state.mapData.dings,
        offsets: state.mapData.offsets,
        partyColors: state.mapData.partyColors,
        senators: state.mapData.senators
    }
};

class Map extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getSenators();

        // Set mouseover events for each state (svg path)
        setTimeout(() => {
            let pths = document.getElementsByTagName("path")

            Object.values(pths).forEach(p => {
                console.log(p)
                p.addEventListener('mouseover', () => {
                    console.log("GET SENATORS BY STATE ");
                })
            })
        }, 1000)
    }

    render() {
        return (
            <div>
                {/*<button*/}
                {/*    aria-label="Decrement value"*/}
                {/*    onClick={() => this.props.incrementDingsByAmount(900)}*/}
                {/*>*/}
                {/*    Increase by 900*/}
                {/*</button>*/}
                {/*<ul>*/}
                {/*    <li>{this.props.numDings}</li>*/}
                {/*    {this.props.reps.map(el => (*/}
                {/*        <li key={el.id}>{el.employee_name}</li>*/}
                {/*    ))}*/}
                {/*</ul>*/}
                <ComposableMap
                    projection="geoAlbersUsa"
                    projectionConfig={{
                        scale:800
                    }}
                    height={400}
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) => (
                            <>
                                {geographies.map(geo => {
                                    const cur = allStates.find(s => s.val === geo.id);
                                    const fillColor = this.props.partyColors.find(p => p.party === cur.vote);
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            stroke="#FFF"
                                            geography={geo}
                                            fill={fillColor.color}
                                            // onClick={() => this.props.getSenators(cur.id)}
                                        />
                                    )
                                })},
                                {geographies.map(geo => {
                                    const centroid = geoCentroid(geo);
                                    const cur = allStates.find(s => s.val === geo.id);
                                    return (
                                        <g key={geo.rsmKey + "-name"}>
                                            {cur &&
                                            centroid[0] > -160 &&
                                            centroid[0] < -67 &&
                                            (Object.keys(this.props.offsets).indexOf(cur.id) === -1 ? (
                                                <Marker
                                                    coordinates={centroid}
                                                    // onClick={() => this.props.getSenators(cur.id)}
                                                >
                                                    <text y="2" fontSize={10} textAnchor="middle">
                                                        {cur.id}
                                                    </text>
                                                </Marker>
                                            ) : (
                                                <Annotation
                                                    subject={centroid}
                                                    dx={this.props.offsets[cur.id][0]}
                                                    dy={this.props.offsets[cur.id][1]}
                                                >
                                                    <text x={4} fontSize={10} alignmentBaseline="middle">
                                                        {cur.id}
                                                    </text>
                                                </Annotation>
                                            ))}
                                        </g>
                                    );
                                })}
                            </>
                        )}
                    </Geographies>
                </ComposableMap>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { getReps, getSenators, incrementDingsByAmount }
)(Map);
