import React from "react"

import styles from "./styles.module.css"

const DatasetDropdown = () => {
  return (
    // create a dropdown component and then add it to an onClick listener

    <nav className={styles.navbar}>
      <ul className={styles.dropdown}>
        <li className={styles.listSet}>About</li>
        <li className={styles.listSet}>Motivation</li>
        <li className={styles.listSet}>Composition</li>
        <li className={styles.listSet}>Collection</li>
        <li className={styles.listSet}>Management</li>
      </ul>
    </nav>
  )
}

export default DatasetDropdown
