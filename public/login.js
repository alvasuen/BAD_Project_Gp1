function setupLoginPage() {

    let loginForm = document.querySelector('#login-form')
    loginForm.addEventListener('submit', async e => {
        e.preventDefault()
        let formData = new FormData(loginForm)
        let res_json = await fetch('/user/login', {
            method: "POST",
            body: formData,
        })
        let res = await res_json.json()
        console.log(res, "123")
        if (!res.ok) {

            // let text = await res.text()
            Swal.fire({
                icon: 'error',
                title: 'Failed to Login',
                text: 'Wrong username or password'
            })
            return
        } else {
            let swaObj = await Swal.fire({
                icon: 'success',
                title: 'Login Success',
                showConfirmButton: true,
            })

            if (swaObj.isConfirmed) {
                window.location.href = '/'
            }

        }

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

