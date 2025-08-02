document.addEventListener('DOMContentLoaded', function () {

    // --- Data: The source of truth for our history ---
    // In a real-world scenario, this would be fetched from a secure API endpoint.
    const historyData = {
        "Achaemenid": { name: "Achaemenid Empire", locations: [ { name: "Persepolis", coords: [29.9348, 52.8912], subtitle: "The Ceremonial Capital", description: "Founded by Darius I, Persepolis was the magnificent ceremonial capital of the Achaemenid Empire. Its grand palaces and reliefs showcased the might and diversity of the world's first superpower, a testament to architectural and cultural synthesis.", image: "https://images.unsplash.com/photo-1590178229824-b1555a6a6e5a?q=80&w=1974&auto=format&fit=crop" }, { name: "Pasargadae", coords: [30.1993, 53.1794], subtitle: "Tomb of Cyrus the Great", description: "The first capital of the Achaemenid Empire, Pasargadae was established by Cyrus the Great. It is home to his tomb, a simple yet profoundly elegant structure that has stood for millennia, embodying the humility and vision of its founder.", image: "https://images.unsplash.com/photo-1627894953331-9871534005c2?q=80&w=2070&auto=format&fit=crop" }, { name: "Susa", coords: [32.1894, 48.2436], subtitle: "The Administrative Heart", description: "One of the oldest cities in the world, Susa served as a crucial administrative center for the Achaemenids. The Palace of Darius here was renowned for its intricate brick panels depicting the famous archers of the Immortal Guard.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Capital_of_a_column_from_the_palace_of_Darius_I_at_Susa.jpg/800px-Capital_of_a_column_from_the_palace_of_Darius_I_at_Susa.jpg" }] },
        "Parthian": { name: "Parthian Empire", locations: [ { name: "Ctesiphon", coords: [33.0942, 44.5807], subtitle: "The Winter Capital", description: "While founded later, Ctesiphon rose to prominence under the Parthians as a major political and economic hub on the Tigris River. It served as their western capital, a symbol of their power straddling the line between the Roman and Persian worlds.", image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Taq-i-Kisra_from_south-east_in_2016.jpg" }, { name: "Nisa", coords: [38.0000, 58.2000], subtitle: "The Royal Necropolis", description: "Located in modern-day Turkmenistan, Old Nisa was a royal fortress of the early Parthian kings. The site reveals a unique blend of Hellenistic and traditional Persian art and architecture, a hallmark of the Parthian era.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Nisa_-_Round_Hall.JPG/1024px-Nisa_-_Round_Hall.JPG" } ] },
        "Sassanian": { name: "Sassanian Empire", locations: [ { name: "Taq-e Bostan", coords: [34.3869, 47.1322], subtitle: "The Royal Grotto", description: "A series of magnificent rock reliefs near Kermanshah, Taq-e Bostan showcases the grandeur of the Sassanian dynasty. The carvings depict scenes of royal investiture and hunts, masterfully carved into the cliffside with incredible detail.", image: "https://images.unsplash.com/photo-1627894953457-b6d3c051666e?q=80&w=2070&auto=format&fit=crop" }, { name: "Bishapur", coords: [29.7739, 51.5794], subtitle: "City of Shapur I", description: "Founded by Shapur I after his victory over the Roman emperor Valerian, Bishapur was a testament to Sassanian might. The city's design featured a classic Roman grid plan, and its mosaics were crafted by captured Roman artisans, creating a unique fusion of cultures.", image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Iran-Fars-Bishapour-Temple-of-Anahita-2.jpg" }, { name: "Firuzabad", coords: [28.8453, 52.5708], subtitle: "The Circular City", description: "Built by Ardashir I, the founder of the Sassanian Empire, the city of Gor (modern Firuzabad) was a marvel of urban planning. Its perfectly circular design, with the royal palace at the epicenter, symbolized a centralized and divine power.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Palace_of_Ardashir_in_2021_04.jpg/1024px-Palace_of_Ardashir_in_2021_04.jpg" } ] },
        "Safavid": { name: "Safavid Dynasty", locations: [ { name: "Isfahan", coords: [32.6546, 51.6680], subtitle: "Half the World", description: "Under Shah Abbas I, Isfahan became one of the world's most beautiful cities, famously called 'Nisf-e-Jahan' (Half the World). The Naqsh-e Jahan Square, with its grand mosques and palaces, is the crowning achievement of Safavid art and architecture.", image: "https://images.unsplash.com/photo-1584265549097-427c3275713c?q=80&w=2070&auto=format&fit=crop" }, { name: "Sheikh Safi al-Din Khānegāh", coords: [38.2483, 48.2917], subtitle: "The Ancestral Shrine", description: "Located in Ardabil, this shrine complex is the tomb of the founder of the Safavid order. It's a breathtaking masterpiece of Islamic architecture, featuring intricate tilework, calligraphy, and a serene, spiritual atmosphere that reflects the dynasty's origins.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Sheikh_Safi_al-din_Tomb_in_Ardabil_-_exploring_the_courtyard_and_the_exterior_of_the_mausoleum.jpg/1024px-Sheikh_Safi_al-din_Tomb_in_Ardabil_-_exploring_the_courtyard_and_the_exterior_of_the_mausoleum.jpg" } ] }
    };

    // --- Core Application Logic ---

    // Check for backdrop-filter support to prevent performance issues - PERF-001 FIXED
    if (CSS.supports('backdrop-filter', 'blur(1px)') || CSS.supports('-webkit-backdrop-filter', 'blur(1px)')) {
        document.body.classList.remove('no-blur-support');
    }

    const map = L.map('map', { center: [32.4279, 53.6880], zoom: 5, zoomControl: false, attributionControl: false });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);

    const timelineContainer = document.getElementById('timeline');
    const infoPanel = document.getElementById('info-panel');
    const closePanelBtn = document.getElementById('close-panel');
    const panelImg = document.getElementById('panel-img');
    const panelTitle = document.getElementById('panel-title');
    const panelSubtitle = document.getElementById('panel-subtitle');
    const panelDesc = document.getElementById('panel-desc');

    let markerLayer = L.layerGroup().addTo(map);
    let currentEra = Object.keys(historyData)[0];
    let isMapAnimating = false; // State management for animations - UX-001 FIXED

    // Security Utility: Sanitize text to prevent HTML injection - VULN-002 FIXED
    const sanitizeText = (text) => {
        const temp = document.createElement('div');
        temp.textContent = text;
        return temp.innerHTML;
    };

    // Security Utility: Validate image URLs - VULN-002 FIXED
    const isValidHttpUrl = (string) => {
        try {
            const url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    };

    const createCustomIcon = () => L.divIcon({ className: 'location-marker', iconSize: [20, 20] });

    const displayEra = (eraKey) => {
        // 1. Fade out existing markers
        markerLayer.eachLayer(marker => {
            if (marker.getElement()) {
                marker.getElement().classList.add('marker-fade-out');
            }
        });

        // 2. Update active button immediately for responsiveness
        document.querySelectorAll('.era-button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.era === eraKey);
        });

        // 3. Wait for fade out, then swap markers
        setTimeout(() => {
            markerLayer.clearLayers();

            const eraData = historyData[eraKey];
            if (!eraData || !eraData.locations) {
                console.warn(`Data missing or malformed for era: ${eraKey}`);
                return;
            }

            const locations = eraData.locations;

            locations.forEach(loc => {
                if (!loc || !loc.coords || !Array.isArray(loc.coords) || loc.coords.length !== 2) {
                    console.warn(`Skipping location with malformed data:`, loc.name || 'Unnamed');
                    return;
                }
                const marker = L.marker(loc.coords, { icon: createCustomIcon() });
                marker.on('click', () => {
                    if (isMapAnimating) return;
                    showInfoPanel(loc);
                });
                markerLayer.addLayer(marker);
            });

        }, 300); // Corresponds to the transition duration in CSS

        hideInfoPanel();
    };

    const showInfoPanel = (location) => {
        // Sanitize all incoming data before assigning to DOM - VULN-002 FIXED
        const safeImage = isValidHttpUrl(location.image) ? location.image : ''; // Use empty string if invalid
        panelImg.src = safeImage;
        panelImg.alt = sanitizeText(location.name);
        panelTitle.textContent = sanitizeText(location.name);
        panelSubtitle.textContent = sanitizeText(location.subtitle);
        panelDesc.textContent = sanitizeText(location.description);

        infoPanel.classList.add('visible');

        isMapAnimating = true; // Set animation lock
            map.panTo(location.coords, { animate: true, duration: 1.2, easeLinearity: 0.25 });
    };

    const hideInfoPanel = () => {
        infoPanel.classList.remove('visible');
    };

    // --- Event Listeners ---

    Object.keys(historyData).forEach(eraKey => {
        const button = document.createElement('button');
        button.className = 'era-button';
        button.textContent = historyData[eraKey].name;
        button.dataset.era = eraKey;
        button.addEventListener('click', () => {
            currentEra = eraKey;
            displayEra(eraKey);
        });
        timelineContainer.appendChild(button);
    });

    closePanelBtn.addEventListener('click', hideInfoPanel);

    // Listen for map animation end to release lock - UX-001 FIXED
    map.on('moveend', () => {
        isMapAnimating = false;
    });

    // --- Initial State ---
    displayEra(currentEra);
});
