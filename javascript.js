import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



const appsettings = {
    databaseURL: "https://add-to-cart-3c1af-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appsettings) 
const database = getDatabase(app)
const shopppinglistindb = ref(database, "shoppingList")

const inputfieldel = document.getElementById("input-field")
const addbuttonel = document.getElementById("add-button")
const shoppinglistel = document.getElementById("shopping-list")


addbuttonel.addEventListener("click", function(){
    let inputValue = inputfieldel.value

    push(shopppinglistindb, inputValue)
    

    
    inputfieldel.value = " "
     
    
} )


onValue(shopppinglistindb, function(snapshot){
    if (snapshot.exists()) {
        let array = Object.entries(snapshot.val())

        clearshoppingListEl ()
        
        
        for (let i = 0; i<array.length; i++){
            let currentitem = array[i]
            let currentItemId = currentitem[0]
            let currentItemValue = currentitem[1]

            appenditemstoshopinglistel(currentitem)
        }
    }
    else{
        shoppinglistel.innerHTML = "No items here....yet"
    }
})
function clearshoppingListEl (){
    shoppinglistel.innerHTML = ""
}







function appenditemstoshopinglistel(item){
    

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent =  itemValue

    
    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
        
        
    })


    shoppinglistel.append(newEl)


}
