import React, { Component } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: {},
      detailsModalShow: false,
    };
  }

  render() {
    // Par défaut, définir "Projects" si pas de nom personnalisé
    let sectionName = this.props.resumeBasicInfo?.section_name?.projects || "Projects";
    // console.log(this.props.resumeProjects);
    // console.log(this.props.resumeBasicInfo);

    let detailsModalShow = (data) => {
      // console.log(data);
      this.setState({ detailsModalShow: true, deps: data });
    };

    let detailsModalClose = () => this.setState({ detailsModalShow: false });

    let projects = [];

    if (this.props.resumeProjects && this.props.resumeBasicInfo) {
      
      projects = this.props.resumeProjects.map((project, index) => {
        return (
          <div
            className="col-sm-12 col-md-6 col-lg-4"
            key={project.id || index}  // Utilise index si id est indisponible
            style={{ cursor: "pointer" }}
          >
            <span className="portfolio-item d-block">
              <div className="foto" onClick={() => detailsModalShow(project)}>
                <div>
                <img
                   src={project.images[0] ? project.images[0] : "/images/placeholder.png"}
                   alt="image par défaut"
                   height="230"
                   style={{ marginBottom: 0, paddingBottom: 0, position: "relative" }}
                />

                  <span className="project-date">{project.startDate}</span>
                  <br />
                  <p className="project-title-settings mt-3">{project.title}</p>
                </div>
              </div>
            </span>
          </div>
        );
      });
      

    }

    return (
      <section id="portfolio">
        <div className="col-md-12">
          <h1 className="section-title" style={{ color: "black" }}>
            <span>{sectionName}</span>
          </h1>
          <div className="col-md-12 mx-auto">
            <div className="row mx-auto">{projects}</div>
          </div>
          <ProjectDetailsModal
            show={this.state.detailsModalShow}
            onHide={detailsModalClose}
            data={this.state.deps}
          />
        </div>
      </section>
    );
  }
}

export default Projects;