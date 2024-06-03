document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  ScrollTrigger.normalizeScroll(true); 

  const treeFall = (tree, transformOrigin, delay) => {
    tl.to(tree, {
      keyframes: {
        "4%": { xPercent: -2, yPercent: 30, rotate: '30deg', transformOrigin :transformOrigin },
        "8%": { xPercent: -4, yPercent: 60, rotate: '60deg', transformOrigin: transformOrigin },
        "12%": { xPercent: -6, yPercent: 90, rotate: '90deg', transformOrigin: transformOrigin },
        "16%, 100%": { xPercent: -8, yPercent: 120, rotate: '120deg', transformOrigin: transformOrigin }
      },
      ease: 'none', // ease the entire keyframe block
      duration: 4
     }, delay)
  }
  
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".scene",
      pin: true,
      start: "top top",
      end: window.innerHeight*2, // end when height of scene
      scrub: 5,
      fastScrollEnd: 2000,
     // onComplete: () => tl2.play()
    },
  });
  
  
{
  tl
    .addLabel("intro")
    .add(
      [
        gsap.from(".forest__patch--right", { xPercent: 100, duration: 4 }),
        gsap.from(".forest__patch--left", { xPercent: -100, duration: 4 }),
      ],
      "forestPatches"
    )
    .to(".scene__headline", { opacity: 0, duration: 0.2 })
    
    .to(".deer", {
      keyframes: {
        "0%": { bottom: "12vw", opacity: 1 },
        "30%": { bottom: "8.5vw" },
        "55%": { bottom: "3.8vw" },
        "65%": { bottom: "6vw" },
        "75%": { bottom: "9vw" },
        "80%": { bottom: "11vw" },
        "100%": { left: "85%", bottom: "14vw", display: "none" },
      },
      duration: 20
    }, "deer")
    .to(".deer__legs--one", {
        keyframes: {
          "0%": { skewX:'-7.7deg', skewY:'-10deg' },
          "50%": { skewX: '7.7deg', skewY:'10deg' },
          "100%": { skewX:'-7.7deg', skewY:'-10deg' }
        },
        duration: 0.8, // Total duration of the animation
        repeat: 20/0.8
      }, "deer") // insert at the START of the  previous animation
      .to(".deer__legs--two", {
        keyframes: {
          "0%": { skewX:'7.7deg', skewY:'10deg' },
          "50%": { skewX: '-7.7deg', skewY:'-10deg' },
          "100%": { skewX:'7.7deg', skewY:'10deg' }
        },
        duration: 0.8, // Total duration of the animation
        repeat: 20/0.8
      }, "deer") 
      .from(".scene__paragraph--one", { top: '120%', duration: 15})
      .from(".bulldozer", {right: '100%', duration: 8})
      .add(treeFall('.forest__tree--one', '180% 0%', '<'))
      .add(treeFall('.forest__tree--two', '20% 25%', '<1'))
      .add(treeFall('.forest__tree--three', '20% 30%','<3'))
      .add(treeFall('.forest__tree--four', '20% 35%', '<4'))
      .add(treeFall('.forest__tree--five', '20% 40%', '<5'))
      .from(".scene__paragraph--two", { top: '120%', duration: 15}, "lastPar")
      // .to(".scene__one", { duration: 5, scale: 2, opacity: 0 })
    }

/*  // Initialize tl2 with its start synchronized to the end of tl
  let tl2 = gsap.timeline({
    paused: true, // Ensure tl2 starts paused
    scrollTrigger: {
      trigger: ".scene__two",
      pin: true,
      start: window.innerHeight, // 
      end: window.innerHeight*2, // End of tl2
      scrub: 5,
      markers: true, // For debugging, shows the scroll trigger start and end
      fastScrollEnd: 2000
    }
  }); */

  function buildingSmall() {
    return {
      "0%": { padding: "3% 1.2% 0", height: 0, backgroundColor: "#232c43" },
      "30%": { height: "2.5vw", backgroundColor: "#232c43" },
      "60%": { height: "10vw", backgroundColor: "#232c43" },
      "100%": { height: "15vw", backgroundColor: "#232c43" },
    };
  }
  
  function buildingMediumV1() {
    return {
      "0%": { padding: "3% 1.2% 0", height: 0, backgroundColor: "#232c43" },
      "10%": { height: 0, backgroundColor: "#232c43" },
      "40%": { height: "5vw", backgroundColor: "#232c43" },
      "70%": { height: "20vw", backgroundColor: "#232c43" },
      "100%": { height: "30vw", backgroundColor: "#232c43" },
    };
  }
  
  function buildingMediumV2() {
    return {
      "0%": { padding: "3% 1.2% 0", height: 0, backgroundColor: "#232c43" },
      "10%": { height: 0, backgroundColor: "#232c43" },
      "40%": { height: "10vw", backgroundColor: "#232c43" },
      "70%": { height: "25vw", backgroundColor: "#232c43" },
      "100%": { height: "38vw", backgroundColor: "#232c43" },
    };
  }
  
  function buildingMediumV3() {
    return {
      "0%": { padding: "3% 1.2% 0", height: 0, backgroundColor: "#232c43" },
      "10%": { height: 0, backgroundColor: "#232c43" },
      "40%": { height: "10vw", backgroundColor: "#232c43" },
      "70%": { height: "25vw", backgroundColor: "#232c43" },
      "100%": { height: "40vw", backgroundColor: "#232c43" },
    };
  }
  
  function buildingTall() {
    return {
      "0%": { padding: "3% 1.2% 0", height: 0, backgroundColor: "#232c43" },
      "15%": { height: 0, backgroundColor: "#232c43" },
      "45%": { height: "12.5vw", backgroundColor: "#232c43" },
      "75%": { height: "30vw", backgroundColor: "#232c43" },
      "100%": { height: "45vw", backgroundColor: "#232c43" },
    };
  }
  
      tl
      .to('.scene__two', {opacity: 1})
      .to(".city__floor", {keyframes: {
        "0%": {opacity: '1'},
        "24%": {height: '0'},
        "25%": {height: '2.5vw'},
        "50%, 74%": {height: '5vw'},
        "75%, 99%": {height: '7.5vw'},
        "100%": {height: '10vw'}
      }, duration: 2})
      .to(".city__road", {
        keyframes: {
          "0%": {
            opacity: 1
          },
          "50%": {
            boxShadow: "0 0 0 0 #444c5e, 0 0 0 0 rgba(0, 0, 0, 0.05)",
            width: "100%",
            borderRight: "0vw solid transparent"
          },
          "100%": {
            opacity: 1,
            width: "100%",
            borderRight: "0vw solid transparent",
            boxShadow: "0 0.3vw 1px 3px #3a4150, 0 -5vw 10vw 5vw rgba(0, 0, 0, 0.1)"
          }
        },
        duration: 2
      })
      .to(".city__building--one", { keyframes: buildingMediumV2(), duration: 10 }, "buildings")
      .to(".city__building--two", { keyframes: buildingTall(), duration: 10 }, "buildings")
      .to(".city__building--three", { keyframes: buildingMediumV1(), duration: 10 }, "buildings")
      .to(".city__building--four", { keyframes: buildingMediumV2(), duration: 10 }, "buildings")
      .to(".city__building--five", { keyframes: buildingSmall(), duration: 10 }, "buildings")
      .to(".city__building--six", { keyframes: buildingMediumV1(), duration: 10 }, "buildings")
      .to(".city__building--seven", { keyframes: buildingMediumV3(), duration: 10 }, "buildings")
      .to(".city__building--eight", { keyframes: buildingMediumV2(), duration: 10 }, "buildings")
      .to(".city__building--nine", { keyframes: buildingTall(), duration: 10 }, "buildings")
      .to(".city__window", {opacity: 1, duration: 2})
      .from(".scene__paragraph--three", { top: '120%', duration: 15})
      .to(".city__window", {backgroundColor: '#565964', duration: 2}, "phaseTwo")
      .to(".scene__two--background", {backgroundColor: '#6e717c', duration: 2}, "phaseTwo")
      .to(".city__water", {
        keyframes: {
          "0%": { rotation: -10, height: "0" },
          "20%": { rotation: 10 },
          "40%": { rotation: -10 },
          "60%": { rotation: 10 },
          "80%": { rotation: -10 },
          "100%": { rotation: 0, height: "38vw" }
        },
        duration: 5 // Adjust the duration as needed
      })
      .from(".scene__paragraph--four", { top: '120%', duration: 15}, '>')

      tl
      .to('.scene__three', {opacity: 1})
      .from('.planes__patch--four', { yPercent: 100, duration: 4 })
      .from('.planes__patch--three', { yPercent: 100, duration: 4 })
      .from('.planes__patch--two', { yPercent: 100, duration: 4 })
      .from('.planes__patch--one', { yPercent: 100, duration: 4 })



      /*
  const deer = document.querySelector('.deer');
  const parOne = document.querySelector('.scene__paragraph--one')
  const forestPatch = document.querySelector('.forest__shake')
  const forestTrees = document.querySelectorAll('.forest__tree')
  const bulldozer = document.querySelector('.bulldozer');
  const forestTree = document.querySelector('.forest__tree--one');

  const viewportObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (parOne.isIntersecting) {
        forestPatch.classList.toggle('forest__shake--active');
        forestTrees.forEach((tree) => tree.classList.toggle('forest__tree--shake'));
      }

    });
  });

  viewportObserver.observe(deer);
  viewportObserver.observe(parOne);
  viewportObserver.observe(bulldozer);
  viewportObserver.observe(forestTree); */


});