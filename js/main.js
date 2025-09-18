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

document.addEventListener("DOMContentLoaded", async function () {
    const titleElem = document.getElementById("greeting")
    titleElem.innerHTML = ""
    await typeText("greeting", "Hi!", 200)
    await sleep(100)
    await typeText("greeting", " My name is", 100)
    await sleep(100)
    await typeText("fullName", "Joseph Dattilo", 250)
    await sleep(500)
    await typeText("hook", "and I want to join", 100)
    await typeText("hook", "...", 700)
    fetch("image/friars.svg")
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

})




