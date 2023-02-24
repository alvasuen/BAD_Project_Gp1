function setupSignupPage() {

    let signupForm = document.querySelector('#signup-form')
    signupForm.addEventListener('submit', async e => {
        e.preventDefault()
        let formData = new FormData(signupForm)
        let res = await fetch('/user/signup', {
            method: "POST",
            body: formData,
        })
        if (!res.ok) {
            let text = await res.text()
            Swal.fire({
                icon: 'error',
                title: 'Failed to signup',
                text,
            })
            return
        }

        Swal.fire({
            icon: 'success',
            title: 'Signup successfully',
        })
        window.location.href = '/index.html'
    })
}
setupSignupPage()