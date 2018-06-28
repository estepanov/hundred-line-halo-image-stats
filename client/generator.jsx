import React from "react";
import styled from "styled-components";
import axios from "axios";

import Input from "./components/input.jsx";
import Button from "./components/button.jsx";
import Spinner from "./components/spinner.jsx";
import SectionBox from "./components/sectionBox.jsx";
import SectionHeader from "./components/sectionHeader.jsx";
import ResultInput from "./components/resultInput.jsx";
import Error from "./components/error.jsx";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  margin: 20px;
  flex-shrink: 0;
`;

const Wait = styled.div`
  padding: 10px;
  color: black;
  background-color: white;
`;

const Result = styled.div`
  margin: 30px 0 0 0;
  background-color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  @media only screen and (max-device-width: 700px) {
    flex-direction: column;
  }
`;

class Generator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gamerTag: '',
      resultGamerTag: '',
      loading: false,
      result: '',
      error: false,
      safeToRequest: true,
      interval: null,
      timeLeft: 0,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    if (this.state.loading) {
      return <Container><Spinner /></Container>
    }
    return <Container>
      {this.state.error && <Error />}
      {this.state.safeToRequest ? <Form onSubmit={this.handleSubmit}>
        <Input
          value={this.state.gamerTag}
          onChange={this.handleChange} />
        <Button onClick={this.handleSubmit} />
      </Form> : <Wait>Please wait <b>{this.state.timeLeft}</b> seconds before making another request.</Wait>}
      {this.state.result && <Result>
        <SectionBox>
          <SectionHeader>{this.state.resultGamerTag.replace(/%20/g, " ") + ' '}Statistics Image</SectionHeader>
          <ResultInput url={`http://${window.location.hostname}/api/${this.state.resultGamerTag}`} />
          <img src={this.state.result} />
        </SectionBox>
      </Result>}
    </Container>
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true, error: false, });
    this.fetchData()
  }
  handleChange(event) {
    this.setState({ gamerTag: event.target.value })
  }
  fetchData() {
    this.setDelayLogic();
    const gamerTag = this.state.gamerTag.replace(/\s\s+/g, "%20");
    return axios.get(`/api/${gamerTag}`, { responseType: "blob" })
      .then(res => {
        var reader = new window.FileReader();
        reader.readAsDataURL(res.data);
        return new Promise((resolve, reject) => {
          reader.onload = function () {
            resolve(reader.result)
          }
        })
      })
      .then(res => {
        this.setState({ loading: false, result: res, resultGamerTag: gamerTag })
      }).catch(error => {
        console.log(error);
        this.setState({ error: true, loading: false, });
      });
  }
  setDelayLogic() {
    const interval = setInterval(() => {
      if (this.state.timeLeft <= 0) {
        clearInterval(this.state.interval);
        this.setState({
          safeToRequest: true,
          interval: null,
          timeLeft: 0,
        });
      } else {
        this.setState({ timeLeft: this.state.timeLeft - 1 })
      }
    }, 1000);
    this.setState({ timeLeft: 20, safeToRequest: false, interval })
  }
}

export default Generator;
