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
        !weddingWebsite ||
        !weddingSong
    ) {
        return;
    }


    openButton.addEventListener("click", function () {

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


        weddingWebsite.classList.remove(
            "website-hidden"
        );

        weddingWebsite.classList.add(
            "website-visible"
        );


        coverScreen.classList.add(
            "cover-hidden"
        );


        document.body.style.overflowY = "auto";


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

    if (!canvas) return;


    const ctx =
        canvas.getContext("2d");


    let canvasWidth;
    let canvasHeight;

    let stars = [];

    let animationTime = 0;


    function resizeCanvas() {

        const devicePixelRatio =
            Math.min(window.devicePixelRatio || 1, 2);


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


    window.addEventListener(
        "resize",
        function () {

            resizeCanvas();
            createStars();

        }
    );


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
========================================================= */

(function () {

    const targetDate =
        new Date(
            "2026-09-02T09:30:00+05:30"
        ).getTime();


    const countdownIds = [
        "cdDays",
        "cdHours",
        "cdMins",
        "cdSecs"
    ];


    function updateCountdown() {

        const difference =
            targetDate -
            Date.now();


        if (difference <= 0) {

            countdownIds.forEach(
                function (id) {

                    const element =
                        document.getElementById(id);

                    if (element) {

                        element.textContent =
                            "00";

                    }

                }
            );

            return;

        }


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
                String(days)
                .padStart(2, "0");

        }


        if (hoursElement) {

            hoursElement.textContent =
                String(hours)
                .padStart(2, "0");

        }


        if (minutesElement) {

            minutesElement.textContent =
                String(minutes)
                .padStart(2, "0");

        }


        if (secondsElement) {

            secondsElement.textContent =
                String(seconds)
                .padStart(2, "0");

        }

    }


    updateCountdown();


    setInterval(
        updateCountdown,
        1000
    );

})();



/* =========================================================
   SEPTEMBER 2026 CALENDAR
========================================================= */

(function () {

    const calendarGrid =
        document.getElementById(
            "calGrid"
        );


    if (!calendarGrid) return;


    const days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];


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


    /*
     * September 1, 2026 is Tuesday.
     * Therefore two empty spaces are required:
     *
     * Sunday
     * Monday
     */

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


        /* Wedding – September 2 */

        if (date === 2) {

            dateElement.classList.add(
                "highlighted"
            );

            dateElement.title =
                "Wedding – 2 September";

        }


        /* Post-Wedding Reception – September 6 */

        if (date === 6) {

            dateElement.classList.add(
                "post-highlighted"
            );

            dateElement.title =
                "Post-Wedding Reception – 6 September";

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


    if (!coverScreen) return;


    document.body.style.overflow = "hidden";

})();
