const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const sort = document.getElementById("sort")

const tbl = document.getElementById("tblNumbers");

let total = 0;
let numbersArr = [];

function insertNumber() {
    const txtNumber = document.getElementById("txtNum").value;
    let num;
    let regex = /^[0-9]+$/;

    if(txtNumber.match(regex)){
        num = parseInt(txtNumber);
        numbersArr.push(num);
        document.getElementById("txtNum").value = "";
    } else {
        alert("Please input a positive number");
        document.getElementById("txtNum").value = "";
        return;
    }

    iterateNumbers();
}

btn1.addEventListener("click", insertNumber);

document.getElementById("txtNum").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        insertNumber();
    }
});

btn2.addEventListener("click", () => {
    document.getElementById("txtNum").value = "";
});

btn3.addEventListener("click", () => {
    numbersArr = [];
    total = 0;

    while(tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    document.getElementById("btn4").style.display = "none";
    document.getElementById("btn5").style.display = "none";
});

// Function to display the TOTAL sum
function displayTotal() {
    if (numbersArr.length === 0) {
        alert("No numbers to sum.");
        return;
    }

    total = numbersArr.reduce((acc, num) => acc + num, 0);

    // Remove previous Total row if exists
    let existingTotalRow = document.getElementById("totalRow");
    if (existingTotalRow) tbl.removeChild(existingTotalRow);

    // Create new row for total
    const trTotal = document.createElement("tr");
    trTotal.id = "totalRow";

    const tdTotalLabel = document.createElement("td");
    tdTotalLabel.style.fontWeight = "bold";
    tdTotalLabel.innerHTML = "TOTAL";

    const tdTotalValue = document.createElement("td");
    tdTotalValue.style.textDecoration = "underline";
    tdTotalValue.innerHTML = total;

    trTotal.appendChild(tdTotalLabel);
    trTotal.appendChild(tdTotalValue);
    tbl.appendChild(trTotal);
}

btn4.addEventListener("click", displayTotal);

// Function to find and display highest and lowest numbers
function findHighLowNumbers() {
    if (numbersArr.length === 0) {
        alert("No numbers to analyze.");
        return;
    }

    let highest = numbersArr[0];
    let lowest = numbersArr[0];

    for (let i = 1; i < numbersArr.length; i++) {
        if (numbersArr[i] > highest) {
            highest = numbersArr[i];
        }
        if (numbersArr[i] < lowest) {
            lowest = numbersArr[i];
        }
    }

    let existingHighRow = document.getElementById("highRow");
    let existingLowRow = document.getElementById("lowRow");
    
    if (existingHighRow) tbl.removeChild(existingHighRow);
    if (existingLowRow) tbl.removeChild(existingLowRow);

    const trHigh = document.createElement("tr");
    trHigh.id = "highRow";

    const tdHighLabel = document.createElement("td");
    tdHighLabel.style.fontWeight = "bold";
    tdHighLabel.innerHTML = "Highest: ";

    const tdHighValue = document.createElement("td");
    tdHighValue.innerHTML = highest;

    trHigh.appendChild(tdHighLabel);
    trHigh.appendChild(tdHighValue);
    tbl.appendChild(trHigh);

    const trLow = document.createElement("tr");
    trLow.id = "lowRow";

    const tdLowLabel = document.createElement("td");
    tdLowLabel.style.fontWeight = "bold";
    tdLowLabel.innerHTML = "Lowest: ";

    const tdLowValue = document.createElement("td");
    tdLowValue.innerHTML = lowest;

    trLow.appendChild(tdLowLabel);
    trLow.appendChild(tdLowValue);
    tbl.appendChild(trLow);
}


btn5.addEventListener("click", findHighLowNumbers);

function deleteNumber(i) {
    numbersArr.splice(i,1);
    iterateNumbers();
}

function sortNumbers() {
    let sortOrder = document.getElementById("sortOrder").value;
    
    if (sortOrder === "asc") {
        numbersArr.sort((a, b) => a - b);
    } else if (sortOrder === "desc") {
        numbersArr.sort((a, b) => b - a);
    }
    iterateNumbers();
}

function editNumber(i) {
    if (i < 0 || i >= numbersArr.length) {
        alert("Invalid index.");
        return;
    }

    const editTxt = prompt("Enter new number:", numbersArr[i]);

    if (editTxt === null || editTxt.trim() === "") {
        alert("You did not input a new value!");
        return;
    }

    const regex = /^[0-9]+$/;
    if (!regex.test(editTxt)) {
        alert("You did not input a valid number!");
        return;
    }

    numbersArr[i] = parseInt(editTxt);
    iterateNumbers();  // Refresh table after editing
}


function iterateNumbers() {
    while(tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    if(numbersArr.length > 0) {
        total = 0;

        for(let i = 0; i < numbersArr.length; i++) {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const btnDelete = document.createElement("button");
            const btnEdit = document.createElement("button");

            td1.style.width = "70px";
            td1.innerHTML = numbersArr[i];

            td2.style.width = "70px";
            td2.style.color = (numbersArr[i] % 2 === 0) ? "green" : "blue";
            td2.innerHTML = (numbersArr[i] % 2 === 0) ? "EVEN" : "ODD";

            btnDelete.setAttribute("onclick", `deleteNumber(${i})`);
            btnDelete.innerHTML = "Remove"; 

            btnEdit.setAttribute("onclick", `editNumber(${i})`);
            btnEdit.innerHTML = "Edit";

            td3.appendChild(btnDelete);
            td4.appendChild(btnEdit);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            tbl.appendChild(tr);
            
            document.getElementById("btn4").style.display = "inline";
            document.getElementById("btn5").style.display = "inline";
            document.getElementById("sort").style.display = "inline";
            
            total += numbersArr[i];
        }
    } else {
        total = 0;
        document.getElementById("btn4").style.display = "none";
        document.getElementById("btn5").style.display = "none";
        document.getElementById("sort").style.display = "none";
    }
} 
