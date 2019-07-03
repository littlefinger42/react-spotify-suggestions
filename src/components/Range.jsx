import React from 'react'

class Range extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  value: 0
		};
	}
	onSliderChange = (event) => {
		this.setState({
		  value: event.target.value
		});
		this.props.handleChange(event.target.value);
	}
	render() {
		return (
			<span>
				<input type="range" id={this.props.id}
						min={this.props.min} max={this.props.max} onMouseUp={this.onSliderChange}/>
				<label htmlFor={this.props.id}>{this.props.label}{this.state.value}</label>
			</span>
		)
	}
}

export default Range