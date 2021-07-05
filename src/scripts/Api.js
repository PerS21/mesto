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
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(user => {
                return user
            })
            .catch(error => {
                console.log(error)
            })
    }

    addCard(name, link) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-25/cards', {
                method: 'POST',
                headers: {
                    authorization: 'da22e24c-dd01-4958-b7cb-8f4974dde69d',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    link: link,
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

    patchUserInfo(name, about) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-25/users/me', {
                method: 'PATCH',
                headers: {
                    authorization: 'da22e24c-dd01-4958-b7cb-8f4974dde69d',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    about: about,
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

    patchUserImg(avatar) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-25/users/me/avatar', {
                method: 'PATCH',
                headers: {
                    authorization: 'da22e24c-dd01-4958-b7cb-8f4974dde69d',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    avatar: avatar,
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

    putLike(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-25/cards/likes/${id}`, {
                method: 'PUT',
                headers: {
                    authorization: 'da22e24c-dd01-4958-b7cb-8f4974dde69d',
                    'Content-Type': 'application/json',
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

    deleteLike(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-25/cards/likes/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: 'da22e24c-dd01-4958-b7cb-8f4974dde69d',
                    'Content-Type': 'application/json',
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
}