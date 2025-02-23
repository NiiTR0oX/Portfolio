import React, { Component } from "react";
import $ from "jquery";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import "devicon/devicon.min.css";

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      foo: "bar",
      resumeData: {},
      sharedData: {},
      resumeProjects: [],
      resumeBasicInfo: {}
    };
  }

  // applyPickedLanguage(pickedLanguage, oppositeLangIconId) {
  //   this.swapCurrentlyActiveLanguage(oppositeLangIconId);
  //   document.documentElement.lang = pickedLanguage;
  //   var resumePath =
  //     document.documentElement.lang === window.$primaryLanguage
  //       ? `res_primaryLanguage.json`
  //       : `res_secondaryLanguage.json`;
  //   this.loadResumeFromPath(resumePath);
  // }

  // swapCurrentlyActiveLanguage(oppositeLangIconId) {
  //   var pickedLangIconId =
  //     oppositeLangIconId === window.$primaryLanguageIconId
  //       ? window.$secondaryLanguageIconId
  //       : window.$primaryLanguageIconId;
  //   document
  //     .getElementById(oppositeLangIconId)
  //     .removeAttribute("filter", "brightness(40%)");
  //   document
  //     .getElementById(pickedLangIconId)
  //     .setAttribute("filter", "brightness(40%)");
  // }

  componentDidMount() {
    this.loadSharedData();
    // this.applyPickedLanguage(
    //   window.$primaryLanguage,
    //   window.$secondaryLanguageIconId
    // );
  }

  loadResumeFromPath(path) {
    $.ajax({
      url: path,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ 
          resumeData: data, 
          resumeProjects: data.projectsData, 
          resumeBasicInfo: data.basicInfo,
          resumeExperience: data.experience, // <--- Ajout ici

        }, () => console.log("Données mises à jour dans state :", this.state));
      }.bind(this),
           
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  }
  

  loadSharedData() {
    $.ajax({
      // url: `portfolio_shared_data.json`, 
      url: `${process.env.PUBLIC_URL}/portfolio_shared_data.json`,
      dataType: "json",
      cache: false,
      success: function (data) {
        // console.log("Données chargées depuis JSON :", data); // Ajout du log
        this.setState({ sharedData: data });
        document.title = `${data.basic_info.name}`;
      }.bind(this),
      error: function (xhr, status, err) {
        // console.error("Erreur lors du chargement du JSON :", err);
        alert(err);
      },
    });
  }
  

  render() {
    return (
      <div>
        <Header sharedData={this.state.sharedData.basic_info} />
        <div className="col-md-12 mx-auto text-center language">
          <div
            onClick={() =>
              this.applyPickedLanguage(
                window.$primaryLanguage,
                window.$secondaryLanguageIconId
              )
            }
            style={{ display: "inline" }}
          >
            <span
              className="iconify language-icon mr-5"
              data-icon="twemoji-flag-for-flag-united-kingdom"
              data-inline="false"
              id={window.$primaryLanguageIconId}
            ></span>
          </div>
          <div
            onClick={() =>
              this.applyPickedLanguage(
                window.$secondaryLanguage,
                window.$primaryLanguageIconId
              )
            }
            style={{ display: "inline" }}
          >
            <span
              className="iconify language-icon"
              data-icon="twemoji-flag-for-flag-france"
              data-inline="false"
              id={window.$secondaryLanguageIconId}
            ></span>
          </div>
        </div>
        <About
          resumeBasicInfo={this.state.resumeData.basic_info}
          sharedBasicInfo={this.state.sharedData.basic_info}
        />
        {/* { console.log(this.state.sharedData)} */}
        <Projects
          resumeProjects={this.state.sharedData?.projectsData}
          // resumeProjects={this.state.resumeData.resumeProjects}
          resumeBasicInfo={this.state.sharedData?.basic_info}
        />
        <Skills
          sharedSkills={this.state.sharedData.skills}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Experience
          
          resumeExperience={[
            { title: "Développeur", 
              company: "Ma Boîte", 
              years: "2024 - 2025", 
              technologies: ["React", "Node.js"], 
              mainTech: ["JavaScript"] },

            { title: "Développeur", 
              company: "Ma Boîte", 
              years: "2024 - 2025", 
              technologies: ["React", "Node.js"], 
              mainTech: ["React"] },
          ]}
          resumeBasicInfo={{ section_name: { experience: "Expérience" } }}
        />
        <Footer sharedBasicInfo={this.state.sharedData.basic_info} />
      </div>
    );
  }
}

export default App;
