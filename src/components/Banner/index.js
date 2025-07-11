import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import ReactMarkdown from "react-markdown"

import * as styles from "./styles.module.css"

const Banner = props => (
  <ReactMarkdown className={classNames(styles.banner, props.className)}>
    {props.content}
  </ReactMarkdown>

)

Banner.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string.isRequired
}

Banner.defaultProps = {
  content: "*Test* this is a test"
}

export default Banner
