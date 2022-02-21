// Objects :
// get total ✔
// create product ✔
// save localstorage ✔
// clear inputs ✔
// read ✔
// delete ✔
// count ✔
// update ✔
// search ✔ [contain a beug]
// clean data ✔ [contain a beug when the product created (manual refresh)]


let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let btn = 'create';
let tmp;

// get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = 'red';
    }
}

let dataPro;
// create product
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}

// collecting data
submit.onclick = function() {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value == '' || price.value == '' || count.value == '' || category.value == '') {
        alert("please fill the required fields")
        title.style.backgroundColor = "#ff000045";
        price.style.backgroundColor = "#ff000045";
        count.style.backgroundColor = "#ff000045";
        category.style.backgroundColor = "#ff000045";
        resetColor();

    } else {
        if (btn === 'create') { //count
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }

            } else {
                dataPro.push(newPro);
                clearData();
            }
        } else {
            dataPro[tmp] = newPro;
            btn = 'create';
            submit.innerHTML = "create";
            count.style.display = "block";

        }

    }

    function resetColor() {
        title.addEventListener('click', function() {
            title.style.backgroundColor = "#111";
        });
        price.addEventListener('click', function() {
            price.style.backgroundColor = "#111";
        });
        count.addEventListener('click', function() {
            count.style.backgroundColor = "#111";
        });
        category.addEventListener('click', function() {
            category.style.backgroundColor = "#111";
        });

    }

    // storing data in local storage & handling 
    localStorage.setItem('product', JSON.stringify(dataPro))
    clearData()
    showData()
}


// clear inputs
function clearData() {
    if (title.value || price.value || count.value || category.value != '') {
        return (value);
    } else {
        title.value = '';
        price.value = '';
        taxes.value = '';
        ads.value = '';
        discount.value = '';
        total.innerHTML = '';
        count.value = '';
        category.value = '';
    }
}


// read
function showData() {
    getTotal()
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
        </tr>
        `
        if (dataPro[i].title < 0) {
            alert("error");
        }
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete All (${dataPro.length})</button>
        `
    } else {
        btnDelete.innerHTML = '';
    }

}
showData()


// delete
function deletedata(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    showData()
}


// update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = "none";
    category.value = dataPro[i].category;
    submit.innerHTML = "update";
    btn = 'update';
    tmp = i;
    scroll({
        top: 0
    })
}


// search
let searchMood = 'title';

function getSearchBtn(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title';
        search.placeholder = 'search By Title';
    } else {
        searchMood = 'category';
        search.placeholder = 'search By Category';
    }
    search.focus()
}

function searchData(value) {
    let table = ' ';
    if (searchMood == 'title') {


        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value)) {
                console.log(dataPro[i].title)
                for (let i = 0; i < dataPro.length; i++) {
                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                    </tr>
                    `;
                }
            }
        }

    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
                for (let i = 0; i < dataPro.length; i++) {
                    table += `
                 <tr>
                     <td>${i}</td>
                     <td>${dataPro[i].title}</td>
                     <td>${dataPro[i].price}</td>
                     <td>${dataPro[i].taxes}</td>
                     <td>${dataPro[i].ads}</td>
                     <td>${dataPro[i].discount}</td>
                     <td>${dataPro[i].total}</td>
                     <td>${dataPro[i].category}</td>
                     <td><button onclick="updateData(${i})" id="update">update</button></td>
                     <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                 </tr>
                 `;


                }
            }
        }

    }
    document.getElementById('tbody').innerHTML = table;
}