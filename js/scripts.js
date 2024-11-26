/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


document.addEventListener("DOMContentLoaded", function () {
    const projects = [
        {
            imgSrc: "assets/img/atom.png",
            title: "Sharp Frame Selector for Orthophoto Creation",
            description: "This Python application designed to select the sharpest frames from a video.",
            githubLink: "https://github.com/AviyaArusi/ATOM-HA",
            languages: ['Python', 'Flask']
        },
        {
            imgSrc: "assets/img/2better.png",
            title: "2Better App",
            description: "An innovative Android app for enhanced productivity and well-being, featuring task organization, habit tracking, and motivation in a user-friendly interface.",
            githubLink: "https://github.com/Ashwal200/2Better",
            languages: ['Javascript', 'React' , 'Firebase' , 'Expo']
        },
        {
            imgSrc: "assets/img/faceRecognition.png",
            title: "Selfie Face Recognition",
            description: "This project  identify photos containing a specific person's face from a directory of images.",
            githubLink: "https://github.com/AviyaArusi/Selfie_face_recognition",
            languages: ['Python']
        },
        {
            imgSrc: "assets/img/protocol.png",
            title: "Network Protocols Exploration",
            description: "Implement and explore DNS, DHCP, HTTP, and redirect servers to demonstrate their crucial roles in internet communication.",
            githubLink: "https://github.com/Ashwal200/Network-Protocols-Exploration/tree/main",
            languages: ['C']
        },
    ];

    const projectsContainer = document.getElementById("projects");

    if (!projectsContainer) {
        console.error("Projects container not found!");
        return;
    }

    projects.forEach(project => {
        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");

        const projectImage = document.createElement("img");
        projectImage.src = project.imgSrc;
        projectImage.classList.add("img-fluid");
        projectImage.alt = "Project Image";

        const projectDescription = document.createElement("div");
        projectDescription.classList.add("project-description");

        const projectTitle = document.createElement("h4");
        projectTitle.textContent = project.title;

        const projectText = document.createElement("div");
        projectText.classList.add("deco");
        projectText.textContent = project.description;




        projectContainer.addEventListener("click", function() {
            window.open(project.githubLink, "_blank");
        });

        projectDescription.appendChild(projectTitle);
        projectDescription.appendChild(projectText);

        projectContainer.appendChild(projectImage);
        projectContainer.appendChild(projectDescription);
        
        // Create a box for each language if they exist
        if (project.languages && project.languages.length > 0) {
            const languageBoxContainer = document.createElement("div");
            languageBoxContainer.classList.add("language-box-container");

            project.languages.forEach(language => {
                const languageBox = document.createElement("div");
                languageBox.classList.add("language-box");
                languageBox.textContent = language;
                languageBoxContainer.appendChild(languageBox);
            });

            projectDescription.appendChild(languageBoxContainer);
        }
        projectsContainer.appendChild(projectContainer);
    });
});
