document.addEventListener('DOMContentLoaded', function () {

    // --- Data Source ---
    const historyData = {
        "Achaemenid": {
            name: "Achaemenid Empire",
            locations: [
                { name: "Persepolis", coords: [29.9348, 52.8912], subtitle: "The Ceremonial Capital", description: "Founded by Darius I, Persepolis was the magnificent ceremonial capital of the Achaemenid Empire. Its grand palaces and reliefs showcased the might and diversity of the world's first superpower, a testament to architectural and cultural synthesis.", image: "https://images.unsplash.com/photo-1590178229824-b1555a6a6e5a?q=80&w=1974&auto=format&fit=crop" },
                { name: "Pasargadae", coords: [30.1993, 53.1794], subtitle: "Tomb of Cyrus the Great", description: "The first capital of the Achaemenid Empire, Pasargadae was established by Cyrus the Great. It is home to his tomb, a simple yet profoundly elegant structure that has stood for millennia, embodying the humility and vision of its founder.", image: "https://images.unsplash.com/photo-1627894953331-9871534005c2?q=80&w=2070&auto=format&fit=crop" },
                { name: "Susa", coords: [32.1894, 48.2436], subtitle: "The Administrative Heart", description: "One of the oldest cities in the world, Susa served as a crucial administrative center for the Achaemenids. The Palace of Darius here was renowned for its intricate brick panels depicting the famous archers of the Immortal Guard.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Capital_of_a_column_from_the_palace_of_Darius_I_at_Susa.jpg/800px-Capital_of_a_column_from_the_palace_of_Darius_I_at_Susa.jpg" }
            ]
        },
        "Parthian": {
            name: "Parthian Empire",
            locations: [
                { name: "Ctesiphon", coords: [33.0942, 44.5807], subtitle: "The Winter Capital", description: "While founded later, Ctesiphon rose to prominence under the Parthians as a major political and economic hub on the Tigris River. It served as their western capital, a symbol of their power straddling the line between the Roman and Persian worlds.", image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Taq-i-Kisra_from_south-east_in_2016.jpg" },
                { name: "Nisa", coords: [38.0000, 58.2000], subtitle: "The Royal Necropolis", description: "Located in modern-day Turkmenistan, Old Nisa was a royal fortress of the early Parthian kings. The site reveals a unique blend of Hellenistic and traditional Persian art and architecture, a hallmark of the Parthian era.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Nisa_-_Round_Hall.JPG/1024px-Nisa_-_Round_Hall.JPG" }
            ]
        },
        "Sassanian": {
            name: "Sassanian Empire",
            locations: [
                { name: "Taq-e Bostan", coords: [34.3869, 47.1322], subtitle: "The Royal Grotto", description: "A series of magnificent rock reliefs near Kermanshah, Taq-e Bostan showcases the grandeur of the Sassanian dynasty. The carvings depict scenes of royal investiture and hunts, masterfully carved into the cliffside with incredible detail.", image: "https://images.unsplash.com/photo-1627894953457-b6d3c051666e?q=80&w=2070&auto=format&fit=crop" },
                { name: "Bishapur", coords: [29.7739, 51.5794], subtitle: "City of Shapur I", description: "Founded by Shapur I after his victory over the Roman emperor Valerian, Bishapur was a testament to Sassanian might. The city's design featured a classic Roman grid plan, and its mosaics were crafted by captured Roman artisans, creating a unique fusion of cultures.", image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Iran-Fars-Bishapour-Temple-of-Anahita-2.jpg" },
                { name: "Firuzabad", coords: [28.8453, 52.5708], subtitle: "The Circular City", description: "Built by Ardashir I, the founder of the Sassanian Empire, the city of Gor (modern Firuzabad) was a marvel of urban planning. Its perfectly circular design, with the royal palace at the epicenter, symbolized a centralized and divine power.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Palace_of_Ardashir_in_2021_04.jpg/1024px-Palace_of_Ardashir_in_2021_04.jpg" }
            ]
        },
        "Safavid": {
            name: "Safavid Dynasty",
            locations: [
                { name: "Isfahan", coords: [32.6546, 51.6680], subtitle: "Half the World", description: "Under Shah Abbas I, Isfahan became one of the world's most beautiful cities, famously called 'Nisf-e-Jahan' (Half the World). The Naqsh-e Jahan Square, with its grand mosques and palaces, is the crowning achievement of Safavid art and architecture.", image: "https://images.unsplash.com/photo-1584265549097-427c3275713c?q=80&w=2070&auto=format&fit=crop" },
                { name: "Sheikh Safi al-Din Khānegāh", coords: [38.2483, 48.2917], subtitle: "The Ancestral Shrine", description: "Located in Ardabil, this shrine complex is the tomb of the founder of the Safavid order. It's a breathtaking masterpiece of Islamic architecture, featuring intricate tilework, calligraphy, and a serene, spiritual atmosphere that reflects the dynasty's origins.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Sheikh_Safi_al-din_Tomb_in_Ardabil_-_exploring_the_courtyard_and_the_exterior_of_the_mausoleum.jpg/1024px-Sheikh_Safi_al-din_Tomb_in_Ardabil_-_exploring_the_courtyard_and_the_exterior_of_the_mausoleum.jpg" }
            ]
        }
    };

    // --- Init ---
    if (CSS.supports('backdrop-filter', 'blur(1px)') || CSS.supports('-webkit-backdrop-filter', 'blur(1px)')) {
        document.body.classList.remove('no-blur-support');
    }

    const map = L.map('map', {
        center: [32.4279, 53.6880],
        zoom: 5,
        zoomControl: false,
        attributionControl: false,
        zoomSnap: 0.5
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        opacity: 1
    }).addTo(map);

    const timelineContainer = document.getElementById('timeline');
    const infoPanel = document.getElementById('info-panel');
    const closePanelBtn = document.getElementById('close-panel');
    const panelImg = document.getElementById('panel-img');
    const panelTitle = document.getElementById('panel-title');
    const panelSubtitle = document.getElementById('panel-subtitle');
    const panelDesc = document.getElementById('panel-desc');
    const panelOverline = document.getElementById('panel-overline');

    let markerLayer = L.layerGroup().addTo(map);
    let currentEra = Object.keys(historyData)[0];
    let isMapAnimating = false;
    let markerTimeouts = [];

    // --- Helpers ---

    const sanitizeText = (text) => {
        const temp = document.createElement('div');
        temp.textContent = text;
        return temp.innerHTML;
    };

    const isValidHttpUrl = (string) => {
        try {
            const url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    };

    // Create marker with custom HTML structure for pulsing effect
    const createCustomIcon = () => L.divIcon({
        className: 'location-marker',
        html: '<div class="marker-pulse"></div><div class="marker-ring"></div><div class="marker-inner"></div>',
        iconSize: [80, 80],
        iconAnchor: [40, 40]
    });

    // Map flyTo with layout awareness
    const flyToLocation = (coords) => {
        const isDesktop = window.innerWidth > 768;
        const targetZoom = 8;

        let options = {
            animate: true,
            duration: 1.5,
            easeLinearity: 0.25
        };

        if (isDesktop) {
            // Offset for right panel (approx 500px + padding)
            options.paddingBottomRight = [520, 0];
        } else {
            // Offset for bottom sheet (dynamic based on viewport)
            options.paddingBottomRight = [0, window.innerHeight * 0.45];
        }

        map.flyTo(coords, targetZoom, options);
    };

    // --- Core Logic ---

    const displayEra = (eraKey) => {
        // Clear pending marker animations
        markerTimeouts.forEach(id => clearTimeout(id));
        markerTimeouts = [];

        // Exit animation for current markers
        markerLayer.eachLayer(marker => {
            const el = marker.getElement();
            if (el) {
                el.style.transition = 'opacity 0.3s ease';
                el.style.opacity = '0';
                const children = el.querySelectorAll('div');
                children.forEach(c => {
                    c.style.transition = 'transform 0.3s ease';
                    c.style.transform = 'translate(-50%, -50%) scale(0)';
                });
            }
        });

        // Update timeline
        document.querySelectorAll('.era-button').forEach(btn => {
            const isActive = btn.dataset.era === eraKey;
            btn.classList.toggle('active', isActive);
            if (isActive) {
                btn.setAttribute('aria-current', 'time');
                btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                btn.removeAttribute('aria-current');
            }
        });

        setTimeout(() => {
            markerLayer.clearLayers();
            const eraData = historyData[eraKey];
            if (!eraData) return;

            eraData.locations.forEach((loc, index) => {
                const timeoutId = setTimeout(() => {
                    const marker = L.marker(loc.coords, {
                        icon: createCustomIcon(),
                        alt: loc.name,
                        title: loc.name
                    });

                    marker.on('click', () => {
                        if (isMapAnimating) return;
                        showInfoPanel(loc, eraData.name);
                    });

                    markerLayer.addLayer(marker);

                    // Entry Animation
                    const el = marker.getElement();
                    if (el) {
                        el.style.opacity = '0';
                        const children = el.querySelectorAll('div');
                        children.forEach(c => {
                             c.style.transform = 'translate(-50%, -50%) scale(0)';
                             c.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                        });

                        requestAnimationFrame(() => {
                            el.style.opacity = '1';
                            el.style.transition = 'opacity 0.5s ease';
                            children.forEach(c => {
                                c.style.transform = 'translate(-50%, -50%) scale(1)';
                            });
                        });
                    }
                }, index * 100);
                markerTimeouts.push(timeoutId);
            });

        }, 300);

        hideInfoPanel();
    };

    const showInfoPanel = (location, eraName) => {
        const safeImage = isValidHttpUrl(location.image) ? location.image : '';

        panelImg.style.opacity = '0';
        panelImg.src = safeImage;
        panelImg.onload = () => { panelImg.style.opacity = '1'; }; // Smooth image load

        panelImg.alt = sanitizeText(location.name);
        panelTitle.textContent = sanitizeText(location.name);
        panelSubtitle.textContent = sanitizeText(location.subtitle);
        panelDesc.textContent = sanitizeText(location.description);

        // Update contextual overline
        if (panelOverline) {
            panelOverline.textContent = eraName || "Historical Site";
        }

        infoPanel.classList.add('visible');

        isMapAnimating = true;
        flyToLocation(location.coords);
    };

    const hideInfoPanel = () => {
        infoPanel.classList.remove('visible');
    };

    // --- Init Listeners ---

    const eraKeys = Object.keys(historyData);
    eraKeys.forEach(eraKey => {
        const button = document.createElement('button');
        button.className = 'era-button';
        button.textContent = historyData[eraKey].name;
        button.dataset.era = eraKey;
        button.addEventListener('click', () => {
            if (isMapAnimating) return;
            currentEra = eraKey;
            displayEra(eraKey);
        });
        timelineContainer.appendChild(button);
    });

    closePanelBtn.addEventListener('click', hideInfoPanel);

    document.addEventListener('keydown', (e) => {
        if (infoPanel.classList.contains('visible') && e.key === "Escape") {
            hideInfoPanel();
            return;
        }

        // Timeline Navigation with Arrows
        const currentIndex = eraKeys.indexOf(currentEra);
        if (e.key === "ArrowRight") {
            const nextIndex = (currentIndex + 1) % eraKeys.length;
            const nextEra = eraKeys[nextIndex];
            if (!isMapAnimating) {
                currentEra = nextEra;
                displayEra(nextEra);
            }
        } else if (e.key === "ArrowLeft") {
            const prevIndex = (currentIndex - 1 + eraKeys.length) % eraKeys.length;
            const prevEra = eraKeys[prevIndex];
            if (!isMapAnimating) {
                currentEra = prevEra;
                displayEra(prevEra);
            }
        }
    });

    // Close panel when clicking on map background
    map.on('click', (e) => {
        // Only close if we clicked the map, not a marker (marker click stops propagation usually, but Leaflet handles it)
        hideInfoPanel();
    });

    map.on('moveend', () => {
        isMapAnimating = false;
    });

    // Start
    displayEra(currentEra);
});
