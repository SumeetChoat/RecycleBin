const { renderDOM } = require("./helpers")

let dom
let document

describe("FRONTEND", () => {
    
    //INDEX
    describe("index.html", () => {

        beforeEach(async () => {
            dom = await renderDOM("./client/index.html")
            document = await dom.window.document
        })
        
        it("should check if button exists", () => {
            const btn = document.getElementsByName("create_account")
            expect(btn).toBeTruthy
        })

        it("should check if p is empty", () => {
            const p = document.querySelector("p")
            expect(p.innerHTML).toContain("")
        })

        
    })
})
