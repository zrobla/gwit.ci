// JavaScript Document

/*

TemplateMo 596 Electric Xtra

https://templatemo.com/tm-596-electric-xtra

*/

// Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 30;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
                
                // Randomly assign orange or blue color
                if (Math.random() > 0.5) {
                    particle.style.setProperty('--particle-color', '#00B2FF');
                    const before = particle.style.getPropertyValue('--particle-color');
                    particle.style.background = '#00B2FF';
                }
                
                particlesContainer.appendChild(particle);
            }
        }

        // Preloader handling
        const sitePreloader = document.getElementById('site-preloader');
        function dismissPreloader() {
            if (!sitePreloader || sitePreloader.classList.contains('preloader-dismissed')) return;
            sitePreloader.classList.add('preloader-dismissed');
            document.body.classList.remove('preloader-active');
        }

        if (sitePreloader) {
            document.body.classList.add('preloader-active');
            window.addEventListener('load', () => {
                setTimeout(dismissPreloader, 3000);
            });
            setTimeout(dismissPreloader, 3000);
        }

        // Mobile menu toggle with Bootstrap collapse support
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        const navCollapseInstance = (typeof bootstrap !== 'undefined' && navLinks)
            ? bootstrap.Collapse.getOrCreateInstance(navLinks, { toggle: false })
            : null;

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                if (!navCollapseInstance) {
                    navLinks.classList.toggle('show');
                }
            });

            if (navLinks.addEventListener) {
                navLinks.addEventListener('shown.bs.collapse', () => {
                    menuToggle.classList.add('active');
                });
                navLinks.addEventListener('hidden.bs.collapse', () => {
                    menuToggle.classList.remove('active');
                });
            }
        }

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (menuToggle) {
                    menuToggle.classList.remove('active');
                }
                if (navCollapseInstance) {
                    navCollapseInstance.hide();
                } else if (navLinks) {
                    navLinks.classList.remove('show');
                }
            });
        });

        // Active navigation highlighting
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-link');

        function applyActiveNav(link) {
            if (!link) return;
            navItems.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        }

        function updateActiveNav() {
            const scrollPosition = window.pageYOffset + 100;
            let matchedLink = null;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    const currentNav = document.querySelector(`.nav-link[data-section="${section.id}"]`) || document.querySelector(`.nav-link[href="#${section.id}"]`);
                    if (currentNav) {
                        matchedLink = currentNav;
                    }
                }
            });

            if (matchedLink) {
                applyActiveNav(matchedLink);
            } else {
                const fallbackTarget = document.body.dataset.activeNav;
                if (fallbackTarget) {
                    const fallbackLink = Array.from(navItems).find(item => item.dataset.navTarget === fallbackTarget);
                    if (fallbackLink) {
                        applyActiveNav(fallbackLink);
                    }
                }
            }
        }

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            updateActiveNav();
        });

        // Initial active nav update
        updateActiveNav();

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Feature tabs functionality (Why Nous)
        const featureTab = document.getElementById('featureTab');
        if (featureTab) {
            const tabs = featureTab.querySelectorAll('.tab-item');
            const panels = document.querySelectorAll('.content-panel');

            const activatePanel = (tab) => {
                const target = tab.getAttribute('data-bs-target') || tab.getAttribute('data-tab');
                if (!target) return;

                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                panels.forEach(p => p.classList.remove('show', 'active'));

                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');

                const panel = document.querySelector(target);
                if (panel) {
                    panel.classList.add('show', 'active');
                }
            };

            tabs.forEach(tab => {
                tab.addEventListener('click', () => activatePanel(tab));
            });

            const initialTab = featureTab.querySelector('.tab-item.active') || tabs[0];
            if (initialTab) {
                activatePanel(initialTab);
            }
        }

        // Case studies filter (homepage)
        const caseStudySection = document.querySelector('.case-studies');
        if (caseStudySection) {
            const filterButtons = caseStudySection.querySelectorAll('[data-case-filter]');
            const cards = caseStudySection.querySelectorAll('.case-study-card');

            const applyFilter = (filter) => {
                const isAll = filter === 'all';
                caseStudySection.classList.toggle('is-filtered', !isAll);

                filterButtons.forEach(btn => {
                    const isActive = btn.dataset.caseFilter === filter;
                    btn.classList.toggle('active', isActive);
                    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
                });

                const featuredCards = Array.from(cards).filter(card => card.dataset.featured === 'true');

                cards.forEach((card, index) => {
                    const categories = (card.dataset.category || '').split(' ').filter(Boolean);
                    const matchesCategory = categories.includes(filter);
                    const isFeatured = card.dataset.featured === 'true';

                    let show = false;
                    if (isAll) {
                        if (featuredCards.length) {
                            show = isFeatured;
                        } else {
                            show = index < 3;
                        }
                    } else {
                        show = matchesCategory;
                    }

                    card.classList.toggle('is-hidden', !show);
                });
            };

            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => applyFilter(btn.dataset.caseFilter));
            });

            const openLinks = caseStudySection.querySelectorAll('[data-case-open]');
            openLinks.forEach(link => {
                link.addEventListener('click', (event) => {
                    const filter = link.dataset.caseOpen;
                    if (!filter) return;
                    event.preventDefault();
                    applyFilter(filter);
                    caseStudySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            });

            applyFilter('all');
        }

        // Form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Message sent! We\'ll get back to you soon.');
                this.reset();
            });
        }

        // Initialize particles
        createParticles();

        // Text rotation with character animation
        const textSets = document.querySelectorAll('.text-set');
        if (textSets.length) {
            let currentIndex = 0;
            let isAnimating = false;

            function wrapTextInSpans(element) {
                const text = element.textContent;
                element.innerHTML = text.split('').map((char, i) => 
                    `<span class="char" style="animation-delay: ${i * 0.05}s">${char === ' ' ? '&nbsp;' : char}</span>`
                ).join('');
            }

            function animateTextIn(textSet) {
                const glitchText = textSet.querySelector('.glitch-text');
                const subtitle = textSet.querySelector('.subtitle');
                
                // Wrap text in spans for animation
                wrapTextInSpans(glitchText);
                
                // Update data attribute for glitch effect
                glitchText.setAttribute('data-text', glitchText.textContent);
                
                // Show subtitle after main text
                if (subtitle) {
                    setTimeout(() => {
                        subtitle.classList.add('visible');
                    }, 800);
                }
            }

            function animateTextOut(textSet) {
                const chars = textSet.querySelectorAll('.char');
                const subtitle = textSet.querySelector('.subtitle');
                
                // Animate characters out
                chars.forEach((char, i) => {
                    char.style.animationDelay = `${i * 0.02}s`;
                    char.classList.add('out');
                });
                
                // Hide subtitle
                if (subtitle) {
                    subtitle.classList.remove('visible');
                }
            }

            function rotateText() {
                if (isAnimating) return;
                isAnimating = true;

                const currentSet = textSets[currentIndex];
                const nextIndex = (currentIndex + 1) % textSets.length;
                const nextSet = textSets[nextIndex];

                // Animate out current text
                animateTextOut(currentSet);

                // After out animation, switch sets
                setTimeout(() => {
                    currentSet.classList.remove('active');
                    nextSet.classList.add('active');
                    animateTextIn(nextSet);
                    
                    currentIndex = nextIndex;
                    isAnimating = false;
                }, 600);
            }

            // Initialize first text set
            textSets[0].classList.add('active');
            animateTextIn(textSets[0]);

            // Start rotation after initial display
            setTimeout(() => {
                setInterval(rotateText, 5000); // Change every 5 seconds
            }, 4000);
        }
        // Hero slide rotator
        const heroSlides = document.querySelectorAll('.hero-slide');
        const heroDots = document.querySelectorAll('.hero-slider-dot');
        const heroPrev = document.querySelector('.hero-slider-arrow.prev');
        const heroNext = document.querySelector('.hero-slider-arrow.next');
        
        let heroSlideIndex = 0;
        let heroSliderInterval;
        let heroIsAnimating = false;
        const heroSlideDuration = 5000; // Auto-rotate every 5 seconds

        function updateHeroSlide(index) {
            // Remove active class from all slides
            heroSlides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });

            // Update dot indicators
            heroDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            heroSlideIndex = index;
        }

        function nextHeroSlide() {
            const nextIndex = (heroSlideIndex + 1) % heroSlides.length;
            updateHeroSlide(nextIndex);
        }

        function prevHeroSlide() {
            const prevIndex = (heroSlideIndex - 1 + heroSlides.length) % heroSlides.length;
            updateHeroSlide(prevIndex);
        }

        function startHeroAutoRotate() {
            if (heroSliderInterval) clearInterval(heroSliderInterval);
            heroSliderInterval = setInterval(() => {
                nextHeroSlide();
            }, heroSlideDuration);
        }

        function resetHeroAutoRotate() {
            startHeroAutoRotate();
        }

        // Initialize hero slider
        if (heroSlides.length > 0) {
            // Set first slide as active
            updateHeroSlide(0);
            startHeroAutoRotate();

            // Dot click handlers
            heroDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    updateHeroSlide(index);
                    resetHeroAutoRotate();
                });
            });

            // Arrow click handlers
            if (heroPrev) {
                heroPrev.addEventListener('click', () => {
                    prevHeroSlide();
                    resetHeroAutoRotate();
                });
            }

            if (heroNext) {
                heroNext.addEventListener('click', () => {
                    nextHeroSlide();
                    resetHeroAutoRotate();
                });
            }

            // Pause auto-rotate on hover
            const heroSlider = document.querySelector('.hero-slider');
            if (heroSlider) {
                heroSlider.addEventListener('mouseenter', () => {
                    if (heroSliderInterval) clearInterval(heroSliderInterval);
                });

                heroSlider.addEventListener('mouseleave', () => {
                    startHeroAutoRotate();
                });
            }
        }

        // Partners carousel - initialize all carousels
        const allCarousels = document.querySelectorAll('[data-carousel]');
        allCarousels.forEach(partnersCarousel => {
            const track = partnersCarousel.querySelector('.partners-track');
            let cards = track ? Array.from(track.children) : [];
            const prevBtn = partnersCarousel.querySelector('.partners-nav.prev');
            const nextBtn = partnersCarousel.querySelector('.partners-nav.next');
            const partnersSection = partnersCarousel.closest('.partners');
            const progressBar = partnersSection ? partnersSection.querySelector('.partners-progress-bar') : null;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const baseCount = cards.length;
            let autoFrame = null;
            let loopWidth = 0;
            const autoSpeed = 0.65;
            let offset = 0;

            const getStep = () => {
                if (!cards.length || !track) return 0;
                const cardWidth = cards[0].getBoundingClientRect().width;
                const styles = window.getComputedStyle(track);
                const gap = parseFloat(styles.columnGap || styles.gap || 0);
                return cardWidth + gap;
            };

            const getLoopWidth = () => {
                if (!track || !baseCount) return 0;
                const baseItems = Array.from(track.children).slice(0, baseCount);
                const last = baseItems[baseItems.length - 1];
                if (!last) return 0;
                return last.offsetLeft + last.offsetWidth;
            };

            const prepareLoop = () => {
                if (!track || !cards.length || track.dataset.loopReady === 'true') return;
                const baseWidth = getLoopWidth();
                if (!baseWidth) return;
                const viewportWidth = partnersCarousel.clientWidth || track.clientWidth;
                const targetWidth = Math.max(viewportWidth * 2, baseWidth * 2);
                const copies = Math.max(1, Math.ceil(targetWidth / baseWidth) - 1);
                for (let i = 0; i < copies; i++) {
                    cards.forEach(card => {
                        const clone = card.cloneNode(true);
                        clone.setAttribute('aria-hidden', 'true');
                        track.appendChild(clone);
                    });
                }
                cards = Array.from(track.children);
                loopWidth = getLoopWidth();
                track.dataset.loopReady = 'true';
                offset = 0;
                track.style.transform = 'translate3d(0, 0, 0)';
            };

            const updateProgress = () => {
                if (!progressBar || !track) return;
                const base = loopWidth || 1;
                const current = base ? ((-offset % base) + base) % base : 0;
                const progress = base ? current / base : 1;
                progressBar.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
            };

            const ensureLoop = () => {
                prepareLoop();
                loopWidth = getLoopWidth();
            };

            const applyTransform = () => {
                if (!track) return;
                track.style.transform = `translate3d(${offset}px, 0, 0)`;
            };

            const scrollByStep = direction => {
                const step = getStep();
                if (!step || !track) return;
                ensureLoop();
                if (!loopWidth) return;
                offset += direction === 'next' ? -step : step;
                if (-offset >= loopWidth) {
                    offset += loopWidth;
                } else if (-offset < 0) {
                    offset -= loopWidth;
                }
                applyTransform();
                updateProgress();
            };

            const tickAuto = () => {
                if (!track || prefersReducedMotion) return;
                ensureLoop();
                if (!loopWidth) return;
                offset -= autoSpeed;
                if (-offset >= loopWidth) {
                    offset += loopWidth;
                }
                applyTransform();
                updateProgress();
                autoFrame = requestAnimationFrame(tickAuto);
            };

            const startAuto = () => {
                if (prefersReducedMotion || !track) return;
                ensureLoop();
                if (!loopWidth) return;
                if (autoFrame) cancelAnimationFrame(autoFrame);
                autoFrame = requestAnimationFrame(tickAuto);
            };

            const stopAuto = () => {
                if (autoFrame) {
                    cancelAnimationFrame(autoFrame);
                    autoFrame = null;
                }
            };

            if (track && cards.length) {
                ensureLoop();
                updateProgress();
                window.addEventListener('resize', () => {
                    ensureLoop();
                    updateProgress();
                    applyTransform();
                });
                if (prevBtn) {
                    prevBtn.addEventListener('click', () => {
                        scrollByStep('prev');
                        startAuto();
                    });
                }
                if (nextBtn) {
                    nextBtn.addEventListener('click', () => {
                        scrollByStep('next');
                        startAuto();
                    });
                }
                partnersCarousel.addEventListener('mouseenter', stopAuto);
                partnersCarousel.addEventListener('mouseleave', startAuto);
                partnersCarousel.addEventListener('focusin', stopAuto);
                partnersCarousel.addEventListener('focusout', startAuto);
                requestAnimationFrame(() => {
                    ensureLoop();
                    updateProgress();
                    applyTransform();
                    startAuto();
                });
                window.addEventListener('load', () => {
                    ensureLoop();
                    updateProgress();
                    applyTransform();
                    startAuto();
                }, { once: true });
            }
        });

        // Univers d'intervention carousel (distinct styling & behavior)
        const universCarousel = document.querySelector('[data-univers-carousel]');
        if (universCarousel) {
            const track = universCarousel.querySelector('.univers-track');
            let cards = track ? Array.from(track.children) : [];
            const prevBtn = universCarousel.querySelector('.univers-nav.prev');
            const nextBtn = universCarousel.querySelector('.univers-nav.next');
            const progressBar = universCarousel.querySelector('.univers-progress-bar');
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const baseCount = cards.length;
            let autoFrame = null;
            let loopWidth = 0;
            const autoSpeed = 0.55;
            let offset = 0;

            const getStep = () => {
                if (!cards.length || !track) return 0;
                const cardWidth = cards[0].getBoundingClientRect().width;
                const styles = window.getComputedStyle(track);
                const gap = parseFloat(styles.columnGap || styles.gap || 0);
                return cardWidth + gap;
            };

            const getLoopWidth = () => {
                if (!track || !baseCount) return 0;
                const baseItems = Array.from(track.children).slice(0, baseCount);
                const last = baseItems[baseItems.length - 1];
                if (!last) return 0;
                return last.offsetLeft + last.offsetWidth;
            };

            const prepareLoop = () => {
                if (!track || !cards.length || track.dataset.loopReady === 'true') return;
                const baseWidth = getLoopWidth();
                if (!baseWidth) return;
                const viewportWidth = universCarousel.clientWidth || track.clientWidth;
                const targetWidth = Math.max(viewportWidth * 2, baseWidth * 2);
                const copies = Math.max(1, Math.ceil(targetWidth / baseWidth) - 1);
                for (let i = 0; i < copies; i++) {
                    cards.forEach(card => {
                        const clone = card.cloneNode(true);
                        clone.setAttribute('aria-hidden', 'true');
                        track.appendChild(clone);
                    });
                }
                cards = Array.from(track.children);
                loopWidth = getLoopWidth();
                track.dataset.loopReady = 'true';
                offset = 0;
                track.style.transform = 'translate3d(0, 0, 0)';
            };

            const updateProgress = () => {
                if (!progressBar || !track) return;
                const base = loopWidth || 1;
                const current = base ? ((-offset % base) + base) % base : 0;
                const progress = base ? current / base : 1;
                progressBar.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
            };

            const ensureLoop = () => {
                prepareLoop();
                loopWidth = getLoopWidth();
            };

            const applyTransform = () => {
                if (!track) return;
                track.style.transform = `translate3d(${offset}px, 0, 0)`;
            };

            const scrollByStep = direction => {
                const step = getStep();
                if (!step || !track) return;
                ensureLoop();
                if (!loopWidth) return;
                offset += direction === 'next' ? -step : step;
                if (-offset >= loopWidth) {
                    offset += loopWidth;
                } else if (-offset < 0) {
                    offset -= loopWidth;
                }
                applyTransform();
                updateProgress();
            };

            const tickAuto = () => {
                if (!track || prefersReducedMotion) return;
                ensureLoop();
                if (!loopWidth) return;
                offset -= autoSpeed;
                if (-offset >= loopWidth) {
                    offset += loopWidth;
                }
                applyTransform();
                updateProgress();
                autoFrame = requestAnimationFrame(tickAuto);
            };

            const startAuto = () => {
                if (prefersReducedMotion || !track) return;
                ensureLoop();
                if (!loopWidth) return;
                if (autoFrame) cancelAnimationFrame(autoFrame);
                autoFrame = requestAnimationFrame(tickAuto);
            };

            const stopAuto = () => {
                if (autoFrame) {
                    cancelAnimationFrame(autoFrame);
                    autoFrame = null;
                }
            };

            if (track && cards.length) {
                ensureLoop();
                updateProgress();
                window.addEventListener('resize', () => {
                    ensureLoop();
                    updateProgress();
                    applyTransform();
                });
                if (prevBtn) {
                    prevBtn.addEventListener('click', () => {
                        scrollByStep('prev');
                        startAuto();
                    });
                }
                if (nextBtn) {
                    nextBtn.addEventListener('click', () => {
                        scrollByStep('next');
                        startAuto();
                    });
                }
                universCarousel.addEventListener('mouseenter', stopAuto);
                universCarousel.addEventListener('mouseleave', startAuto);
                universCarousel.addEventListener('focusin', stopAuto);
                universCarousel.addEventListener('focusout', startAuto);
                requestAnimationFrame(() => {
                    ensureLoop();
                    updateProgress();
                    applyTransform();
                    startAuto();
                });
                window.addEventListener('load', () => {
                    ensureLoop();
                    updateProgress();
                    applyTransform();
                    startAuto();
                }, { once: true });
            }
        }

        // Add random glitch effect
        setInterval(() => {
            const glitchTexts = document.querySelectorAll('.glitch-text');
            glitchTexts.forEach(text => {
                if (Math.random() > 0.95) {
                    text.style.animation = 'none';
                    setTimeout(() => {
                        text.style.animation = '';
                    }, 200);
                }
            });
        }, 3000);

        // Global click sound feedback
        (function attachClickSound() {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) {
                return;
            }

            let audioContext = null;

            function ensureAudioContext() {
                if (!audioContext) {
                    audioContext = new AudioContextClass();
                }
                if (audioContext.state === 'suspended') {
                    audioContext.resume();
                }
                return audioContext;
            }

            function playClickTone() {
                const ctx = ensureAudioContext();
                if (!ctx) return;

                const duration = 0.05;
                const sampleCount = Math.max(1, Math.floor(ctx.sampleRate * duration));
                const buffer = ctx.createBuffer(1, sampleCount, ctx.sampleRate);
                const data = buffer.getChannelData(0);

                for (let i = 0; i < sampleCount; i++) {
                    const t = i / sampleCount;
                    const envelope = (1 - t) * (0.6 + 0.4 * Math.random());
                    data[i] = (Math.random() * 2 - 1) * envelope;
                }

                const source = ctx.createBufferSource();
                source.buffer = buffer;

                const gainNode = ctx.createGain();
                const now = ctx.currentTime;
                gainNode.gain.setValueAtTime(0.2, now);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

                source.connect(gainNode);
                gainNode.connect(ctx.destination);
                source.start(now);
                source.stop(now + duration);
            }

            document.addEventListener('click', () => {
                playClickTone();
            }, true);
        })();
// Blog filtering interactions
        (function initBlogFilters(){
            const filterButtons = document.querySelectorAll('.blog-filter-button');
            const blogCards = document.querySelectorAll('.blog-card');
            const badgeButtons = document.querySelectorAll('.blog-badge');
            if(!filterButtons.length || !blogCards.length){return;}
            const applyFilter = key => {
                const normalized = key === 'all' ? null : key;
                blogCards.forEach(card => {
                    const categories = (card.dataset.categories || '').split(/\s+/).filter(Boolean);
                    const match = !normalized || categories.includes(normalized);
                    card.classList.toggle('is-hidden', !match);
                });
                filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === key));
            };
            filterButtons.forEach(btn => btn.addEventListener('click', () => applyFilter(btn.dataset.filter)));
            badgeButtons.forEach(btn => btn.addEventListener('click', () => {
                const target = btn.dataset.filterTarget;
                const related = Array.from(filterButtons).find(b => b.dataset.filter === target);
                if(related){ related.click(); } else { applyFilter(target); }
            }));
            applyFilter('all');
        })();

        // Premium Hero Counter Animation
        (function initHeroCounters(){
            const counters = document.querySelectorAll('.counter');
            if(!counters.length) return;

            const animateCounter = (element) => {
                const target = parseInt(element.dataset.value) || 0;
                const duration = 2000; // 2 seconds
                const start = Date.now();

                const update = () => {
                    const elapsed = Date.now() - start;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function for smooth animation
                    const easeOutQuad = progress => 1 - (1 - progress) * (1 - progress);
                    const current = Math.floor(target * easeOutQuad(progress));
                    
                    element.textContent = current;
                    
                    if(progress < 1) {
                        requestAnimationFrame(update);
                    }
                };

                update();
            };

            // Trigger animation when hero becomes visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        const counter = entry.target;
                        if(!counter.classList.contains('animated')) {
                            animateCounter(counter);
                            counter.classList.add('animated');
                        }
                        observer.unobserve(counter);
                    }
                });
            }, { threshold: 0.3 });

            counters.forEach(counter => observer.observe(counter));
        })();

        // Hero Scroll Indicator
        (function initHeroScroll(){
            const scrollIndicator = document.querySelector('.hero-scroll');
            if(!scrollIndicator) return;

            let lastScrollTop = 0;

            window.addEventListener('scroll', () => {
                const scrollTop = window.scrollY;
                
                // Hide when scrolled down, show when at top
                if(scrollTop > 300) {
                    scrollIndicator.style.opacity = '0';
                    scrollIndicator.style.pointerEvents = 'none';
                } else {
                    scrollIndicator.style.opacity = '1';
                    scrollIndicator.style.pointerEvents = 'auto';
                }

                lastScrollTop = scrollTop;
            });

            // Smooth scroll to next section on click
            scrollIndicator.addEventListener('click', () => {
                const nextSection = document.querySelector('.features-section');
                if(nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        })();

        // Hero Visual Cards Interaction
        (function initHeroCards(){
            const visualCards = document.querySelectorAll('.visual-card');
            if(!visualCards.length) return;

            visualCards.forEach((card, index) => {
                card.addEventListener('mouseenter', function() {
                    visualCards.forEach((c, i) => {
                        if(i !== index) {
                            c.style.opacity = '0.6';
                            c.style.transform = 'scale(0.95)';
                            c.style.zIndex = '0'; // Push non-hovered cards behind
                        } else {
                            c.style.zIndex = '10'; // Bring hovered card to front
                        }
                    });
                });

                card.addEventListener('mouseleave', function() {
                    visualCards.forEach((c, i) => {
                        c.style.opacity = '1';
                        c.style.transform = '';
                        // Reset to original z-index values
                        if(c.classList.contains('card-1')) c.style.zIndex = '3';
                        else if(c.classList.contains('card-2')) c.style.zIndex = '2';
                        else if(c.classList.contains('card-3')) c.style.zIndex = '1';
                    });
                });
            });
        })();

        // Floating Elements Parallax Effect
        (function initFloatingElements(){
            const floatingElements = document.querySelectorAll('.float-element');
            if(!floatingElements.length) return;

            window.addEventListener('mousemove', (e) => {
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;

                floatingElements.forEach((element, index) => {
                    const moveX = (x - 0.5) * 20;
                    const moveY = (y - 0.5) * 20;
                    const delay = index * 0.05;

                    element.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${index * 60}deg)`;
                });
            });
        })();
