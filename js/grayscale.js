(function () {
    "use strict";

    var focusData = {
        copilot: {
            title: "Production GenAI copilots",
            copy: "LLM-backed assistants that turn natural language into useful clinical review workflows, reducing query-build time and improving data extraction speed.",
            tags: ["LLM APIs", "Prompt engineering", "Clinical review"],
            status: "Natural language to clinical workflow",
            narrative: "I design LLM assistants that replace complex manual clinical review flows with guided natural-language inputs and reliable backend orchestration.",
            signal: "Production copilot",
            use: "Clinical review",
            energy: "75% faster",
            meter: 94
        },
        rag: {
            title: "RAG pipelines for domain data",
            copy: "Retrieval-augmented systems that ground model responses in clinical, CDISC, and product-specific context instead of leaving answers to memory.",
            tags: ["RAG", "LangChain", "CDISC"],
            status: "Grounded answers over domain data",
            narrative: "RAG work is where the product becomes dependable: source-aware retrieval, compact context, and model outputs that are easier to inspect.",
            signal: "Grounded generation",
            use: "Clinical datasets",
            energy: "3+ years",
            meter: 88
        },
        finetune: {
            title: "Fine-tuned open-source LLMs",
            copy: "LoRA-based fine-tuning on synthesized datasets to classify logically discrepant features with more than 80% accuracy.",
            tags: ["Hugging Face", "LoRA", "Evaluation"],
            status: "Specialized models with measurable behavior",
            narrative: "I use fine-tuning when prompting is not enough and the model needs to learn a narrower decision pattern with clearer evaluation.",
            signal: "Specialized LLMs",
            use: "Classification",
            energy: "80%+ accuracy",
            meter: 91
        },
        clinical: {
            title: "Clinical AI platform integration",
            copy: "Model service interfaces, configurable rule engines, and backend systems that let non-ML teams consume AI outputs directly.",
            tags: ["Python", "Django", "AWS"],
            status: "AI services inside production platforms",
            narrative: "The strongest GenAI work still needs careful backend engineering: service contracts, observability, domain constraints, and clean integration paths.",
            signal: "Backend integration",
            use: "Life sciences",
            energy: "50% less effort",
            meter: 87
        }
    };

    var traceLines = [
        "boot: genai portfolio online",
        "context: clinical and life-sciences LLM systems",
        "focus: copilots, RAG, fine-tuning, clinical AI",
        "impact: 75% faster query-builds",
        "status: production AI experience loaded"
    ];

    var root = document.documentElement;
    var body = document.body;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function selectAll(selector, parent) {
        return Array.prototype.slice.call((parent || document).querySelectorAll(selector));
    }

    function setFocus(key) {
        var item = focusData[key] || focusData.copilot;
        var focusTitle = document.getElementById("focusTitle");
        var focusCopy = document.getElementById("focusCopy");
        var focusTags = document.getElementById("focusTags");
        var focusMeter = document.getElementById("focusMeter");
        var modeStatus = document.getElementById("modeStatus");
        var modeNarrative = document.getElementById("modeNarrative");
        var modeSignal = document.getElementById("modeSignal");
        var modeUse = document.getElementById("modeUse");
        var modeEnergy = document.getElementById("modeEnergy");

        if (focusTitle) {
            focusTitle.textContent = item.title;
        }
        if (focusCopy) {
            focusCopy.textContent = item.copy;
        }
        if (focusTags) {
            focusTags.innerHTML = item.tags.map(function (tag) {
                return "<li>" + tag + "</li>";
            }).join("");
        }
        if (focusMeter) {
            focusMeter.style.width = item.meter + "%";
        }
        if (modeStatus) {
            modeStatus.textContent = item.status;
        }
        if (modeNarrative) {
            modeNarrative.textContent = item.narrative;
        }
        if (modeSignal) {
            modeSignal.textContent = item.signal;
        }
        if (modeUse) {
            modeUse.textContent = item.use;
        }
        if (modeEnergy) {
            modeEnergy.textContent = item.energy;
        }

        selectAll("[data-focus]").forEach(function (button) {
            var isActive = button.getAttribute("data-focus") === key;
            button.classList.toggle("is-active", isActive);
            if (button.classList.contains("mode-button")) {
                button.setAttribute("aria-selected", String(isActive));
            }
        });
    }

    function initNavigation() {
        var topbar = document.querySelector("[data-topbar]");
        var toggle = document.querySelector(".nav-toggle");
        var navLinks = selectAll(".nav-link");
        var anchorLinks = selectAll('a[href^="#"]');

        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function smoothScrollTo(target) {
            if (!target) {
                return;
            }

            var headerOffset = topbar ? topbar.getBoundingClientRect().height + 12 : 0;
            var startY = window.scrollY || window.pageYOffset;
            var targetY = Math.max(0, target.getBoundingClientRect().top + startY - headerOffset);
            var distance = targetY - startY;
            var duration = reduceMotion ? 0 : Math.min(920, Math.max(420, Math.abs(distance) * 0.48));
            var startTime = null;

            if (duration === 0) {
                window.scrollTo(0, targetY);
                return;
            }

            function step(timestamp) {
                if (startTime === null) {
                    startTime = timestamp;
                }
                var elapsed = timestamp - startTime;
                var progress = Math.min(1, elapsed / duration);
                window.scrollTo(0, startY + distance * easeInOutCubic(progress));
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            }

            window.requestAnimationFrame(step);
        }

        if (toggle && topbar) {
            toggle.addEventListener("click", function () {
                var isOpen = topbar.classList.toggle("nav-open");
                toggle.setAttribute("aria-expanded", String(isOpen));
            });
        }

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                if (topbar) {
                    topbar.classList.remove("nav-open");
                }
                if (toggle) {
                    toggle.setAttribute("aria-expanded", "false");
                }
            });
        });

        anchorLinks.forEach(function (link) {
            link.addEventListener("click", function (event) {
                var hash = link.getAttribute("href");
                if (!hash || hash === "#") {
                    return;
                }

                var target = document.querySelector(hash);
                if (!target) {
                    return;
                }

                event.preventDefault();
                smoothScrollTo(target);
                window.history.pushState(null, "", hash);
            });
        });

        var sections = selectAll(".section-watch");
        if (!("IntersectionObserver" in window) || sections.length === 0) {
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }
                navLinks.forEach(function (link) {
                    link.classList.toggle("is-active", link.getAttribute("data-section") === entry.target.id);
                });
            });
        }, {
            rootMargin: "-45% 0px -50% 0px",
            threshold: 0.01
        });

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    function initReveals() {
        var reveals = selectAll(".reveal");
        if (!("IntersectionObserver" in window)) {
            reveals.forEach(function (el) {
                el.classList.add("is-visible");
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.16
        });

        reveals.forEach(function (el) {
            observer.observe(el);
        });
    }

    function initPointerEffects() {
        if (reduceMotion) {
            return;
        }

        var tiltTarget = document.querySelector("[data-tilt]");
        var pointerState = { x: 0, y: 0, active: false };
        var pointerTicking = false;

        function updatePointerEffects() {
            pointerTicking = false;
            if (tiltTarget && pointerState.active) {
                tiltTarget.style.setProperty("--tilt-x", (pointerState.x * 6).toFixed(2) + "deg");
                tiltTarget.style.setProperty("--tilt-y", (pointerState.y * -6).toFixed(2) + "deg");
            }
        }

        document.addEventListener("pointermove", function (event) {
            pointerState.x = event.clientX / window.innerWidth - 0.5;
            pointerState.y = event.clientY / window.innerHeight - 0.5;
            pointerState.active = true;

            if (!pointerTicking) {
                pointerTicking = true;
                window.requestAnimationFrame(updatePointerEffects);
            }
        });

        selectAll(".magnetic").forEach(function (element) {
            element.addEventListener("pointermove", function (event) {
                var rect = element.getBoundingClientRect();
                var dx = event.clientX - rect.left - rect.width / 2;
                var dy = event.clientY - rect.top - rect.height / 2;
                element.style.transform = "translate(" + (dx * 0.12).toFixed(2) + "px, " + (dy * 0.12).toFixed(2) + "px)";
            });
            element.addEventListener("pointerleave", function () {
                element.style.transform = "";
            });
        });
    }

    function initEmailCopy() {
        var copyButton = document.querySelector("[data-copy-email]");
        var copyLabel = document.getElementById("copyLabel");
        if (!copyButton || !copyLabel) {
            return;
        }

        copyButton.addEventListener("click", function () {
            var email = copyButton.getAttribute("data-copy-email");
            if (!navigator.clipboard) {
                copyLabel.textContent = "amrs.tech@gmail.com";
                return;
            }
            navigator.clipboard.writeText(email).then(function () {
                copyLabel.textContent = "Copied";
                window.setTimeout(function () {
                    copyLabel.textContent = "Copy email";
                }, 1800);
            }).catch(function () {
                copyLabel.textContent = email;
            });
        });
    }

    function initTraceTicker() {
        var trace = document.getElementById("traceLine");
        if (!trace || reduceMotion) {
            return;
        }

        var index = 0;
        window.setInterval(function () {
            index = (index + 1) % traceLines.length;
            trace.textContent = traceLines[index];
        }, 2600);
    }

    function initFocusControls() {
        selectAll("[data-focus]").forEach(function (button) {
            button.addEventListener("click", function () {
                setFocus(button.getAttribute("data-focus"));
            });
        });
        setFocus("copilot");
    }

    function initSignalCanvas() {
        var canvas = document.getElementById("signalCanvas");
        if (!canvas) {
            return;
        }

        var ctx = canvas.getContext("2d");
        var nodes = [];
        var pointer = { x: -9999, y: -9999 };
        var width = 0;
        var height = 0;
        var palette = ["103, 242, 189", "255, 107, 74", "244, 201, 93", "105, 183, 255", "180, 156, 255"];

        function resize() {
            var dpr = Math.min(window.devicePixelRatio || 1, 2);
            var viewport = window.visualViewport;
            width = Math.ceil((viewport && viewport.width) || document.documentElement.clientWidth || window.innerWidth);
            height = Math.ceil((viewport && viewport.height) || window.innerHeight);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            var count = Math.max(24, Math.min(54, Math.floor((width * height) / 42000)));
            nodes = [];
            for (var i = 0; i < count; i += 1) {
                nodes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.34,
                    vy: (Math.random() - 0.5) * 0.34,
                    radius: 1.2 + Math.random() * 1.7,
                    color: palette[i % palette.length]
                });
            }
        }

        function drawLine(a, b, distance, limit) {
            var opacity = Math.max(0, 1 - distance / limit) * 0.34;
            ctx.strokeStyle = "rgba(" + a.color + ", " + opacity.toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }

        function animate(timestamp) {
            ctx.clearRect(0, 0, width, height);

            nodes.forEach(function (node, index) {
                if (!reduceMotion) {
                    node.x += node.vx;
                    node.y += node.vy;
                }

                if (node.x < -20) {
                    node.x = width + 20;
                } else if (node.x > width + 20) {
                    node.x = -20;
                }

                if (node.y < -20) {
                    node.y = height + 20;
                } else if (node.y > height + 20) {
                    node.y = -20;
                }

                for (var i = index + 1; i < nodes.length; i += 1) {
                    var other = nodes[i];
                    var dx = node.x - other.x;
                    var dy = node.y - other.y;
                    var distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 132) {
                        drawLine(node, other, distance, 132);
                    }
                }

                var pointerDx = node.x - pointer.x;
                var pointerDy = node.y - pointer.y;
                var pointerDistance = Math.sqrt(pointerDx * pointerDx + pointerDy * pointerDy);
                if (pointerDistance < 190) {
                    drawLine(node, { x: pointer.x, y: pointer.y, color: "245, 239, 227" }, pointerDistance, 190);
                }

                ctx.fillStyle = "rgba(" + node.color + ", 0.7)";
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            if (!reduceMotion) {
                window.requestAnimationFrame(animate);
            }
        }

        window.addEventListener("resize", resize);
        if (window.visualViewport) {
            window.visualViewport.addEventListener("resize", resize);
        }
        window.addEventListener("pointermove", function (event) {
            pointer.x = event.clientX;
            pointer.y = event.clientY;
        });
        window.addEventListener("pointerleave", function () {
            pointer.x = -9999;
            pointer.y = -9999;
        });

        resize();
        window.requestAnimationFrame(animate);
    }

    document.addEventListener("DOMContentLoaded", function () {
        body.classList.add("is-loaded");
        initNavigation();
        initReveals();
        initFocusControls();
        initPointerEffects();
        initEmailCopy();
        initTraceTicker();
        initSignalCanvas();
    });
}());
