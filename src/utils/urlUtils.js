const urlUtils = {
	/**
	 * Returns a string of a url param based on the seperator and name strings
	 * @param {string} seperator Seperator of the parameter and the domain
	 * @param {string} name Name of the url parameter
	 * @returns {Array<string>|boolean}
	 */
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