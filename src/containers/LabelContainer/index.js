import axios from "axios"
import classNames from "classnames"
import { formatBlobForLabel } from "../../utils/jsonFormatter.js"
import { formatBlobForLabel2 } from "../../utils/jsonFormatter2.js"
import { Grid } from  'react-loader-spinner'
import Helmet from "react-helmet"
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import LabelHeader from "../../components/LabelHeader/index.js"
import LabelWrapper from "../../components/v3/LabelWrapper/version-1.js"
import LabelWrapper2 from "../../components/v3/LabelWrapper/version-2.js"

import * as layout from "../../components/layout.css"
import * as styles from "./styles.module.css"

const STATUS_ENUM = {
    IN_PROGRESS: "IN PROGRESS",
    APPROVED: "APPROVED",
    IN_REVIEW: "IN REVIEW",
    CHANGES_REQUESTED: "CHANGES REQUESTED"
}

const LabelContainer = (props) => {
    const [labelBlob, setLabelBlob] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState("Dataset Nutrition Label v3")
    const [keywords, setKeywords] = useState("")
    const [metadata, setMetadata] = useState({
        version: -1,
        status: STATUS_ENUM.IN_PROGRESS
    })

    const getLabelWrapper = (labelBlob, loading, metadata) => {
        if (metadata.version === 2) {
            return (
                <LabelWrapper2 
                    labelBlob={labelBlob}
                    loading={loading}
                    status={metadata.status}
                />
            )
        } else {
            return (
                <LabelWrapper
                    labelBlob={labelBlob}
                    loading={loading}
                />
            )
        }
    }

    const setDataFromVersion = (data) => {
        let blob = null
        setMetadata({
            version: data.version,
            status: data.status
        })
        if (data.version === 2) {
            blob = formatBlobForLabel2(data)
            setLabelBlob(blob)
            const keywords = blob.description.keywordList.map((obj) => {
                return obj.Keyword.answer
            })
            setKeywords(keywords.join(","))
        } else {
            blob = formatBlobForLabel(data)
            setLabelBlob(blob)
            setKeywords(blob.description.keywordList.join(","))
        }
        setTitle(blob.title)
    }

    const getLabelBlob = () => {
        axios
            .get(`${process.env.GATSBY_BACKEND_URL}/labels/${props.labelId}`)
            .then((response) => {
                setDataFromVersion(response.data)
            })
            .catch((err) => {
                console.log(err)
                setError(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    
    useEffect(() => {
        getLabelBlob()
    }, [])

    const handleErrorMessage = (status) => {
        switch (status) {
            case 404:
                return 'We could not find the label requested.'
            case 403:
                return 'That label is not ready yet.'
            case 500:
                return 'There is an issue with our servers, we will check on that.'
            default:
                return ''
        }
    }
    
    return (
        <>
            <Helmet
                title={`Label for: ${title}`}
                meta={[
                    { 
                        name: "description",
                        content: "Dataset Nutrition Label describing the uses, risks and other basic information for a dataset."
                    },
                    {
                        name: "keywords",
                        content: "AI,Data,Quality".concat(",", keywords)
                    },
                    {
                        name: "robots",
                        content: metadata.status === STATUS_ENUM.APPROVED ? "index, follow" : "noindex, nofollow"
                    }
                ]}
                bodyAttributes={{
                  class: "stretched",
                }}
            >
                <html lang="en" />
            </Helmet>
            <div>
            {loading ? (
                <div>
                    <LabelHeader loading={loading} />
                    <div className={styles.label}>
                        <Row>
                            <Col md={{ span: 4, offset: 4 }}>
                                <Grid
                                    height="80"
                                    width="80"
                                    color={layout.darkSlateBlue}
                                    ariaLabel="grid-loading"
                                    radius="12.5"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            ) : error !== null ? (
                <div>
                    <LabelHeader loading={true} />
                    <div className={styles.label}>
                        <Row>
                            <Col>
                                <h1 style={{ 
                                    textAlign: 'center'
                                }}>
                                    {'Sorry, something went wrong!'}
                                </h1>
                            </Col>
                        </Row>
                    </div>
                </div>
            ) : (
                getLabelWrapper(labelBlob, loading, metadata)
            )}
            </div> 
        </>  
    )
}

LabelContainer.propTypes = {
    labelId: PropTypes.string.isRequired
}

export default LabelContainer
