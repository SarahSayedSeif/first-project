
var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDesc = document.getElementById('productDesc');

var tableBody = document.getElementById('tableBody');

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

// // localStorage.setItem("userName","Ali")

function addProduct() {
    var product= {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDesc.value,
     }
    productContainer.push(product)
    localStorage.setItem('myProuducts',JSON.stringify(productContainer) ) 
    clearForm();
    displayProducts(productContainer);
}

// // to save date in localStorage to keep it there
//     // JSON.stringify() to convert the object to string because json accept string only
    
function clearForm() {

    productName.value=""
    productPrice.value=""
    productCategory.value=""
    productDesc.value=""
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
        <td><button class="btn btn-sm btn-outline-warning">update</button></td>
        <td><button class="btn btn-sm btn-outline-danger">delete</button></td>
      
        </tr>`
    }
     document.getElementById('tableBody').innerHTML =cartoona;

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

function deletedProduct(deletedIndex) {
    productContainer.splice(deletedIndex, 1);
    displayProducts(productContainer);
}

deletedProduct(1);

