import React, { Component } from "react";
import "devicon/devicon.min.css";

// Langages à exclure
const excludedSkills = ["C#", "MySql" , "Bootstrap", "JQuery" , "Angular" , "TypeScript"];

class Skills extends Component {
  render() {
    let sectionName = "Skills";
    let skillsList = [];

    if (this.props.sharedSkills && this.props.sharedSkills.icons) {
      sectionName = this.props.resumeBasicInfo?.section_name?.skills || "Skills";

      // Filtrer les compétences pour exclure les langages dans excludedSkills
      skillsList = this.props.sharedSkills.icons
        .filter(skill => !excludedSkills.includes(skill.name)) // Filtrer les compétences à exclure
        .map((skill, index) => (
          <li className="list-inline-item mx-3" key={index}>
            <div className="text-center skills-tile">
              <i className={skill.class} style={{ fontSize: "50px", color: "#D7CAAA" }}></i>
              <p className="text-center" style={{ fontSize: "14px", marginTop: "4px", color: "#D7CAAA" }}>
                {skill.name}
              </p>
            </div>
          </li>
        ));
    }

    return (
      <section id="skills">
        <div className="col-md-12">
          <div className="col-md-12">
            <h1 className="section-title">
              <span className="text-white">{sectionName}</span>
            </h1>
          </div>
          <div className="col-md-12 text-center">
            <ul className="list-inline mx-auto skill-icon">{skillsList}</ul>
          </div>
        </div>
      </section>
    );
  }
}

export default Skills;
