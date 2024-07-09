// Global variables for DOM elements
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let deleteAll = document.getElementById("deleteAll");

// Function to calculate total
function getTotal() {
  if (price.value !== "") {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
  }
}

// Attach event listeners to input fields
price.addEventListener("input", getTotal);
taxes.addEventListener("input", getTotal);
ads.addEventListener("input", getTotal);
discount.addEventListener("input", getTotal);

// Initialize data from localStorage or empty array
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

// Function to handle form submission (both adding and updating products)
submit.onclick = function() {
  if (submit.dataset.mode === "add") {
    // Add new product
    let newPro = {
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value,
    };

    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else if (submit.dataset.mode === "update") {
    // Update existing product
    let updatedPro = {
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value,
    };

    let index = parseInt(submit.dataset.index); // Get index from dataset
    dataPro[index] = updatedPro;
  }

  localStorage.setItem("product", JSON.stringify(dataPro));
  clearData();
  showData();
};

// Function to clear form fields
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  submit.dataset.mode = "add"; // Reset submit button mode to "add"
  submit.innerHTML = "Add Product"; // Reset submit button text
}

// Function to display data in table
function showData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
      <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].count}</td>
        <td><button class="update" onclick="updateProduct(${i})">update</button></td>
        <td><button class="delete" onclick="deleteData(${i})">delete</button></td>
      </tr>`;
  }

  // Display the table content
  document.getElementById("tbody").innerHTML = table;

  // Update button visibility based on dataPro length
  let btnDeleteAll = document.getElementById("deleteAll");
  let btnsUpdate = document.getElementsByClassName("update");
  let btnsDelete = document.getElementsByClassName("delete");

  if (dataPro.length > 0) {
    btnDeleteAll.innerHTML = `<button onclick="deleteAllData()">Delete All</button>`;
    btnDeleteAll.style.display = "block"; // Show "Delete All" button
    for (let btnUpdate of btnsUpdate) {
      btnUpdate.style.display = "inline-block"; // Show update buttons
    }
    for (let btnDelete of btnsDelete) {
      btnDelete.style.display = "inline-block"; // Show delete buttons
    }
  } else {
    btnDeleteAll.innerHTML = ""; // Clear "Delete All" button content
    btnDeleteAll.style.display = "none"; // Hide "Delete All" button
    for (let btnUpdate of btnsUpdate) {
      btnUpdate.style.display = "none"; // Hide update buttons
    }
    for (let btnDelete of btnsDelete) {
      btnDelete.style.display = "none"; // Hide delete buttons
    }
  }
}

// Function to delete all data
function deleteAllData() {
  dataPro = []; // Clear the data array
  localStorage.removeItem("product"); // Remove the data from local storage
  showData(); // Update the UI
}

// Function to delete a single data entry
function deleteData(index) {
  dataPro.splice(index, 1); // Remove item from array
  localStorage.setItem("product", JSON.stringify(dataPro)); // Update local storage
  showData(); // Update the UI
}

// Function to handle updating a product
function updateProduct(index) {
  // Populate the form with the data of the selected product
  let productToUpdate = dataPro[index];
  title.value = productToUpdate.title;
  price.value = productToUpdate.price;
  taxes.value = productToUpdate.taxes;
  ads.value = productToUpdate.ads;
  discount.value = productToUpdate.discount;
  total.innerHTML = productToUpdate.total;
  count.value = productToUpdate.count;
  category.value = productToUpdate.category;

  // Modify the submit button behavior to update the existing product
  submit.dataset.mode = "update"; // Set mode to "update"
  submit.dataset.index = index; // Store index of the product being updated in dataset
  submit.innerHTML = "Update Product"; // Change submit button text
}

// Initialize the display of products

let serchMood = "title";

function getSearchMood(id){
let search = document.getElementById("search");
if (id == "searchTitle"){
      searchMood = "title";
      search.placeholder = "search by title";
}else{
    serchMood = "category";
    search.placeholder = "search by category";
    }
    search.focus();
    search.value = "";
    showData();
}

function searchData(value){
let table = "";
if(serchMood == "title"){

for(let i= 0; i < dataPro.length;i++){

if(dataPro[i].title.tolowerCase().includes(value.tolowerCase)){
    table += `
    <tr>
      <td>${i}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].count}</td>
      <td><button class="update" onclick="updateProduct(${i})">update</button></td>
      <td><button class="delete" onclick="deleteData(${i})">delete</button></td>
    </tr>`;
}

}

}else{

    for(let i= 0; i < dataPro.length;i++){

        if(dataPro[i].category.tolowerCase().includes(value.tolowerCase)){
            table += `
            <tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].count}</td>
              <td><button class="update" onclick="updateProduct(${i})">update</button></td>
              <td><button class="delete" onclick="deleteData(${i})">delete</button></td>
            </tr>`;
        }
        
        }
        

}
document.getElementById("tbody").innerHTML = table;
}

showData();
