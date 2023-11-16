function loco(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".container-main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".container-main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".container-main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".container-main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

loco()

gsap.to(".container-nav", {
    backgroundColor: "rgba(0, 0, 0, 0.326)",
    durations: 0.5,
    height: "120px",
    scrollTrigger: {
        trigger: ".container-nav",
        scroller: "body",
        start: "top -15%",
        end: "top -15%",
        scrub: 1,
    }
})

gsap.to(".container-main", {
    backgroundColor: "rgba(0, 0, 0, 0.526)",
    duration: 0.5,
    scrollTrigger: {
        Trigger: ".container-main",
        scroller: "body",
        starts: "top -10%",
        ends: "top -11%",
        scrub: 1,
    }
})

document.addEventListener("DOMContentLoaded", function () {
    // Add smooth scrolling behavior to the navigation links
    document.querySelectorAll('.container-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
