import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { getRecommendationParams } from "../store/selectors/index";
import { updateSearchParams } from "../store/actions/index";

import Range from "../components/Range.jsx";
import Select from "../components/Select.jsx";

const RecommendationSelectorContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

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

function RecommendationSelector(props) {
  const [selectedParameter, setSelectedParamater] = useState(
    props.user.recommendationParams[0]
  );
  const parameterRange = React.createRef();

  const handleParameterSelectedChange = value => {
    const selectedParameter = props.user.recommendationParams.find(
      param => param.id === value
    );
    setSelectedParamater(selectedParameter);
    parameterRange.current.setState({
      value: selectedParameter.value
    });
  };

  const handleSuggestionsParameterChange = (value, param) => {
    props.updateSearchParams({
      id: param.props.id,
      value
    });
  };

  return (
    <RecommendationSelectorContainer>
      <Select
        id="reccomendationParamsSelector"
        handleChange={handleParameterSelectedChange}
        options={props.user.recommendationParams}
      />
      <span>
        {selectedParameter.range[0] / selectedParameter.step}
        <Range
          id={selectedParameter.id}
          min={selectedParameter.range[0]}
          max={selectedParameter.range[1]}
          step={selectedParameter.step}
          ref={parameterRange}
          handleChange={handleSuggestionsParameterChange}
        />
        {selectedParameter.range[1] / selectedParameter.step}
      </span>
    </RecommendationSelectorContainer>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendationSelector);
