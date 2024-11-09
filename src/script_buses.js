document.addEventListener("DOMContentLoaded", () => {
    loadSchedule();
});

function loadSchedule() {
    fetch("buses.xml")
        .then(response => response.text())
        .then(data => {
            const xmlDoc = parseXMLData(data);
            fetch("style.xsl")
                .then(resp => resp.text())
                .then(xslText => {
                    const xslDoc = parseXMLData(xslText);
                    const displayContent = applyXSLTTransformation(xmlDoc, xslDoc);
                    document.getElementById("scheduleDisplay").appendChild(displayContent);
                });
        });
}

function parseXMLData(xmlString) {
    return new DOMParser().parseFromString(xmlString, "text/xml");
}

function applyXSLTTransformation(xml, xsl) {
    const xsltProc = new XSLTProcessor();
    xsltProc.importStylesheet(xsl);
    return xsltProc.transformToFragment(xml, document);
}

function filterSchedule() {
    const chosenDate = document.getElementById("selectedDate").value;
    fetch("buses.xml")
        .then(response => response.text())
        .then(xmlText => {
            const xmlDoc = parseXMLData(xmlText);
            const matchedRoutes = Array.from(xmlDoc.getElementsByTagName("route")).filter(route => {
                const depDate = route.getElementsByTagName("date")[0].textContent;
                return chosenDate === "" || depDate === chosenDate;
            });
            
            const filteredXML = createFilteredXMLStructure(matchedRoutes);
            fetch("style.xsl")
                .then(resp => resp.text())
                .then(xslText => {
                    const xslDoc = parseXMLData(xslText);
                    const filteredContent = applyXSLTTransformation(filteredXML, xslDoc);
                    const displayArea = document.getElementById("filteredDisplay");
                    displayArea.innerHTML = "";
                    displayArea.appendChild(filteredContent);
                });
        });
}

function createFilteredXMLStructure(routes) {
    const xmlContent = `<bus_schedule>${routes.map(route => new XMLSerializer().serializeToString(route)).join('')}</bus_schedule>`;
    return parseXMLData(xmlContent);
}

function sortScheduleByPrice() {
    fetch("buses.xml")
        .then(response => response.text())
        .then(xmlText => {
            const xmlDoc = parseXMLData(xmlText);
            const routesList = Array.from(xmlDoc.getElementsByTagName("route"));
            routesList.sort((a, b) => {
                const priceA = parseFloat(a.getElementsByTagName("price")[0].textContent);
                const priceB = parseFloat(b.getElementsByTagName("price")[0].textContent);
                return priceA - priceB;
            });
            
            const sortedXML = createFilteredXMLStructure(routesList);
            fetch("style.xsl")
                .then(response => response.text())
                .then(xslText => {
                    const xslDoc = parseXMLData(xslText);
                    const sortedContent = applyXSLTTransformation(sortedXML, xslDoc);
                    const sortedDisplayArea = document.getElementById("sortedDisplay");
                    sortedDisplayArea.innerHTML = "";
                    sortedDisplayArea.appendChild(sortedContent);
                });
        });
}
