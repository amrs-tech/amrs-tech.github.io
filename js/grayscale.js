(function () {
    "use strict";

    var focusData = {
        python: {
            title: "Python-first engineering",
            copy: "Readable automation, APIs, data workflows, and ML pipelines with the speed to prototype and the patience to harden.",
            tags: ["Automation", "ML pipelines", "APIs"],
            status: "Readable systems, quick iteration",
            narrative: "I reach for Python when a workflow needs clarity, automation, or a bridge between data, models, and product surfaces.",
            signal: "Clean automation",
            use: "ML workflows",
            energy: "92%",
            meter: 92
        },
        analytics: {
            title: "Analytics engineering",
            copy: "Data movement, reporting logic, validation, and the useful layers between raw numbers and decisions.",
            tags: ["Dashboards", "Pipelines", "Quality"],
            status: "Evidence shaped for action",
            narrative: "Analytics work should reduce doubt. I like building the pieces that make data easier to inspect, explain, and reuse.",
            signal: "Decision loops",
            use: "Data products",
            energy: "86%",
            meter: 86
        },
        genai: {
            title: "Generative AI tools",
            copy: "Practical AI utilities, assistant workflows, prompt systems, and human-in-the-loop experiences that stay useful after the demo.",
            tags: ["Assistants", "Prompting", "Evaluation"],
            status: "AI with useful boundaries",
            narrative: "My GenAI interest is strongest where models become dependable tools: focused workflows, clear feedback, and measurable outcomes.",
            signal: "Applied AI",
            use: "Tooling",
            energy: "89%",
            meter: 89
        },
        web: {
            title: "Web development",
            copy: "Interface systems, responsive layouts, front-end behavior, and web surfaces that make technical work easier to reach.",
            tags: ["UI systems", "Responsive", "UX"],
            status: "Interfaces that feel direct",
            narrative: "Web engineering is the place where users meet the system. I care about speed, clarity, and interactions that earn their space.",
            signal: "Product surface",
            use: "Portfolio and apps",
            energy: "84%",
            meter: 84
        }
    };

    var traceLines = [
        "boot: portfolio surface online",
        "scan: preserving current links and contact routes",
        "focus: Python, analytics, GenAI, web",
        "status: ready for new case studies",
        "loop: interaction layer listening"
    ];

    var root = document.documentElement;
    var body = document.body;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function selectAll(selector, parent) {
        return Array.prototype.slice.call((parent || document).querySelectorAll(selector));
    }

    function setFocus(key) {
        var item = focusData[key] || focusData.python;
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
        document.addEventListener("pointermove", function (event) {
            var x = event.clientX / window.innerWidth - 0.5;
            var y = event.clientY / window.innerHeight - 0.5;
            root.style.setProperty("--cursor-x", (x * 18).toFixed(2) + "px");
            root.style.setProperty("--cursor-y", (y * 18).toFixed(2) + "px");

            if (tiltTarget) {
                tiltTarget.style.setProperty("--tilt-x", (x * 7).toFixed(2) + "deg");
                tiltTarget.style.setProperty("--tilt-y", (y * -7).toFixed(2) + "deg");
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
        setFocus("python");
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
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            var count = Math.max(34, Math.min(88, Math.floor((width * height) / 21000)));
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

        function animate() {
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

            window.requestAnimationFrame(animate);
        }

        window.addEventListener("resize", resize);
        window.addEventListener("pointermove", function (event) {
            pointer.x = event.clientX;
            pointer.y = event.clientY;
        });
        window.addEventListener("pointerleave", function () {
            pointer.x = -9999;
            pointer.y = -9999;
        });

        resize();
        animate();
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
