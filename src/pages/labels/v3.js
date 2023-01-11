import React from "react"

import LabelContainer from "../../containers/LabelContainer/index.js"

const v3 = (props) => {
    const params = new URLSearchParams(props.location.search)
    const labelId = params.get("id")

    return (
        <>
            <LabelContainer labelId={labelId} />
        </>
    )
}

export default v3
