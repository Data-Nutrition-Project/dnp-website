import React from "react"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import styles from "./styles.module.css"

const SectionBase = ({ children }) => {
  return (
    <Container>
        <Col
            className={styles.sectionBase}
            xl={{ span: 12, offset: 2 }}
            md={{ span: 9, offset: 3 }}
            sm={{ span: 12 }}
        >
            {children}
        </Col>
    </Container>
)
}

export default SectionBase
