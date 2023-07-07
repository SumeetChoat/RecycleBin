const createForm = document.querySelector('form')

createForm.addEventListener("submit", createUser)

async function createUser(e) {
    e.preventDefault()
    if(checkPasswordsMatch(e.target.password.value, e.target.password2.value)){
        if(checkValidPostcode(e.target.postcode.value.toUpperCase())){
            try {
                const firstResponse = await fetch(`http://localhost:3000/users/findDuplicate/${e.target.username.value}`)
                if(firstResponse.status == 404) {
                    const userData = {
                        name: e.target.first_name.value + " " + e.target.last_name.value,
                        house_number: e.target.number.value,
                        street_name: e.target.street_name.value,
                        postcode: e.target.postcode.value.toUpperCase(),
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
            
                    const response = await fetch("http://localhost:3000/users/register", options)
                    const data = await response.json()
            
                    if (response.status == 201) {
                        window.location.assign("index.html");
                        alert("account created!")
                    } else {
                        alert(data.error);
                    }
                }  else if(firstResponse.status === 200)  {
                    alert("Username is taken!")
                } else {
                    console.log("idk")
                }
            }  catch(e) {
                console.log(e)
            }
        } else {
            alert("Error: Please enter a valid postcode.")
        }
    } else {
        alert("Error: Passwords must match.")
    }

}
    

const checkPasswordsMatch = (str1, str2) => {
    return str1 === str2
}

const checkValidPostcode = (str) => {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let halves = str.split(" ")
    if(halves.length!=2) {
        return false
    }
    if(halves[1].length == 3) {
        if(alphabet.includes(halves[1][1]) && alphabet.includes(halves[1][2]) && Number.isNaN(parseInt(halves[1][0])) == false){
            if(halves[0].length == 3) {
                if(alphabet.includes(halves[0][0]) && alphabet.includes(halves[0][1]) && Number.isNaN(parseInt(halves[0][2])) == false) {
                    return true
                } else {
                    return false
                }
            } else if(halves[0].length == 4) {
                if(alphabet.includes(halves[0][0]) && alphabet.includes(halves[0][1]) && Number.isNaN(parseInt(halves[0][2])) == false && Number.isNaN(parseInt(halves[0][3])) == false) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        }  else {
            return false
        }
    } else if(halves[1].length == 4) {
        if(alphabet.includes(halves[1][2]) && alphabet.includes(halves[1][3]) && Number.isNaN(parseInt(halves[1][0])) == false && Number.isNaN(parseInt(halves[1][1])) == false){
            if(halves[0].length == 3) {
                if(alphabet.includes(halves[0][0]) && alphabet.includes(halves[0][1]) && Number.isNaN(parseInt(halves[0][2])) == false) {
                    return true
                } else {
                    return false
                }
            } else if(halves[0].length == 4) {
                if(alphabet.includes(halves[0][0]) && alphabet.includes(halves[0][1]) && Number.isNaN(parseInt(halves[0][2])) == false && Number.isNaN(parseInt(halves[0][3])) == false) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        }  else {
            return false
        }
    } else {
        return false
    }
}

async function checkValidUsername(username) {
    try {
        const response = await fetch(`http://localhost:3000/users/findduplicate/${username}`)
        if(response.status == 404) {
            return true
        } else if(response.status = 200) {
            return false
        }
    }  catch(e) {
        console.log(e)
    }

}

const backButton = document.getElementsByName("back_button")[0]
backButton.addEventListener("click", () => {
    window.location.assign("index.html")
})