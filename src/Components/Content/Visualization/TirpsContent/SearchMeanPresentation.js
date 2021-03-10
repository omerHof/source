import React, { Component } from "react";
// import Chart from "react-google-charts";
import { Card, Table, Button } from "react-bootstrap";
import Axios from "axios";
import cookies from "js-cookie";
import { BrowserRouter, HashRouter, Redirect } from "react-router-dom";
import { Router } from "react-router";
import { useHistory } from "react-router";
import history from "../../../../History";

class SearchMeanPresentation extends Component {
  state = {
    redirect: false,
  };

  constructor(props) {
    super(props);
  }

  renderSelectedTirp = () => {
    return this.renderTirpTable(); // in future add if disc
  };

  renderTirpTable = () => {
    return (
      <div>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Current level</th>
            <td>{this.props.currentLevel}</td>
          </tr>
          <tr>
            <th>Vertical support</th>
            <td>{this.props.vs}</td>
          </tr>
          <tr>
            <th>Mean horizontal_support</th>
            <td>{this.props.mhs}</td>
          </tr>
          <tr>
            <th>Mean mean duration</th>
            <td>{this.props.mmd}</td>
          </tr>
        </tbody>
      </div>
    );
  };

  findTirp() {
    // self.loaded = false;
    // document.getElementById('loader').style.display = "block";
    const formData = new FormData();
    formData.append("data_set_name", window.selectedDataSet);
    formData.append("symbols", this.props.symbols.replace("(", ""));
    formData.append("relations", this.props.relations);

    this.getPath(formData).then(
      function (response) {
        let results = response.data["Path"];
        let path = [];
        for (let i = 0; i < results.length; i++) {
          let tirp = JSON.parse(results[i]);
          path.push(tirp);
        }
        window.PassedFromSearch = true;
        window.pathOfTirps = path;
        // to={"/TirpsApp/TIRPs"}
        // $location.path("/tirps");
        // $rootScope.location = 'TIRPs';
        // return (
        //   <div>
        //     <Link to="/TirpsApp/TIRPs">hello</Link>
        //   </div>
        // );
        // this.setState({ redirect: true });
      },

      function (response) {
        alert("Something went wrong.\n" + "Please Try Again");
        // $rootScope.location = 'Files';
        // $scope.$apply(function () {
        //   $location.path("/");
      }
    );
    this.state.redirect = true;
    // this.props.history.push("/TirpsApp/TIRPs");
    this.forceUpdate();
  }
  getPath(formData) {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": cookies.get("auth-token"),
      },
    };
    const url = window.base_url + "/find_Path_of_tirps";

    return Axios.post(url, formData, config);
  }

  render() {
    let that = this;
    window.addEventListener("ReloadTirpTable", function () {
      that.forceUpdate();
    });
    const { redirect } = this.state;
    if (redirect) {
      return (
        <HashRouter>
          <Redirect to="/TirpsApp/TIRPs" />
        </HashRouter>
      );
    }
    return (
      <Card>
        <Card.Header className={"bg-hugobot"}>
          <Card.Text className={"text-hugobot text-hugoob-advanced"}>
            Selected TIRP info{" "}
          </Card.Text>
        </Card.Header>
        <Card.Body className={"text-hugobot"}>
          <div className="vertical-scroll vertical-scroll-advanced">
            <Table responsive={true} striped={true} bordered={true}>
              {this.renderSelectedTirp()}
            </Table>
          </div>
          <Button
            className="btn btn-primary"
            style={{ width: "100%" }}
            variant="primary"
            onClick={() => this.findTirp()}
            // to="/TirpsApp/TIRPs"
          >
            Explore TIRP
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default SearchMeanPresentation;
