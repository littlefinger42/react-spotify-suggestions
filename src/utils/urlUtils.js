const urlUtils = {
	getUrlParam(seperator, name) {
		const regex = new RegExp(`(${seperator})(${name})(\=)([^#]*)`)
		const matches = regex.exec(window.location)

		if (matches !== null && matches.length > 4 && matches[4] !== null) {
			return matches[4]
		} else {
			return false
		}
	}
}

export default urlUtils