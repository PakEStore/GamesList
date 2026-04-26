/* script.js FINAL SIMPLE */

const prices = {
320:{portable:6500,internal:5000},
500:{portable:8000,internal:6500},
1000:{portable:18500,internal:16500},
2000:{portable:33500,internal:31500}
};

const freeSpace = {
320:290,
500:450,
1000:930,
2000:1830
};

/* Replace this list with your full games list */
const games = [
{name:"GTA V",size:90},
{name:"RDR2",size:130},
{name:"Resident Evil Village",size:50},
{name:"Watch Dogs 2",size:45},
{name:"Hogwarts Legacy",size:85},
{name:"Spider Man 2",size:135},
{name:"God of War",size:80},
{name:"Tekken 8",size:140}
];

/* Load */

window.onload = function(){
renderGames();
updateAll();
};

/* Show Games */

function renderGames(){

let html = "";

for(let i=0;i<games.length;i++){

html += `
<label class="gameRow">
<span>${games[i].name} - ${games[i].size} GB</span>
<input type="checkbox" value="${i}" onchange="updateAll()">
</label>
`;

}

document.getElementById("gamesList").innerHTML = html;

}

/* Live Update */

function updateAll(){

const storage =
document.getElementById("storage").value;

const variant =
document.getElementById("variant").value;

const price =
prices[storage][variant];

let total = 0;

document.querySelectorAll("#gamesList input").forEach(box=>{

if(box.checked){

total += games[box.value].size;

}

});

const remain =
freeSpace[storage] - total;

document.getElementById("price").innerHTML =
"Price: Rs " + price;

document.getElementById("selectedSize").innerHTML =
"Selected Games Size: " + total + " GB";

document.getElementById("remaining").innerHTML =
"Remaining Space: " + remain + " GB";

}

/* Final Order */

function placeOrder(){

const storage =
document.getElementById("storage").value;

const variant =
document.getElementById("variant").value;

const price =
prices[storage][variant];

let total = 0;
let selectedGames = "";

document.querySelectorAll("#gamesList input").forEach(box=>{

if(box.checked){

total += games[box.value].size;

selectedGames +=
"🎮 " + games[box.value].name +
" (" + games[box.value].size + " GB)%0A";

}

});

if(total === 0){

alert("Please Select Games");
return;

}

if(total > freeSpace[storage]){

alert("Selected HDD Full. Please Choose Bigger HDD");
return;

}

const advance = 500;
const cod = price - advance;

const msg =
"🛒 *NEW ORDER RECEIVED*%0A%0A"+

"💽 HDD Size: " + storage + " GB%0A"+
"📦 Variant: " + variant + "%0A"+
"💰 Total Price: Rs " + price + "%0A%0A"+

"🎮 *Selected Games*%0A"+
selectedGames + "%0A"+

"📊 Total Games Size: " + total + " GB%0A%0A"+

"💵 Advance Payment: Rs " + advance + "%0A"+
"🚚 Remaining Amount: Rs " + cod + " (Cash On Delivery)%0A%0A"+

"🏦 *Payment Details*%0A"+
"Bank Name: Bank Alfalah%0A"+
"Account Title: Pak E Store%0A"+
"Account Number: 02161009500017%0A"+
"IBAN: PK50ALFH0216001009500017";

window.open(
"https://wa.me/923262281245?text=" + msg,
"_blank"
);

}
