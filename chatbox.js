//Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getDatabase,onChildAdded, onValue, ref, set,get,child,update,remove   } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
// Boilerplate Variables
const firebaseConfig = {
    apiKey: "AIzaSyDYX_NMg1hCxCFaiEAN7-kdFHDqmVzNjq0",
    authDomain: "sixsevenium.firebaseapp.com",
    databaseURL: "https://sixsevenium-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sixsevenium",
    storageBucket: "sixsevenium.firebasestorage.app",
    messagingSenderId: "38443970080",
    appId: "1:38443970080:web:e35a1b03d514a452d5d645",
    measurementId: "G-VVEJ9FPN1L"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
/*When you type messageEl, then press enterBtn
  messageEl.value += the Database(With values of name, message, and order)
  and then, The Database will update the chatbox to be respected to the order, message, and name.
  So it just recreates it all(no need for a  redesign),
  Then it will update the chatbox DISPLAY(after we made the chatbox concept)
  for order, use time.
*/ 
const randNum = Math.random()*100
let messageEl = document.querySelector(".msgBar")// ADD .value TO THE END TO EXTRACT VALUES
let enterBtn = document.querySelector('.enter') // When this is clicked, it should add messageEl.value to chatbox in the Form
var chatbox = document.querySelector('.chatbox') // Where you put the messageEl.value
let namebar = document.querySelector('.nameBar')



//Functions for Adding, Returning and Deleting
function addData(name, message) {
  let currTime = new Date().getTime()
    let dbRef = ref(db, 'chatbox/'+ currTime );// Must make title 001,002,003,004,005, until so on basically.
    set(dbRef, {//                            but better use Timestamp so it's Absolute.
        username: name,
        message: message,
        time:`${new Date(new Date().getTime())}` ,
    })
}



function addItemsToList(name,message){
    var chatboxFunc = chatbox
   

    var nameNMsg = document.createElement('p');
    nameNMsg.classList.add('chat')
    

    nameNMsg.innerHTML = `${name} : ${message}`
    
    
    chatboxFunc.prepend(nameNMsg);
}

function FetchAllData() {
    const userId = "testUser"; // TEMP for testing
    const dbRef = ref(db, 'chatbox');

    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();

                addItemsToList(
                    data.username,
                    data.message,
                );
            });
        } else {
            
        }
    }).catch(err => console.error(err));
}

document.querySelector(".enter").addEventListener('click', ()=>{
  addData(namebar.value || "Anonymous" ,messageEl.value)
})
document.addEventListener('keydown', (event)=>{
    if(event.key ==='Enter'){
        event.preventDefault();
        console.log("key pressed")
        addData(namebar.value || "Anonymous" ,messageEl.value)
    }
} )
const dataRef = ref(db, "chatbox");
chatbox.innerHTML=''
FetchAllData()


let initialLoad = true;

onChildAdded(dataRef, (snapshot) => {
    if (initialLoad) return; // ignore history

    
    console.log("NEW DATA ADDED:", snapshot.key, snapshot.val());
    chatbox.innerHTML = '';FetchAllData()
;
});

onValue(dataRef, () => {
    initialLoad = false;
}, { onlyOnce: true }); 




