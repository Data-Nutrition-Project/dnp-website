import React from "react"
import Button from "react-bootstrap/Button"
import styles from "./styles.module.css"

const ShareButton = () => {
  return (
    <div className={styles.buttonSpacing}>
      <Button variant="primary" size="lg" className={styles.buttonStyle}>
        <p className={styles.buttonText}>PDF</p>
      </Button>
    </div>
  )
}

export default ShareButton
