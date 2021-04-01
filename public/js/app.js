
console.log('Client side javascript file is loaded!')

const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// const weatherForm = ()=>{
//     const location = search.value
//     messageOne.textContent = 'Loading ...'
//     fetch('http://localhost:3000/weather?address=' + location).then((response) => {
//         response.json().then((data) => {
//             if (data.error) {
//                 messageOne.textContent = data.error;
//             } else {
//                 messageOne.textContent = data.place_name;
//                 messageTwo.textContent = data.forecast;
//             }
//         })
//     });
// }

const weatherForm = document.querySelector('form')
weatherForm.addEventListener('submit', (e) => {
    const location = search.value
    messageOne.textContent = 'Loading ...'
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.place_name;
                messageTwo.textContent = data.forecast;
            }
        })
    });
})