import React from "react"
import { Link } from "gatsby"
import { AnchorLink } from "gatsby-plugin-anchor-links"
import classNames from "classnames"

import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"

import Banner from "../components/Banner"
import Bio from "../components/Bio"
import Layout from "../components/layout"

import * as styles from "./index.module.css"

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
                mirroring existing systemic injustice
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
          <h2>The Tool</h2>
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
              as meta-data and populations, as well as unique or anomalous{' '}
              features regarding distributions, missing data, and comparisons{' '}
              to other ‘ground truth’ datasets. 
            </p>
            <p>
              Building off of the ‘modular’ framework initially presented in our{' '}
              <a href="https://ahmedhosny.github.io/datanutrition/">
                2018 prototype
              </a>{' '}
              and based on feedback from data scientists and dataset owners, we{' '}
              have further adjusted the Label to support a common user journey: a data{' '}
              scientist looking for a dataset with a particular purpose in mind.{' '}
              The <Link to="/labels">second generation Dataset Nutrition Label</Link>{' '}
              now provides targeted information about a dataset based on its{' '}
              intended use case, including alerts and flags that are pertinent{' '}
              to that particular use. Read more about the methodology behind the{' '}
              second generation in our most recent{' '}
              <a href="http://securedata.lol/camera_ready/26.pdf">
                white paper
              </a>.             
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
          <h2>Our Research</h2>
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
              Since 2018, we have seen a confluence of initiatives arise in the domain of tools{' '}
              to combat bias in data. In order to understand both the unique offering of our{' '}
              Label, and to learn from others so that we do not reinvent the wheel, we have been{' '}
              tracking related research, the development of new and related tools, and the{' '}
              general trajectory of labeling as an intervention. The exercise of mapping the{' '}
              space for our internal use as a team has proved invaluable at articulating a clear{' '}
              and growing need for effective dataset documentation and algorithmic auditing. You{' '}
              can learn more about our work and its position in the landscape in our published{' '}
              white papers [<a href="https://arxiv.org/abs/1805.03677">2018</a>, <a href="http://securedata.lol/camera_ready/26.pdf">2020</a>, <a href="http://securedata.lol/camera_ready/26.pdf">Neurips Draft</a>]. 
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
              <b>Recent Talks</b>
              <ul>
                <li>NeurIPS 2020: Workshop on Dataset Curation and Security, Poster session &amp; <a href="http://securedata.lol/camera_ready/26.pdf">paper</a></li>
                <li>Putting Science into Standards (PSIS) Program, the European Commission’s Joint Research Centre (JRC) CEN, CENELEC (2022)</li>
                <li>Understanding Bias and Fairness in AI-enabled Healthcare Software, Duke-Margolis Center for Health Policy (2021)</li>
                <li>WARNING: This Label is Really Important - From Broadband to IoT, the Next Generation of Consumer Nutrition Labels, New America and Consumer Reports (2021)</li>
                <li>RightsCon Presenter (2021)</li>
                <li>Howard/Mathematica Summer Institute in Computational Social Science (2021)</li>
              </ul>
            </div>
            <img
              alt="zoom panel on coded bias december 2020"
              className={styles.img}
              src={require("../images/cr-panel-dec2020.png").default}
            />
            <div class={styles.photoCredit}>
              <span>
                Consumer Reports virtual panel featuring Amira Dhalla, Kasia Chmielinski, Joy Buolamwini, Shalini Kantayya, Jade Magnus
              </span>
            </div> 
          </Col>
        </Row>
      </Container>
    </div>
    <section id="content" className={styles.section}>
      <Container fluid>
        <div
          id="section-solution-workshops"
          className={classNames(
            styles.headingBlock,
            styles.centerText,
            styles.pageSection
          )}
        >
          <h2>Workshops &amp; Facilitation</h2>
          <span className={styles.headingSubHeader}>
            Demystifying how AI Perpetuates Systemic Biases
          </span>
        </div>
        <Row>
          <Col xl={{ span: 4, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12}>
            <p className={styles.headerSentence}>
              We believe that building artificial intelligence is as much about learning as it is about technical implementation.
            </p>
            <p>
              Through our workshops, the Data Nutrition Project brings a curriculum of
              awareness to organizations of all sizes and types - from small
              technical teams to larger, non-technical communities.
            </p>
            <b>Example: Demystifying AI</b>
            <p>
              This workshop is a brief, non-technical overview of how Artificial 
              Intelligence (AI) algorithms work. Participants move through an 
              experiential activity in which one gets to “be the algorithm”, and 
              subsequently reflect on how bias is perpetuated in that process. We also tie this experience 
              to current industry themes and examples, and discuss the complexities 
              of building tools that mitigate the issue.
            </p>
            <p>
              We have facilitated this workshop at conferences, as well as at local events for community 
              organizers. This workshop is great for community groups looking to better
              understand how AI works, and how it is used in tools that we all
              use on a daily basis. It's also helpful for tech professionals who
              do not code, such as designers, project managers, etc.
            </p>
            <p>
              <AnchorLink to="#section-contact">Contact Us</AnchorLink> to find out more about ongoing workshops!
            </p>
          </Col>
          <Col xl={{ span: 5, offset: 1 }} lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }}>
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
            Intelligence as a part of the{" "}
            <a
              href="https://bkmla.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Assembly program
            </a>{" "}
            at the Berkman Klein Center at Harvard University &amp; MIT Media
            Lab.
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
                bio="Technologist and product leader focused on building data-driven systems. Current Shorenstein Fellow at Harvard Kennedy School and Affiliate at the Berkman Klein Center. Previously at McKinsey &amp; Company, the US Digital Service (The White House), MIT Media Lab, and Google. Native Bostonian, enthusiastic cyclist. Avid bird-watcher."
                socialMedia={[
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
                bio="Director of Art &amp; Education at metaLAB at Harvard. Interested in interrelations within complex systems. Creates interactive art installations that explore social and cultural dimensions of new tech, runs research workshops with creative materials. Former AI Grant Fellow, Rockefeller Bellagio AI Resident. Persuaded by the power of metaphors. Avid sheller."
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
            <Col xl={{ span: 5, offset: 1 }} md={12}>
              <Bio
                imgPath={require("../images/kranzinger_chris.png").default}
                imgAlt="kranzinger_chris"
                name="Chris Kranzinger"
                role="Data Science Advisor"
                bio="Data Scientist, Economist, and ML enthusiast combining data and social science to inform strategic decision making and studies questions around trust and safety in AI. Former McCloy Fellow at Harvard and current Sr. Applied Scientist at Uber with a background in Engineering and Economics. Passionate European, staunch free athlete, and aspiring photographer."
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
            <Col xl={{ span: 5, offset: 1 }} md={12} className={styles.centerText}>
              <h3><a href="https://www.humanityinnovationlabs.com">Humanity Innovation Labs</a></h3>
            </Col>
            <Col xl={{ span: 5 }} md={12} className={styles.centerText}>
              <h3><a href="https://www.justfix.nyc/">JustFix.nyc</a></h3>
            </Col>
          </Row>
          <div className={classNames(styles.headingBlock, styles.centerText)}>
            <h2>Alums</h2>
          </div>
          <Row>
            <Col xl={{ span: 5, offset: 1 }} md={12}>
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
            <Col xl={{ span: 5 }} md={12}>
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
            <Col xl={{ span: 5, offset: 1 }} md={12}>
              <Bio
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
            <Col xl={{ span: 5 }} md={12}>
              <Bio
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
            <Col xl={{ span: 5, offset: 1 }} md={12}>
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
            <Col xl={{ span: 5  }} md={12}>
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
            <Col xl={{ span: 5, offset: 1 }} md={12}>
              <Bio
                imgPath={require("../images/yurkofsky_jess.jpg").default}
                imgAlt="yurkofsky_jessica"
                name="Jessica Yurkofsky"
                role="Design Research Collaborator"
                socialMedia={[
                  {
                    href: "http://jessyurko.com/",
                    icon: "icon-line-globe",
                    className: "si-dribble",
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
              Q. What inspired this project?
            </h4>
            <p>
              We believe that engineers want to build responsible and smart AI models, but that there is a key step missing in the way these models are built. This step is to interrogate the dataset for a variety of imbalances or problems it may have, and ascertain if it is the right dataset for the model. We are inspired by the FDA's Nutrition Facts label in that it provides basic yet powerful facts that highlight issues in an accessible way. We aspire to do the same for datasets.
            </p>

            <div className={styles.line}></div>

            <h4>
              Q. Whom have you been speaking with?
            </h4>
            <p>
              We have been speaking with researchers in academia, practitioners at large technology companies, individual data scientists, organizations, and government institutions that host or open datasets to the public. If you’re interested in getting involved, please <a href="mailto:info@datanutrition.org">contact us</a>.
            </p>
          </Col>
          <Col md={{ span: 5 }}>
            <h4>
              Q. Who is the intended beneficiary of this work?
            </h4>
            <p>
              Our primary audience for the Dataset Nutrition Label is the data science and developer community who are building  models. An additional audience for our labels are researchers or journalists who want to better understand a particular dataset. We believe that broad, interdisciplinary engagement is required to shift the industry toward better standards of dataset quality and dataset documentation. Thus, we also engage with educators, policymakers, and researchers on best ways to amplify and highlight the potential of the Dataset Nutrition Label and the importance of data interrogation before model creation. If you’re interested in getting involved, please{" "}<a href="mailto:info@datanutrition.org">contact us</a>.
            </p>

            <div className={styles.line}></div>

            <h4>
              Q. How will this project scale?
            </h4>
            <p>
              We believe that the Data Nutrition Project addresses a broad need in the model development ecosystem, and that the project will scale to address that need. We are still refining the process for label validation and we expect to share more about our approach to that process later this year.
            </p>

            <div className={styles.line}></div>

            <h4>
              Q. Is your work open source?
            </h4>
            <p>
              Yes. You can view the Dataset Nutrition Label code&nbsp;
              <a href="https://github.com/Data-Nutrition-Project/dnp-website">here</a>. 
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
              href="mailto:nutrition@media.mit.edu"
              className={classNames(styles.tealButton, styles.modButtonLarge)}
            >
              <i class="icon-line2-users"></i>{' '}Send us an email
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  </Layout>
)

export default IndexPage
