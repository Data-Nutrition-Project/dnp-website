import React from "react"
import { Link } from "gatsby"
import { AnchorLink } from "gatsby-plugin-anchor-links"
import classNames from "classnames"

import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Slider from 'react-slick'

import Banner from "../components/Banner"
import Bio from "../components/Bio"
import Layout from "../components/layout"

import * as styles from "./index.module.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ 
        ...style, 
        display: "block", 
        background: styles.darkSlateBlue, 
        borderRadius: "1rem",
        paddingTop: "2px"
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ 
        ...style, 
        display: "block", 
        background: styles.darkSlateBlue, 
        borderRadius: "1rem",
        paddingTop: "2px"
      }}
      onClick={onClick}
    />
  );
}

const IndexPage = props => (
  <Layout>
    <Banner
      content="PUBLIC AI SUMMIT: Join us August 13-14, 2025 to learn more about AI! [Register Now &rarr;](https://publicaisummit.org/)"
    />
    <section
      id="slider"
      className={classNames(
        styles.slider,
        styles.sliderParallax,
        "full-screen",
        "dark"
      )}
    >
      <div className={styles.sliderParallaxInner}>
        <div className="vertical-middle clearfix">
          <div className={styles.titleBlock}>
            <h1 className={styles.pageTitleHeader}>
              {"The Data Nutrition Project"}
            </h1>
            <span className={styles.pageTitleSpan}>
              {
                "Empowering data scientists and policymakers with practical tools to improve AI outcomes"
              }
            </span>
          </div>
          <div className={classNames(styles.centerText, styles.mobileSpacer)}>
            <a href={process.env.GATSBY_LABELMAKER_URL} className={styles.tealButtonLink}>
              <Button
                className={classNames(styles.tealButton, styles.modButtonLarge)}
              >
                <img 
                    src={require('../images/linkimg.png').default}
                    alt="external link icon"
                    className={styles.icon}
                />
                the dataset nutrition label
              </Button>
            </a>
            <AnchorLink to="/#section-solution-research" className={styles.tealButtonLink}>
              <Button
                className={classNames(styles.tealButton, styles.modButtonLarge)}
              >
                <i className="icon-line-paper"></i>our research
              </Button>
            </AnchorLink>
          </div>
        </div>
      </div>
    </section>
    <section className={styles.section}>
      <Container fluid>
        <div
          id="section-mission"
          className={classNames(
            styles.headingBlock,
            styles.centerText,
            styles.pageSection
          )}
        >
          <h2>Our Mission</h2>
        </div>
        <Row className={styles.missionRow}>
          <Col lg={{ span: 3, offset: 3 }} md={{ span: 6 }}>
            <div>
              <p className={styles.headerSentence}>
                We believe that technology should help us move forward without
                mirroring societal biases
              </p>
            </div>
          </Col>
          <Col lg={{ span: 4 }} md={{ span: 6 }}>
            <div>
              <p className={styles.lead}>The Data Nutrition Project team:</p>
              <ul className={styles.missionList}>
                <li>
                  1. Creates tools and practices that encourage responsible AI
                  development
                </li>
                <li>2. Partners across disciplines to drive broader change</li>
                <li>3. Builds inclusion and equity into our work</li>
              </ul>
            </div>
          </Col>
        </Row>
        <div className={styles.centerText}>
          <p className={styles.lead}>
            Want to get involved? <AnchorLink to="/#section-contact">Contact Us!</AnchorLink>
          </p>
        </div>
      </Container>
    </section>
    <div className={classNames(styles.section, styles.modGray)}>
      <Container fluid>
        <div
          id="section-problem"
          className={classNames(
            styles.headingBlock,
            styles.centerText,
            styles.pageSection
          )}
        >
          <h2>The Problem</h2>
          <span className={styles.headingSubHeader}>
            Garbage in, Garbage out
          </span>
        </div>
        <Row>
          <Col xl={{ span: 4, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12}>
            <div>
              <p className={styles.headerSentence}>
                Incomplete, misunderstood, and historically problematic data can
                negatively influence AI algorithms.
              </p>
              <p>
                Algorithms matter, and so does the data they’re trained on. To
                improve the accuracy and fairness of algorithms that determine
                everything from navigation directions to mortgage approvals, we
                need to make it easier for practitioners to quickly assess the
                viability and fitness of datasets they intend to train AI
                algorithms on.
              </p>
              <p>
                There’s a missing step in the AI development pipeline: assessing
                datasets based on standard quality measures that are both
                qualitative and quantitative. We are working on packaging up these
                measures into an easy to use <i>Dataset Nutrition Label</i>.
              </p>
            </div>
          </Col>
          <Col xl={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }}>
            <img
              alt="diagram"
              className={styles.img}
              src={require("../images/diagram.png").default}
            />
          </Col>
        </Row>
      </Container>
    </div>
    <section id="content" className={styles.section}>
      <Container fluid>
        <div
          id="section-solution-tool"
          className={classNames(
            styles.headingBlock,
            styles.centerText,
            styles.pageSection
          )}
        >
          <h2>The Dataset Nutrition Label</h2>
          <span className={styles.headingSubHeader}>
            A "nutrition label" for datasets.
          </span>
        </div>
        <Row>
          <Col xl={{ span: 4, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12}>
            <p className={styles.headerSentence}>
              The Data Nutrition Project aims to create a standard label for interrogating datasets.
            </p>
            <p>
              Our belief is{' '}
              that deeper transparency into dataset health can lead to better{' '}
              data decisions, which in turn lead to better AI.
            </p>
            <p>
              Founded in 2018 through the{' '}
              <a href="https://www.berkmankleinassembly.org/" target="_blank" rel="noopener noreferrer">Assembly Fellowship</a>,{' '}
              The Data Nutrition{' '}
              Project takes inspiration from nutritional labels on food, aiming{' '}
              to build labels that highlight the key ingredients in a dataset such{' '}
              as metadata and demographic representation, as well as unique or anomalous{' '}
              features regarding distributions, missing data, and comparisons{' '}
              to other "ground truth" datasets. 
            </p>
            <p>
              Building off of the modular framework initially presented in our{' '}
              <a href="https://ahmedhosny.github.io/datanutrition/">
                2018 prototype
              </a>{' '}
              and further refined in our <a href="https://arxiv.org/abs/2201.03954">2nd Generation Label (2020)</a>,
              based on feedback from data scientists and dataset owners, we{' '}
              have further adjusted the Label to support a common user journey: a data{' '}
              scientist looking for a dataset with a particular purpose in mind.{' '}
              The <a href={process.env.GATSBY_LABELMAKER_URL}>third generation Dataset Nutrition Label</a>{' '}
              now provides information about a dataset including its{' '}
              intended use and other known uses, the process of cleaning, managing, and curating that data, ethical 
              and or technical reviews, the inclusion of subpopulations in the dataset, and a series of potential 
              risks or limitations in the dataset. You may additionally want to read <a href="https://arxiv.org/abs/2201.03954">here</a> 
              about the second generation (2020) label, which informed the third generation label.             
            </p>
            <Row style={{'justify-content': 'space-around'}}>
              <a href={process.env.GATSBY_LABELMAKER_URL}>
                <Button
                  className={classNames(styles.tealButton, styles.modButtonMed, styles.modButtonParagraph, styles.mobileSpacer)}
                >
                  <img 
                      src={require('../images/linkimg.png').default}
                      alt="external link icon"
                      className={styles.icon}
                  />
                  Build a Label
                </Button>
              </a>
            </Row>
          </Col>
          <Col xl={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }}>
            <img
              alt="label display"
              className={styles.img}
              src={require("../images/label_v3.jpg").default}
            />
            <div class={styles.photoCredit}>
              <span>
                Third Generation Dataset Nutrition Label (2022)
              </span>
            </div> 
          </Col>
        </Row>
      </Container>
    </section>
    <div className={classNames(styles.section, styles.modGray)}>
      <Container fluid>
        <div
          id="section-solution-research"
          className={classNames(
            styles.headingBlock,
            styles.centerText,
            styles.pageSection
          )}
        >
          <h2>Research</h2>
          <span className={styles.headingSubHeader}>
            Published and Related Works
          </span>
        </div>
        <Row>
          <Col xl={{ span: 4, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12}>
            <p className={styles.headerSentence}>
              DNP is a research organization as well as a product development team.
            </p>
            <p>
              Alongside development of the tool, we have been doing ongoing research{' '}
              into the <b>broader landscape of tools and practices designed to address problems{' '}
              in underlying data</b>, whether due to the data itself, the data collection{' '}
              practices, or the dataset documentation. 
            </p>
            <p>
              We take inspiration from related initiatives such as <a href=" https://arxiv.org/pdf/1803.09010.pdf">Datasheets for Datasets</a> [Gebru et al],{' '}
              <a href="https://arxiv.org/pdf/1804.07890.pdf">A Nutrition Label for Rankings</a> [Yang et al], and <a href="https://www.mitpressjournals.org/doi/pdf/10.1162/tacl_a_00041">Data Statements for Natural Language Processing</a> [Bender, Friedman],{' '}
              and have been heartened to see that this area of work has inspired some of the large platforms and research initiatives with their own related projects,{' '}
              including <a href="https://www.wired.com/story/apple-app-privacy-labels/">Apple’s Privacy Labels</a>, <a href="https://modelcards.withgoogle.com/about">Google’s Model Cards</a>,{' '}
              <a href="https://aifs360.mybluemix.net/">IBM’s AI FactSheets 360</a>, and <a href="https://www.partnershiponai.org/about-ml/">Partnership on AI About ML Project</a>.{' '}
              For more information about the broad and growing landscape of research related to bias in AI, we recommend the excellent [<a href="https://arxiv.org/pdf/1905.06876.pdf">Morley et al</a>]{' '}
              and [<a href="https://arxiv.org/pdf/1908.09635.pdf">Mehrabi et al</a>] papers, both of which give useful overviews of methods related to bias and fairness.
            </p> 
          </Col>
          <Col xl={{ span: 5 }} lg={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }}>
            <div className={styles.talksSection}>
              <p className={styles.headerSentence}>
                Recent Publications
              </p>
              <ListGroup>
                <ListGroup.Item>
                  <a href="https://shorensteincenter.org/clear-documentation-framework-ai-transparency-recommendations-practitioners-context-policymakers/">
                    The CLeAR Documentation Framework
                  </a> for AI Transparency, Harvard Kennedy School Report (2024)
                </ListGroup.Item>
                <ListGroup.Item>
                  <a href="https://centre.humdata.org/quality-measures-for-humanitarian-data/">
                    Quality Measures for Humanitarian Data
                  </a>, in collaboration with the United Nations Humanitarian Data Exchange (2023)
                </ListGroup.Item>
                <ListGroup.Item>
                  <a href="https://cyber.harvard.edu/story/2022-11/bkc-comment-ftc-transparency-and-commercial-surveillance">
                    Comment: FTC Trade Regulation Rule on Commercial Surveillance and Data Security
                  </a>, in collaboration with Berkman Klein Center at Harvard University (2022)
                </ListGroup.Item>
                <ListGroup.Item>
                  <a href="https://arxiv.org/abs/2201.03954">
                    The Dataset Nutrition Label (2nd Gen): Leveraging Context to Mitigate Harms in Artificial Intelligence
                  </a>, presented at NeurIPS 2020: Workshop on Dataset Curation and Security (2020)
                </ListGroup.Item>
                <ListGroup.Item>
                  <a href="https://arxiv.org/abs/1805.03677">
                    The Dataset Nutrition Label: A Framework To Drive Higher Data Quality Standards
                  </a> (2018)
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
        </Row>
        <br />
        <div
          id="section-solution-engagement"
          className={classNames(
            styles.headingBlock,
            styles.centerText,
            styles.pageSection
          )}
        >
          <h2>Engagement</h2>
          <span className={styles.headingSubHeader}>
            Projects, Events and Collaborations
          </span>
        </div>
        <Row>
          <Col xl={{ span: 4, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12}>
            <p className={styles.headerSentence}>
              Recent Engagements
            </p>
            <ListGroup>
              <ListGroup.Item>
                <b>Innovation in Regulatory Science awardee, The Burroughs Wellcome Fund</b> (2023)
                <br />
                Awarded for developing an independent audit framework for artificial intelligence in medicine in collaboration with 
                Dr. Rotemberg from Memorial Sloan Kettering Cancer Center
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Infrastructure Grant Awardee, Mozilla Foundation</b> (2023)
                <br />
                Awarded for explorations of the AI auditing landscape through convening experts in a closed-door, facilitated session
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Putting Science into Standards (PSIS) Program, the European Commission’s Joint Research Centre (JRC) CEN, CENELEC</b> (2022)
                <br />
                Participation in programming around dataset standards
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Digital Humanity Award, Prix Ars Electronica</b> (2022) 
                <br />
                International arts-science honor awarded to the Data Nutrition Project for the design and release of the second generation of the 
                Dataset Nutrition Label 
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col xl={{ span: 5 }} lg={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }}>
            <p className={styles.headerSentence}>
              Collaboration with ASL Citizen Dataset Team
            </p>
            <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
              <iframe 
                src="https://player.vimeo.com/video/947450120?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                frameborder="0" 
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write" 
                style={{ position: 'absolute', top:0, left:0, width: '100%', height: '100%'}}
                title="Redefining Data"
              ></iframe>
            </div>
            <script src="https://player.vimeo.com/api/player.js"></script>
          </Col>
        </Row>
      </Container>
    </div>
     <div
      id="section-featured-collab"
      className={styles.section}
    >
      <div
        className={classNames(
          styles.headingBlock,
          styles.centerText,
          styles.pageSection
        )}
      >
        <h2>Featured Collaboration - Microsoft Research</h2>
        <p>
          DNP has been working with Microsoft Research to develop educational anmiations about data transparency to highlight inclusive methods for research and dataset creation.
        </p> 
      </div>
      <Container>
        <Row>
          <Slider
            id="collab-slider"
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
          >
            <div>
              <p className={styles.headerSentence}>
                Is a Dosa a Crepe? The Importance of Cultural Diversity in AI Training Data
              </p>
              <p>
                Co-created between the Data Nutrition Project and the Microsoft Research DOSA team, 
                this animation showcases the DOSA team’s{' '}
                <a href="https://aclanthology.org/2024.lrec-main.474.pdf">research insights</a>, including 
                the lack of Indian cultural knowledge in AI training data and how to work with local 
                populations to create high quality datasets. 
              </p>
              <div className={styles.sliderSlide}>
                <iframe 
                  className={styles.sliderSlideIframe}
                  src="https://player.vimeo.com/video/1018720653?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                  title="Is a Dosa a Crepe? The Importance of Cultural Diversity in AI Training Data"                  
                  frameborder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write" 
                ></iframe>
              </div>
              <script src="https://player.vimeo.com/api/player.js"></script>
            </div>
            <div className={styles.sliderSlide}>
              <p className={styles.headerSentence}>
                What Language Does AI Speak? by the Data Nutrition Project | AAAI-24 Award Winner
              </p>
              <p>
                Co-created between the Data Nutrition Project and the ASL Citizen Dataset team, 
                this animation summarizes the{' '}
                <a href="https://arxiv.org/pdf/2304.05934">team’s research</a> on the limitations 
                and gaps in AI ASL translation tools and offers recommendations for how to create 
                more accurate, equitable, and useful translation tools by engaging with the ASL community. 
              </p>
              <div className={styles.sliderSlide}>
                <iframe
                  className={styles.sliderSlideIframe}
                  src="https://www.youtube-nocookie.com/embed/XsGqgaxy3Mo?si=swanV83Lhwd4sPm2"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                ></iframe>
              </div>
            </div>
          </Slider>
        </Row>
      </Container>
    </div>
    <section id="content" className={classNames(styles.section, styles.modGray)}>
      <Container fluid>
        <div
          id="section-solution-services"
          className={classNames(
            styles.headingBlock,
            styles.centerText,
            styles.pageSection
          )}
        >
          <h2>Services</h2>
          <span className={styles.headingSubHeader}>
            Demystifying how AI Perpetuates Systemic Biases
          </span>
        </div>
        <Row>
          <Col xl={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12}>
            <p className={styles.headerSentence}>
              We believe that building artificial intelligence is as much about learning as it is about technical implementation.
            </p>
            <p>
              To that end, the Data Nutrition Project offers certification, consulting and educational services 
              that address data quality and transparency. We offer these services to organizations of all sizes and types - from small
              technical teams to larger, non-technical communities. Our services include:
            </p>
          </Col>
          <Col xl={{ span: 4, offset: 1 }} lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }}>
            <img
              alt="workshop presentation"
              className={styles.img}
              src={require("../images/dnp-2.jpg").default}
            />
            <div class={styles.photoCredit}>
              <span>
                Photo Credit:{" "}
                <a
                  href="http://www.jsbenjamin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jess Benjamin
                </a>
              </span>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xl={{ span: 3, offset: 1}} lg={6} md={12}>
            <Card>
              <Card.Body className={styles.modGray}>
                <Card.Title className={styles.subHeaderSentence}>
                  Label-as-a-Service
                </Card.Title>
                <Card.Text>
                  Creating nutrition labels for datasets is helpful for ensuring thoughtful usage of public data and also as a form 
                  of transparency and trust-building with the public when releasing products built on proprietary data. If you would 
                  like to create a Dataset Nutrition Label on a proprietary dataset, DNP can work with you to build a certified 
                  Dataset Nutrition Label. 
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={4} lg={6} md={12}>
            <Card>
              <Card.Body className={styles.modGray}>
                <Card.Title className={styles.subHeaderSentence}>
                  Data System Consulting
                </Card.Title>
                <Card.Text>
                  When documentation is created at the end of an algorithmic decision making process, you run the risk of discovering 
                  too late that the data used may present some unintended risks. One way to address this issue is by learning how to 
                  incorporate the concepts that are part of the Dataset Nutrition Labeling process within your dataset definition and 
                  collection processes. If you build the concepts into your process, you will end up with better quality data, and 
                  will be able to produce documentation quickly and easily. We offer strategic consulting to help organizations and 
                  teams sustainably embed these responsible data practices into their product development. 
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={3} lg={6} md={12}>
            <Card>
              <Card.Body className={styles.modGray}>
                <Card.Title className={styles.subHeaderSentence}>
                  Professional Development Workshops
                </Card.Title>
                <Card.Text>
                  When building artificial intelligence systems, it is important to understand both the technical tools required 
                  and the social context in which the system sits. Through our educational offerings, the Data Nutrition Project trains 
                  organizations of all sizes — from small technical teams to large, non-technical communities — to understand and approach 
                  AI from a sociotechnical perspective.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
        <br />
        <Row style={{ 'justify-content': 'center' }}>
            <b className={styles.centerText}>
              If you'd like to find out more about our services, please reach out!
            </b>
            <Button
              as="a"
              href="mailto:info@datanutrition.org"
              className={classNames(styles.tealButton, styles.modButtonLarge)}
            >
              <i class="icon-line2-users"></i>{' '}Contact Us
            </Button>
        </Row>
      </Container>
    </section>
    <div className={styles.sectionImage}>
      <img
        alt="DNP member presenting"
        src={require("../images/newman-76edit.jpg").default}
        className={classNames(styles.sectionImageImg, styles.img)}
      />
    </div>
    <div class={classNames(styles.photoCredit, styles.modGray)}>
      <span>
        Photo Credit:{" "}
        <a
          href="http://www.jsbenjamin.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jess Benjamin
        </a>
      </span>
    </div>
    <div
      className={classNames(
        styles.section,
        styles.modPictureAbove,
        styles.modPictureBelow
      )}
    >
      <section id="section-team" className={styles.pageSection}>
        <div className={classNames(styles.headingBlock, styles.centerText)}>
          <h2>Our Team</h2>
          <span className={styles.headingSubHeader}>
            We are a group of researchers and technologists working together to
            tackle the challenges of ethics and governance of Artificial
            Intelligence.
          </span>
        </div>
        <Container fluid>
          <Row>
            <Col xl={{ span: 5, offset: 1 }} md={12}>
              <Bio
                imgPath={require("../images/chmielinski_kasia.jpg").default}
                imgAlt="chmielinski_kasia"
                name="Kasia Chmielinski"
                role="Project Lead"
                bio="Technologist and product leader focused on building data-driven systems. Current Digital Civil Society Practitioner Fellow (Stanford University) and Affiliate at the Berkman Klein Center (Harvard University). Previously at McKinsey &amp; Company, the US Digital Service, MIT Media Lab, and Google. Native Bostonian, enthusiastic cyclist. Avid bird-watcher."
                socialMedia={[
                  {
                    href: "https://www.kasiachmielinski.com/",
                    icon: "icon-line-globe",
                    className: "si-dribble",
                  },
                  {
                    href: "https://www.linkedin.com/in/kchmielinski/",
                    icon: "icon-linkedin",
                    className: "si-linkedin",
                  },
                ]}
              />
            </Col>
            <Col xl={{ span: 5 }} md={12}>
              <Bio
                imgPath={require("../images/newman_sarah_1.png").default}
                imgAlt="newman_sarah"
                name="Sarah Newman"
                role="Research Lead"
                bio="Director of Art &amp; Education at metaLAB at Harvard. Interested in interrelations within complex systems. Creates interactive art installations that explore social and cultural dimensions of new tech; runs critical and creative workshops on AI. Persuaded by the power of metaphors. Avid sheller."
                socialMedia={[
                  {
                    href: "https://www.linkedin.com/in/sarah-newman-ba340867/",
                    icon: "icon-linkedin",
                    className: "si-linkedin",
                  },
                ]}
              />
            </Col>
            <Col xl={{ span: 5, offset: 1 }} md={12}>
              <Bio
                imgPath={require("../images/taylor_matt.png").default}
                imgAlt="taylor_matt"
                name="Matt Taylor"
                role="Data Science &amp; Workshop Facilitation"
                bio="Freelance learning experience designer and facilitator, with a background in AI implementation. Previously worked as an engineer in natural language processing, moderation tool development, and creative coding platform development. Currently creating learning experiences in STEAM for young people, and demystifying AI for all people. Also spends time developing tech tools for mutual aid orgs, and organizing tech workers for social justice. Seasoned pun specialist."
                socialMedia={[
                  {
                    href: "https://mewtaylor.com/",
                    icon: "icon-line-globe",
                    className: "si-dribble",
                  },
                  {
                    href: "https://www.linkedin.com/in/matthew-taylor-03694642/",
                    icon: "icon-linkedin",
                    className: "si-linkedin",
                  },
                  {
                    href: "https://github.com/mewtaylor",
                    icon: "icon-github",
                    className: "si-github",
                  },
                ]}
              />
            </Col>
            <Col xl={{ span: 5 }} md={12}>
              <Bio
                imgPath={require("../images/yurkofsky_jess.jpg").default}
                imgAlt="yurkofsky_jessica"
                name="Jessica Yurkofsky"
                role="Design Research Collaborator"
                bio="Designer, technologist, and librarian focused on visual communication and experimental pedagogy. Principal at Harvard's metaLAB, with a background in Sociology and Urban Planning. Lives in the woods in Vermont. Dedicated builder of cardboard models and drawer of cartoons."
                socialMedia={[
                  {
                    href: "http://jessyurko.com/",
                    icon: "icon-line-globe",
                    className: "si-dribble",
                  },
                ]}
              />
            </Col>
            <Col xl={{ span: 5, offset: 1 }} md={12}>
              <Bio
                imgPath={require("../images/kranzinger_chris.png").default}
                imgAlt="kranzinger_chris"
                name="Chris Kranzinger"
                role="Data Science Advisor"
                bio="Data Scientist, Economist, and ML enthusiast combining data science and economics to inform strategic decision making and studies questions around trust and safety in AI. Former McCloy Fellow at Harvard and current Sr. Applied Scientist at Uber with a background in Engineering and Economics."
                socialMedia={[
                  {
                    href: "https://www.linkedin.com/in/cnk/",
                    icon: "icon-linkedin",
                    className: "si-linkedin",
                  },
                  {
                    href: "https://github.com/chksi",
                    icon: "icon-github",
                    className: "si-github",
                  },
                ]}
              />
            </Col>
            <Col xl={{ span: 5 }} md={12}>
              <Bio
                imgPath={require("../images/teyrouz_carine.jpeg").default}
                imgAlt="teyrouz_carine"
                name="Carine Teyrouz"
                role="UX Design Collaborator"
                bio="NN/g certified product designer, UX mentor &amp; facilitator. Holds a master’s degree in design &amp; web project management. Currently working with startups &amp; SMEs on applying design thinking methodologies to create intuitive and easy-to-use digital products."
                socialMedia={[
                  {
                    href: "https://www.linkedin.com/in/carineteyrouz/",
                    icon: "icon-linkedin",
                    className: "si-linkedin",
                  }
                ]}
              />
            </Col>
            <Col xl={{ span: 5, offset: 1 }} md={12}>
              <Bio
                imgPath={require("../images/king_hg.jpg").default}
                imgAlt="king_hg"
                name="HG King"
                role="Software Engineering Collaborator"
                bio="NYC-based software engineer and consultant, with a focus on driving innovation and business value using an Agile and scrappy approach to build products with clients. Occasionally helps artists with technology. Interested in technology and sustainability, specifically how technology is connected to modern social issues in the form of problems or solutions."
                socialMedia={[
                  {
                    href: "https://www.linkedin.com/in/hgking/",
                    icon: "icon-linkedin",
                    className: "si-linkedin",
                  }
                ]}
              />
            </Col>
            <Col xl={{ span: 5 }} md={12}>
              <Bio
                imgPath={require("../images/chang_audrey.jpg").default}
                imgAlt="chang_audrey"
                name="Audrey Chang"
                role="Research Collaborator"
                bio="Undergraduate studying statistics and sociology at Harvard to advocate for responsible AI-related innovation, with special consideration to combatting technology’s reproduction of current societal inequities. Previously, researched cancer biology at Stanford and materials science at Harvard. Keen on exploring the design of physical and social spaces. Crafty naturalist. Bay Area native."
                socialMedia={[]}
              />
            </Col>
            <Col xl={{ span: 5, offset: 1 }} md={12}>
              <Bio
                imgPath={require("../images/thomas_kemi.jpg").default}
                imgAlt="thomas_kemi"
                name="Kemi Thomas"
                role="Software Engineering Collaborator"
                bio="Full-stack engineer passionate about building REST API applications and making people’s lives easier. Primary focus in the NERD stack (Node.js, Express, React, Databases using SQL), but open to other technologies. Background in journalism and associate production, most recently at a top 20 news station."
                socialMedia={[
                  {
                    href: "https://www.linkedin.com/in/kemi-thomas/",
                    icon: "icon-linkedin",
                    className: "si-linkedin",
                  },
                  {
                    href: "https://github.com/kem247",
                    icon: "icon-github",
                    className: "si-github",
                  },
                ]}
              />
            </Col>
          </Row>
          <div className={classNames(styles.headingBlock, styles.centerText)}>
            <h2>Collaborators</h2>
          </div>
          <Row>
            <Col xl={{ span: 5, offset: 1 }} md={12}>
              <Bio
                imgPath={require("../images/rotemberg_veronica.jpg").default}
                imgAlt="Dr_Veronica_Rotemberg"
                name="Dr. Veronica Rotemberg"
                role="Research Collaborator"
                bio="Dr. Veronica Rotemberg is a dermatologist at Memorial Sloan Kettering Cancer Center (MSK). Dr. Rotemberg directs the imaging informatics program in the dermatology service and sees patients at high risk for skin cancer.  She received her MD-PhD from Duke University with a PhD in biomedical engineering focusing on elasticity imaging. She leads the AI working group for the International Skin Imaging Collaboration and is especially interested in imaging standards and evaluating challenges and biases of AI when applied to clinical settings."
                socialMedia={[
                  {
                    href: "https://www.mskcc.org/cancer-care/doctors/veronica-rotemberg",
                    icon: "icon-line-globe",
                    className: "si-dribble",
                  },
                  {
                    href: "https://www.isic-archive.com/#!/topWithHeader/wideContentTop/main",
                    icon: "icon-line-globe",
                    className: "si-dribble",
                  },
                  {
                    href: "http://twitter.com/Dr_Vron",
                    icon: "icon-twitter",
                    className: "si-twitter",
                  }
                ]}
              />
            </Col>
            <Col xl={{ span: 5 }} md={12}>
              <Bio
                imgPath={require("../images/raii.jpeg").default}
                imgAlt="raii"
                name="Responsible AI Institute"
                role="Research Collaborator"
                bio="Responsible AI Institute is a non-profit building tangible governance tools to address growing concerns about AI. Their mission is to catalyze the practical and responsible design, development, and use of AI. Their tools have been among the first to demonstrate how to turn responsible AI principles into action. Bringing extensive experience in responsible AI policy and the development of AI systems for industry, Responsible AI Institute is uniquely positioned to partner with organizations across public and private sectors to guide and inform responsible AI governance around the world."
                socialMedia={[
                  {
                    href: "https://www.responsible.ai/",
                    icon: "icon-line-globe",
                    className: "si-dribble",
                  },
                  {
                    href:
                      "https://www.linkedin.com/company/responsible-ai-institute/",
                    icon: "icon-linkedin",
                    className: "si-linkedin",
                  },
                  {
                    href: "https://twitter.com/ResponsibleAI",
                    icon: "icon-twitter",
                    className: "si-twitter",
                  },
                  {
                    href: "https://www.instagram.com/responsibleaiglobal/",
                    icon: "icon-instagram",
                    className: "si-instagram",
                  }
                ]}
              />
            </Col>
            <Col xl={{ span: 5, offset: 1 }} md={12}>
              <Bio
                imgPath={require("../images/sherman_michael.jpeg").default}
                imgAlt="Michael_Sherman"
                name="Michael Sherman"
                role="Children's Book Illustrator"
                bio="Artist, illustrator, and educator in NYC, focusing on the nexus of individuality and community. Rhode Island School of Design graduate, Cill Rialaig Arts Centre resident, Lower Manhattan Cultural Council grantee, and Northwest Review contributor. His current project, “Meta-morphic: a series of 1000 head drawings,” uses drawing as a tool to examine the stewardship and ownership of images and icons. Also known as papa to his two young kids."
                socialMedia={[
                  {
                    href: "http://www.michaelshermanstudio.com/",
                    icon: "icon-line-globe",
                    className: "si-dribble",
                  },
                  {
                    href: "https://www.instagram.com/michaelshermstudio",
                    icon: "icon-instagram",
                    className: "si-instagram",
                  }
                ]}
              />
            </Col>
          </Row>
          <div className={classNames(styles.headingBlock, styles.centerText)}>
            <h2>Former Collaborators</h2>
          </div>
          <Row>
            <Col xl={{ span: 3, offset: 2 }} md={12}>
              <Bio
                alum={true}
                name="Humanity Innovation Labs"
                role="UX Design Collaborator"
                socialMedia={[
                  {
                    href: "https://www.humanityinnovationlabs.com",
                    icon: "icon-line-globe",
                    className: "si-dribble",
                  }
                ]}
              />
            </Col>
            <Col xl={{ span: 3, offset: 3 }} md={12}>
              <Bio
                alum={true}
                name="JustFix.nyc"
                role="Label Research Collaborator"
                socialMedia={[
                  {
                    href: "https://www.justfix.nyc/",
                    icon: "icon-line-globe",
                    className: "si-dribble",
                  }
                ]}
              />
            </Col>
          </Row>
          <div className={classNames(styles.headingBlock, styles.centerText)}>
            <h2>Alums</h2>
          </div>
          <Row>
            <Col xl={{ span: 3, offset: 2 }} md={6}>
              <Bio
                alum={true}
                imgPath={require("../images/holland_sarah.png").default}
                imgAlt="holland_sarah"
                name="Sarah Holland"
                role="Research &amp; Public Policy"
                socialMedia={[
                  {
                    href: "https://www.linkedin.com/in/sarah-holland-b4700946/",
                    icon: "icon-linkedin",
                    className: "si-linkedin",
                  },
                  {
                    href: "http://twitter.com/hollasarahd",
                    icon: "icon-twitter",
                    className: "si-twitter",
                  },
                ]}
              />
            </Col>
            <Col xl={{ span: 3 }} md={6}>
              <Bio
                alum={true}
                imgPath={require("../images/hosny_ahmed.png").default}
                imgAlt="hosny_ahmed"
                name="Ahmed Hosny"
                role="Data Science"
                socialMedia={[
                  {
                    href: "https://ahmedhosny.com/",
                    icon: "icon-line-globe",
                    className: "si-dribble",
                  },
                  {
                    href: "https://www.linkedin.com/in/ahmed-hosny-0a057728/",
                    icon: "icon-linkedin",
                    className: "si-linkedin",
                  },
                  {
                    href: "http://twitter.com/ahmedhosny",
                    icon: "icon-twitter",
                    className: "si-twitter",
                  },
                  {
                    href: "https://github.com/ahmedhosny",
                    icon: "icon-github",
                    className: "si-github",
                  },
                ]}
              />
            </Col>
            <Col xl={{ span: 3 }} md={6}>
              <Bio
                alum={true}
                imgPath={require("../images/josh.jpg").default}
                imgAlt="joseph_josh"
                name="Josh Joseph"
                role="AI Research"
                socialMedia={[
                  {
                    href: "https://www.linkedin.com/in/jmjoseph/",
                    icon: "icon-linkedin",
                    className: "si-linkedin",
                  },
                ]}
              />
            </Col>
            <Col xl={{ span: 3, offset: 2 }} md={6}>
              <Bio
                alum={true}
                imgPath={require("../images/luzzi_erica.png").default}
                imgAlt="luzzi_erica"
                name="Erica Luzzi"
                role="Research &amp; Design Collaborator"
                socialMedia={[
                  {
                    href: "https://www.linkedin.com/in/erica-luzzi-65659213b/",
                    icon: "icon-linkedin",
                    className: "si-linkedin",
                  },
                  {
                    href: "https://www.ericaluzzi.com/",
                    icon: "icon-line-globe",
                    className: "si-dribble",
                  },
                ]}
              />
            </Col>
            <Col xl={{ span: 3 }} md={6}>
              <Bio
                alum={true}
                imgPath={require("../images/oduro_serena.jpg").default}
                imgAlt="oduro_serena"
                name="Serena Oduro"
                role="AI Policy Collaborator"
                socialMedia={[
                  {
                    href: "http://www.linkedin.com/in/serena-oduro",
                    icon: "icon-linkedin",
                    className: "si-linkedin",
                  },
                  {
                    href: "https://twitter.com/serenaoduro",
                    icon: "icon-twitter",
                    className: "si-twitter",
                  },
                ]}
              />
            </Col>
            <Col xl={{ span: 3  }} md={6}>
              <Bio
                alum={true}
                imgPath={require("../images/YQiu.png").default}
                imgAlt="qiu_chelsea"
                name="Chelsea Qiu"
                role="Research &amp; Design"
                socialMedia={[
                  {
                    href: "https://chelseaqiu.com/",
                    icon: "icon-line-globe",
                    className: "si-dribble",
                  },
                  {
                    href: "https://www.linkedin.com/in/chelseaqiu/",
                    icon: "icon-linkedin",
                    className: "si-linkedin",
                  },
                ]}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
    <div className={styles.sectionImage}>
      <img
        alt="divider"
        src={require("../images/dnp-3.jpg").default}
        className={classNames(styles.sectionImageImg, styles.img)}
      />
    </div>
    <div class={classNames(styles.photoCredit, styles.modGray)}>
      <span>
        Photo Credit:{" "}
        <a
          href="http://www.jsbenjamin.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jess Benjamin
        </a>
      </span>
    </div>
    <div
      id="section-faq"
      className={classNames(
        styles.section,
        styles.modPictureAbove,
        styles.modPictureBelow
      )}
    >
      <div
        className={classNames(
          styles.headingBlock,
          styles.centerText,
          styles.pageSection
        )}
      >
        <h2>Frequently Asked Questions</h2>
        <span className={styles.headingSubHeader}>
          A few questions you might have
        </span>
      </div>
      <Container fluid>
        <Row className={styles.faq}>
          <Col md={{ span: 5, offset: 1 }}>
            <h4>
              Q. What inspired this project?
            </h4>
            <p>
              We believe that engineers want to build responsible and smart AI models, but that there is a key step missing in the way these models are built. This step is to interrogate the dataset for a variety of imbalances or problems it may have, and ascertain if it is the right dataset for the model. We are inspired by the FDA's Nutrition Facts label in that it provides basic yet powerful facts that highlight issues in an accessible way. We aspire to do the same for datasets.
            </p>

            <div className={styles.line}></div>

            <h4>
              Q. Where can I see the Dataset Nutrition Label and learn about the methodology? 
            </h4>
            <p>
              You can take a look at the Dataset Nutrition Label&nbsp;
              <a href={process.env.GATSBY_LABELMAKER_URL}>here</a>.&nbsp;
              Older versions (<a href="https://ahmedhosny.github.io/datanutrition/">Label</a>,&nbsp;
              <a href="https://arxiv.org/abs/1805.03677">paper</a>) are also still available online.
            </p>

            <div className={styles.line}></div>

            <h4>
              Q. Who is the intended beneficiary of this work?
            </h4>
            <p>
              Our primary audience for the Dataset Nutrition Label is the data science and developer community who are building  models. An additional audience for our labels are researchers or journalists who want to better understand a particular dataset. We believe that broad, interdisciplinary engagement is required to shift the industry toward better standards of dataset quality and dataset documentation. Thus, we also engage with educators, policymakers, and researchers on best ways to amplify and highlight the potential of the Dataset Nutrition Label and the importance of data interrogation before model creation. If you’re interested in getting involved, please{" "}<a href="mailto:info@datanutrition.org">contact us</a>.
            </p>
          </Col>
          <Col md={{ span: 5 }}>
            <h4>
              Q. How will this project scale?
            </h4>
            <p>
              We believe that the Data Nutrition Project addresses a broad need in the model development ecosystem, and that the project will scale to address that need. We are still refining the process for label validation and we expect to share more about our approach to that process later this year.
            </p>

            <div className={styles.line}></div>

            <h4>
              Q. Whom have you been speaking with?
            </h4>
            <p>
              We have been speaking with researchers in academia, practitioners at large technology companies, individual data scientists, organizations, and government institutions that host or open datasets to the public. If you’re interested in getting involved, please <a href="mailto:info@datanutrition.org">contact us</a>.
            </p>

            <div className={styles.line}></div>

            <h4>
              Q. Is your work open source?
            </h4>
            <p>
              Some of it is! You can view the Dataset Nutrition Label code <a href="https://github.com/Data-Nutrition-Project/dnp-website">here</a>, and our label maker code will be open sourced in the future.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
    <div
      id="section-support"
      className={classNames(styles.section,styles.modGray)}
    >
      <Container>
        <div className={classNames(styles.centerText)}>
          <h2>Support &amp; Awards</h2>
          <Row className={styles.supporters}>
            <Col md={{ span: 3 }}>
              <div className={styles.featureBox}>
                <a href="https://www.media.mit.edu/">
                  <div className={styles.mediaBox}>
                    <img
                      src={require("../images/logo1.png").default}
                      alt="MIT Media Lab"
                    />
                  </div>
                </a>
              </div>
            </Col>
            <Col md={{ span: 3 }}>
              <div className={styles.featureBox}>
                <a href="https://cyber.harvard.edu/">
                  <div className={styles.mediaBox}>
                    <img
                      src={require("../images/logo2.png").default}
                      alt="Berkman Klein Center"
                    />
                  </div>
                </a>
              </div>
            </Col>
            <Col md={{ span: 3 }}>
              <div className={styles.featureBox}>
                <a href="https://www.bkmla.org/">
                  <div className={styles.mediaBox}>
                    <img src={require("../images/logo3.png").default} alt="Assembly" />
                  </div>
                </a>
              </div>
            </Col>
            <Col md={{ span: 3 }}>
              <div className={styles.featureBox}>
                <a href="https://aiethicsinitiative.org/">
                  <div className={styles.mediaBox}>
                    <img
                      src={require("../images/logo4.png").default}
                      alt="AI Ethics and Governance"
                      style={{ opacity: 0.7 }}
                    />
                  </div>
                </a>
              </div>
            </Col>
            <Col md={{ span: 3 }}>
              <div className={styles.featureBox}>
                <a href="https://www.belfercenter.org/">
                  <div className={styles.mediaBox}>
                    <img
                      src={require("../images/logo5.png").default}
                      alt="Tech Spotlight at Harvard Kennedy School’s Belfer Center"
                      style={{ opacity: 0.7 }}
                    />
                  </div>
                  <div>
                    <span>Tech Spotlight at Harvard Kennedy School’s Belfer Center</span>
                  </div>
                </a>
              </div>
            </Col>
            <Col md={{ span: 3 }}>
              <div className={styles.featureBox}>
                <a href="https://datascience.harvard.edu/">
                  <div className={styles.mediaBox}>
                    <img
                      src={require("../images/logo6.png").default}
                      alt="Harvard Data Science Initiative"
                      style={{ opacity: 0.7 }}
                    />
                  </div>
                </a>
              </div>
            </Col>
            <Col md={{ span: 3 }}>
              <div className={styles.featureBox}>
                <a href="https://www.consumerreports.org/">
                  <div className={styles.mediaBox}>
                    <img
                      src={require("../images/logo7.png").default}
                      alt="Consumer Reports"
                      style={{ opacity: 0.7 }}
                    />
                  </div>
                </a>
              </div>
            </Col>
            <Col md={{ span: 3 }}>
              <div className={styles.featureBox}>
                <a href="https://ars.electronica.art/prix/en/digitalhumanity/">
                  <div className={styles.mediaBox}>
                    <img
                      src={require("../images/logo8.png").default}
                      alt="Ars Electronica Award for Digital Humanity 2022"
                      style={{ opacity: 0.7 }}
                    />
                  </div>
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
    <Container
      as="section"
      className={classNames(styles.section, styles.modGray)}
      id="section-contact"
      style={{ "padding-bottom": "3.75rem" }}
    >
      <Container>
        <div className={classNames(styles.headingBlock, styles.centerText)}>
          <h2>Support Us</h2>
          <span className={styles.headingSubHeader}>
            DNP is a 501c3 nonprofit initiative. We are happy to
            welcome more into the fold, whether you are a policymaker,
            scientist, engineer, designer, or just a curious member of the
            public. We’d love to hear from you.
          </span>
        </div>
        <Row 
          className={styles.alignCenter}
          style={{ "margin-bottom": "1.75rem" }}
        >
          <Col sm={{ span: 4, offset: 1 }} xs={12}>
            <div>
              <div id="snav-content1">
                <div id="mc_embed_signup">
                  <Form
                    action="https://mit.us19.list-manage.com/subscribe/post?u=90e3cb18de9969a9a056d188f&amp;id=95965c5243"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    className="contact-form validate"
                    target="_blank"
                    novalidate
                  >
                    <div id="mc_embed_signup_scroll">
                      <Form.Group className={styles.subscribeForm}>
                        <Form.Label
                          className={styles.subscribeLabel}
                          for="mce-EMAIL"
                        >
                          Receive updates from the team:
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Email Address"
                          name="EMAIL"
                          id="mce-EMAIL"
                          style={{
                            height: '2rem'
                          }}
                        />
                      </Form.Group>
                      <div id="mce-responses" className="clear">
                        <div
                          className="response"
                          id="mce-error-response"
                          style={{ display: "none" }}
                        />
                        <div
                          className="response"
                          id="mce-success-response"
                          style={{ display: "none" }}
                        />
                        <div
                          style={{ position: "absolute", left: "-5000px" }}
                          aria-hidden="true"
                        >
                          <Form.Control
                            type="text"
                            name="b_90e3cb18de9969a9a056d188f_95965c5243"
                            tabindex="-1"
                            value=""
                          />
                        </div>
                        <div className={styles.centerText}>
                          <Button
                            as="input"
                            type="submit"
                            value="Subscribe"
                            name="subscribe"
                            id="mc-embedded-subscribe"
                            className={styles.tealButton}
                            size="sm"
                          />
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
                <script
                  type="text/javascript"
                  src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
                ></script>
                <script
                  type="text/javascript"
                  dangerouslySetInnerHTML={{
                    __html: `(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);`,
                  }}
                />
              </div>
            </div>
          </Col>
          <Col sm={2} xs={12} className={styles.centerText}>
            <h2 className={styles.contactHeader}>OR</h2>
          </Col>
          <Col sm={4} xs={12} className={styles.centerText}>
            <Button
              as="a"
              href="mailto:info@datanutrition.org"
              className={classNames(styles.tealButton, styles.modButtonLarge)}
            >
              <i class="icon-line2-users"></i>{' '}Send us an email
            </Button>
          </Col>
        </Row>
        <Row className={styles.centerText}>
          <Col md={{span: 2, offset: 5}}>
            <Button
              href="https://www.paypal.com/donate/?hosted_button_id=PRZBEG68NPELL"
              className={classNames(styles.tealButton, styles.modButtonLarge)}
            >
              Donate
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  </Layout>
)

export default IndexPage
