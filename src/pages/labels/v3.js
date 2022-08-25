import React from "react"

import LabelWrapper from "../../containers/LabelWrapper/index.js"
import Header from "../../components/header/index.js"

const v3 = (props) => {
    const params = new URLSearchParams(props.location.search)
    const labelId = params.get("id")

    return (
        <>
            <Header />
            <LabelWrapper labelId={labelId} />
        </>
    )
}

export default v3
