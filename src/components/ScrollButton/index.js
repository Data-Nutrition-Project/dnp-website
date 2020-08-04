import React from "react"
import styles from "./styles.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { config } from "@fortawesome/fontawesome-svg-core"

config.autoAddCss = false

class ScrollButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      int: 0,
      class: "",
      visited: "",
      isVisible: true,
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.scrollFunction.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollFunction.bind(this))
  }

  scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      this.setState({ class: styles.scrollFadeIn })
    } else {
      this.setState({ class: styles.scrollFadeOut })
    }
  }
  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.int)
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx)
  }

  scrollStepDown() {
    if (window.pageYOffset >= 3000) {
      clearInterval(this.state.int)
    }
    window.scroll(0, document.body.scrollHeight)
  }
  scrollToTop() {
    let int = setInterval(this.scrollStep.bind(this), this.props.delayInMs)
    this.setState({ int: int })
  }

  render() {
    return (
      <div className={this.state.class}>
        <button
          title="back to top"
          onClick={() => {
            this.scrollToTop()
          }}
          className={styles.scrollUp}
        >
          <FontAwesomeIcon icon={faChevronUp} size="1x" />
        </button>
        <button
          title="down"
          className={styles.scrollDown}
          onClick={() => {
            this.scrollStepDown()
          }}
        >
          <FontAwesomeIcon icon={faChevronDown} size="1x" />
        </button>
      </div>
    )
  }
}

export default ScrollButton
