window.onload = () => {
    const username = [...new URLSearchParams(window.location.search).values()][0]
    console.log(username)
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
        console.log(username)
        const data = await fetch(`http://localhost:3000/users/username/${username}`,options)
        if(data.ok){
            const userData = await data.json()
            console.log(userData)
            const pointsButton = document.getElementsByName("points_button")[0]
            pointsButton.textContent = `Points: ${userData.points}`
            localStorage.setItem("id", userData.id)
            setUpPage(userData)
        }
    } catch(e) {
        console.log(e)
    }
}

async function setUpPage(userData) {
    userAddressId = userData.address_id
    try {
        const data = await fetch(`http://localhost:3000/address/${userAddressId}`)
        if (data.ok) {
            addressData = await data.json()
            zoneId = addressData.zone_id
            try {
                const zoneData = await fetch(`http://localhost:3000/collectDay/zone/${zoneId}`)
                if(zoneData.ok) {
                    collectionDayData = await zoneData.json()
                    displayBins(collectionDayData[0])
                }
            }catch(e) {
                console.log(e)
            }
        }
    } catch(e) {
        console.log(e)
    }

    if(userData.isAdmin) {
        const adminButton = document.createElement("button")
        adminButton.name = "admin_button"
        adminButton.textContent= "admin"
        adminButton.id = "drop_down_btn"
        adminButton.addEventListener("click", () => {
            window.location.assign(`admin.html?username=${userData.username}`)
        })
        
        const buttonsDiv = document.getElementsByName("user_dropdown_content")[0]
        buttonsDiv.appendChild(adminButton)   
    }
}

async function displayBins (data) {
    const weekdayData = await fetch(`http://localhost:3000/weekday/${data.weekday_id}`)
    let weekday = ""
    let bin = ""
    if(weekdayData.ok) {
         const usableWeekdayData = await weekdayData.json()
         weekday = usableWeekdayData.weekday
    }
    const binData = await fetch(`http://localhost:3000/bin/${data.bin_type_id}`)
    if(binData.ok) {
        const usefulBinData = await binData.json()
        bin = usefulBinData.bin_type_name
    }

    const binCollectionBox = document.createElement("div")
    binCollectionBox.id = "bin_box"

    const binInfo = document.createElement("p")
    binInfo.id= "bin_info"
    binInfo.textContent = `The following bins will be collected on ${weekday}:`
    binCollectionBox.appendChild(binInfo)

    const binImg = document.createElement("img")
    binImg.alt = `${bin}`
    binImg.src = `./assets/images/${bin}.png`
    binImg.id = "bin_img"
    binCollectionBox.appendChild(binImg)

    const binFlorin = document.getElementsByName("bin_and_user")[0]
    binFlorin.appendChild(binCollectionBox)
}

const recycleButton = document.getElementsByName("RecyclingButton")[0]
recycleButton.addEventListener("click", openRecyclingMenu)

async function openRecyclingMenu() {
    const recyclingMenuContainer = document.createElement("div")
    recyclingMenuContainer.id = "recycling_menu_container"

    const recyclingMenu = document.createElement("main")
    recyclingMenu.id = "recycling_menu"
    recyclingMenuContainer.appendChild(recyclingMenu)

    const backButton = document.createElement("button")
    backButton.textContent = "Back"
    backButton.name = "back_button"
    backButton.addEventListener("click", returnHome)
    recyclingMenu.appendChild(backButton)

    const recyclingForm = document.createElement("form")
    recyclingForm.name = "recycling_form"
    recyclingForm.setAttribute("autocomplete", "off")
    recyclingForm.addEventListener('keypress', function(e) {
        if (e.keyCode === 13) {
          e.preventDefault();
        }
      });

    const autoComplete = document.createElement("input")
    autoComplete.type = "text"
    autoComplete.style = "display:none;"
    autoComplete.setAttribute("autocomplete", "false")
    recyclingForm.appendChild(autoComplete)

    const recyclingTitle = document.createElement("p")
    recyclingTitle.setAttribute("name", "title")
    recyclingTitle.textContent = "Disposal Help"
    recyclingMenu.appendChild(recyclingTitle)

    const searchLabel = document.createElement("label")
    searchLabel.setAttribute("name", "search_label")
    searchLabel.setAttribute("id", "form_label")
    searchLabel.textContent = "Search for something"

    const searchBar = document.createElement("input")
    searchBar.type = "text"
    searchBar.placeholder = "Search..."
    searchBar.name = "search_bar"
    searchBar.setAttribute("id", "text_input")
    searchBar.addEventListener('keyup', obtainRecycleItems)
    searchBar.addEventListener('focus', resetForm)


    const disposeButton = document.createElement("button")
    disposeButton.textContent = "WasteWise this item"
    disposeButton.value = "submit"
    disposeButton.name = "dispose_button"
    disposeButton.setAttribute("id", "confirm_button_settings")
    recyclingForm.addEventListener("submit", disposeItem)

    const dropdownSection = document.createElement("div")
    dropdownSection.setAttribute("name", "dropdown_section")
    dropdownSection.appendChild(searchLabel)
    dropdownSection.appendChild(searchBar)

    const dropdownContent = document.createElement("div")
    dropdownContent.setAttribute("name", "dropdown_content")
    dropdownSection.appendChild(dropdownContent)

    recyclingForm.appendChild(dropdownSection)
    recyclingForm.appendChild(disposeButton)
    recyclingMenu.appendChild(recyclingForm)

    const body = document.querySelector('body')
    body.appendChild(recyclingMenuContainer)
}

const returnHome = () => {
    const element = document.getElementById("recycling_menu_container")
    element.remove()
}


async function obtainRecycleItems(e) {
    e.preventDefault()
    let dropdownContent = document.getElementsByName("dropdown_content")[0]
    dropdownContent.style = "display:block;"
    const searchContents = document.getElementsByName("search_bar")[0].value
    if(searchContents == ""){
        const buttonsForDelete = document.getElementsByName("dropdown_option")
        dropdownContent.style = "display:none;"
        for(let j=buttonsForDelete.length-1; j>=0; j--){
            buttonsForDelete[j].remove()
        }
    }
    if(searchContents.length>=3){
        try {
            const data = await fetch(`http://localhost:3000/object/search/${searchContents}`)
            if(data.ok) {
                const searchItems = await data.json()
                const buttonsForDelete = document.getElementsByName("dropdown_option")
                for(let j=buttonsForDelete.length-1; j>=0; j--){
                    buttonsForDelete[j].remove()
                }
                for(let i=0; i<searchItems.length; i++) {
                    let dropdownOption = document.createElement('button')
                    dropdownOption.name = "dropdown_option"
                    dropdownOption.textContent = searchItems[i].name
                    dropdownOption.setAttribute("id", "confirm_button_dropdown")
                    dropdownOption.class = searchItems[i].object_id
                    dropdownOption.addEventListener("click", fillItem)
                    let dropdownContent = document.getElementsByName("dropdown_content")[0]
                    dropdownContent.appendChild(dropdownOption)
                }
                checkForDuplicates()
            }
        } catch(e){
            console.log(e)
        }
    }
}

const checkForDuplicates = () => {
    const buttons = document.getElementsByName("dropdown_option")
    let textOfButtons = []
    for(let i =0; i<buttons.length; i++) {
        let text = buttons[i].textContent
        textOfButtons.push(text)
    }
    for(let j = textOfButtons.length-1; j >=0; j--){
        let testText = textOfButtons[j]
        if(j!= textOfButtons.lastIndexOf(testText)) {
            buttons[j].remove()
        }
    }
}

async function fillItem(e) {
    e.preventDefault()
    let dropdownContent = document.getElementsByName("dropdown_content")[0]
    dropdownContent.style = "display:none;"
    let text = e.target.textContent
    let id = e.target.class
    let searchBar = document.getElementsByName("search_bar")
    searchBar.id = id
    document.getElementsByName("recycling_form")[0].search_bar.value = text

    try {
        const response = await fetch(`http://localhost:3000/object/${id}`)
        if(response.ok){
            const itemData = await response.json()
            try {
                const rawBinData = await fetch(`http://localhost:3000/bin/${itemData.bin_type_id}`)
                if(rawBinData.ok) {
                    const binData = await rawBinData.json()
                    console.log(binData)
                    const bin = binData.bin_type_name

                    let whichBinText = document.createElement("p")
                    whichBinText.setAttribute("name", "which_bin_text")

                    if(bin == "Needs Collection") {
                        whichBinText.textContent = `This item belongs ${bin.toLowerCase()}.`
                        document.getElementsByName("dropdown_section")[0].appendChild(whichBinText)
                    } else if(bin == "Garden Waste") {
                        whichBinText.textContent = `This item belongs with the ${bin.toLowerCase()}.`
                        document.getElementsByName("dropdown_section")[0].appendChild(whichBinText)
                    } else if(bin == "Clear bag") {
                        whichBinText.textContent = `This item should be placed in a ${bin.toLowerCase()} and left with the other bin bags.`
                        document.getElementsByName("dropdown_section")[0].appendChild(whichBinText)
                    } else if(bin == "Large Supermarkets") {
                        whichBinText.textContent = `This item needs to be recycled at ${bin.toLowerCase()}.`
                        document.getElementsByName("dropdown_section")[0].appendChild(whichBinText)
                    } else {
                        whichBinText.textContent = `This item belongs in the ${bin.toLowerCase()} bin.`
                        document.getElementsByName("dropdown_section")[0].appendChild(whichBinText)
                    }  

                    let binImg = document.createElement("img")
                    binImg.alt = `${bin}`
                    binImg.src = `./assets/images/${bin}.png`
                    binImg.id = "bin_img_form"
                    binImg.setAttribute("name", "bin")
                    document.getElementsByName("dropdown_section")[0].appendChild(binImg)

                }
            } catch(e){
                console.log(e)
            }
        }
    } catch(e) {
        console.log(e)
    }
}

const resetForm = () => {
    const searchContents = document.getElementsByName("search_bar")[0].value
    if(searchContents != "") {
        let dropdownContent = document.getElementsByName("dropdown_content")[0]
        dropdownContent.style = "display:block;"
        let binText = document.getElementsByName("which_bin_text")[0]
        binText.remove()
        let binImg = document.getElementsByName("bin")[0]
        binImg.remove()
    } 
}

async function disposeItem(e) {
    e.preventDefault()
    const searchContents = document.getElementsByName("search_bar")[0].value
    try {
        const response = await fetch(`http://localhost:3000/object/search/${searchContents}`)
        if(response.status == 404) {
            alert("Error: this is an unrecognised item.")
        } else {
            const searchItem = await response.json()
            checkIfTheyMeanIt(searchItem)
        }
    } catch(e){
        console.log(e)
    }
}

async function checkIfTheyMeanIt(itemData) {
    console.log(itemData)
    const popUpContainer = document.createElement("div")
    popUpContainer.setAttribute("name", "pop_up_container")

    const popUp = document.createElement("div")
    popUp.setAttribute("name", "pop_up")

    const areYouSure = document.createElement("p")
    areYouSure.setAttribute("name", "title_popup")
    areYouSure.textContent = "Are You Sure?"

    const moralCheck = document.createElement("p")
    moralCheck.setAttribute("name", "body")
    moralCheck.id = "form_label_popup"
    moralCheck.textContent = `By clicking 'Confirm' you confirm you disposed of this '${itemData[0].name.toLowerCase()}' correctly.`

    const backButton = document.createElement("button")
    backButton.name = "back_button_popup"
    backButton.textContent = "Back"
    backButton.id = "defirm_button"
    backButton.addEventListener("click", deletePopUp)

    const confirmButton = document.createElement("button")
    confirmButton.name = "confirm_button_popup"
    confirmButton.textContent = "Confirm"
    confirmButton.id = "confirm_button"
    confirmButton.addEventListener("click", submitItem)

    const buttonSection = document.createElement("div")
    buttonSection.setAttribute("name", "popup_buttons")
    buttonSection.appendChild(confirmButton)
    buttonSection.appendChild(backButton)
    

    popUp.appendChild(areYouSure)
    popUp.appendChild(moralCheck)
    popUp.appendChild(buttonSection)
    popUpContainer.appendChild(popUp)

    const body = document.querySelector('body')
    body.appendChild(popUpContainer)
}

const deletePopUp = () => {
    const element = document.getElementsByName('pop_up_container')[0]
    element.remove()
}

async function submitItem(e) {
    e.preventDefault()
    const username = [...new URLSearchParams(window.location.search).values()][0]
    try {
        const response = await fetch(`http://localhost:3000/users/username/${username}`)
        if(response.ok){
            data = await response.json()
            let currentPoints = parseInt(data.points)
            currentPoints++
            let pointsObject = {
                points: currentPoints
            }
            const options = {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pointsObject)
            }

            const updateRes = await fetch(`http://localhost:3000/users/points/${username}`, options) 
            const updateData = await updateRes.json()

            if(updateRes.status == 200) {
                let popUp = document.getElementsByName('pop_up_container')[0]
                popUp.remove()
                let binText = document.getElementsByName("which_bin_text")[0]
                binText.remove()
                const pointsButton = document.getElementsByName("points_button")[0]
                pointsButton.textContent = `Points: ${currentPoints}`
                document.getElementsByName("recycling_form")[0].search_bar.value = ""
                alert("Thank you for correctly disposing of your waste! You have gained a point.")  
            }
        }    
    } catch(e) {
        console.log(e)
    }
}



const bulkyWasteButton = document.getElementsByName("BulkyWaste")[0]
bulkyWasteButton.addEventListener("click", openBulkyWastePopup)

async function openBulkyWastePopup() {
    const bulkyWasteMenuContainer = document.createElement("div")
    bulkyWasteMenuContainer.id = "bulky_waste_menu_container"

    const bulkyWasteMenu = document.createElement("main")
    bulkyWasteMenu.id = "bulky_waste_menu"
    bulkyWasteMenuContainer.appendChild(bulkyWasteMenu)

    const backButton = document.createElement("button")
    backButton.textContent = "Back"
    backButton.name = "back_button"
    backButton.addEventListener("click", returnHome2)
    bulkyWasteMenu.appendChild(backButton)

    const bulkyWasteForm = document.createElement("form")
    bulkyWasteForm.name = "bulky_waste_form"
    bulkyWasteForm.addEventListener("submit", makeAppointment)
    bulkyWasteForm.addEventListener('keypress', function(e) {
        if (e.keyCode === 13) {
          e.preventDefault();
        }
      });
    

    const title = document.createElement("p")
    title.setAttribute("name", "title")
    title.textContent = "Book a collection for bulky waste"
    bulkyWasteMenu.appendChild(title)

    const itemLabel = document.createElement("label")
    itemLabel.setAttribute("name", "item_label")
    itemLabel.textContent = "What item do you want to have collected?"
    itemLabel.setAttribute("id", "form_label")
    bulkyWasteForm.appendChild(itemLabel)

    const itemInput = document.createElement("input")
    itemInput.type = "text"
    itemInput.placeholder = "fridge"
    itemInput.name = "item_input"
    itemInput.setAttribute("id", "text_input")
    itemInput.addEventListener('blur', checkFormFull)
    bulkyWasteForm.appendChild(itemInput)

    const weightFormSection = document.createElement("div")
    weightFormSection.setAttribute("name", "weight_form_section")

    const weightLabel = document.createElement("label")
    weightLabel.setAttribute("name", "weight_label")
    weightLabel.textContent = `How heavy is the item? (kg)`
    weightLabel.setAttribute("id", "form_label")
    weightFormSection.appendChild(weightLabel)
    
    const weights = [30, 60, 100, 101]
    for(let i = 0; i<weights.length-1; i++) {
        const weightDiv = document.createElement("div")
        weightDiv.setAttribute("name", `${weights[i]}_radio_container`)

        const weightInput = document.createElement("input")
        weightInput.type = "radio"
        weightInput.name = `weight_input`
        weightInput.value = `${weights[i]}`
        weightInput.addEventListener('click', checkFormFull)

        const weightLabel = document.createElement("label")
        weightLabel.setAttribute("name", `${weights[i]}_label`)
        weightLabel.textContent = `<${weights[i]}`
        weightLabel.setAttribute("for", `${weights[i]}`)

        weightDiv.appendChild(weightInput)
        weightDiv.appendChild(weightLabel)
        weightFormSection.appendChild(weightDiv)
    }
    
    const weightDiv = document.createElement("div")
    weightDiv.setAttribute("name", `${weights[3]}_radio_container`)

    const weightInput = document.createElement("input")
    weightInput.type = "radio"
    weightInput.name = `weight_input`
    weightInput.value = `${weights[3]}`
    weightInput.addEventListener('click', checkFormFull)

    const weightLabel2 = document.createElement("label")
    weightLabel2.setAttribute("name", `${weights[3]}_label`)
    weightLabel2.textContent = `>100`
    weightLabel2.setAttribute("for", `${weights[3]}`)
    weightDiv.appendChild(weightInput)
    weightDiv.appendChild(weightLabel2)
    weightFormSection.appendChild(weightDiv)

    bulkyWasteForm.appendChild(weightFormSection)

    const dateFormSection = document.createElement("div")
    dateFormSection.setAttribute("name", "date_form_section")

    const dateLabel = document.createElement("label")
    dateLabel.setAttribute("name", "date_label")
    dateLabel.setAttribute("id", "form_label")
    dateLabel.textContent = `When would you like it collected?`
    dateFormSection.appendChild(dateLabel)

    let weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    for(let i = 0; i<weekdays.length; i++) {
        const weekdayDiv = document.createElement("div")
        weekdayDiv.setAttribute("name", `${weekdays[i]}_radio_container`)

        const dateInput = document.createElement("input")
        dateInput.type = "radio"
        dateInput.name = `date_input`
        dateInput.value = `${weekdays[i]}`
        dateInput.addEventListener('click', checkFormFull)

        const weekdayLabel = document.createElement("label")
        weekdayLabel.setAttribute("name", `${weekdays[i]}_label`)
        weekdayLabel.textContent = `${weekdays[i]}`
        weekdayLabel.setAttribute("for", `${weekdays[i]}`)

        weekdayDiv.appendChild(dateInput)
        weekdayDiv.appendChild(weekdayLabel)
        dateFormSection.appendChild(weekdayDiv)
    }

    bulkyWasteForm.appendChild(dateFormSection)


    const bulkyWasteSubmit = document.createElement("button")
    bulkyWasteSubmit.name = "bulky_waste_submit_button"
    bulkyWasteSubmit.setAttribute("id", "confirm_button_settings")
    bulkyWasteSubmit.textContent = "Book Collection"
    bulkyWasteForm.appendChild(bulkyWasteSubmit)
    
    bulkyWasteMenu.appendChild(bulkyWasteForm)

    const body = document.querySelector('body')
    body.appendChild(bulkyWasteMenuContainer)
}

async function checkFormFull() {
    if(document.getElementsByName("bulky_waste_form")[0].item_input.value != "" && document.getElementsByName("bulky_waste_form")[0].weight_input.value != "" && document.getElementsByName("bulky_waste_form")[0].date_input.value != "") {
        try {
            const rawPriceData = await fetch(`http://localhost:3000/collectBulkyWaste/weight/${document.getElementsByName("bulky_waste_form")[0].weight_input.value}`)
            if (rawPriceData.ok){
                const priceData = await rawPriceData.json()
                if(document.getElementsByName("cost_text").length == 0){
                    const costText = document.createElement("p")
                    costText.setAttribute("name", "cost_text")
                    costText.textContent = `This will cost £${priceData.price} to collect.`
                    document.getElementsByName("bulky_waste_form")[0].appendChild(costText)
                } else if(document.getElementsByName("cost_text").length == 1) {
                    let costText = document.getElementsByName("cost_text")[0]
                    costText.textContent = `This will cost £${priceData.price} to collect.`
                } else {
                    console.log("This is getting out of hand, now there are two of them!")
                }
            }  
        } catch(e) {
            console.log(e)
        } 
    }
}

const returnHome2 = () => {
    const element = document.getElementById("bulky_waste_menu_container")
    element.remove()
}

async function makeAppointment(e) {
    e.preventDefault()
    console.log(e.target.date_input.value)
    try {
        const rawWeekdayData = await fetch(`http://localhost:3000/weekday/weekday/${e.target.date_input.value}`)
        if(rawWeekdayData.ok) {
            const weekdayData = await rawWeekdayData.json()
            const appointmentData = {
                user_id: localStorage.getItem("id"),
                object_name: e.target.item_input.value,
                weekday_id: weekdayData.id,
                weight_kg: e.target.weight_input.value
            }
            
            const options = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(appointmentData)
            }
        
            const response = await fetch("http://localhost:3000/appointment", options)
            const data = await response.json()
        
            if(response.status == 201) {
                document.getElementsByName("bulky_waste_form")[0].reset() 
                document.getElementsByName("cost_text")[0].remove()
                alert("Appointment successfully created")
            } else {
                alert(data.error)
            }
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

const settingsButton = document.getElementsByName("Settings")[0]
settingsButton.addEventListener("click", loadUserSettings)

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

const howTo = document.getElementsByName("How")[0]
howTo.addEventListener("click", openHowTo)

async function openHowTo(e) {
    e.preventDefault()
    const popUpContainer = document.createElement("div")
    popUpContainer.setAttribute("name", "pop_up_container")

    const popUp = document.createElement("div")
    popUp.setAttribute("name", "pop_up_howto")

    const areYouSure = document.createElement("p")
    areYouSure.setAttribute("name", "title_popup_howto")
    areYouSure.textContent = "How To Use Site"

    const list = document.createElement("ul")
    list.setAttribute("name", "list")

    const popUpText = document.createElement("li")
    popUpText.setAttribute("name", "body")
    popUpText.id = "form_label_popup"
    popUpText.textContent = `Click the "Wastewise" button to find out what to do with an item.`

    const popUpText2 = document.createElement("li")
    popUpText2.setAttribute("name", "body")
    popUpText2.id = "form_label_popup"
    popUpText2.textContent = `Click the "Bulky Waste" button to book an appointment for a collection of a large item.`

    const popUpText3 = document.createElement("li")
    popUpText3.setAttribute("name", "body")
    popUpText3.id = "form_label_popup"
    popUpText3.textContent = `Hover over your name in the top right corner to access extra features such as; settings, view your points and logout.`


    list.appendChild(popUpText)
    list.appendChild(popUpText2)
    list.appendChild(popUpText3)

    const backButton = document.createElement("button")
    backButton.name = "back_button_popup"
    backButton.textContent = "Back"
    backButton.id = "defirm_button"
    backButton.setAttribute("class","back_button_howto")
    backButton.addEventListener("click", deletePopUp)

    

    const buttonSection = document.createElement("div")
    buttonSection.setAttribute("name", "popup_buttons")
    //buttonSection.appendChild(backButton)
    

    popUp.appendChild(areYouSure)
    popUp.appendChild(list)
    popUp.appendChild(backButton)
    popUpContainer.appendChild(popUp)

    const body = document.querySelector('body')
    body.appendChild(popUpContainer)
}
