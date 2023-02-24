var isLogin = false
async function main() {
    let res = await fetch('/user/getUser')
    let json = await res.json()

    isLogin = json.isLogin
    console.log(json, '6')

    render_topBar()

}



function render_topBar() {
    let topBarNtn = document.querySelector('.user-name')
    if (isLogin) {
        topBarNtn.innerHTML = `<button id="logout">Logout</button>`
        reg_logout_event()
    } else {
        topBarNtn.innerHTML = `<button id="user">User</button>`
        reg_user_event()
    }
}
function reg_logout_event() {
    document.querySelector('#logout').addEventListener('click', async e => {
        let res = await fetch('/user/logout', {
            method: 'POST',
            body: ''
        })
        let json = await res.json()
        if (json.isErr) {
            // to do something
        } else {
            isLogin = json.isLogin
            render_topBar()
        }
    })
}
function reg_user_event() {
    document.querySelector('#user').addEventListener('click', e => {
        window.location.href = '/login.html'
    })
}



main()