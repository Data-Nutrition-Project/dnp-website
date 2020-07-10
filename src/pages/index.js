import React from "react"
import { Link } from "gatsby"
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import classNames from "classnames"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styles from "./index.module.css"

const IndexPage = (props) => (
    <Layout>
        <section
            id="slider"
            className={classNames(styles.slider,styles.sliderParallax,'full-screen', 'dark')}
        >
            <div className={styles.sliderParallaxInner}>
                <div className="container vertical-middle clearfix">
                    <div className={styles.titleBlock}>
                        <h1 className={styles.pageTitleHeader}>{"The Data Nutrition Project"}</h1>
                        <span className={styles.pageTitleSpan}>{"Empowering data scientists and policymakers with practical tools to improve AI outcomes"}</span>
                    </div>
                    <div className={styles.centerText}>
                        <Link to="/page-2" className={styles.tealButtonLink}>
                            <Button className={styles.tealButton}> 
                                <i className="icon-play-circle"></i>solution
                            </Button>
                        </Link>
                        <a className={styles.tealButtonLink} href="https://arxiv.org/abs/1805.03677" target="_blank">
                            <Button className={styles.tealButton}>
                                <i className="icon-line-paper"></i>paper
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <section id="content" className={styles.section}>
            <Container className={styles.clearfix}>
                <div id="section-mission" className={classNames(styles.headingBlock, styles.centerText, styles.pageSection)}>
                    <h2>Our Mission</h2>
                </div>
                <Row className={styles.missionRow}>
                    <Col md={{ span: 4, offset: 2 }} sm={{ span: 6 }}>
                        <div>
                            <h3>
                                We believe that technology should help us move forward without mirroring existing systemic injustice
                            </h3>
                        </div>
                    </Col>
                    <Col md={{ span: 5 }} sm={{ span: 6 }}>
                        <div>
                            <p className={styles.lead}>The Data Nutrition Project team:</p>
                            <ul className={styles.missionList}>
                                <li>1. Creates tools and practices that encourage responsible AI development</li>
                                <li>2. Partners across disciplines to drive broader change</li>
                                <li>3. Builds inclusion and equity into our work</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                <div className={styles.centerText}>
                    <p className={styles.lead}>Want to get involved? <a href="#section-contact">Contact Us!</a></p>
                </div>
            </Container>
        </section>
        <div className={classNames(styles.section, styles.modGray)}>
            <Container className={styles.clearfix}>
                <div id="section-problem" className={classNames(styles.headingBlock, styles.centerText, styles.pageSection)}>
                    <h2>The Problem</h2>
                    <span className={styles.headingSubHeader}>Garbage in, Garbage out</span>
                </div>
                <Row id="side-navigation">
                    <Col md={{ span: 4 }}>
                        <div id="snav-content1">
                            <h3>Incomplete, misunderstood, and historically problematic data can negatively influence AI algorithms.</h3>
                            Algorithms matter, and so does the data they’re trained on. To improve the accuracy and fairness of algorithms that determine everything from navigation directions to mortgage approvals, we need to make it easier for practitioners to quickly
                            assess the viability and fitness of datasets they intend to train AI algorithms on.
                            <br/><br/>
                            There’s a missing step in the AI development pipeline: assessing datasets based on standard quality measures that are both qualitative and quantitative.
                            We are working on packaging up these measures into an easy to use <i>Dataset Nutrition Label</i>.
                        </div>
                    </Col>
                    <Col md={{ span: 8 }}>
                        <img
                            className={styles.img}
                            src={require("../images/diagram.png")}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
        <section id="content" className={styles.section}>
            <Container className={styles.clearfix}>
                <div id="section-solution" className={classNames(styles.headingBlock, styles.centerText, styles.pageSection)}>
                    <h2>Technical Solution</h2>
                    <span className={styles.headingSubHeader}>Standard interactive reports</span>
                </div>
                <Row id="side-navigation">
                    <Col md={{ span: 4 }}>
                        <div id="snav-content1">
                            <h3>A "nutrition label" for datasets.</h3>
                            The Data Nutrition Project aims to create a standard label for interrogating datasets for measures that will ultimately drive the creation of better, more inclusive algorithms. <br /><br /> Our current prototype includes a highly-generalizable interactive
                            data diagnostic label that allows for exploring any number of domain-specific aspects in datasets. Similar to a nutrition label on food, our Dataset Nutrition Label aims to highlight the key ingredients in a dataset such as meta-data and populations, as well as
                            unique or anomalous features regarding distributions, missing data, and comparisons to other ‘ground truth’ datasets. We are currently testing our label on several datasets, with an eye towards open sourcing this effort and gathering community
                            feedback. <br /><br /> The design utilizes a ‘modular’ framework that can be leveraged to add or remove areas of investigation based on the domain of the dataset. For example, Dataset Nutrition Labels for data about people may include modules about the representation
                            of race and gender, while Nutrition Labels for data about trees may not require that module. <br /> <br /> To learn more, check out our <a href="https://ahmedhosny.github.io/datanutrition/" target="_blank">live prototype</a> built
                            on the Dollars for Docs dataset from <a href="https://www.propublica.org/" target="_blank">ProPublica</a>. A first draft of our paper can be found <a href="https://arxiv.org/abs/1805.03677" target="_blank">here</a>.
                        </div>
                    </Col>
                    <Col md={{ span: 8 }}>
                        <img
                            className={styles.img}
                            src={require("../images/label.png")}
                        />
                    </Col>
                </Row>
            </Container>
        </section>
        <div className={classNames(styles.section, styles.modGray)}>
            <Container className={styles.clearfix}>
                <div className={classNames(styles.headingBlock, styles.centerText, styles.pageSection)}>
                    <h2>Community Solution</h2>
                    <span className={styles.headingSubHeader}>Workshops and Conversations</span>
                </div>
                <Row id="side-navigation">
                    <Col md={{ span: 4 }}>
                        <div id="snav-content1">
                            We believe that building artificial intelligence is as much about learning as it is about technical implementation. Through our workshop series, the Data Nutrition Project brings a curriculum of awareness to organizations of all sizes and types - from small technical teams to larger, non-technical communities.
                            <br />
                            <br />
                            <h3>Demystifying AI Workshop</h3>
                            Our first workshop in the series is a brief, non-technical overview of how Artificial Intelligence (AI) algorithms work. Participants participate in an experiential activity in which you get to “be the algorithm”, and afterwards reflect on how bias is perpetuated in the stages of algorithm development you experienced. We also tie this experience into current industry themes and examples and discuss the complexities of building tools that mitigate the issue.
                            <br />
                            <br />
                            This workshop is great for community groups looking to better understand how AI works, and how it is used in tools that we all use on a daily basis. It's also helpful for tech professionals who do not code, such as designers, project managers, etc. <a href="#section-contact">Contact Us</a> to find out more!
                        </div>
                    </Col>
                    <Col md={{ span: 8 }}>
                        <img
                            className={styles.img}
                            src={require("../images/dnp-2.jpg")}
                        />
                        <div class={styles.photoCredit}>
                            <span>Photo Credit: <a href="http://www.jsbenjamin.com/" target="_blank">Jess Benjamin</a></span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        <div className={styles.sectionImage}>
            <img
                src={require("../images/newman-76edit.jpg")}
                className={classNames(styles.sectionImageImg, styles.img)}
            />
        </div>
        <div class={classNames(styles.photoCredit, styles.modGray)}>
            <span>Photo Credit: <a href="http://www.jsbenjamin.com/" target="_blank">Jess Benjamin</a></span>
        </div>
        <div className={classNames(styles.section, styles.modPictureAbove, styles.modPictureBelow)}>
            <section id="section-team" className={styles.pageSection}>
                <div className={classNames(styles.headingBlock, styles.centerText)}>
                    <h2>Our Team</h2>
                    <span className={styles.headingSubHeader}>We are a group of researchers and technologists working together to tackle the challenges of ethics and governance of Artificial Intelligence as a part of the <a href="https://bkmla.org/" target="_blank">Assembly program</a> at the Berkman Klein Center at Harvard University &amp; MIT Media Lab. <br/><br/>
                    <i id="disclaimer" className={styles.disclaimer}>Please note: This project is the work of individuals who participated in the Assembly program. If named, participants' employers are provided for identification purposes only.</i></span>
                </div>
                <Container className={styles.clearfix}>
                    <Row>
                        <Col md={{ span: 6 }} className={"bottommargin"}>
                            <div className={classNames(styles.team, styles.teamList, styles.clearfix)}>
                                <div className={styles.teamImage}>
                                    <img
                                        className={styles.teamImageImg}
                                        src={require("../images/chmielinski_kasia.png")}
                                        alt="chmielinski_kasia"
                                    />
                                </div>
                                <div className={styles.teamDesc}>
                                    <div className={styles.teamTitle}>
                                        <h4 className={styles.teamTitleName}>Kasia Chmielinski</h4>
                                        <span className={styles.teamTitleRole}>Project Lead</span>
                                    </div>
                                    <div className={styles.teamContent}>Technologist at McKinsey working to drive impact in the healthcare industry through advanced analytics. Previously at The US Digital Service (The White House) and the Scratch project at the MIT Media Lab. Ex-Googler, native Bostonian. Dabbled in architecture at the Chinese University of Hong Kong before graduating with a degree in physics from Harvard University. Avid bird-watcher.</div>
                                    <a
                                        href="https://www.linkedin.com/in/kchmielinski/"
                                        target="_blank"
                                        className="social-icon si-rounded si-small si-linkedin"
                                    >
                                        <i className="icon-linkedin"></i>
                                    </a>
                                </div>
                            </div>
                        </Col>
                        <Col md={{ span: 6 }} className={"bottommargin"}>
                            <div className={classNames(styles.team, styles.teamList, styles.clearfix)}>
                                <div className={styles.teamImage}>
                                    <img
                                        className={styles.teamImageImg}
                                        src={require("../images/newman_sarah_1.png")}
                                        alt="newman_sarah"
                                    />
                                </div>
                                <div className={styles.teamDesc}>
                                    <div className={styles.teamTitle}>
                                        <h4 className={styles.teamTitleName}>Sarah Newman</h4>
                                        <span className={styles.teamTitleRole}>Research &amp; Strategy</span>
                                    </div>
                                    <div className={styles.teamContent}>Senior Researcher at metaLAB at Harvard, Fellow at the Berkman Klein Center for Internet &amp; Society, AI Grant Fellow. Studies new technologies and their effects on people. Creates interactive art installations that explore social and cultural dimensions of new tech, runs research workshops with creative materials. Leads metaLAB's work on AI + Art. Persuaded by the power of metaphors.</div>
                                    <a
                                        href="https://www.linkedin.com/in/sarah-newman-ba340867/"
                                        target="_blank"
                                        className="social-icon si-rounded si-small si-linkedin"
                                    >
                                        <i className="icon-linkedin"></i>
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
  </Layout>
)

export default IndexPage
