// Add FireBase Credentials in firebaseConfig

firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

const docRef = firestore.doc("samples/sandwitchData");

const header = document.querySelector("#outputHeader");
const inputTxt = document.querySelector("#inputtxt");
const save = document.querySelector("#save");
const load = document.querySelector("#load");

save.addEventListener('click', () => {
    const textToSave = inputTxt.value;
    docRef.set({
        hotDogStatus: textToSave
    }).then(() => {
        console.log("status Saved");
    }).catch((err) => {
        console.log(err);
    })
	inputTxt.value = "";
});

load.addEventListener('click', () => {
    docRef.get().then((doc) => {
        if (doc && doc.exists) {
            const myData = doc.data();
            header.innerText = "Hot Dog Status: " + myData.hotDogStatus;
        }
    }).catch((err) => {
        console.log(err);
    });
});

getRealTimeUpdates = () => {
    docRef.onSnapshot((doc) => {
        if (doc && doc.exists) {
            const myData = doc.data();
            header.innerText = "Hot Dog Status: " + myData.hotDogStatus;
        }
    })
}
getRealTimeUpdates();