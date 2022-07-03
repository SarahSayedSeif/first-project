
var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDesc = document.getElementById('productDesc');
var tableBody = document.getElementById('tableBody');
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');

var productContainer ;

if(localStorage.getItem("myProducts") != null)
{

    productContainer = JSON.parse(localStorage.getItem("myProducts") )    // to convert string to array JSON.parse()
    displayProducts(productContainer);
}
else
{
    productContainer = [];
}


function addProducts() {
    
    if(validateProductName()== true && validateProductPrice()== true)
    {
        var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value
    }
    productContainer.push(product);
    localStorage.setItem('myProducts' ,JSON.stringify(productContainer))
    clearForm();
    displayProducts(productContainer);
    }
    else
    {
        alert('productName invalid')
    }

}

// // to save date in localStorage to keep it there
//     // JSON.stringify() to convert the object to string because json accept string only
    
function clearForm() {

    productName.value="";
    productPrice.value="";
    productCategory.value="";
    productDesc.value="";
}

function displayProducts(productList)
{
    var cartoona= ``;
    
    for (var i = 0 ;i <productList.legnth ;i++)
    {
        cartoona +=`<tr>
        <td>${i}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].desc}</td>
        <td><button onclick="updatedProducts(${i})" class="btn  btn-sm btn-outline-warning">update</button></td>
        <td><button onclick="deletedProducts(${i})"  class="btn  btn-sm btn-outline-danger">delete</button></td>
      
        </tr>`
    }
     tableBody.innerHTML =cartoona;

}


function searchProduct(searchTerm)
{
    var searchResult = [];

    for (var i = 0; i < productContainer.length; i++) {
        
        if(productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true)
        {
            searchResult.push(productContainer[i]);
        }
    }
    displayProducts(searchResult);
}


function deletedProducts(deletedIndex) {
    productContainer.splice(deletedIndex, 1);
    localStorage.setItem('myProducts' ,JSON.stringify(productContainer))

    displayProducts(productContainer);
}

function updatedProducts(updatedIndex) {

    productNameInput.value = productContainer[updatedIndex].name;
    productPriceInput.value = productContainer[updatedIndex].price;
    productCategoryInput.value = productContainer[updatedIndex].category;
    productDescriptionInput.value = productContainer[updatedIndex].description;

    addBtn.innerHTML= 'upDate'
}


var list = 0;

function edit() {

    productContainer[list].name = productNameInput.value,
    productContainer[list].price = productPriceInput.value,
    productContainer[list].category = productCategoryInput.value,
    productContainer[list].description = productDescriptionInput.value,
    
        localStorage.setItem('myProducts', JSON.stringify(productContainer))
        displayProducts(productContainer)

}


function add() {
    if (addBtn.innerHTML == 'upDate') {

        edit();
        clearForm();
    }
    else {
        addProducts();
    }
}

function validateProductName() {
    
    var regexa = /^[A-Z][a-z]{3,8}$/;
    if (regexa.test(productNameInput.value) == true) {
        productNameInput.classList.replace('is-invalid' , 'is-valid');
        return true;
    }
    else {
        productNameInput.classList.add('is-invalid')
        return false;
    }
}


function validateProductPrice() {
    
    var regex = /^[0-9]{1,5}$/;
    if (regex.test(productPriceInput.value) == true)
    {
        productPriceInput.classList.replace('is-invalid' , 'is-valid');
        return true;
    }
    else {
        productPriceInput.classList.add('is-invalid')
        return false;
    }
}

