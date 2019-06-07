import React from 'react'

class Alert extends React.Component {
	render() {
		return <div>{this.props.children}</div>
	}
}

export default Alert