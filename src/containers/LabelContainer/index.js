import axios from "axios"
import classNames from "classnames"
import { formatBlobForLabel } from "../../utils/jsonFormatter.js"
import { formatBlobForLabel2 } from "../../utils/jsonFormatter2.js"
import { Grid } from  'react-loader-spinner'
import Linkify from 'react-linkify';
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import LabelHeader from "../../components/LabelHeader/index.js"
import LabelWrapper from "../../components/v3/LabelWrapper/version-1.js"
import LabelWrapper2 from "../../components/v3/LabelWrapper/version-2.js"

import * as layout from "../../components/layout.css"
import * as styles from "./styles.module.css"

const LabelContainer = (props) => {
    const [labelBlob, setLabelBlob] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const getLabelWrapper = (labelBlob, loading) => {
        if (labelBlob.version === 2) {
            return (
                <LabelWrapper2 
                    labelBlob={formatBlobForLabel2(labelBlob)}
                    loading={loading}
                    status={labelBlob.status}
                />
            )
        } else {
            return (
                <LabelWrapper
                    labelBlob={formatBlobForLabel(labelBlob)}
                    loading={loading}
                />
            )
        }
    }

    const getLabelBlob = () => {
        axios
            .get(`${process.env.GATSBY_BACKEND_URL}/labels/${props.labelId}`)
            .then((response) => {
                setLabelBlob(response.data)
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
            getLabelWrapper(labelBlob, loading)
        )}
        </div>   
    )
}

LabelContainer.propTypes = {
    labelId: PropTypes.string.isRequired
}

export default LabelContainer
