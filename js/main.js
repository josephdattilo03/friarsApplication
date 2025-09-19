function typeText(elementId, text, speed = 100) {
    return new Promise((resolve) => {
        const element = document.getElementById(elementId)
        let i = 0
        function addChar() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i)
                i++
                setTimeout(addChar, speed)
            }
            else {
                resolve()
            }
        }
        addChar()
    })
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

function learnMoreButtonHandler() {
    const whyFriarsSection = document.getElementById("why-friars")
    whyFriarsSection.classList.add("visible")
    whyFriarsSection.scrollIntoView({
        behavior: "smooth"
    })
}


function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    const sparkColors = [
        "#FFD700",
        "#FFA500",
        "#FF4500",
        "#FF6347",
        "#FF8C00",
        "#FF0000",
        "#FFDAB9",
        "#FFFFE0",
        "#FFFFFF",
        "#ADD8E6"
    ];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.backgroundColor = sparkColors[Math.floor(Math.random() * sparkColors.length)];
        particlesContainer.appendChild(particle);
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    const titleElem = document.getElementById("greeting")
    titleElem.innerHTML = ""
    await typeText("greeting", "Hi!", 200)
    await sleep(100)
    await typeText("greeting", " My name is", 50)
    await sleep(100)
    await typeText("fullName", "Joseph Dattilo", 150)
    await sleep(500)
    await typeText("hook", "and I want to join", 100)
    await typeText("hook", "...", 700)

    fetch("assets/friars.svg")
        .then(res => res.text())
        .then(svgData => {
            const logoContainer = document.getElementById("logo");
            logoContainer.innerHTML = svgData;
            const svg = logoContainer.querySelector("svg");
            // allows for logo to change size responsive to the size of the page
            if (!svg.getAttribute("viewBox")) {
                const bbox = svg.getBBox();
                svg.setAttribute("viewBox", `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
            }
            svg.setAttribute("width", "60vw");
            svg.setAttribute("height", "auto");
            const paths = svg.querySelectorAll("path");
            paths.forEach((path, i) => {
                const length = path.getTotalLength();
                const originalAttributes = {};
                for (let attr of path.attributes) {
                    originalAttributes[attr.name] = attr.value;
                }
                path.style.stroke = "white";
                path.style.strokeWidth = "4px";
                path.style.strokeDasharray = length;
                path.style.strokeDashoffset = length;
                setTimeout(() => {
                    path.style.transition = "stroke-dashoffset 3s ease";
                    path.style.strokeDashoffset = "0";
                    setTimeout(() => {
                        for (let key in originalAttributes) {
                            path.setAttribute(key, originalAttributes[key]);
                        }
                        path.style.stroke = "white";
                    }, 2000);
                }, 300);
            });
        })
        .catch(err => console.error("Error loading SVG:", err));

    const learnButton = document.getElementById("learn-button")
    setTimeout(() => {
        learnButton.classList.add("visible")
    }, 1000)


    createParticles()
    learnButton.addEventListener("click", learnMoreButtonHandler)
})


