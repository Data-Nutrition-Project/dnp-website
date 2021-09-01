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

import styles from "./index.module.css"

const IndexPage = props => (
  <Layout>
    <Banner
      content={"Our children’s book “I’m Not a Tomato!” is launching on Kickstarter this summer! Sign up [here](https://forms.gle/NBB7JsDzCWzbV5xFA) to receive an email when we launch!"}
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
            <AnchorLink to="/#section-solution-tool" className={styles.tealButtonLink}>
              <Button
                className={classNames(styles.tealButton, styles.modButtonLarge)}
              >
                <i className="icon-play-circle"></i>the dataset nutrition label
              </Button>
            </AnchorLink>
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
          <Col xl={{ span: 3, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12}>
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
          <Col xl={{ span: 6, offset: 1 }} lg={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }}>
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
          <Col xl={{ span: 3, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12}>
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
              <Link to="/labels/">
                <Button
                  className={classNames(styles.tealButton, styles.modButtonMed, styles.modButtonParagraph, styles.mobileSpacer)}
                >
                  <i className="icon-play-circle"></i>{' '}Go to Labels
                </Button>
              </Link>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdAX48nSAUBcmDM7EyghODzeyoxXPVchitLXdNmGmODNWGjtQ/viewform" target="_blank">
                <Button
                  className={classNames(styles.tealButton, styles.modButtonMed, styles.modButtonParagraph, styles.mobileSpacer)}
                >
                  <i className="icon-play-circle"></i>{' '}Build a Label
                </Button>
              </a>
            </Row>
          </Col>
          <Col xl={{ span: 6, offset: 1 }} lg={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }}>
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
              <b>Recent Talks (2020)</b>
              <ul>
                <li>NeurIPS 2020: Workshop on Dataset Curation and Security, Poster session &amp; <a href="http://securedata.lol/camera_ready/26.pdf">paper</a></li>
                <li>Office of the Chief Technology Officer, US Department of Education</li>
                <li>DRIVE/2020, ‘Bias in, Bias out’</li>
                <li>The Berkman Klein Center at Harvard University, Fellows Presentation</li>
                <li>The Harvard Kennedy School, Lecture for Product Management &amp; Society Class</li>
                <li>Consumer Reports Virtual Panel, ‘Building a Movement for Algorithmic Justice’</li>
                <li>Machine Learning for Social Good, Poster Session</li>
                <li>INDUSTRY, ‘Considering Ethical Product Development’</li>
                <li>GoodSystems AI Workshop, University of Texas at Austin</li>
              </ul>
            </div>
            <img
              alt="zoom panel on coded bias december 2020"
              className={styles.img}
              src={require("../images/cr-panel-dec2020.png")}
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
    </section>
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
            Lab.
          </span>
        </div>
        <Container fluid>
          <Row>
            <Col xl={{ span: 5, offset: 1 }} md={12}>
              <Bio
                imgPath={require("../images/chmielinski_kasia.png")}
                imgAlt="chmielinski_kasia"
                name="Kasia Chmielinski"
                role="Project Lead"
                bio="Technologist at McKinsey working to drive impact in healthcare through advanced analytics. Current Affiliate at the Berkman Klein Center at Harvard University and Digital Lab Fellow at Consumer Reports. Previously at the US Digital Service (The White House) and the MIT Media Lab. Native Bostonian, born cyclist. Avid bird-watcher."
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
                imgPath={require("../images/newman_sarah_1.png")}
                imgAlt="newman_sarah"
                name="Sarah Newman"
                role="Research &amp; Strategy"
                bio="Director of Art &amp; Education at metaLAB at Harvard, Fellow at the Berkman Klein Center, Program Design Co-Lead for Harvard Assembly Fellowships. Studies new technologies and their effects on people. Creates interactive art installations that explore social and cultural dimensions of new tech, runs research workshops with creative materials. Former AI Grant Fellow, Rockefeller Bellagio AI Resident. Persuaded by the power of metaphors."
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
                imgPath={require("../images/taylor_matt.png")}
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
            </Col>
            <Col xl={{ span: 5, offset: 1 }} md={12}>
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
            </Col>
            <Col xl={{ span: 5 }} md={12}>
              <Bio
                imgPath={require("../images/kranzinger_chris.png")}
                imgAlt="kranzinger_chris"
                name="Chris Kranzinger"
                role="Data Science Collaborator"
                bio="McCloy Fellow at Harvard integrating machine intelligence systems, data, and society. Combines data science and economics to inform (policy) decision making and studies questions around trust and safety in AI. Previously, Senior Data Scientist at QuantCo, co-founder of two tech start-ups, founding president of the AI association at Harvard’s Kennedy School, and industry expert advising Germany’s first national strategy on AI. Passionate European, staunch free athlete, and aspiring photographer."
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
                  {
                    href: "https://harvardaiclub.github.io/",
                    icon: "icon-line-globe",
                    className: "si-dribble",
                  },
                ]}
              />
            </Col>
            <Col xl={{ span: 5, offset: 1 }} md={12}>
              <Bio
                imgPath={require("../images/dokuaa_serena.jpg")}
                imgAlt="dokuaa_serena"
                name="Serena Dokuaa"
                role="AI Policy Collaborator"
                bio="Policy Research Analyst at Data &amp; Society. Affiliate at metaLab at Harvard. Formerly the 2020-2021 Technology Equity Fellow at the Greenlining Institute. Focused on ensuring that AI policy protects historically minoritized communities. Writer exploring: AI + Black Feminism and AI policy."
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
          </Row>
          <div className={classNames(styles.headingBlock, styles.centerText)}>
            <h2>Collaborators</h2>
          </div>
          <Row>
            <Col xl={{ span: 5, offset: 1 }} md={12}>
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
                  }
                ]}
              />
            </Col>
            <Col xl={{ span: 5 }} md={12}>
              <Bio
                imgPath={require("../images/justfix.png")}
                imgAlt="JustFix.nyc"
                name="JustFix.nyc"
                role="Research &amp; Data Collaborator"
                bio="JustFix.nyc co-designs and builds tools for tenants, housing organizers, and legal advocates fighting displacement in New York City. Our mission is to galvanize a 21st century tenant movement working towards housing for all — and we think the power of data and technology should be accessible to those fighting this fight."
                socialMedia={[
                  {
                    href: "https://www.justfix.nyc/",
                    icon: "icon-line-globe",
                    className: "si-dribble",
                  },
                  {
                    href:
                      "https://www.linkedin.com/company/justfix-nyc",
                    icon: "icon-linkedin",
                    className: "si-linkedin",
                  },
                  {
                    href: "http://twitter.com/justfixnyc",
                    icon: "icon-twitter",
                    className: "si-twitter",
                  },
                  {
                    href: "https://facebook.com/JustFixNYC",
                    icon: "icon-facebook",
                    className: "si-facebook",
                  },
                  {
                    href: "https://github.com/JustFixNYC",
                    icon: "icon-github",
                    className: "si-github",
                  }
                ]}
              />
            </Col>
            <Col xl={{ span: 5, offset: 1 }} md={12}>
              <Bio
                imgPath={require("../images/rotemberg_veronica.jpg")}
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
                imgPath={require("../images/ai_global.png")}
                imgAlt="ai_global"
                name="AI Global"
                role="Researc Collaborator"
                bio="AI Global is a non-profit building tangible governance tools to address growing concerns about AI. Their mission is to catalyze the practical and responsible design, development, and use of AI. Their tools have been among the first to demonstrate how to turn responsible AI principles into action. Bringing extensive experience in responsible AI policy and the development of AI systems for industry, AI Global is uniquely positioned to partner with organizations across public and private sectors to guide and inform responsible AI governance around the world."
                socialMedia={[
                  {
                    href: "http://ai-global.org/",
                    icon: "icon-line-globe",
                    className: "si-dribble",
                  },
                  {
                    href:
                      "https://www.linkedin.com/company/ai-global",
                    icon: "icon-linkedin",
                    className: "si-linkedin",
                  },
                  {
                    href: "https://twitter.com/_AIGlobal",
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
          </Row>
          <div className={classNames(styles.headingBlock, styles.centerText)}>
            <h2>Alums</h2>
          </div>
          <Row>
            <Col xl={{ span: 5, offset: 1 }} md={12}>
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
            </Col>
            <Col xl={{ span: 5 }} md={12}>
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
            </Col>
            <Col xl={{ span: 5, offset: 1 }} md={12}>
              <Bio
                imgPath={require("../images/josh.jpg")}
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
                alum={true}
                imgPath={require("../images/YQiu.png")}
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
      <Container fluid>
        <Row className={styles.faq}>
          <Col md={{ span: 5, offset: 1 }}>
            <h4>
              Q. Where can I see the Dataset Nutrition Label and learn about the methodology? 
            </h4>
            <p>
              You can take a look at the Dataset Nutrition Label&nbsp;
              <Link to="/labels">here</Link> and corresponding methodology paper <a href="http://securedata.lol/camera_ready/26.pdf">here</a>.&nbsp;
              Older versions (<a href="https://ahmedhosny.github.io/datanutrition/">Label</a>,&nbsp;
              <a href="https://arxiv.org/abs/1805.03677">paper</a>) are also still available online.
            </p>

            <div className={styles.line}></div>

            <h4>
              Q. What inspired this project?
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

            <h4>
              Q. Whom have you been speaking with?
            </h4>
            <p>
              We have been speaking with researchers in academia, practitioners
              at large technology companies, individual data scientists,
              organizations, and government institutions that host or open
              datasets to the public. If you’re interested in getting involved,
              please <a href="mailto:nutrition@media.mit.edu">contact us</a>.
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
          <Col md={{ span: 5 }}>
            <h4>
              Q. Who is the intended beneficiary of this work?
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

            <h4>
              Q. How will this project scale?
            </h4>
            <p>
              We believe that the Data Nutrition Project addresses a broad need
              in the model development ecosystem, and that the project will
              scale to address that need. Feedback on our prototype and
              opportunities to build additional prototypes on more datasets will
              certainly help us make strides.
            </p>

            <div className={styles.line}></div>

            <h4>
              Q. Is this a Harvard/MIT project?
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
