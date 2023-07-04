window.onload = () => {
    const username = [...new URLSearchParams(window.location.search).values()][0]
    const userButton = document.getElementsByName('UsernameDropdown')[0]
    userButton.textContent = username
    getUserData(username) 
}


async function getUserData(username) {
    try {
        const data = await fetch(`http://localhost:3000/users/username/${username}`)
        if(data.ok){
            const userData = await data.json()
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
                    console.log(collectionDayData)
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
        bin = usefulBinData.bin
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
    recyclingMenu.appendChild(backButton)

    const recyclingForm = document.createElement("form")
    recyclingForm.name = "recycling_form"

    const searchBar = document.createElement("input")
    searchBar.type = "text"
    searchBar.placeholder = "Search..."
    searchBar.name = "search_bar"
    searchBar.addEventListener('keydown', obtainRecycleItems)

    recyclingForm.appendChild(searchBar)
    recyclingMenu.appendChild(recyclingForm)

    const body = document.querySelector('body')
    body.appendChild(recyclingMenuContainer)
}


async function obtainRecycleItems() {
    const searchContents = document.getElementsByName("search_bar")[0].value
    if(searchContents.length>=3){
        try {
            const data = await fetch(`http://localhost:3000/object/input/${searchContents}`)
            if(data.ok) {
                const searchItems = await data.json()
                console.log(searchItems)
            }
        } catch(e){
            console.log(e)
        }
    }
}

