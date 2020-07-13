import React from "react"

import styles from "./styles.module.css"

const DatasetDropdown = () => {
  return (
    // create a dropdown component and then add it to an onClick listener

    <div>
      <li className={styles.list}>About</li>
      <li className={styles.list}>Motivation</li>
      <li className={styles.list}>Composition</li>
      <li className={styles.list}>Collection</li>
      <li className={styles.list}>Management</li>
    </div>
  )
}

export default DatasetDropdown
