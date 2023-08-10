// Thank you to meddlenz for providing the scroll-fade library.
// Link to original repository: https://github.com/meddlenz/scroll-fade/
// License: MIT

// I modified the library to make it more compatible for my needs.
// My modifications include:
// - Replacing "var" with "let" and "const"
// - Exporting the "scrollFade" function
// - Improving the "scrollFade" function's logic to determine when to fade in/out
//   the element.
//       Instead of fading in/out when the element is scrolled into/out of view,
//       it fades out when the element is entirely scrolled out of view but it
//       fades in when a quarter of the element is scrolled into view.


// CSS classes:
// - scroll-fade: Activate the scroll fade effect.
// - scroll-fade--visible: The element is visible. If an element that has the
//   `scroll-fade` class doesn't have this class as well, it is assumed to be out
//   of view.

const fadeElements = document.getElementsByClassName('scroll-fade');

for (let index = 0; index < fadeElements.length; index++) {
    const element = fadeElements[index];
    element.classList.add('scroll-fade--visible');
}

// function scrollFade() {
//     for (let index = 0; index < fadeElements.length; index++) {
//         const element = fadeElements[index];
//         const rect = element.getBoundingClientRect();
//         const quarterHeight = rect.height / 4;
//         const topQuarter = rect.top + quarterHeight;
//         const bottomQuarter = rect.bottom - quarterHeight;

//         const wasVisible = element.classList.contains('scroll-fade--visible');

//         if (wasVisible) {
//             if (/* rect.bottom < 0 ||  */rect.top > window.innerHeight) {
//                 element.classList.remove('scroll-fade--visible');
//             }
//         } else {
//             if (bottomQuarter > 0 && topQuarter < window.innerHeight) {
//                 element.classList.add('scroll-fade--visible');
//             }
//         }
//     }
// }

// document.addEventListener('scroll', scrollFade);
// window.addEventListener('resize', scrollFade);
// document.addEventListener('DOMContentLoaded', function () {
//     scrollFade();
// });
