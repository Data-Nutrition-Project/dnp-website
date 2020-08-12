import React from "react"
import { Link } from "gatsby"
import classNames from "classnames"

import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"

import Bio from "../components/Bio"
import Layout from "../components/layout"

import styles from "./index.module.css"

const IndexPage = props => (
  <Layout>
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
        <div className="container vertical-middle clearfix">
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
          <div className={styles.centerText}>
            <Link to="/covid-tracking" className={styles.tealButtonLink}>
              <Button
                className={classNames(styles.tealButton, styles.modButtonLarge)}
              >
                <i className="icon-play-circle"></i>solution
              </Button>
            </Link>
            <a
              className={styles.tealButtonLink}
              href="https://arxiv.org/abs/1805.03677"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className={classNames(styles.tealButton, styles.modButtonLarge)}
              >
                <i className="icon-line-paper"></i>paper
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
    <section id="content" className={styles.section}>
      <Container className={styles.clearfix}>
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
          <Col md={{ span: 4, offset: 2 }} sm={{ span: 6 }}>
            <div>
              <h3>
                We believe that technology should help us move forward without
                mirroring existing systemic injustice
              </h3>
            </div>
          </Col>
          <Col md={{ span: 5 }} sm={{ span: 6 }}>
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
            Want to get involved? <a href="#section-contact">Contact Us!</a>
          </p>
        </div>
      </Container>
    </section>
    <div className={classNames(styles.section, styles.modGray)}>
      <Container className={styles.clearfix}>
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
        <Row id="side-navigation">
          <Col md={{ span: 4 }}>
            <div id="snav-content1">
              <h3>
                Incomplete, misunderstood, and historically problematic data can
                negatively influence AI algorithms.
              </h3>
              Algorithms matter, and so does the data they’re trained on. To
              improve the accuracy and fairness of algorithms that determine
              everything from navigation directions to mortgage approvals, we
              need to make it easier for practitioners to quickly assess the
              viability and fitness of datasets they intend to train AI
              algorithms on.
              <br />
              <br />
              There’s a missing step in the AI development pipeline: assessing
              datasets based on standard quality measures that are both
              qualitative and quantitative. We are working on packaging up these
              measures into an easy to use <i>Dataset Nutrition Label</i>.
            </div>
          </Col>
          <Col md={{ span: 8 }}>
            <img
              alt="diagram"
              className={styles.img}
              src={require("../images/diagram.png")}
            />
          </Col>
        </Row>
      </Container>
    </div>
    <section id="content" className={styles.section}>
      <Container className={styles.clearfix}>
        <div
          id="section-solution"
          className={classNames(
            styles.headingBlock,
            styles.centerText,
            styles.pageSection
          )}
        >
          <h2>Technical Solution</h2>
          <span className={styles.headingSubHeader}>
            Standard interactive reports
          </span>
        </div>
        <Row id="side-navigation">
          <Col md={{ span: 4 }}>
            <div id="snav-content1">
              <h3>A "nutrition label" for datasets.</h3>
              The Data Nutrition Project aims to create a standard label for
              interrogating datasets for measures that will ultimately drive the
              creation of better, more inclusive algorithms. <br />
              <br /> Our current prototype includes a highly-generalizable
              interactive data diagnostic label that allows for exploring any
              number of domain-specific aspects in datasets. Similar to a
              nutrition label on food, our Dataset Nutrition Label aims to
              highlight the key ingredients in a dataset such as meta-data and
              populations, as well as unique or anomalous features regarding
              distributions, missing data, and comparisons to other ‘ground
              truth’ datasets. We are currently testing our label on several
              datasets, with an eye towards open sourcing this effort and
              gathering community feedback. <br />
              <br /> The design utilizes a ‘modular’ framework that can be
              leveraged to add or remove areas of investigation based on the
              domain of the dataset. For example, Dataset Nutrition Labels for
              data about people may include modules about the representation of
              race and gender, while Nutrition Labels for data about trees may
              not require that module. <br /> <br /> To learn more, check out
              our{" "}
              <a
                href="https://ahmedhosny.github.io/datanutrition/"
                target="_blank"
                rel="noopener noreferrer"
              >
                live prototype
              </a>{" "}
              built on the Dollars for Docs dataset from{" "}
              <a
                href="https://www.propublica.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                ProPublica
              </a>
              . A first draft of our paper can be found{" "}
              <a
                href="https://arxiv.org/abs/1805.03677"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
            </div>
          </Col>
          <Col md={{ span: 8 }}>
            <img
              alt="label display"
              className={styles.img}
              src={require("../images/label.png")}
            />
          </Col>
        </Row>
      </Container>
    </section>
    <div className={classNames(styles.section, styles.modGray)}>
      <Container className={styles.clearfix}>
        <div
          className={classNames(
            styles.headingBlock,
            styles.centerText,
            styles.pageSection
          )}
        >
          <h2>Community Solution</h2>
          <span className={styles.headingSubHeader}>
            Workshops and Conversations
          </span>
        </div>
        <Row id="side-navigation">
          <Col md={{ span: 4 }}>
            <div id="snav-content1">
              We believe that building artificial intelligence is as much about
              learning as it is about technical implementation. Through our
              workshop series, the Data Nutrition Project brings a curriculum of
              awareness to organizations of all sizes and types - from small
              technical teams to larger, non-technical communities.
              <br />
              <br />
              <h3>Demystifying AI Workshop</h3>
              Our first workshop in the series is a brief, non-technical
              overview of how Artificial Intelligence (AI) algorithms work.
              Participants participate in an experiential activity in which you
              get to “be the algorithm”, and afterwards reflect on how bias is
              perpetuated in the stages of algorithm development you
              experienced. We also tie this experience into current industry
              themes and examples and discuss the complexities of building tools
              that mitigate the issue.
              <br />
              <br />
              This workshop is great for community groups looking to better
              understand how AI works, and how it is used in tools that we all
              use on a daily basis. It's also helpful for tech professionals who
              do not code, such as designers, project managers, etc.{" "}
              <a href="#section-contact">Contact Us</a> to find out more!
            </div>
          </Col>
          <Col md={{ span: 8 }}>
            <img
              alt="workshop presentation"
              className={styles.img}
              src={require("../images/dnp-2.jpg")}
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
      </Container>
    </div>
    <div className={styles.sectionImage}>
      <img
        alt="DNP member presenting"
        src={require("../images/newman-76edit.jpg")}
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
            Intelligence as a part of the{" "}
            <a
              href="https://bkmla.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Assembly program
            </a>{" "}
            at the Berkman Klein Center at Harvard University &amp; MIT Media
            Lab. <br />
            <br />
            <i id="disclaimer" className={styles.disclaimer}>
              Please note: This project is the work of individuals who
              participated in the Assembly program. If named, participants'
              employers are provided for identification purposes only.
            </i>
          </span>
        </div>
        <Container className={styles.clearfix}>
          <Row>
            <Bio
              imgPath={require("../images/chmielinski_kasia.png")}
              imgAlt="chmielinski_kasia"
              name="Kasia Chmielinski"
              role="Project Lead"
              bio="Technologist at McKinsey working to drive impact in the healthcare industry through advanced analytics. Previously at The US Digital Service (The White House) and the Scratch project at the MIT Media Lab. Ex-Googler, native Bostonian. Dabbled in architecture at the Chinese University of Hong Kong before graduating with a degree in physics from Harvard University. Avid bird-watcher."
              socialMedia={[
                {
                  href: "https://www.linkedin.com/in/kchmielinski/",
                  icon: "icon-linkedin",
                  className: "si-linkedin",
                },
              ]}
            />
            <Bio
              imgPath={require("../images/newman_sarah_1.png")}
              imgAlt="newman_sarah"
              name="Sarah Newman"
              role="Research &amp; Strategy"
              bio="Senior Researcher at metaLAB at Harvard, Fellow at the Berkman Klein Center for Internet &amp; Society, AI Grant Fellow. Studies new technologies and their effects on people. Creates interactive art installations that explore social and cultural dimensions of new tech, runs research workshops with creative materials. Leads metaLAB's work on AI + Art. Persuaded by the power of metaphors."
              socialMedia={[
                {
                  href: "https://www.linkedin.com/in/sarah-newman-ba340867/",
                  icon: "icon-linkedin",
                  className: "si-linkedin",
                },
              ]}
            />
            <Bio
              imgPath={require("../images/josh.jpg")}
              imgAlt="joseph_josh"
              name="Josh Joseph"
              role="AI Research"
              bio="Chief Intelligence Architect for MIT's Quest for Intelligence. Previously, Chief Science Officer at Alpha Features, an alternative data distribution platform, and co-founded a proprietary trading company based on machine learning driven strategy discovery and fully autonomous trading. Has done a variety of consulting work across finance, life sciences, and robotics.  Aero/Astro PhD on modeling and planning in the presence of complex dynamics from MIT. BS in Applied Mathematics and Mechanical Engineering from RIT. Spends too much time arguing about consciousness. Terrible improviser."
              socialMedia={[
                {
                  href: "https://www.linkedin.com/in/jmjoseph/",
                  icon: "icon-linkedin",
                  className: "si-linkedin",
                },
              ]}
            />
            <Bio
              imgPath={require("../images/taylor_matt.png")}
              imgAlt="taylor_matt"
              name="Matt Taylor"
              role="Data Science &amp; Workshop Facilitation"
              bio="Freelance learning experience designer and facilitator, with a background in AI implementation. Previously worked as an engineer in natural language processing, moderation tool development, and creative coding platform development. Currently creating learning experiences in STEAM for young people, and demystifying AI for all people. Seasoned pun specialist."
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
            <Bio
              imgPath={require("../images/YQiu.png")}
              imgAlt="qiu_chelsea"
              name="Chelsea Qiu"
              role="Research Collaborator"
              bio="Researcher at metaLAB at Harvard, architect in training. Previous research focused on the co-inhabitation of human and machines. Work explores the intersection of spaces, technology, and senses through physical and digital means. Teaches the integrated process of design and fabrication. M.Arch from MIT. Fascinated by the human brain and enjoys puzzles of all kinds."
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
            <Bio
              imgPath={require("../images/thomas_kemi.jpg")}
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
            <Bio
              imgPath={require("../images/yurkofsky_jess.jpg")}
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
          </Row>
          <div className={classNames(styles.headingBlock, styles.centerText)}>
            <h2>Collaborating Organizations</h2>
          </div>
          <Row>
            <Bio
              imgPath={require("../images/hil.png")}
              imgAlt="humanity_innovation_labs"
              name="Humanity Innovation Labs"
              role="User Experience Research &amp; Design Collaborator"
              bio="HIL is an agile consultancy that offers exploratory research and design services for ingenious proof of concepts in wearables, such as digital experiences and physical devices. We work in the ambiguous space of emerging technologies and use qualitative and quantitative methods in order to drive design. The sectors we work within are health and fitness, medical and industrial applications."
              socialMedia={[
                {
                  href: "https://www.humanityinnovationlabs.com",
                  icon: "icon-line-globe",
                  className: "si-dribble",
                },
                {
                  href:
                    "https://www.linkedin.com/company/humanity-innovation-labs",
                  icon: "icon-linkedin",
                  className: "si-linkedin",
                },
                {
                  href: "https://twitter.com/HumanityILabs",
                  icon: "icon-twitter",
                  className: "si-twitter",
                },
                {
                  href: "https://www.facebook.com/humanityinnovationlabs/",
                  icon: "icon-facebook",
                  className: "si-facebook",
                },
                {
                  href: "https://www.instagram.com/humanityinnovationlabs/",
                  icon: "icon-instagram",
                  className: "si-instagram",
                },
              ]}
            />
          </Row>
          <div className={classNames(styles.headingBlock, styles.centerText)}>
            <h2>Alums</h2>
          </div>
          <Row>
            <Bio
              alum={true}
              imgPath={require("../images/holland_sarah.png")}
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
            <Bio
              alum={true}
              imgPath={require("../images/hosny_ahmed.png")}
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
          </Row>
        </Container>
      </section>
    </div>
    <div className={styles.sectionImage}>
      <img
        alt="divider"
        src={require("../images/dnp-3.jpg")}
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
      <Container className={styles.clearfix}>
        <Row>
          <Col md={{ span: 6 }}>
            <h4 id="faq-1">
              <strong>Q.</strong> Do you have a prototype or more information?
            </h4>
            <p>
              Yes, we do! You can take a look at a{" "}
              <a
                href="https://ahmedhosny.github.io/datanutrition/"
                target="_blank"
                rel="noopener noreferrer"
              >
                live protoype
              </a>{" "}
              of the Dataset Nutrition Label for the Dollars for Docs dataset
              that our friends at{" "}
              <a
                href="https://www.propublica.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                ProPublica
              </a>{" "}
              have made available to our group. We are also currently working on
              a{" "}
              <a
                href="https://arxiv.org/abs/1805.03677"
                target="_blank"
                rel="noopener noreferrer"
              >
                paper
              </a>{" "}
              describing our work, the{" "}
              <a
                href="https://ahmedhosny.github.io/datanutrition/"
                target="_blank"
                rel="noopener noreferrer"
              >
                protoype
              </a>
              , and future directions.
            </p>

            <div className={styles.line}></div>

            <h4 id="faq-2">
              <strong>Q.</strong> What inspired this project?
            </h4>
            <p>
              We believe that algorithm developers want to build responsible and
              smart AI models, but that there is a key step missing in the
              standard way these models are built. This step is to interrogate
              the dataset for a variety of imbalances or problems it could have
              and ascertain if it is the right dataset for the model. We are
              inspired by the FDA's Nutrition Facts label in that it provides
              basic yet powerful facts that highlight issues in an accessible
              way. We aspire to do the same for datasets.
            </p>

            <div className={styles.line}></div>

            <h4 id="faq-7">
              <strong>Q.</strong> Whom have you been speaking with?
            </h4>
            <p>
              We have been speaking with researchers in academia, practitioners
              at large technology companies, individual data scientists,
              organizations, and government institutions that host or open
              datasets to the public. If you’re interested in getting involved,
              please <a href="mailto:nutrition@media.mit.edu">contact us</a>.
            </p>

            <div className={styles.line}></div>

            <h4 id="faq-7">
              <strong>Q.</strong> Is your work open source?
            </h4>
            <p>
              Yes. You can view our{" "}
              <a
                href="https://ahmedhosny.github.io/datanutrition/"
                target="_blank"
                rel="noopener noreferrer"
              >
                live protoype
              </a>{" "}
              here, and the code behind the prototype on{" "}
              <a
                href="https://github.com/ahmedhosny/datanutrition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
              .
            </p>
          </Col>
          <Col md={{ span: 6 }}>
            <h4 id="faq-7">
              <strong>Q.</strong> Who is the intended beneficiary of this work?
            </h4>
            <p>
              Our primary audience for the Dataset Nutrition Label is primarily
              the data science and developer community who are building
              algorithmic AI models. However, we believe that a larger
              conversation must take place in order to shift the industry. Thus,
              we are also engaging with educators, policymakers, and researchers
              on best ways to amplify and highlight the potential of the Dataset
              Nutrition Label and the importance of data interrogation before
              model creation. If you’re interested in getting involved, please{" "}
              <a href="mailto:nutrition@media.mit.edu">contact us</a>.
            </p>

            <div className={styles.line}></div>

            <h4 id="faq-7">
              <strong>Q.</strong> How will this project scale?
            </h4>
            <p>
              We believe that the Data Nutrition Project addresses a broad need
              in the model development ecosystem, and that the project will
              scale to address that need. Feedback on our prototype and
              opportunities to build additional prototypes on more datasets will
              certainly help us make strides.
            </p>

            <div className={styles.line}></div>

            <h4 id="faq-7">
              <strong>Q.</strong> Is this a Harvard/MIT project?
            </h4>
            <p>
              This is a project of Assembly, a program run by the MIT Media Lab
              and the Berkman Klein Center.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
    <div
      id="section-support"
      className={classNames(styles.section, styles.modGray)}
    >
      <Container>
        <div className={classNames(styles.centerText)}>
          <h2>Supported By:</h2>
          <Row className={styles.supporters}>
            <Col md={{ span: 3 }}>
              <div className={styles.featureBox}>
                <a href="https://www.media.mit.edu/">
                  <div className={styles.mediaBox}>
                    <img
                      src={require("../images/logo1.png")}
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
                      src={require("../images/logo2.png")}
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
                    <img src={require("../images/logo3.png")} alt="Assembly" />
                  </div>
                </a>
              </div>
            </Col>
            <Col md={{ span: 3 }}>
              <div className={styles.featureBox}>
                <a href="https://aiethicsinitiative.org/">
                  <div className={styles.mediaBox}>
                    <img
                      src={require("../images/logo4.png")}
                      alt="AI Ethics and Governance"
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
      className={styles.section}
      id="section-contact"
      style={{ "padding-bottom": "3.75rem" }}
    >
      <Container>
        <div className={classNames(styles.headingBlock, styles.centerText)}>
          <h2>Contact</h2>
          <span className={styles.headingSubHeader}>
            The DNP project is a cross-industry collective. We are happy to
            welcome more into the fold, whether you are a policymaker,
            scientist, engineer, designer, or just a curious member of the
            public. We’d love to hear from you.
          </span>
        </div>
        <Row className={styles.alignCenter}>
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
          <Col sm={4} xs={12}>
            <div id="snav-content1">
              <Button
                as="a"
                href="mailto:nutrition@media.mit.edu"
                className={classNames(styles.tealButton, styles.modButtonLarge)}
              >
                <i class="icon-line2-users"></i>Send us an email
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  </Layout>
)

export default IndexPage
