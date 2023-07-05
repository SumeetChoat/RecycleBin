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
            setUpPage(userData)
        }
    } catch(e) {
        console.log(e)
    }
}

async function setUpPage(userData) {
    userAddressId = userData.address_id
    let isAdmin = userData.isAdmin
    try {
        const data = await fetch(`http://localhost:3000/address/${userAddressId}`)
        if (data.ok) {
            addressData = await data.json()
            zoneId = addressData.zone_id
            try {
                const zoneData = await fetch(`http://localhost:3000/collectDay/zone/${zoneId}`)
                if(zoneData.ok) {
                    collectionDayData = await zoneData.json()
                    displayBins(collectionDayData)
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
        
        const buttonsDiv = document.getElementsByName("main_buttons")[0]
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
    binInfo.textContent = `Your bins will be collected on ${weekday}.`
    binCollectionBox.appendChild(binInfo)

    const binImg = document.createElement("img")
    binImg.alt = `${bin}`
    binImg.src = `./assets/images/${bin}.png`
    binImg.id = "bin_img"
    binCollectionBox.appendChild(binImg)

    const binFlorin = document.getElementById("bin_and_user")
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

    const searchBar = document.createElement("input")
    searchBar.type = "text"
    searchBar.placeholder = "Search..."
    searchBar.name = "search_bar"
    searchBar.addEventListener('keyup', obtainRecycleItems)
    searchBar.addEventListener('focus', resetForm)

    const disposeButton = document.createElement("button")
    disposeButton.textContent = "WasteWise this item"
    disposeButton.value = "submit"
    disposeButton.name = "dispose_button"
    recyclingForm.addEventListener("submit", disposeItem)

    const dropdownSection = document.createElement("div")
    dropdownSection.setAttribute("name", "dropdown_section")
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
                    dropdownOption.id = searchItems[i].object_id
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
    let id = e.target.id
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
    areYouSure.setAttribute("name", "title")
    areYouSure.textContent = "Are You Sure?"

    const moralCheck = document.createElement("p")
    moralCheck.setAttribute("name", "body")
    moralCheck.textContent = `By clicking 'Confirm' you confirm you disposed of this '${itemData[0].name.toLowerCase()}' correctly.`

    const backButton = document.createElement("button")
    backButton.name = "back_button_popup"
    backButton.textContent = "Back"
    backButton.addEventListener("click", deletePopUp)

    const confirmButton = document.createElement("button")
    confirmButton.name = "confirm_button_popup"
    confirmButton.textContent = "Confirm"
    confirmButton.addEventListener("click", submitItem)

    const buttonSection = document.createElement("div")
    buttonSection.setAttribute("name", "popup_buttons")
    buttonSection.appendChild(backButton)
    buttonSection.appendChild(confirmButton)

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
                document.getElementsByName("recycling_form")[0].search_bar.value = ""
                alert("Thank you for correctly disposing of your waste!")  
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

    const title = document.createElement("p")
    title.setAttribute("name", "title")
    title.textContent = "Book a collection for bulky waste"
    bulkyWasteForm.appendChild(title)

    const itemLabel = document.createElement("label")
    itemLabel.setAttribute("name", "item_label")
    itemLabel.textContent = "What item do you want to have collected?"
    bulkyWasteForm.appendChild(itemLabel)

    const itemInput = document.createElement("input")
    itemInput.type = "text"
    itemInput.placeholder = "fridge"
    itemInput.name = "item_input"
    bulkyWasteForm.appendChild(itemInput)

    const weightLabel = document.createElement("label")
    weightLabel.setAttribute("name", "weight_label")
    weightLabel.textContent = `How heavy is the item? (kg)`
    bulkyWasteForm.appendChild(weightLabel)

    const weightInput = document.createElement("input")
    weightInput.type = "text"
    weightInput.placeholder = "80"
    weightInput.name = "weight_input"
    bulkyWasteForm.appendChild(weightInput)

    const dateLabel = document.createElement("label")
    dateLabel.setAttribute("name", "weight_label")
    dateLabel.textContent = `When would you like it collected?`
    bulkyWasteForm.appendChild(dateLabel)

    const dateInput = document.createElement("input")
    dateInput.type = "text"
    dateInput.placeholder = "wednesday"
    dateInput.name = "date_input"
    bulkyWasteForm.appendChild(dateInput)

    

    bulkyWasteMenu.appendChild(bulkyWasteForm)

    const body = document.querySelector('body')
    body.appendChild(bulkyWasteMenuContainer)

}

const returnHome2 = () => {
    const element = document.getElementById("bulky_waste_menu_container")
    element.remove()
}