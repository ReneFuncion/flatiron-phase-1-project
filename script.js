// document.addEventListener('DOMContentLoaded', () => {
//     console.log('JavaScript loaded');
//     const element = document.getElementById("myElement");
//     let position = 0;
//     setInterval(function () {
//         position += 3;
//         element.style.left = position + "px";
//     }, 5);
// });
//-----------------
// document.addEventListener('DOMContentLoaded', () => {
//     console.log('JavaScript loaded');
//     const element = document.getElementById("myElement");
//     let position = 0;
//     const interval = setInterval(function () {
//         position += 1;
//         element.style.left = position + "px";
//         if (position >= window.innerWidth - element.offsetWidth) {
//             clearInterval(interval);
//         }
//     }, 10);
// });
// document.addEventListener('DOMContentLoaded', () => {
//     console.log('JavaScript loaded');
//     const element = document.getElementById("myElement");
//     let position = window.innerWidth - element.offsetWidth;
//     const interval = setInterval(function () {
//         position -= 1;
//         element.style.left = position + "px";
//         if (position <= 0) {
//             clearInterval(interval);
//         }
//     }, 5);
// });
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded');
    const element = document.getElementById("myElement");

    element.style.top = "50px";
    element.style.right = "50px";

});

