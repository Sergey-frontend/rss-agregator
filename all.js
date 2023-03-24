import * as yup from 'yup'
// const yup = require('yup')
// const onChange = require('on-change')
import onChange from 'on-change';

const state = {
    rssForm: {
        state: 'filling',
        website: {
            url: [],
            valid: null,
            error: null,
        }
    }
}
const app = () => {
const elements = {
    input: document.querySelector('#url-input'),
    feedback: document.querySelector('.feedback'),
    form: document.querySelector('form'),
}

console.log(elements.feedback)


const renderError = (errorMessage, elements) => {
    elements.feedback.classList.add('text-danger');
    elements.feedback.textContent = errorMessage
}

const watchedObject = (state,elements) => onChange(state, function (path, value) {
    console.log(elements)
	switch(path) {
        case 'rssForm.state': console.log('Изменился стейт')
        case 'rssForm.website.error': renderError(value, elements)
    }
});

const schema = yup.string().url('Ссылка должна быть валидным URL').required();

// // const getValidateUrl = async (url) => {
//     schema.validate(url)
//     .then((data) => {
//         state.rssForm.website.url.push(data)
//         state.rssForm.website.valid = true
//         state.rssForm.state = 'processing'
//     })
//     .catch((e) => {
//         state.rssForm.website.valid = false
//         state.rssForm.website.error = e.message
//         // вывести ошибку
//         // очистить форму
//     })


// const inputRender = () => {
//     const input = document.querySelector('#url-input')
//     input.classList.remove('is-invalid')

//     if (!state.rssForm.website.valid) {
//         input.classList.add('is-invalid')

//         const feedback = document.querySelector('.feedback')
//         feedback.textContent = state.rssForm.website.error
//     }
// }


// console.log(form)
elements.form.addEventListener('submit',(evt) => {
    evt.preventDefault()
    const formData = new FormData(evt.target);
    const currentUrl = formData.get("url");
    schema.validate(currentUrl)
    .then((data) => {
        watchedObject.rssForm.state = 'success'
        watchedObject.rssForm.website.url.push(data)
        console.log(watchedObject)
    })
    .catch((e) => {
        watchedObject.rssForm.website.error = e.message
        console.log(watchedObject)
    })
})
}
export default app