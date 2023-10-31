async function initPages() {
    await includeHTML();
}


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]'); // Alle ELemente mit Attribute '[w3-include.h
    for (let i = 0; i < includeElements.length; i++) { // Durch Alle Elemente durchiterieren. In dem Fall nur ein Element (<div>).
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // Diese Zeile liest den Wert des Attributs "w3-include-html" aus -> "include/header.html"
        let response = await fetch(file); // Hier wird der Wert geladen. fetch = laden; await = damit die Funktion mit dem Ausführen wartet, damit alles geladen ist. Wichtig: Funktion muss asynchron sein, siehe bei "function...."
        
        if (response.ok) {
            element.innerHTML = await response.text(); // Hier wird der Text aus dem Wert herausgezogen.
        } else {
            element.innerHTML= 'Page not found';
        }
    }
}