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

        canvasWidth =
            canvas.width =
            window.innerWidth;

        canvasHeight =
            canvas.height =
            window.innerHeight;

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
                    Math.random() *
                    1.6 +
                    0.2,

                speed:
                    Math.random() *
                    0.005 +
                    0.002,

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


        stars.forEach(
            function (star) {

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
                    `rgba(
                        255,
                        255,
                        255,
                        ${opacity}
                    )`;


                ctx.fill();

            }
        );


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
   COVER + MUSIC
   ========================================================= */

(function () {

    const cover =
        document.getElementById(
            "weddingCover"
        );


    const weddingSong =
        document.getElementById(
            "weddingSong"
        );


    if (!cover) return;


    /*
       Configure music
    */

    if (weddingSong) {

        weddingSong.loop = true;

        weddingSong.volume = 0.35;

        weddingSong.preload = "auto";

    }


    /*
       Function to start music
    */

    function startMusic() {

        if (!weddingSong) return;


        weddingSong
            .play()
            .then(function () {

                console.log(
                    "Wedding music started."
                );

            })
            .catch(function (error) {

                console.log(
                    "Music autoplay was blocked:",
                    error
                );

            });

    }


    /*
       Open the wedding invitation
    */

    function openWedding() {

        /*
           Add class to show main website
        */

        document.body.classList.add(
            "website-open"
        );


        /*
           Start music immediately after
           visitor interaction.
        */

        startMusic();


        /*
           Hide cover
        */

        setTimeout(
            function () {

                cover.classList.add(
                    "hide-cover"
                );

            },
            100
        );


        /*
           Remove cover completely after
           animation.
        */

        setTimeout(
            function () {

                cover.style.display =
                    "none";

            },
            1400
        );

    }


    /*
       Visitor taps/clicks anywhere on
       the cover.
    */

    cover.addEventListener(
        "click",
        openWedding
    );


    cover.addEventListener(
        "touchstart",
        function () {

            openWedding();

        },
        {
            passive: true
        }
    );


    /*
       Try autoplay immediately.
       Browser may allow it or may block it.
    */

    window.addEventListener(
        "load",
        function () {

            startMusic();

        }
    );


    /*
       Try again when page becomes visible.
    */

    document.addEventListener(
        "visibilitychange",
        function () {

            if (
                document.visibilityState ===
                "visible"
            ) {

                startMusic();

            }

        }
    );


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
        !(
            "IntersectionObserver"
            in window
        )
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

            observer.observe(element);

        }
    );

})();



/* =========================================================
   COUNTDOWN
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
                difference /
                86400000
            );


        const hours =
            Math.floor(
                (
                    difference %
                    86400000
                ) /
                3600000
            );


        const minutes =
            Math.floor(
                (
                    difference %
                    3600000
                ) /
                60000
            );


        const seconds =
            Math.floor(
                (
                    difference %
                    60000
                ) /
                1000
            );


        document.getElementById(
            "cdDays"
        ).textContent =
            String(days)
                .padStart(2, "0");


        document.getElementById(
            "cdHours"
        ).textContent =
            String(hours)
                .padStart(2, "0");


        document.getElementById(
            "cdMins"
        ).textContent =
            String(minutes)
                .padStart(2, "0");


        document.getElementById(
            "cdSecs"
        ).textContent =
            String(seconds)
                .padStart(2, "0");

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


    const weekdays = [

        "Sun",

        "Mon",

        "Tue",

        "Wed",

        "Thu",

        "Fri",

        "Sat"

    ];


    weekdays.forEach(
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
       September 2026 starts on Tuesday.

       Sunday = empty
       Monday = empty
       Tuesday = September 1
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


        if (date === 2) {

            dateElement.classList.add(
                "highlighted"
            );

        }


        calendarGrid.appendChild(
            dateElement
        );

    }

})();
