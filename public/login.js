function setupLoginPage() {

    let loginForm = document.querySelector('#login-form')
    loginForm.addEventListener('submit', async e => {
        e.preventDefault()
        let formData = new FormData(loginForm)
        let res = await fetch(loginForm.action, {
            method: "POST",
            body: formData,
        })
        if (!res.ok) {
            let text = await res.text()
            Swal.fire({
                icon: 'error',
                title: 'Failed to Login',
                text,
            })
            return
        }
        let text = await res.text()
        Swal.fire({
            icon: 'success',
            title: 'Login successfully',
            text,
        })
    })
}
setupLoginPage()

let showPassword = false
document.querySelector(".eye").addEventListener('click', e => {
    let passwordInput = document.querySelector('#password')
    if (showPassword) {
        e.currentTarget.classList = "eye bi bi-eye-slash-fill"
        passwordInput.type = "text"
    } else {
        e.currentTarget.classList = "eye bi bi-eye-fill"
        passwordInput.type = "password"
    }
    showPassword = !showPassword
})