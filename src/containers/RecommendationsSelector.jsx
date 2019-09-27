import React from "react";
import { connect } from "react-redux";

import { getRecommendationParams } from "../store/selectors/index";
import { updateSearchParams } from "../store/actions/index";

import Range from "../components/Range.jsx";
import Select from "../components/Select.jsx";

const mapStateToProps = state => {
  return {
    user: {
      recommendationParams: getRecommendationParams(state)
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSearchParams: prop => dispatch(updateSearchParams(prop))
  };
};

class RecommendationSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedParameter: {
        id: "",
        label: "",
        value: 0,
        step: 0.1,
        range: [0, 10],
        touched: false
      }
    };
    this.parameterRange = React.createRef();
  }

  componentDidMount() {
    this.setState({
      selectedParameter: this.props.user.recommendationParams[0]
    });
  }

  handleParameterSelectedChange = value => {
    const selectedParameter = this.props.user.recommendationParams.find(
      param => param.id === value
    );
    this.setState({
      selectedParameter
    });
    this.parameterRange.current.setState({
      value: selectedParameter.value
    });
  };
  handleSuggestionsParameterChange = (value, param) => {
    this.props.updateSearchParams({
      id: param.props.id,
      value
    });
  };

  render() {
    return (
      <span>
        <Select
          id="reccomendationParamsSelector"
          handleChange={this.handleParameterSelectedChange}
          options={this.props.user.recommendationParams}
        />
        {this.state.selectedParameter.range[0] /
          this.state.selectedParameter.step}
        <Range
          id={this.state.selectedParameter.id}
          min={this.state.selectedParameter.range[0]}
          max={this.state.selectedParameter.range[1]}
          step={this.state.selectedParameter.step}
          ref={this.parameterRange}
          handleChange={this.handleSuggestionsParameterChange}
        />
        {this.state.selectedParameter.range[1] /
          this.state.selectedParameter.step}
      </span>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendationSelector);
