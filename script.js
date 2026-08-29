/* =========================================================
   OPEN INVITATION + MUSIC
========================================================= */

(function () {

    const coverScreen =
        document.getElementById("coverScreen");

    const openButton =
        document.getElementById("openInvitation");

    const weddingWebsite =
        document.getElementById("weddingWebsite");

    const weddingSong =
        document.getElementById("weddingSong");


    if (
        !coverScreen ||
        !openButton ||
        !weddingWebsite
    ) {
        return;
    }


    openButton.addEventListener("click", function () {

        /* =====================================================
           START WEDDING MUSIC
        ===================================================== */

        if (weddingSong) {

            weddingSong.volume = 0.35;
            weddingSong.loop = true;

            const playPromise =
                weddingSong.play();

            if (playPromise !== undefined) {

                playPromise
                    .then(function () {

                        console.log(
                            "Wedding music started successfully."
                        );

                    })
                    .catch(function (error) {

                        console.warn(
                            "Music could not start:",
                            error
                        );

                    });

            }

        }


        /* =====================================================
           SHOW WEBSITE
        ===================================================== */

        weddingWebsite.classList.remove(
            "website-hidden"
        );

        weddingWebsite.classList.add(
            "website-visible"
        );


        /* =====================================================
           HIDE COVER SCREEN
        ===================================================== */

        coverScreen.classList.add(
            "cover-hidden"
        );


        /* =====================================================
           ENABLE PAGE SCROLLING
        ===================================================== */

        document.body.style.overflowY = "auto";
        document.body.style.overflowX = "hidden";


        /* =====================================================
           COMPLETELY REMOVE COVER AFTER ANIMATION
        ===================================================== */

        setTimeout(function () {

            coverScreen.style.display = "none";

        }, 1000);

    });

})();



/* =========================================================
   STARFIELD ANIMATION
========================================================= */

(function () {

    const canvas =
        document.getElementById("starfield");


    if (!canvas) {
        return;
    }


    const ctx =
        canvas.getContext("2d");


    let canvasWidth = 0;
    let canvasHeight = 0;

    let stars = [];

    let animationTime = 0;


    /* =====================================================
       RESIZE CANVAS
    ===================================================== */

    function resizeCanvas() {

        const devicePixelRatio =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        canvasWidth =
            window.innerWidth;

        canvasHeight =
            window.innerHeight;


        canvas.width =
            canvasWidth * devicePixelRatio;

        canvas.height =
            canvasHeight * devicePixelRatio;


        canvas.style.width =
            canvasWidth + "px";

        canvas.style.height =
            canvasHeight + "px";


        ctx.setTransform(
            devicePixelRatio,
            0,
            0,
            devicePixelRatio,
            0,
            0
        );

    }


    /* =====================================================
       CREATE STARS
    ===================================================== */

    function createStars() {

        stars = [];


        const starCount =
            Math.floor(
                (canvasWidth * canvasHeight) / 3500
            );


        for (
            let i = 0;
            i < starCount;
            i++
        ) {

            stars.push({

                x:
                    Math.random() *
                    canvasWidth,

                y:
                    Math.random() *
                    canvasHeight,

                radius:
                    Math.random() * 1.6 + 0.2,

                speed:
                    Math.random() * 0.005 + 0.002,

                phase:
                    Math.random() *
                    Math.PI *
                    2

            });

        }

    }


    /* =====================================================
       DRAW STARS
    ===================================================== */

    function drawStars() {

        ctx.clearRect(
            0,
            0,
            canvasWidth,
            canvasHeight
        );


        animationTime += 0.016;


        stars.forEach(function (star) {

            const opacity =
                0.3 +
                0.7 *
                (
                    0.5 +
                    0.5 *
                    Math.sin(
                        animationTime *
                        star.speed *
                        60 +
                        star.phase
                    )
                );


            ctx.beginPath();


            ctx.arc(
                star.x,
                star.y,
                star.radius,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(255,255,255,${opacity})`;


            ctx.fill();

        });


        requestAnimationFrame(
            drawStars
        );

    }


    /* =====================================================
       WINDOW RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            resizeCanvas();

            createStars();

        }
    );


    /* =====================================================
       START STARFIELD
    ===================================================== */

    resizeCanvas();

    createStars();

    drawStars();

})();



/* =========================================================
   FADE-IN ANIMATION
========================================================= */

(function () {

    const fadeElements =
        document.querySelectorAll(
            ".fade-in"
        );


    if (!fadeElements.length) {
        return;
    }


    /* =====================================================
       FALLBACK FOR OLD BROWSERS
    ===================================================== */

    if (
        !("IntersectionObserver" in window)
    ) {

        fadeElements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;

    }


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    const observer =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.12
            }

        );


    fadeElements.forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );

})();



/* =========================================================
   COUNTDOWN TIMER
   POST-WEDDING RECEPTION
   06 SEPTEMBER 2026 - 12:30 PM
========================================================= */

(function () {

    /*
     * Reception date:
     *
     * Sunday
     * 06 September 2026
     * 12:30 PM
     *
     * +05:30 = Indian Standard Time
     */

    const targetDate =
        new Date(
            "2026-09-06T12:30:00+05:30"
        ).getTime();


    const countdownIds = [
        "cdDays",
        "cdHours",
        "cdMins",
        "cdSecs"
    ];


    /* =====================================================
       UPDATE COUNTDOWN
    ===================================================== */

    function updateCountdown() {

        const difference =
            targetDate -
            Date.now();


        /* =================================================
           EVENT HAS STARTED
        ================================================= */

        if (difference <= 0) {

            const daysElement =
                document.getElementById(
                    "cdDays"
                );

            const hoursElement =
                document.getElementById(
                    "cdHours"
                );

            const minutesElement =
                document.getElementById(
                    "cdMins"
                );

            const secondsElement =
                document.getElementById(
                    "cdSecs"
                );


            if (daysElement) {

                daysElement.textContent =
                    "00";

            }


            if (hoursElement) {

                hoursElement.textContent =
                    "00";

            }


            if (minutesElement) {

                minutesElement.textContent =
                    "00";

            }


            if (secondsElement) {

                secondsElement.textContent =
                    "00";

            }


            return;

        }


        /* =================================================
           CALCULATE TIME
        ================================================= */

        const days =
            Math.floor(
                difference / 86400000
            );


        const hours =
            Math.floor(
                (difference % 86400000) /
                3600000
            );


        const minutes =
            Math.floor(
                (difference % 3600000) /
                60000
            );


        const seconds =
            Math.floor(
                (difference % 60000) /
                1000
            );


        /* =================================================
           GET HTML ELEMENTS
        ================================================= */

        const daysElement =
            document.getElementById(
                "cdDays"
            );


        const hoursElement =
            document.getElementById(
                "cdHours"
            );


        const minutesElement =
            document.getElementById(
                "cdMins"
            );


        const secondsElement =
            document.getElementById(
                "cdSecs"
            );


        /* =================================================
           DISPLAY DAYS
        ================================================= */

        if (daysElement) {

            daysElement.textContent =
                String(days)
                .padStart(2, "0");

        }


        /* =================================================
           DISPLAY HOURS
        ================================================= */

        if (hoursElement) {

            hoursElement.textContent =
                String(hours)
                .padStart(2, "0");

        }


        /* =================================================
           DISPLAY MINUTES
        ================================================= */

        if (minutesElement) {

            minutesElement.textContent =
                String(minutes)
                .padStart(2, "0");

        }


        /* =================================================
           DISPLAY SECONDS
        ================================================= */

        if (secondsElement) {

            secondsElement.textContent =
                String(seconds)
                .padStart(2, "0");

        }

    }


    /* =====================================================
       RUN IMMEDIATELY
    ===================================================== */

    updateCountdown();


    /* =====================================================
       UPDATE EVERY SECOND
    ===================================================== */

    setInterval(
        updateCountdown,
        1000
    );

})();



/* =========================================================
   SEPTEMBER 2026 CALENDAR
   RECEPTION HIGHLIGHT = 6TH
========================================================= */

(function () {

    const calendarGrid =
        document.getElementById(
            "calGrid"
        );


    if (!calendarGrid) {
        return;
    }


    /*
     * September 2026:
     *
     * Tuesday = 1
     * Wednesday = 2
     * Thursday = 3
     * Friday = 4
     * Saturday = 5
     * Sunday = 6
     */


    const days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];


    /* =====================================================
       ADD DAY HEADERS
    ===================================================== */

    days.forEach(
        function (day) {

            const dayElement =
                document.createElement(
                    "div"
                );


            dayElement.className =
                "cal-day-name";


            dayElement.textContent =
                day;


            calendarGrid.appendChild(
                dayElement
            );

        }
    );


    /* =====================================================
       EMPTY DAYS
       SEPTEMBER 1, 2026 IS TUESDAY
    ===================================================== */

    for (
        let i = 0;
        i < 2;
        i++
    ) {

        const emptyDay =
            document.createElement(
                "div"
            );


        emptyDay.className =
            "cal-day empty";


        calendarGrid.appendChild(
            emptyDay
        );

    }


    /* =====================================================
       CREATE SEPTEMBER 2026 DAYS
    ===================================================== */

    for (
        let date = 1;
        date <= 30;
        date++
    ) {

        const dateElement =
            document.createElement(
                "div"
            );


        dateElement.className =
            "cal-day";


        dateElement.textContent =
            date;


        /* =================================================
           HIGHLIGHT RECEPTION DAY
           SEPTEMBER 6
        ================================================= */

        if (date === 6) {

            dateElement.classList.add(
                "highlighted"
            );


            dateElement.classList.add(
                "reception-highlight"
            );


            /*
             * Add small reception label
             */

            const label =
                document.createElement(
                    "small"
                );


            label.textContent =
                "Reception";


            dateElement.appendChild(
                label
            );

        }


        calendarGrid.appendChild(
            dateElement
        );

    }

})();



/* =========================================================
   PREVENT SCROLLING WHILE COVER IS DISPLAYED
========================================================= */

(function () {

    const coverScreen =
        document.getElementById(
            "coverScreen"
        );


    if (!coverScreen) {
        return;
    }


    /*
     * Prevent scrolling while
     * opening invitation screen is visible.
     */

    document.body.style.overflow =
        "hidden";


    document.body.style.overflowX =
        "hidden";

})();



/* =========================================================
   SMOOTH SCROLL
========================================================= */

(function () {

    /*
     * Enable smooth scrolling
     * for internal links.
     */

    document.documentElement.style.scrollBehavior =
        "smooth";

})();



/* =========================================================
   PHONE CONTACT LINKS
========================================================= */

(function () {

    /*
     * This section does not require
     * any extra HTML.
     *
     * Phone numbers using tel:
     * automatically open the phone
     * dialer on mobile devices.
     */

    const phoneLinks =
        document.querySelectorAll(
            'a[href^="tel:"]'
        );


    phoneLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    console.log(
                        "Opening phone dialer..."
                    );

                }
            );

        }
    );

})();



/* =========================================================
   GOOGLE MAPS EXTERNAL LINK
========================================================= */

(function () {

    const mapLinks =
        document.querySelectorAll(
            'a[href*="google.com/maps"]'
        );


    mapLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    console.log(
                        "Opening Google Maps..."
                    );

                }
            );

        }
    );

})();
