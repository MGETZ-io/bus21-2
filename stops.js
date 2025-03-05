async function fetchCurrentStop() {
    const response = await fetch('https://api.github.com/repos/MGETZ-io/bus21-1/contents/stops.json', {
        headers: {
            'Authorization': 'Bearer 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'
        }
    });

    const data = await response.json();
    const fileContent = atob(data.content); // Base64-kodierten Inhalt decodieren
    const stopsData = JSON.parse(fileContent);
    
    const currentStop = stopsData.currentStop;
    console.log('Aktueller Halt:', currentStop);

    // Zeigt den aktuellen Halt an
    document.getElementById('currentStop').textContent = `Aktueller Halt: ${currentStop}`;
}

async function updateCurrentStop(newStop) {
    const response = await fetch('https://api.github.com/repos/MGETZ-io/bus21-1/contents/stops.json', {
        headers: {
            'Authorization': 'Bearer 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'
        }
    });

    const data = await response.json();
    const fileContent = atob(data.content); // Base64-kodiert
    const stopsData = JSON.parse(fileContent);

    // Update der aktuellen Haltestelle
    stopsData.currentStop = newStop;

    // Base64-kodiert zurück zum GitHub-Repo senden
    const updatedContent = btoa(JSON.stringify(stopsData));

    const updateResponse = await fetch('https://api.github.com/repos/MGETZ-io/bus21-1/contents/stops.json', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
            message: `Update current stop to ${newStop}`,
            content: updatedContent,
            sha: data.sha
        })
    });

    if (updateResponse.ok) {
        console.log('Haltestelle erfolgreich aktualisiert!');
    } else {
        console.log('Fehler beim Aktualisieren der Haltestelle');
    }
}

document.getElementById('nextStopButton').addEventListener('click', function() {
    const nextStop = 'Nächster Halt'; // Logik hier anpassen, um den nächsten Halt zu ermitteln
    updateCurrentStop(nextStop);
});

// Aufrufen der Funktion beim Laden der Seite
fetchCurrentStop();
