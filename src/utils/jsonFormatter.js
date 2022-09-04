const OPTION_TO_RISK = {
    yes: 2,
    no: 0,
    unsure: 1
}

export const formatRepresentation = (blob) => {
    const justFacts = blob[1].questions
    const collectedWhy = blob[2].questions
    const collectedHow = blob[4].questions

    let representation = []
    if (justFacts[13].answer === 'yes' && justFacts[13].dependents.yes[0].answer === 'yes') {
        representation.push({
            name: justFacts[13].dependents.yes[0].title,
            riskLabel: OPTION_TO_RISK[justFacts[13].dependents.yes[0].answer],
            description: justFacts[13].dependents.yes[1].answer
        })
    } else {
        representation.push({
            name: justFacts[13].dependents.yes[0].title,
            riskLabel: 1,
            description: 'Not Applicable'
        })
    }

    representation.push({
        name: collectedWhy[7].title,
        riskLabel: 1,
        description: collectedWhy[7].answer
    })
    representation.push({
        name: collectedWhy[11].title,
        riskLabel: 1,
        description: collectedWhy[11].answer
    })
    representation.push({
        name: collectedWhy[12].title,
        riskLabel: 1,
        description: collectedWhy[12].answer
    })
    representation.push({
        name: collectedHow[1].title,
        riskLabel: OPTION_TO_RISK[collectedHow[1].answer],
        description: (() => {
            try {
                return (collectedHow[1].dependents[collectedHow[1].answer]) ? collectedHow[1].dependents[collectedHow[1].answer][0].answer : ''
            } catch (err) {
                return ''
            }
        })()
    })
    representation.push({
        name: collectedHow[2].title,
        riskLabel: OPTION_TO_RISK[collectedHow[2].answer],
        description: (() => {
            try {
                return (collectedHow[2].dependents[collectedHow[2].answer]) ? collectedHow[2].dependents[collectedHow[2].answer][0].answer : ''
            } catch (err) {
                return ''
            }
        })()
    })

    return representation
}

export const formatUpstream = (blob) => {
    const upstream = blob[7].questions

    if (blob[1].questions[7].answer === 'no') {
        return [{
            name: 'Not Applicable',
            riskLabel: -1,
            description: 'This dataset contains no upstream sources.'
        }]
    } else {
        const upstreamstuff = [
            {
                name: upstream[0].title.split('-')[1],
                riskLabel: 1,
                description: (() => {
                    try {
                        return upstream[0].dependents[upstream[0].answer][0].answer || ''
                    } catch (err) {
                        return ''
                    }    
                })()
            },
            {
                name: upstream[1].title.split('-')[1],
                riskLabel: 1,
                description: (() => {
                    try {
                        return upstream[1].dependents[upstream[1].answer][0].answer || ''
                    } catch (err) {
                        return ''
                    }    
                })()
            },
            {
                name: upstream[2].title.split('-')[1],
                riskLabel: 1,
                description: (() => {
                    try {
                        return upstream[2].dependents[upstream[2].answer][0].answer || ''
                    } catch (err) {
                        return ''
                    }    
                })()
            },
            {
                name: upstream[3].title.split('-')[1],
                riskLabel: 1,
                description: upstream[3].answer
            }
        ]
        console.log(upstreamstuff)
        return upstreamstuff
    }
}

export const formatGeneralRisks = (blob) => {
    const justFacts = blob[1].questions
    const collectedWhy = blob[2].questions
    const collectedWhat = blob[3].questions
    const knownIssues = blob[6].questions

    let generalRisks = []
    if (justFacts[13].answer === 'yes') {
        // add individual-level data answer
        generalRisks.push({
            name: justFacts[13].dependents.yes[2].title,
            riskLabel: OPTION_TO_RISK[justFacts[13].dependents.yes[2].answer],
            description: justFacts[13].dependents.yes[2].answer
        })

        // add consent info
        generalRisks.push({
            name: justFacts[13].dependents.yes[4].title,
            riskLabel: OPTION_TO_RISK[justFacts[13].dependents.yes[4].answer],
            description: justFacts[13].dependents.yes[4].answer === 'yes' ? justFacts[13].dependents.yes[4].dependents.yes[0].answer : 'Consent was not given.'
        })
    } else {
        generalRisks.push({
            name: justFacts[13].dependents.yes[2].title,
            riskLabel: 1,
            description: 'Not Applicable'
        })
        
        // Where does confidentiality go?
        // generalRisks.push({
        //     name: justFacts[13].dependents.yes[2].title,
        //     riskLabel: 1,
        //     description: 'Not Applicable'
        // })
        generalRisks.push({
            name: justFacts[13].dependents.yes[4].title,
            riskLabel: 1,
            description: 'Not Applicable'
        })

    }

    generalRisks.push({
        name: collectedWhy[9].title,
        riskLabel: 1,
        description: collectedWhy[9].answer
    })
    generalRisks.push({
        name: collectedWhy[10].title,
        riskLabel: 1,
        description: collectedWhy[10].answer
    })

    if (collectedWhat[4].answer !== 'no' && collectedWhat[4].answer !== '') {
        generalRisks.push({
            name: collectedWhat[4].title,
            riskLabel: OPTION_TO_RISK[collectedWhat[4].answer],
            description: collectedWhat[4].dependents[collectedWhat[4].answer][0].answer
        })
    } else {
        generalRisks.push({
            name: collectedWhat[4].title,
            riskLabel: 0,
            description: 'Not Applicable'
        })
    }

    generalRisks.push({
        name: knownIssues[0].title,
        riskLabel: 1,
        description: knownIssues[0].answer
    })
    generalRisks.push({
        name: knownIssues[1].title,
        riskLabel: 1,
        description: knownIssues[1].answer
    })

    return generalRisks
}

export const formatBlobForLabel = (blob) => {
    return {
        title: blob[0].questions[4].answer,
        description: {
            about: blob[0].questions[5].answer,
            keywordList: blob[1].questions[0].answer.split(",")
        },
        howToUseIt: {
            intended: [
                {
                    title: 'Domain',
                    description: blob[2].questions[0].answer
                },
                {
                    title: 'Original Use',
                    description: blob[2].questions[1].answer
                },
                {
                    title: 'Original Use',
                    description: blob[2].questions[2].answer
                }
            ],
            restrictions: [
                {
                    title: '',
                    description: blob[2].questions[8].answer === 'yes' ? blob[2].questions[8].dependents.yes[0].answer : blob[2].questions[8].answer
                }
            ],
            known: [
                {
                    title: '',
                    description: blob[2].questions[3].answer
                }
            ],
            doNot: [
                {
                    title: 'Domain',
                    description: blob[2].questions[6].answer
                },
                {
                    title: blob[2].questions[4].answer,
                    description: blob[2].questions[5].answer
                }
            ]
        },
        aboutTheDataset: {
            people: [
                {
                    title: 'Owned by',
                    description: blob[0].questions[6].answer
                },
                {
                    title: 'Created by',
                    description: blob[0].questions[7].answer
                },
                {
                    title: 'Maintained by',
                    description: `${blob[0].questions[8].answer}, ${blob[0].questions[9].answer}`
                },
                {
                    title: 'Funding',
                    description: blob[1].questions[9].answer
                },
                {
                    title: 'Management',
                    description: blob[1].questions[10].answer
                }
            ],
            technical: [
                {
                    title: 'Publish Date',
                    description: blob[0].questions[13].answer
                },
                {
                    title: 'Format',
                    description: blob[1].questions[2].answer
                },
                {
                    title: 'Instances',
                    description: blob[1].questions[3].answer
                },
                {
                    title: 'Version',
                    description: blob[0].questions[10].answer
                },
                {
                    title: 'License',
                    description: blob[0].questions[12].answer
                },
                {
                    title: 'Collection timeframe',
                    description: blob[1].questions[4].answer
                },
                {
                    title: 'Collection process',
                    description: blob[1].questions[5].answer
                }
            ],
            usefulLinks: [
                {
                    title: 'Dataset access point',
                    description: blob[0].questions[11].answer === 'yes' ? blob[0].questions[11].dependents.yes[0].answer : 'Not Applicable'
                },
                {
                    title: 'Data dictionary',
                    description: blob[1].questions[1].answer
                }
            ]
        },
        inferenceRisks: {
            glance: [
                {
                    reference: 'about-humans',
                    title: 'About humans',
                    badge: blob[1].questions[13].answer,
                    description: ''
                },
                {
                    reference: 'upstream-sources',
                    title: 'Upstream sources',
                    badge: blob[1].questions[7].answer,
                    description: blob[1].questions[7].answer === 'yes' ? blob[1].questions[7].dependents.yes[0].answer : 'Not Applicable'
                },
                {
                    reference: 'technical-review',
                    title: 'Technical review',
                    badge: blob[1].questions[11].answer,
                    description: blob[1].questions[11].answer === 'yes' ? blob[1].questions[11].dependents.yes[0].answer : 'Not Applicable'
                },
                {
                    reference: 'ethical-review',
                    title: 'Ethical review',
                    badge: blob[1].questions[12].answer,
                    description: blob[1].questions[12].answer === 'yes' ? blob[1].questions[12].dependents.yes[0].answer : 'Not Applicable'
                },
                {
                    reference: 'update-frequency',
                    title: 'Update frequency',
                    badge: blob[1].questions[8].answer,
                    description: blob[1].questions[8].answer === 'yes' ? blob[1].questions[8].dependents.yes[0].answer : 'Not Applicable'
                }
            ],
            dataValues: [
                {
                    name: blob[4].questions[0].title,
                    riskLabel: OPTION_TO_RISK[blob[4].questions[0].answer],
                    description: (() => {
                        try {
                            return (blob[4].questions[0].dependents[blob[4].questions[0].answer]) ? blob[4].questions[0].dependents[blob[4].questions[0].answer][0].answer : ''
                        } catch (err) {
                            return ''
                        }
                    })()       
                },
                {
                    name: blob[5].questions[0].title,
                    riskLabel: 1,
                    description: blob[5].questions[0].answer
                },
                {
                    name: blob[5].questions[1].title,
                    riskLabel: 1,
                    description: blob[5].questions[1].answer
                },
                {
                    name: blob[5].questions[2].title,
                    riskLabel: 1,
                    description: blob[5].questions[2].answer
                },
                {
                    name: blob[5].questions[3].title,
                    riskLabel: OPTION_TO_RISK[blob[5].questions[3].answer],
                    description: (() => {
                        try {
                            return (blob[5].questions[3].dependents[blob[5].questions[3].answer]) ? blob[5].questions[3].dependents[blob[5].questions[3].answer][0].answer : ''
                        } catch (err) {
                            return ''
                        }
                    })() 
                }
            ],
            featureSelection: [
                {
                    name: blob[3].questions[0].title,
                    riskLabel: 1,
                    description: blob[3].questions[0].answer
                },
                {
                    name: blob[3].questions[1].title,
                    riskLabel: OPTION_TO_RISK[blob[3].questions[1].answer],
                    description: (() => {
                        try {
                            return (blob[3].questions[1].dependents[blob[3].questions[1].answer]) ? blob[3].questions[1].dependents[blob[3].questions[1].answer][0].answer : ''
                        } catch (err) {
                            return ''
                        }
                    })() 
                },
                {
                    name: blob[3].questions[2].title,
                    riskLabel: OPTION_TO_RISK[blob[3].questions[2].answer],
                    description: (() => {
                        try {
                            return (blob[3].questions[2].dependents[blob[3].questions[2].answer]) ? blob[3].questions[2].dependents[blob[3].questions[2].answer][0].answer : ''
                        } catch (err) {
                            return ''
                        }
                    })() 
                },
                {
                    name: blob[3].questions[3].title,
                    riskLabel: 1,
                    description: blob[3].questions[3].answer
                }
            ],
            representation: formatRepresentation(blob),
            upstream: formatUpstream(blob),
            general: formatGeneralRisks(blob)
        }
    }
}
