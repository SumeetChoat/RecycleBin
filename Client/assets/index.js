const createAccount = () => {
    window.location.assign('register.html')
}

const createAccountButton = document.getElementsByName("create_account")[0]
createAccountButton.addEventListener("click", createAccount)


const loginForm = document.querySelector('form')
loginForm.addEventListener("submit", verifyUser)

async function verifyUser(e) {
    e.preventDefault()
    
    const userData = {
        username: e.target.username.value,
        password: e.target.password.value
    }

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }

    const response = await fetch("http://localhost:3000/users/login", options)
    const data = await response.json()

    if (response.status == 200) {
        localStorage.setItem("token", data.token)
        window.location.assign(`homepage.html?username=${e.target.username.value}`)
    } else {
        alert(data.error);
    }
}
