window.onload = () => {
    const username = [...new URLSearchParams(window.location.search).values()][0]
    const userButton = document.getElementsByName('UsernameDropdown')[0]
    userButton.textContent = username
    getUserData(username) 
}


async function getUserData(username) {
    try {
        const options = {
            headers:  {
                'Authorization': localStorage.getItem("token")
            }
        }
        const data = await fetch(`http://localhost:3000/users/username/${username}`,options)
        if(data.ok){
            const userData = await data.json()
            console.log(userData)
            const pointsButton = document.getElementsByName("points_button")[0]
            pointsButton.textContent = `Points: ${userData.points}`
            localStorage.setItem("id", userData.id)
        }
    } catch(e) {
        console.log(e)
    }
}

const logoutButton = document.getElementsByName("Log_out")[0]
logoutButton.addEventListener("click", logoutUser)

async function logoutUser(e) {
    e.preventDefault()
    try {
        const options = {
            headers:  {
                'Authorization': localStorage.getItem("token")
            }
        }
        const response = await fetch("http://localhost:3000/users/logout", options)
        const data = await response.json()

        if(response.status == 200) {
            localStorage.clear()
            alert(data.message)
            window.location.assign("index.html")
        }
    }catch(e){
        console.log(e)
    }
}

const settingsButton = document.getElementsByName("Settings")[0]
settingsButton.addEventListener("click", loadUserSettings)

const deletePopUp = () => {
    const element = document.getElementsByName('pop_up_container')[0]
    element.remove()
}

async function loadUserSettings(e) {
    e.preventDefault()
    const settingsMenuContainer = document.createElement("div")
    settingsMenuContainer.id = "settings_menu_container"

    const settingsMenu = document.createElement("main")
    settingsMenu.id = "settings_menu"
    settingsMenuContainer.appendChild(settingsMenu)

    const backButton = document.createElement("button")
    backButton.textContent = "Back"
    backButton.name = "back_button"
    backButton.addEventListener("click", returnHome3)
    settingsMenu.appendChild(backButton)

    const settingsTitle = document.createElement("p")
    settingsTitle.setAttribute("name", "title")
    settingsTitle.textContent = "User Settings"
    settingsMenu.appendChild(settingsTitle)

    const usernameForm = document.createElement("form")
    usernameForm.name = "username_form"
    usernameForm.addEventListener("submit", changeUsername)

    const userFormLabel = document.createElement("label")
    userFormLabel.setAttribute("name", "user_form_label")
    userFormLabel.setAttribute("id", "form_label")
    userFormLabel.textContent = "Change Username"
    usernameForm.appendChild(userFormLabel)

    const userFormInput = document.createElement("input")
    userFormInput.type = "text"
    userFormInput.placeholder = "username"
    userFormInput.setAttribute("id", "text_input")
    userFormInput.name = "user_form_input"
    usernameForm.appendChild(userFormInput)

    const userFormButton = document.createElement("button")
    userFormButton.name = "user_form_button"
    userFormButton.type = "submit"
    userFormButton.setAttribute("id", "confirm_button_settings")
    userFormButton.textContent = "Change Username"
    usernameForm.appendChild(userFormButton)


    const passwordForm = document.createElement("form")
    passwordForm.name = "password_form"
    passwordForm.addEventListener("submit", changePassword)

    const passwordFormLabel = document.createElement("label")
    passwordFormLabel.setAttribute("name", "password_form_label")
    passwordFormLabel.textContent = "Change Password"
    passwordFormLabel.setAttribute("id", "form_label")
    passwordForm.appendChild(passwordFormLabel)

    const passwordFormInput = document.createElement("input")
    passwordFormInput.type = "password"
    passwordFormInput.setAttribute("id", "text_input")
    passwordFormInput.placeholder = "password"
    passwordFormInput.name = "password_form_input"
    passwordForm.appendChild(passwordFormInput)

    const passwordFormInput2 = document.createElement("input")
    passwordFormInput2.type = "password"
    passwordFormInput2.setAttribute("id", "text_input")
    passwordFormInput2.placeholder = "repeat password"
    passwordFormInput2.name = "password_form_input2"
    passwordForm.appendChild(passwordFormInput2)

    const passwordFormButton = document.createElement("button")
    passwordFormButton.name = "password_form_button"
    passwordFormButton.type = "submit"
    passwordFormButton.setAttribute("id", "confirm_button_settings")
    passwordFormButton.textContent = "Change Password"
    passwordForm.appendChild(passwordFormButton)


    const addressForm = document.createElement("form")
    addressForm.name = "address_form"
    addressForm.addEventListener("submit", changeAddress)

    const addressFormLabel = document.createElement("label")
    addressFormLabel.setAttribute("name", "address_form_label")
    addressFormLabel.textContent = "Change Address"
    addressFormLabel.setAttribute("id", "form_label")
    addressForm.appendChild(addressFormLabel)

    const numberInput = document.createElement("input")
    numberInput.type = "text"
    numberInput.setAttribute("id", "text_input")
    numberInput.placeholder = "House Number"
    numberInput.name = "house_number"

    const streetName = document.createElement("input")
    streetName.type = "text"
    streetName.placeholder = "Street"
    streetName.setAttribute("id", "text_input")
    streetName.name = "street_name"

    const postcode = document.createElement("input")
    postcode.type = "text"
    postcode.placeholder = "Postcode"
    postcode.setAttribute("id", "text_input")
    postcode.name = "postcode"
    
    addressForm.appendChild(numberInput)
    addressForm.appendChild(streetName)
    addressForm.appendChild(postcode)

    const addressFormButton = document.createElement("button")
    addressFormButton.name = "address_form_button"
    addressFormButton.type = "submit"
    addressFormButton.setAttribute("id", "confirm_button_settings")
    addressFormButton.textContent = "Change Address"
    addressForm.appendChild(addressFormButton)
    

    settingsMenu.appendChild(usernameForm)
    settingsMenu.appendChild(passwordForm)
    settingsMenu.appendChild(addressForm)

    const body = document.querySelector('body')
    body.appendChild(settingsMenuContainer)
}

const returnHome3 = () => {
    const element = document.getElementById("settings_menu_container")
    element.remove()
}

async function changeUsername(e) {
    e.preventDefault()
    const popUpContainer = document.createElement("div")
    popUpContainer.setAttribute("name", "pop_up_container")

    const popUp = document.createElement("div")
    popUp.setAttribute("name", "pop_up")

    const areYouSure = document.createElement("p")
    areYouSure.setAttribute("name", "title_popup")
    areYouSure.textContent = "Are You Sure?"

    const popUpText = document.createElement("p")
    popUpText.setAttribute("name", "body")
    popUpText.id = "form_label_popup"
    popUpText.textContent = `Your username will be changed to ${e.target.user_form_input.value}.`

    const backButton = document.createElement("button")
    backButton.name = "back_button_popup"
    backButton.textContent = "Back"
    backButton.id = "defirm_button"
    backButton.addEventListener("click", deletePopUp)

    const confirmButton = document.createElement("button")
    confirmButton.name = "confirm_button_popup"
    confirmButton.textContent = "Confirm"
    confirmButton.id = "confirm_button"
    confirmButton.addEventListener("click", async function () {
        const username = [...new URLSearchParams(window.location.search).values()][0]
        try {
            const firstResponse = await fetch(`http://localhost:3000/users/findDuplicate/${e.target.user_form_input.value}`)
            if(firstResponse.status == 404) {
                try {
                    const usernameObj = {
                        username: e.target.user_form_input.value
                    }
        
                    const options  = {
                        method:"PATCH",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(usernameObj)
                    }
        
                    const response = await fetch(`http://localhost:3000/users/username/${username}`, options) 
                        const data = response.json()
        
                        if (response.status == 200) {
                            let popUp = document.getElementsByName('pop_up_container')[0]
                            popUp.remove()
                            window.location.assign(`homepage.html?username=${e.target.user_form_input.value}`)
                            document.getElementsByName("username_form")[0].reset()
                            alert("Username Changed Successfully")
                        }
                } catch (e) {
                    console.log(e)
                }
            }  else if(firstResponse.status === 200)  {
                deletePopUp()
                alert("Username is taken!")
            }
        }  catch(e) {
            console.log(e)
        }
    })

    const buttonSection = document.createElement("div")
    buttonSection.setAttribute("name", "popup_buttons")
    buttonSection.appendChild(confirmButton)
    buttonSection.appendChild(backButton)
    

    popUp.appendChild(areYouSure)
    popUp.appendChild(popUpText)
    popUp.appendChild(buttonSection)
    popUpContainer.appendChild(popUp)

    const body = document.querySelector('body')
    body.appendChild(popUpContainer)
}

const checkPasswordsMatch = (str1, str2) => {
    return str1 === str2
}

async function changePassword(e) {
    e.preventDefault()
    if(checkPasswordsMatch(e.target.password_form_input.value, e.target.password_form_input2.value)){
        const popUpContainer = document.createElement("div")
        popUpContainer.setAttribute("name", "pop_up_container")

        const popUp = document.createElement("div")
        popUp.setAttribute("name", "pop_up")

        const areYouSure = document.createElement("p")
        areYouSure.setAttribute("name", "title_popup")
        areYouSure.textContent = "Are You Sure?"

        const popUpText = document.createElement("p")
        popUpText.setAttribute("name", "body")
        popUpText.id = "form_label_popup"
        popUpText.textContent = `Your password will be changed.`

        const backButton = document.createElement("button")
        backButton.name = "back_button_popup"
        backButton.id = "defirm_button"
        backButton.textContent = "Back"
        backButton.addEventListener("click", deletePopUp)

        const confirmButton = document.createElement("button")
        confirmButton.name = "confirm_button_popup"
        confirmButton.textContent = "Confirm"
        confirmButton.id = "confirm_button"
        confirmButton.addEventListener("click", async function () {
            const username = [...new URLSearchParams(window.location.search).values()][0]
            try {
                const passwordObj = {
                    password: e.target.password_form_input2.value
                }

                const options  = {
                    method:"PATCH",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(passwordObj)
                }

                const response = await fetch(`http://localhost:3000/users/password/${username}`, options) 
                    const data = response.json()

                    if (response.status == 200) {
                        let popUp = document.getElementsByName('pop_up_container')[0]
                        popUp.remove()
                        document.getElementsByName("password_form")[0].reset()
                        alert("Password Changed Successfully")
                    }
            } catch (e) {
                console.log(e)
            }
        })

        const buttonSection = document.createElement("div")
        buttonSection.setAttribute("name", "popup_buttons")
        buttonSection.appendChild(confirmButton)
        buttonSection.appendChild(backButton)
        

        popUp.appendChild(areYouSure)
        popUp.appendChild(popUpText)
        popUp.appendChild(buttonSection)
        popUpContainer.appendChild(popUp)

        const body = document.querySelector('body')
        body.appendChild(popUpContainer)
    } else {
        alert("Passwords must match")
    }
}

async function changeAddress(e) {
    e.preventDefault()

    if(checkValidPostcode(e.target.postcode.value.toUpperCase())){
        const address = e.target.house_number.value + " " + e.target.street_name.value + ", " + e.target.postcode.value.toUpperCase()

        const popUpContainer = document.createElement("div")
        popUpContainer.setAttribute("name", "pop_up_container")

        const popUp = document.createElement("div")
        popUp.setAttribute("name", "pop_up")

        const areYouSure = document.createElement("p")
        areYouSure.setAttribute("name", "title_popup")
        areYouSure.textContent = "Are You Sure?"

        const popUpText = document.createElement("p")
        popUpText.setAttribute("name", "body")
        popUpText.id = "form_label_popup"
        popUpText.textContent = `Your address will be changed to ${address}.`

        const backButton = document.createElement("button")
        backButton.name = "back_button_popup"
        backButton.textContent = "Back"
        backButton.id = "defirm_button"
        backButton.addEventListener("click", deletePopUp)

        const confirmButton = document.createElement("button")
        confirmButton.name = "confirm_button_popup"
        confirmButton.textContent = "Confirm"
        confirmButton.id = "confirm_button"
        confirmButton.addEventListener("click", async function () {
            const username = [...new URLSearchParams(window.location.search).values()][0]
            try {
                const rawAddressData = await fetch(`http://localhost:3000/address/user/${e.target.house_number.value}&${e.target.postcode.value.toUpperCase()}`)
                if(rawAddressData.ok){
                    const addressData = await rawAddressData.json()
                    console.log(addressData)

                    const addressIdData = {
                        address_id: addressData.id
                    }

                    const options = {
                        method:"PATCH",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(addressIdData)
                    }

                    try {
                        const response = await fetch(`http://localhost:3000/users/address/${username}`, options) 
                        const data = response.json()

                        if (response.status == 200) {
                            let popUp = document.getElementsByName('pop_up_container')[0]
                            popUp.remove()
                            document.getElementsByName("address_form")[0].reset()
                            alert("Address Changed Successfully")
                        }
                    } catch(e) {
                        console.log(e)
                    }
                }

            }catch(e) {
                console.log(e)
            }
        })

        const buttonSection = document.createElement("div")
        buttonSection.setAttribute("name", "popup_buttons")
        buttonSection.appendChild(confirmButton)
        buttonSection.appendChild(backButton)
        

        popUp.appendChild(areYouSure)
        popUp.appendChild(popUpText)
        popUp.appendChild(buttonSection)
        popUpContainer.appendChild(popUp)

        const body = document.querySelector('body')
        body.appendChild(popUpContainer)
    } else {
        alert("Postcode is invalid")
    }
    
}

const homeButton = document.getElementsByName("home_button")[0]
homeButton.addEventListener("click", () => {
    window.location.assign(`homepage.html?username=${[...new URLSearchParams(window.location.search).values()][0]}`)
})

const appointmentsButton = document.getElementsByName("appointments")[0]
appointmentsButton.addEventListener("click", loadAppointmentsMenu)

async function loadAppointmentsMenu() {
    const appointmentMenuContainer = document.createElement("div")
    appointmentMenuContainer.id = "appointment_menu_container"

    const appointmentMenu = document.createElement("main")
    appointmentMenu.id = "appointment_menu"
    appointmentMenuContainer.appendChild(appointmentMenu)

    const backButton = document.createElement("button")
    backButton.textContent = "Back"
    backButton.name = "back_button_appointments"
    backButton.addEventListener("click", returnHome)
    appointmentMenu.appendChild(backButton)

    const appointmentTitle = document.createElement("p")
    appointmentTitle.setAttribute("name", "title_appointments")
    appointmentTitle.textContent = "Collection Appointments"
    appointmentMenu.appendChild(appointmentTitle)

    const appointmentTable = document.createElement("table")
    appointmentTable.setAttribute("name", "appointment_table")
    appointmentMenu.appendChild(appointmentTable)

    let titleRow = document.createElement("tr")
    titleRow.setAttribute("name", "title_row")
    appointmentTable.appendChild(titleRow)

    let titleCategories = ["Where", "When", "What", "Weight (kg)", "Value (£)"]
    for(let i=0; i<titleCategories.length; i++) {
        let td = document.createElement("td")
        td.textContent = titleCategories[i]
        td.setAttribute("name", "title_values")
        titleRow.appendChild(td)
    }

    try {
        const options = {
            headers:  {
                'Authorization': localStorage.getItem("token")
            }
        }
        const appointmentsResponse = await fetch(`http://localhost:3000/appointment`,options)
        if(appointmentsResponse.ok) {
            appointments = await appointmentsResponse.json()
            console.log(appointments)
            for(let i=0; i<appointments.length; i++){
                let what = appointments[i].object_name
                let weight= appointments[i].weight_kg
                let weekdayId = appointments[i].weekday_id
                let userId = appointments[i].user_id
                let address = ""
                let weekday = ""
                let value = ""

                try {
                    const options = {
                        headers:  {
                            'Authorization': localStorage.getItem("token")
                        }
                    }
                    const data = await fetch(`http://localhost:3000/users/${userId}`,options)
                    if(data.ok) {
                        const userData = await data.json()
                        userAddressId = userData.address_id
                        try {
                            const data = await fetch(`http://localhost:3000/address/${userAddressId}`)
                            if(data.ok) {
                                addressData = await data.json()
                                address = addressData.house_number + " " + addressData.street_name

                            }
                        }catch(e) {
                            console.log(e)
                        }
                    }
                } catch(e) {
                    console.log(e)
                }
                try {
                    const data = await fetch(`http://localhost:3000/weekday/${weekdayId}`)
                    if(data.ok) {
                        weekdayData = await data.json()
                        weekday = weekdayData.weekday
                    }
                    
                }catch(e) {
                    console.log(e)
                }
                try {
                    const data = await fetch(`http://localhost:3000/collectBulkyWaste/weight/${weight}`)
                    if(data.ok){
                        const priceData = await data.json()
                        value = priceData.price
                    }
                } catch(e) {
                    console.log(e)
                }
                const appointmentArr = [address, weekday, what, weight, value]
                let appointmentRow = document.createElement("tr")
                appointmentRow.setAttribute("name", `appointment_row${i}`)
                appointmentTable.appendChild(appointmentRow)

                for(let i=0; i<appointmentArr.length; i++) {
                    let td = document.createElement("td")
                    td.textContent = appointmentArr[i]
                    td.setAttribute("name", "appointment_values")
                    appointmentRow.appendChild(td)
                }
            }
        }
    } catch(e) {
        console.log(e)
    }

    const body = document.querySelector('body')
    body.appendChild(appointmentMenuContainer)

}

const returnHome = () => {
    const element = document.getElementById("appointment_menu_container")
    element.remove()
}


const addressButton = document.getElementsByName("address_database")[0]
addressButton.addEventListener("click", openAddressPopup)

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

async function openAddressPopup() {
    const addressMenuContainer = document.createElement("div")
    addressMenuContainer.id = "address_menu_container"

    const addressMenu = document.createElement("main")
    addressMenu.id = "address_menu"
    addressMenuContainer.appendChild(addressMenu)

    const backButton = document.createElement("button")
    backButton.textContent = "Back"
    backButton.name = "back_button"
    backButton.addEventListener("click", returnHome2)
    addressMenu.appendChild(backButton)

    const addressTitle = document.createElement("p")
    addressTitle.setAttribute("name", "title")
    addressTitle.textContent = "Addresses Settings"
    addressMenu.appendChild(addressTitle)

    const createAddressForm = document.createElement("form")
    createAddressForm.name = "create_address_form"
    createAddressForm.addEventListener("submit", createAnAddress)

    const addressFormLabel = document.createElement("label")
    addressFormLabel.setAttribute("name", "address_form_label")
    addressFormLabel.setAttribute("id", "form_label")
    addressFormLabel.textContent = "Create Address"
    createAddressForm.appendChild(addressFormLabel)

    const numberInput = document.createElement("input")
    numberInput.type = "text"
    numberInput.placeholder = "House Number"
    numberInput.setAttribute("id", "text_input")
    numberInput.name = "house_number"

    const streetName = document.createElement("input")
    streetName.type = "text"
    streetName.placeholder = "Street"
    streetName.setAttribute("id", "text_input")
    streetName.name = "street_name"

    const postcode = document.createElement("input")
    postcode.type = "text"
    postcode.placeholder = "Postcode"
    postcode.setAttribute("id", "text_input")
    postcode.name = "postcode"

    const zoneNumber = document.createElement("input")
    zoneNumber.type = "text"
    zoneNumber.placeholder = "Zone Number"
    zoneNumber.setAttribute("id", "text_input")
    zoneNumber.name = "zone"
    
    createAddressForm.appendChild(numberInput)
    createAddressForm.appendChild(streetName)
    createAddressForm.appendChild(postcode)
    createAddressForm.appendChild(zoneNumber)

    const addressFormButton = document.createElement("button")
    addressFormButton.name = "address_form_button"
    addressFormButton.type = "submit"
    addressFormButton.setAttribute("id", "confirm_button")
    addressFormButton.textContent = "Create Address"
    createAddressForm.appendChild(addressFormButton)


    const deleteAddressForm = document.createElement("form")
    deleteAddressForm.name = "delete_address_form"
    deleteAddressForm.addEventListener("submit", deleteAnAddress)

    const addressFormLabel2 = document.createElement("label")
    addressFormLabel2.setAttribute("name", "address_form_label")
    addressFormLabel2.setAttribute("id", "form_label")
    addressFormLabel2.textContent = "Delete Address"
    deleteAddressForm.appendChild(addressFormLabel2)

    const numberInput2 = document.createElement("input")
    numberInput2.type = "text"
    numberInput2.placeholder = "House Number"
    numberInput2.setAttribute("id", "text_input")
    numberInput2.name = "house_number"

    const streetName2 = document.createElement("input")
    streetName2.type = "text"
    streetName2.placeholder = "Street"
    streetName2.setAttribute("id", "text_input")
    streetName2.name = "street_name"

    const postcode2 = document.createElement("input")
    postcode2.type = "text"
    postcode2.setAttribute("id", "text_input")
    postcode2.placeholder = "Postcode"
    postcode2.name = "postcode"

    const addressFormButton2 = document.createElement("button")
    addressFormButton2.name = "address_form_button"
    addressFormButton2.setAttribute("id", "defirm_button")
    addressFormButton2.type = "submit"
    addressFormButton2.textContent = "Delete Address"
    
    deleteAddressForm.appendChild(numberInput2)
    deleteAddressForm.appendChild(streetName2)
    deleteAddressForm.appendChild(postcode2)
    deleteAddressForm.appendChild(addressFormButton2)

    addressMenu.appendChild(createAddressForm)
    addressMenu.appendChild(deleteAddressForm)

    const body = document.querySelector('body')
    body.appendChild(addressMenuContainer)
}

const returnHome2 = () => {
    const element = document.getElementById("address_menu_container")
    element.remove()
}

async function createAnAddress(e) {
    e.preventDefault()
    if(checkValidPostcode(e.target.postcode.value.toUpperCase())) {
        const address = e.target.house_number.value + " " + e.target.street_name.value + ", " + e.target.postcode.value.toUpperCase()

        const popUpContainer = document.createElement("div")
        popUpContainer.setAttribute("name", "pop_up_container")

        const popUp = document.createElement("div")
        popUp.setAttribute("name", "pop_up")

        const areYouSure = document.createElement("p")
        areYouSure.setAttribute("name", "title_popup")
        areYouSure.textContent = "Are You Sure?"

        const popUpText = document.createElement("p")
        popUpText.setAttribute("name", "body")
        popUpText.id = "form_label_popup"
        popUpText.textContent = `You will add '${address}' to the database.`

        const backButton = document.createElement("button")
        backButton.name = "back_button_popup"
        backButton.id = "defirm_button"
        backButton.textContent = "Back"
        backButton.addEventListener("click", deletePopUp)

        const confirmButton = document.createElement("button")
        confirmButton.name = "confirm_button_popup"
        confirmButton.id = "confirm_button"
        confirmButton.textContent = "Confirm"
        confirmButton.addEventListener("click", async function () {
            const username = [...new URLSearchParams(window.location.search).values()][0]
            try {
                const addressData = {
                    street_name: e.target.street_name.value,
                    house_number: e.target.house_number.value,
                    postcode: e.target.postcode.value.toUpperCase(),
                    zone_id: e.target.zone.value
                }

                const options = {
                    method:"POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(addressData)
                }

                const response = await fetch(`http://localhost:3000/address/`, options)
                const data = await response.json()
                if(response.status == 201) {
                    document.getElementsByName("create_address_form")[0].reset() 
                    document.getElementsByName("pop_up_container")[0].remove()
                    alert("Address successfully added")
                } else {
                    alert(data.error)
                }
            }catch(e) {
                console.log(e)
            }
        })

        const buttonSection = document.createElement("div")
        buttonSection.setAttribute("name", "popup_buttons")
        buttonSection.appendChild(confirmButton)
        buttonSection.appendChild(backButton)
        

        popUp.appendChild(areYouSure)
        popUp.appendChild(popUpText)
        popUp.appendChild(buttonSection)
        popUpContainer.appendChild(popUp)

        const body = document.querySelector('body')
        body.appendChild(popUpContainer)
    } else {
        alert("Postcode is invalid")
    }
    
}

async function deleteAnAddress(e) {
    e.preventDefault()
    if(checkValidPostcode(e.target.postcode.value.toUpperCase())) {
        const address = e.target.house_number.value + " " + e.target.street_name.value + ", " + e.target.postcode.value.toUpperCase()

        const popUpContainer = document.createElement("div")
        popUpContainer.setAttribute("name", "pop_up_container")

        const popUp = document.createElement("div")
        popUp.setAttribute("name", "pop_up")

        const areYouSure = document.createElement("p")
        areYouSure.setAttribute("name", "title_popup")
        areYouSure.textContent = "Are You Sure?"

        const popUpText = document.createElement("p")
        popUpText.setAttribute("name", "body")
        popUpText.id = "form_label_popup"
        popUpText.textContent = `You will delete '${address}' from the database.`

        const backButton = document.createElement("button")
        backButton.name = "back_button_popup"
        backButton.id = "defirm_button"
        backButton.textContent = "Back"
        backButton.addEventListener("click", deletePopUp)

        const confirmButton = document.createElement("button")
        confirmButton.name = "confirm_button_popup"
        confirmButton.id = "confirm_button"
        confirmButton.textContent = "Confirm"
        confirmButton.addEventListener("click", async function () {
            const username = [...new URLSearchParams(window.location.search).values()][0]
            try {
                const rawAddressData = await fetch(`http://localhost:3000/address/user/${e.target.house_number.value}&${e.target.postcode.value.toUpperCase()}`)
                if(rawAddressData.ok){
                    const addressData = await rawAddressData.json()
                    console.log(addressData)

                    const options = {
                        method:"DELETE",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                    try {
                        const response = await fetch(`http://localhost:3000/address/${addressData.id}`, options)
                        if(response.status == 204) {
                            document.getElementsByName("delete_address_form")[0].reset() 
                            document.getElementsByName("pop_up_container")[0].remove()
                            alert("Address successfully deleted")
                        } else {
                            alert("Delete was unsuccessful")
                        }
                    } catch(e) {
                        console.log(e)
                    }
                }
            }catch(e) {
                console.log(e)
            }
        })

        const buttonSection = document.createElement("div")
        buttonSection.setAttribute("name", "popup_buttons")
        buttonSection.appendChild(confirmButton)
        buttonSection.appendChild(backButton)
        

        popUp.appendChild(areYouSure)
        popUp.appendChild(popUpText)
        popUp.appendChild(buttonSection)
        popUpContainer.appendChild(popUp)

        const body = document.querySelector('body')
        body.appendChild(popUpContainer)
    } else {
        alert("Postcode is invalid")
    }
}

const residentsButton = document.getElementsByName("resident_database")[0]
residentsButton.addEventListener("click", openResidentsPopup)

async function openResidentsPopup() {
    const residentMenuContainer = document.createElement("div")
    residentMenuContainer.id = "resident_menu_container"

    const residentMenu = document.createElement("main")
    residentMenu.id = "resident_menu"
    residentMenuContainer.appendChild(residentMenu)

    const backButton = document.createElement("button")
    backButton.textContent = "Back"
    backButton.name = "back_button"
    backButton.addEventListener("click", returnHome4)
    residentMenu.appendChild(backButton)

    const residentTitle = document.createElement("p")
    residentTitle.setAttribute("name", "title")
    residentTitle.textContent = "Adjust Residents"
    residentMenu.appendChild(residentTitle)

    const residentAdminForm = document.createElement("form")
    residentAdminForm.name = "resident_admin_form"
    residentAdminForm.addEventListener("submit", makeUserAdmin)

    const adminLabel = document.createElement("label")
    adminLabel.setAttribute("name", "admin_label")
    adminLabel.setAttribute("id", "form_label")
    adminLabel.textContent = "Make a user an admin"
    residentAdminForm.appendChild(adminLabel)

    const adminInput = document.createElement("input")
    adminInput.name = "admin_input"
    adminInput.type = "text"
    adminInput.placeholder = "username"
    adminInput.setAttribute("id", "text_input")
    residentAdminForm.appendChild(adminInput)

    const adminButton = document.createElement("button")
    adminButton.name = "admin_button"
    adminButton.textContent = "Make Admin"
    adminButton.setAttribute("id", "confirm_button")
    residentAdminForm.appendChild(adminButton)



    const residentDeleteForm = document.createElement("form")
    residentDeleteForm.name = "resident_delete_form"
    residentDeleteForm.addEventListener("submit", deleteUser)

    const deleteLabel = document.createElement("label")
    deleteLabel.setAttribute("name", "delete_label")
    deleteLabel.setAttribute("id", "form_label")
    deleteLabel.textContent = "Delete a user"
    residentDeleteForm.appendChild(deleteLabel)

    const deleteInput = document.createElement("input")
    deleteInput.name = "delete_input"
    deleteInput.type = "text"
    deleteInput.placeholder = "username"
    deleteInput.setAttribute("id", "text_input")
    residentDeleteForm.appendChild(deleteInput)

    const deleteButton = document.createElement("button")
    deleteButton.name = "delete_button"
    deleteButton.textContent = "Delete User"
    deleteButton.setAttribute("id", "defirm_button")
    residentDeleteForm.appendChild(deleteButton)

    residentMenu.appendChild(residentAdminForm)
    residentMenu.appendChild(residentDeleteForm)

    const body = document.querySelector('body')
    body.appendChild(residentMenuContainer)
}

const returnHome4 = () => {
    const element = document.getElementById("resident_menu_container")
    element.remove()
}

async function makeUserAdmin(e) {
    e.preventDefault()
    const popUpContainer = document.createElement("div")
        popUpContainer.setAttribute("name", "pop_up_container")

        const popUp = document.createElement("div")
        popUp.setAttribute("name", "pop_up")

        const areYouSure = document.createElement("p")
        areYouSure.setAttribute("name", "title_popup")
        areYouSure.textContent = "Are You Sure?"

        const popUpText = document.createElement("p")
        popUpText.setAttribute("name", "body")
        popUpText.id = "form_label_popup"
        popUpText.textContent = `You will make ${e.target.admin_input.value} an admin.`

        const backButton = document.createElement("button")
        backButton.name = "back_button_popup"
        backButton.id = "defirm_button"
        backButton.textContent = "Back"
        backButton.addEventListener("click", deletePopUp)

        const confirmButton = document.createElement("button")
        confirmButton.name = "confirm_button_popup"
        confirmButton.id = "confirm_button"
        confirmButton.textContent = "Confirm"
        confirmButton.addEventListener("click", async function () {
            try {
                const adminObj = {
                    isadmin: true
                }

                const options = {
                    method: "PATCH",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(adminObj)
                }

                const response = await fetch(`http://localhost:3000/users/admin/${e.target.admin_input.value}`,options)

                if(response.status ==200){
                    alert(`'${e.target.admin_input.value}' is now an admin.`)
                    document.getElementsByName("resident_admin_form")[0].reset() 
                    document.getElementsByName("pop_up_container")[0].remove()
                } else{
                    alert("error updating")
                }
            } catch(e) {
                console.log(e)
            }
        })

        const buttonSection = document.createElement("div")
        buttonSection.setAttribute("name", "popup_buttons")
        buttonSection.appendChild(confirmButton)
        buttonSection.appendChild(backButton)
        

        popUp.appendChild(areYouSure)
        popUp.appendChild(popUpText)
        popUp.appendChild(buttonSection)
        popUpContainer.appendChild(popUp)

        const body = document.querySelector('body')
        body.appendChild(popUpContainer)
}

async function deleteUser(e) {
    e.preventDefault()
    const popUpContainer = document.createElement("div")
        popUpContainer.setAttribute("name", "pop_up_container")

        const popUp = document.createElement("div")
        popUp.setAttribute("name", "pop_up")

        const areYouSure = document.createElement("p")
        areYouSure.setAttribute("name", "title_popup")
        areYouSure.textContent = "Are You Sure?"

        const popUpText = document.createElement("p")
        popUpText.setAttribute("name", "body")
        popUpText.id = "form_label_input"
        popUpText.textContent = `You will delete ${e.target.delete_input.value}'s account.`

        const backButton = document.createElement("button")
        backButton.name = "back_button_popup"
        backButton.id = "defirm_button"
        backButton.textContent = "Back"
        backButton.addEventListener("click", deletePopUp)

        const confirmButton = document.createElement("button")
        confirmButton.name = "confirm_button_popup"
        confirmButton.id = "confirm_button"
        confirmButton.textContent = "Confirm"
        confirmButton.addEventListener("click", async function () {
            try {
                const data = await fetch(`http://localhost:3000/users/findDuplicate/${e.target.delete_input.value}`)
                const userData = await data.json()
                if(data.status == 404) {
                    alert("user was not found")
                    document.getElementsByName("pop_up_container")[0].remove()
                } else if(data.status == 200) {
                    if(userData.isAdmin) {
                        alert("You do not have permission to delete an admin")
                        document.getElementsByName("pop_up_container")[0].remove()
                    } else {
                        try {
                            const options = {
                                method:"DELETE",
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }
                            }
    
                            const response = await fetch(`http://localhost:3000/users/${userData.id}`, options)
                            if(response.status == 204) {
                                alert(`'${e.target.delete_input.value}' was successfully deleted.`)
                                document.getElementsByName("resident_delete_form")[0].reset() 
                                document.getElementsByName("pop_up_container")[0].remove()
                            } else {
                                alert("Delete was unsuccessful")
                            }
    
                        } catch(e) {
                            console.log(e)
                        }
                    }
                } else {
                    console.log("An error with the api request as occured")
                }
            } catch(e) {
                console.log(e)
            }
        })

        const buttonSection = document.createElement("div")
        buttonSection.setAttribute("name", "popup_buttons")
        buttonSection.appendChild(confirmButton)
        buttonSection.appendChild(backButton)
        

        popUp.appendChild(areYouSure)
        popUp.appendChild(popUpText)
        popUp.appendChild(buttonSection)
        popUpContainer.appendChild(popUp)

        const body = document.querySelector('body')
        body.appendChild(popUpContainer)
}


