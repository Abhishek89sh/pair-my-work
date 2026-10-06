const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    navbar.classList.toggle(
        "scrolled",
        window.scrollY > 10
    );

});


/*
  Mobile navigation
*/

const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.getElementById("navLinks");


function closeMenu() {

    navLinks.classList.remove("mobile-open");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.textContent = "☰";

    document.body.classList.remove("menu-open");

}


function toggleMenu() {

    const isOpen =
        navLinks.classList.toggle("mobile-open");

    menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuButton.textContent =
        isOpen ? "×" : "☰";

    document.body.classList.toggle(
        "menu-open",
        isOpen
    );

}


menuButton.addEventListener(
    "click",
    toggleMenu
);


/*
  Close menu after clicking a navigation link
*/

navLinks
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


/*
  Critical responsive fix:
  If the browser changes from mobile to desktop,
  automatically remove the mobile state.
*/

const desktopQuery =
    window.matchMedia("(min-width: 851px)");

desktopQuery.addEventListener(
    "change",
    event => {

        if (event.matches) {
            closeMenu();
        }

    }
);


/*
  FAQ accordion
*/

document
    .querySelectorAll(".faq-question")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const item =
                    button.closest(".faq-item");

                const answer =
                    item.querySelector(".faq-answer");

                const currentlyOpen =
                    item.classList.contains("active");


                document
                    .querySelectorAll(".faq-item.active")
                    .forEach(openItem => {

                        if (openItem !== item) {

                            openItem.classList.remove("active");

                            openItem
                                .querySelector(".faq-answer")
                                .style.maxHeight = null;

                        }

                    });


                if (currentlyOpen) {

                    item.classList.remove("active");

                    answer.style.maxHeight = null;

                } else {

                    item.classList.add("active");

                    answer.style.maxHeight =
                        answer.scrollHeight + "px";

                }

            }
        );

    });


/*
  Authentication UI

  Replace this with your actual auth state.

  Example:

  const isLoggedIn = Boolean(
    localStorage.getItem("token")
  );

  For now it is false.
*/

const isLoggedIn = false;

const getStartedButton =
    document.querySelector(".get-started");

const openAppButton =
    document.querySelector(".open-app");


if (isLoggedIn) {

    getStartedButton.style.display = "none";
    openAppButton.style.display = "inline-flex";

} else {

    getStartedButton.style.display = "inline-flex";
    openAppButton.style.display = "none";

}


/*
  Extra safety:
  Never allow the mobile navigation class
  to stay active on desktop.
*/

function resetDesktopMenu() {

    if (window.innerWidth >= 851) {
        closeMenu();
    }

}

window.addEventListener(
    "resize",
    resetDesktopMenu
);