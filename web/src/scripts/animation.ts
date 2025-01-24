import { toast } from "wc-toast";

const $articles = document.querySelectorAll("article");

const $animateAll: HTMLInputElement = document.querySelector("#animate")!;
const $duration: HTMLSelectElement = document.querySelector("#duration")!;
const $steps: HTMLSelectElement = document.querySelector("#steps")!;
const $delay: HTMLSelectElement = document.querySelector("#delay")!;
const $optionInputs: HTMLElement = document.getElementById("option-inputs")!;

// functions to use as events handlers
// created to add and remove the events depending on the toggle
export function handleMouseEnter(this: HTMLElement) {
  const animationKey = this.getAttribute("data-class");
  const animationClass = `animate-${animationKey}`;
  const $box = this.querySelector("span");
  if ($box == null) return;
  $box.classList.add(animationClass);
}
export function handleMouseLeave(this: HTMLElement): void {
  const animationKey = this.getAttribute("data-class");
  const animationClass = `animate-${animationKey}`;
  const $box = this.querySelector("span");
  if ($box == null) return;
  $box.classList.remove(animationClass);
}

$animateAll.addEventListener("change", () => {
  $articles.forEach(($article) => {
    const animationKey = $article.getAttribute("data-class");
    const animationClass = `animate-${animationKey}`;
    const $box = $article.querySelector("span");

    if ($box == null) return;

    if ($animateAll.checked) {
      $article.removeEventListener("mouseenter", handleMouseEnter);
      $article.removeEventListener("mouseleave", handleMouseLeave);
      $box.classList.add(animationClass);
      $box.style.animationIterationCount = "infinite";
    } else {
      $article.addEventListener("mouseenter", handleMouseEnter);
      $article.addEventListener("mouseleave", handleMouseLeave);
      $box.classList.remove(animationClass);
      $box.style.animationIterationCount = "unset";
    }
  });
});

$duration.addEventListener("change", (event) => {
  const target = event.target as HTMLSelectElement;
  $articles.forEach(($article) => {
    const $box = $article.querySelector("span");
    if ($box == null) return;
    $box.style.animationDuration = target.value;
  });
});

$steps.addEventListener("change", (event) => {
  const target = event.target as HTMLSelectElement;
  $articles.forEach(($article) => {
    const $box = $article.querySelector("span");
    if ($box == null) return;
    $box.style.animationTimingFunction = `steps(${target.value})`;
  });
});

$delay.addEventListener("change", (event) => {
  const target = event.target as HTMLSelectElement;
  $articles.forEach(($article) => {
    const $box = $article.querySelector("span");
    if ($box == null) return;
    $box.style.animationDelay = target.value;
  });
});

$articles.forEach(($article) => {
  const animationKey = $article.getAttribute("data-class");
  const animationClass = `animate-${animationKey}`;

  $article.addEventListener("mouseenter", handleMouseEnter);
  $article.addEventListener("mouseleave", handleMouseLeave);

  $article.addEventListener("click", () => {
    navigator.clipboard.writeText(animationClass);
    toast("Copied to clipboard!", {
      theme: {
        type: "light",
      },
    });
  });
});

const $copyNpmInstall = document.getElementById(
  "copyNpmInstall",
) as HTMLButtonElement;

$copyNpmInstall.addEventListener("click", () => {
  const npmCommand = "npm install @Riozke/tailwind-animations";
  navigator.clipboard.writeText(npmCommand);
  toast("Copied to clipboard!", {
    theme: {
      type: "light",
    },
  });
});

window.addEventListener("scroll", () => {
  const isSticky = $optionInputs.getBoundingClientRect().top < 20;

  $optionInputs.classList.toggle("is-sticky", isSticky);
});
