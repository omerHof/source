import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import {Button, Card, Form} from "react-bootstrap";
class TIMTable extends Component {

    //<editor-fold desc="Sub-elements">
    AddRunHeadElement = (
        <Card.Header className={"bg-hugobot"}>
            <Card.Text className={"text-hugobot"}>
                Time Intervals Mining using KarmaLego
            </Card.Text>
        </Card.Header>
    );

    ExistingRunsHeadElement = (
        <Card.Header className={"bg-hugobot"}>
            <Card.Text className={"text-hugobot"}>
                Discovered Patterns
            </Card.Text>
        </Card.Header>
    );
    //</editor-fold>

    //<editor-fold desc="Render functions">
    renderAddRunHeader = () => {
        return (
            <tr>
                <td>
                    Method Of Discretization
                </td>
                <td>
                    Bins Number
                </td>
                <td>
                    Interpolation Gap
                </td>
                <td>
                    PAA Window Size
                </td>
                <td>
                    Epsilon
                </td>
                <td>
                    Max Gap
                </td>
                <td>
                    Min. Vertical Support
                </td>
                <td>
                    Status/Download Link
                </td>
            </tr>
        );
    };

    renderAddRunData = () => {
        return JSON.parse(sessionStorage.TIMTable).rows.map((iter) => {
            return (
                <tr>
                    <td>
                        {iter.MethodOfDiscretization}
                    </td>
                    <td>
                        {iter.BinsNumber}
                    </td>
                    <td>
                        {iter.InterpolationGap}
                    </td>
                    <td>
                        {iter.PAAWindowSize}
                    </td>
                    <td>
                        <Form.Control type={"text"}>
                        </Form.Control>
                    </td>
                    <td>
                        <Form.Control type={"text"}>
                        </Form.Control>
                    </td>
                    <td>
                        <Form.Control type={"text"}>
                        </Form.Control>
                    </td>
                    <td>
                        {<Button className="bg-hugobot" onClick={this.toDelete}>
                            <i className="fas fa-play"/> Discover Patterns
                        </Button>}
                    </td>
                </tr>
            )
        })
    };

    renderExistingRunsHeader = () => {
        return (
            <tr>
                <td>
                    Method Of Discretization
                </td>
                <td>
                    Bins Number
                </td>
                <td>
                    Interpolation Gap
                </td>
                <td>
                    PAA Window Size
                </td>
                <td>
                    Epsilon
                </td>
                <td>
                    Max Gap
                </td>
                <td>
                    Min. Vertical Support
                </td>
                <td>
                    Status/Download Link
                </td>
            </tr>
        );
    };

    renderExistingRunsData=()=> {
        return JSON.parse(sessionStorage.TIMTable).rows.map((iter) => {
            return (
                <tr>
                    <td>
                        {iter.MethodOfDiscretization}
                    </td>
                    <td>
                        {iter.BinsNumber}
                    </td>
                    <td>
                        {iter.InterpolationGap}
                    </td>
                    <td>
                        {iter.PAAWindowSize}
                    </td>
                    <td>
                        {iter.epsilon}
                    </td>
                    <td>
                        {iter.MaxGap}
                    </td>
                    <td>
                        {iter.VerticalSupport}
                    </td>
                    <td>
                        {<Button className="bg-hugobot" onClick={this.toDelete}>
                            <i className="fas fa-download"/> Download
                        </Button>}
                    </td>
                </tr>
            )
        })
    };
    //</editor-fold>

    render() {
        return (
            <small>
                <Card style={{ width: 'auto' }}>
                    {this.AddRunHeadElement}
                    <Card.Body>
                        <Table hover>
                            {this.renderAddRunHeader()}
                            <tbody>
                                {this.renderAddRunData()}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                <Card style={{ width: 'auto' }}>
                    {this.ExistingRunsHeadElement}
                    <Card.Body>
                        <Table hover>
                            {this.renderExistingRunsHeader()}
                            <tbody>
                                {this.renderExistingRunsData()}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </small>
        )
    }
}

export default TIMTable ;