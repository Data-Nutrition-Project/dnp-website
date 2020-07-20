import React from "react"

import styles from "./styles.module.css"

const UseCasesDropdown = () => {
  return (
    // create a dropdown component and then add it to an onClick listener

    <nav className={styles.navbar}>
      <div>
        <ul className={styles.dropdownContent}>
          <li className={styles.list}>Selector </li>
          <li className={styles.list}>Alerts </li>
        </ul>
      </div>
    </nav>
  )
}

export default UseCasesDropdown
