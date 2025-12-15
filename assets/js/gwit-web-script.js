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

        // Feature tabs functionality
        const tabs = document.querySelectorAll('.tab-item');
        const panels = document.querySelectorAll('.content-panel');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                
                // Remove active class from all tabs and panels
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding panel
                tab.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });

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
                setTimeout(() => {
                    subtitle.classList.add('visible');
                }, 800);
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
                subtitle.classList.remove('visible');
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

        // Hero card slider
        const heroCards = document.querySelectorAll('.hero-card');
        const heroDots = document.querySelectorAll('.hero-slider-dot');
        const heroPrev = document.querySelector('.hero-slider-arrow.prev');
        const heroNext = document.querySelector('.hero-slider-arrow.next');
        let heroCardIndex = 0;
        let heroSliderInterval;
        let heroAnimating = false;
        const heroTransitionDuration = 900;

        function updateHeroDots(index) {
            heroDots.forEach(dot => {
                const target = parseInt(dot.getAttribute('data-target'), 10);
                dot.classList.toggle('active', target === index);
            });
        }

        function heroDirection(current, target) {
            if (current === target) return 'forward';
            if (current === heroCards.length - 1 && target === 0) return 'forward';
            if (current === 0 && target === heroCards.length - 1) return 'backward';
            return target > current ? 'forward' : 'backward';
        }

        function transitionHeroCard(index, directionOverride) {
            if (heroAnimating || index === heroCardIndex || !heroCards[index]) {
                return false;
            }

            const currentCard = heroCards[heroCardIndex];
            const nextCard = heroCards[index];
            const direction = directionOverride || heroDirection(heroCardIndex, index);
            const enterClass = direction === 'backward' ? 'enter-backward' : 'enter-forward';
            const leaveClass = direction === 'backward' ? 'leave-backward' : 'leave-forward';
            const animationClasses = ['enter-forward', 'enter-backward', 'leave-forward', 'leave-backward'];

            heroAnimating = true;

            currentCard.classList.remove(...animationClasses);
            nextCard.classList.remove(...animationClasses);

            nextCard.classList.add('active', enterClass);
            currentCard.classList.add(leaveClass);
            updateHeroDots(index);

            setTimeout(() => {
                currentCard.classList.remove('active', leaveClass);
                nextCard.classList.remove(enterClass);
                heroCardIndex = index;
                heroAnimating = false;
            }, heroTransitionDuration);

            return true;
        }

        function startHeroSlider() {
            if (heroSliderInterval) clearInterval(heroSliderInterval);
            heroSliderInterval = setInterval(() => {
                const nextIndex = (heroCardIndex + 1) % heroCards.length;
                transitionHeroCard(nextIndex, 'forward');
            }, 6000);
        }

        if (heroCards.length) {
            heroCards.forEach((card, i) => {
                const animationClasses = ['enter-forward', 'enter-backward', 'leave-forward', 'leave-backward'];
                card.classList.remove(...animationClasses);
                card.classList.toggle('active', i === 0);
            });
            heroCardIndex = 0;
            updateHeroDots(0);
            startHeroSlider();

            heroDots.forEach(dot => {
                dot.addEventListener('click', () => {
                    const targetIndex = parseInt(dot.getAttribute('data-target'), 10);
                    const didTransition = transitionHeroCard(targetIndex);
                    if (didTransition) {
                        startHeroSlider();
                    }
                });
            });

            if (heroPrev) {
                heroPrev.addEventListener('click', () => {
                    const prevIndex = (heroCardIndex - 1 + heroCards.length) % heroCards.length;
                    const didTransition = transitionHeroCard(prevIndex, 'backward');
                    if (didTransition) {
                        startHeroSlider();
                    }
                });
            }

            if (heroNext) {
                heroNext.addEventListener('click', () => {
                    const nextIndex = (heroCardIndex + 1) % heroCards.length;
                    const didTransition = transitionHeroCard(nextIndex, 'forward');
                    if (didTransition) {
                        startHeroSlider();
                    }
                });
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
