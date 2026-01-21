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
    // Check for backdrop-support
    if (CSS.supports('backdrop-filter', 'blur(1px)') || CSS.supports('-webkit-backdrop-filter', 'blur(1px)')) {
        document.body.classList.remove('no-blur-support');
    }

    const map = L.map('map', {
        center: [32.4279, 53.6880],
        zoom: 3, // Cinematic Start (World View)
        zoomControl: false,
        attributionControl: false,
        zoomSnap: 0.05, // Ultra-smooth zooming
        wheelPxPerZoomLevel: 120, // Smoother scroll zoom
        inertia: true,
        inertiaDeceleration: 3000
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
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

    // Add Timeline Indicator (Desktop)
    const timelineIndicator = document.createElement('div');
    timelineIndicator.id = 'timeline-indicator';
    // Always append, manage visibility via CSS/JS
    timelineContainer.prepend(timelineIndicator);

    let markerLayer = L.layerGroup().addTo(map);
    let currentEra = Object.keys(historyData)[0];
    let isMapAnimating = false;
    let markerTimeouts = [];

    // --- Helpers ---

    class TouchController {
        constructor(element, onDismiss) {
            this.element = element;
            this.onDismiss = onDismiss;
            this.startY = 0;
            this.currentY = 0;
            this.dragging = false;

            this.init();
        }

        init() {
            this.element.addEventListener('touchstart', (e) => this.start(e), { passive: true });
            this.element.addEventListener('touchmove', (e) => this.move(e), { passive: false });
            this.element.addEventListener('touchend', () => this.end());
        }

        start(e) {
            if (!this.element.classList.contains('visible') || window.innerWidth > 1024) return;
            // Allow drag if hitting handle or header area
            const isHandle = e.target.closest('.panel-handle-mobile') || e.target.closest('.panel-text');
            const content = this.element.querySelector('.panel-content');

            // If scrolling content, only allow drag if at top and pulling down
            if (content && content.scrollTop > 0 && !e.target.closest('.panel-handle-mobile')) return;

            this.startY = e.touches[0].clientY;
            this.currentY = this.startY; // Initialize to prevent jumps on tap
            this.dragging = true;
            this.element.style.transition = 'none';
        }

        move(e) {
            if (!this.dragging) return;
            this.currentY = e.touches[0].clientY;
            const delta = this.currentY - this.startY;

            if (delta > 0) {
                 if (e.cancelable) e.preventDefault();
                 this.element.style.transform = `translateY(${delta}px)`;
            }
        }

        end() {
            if (!this.dragging) return;
            this.dragging = false;
            const delta = this.currentY - this.startY;

            this.element.style.transition = 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)';

            if (delta > 150) {
                this.onDismiss();
                // Reset transform after it closes (handled by CSS class toggle but we ensure clean state)
                setTimeout(() => { this.element.style.transform = ''; }, 500);
            } else {
                this.element.style.transform = 'translateY(0)';
            }
        }
    }

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

    // Map flyTo with layout awareness (Ultrathink)
    const flyToLocation = (coords) => {
        // Desktop breakpoint should match CSS (1024px)
        const isDesktop = window.innerWidth > 1024;
        const targetZoom = isDesktop ? 7.5 : 6.5;

        let options = {
            animate: true,
            duration: 2.0, // Slow, cinematic fly
            easeLinearity: 0.1
        };

        if (isDesktop) {
            // Offset for right panel (540px width + 40px margin)
            // We shift the center point to the left to balance the layout
            // Formula: (PanelWidth + Margin) / 2
            options.paddingBottomRight = [580, 0];
        } else {
            // Offset for bottom sheet (dynamic based on viewport)
            // We shift the center point up significantly to be in the visible area above the sheet
            options.paddingBottomRight = [0, window.innerHeight * 0.6];
        }

        map.flyTo(coords, targetZoom, options);
    };

    // --- Interactive Logic ---

    // Timeline Indicator Logic
    const updateTimelineIndicator = (activeBtn) => {
        if (!timelineIndicator || window.innerWidth <= 1024) return;

        const rect = activeBtn.getBoundingClientRect();
        const parentRect = timelineContainer.getBoundingClientRect();

        timelineIndicator.style.width = `${rect.width}px`;
        timelineIndicator.style.transform = `translateX(${rect.left - parentRect.left}px)`;
    };

    const displayEra = (eraKey) => {
        // Clear pending marker animations
        markerTimeouts.forEach(id => clearTimeout(id));
        markerTimeouts = [];

        // Exit animation for current markers
        markerLayer.eachLayer(marker => {
            const el = marker.getElement();
            if (el) {
                el.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.5, 0, 0.75, 0)';
                el.style.opacity = '0';
                const children = el.querySelectorAll('div');
                children.forEach(c => {
                    c.style.transition = 'transform 0.4s ease';
                    c.style.transform = 'translate(-50%, -50%) scale(0)';
                });
            }
        });

        // Update timeline UI
        document.querySelectorAll('.era-button').forEach(btn => {
            const isActive = btn.dataset.era === eraKey;
            btn.classList.toggle('active', isActive);
            if (isActive) {
                btn.setAttribute('aria-current', 'time');
                btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                updateTimelineIndicator(btn);
            } else {
                btn.removeAttribute('aria-current');
            }
        });

        // Delay clearing to allow exit animation to play
        setTimeout(() => {
            markerLayer.clearLayers();
            const eraData = historyData[eraKey];
            if (!eraData) return;

            eraData.locations.forEach((loc, index) => {
                const timeoutId = setTimeout(() => {
                    const marker = L.marker(loc.coords, {
                        icon: createCustomIcon(),
                        alt: loc.name,
                        keyboard: true
                    });

                    // Custom styled tooltip
                    marker.bindTooltip(loc.name, {
                        direction: 'top',
                        offset: [0, -40],
                        className: 'custom-tooltip',
                        opacity: 1
                    });

                    marker.on('click', () => {
                        showInfoPanel(loc, eraData.name);
                    });

                    // Keyboard activation
                    marker.on('keydown', (e) => {
                         if (e.originalEvent.key === 'Enter') {
                             showInfoPanel(loc, eraData.name);
                         }
                    });

                    markerLayer.addLayer(marker);

                    // Entry Animation (Staggered Pop)
                    const el = marker.getElement();
                    if (el) {
                        el.style.opacity = '0';
                        const children = el.querySelectorAll('div');
                        children.forEach(c => {
                             c.style.transform = 'translate(-50%, -50%) scale(0)';
                             c.style.transition = 'transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)'; // Elastic pop
                        });

                        requestAnimationFrame(() => {
                            el.style.opacity = '1';
                            el.style.transition = 'opacity 0.6s ease';
                            children.forEach(c => {
                                c.style.transform = 'translate(-50%, -50%) scale(1)';
                            });
                        });
                    }
                }, index * 200); // 200ms stagger
                markerTimeouts.push(timeoutId);
            });

        }, 400);

        hideInfoPanel();
    };

    const showInfoPanel = (location, eraName) => {
        if (navigator.vibrate) navigator.vibrate(20);

        const safeImage = isValidHttpUrl(location.image) ? location.image : '';

        // Reset state for entry animation
        panelImg.style.transition = 'none';
        panelImg.style.opacity = '0';
        panelImg.style.transform = 'scale(1.1)';

        // Hide text elements initially for staggered reveal
        const textElements = document.querySelector('.panel-text');
        textElements.style.opacity = '0';
        textElements.style.transform = 'translateY(20px)';

        panelImg.onload = () => {
            // Image Reveal
            requestAnimationFrame(() => {
                panelImg.style.transition = 'opacity 1s ease, transform 1.5s cubic-bezier(0.2, 1, 0.3, 1)';
                panelImg.style.opacity = '0.8';
                panelImg.style.transform = 'scale(1)';
            });
        };

        panelImg.src = safeImage;

        panelImg.alt = sanitizeText(location.name);
        panelTitle.textContent = sanitizeText(location.name);
        panelSubtitle.textContent = sanitizeText(location.subtitle);
        panelDesc.textContent = sanitizeText(location.description);

        if (panelOverline) {
            panelOverline.textContent = eraName || "Historical Site";
        }

        infoPanel.classList.add('visible');
        infoPanel.setAttribute('aria-hidden', 'false');

        // Text Stagger Reveal
        setTimeout(() => {
            textElements.style.transition = 'all 0.8s cubic-bezier(0.2, 1, 0.3, 1)';
            textElements.style.opacity = '1';
            textElements.style.transform = 'translateY(0)';
        }, 300);

        isMapAnimating = true;
        flyToLocation(location.coords);
    };

    const hideInfoPanel = () => {
        infoPanel.classList.remove('visible');
        infoPanel.setAttribute('aria-hidden', 'true');
    };

    // --- Init Listeners ---

    const eraKeys = Object.keys(historyData);
    eraKeys.forEach((eraKey, index) => {
        const button = document.createElement('button');
        button.className = 'era-button';
        button.textContent = historyData[eraKey].name;
        button.dataset.era = eraKey;
        button.setAttribute('role', 'tab');

        // Set first button active initially for indicator calculation
        if (index === 0) button.classList.add('active');

        button.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(10);
            currentEra = eraKey;
            displayEra(eraKey);
        });

        // Magnetic Effect
        button.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 1024) return;
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        button.addEventListener('mouseleave', () => {
             button.style.transform = 'translate(0, 0)';
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
            currentEra = nextEra;
            displayEra(nextEra);
        } else if (e.key === "ArrowLeft") {
            const prevIndex = (currentIndex - 1 + eraKeys.length) % eraKeys.length;
            const prevEra = eraKeys[prevIndex];
            currentEra = prevEra;
            displayEra(prevEra);
        }
    });

    map.on('click', (e) => {
        hideInfoPanel();
    });

    // Parallax Effect for Panel (Desktop Ultrathink)
    const handleParallax = (e) => {
        if (window.innerWidth <= 1024 || !infoPanel.classList.contains('visible')) {
            // Reset transform if not applicable
            if (infoPanel.classList.contains('visible')) {
               infoPanel.style.transform = 'translate(0, 0)';
            }
            return;
        }

        const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
        const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

        // Subtle tilt
        infoPanel.style.transform = `perspective(1000px) rotateY(${x * -2}deg) rotateX(${y * 2}deg)`;
    };

    document.addEventListener('mousemove', handleParallax);

    // Mobile Touch Controller
    new TouchController(infoPanel, hideInfoPanel);

    // Start
    // Initial timeline indicator set
    setTimeout(() => {
         const firstBtn = document.querySelector('.era-button');
         if(firstBtn) updateTimelineIndicator(firstBtn);
         displayEra(currentEra);

         // Cinematic Intro
         setTimeout(() => {
             const firstLoc = historyData[currentEra].locations[0];
             if(firstLoc) flyToLocation(firstLoc.coords);
         }, 800);
    }, 100);

    // Resize listener
    window.addEventListener('resize', () => {
         const activeBtn = document.querySelector('.era-button.active');
         if(activeBtn) updateTimelineIndicator(activeBtn);
    });
});
