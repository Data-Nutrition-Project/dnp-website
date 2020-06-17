import React from "react"

import styles from "./styles.module.css"
<<<<<<< HEAD
const SectionBase = ({ children }) => {
  return <div className={styles.sectionBase}>{children}</div>
=======

const SectionBase = () => {
	return (
		<div className={styles.sectionBase}>
			<h1 className={styles.sectionBaseHeader}> </h1>
			<span className={styles.weightedLine}>
				<h2> </h2>
			</span>
			<span className={styles.lightLine}>
				<h1> </h1>
			</span>
			<span className={styles.lightLine}>
				<h1> </h1>
			</span>
		</div>
	)
>>>>>>> 4e75ff02b6d65beb9dc18c1f8e3acb7d875c6a62
}

export default SectionBase
