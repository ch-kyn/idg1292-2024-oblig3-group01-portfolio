const scene = document.querySelector(".scene");
const secondScene = document.querySelector(".scene__second");
const sceneThreeContainer = document.querySelector(".scene__container");

const deer = document.querySelector(".forest__deer");
const bulldozer = document.querySelector(".bulldozer__svg");
const buildings = document.querySelectorAll(".scene__building");
const building = document.querySelector(".scene__building");
const clouds = document.querySelector(".scene__clouds");
const water = document.querySelector(".scene__water");
const allWindows = document.querySelectorAll(".scene__window");

// obtain an array of the elements matching the class to make it more orderly
const [parOne, parTwo, parThree, parFour] = Array.from(
  document.querySelectorAll(".scene__paragraph")
);

let [
  forestPatchPosition,
  parOnePosition,
  parTwoPosition,
  parThreePosition,
  parFourPosition,
] = [0, 0, 0, 0, 0];

// initialize booleans that manage if a scene has happened or not
let [firstPhaseThree, secondSceneInitiation, secondPhaseTwo] = [
  false,
  false,
  false,
];

scene.removeChild(secondScene); // remove secondScene from the beginning

// 'some()' method to check if any animation matches the condition
// use getAnimations() of Web Animation API to check if animation is running

function isAnyAnimationRunning() {
  const animationCheck = [deer, bulldozer, building, clouds, water]; // array of 'transition' animations between scenes/paragraphs

  const animationRunning = (animation) =>
    animation
      .getAnimations()
      .some((animation) => animation.playState === "running");

  return Array.from(animationCheck).some((animation) =>
    animationRunning(animation)
  );
}

// calculate bottom position of an element relative to the viewport
function paragraphBottom(par) {
  return par.getBoundingClientRect().top + par.getBoundingClientRect().height;
}

// appends the drawing of the second scene, not affecting any text so it can be read by screenreaders regardless
// actions of function call is different depending on the boolean value of secondSceneInitiation managed in the observer
function initiateSecondSceneCSS() {
  if (secondSceneInitiation) {
    scene.append(secondScene);
    buildings.forEach((building) => building.classList.toggle(building.id));
  } else if (scene.contains(secondScene)) {
    scene.removeChild(secondScene);
    buildings.forEach((building) => building.classList.toggle(building.id));
  }
}

// activation of parOne after deer has finished walking
function sceneOnePartTwo(event) {
  const headline = document.querySelector(".scene__headline");
  parOnePosition = Math.max(-(420 / 2), Math.min(parOnePosition, 40 / 2)); // set min and max value for parOne to not scroll more than it needs to

  // add class if the following paragraph doesn't containt it + deer has finished walking
  !parOne.classList.contains(parOne.id) && !isAnyAnimationRunning()
    ? parOne.classList.add(parOne.id)
    : null;

  // make parOne scrollable only when animations aren't running
  // to prevent increasing scroll position to hinder the custom scroll from messing up
  if (parOne.classList.contains(parOne.id)) {
    !bulldozer.classList.contains("bulldozer__svg--active") &&
    !isAnyAnimationRunning()
      ? event.deltaY > 0
        ? parOnePosition++
        : parOnePosition--
      : null;
  }

  // set opacity to 0 when top of parOne and headline align
  headline.style.setProperty("--paragraph-opacity", [
    headline.getBoundingClientRect().top >= parOne.getBoundingClientRect().top
      ? 1
      : 0,
  ]);

  // set custom CSS variable that makes the paragraphs scroll by connecting it to 'deltaY' property
  // of the 'wheel' event (read-only vertical scroll amount), and setting it to 2% each scroll
  parOne.style.setProperty("--paragraph-pos", `${parOnePosition * 2}%`);
  parTwo.style.setProperty("--paragraph-pos", `${parTwoPosition * 2}%`);
  parThree.style.setProperty("--paragraph-pos", `${parThreePosition * 2}%`);
  parFour.style.setProperty("--paragraph-pos", `${parFourPosition * 2}%`);

  // const isAnyAnimationRunning() = Array.from(animationCheck).some(animation => isAnyAnimationRunning()(animation));

  if (isAnyAnimationRunning()) {
    console.log("At least one animation is running");
  } else {
    console.log("No animations are running");
  }
}

function sceneOnePartThree(event) {
  if (!parTwo.classList.contains(parTwo.id)) {
    parTwo.classList.add(parTwo.id);
  } else if (!isAnyAnimationRunning()) {
    event.deltaY > 0 ? parTwoPosition++ : parTwoPosition--; // prevent scrolling during certain animations
  }

  // remove class that actives scroll for parTwo if parOne is in view
  if (paragraphBottom(parOne) > 0) {
    parTwo.classList.remove(parTwo.id);
    firstPhaseThree = false;
  }
}

function sceneTwoPartOne(event) {
  if (secondSceneInitiation && !isAnyAnimationRunning()) {
    parThree.classList.add(parThree.id)
    if (!isAnyAnimationRunning()) {
      event.deltaY > 0 ? parThreePosition++ : parThreePosition--;
    }
  }

  if (paragraphBottom(parTwo) > 0) {
    parThree.classList.remove(parThree.id); // remove the 'scroll' of parThree when scrolling back to scene one
  }
}

function sceneTwoPartTwo(event) {
  const allWindows = document.querySelectorAll(".scene__window");

  //manages boolean 'sceneTwoPartTwo' depending on parThree value
  secondPhaseTwo = paragraphBottom(parThree) < 0 ? true : false;

  if (secondPhaseTwo) {
    secondScene.classList.add("scene__second--active");
    clouds.classList.add("scene__clouds--active");
    water.classList.add("scene__water--active");
    allWindows.forEach((window) =>
      window.classList.add("scene__window--active")
    );
  } else {
    secondScene.classList.remove("scene__second--active");
    clouds.classList.remove("scene__clouds--active");
    water.classList.remove("scene__water--active");
    allWindows.forEach((window) =>
      window.classList.remove("scene__window--active")
    );
  }

    //gives BEM name to paragraph 4
    if (secondPhaseTwo && !isAnyAnimationRunning()) {
      parFour.classList.add(parFour.id)
      if (!isAnyAnimationRunning()) {
        event.deltaY > 0 ? parFourPosition++ : parFourPosition--;
      }
    }
  
    if (paragraphBottom(parThree) > 0) {
      parFour.classList.remove(parFour.id); // remove the 'scroll' of parThree when scrolling back to scene one
    }
}

//function for managing scene two part three and scene three
function sceneThreePartOne(par) {
  const seed = document.querySelector(".planes__seed");
  const seedPath = seed.querySelector(".planes__path");
  const sThreeP_two = document.querySelector(".scene__third--second");
  const sThreeP_three = document.querySelector(".scene__third--third");

  const plantChbx = document.querySelector(".planes__checkbox");
  // eventListener for checkbox. adding modifiers the seed to sappling animation when checked
  plantChbx.addEventListener("change", () => {
    if (plantChbx.checked) {
      seed.classList.add("planes__seed--active");
      seedPath.classList.add("planes__path--active");
      sThreeP_two.classList.add("scene__third--active");
      sThreeP_three.classList.add("scene__third--enabled");
    }
  });

  //setting boolean pTop(paragraph top) to be true only when paragraph top+height is less than 0
  const pTop = paragraphBottom(parFour) < 0;
  const list = secondScene.classList.contains("scene__second--disabled"); // a boolean: true when secondScene contains modifier 'disabled'

  //if pTtop = true and list = false it will add modifier to 'secondScene' + 'sceneThreeContainer' and remove modifier from patches + sceneOne
  // Adding modifiers when pTop is true and list is false
  if (pTop && !list) {
    secondScene.classList.add("scene__second--disabled");
    sceneThreeContainer.classList.add("scene__container--active");
  }

  // Removing modifiers when pTop is false and list is true
  if (!pTop && list) {
    secondScene.classList.remove("scene__second--disabled");
    sceneThreeContainer.classList.remove("scene__container--active");
    plantChbx.checked = false;
  }

  //removes modifers when checkbox is unchecked
  !plantChbx.checked
    ? seed.classList.remove("planes__seed--active") +
      seedPath.classList.remove("planes__path--active") +
      sThreeP_two.classList.remove("scene__third--active") +
      sThreeP_three.classList.remove("scene__third--enabled")
    : null;
}

// throttle using 'setTimeout()' to limit the rate of event calls
// from this article: https://dev.to/jeetvora331/throttling-in-javascript-easiest-explanation-1081
function throttle(mainFunction, delay) {
  let timerFlag = null; // variable to keep track of the timer

  // return a throttled version if no timer is currently running then execute main function
  return (...args) => {
    if (timerFlag === null) {
      mainFunction(...args);
      timerFlag = setTimeout(() => {
        // set a timer to clear the 'timerFlag' after the specified delay
        timerFlag = null; // clear the timerFlag to allow the main function to be executed again
      }, delay);
    }
  };
}

const handleWheelEvent = (event) => {
  const patches = document.querySelectorAll(".forest__patch");
  const leftPatch = document.querySelector(".forest__patch--left");

  // increase/decrease value of 'forestPatchPosition' depending on 'wheel' scroll, and make sure it cannot go past certain points
  leftPatch.getBoundingClientRect().left < 0
    ? event.deltaY > 0
      ? forestPatchPosition++
      : forestPatchPosition--
    : sceneOnePartTwo(event);
  // if 'forestPatchPosition' is greater than 0, set it to 0 to make sure the patches finish at left: 0; store it in 'patchPosition' variable
  const patchPosition = (forestPatchPosition =
    forestPatchPosition > 0 ? 0 : forestPatchPosition);

  // sends variable to .scss file for movable patches so it's managed there
  patches.forEach((patch) =>
    patch.style.setProperty("--patch-pos", `${patchPosition}%`)
  );

  if (patchPosition === -50) {
    deer.classList.add("forest__deer--active"); // add class w/animation to deer when 'patchPosition' reaches -50%
  }

  // managing scrolling so it cannot be done when 3rd scene is initiated; avoid having text keep going up
  scrollable = paragraphBottom(parFour) < 0 && event.deltaY < 0 ? false : true;

  // Calls functions when booleans are either true or false. Bool state and effect is managed in functions
  if (scrollable) {
    firstPhaseThree ? sceneOnePartThree(event) : null; // starts third phase of scene one (bulldozer)
    secondSceneInitiation ? sceneTwoPartOne(event) : sceneTwoPartOne(event);
    secondPhaseTwo ? sceneTwoPartTwo(event) : sceneTwoPartTwo(event);
  }
};

document.addEventListener("wheel", throttle(handleWheelEvent, 20)); // add wheel event with the throttled version

const observer = new IntersectionObserver(
  (entries) => {
    const trees = document.querySelectorAll(".forest__tree");
    const patchOne = document.querySelector(".forest__patch--one");

    // make sure it seperate the entries
    entries.forEach((entry) => {
      if (entry.target === parOne && !entry.target.isIntersecting) {
        if (paragraphBottom(entry.target) < 0) {
          patchOne.classList.add("forest__shake--active");
          bulldozer.classList.add("bulldozer__svg--active");
          trees.forEach((tree) =>
            tree.classList.add(tree.getAttribute("data-tree"))
          );
        } else {
          trees.forEach((tree) => {
            if (
              tree.getAttribute("data-tree") &&
              tree.classList.contains(tree.getAttribute("data-tree"))
            ) {
              tree.classList.remove(tree.getAttribute("data-tree"));
            }
          });
        }
      }

      // remove class on bulldozer and front patch when bulldozer is out of view
      if (entry.target === bulldozer && !entry.target.isIntersecting) {
        bulldozer.classList.remove("bulldozer__svg--active");
        patchOne.classList.remove("forest__shake--active");
        firstPhaseThree = true;
      }

      if (entry.target === parTwo) {
        if (paragraphBottom(parTwo) < 0) {
          secondSceneInitiation = true;
          initiateSecondSceneCSS();
        } else {
          secondSceneInitiation = false;
          initiateSecondSceneCSS();
        }
      }

      parFour.isIntersecting
        ? sceneThreePartOne(parFour)
        : sceneThreePartOne(parFour);
    });
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  }
);

observer.observe(parOne);
observer.observe(parTwo);
observer.observe(parThree);
observer.observe(parFour);
observer.observe(bulldozer);
