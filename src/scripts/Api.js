import UserInfo from './UserInfo.js'

export default class Api {
    constructor() {}

    getCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-25/cards', {
                headers: {
                    authorization: 'da22e24c-dd01-4958-b7cb-8f4974dde69d'
                }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
    }

    getUser() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-25/users/me', {
                headers: {
                    authorization: 'da22e24c-dd01-4958-b7cb-8f4974dde69d',
                },
            })
            .then(res => 
                { if(res.ok){return res.json()}}
            )
            .then(user => {

                return user
            })
            .catch(error => {
                console.log(error)
            })
    }

    addCard() {
        fetch('https://mesto.nomoreparties.co/v1/cohort-25/cards', {
                method: 'POST',
                headers: {
                    authorization: 'da22e24c-dd01-4958-b7cb-8f4974dde69d',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: 'Try',
                    link: 'http://ki.ill.in.ua/m/670x450/12754104.jpg',
                })

            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteCard() {
        fetch('https://mesto.nomoreparties.co/v1/cohort-25/cards/60e2a714f4b886002071c3e7', {
                method: 'DELETE',
                headers: {
                    authorization: 'da22e24c-dd01-4958-b7cb-8f4974dde69d',
                },
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    patchUserInfo(){
        fetch('https://mesto.nomoreparties.co/v1/cohort-25/users/me',{
            method: 'PATCH',
            headers: {
                authorization: 'da22e24c-dd01-4958-b7cb-8f4974dde69d',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: 'Stas',
              about: 'Staaaaaasss'
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(user => {
            if (user.ok) {
                console.log(user)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    patchUserImg(){
        fetch('https://mesto.nomoreparties.co/v1/cohort-25/users/me/avatar',{
            method: 'PATCH',
            headers: {
                authorization: 'da22e24c-dd01-4958-b7cb-8f4974dde69d',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: 'https://st4.depositphotos.com/11095424/25331/i/600/depositphotos_253317408-stock-photo-spongebob-squarepants-cartoon-blinking-one.jpg',
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(user => {
            if (user.ok) {
                console.log(user)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}