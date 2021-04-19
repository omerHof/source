import React, { Component } from "react";
import "../../../../resources/style/colors.css";
import { Button, Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

class TirpMatrix extends Component {
  state = {
    matrix: [],
    row: [],
  };
  constructor(props) {
    super(props);
    this.state.row = this.props.row;
    if ((this.props.show == true) & (window.pathOfTirps.length > 0)) {
      this.DrawMatrix();
    }
  }

  DrawMatrix = () => {
    // window.pathOfTirps.push(this.state.row);
    // let currTirp = window.pathOfTirps[window.pathOfTirps.length - 1];
    let currTirp = this.props.row;
    let symbols = currTirp._TIRP__symbols;
    let relations = currTirp._TIRP__rel;
    let matrix = new Array(symbols.length);
    let iterations = 1;
    let relIndex = 0;
    let num = 1;

    for (var i = 0; i < matrix.length; i++) {
      matrix[i] = new Array();
      // num = num + 1 ;
    }
    matrix[0] = symbols.slice(1, symbols.length + 1);
    matrix[0].unshift("");
    let cols = symbols.slice(0, symbols.length - 1);
    for (var i = 1; i < cols.length + 1; i++) {
      matrix[i][0] = cols[i - 1];
    }
    //matrix[0][1].unshift("");
    for (var i = 1; i < symbols.length; i++) {
      for (var j = 1; j < iterations + 1; j++) {
        matrix[j][i] = relations[relIndex].substring(0, 1);
        relIndex = relIndex + 1;
      }
      iterations = iterations + 1;
    }
    this.state.matrix = matrix;
  };

  draw = () => {
    if ((this.props.show == true) & (window.pathOfTirps.length > 0)) {
      this.DrawMatrix();
    }
    return this.state.matrix.map((line, i) => (
      <tr key={i}>
        {line.map((num, j) => (
          <td key={j}>{num}</td>
        ))}
      </tr>
    ));
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Card>
            <Card.Header className={"bg-hugobot"}>
              <Card.Text className={"text-hugobot text-hugoob-advanced"}>
                Relations{" "}
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <table
                style={{
                  borderWidth: "2px",
                  borderColor: "#aaaaaa",
                  borderStyle: "solid",
                }}
              >
                {this.draw()}
              </table>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default TirpMatrix;