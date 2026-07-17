const resourceContainer = document.getElementById("resourceContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

const resourceForm = document.getElementById("resourceForm");
const title = document.getElementById("title");
const description = document.getElementById("description");
const category = document.getElementById("category");

let allResources = [];

let editingId = null;

// ---------------- LOAD RESOURCES ----------------

async function loadResources() {

    resourceContainer.innerHTML = "<h3>Loading Resources...</h3>";

    try {

        const response = await fetch("http://localhost:5000/resources");

        allResources = await response.json();

        categoryFilter.innerHTML =
            `<option value="All">All Categories</option>`;

        populateCategories();

        displayResources(allResources);

        document.getElementById("totalResources").textContent =
    allResources.length;

document.getElementById("totalCategories").textContent =
    new Set(allResources.map(resource => resource.category)).size;

document.getElementById("databaseStatus").textContent =
    "Online";

    }

    catch(error){

    console.log(error);

    resourceContainer.innerHTML =
    "<h3>Unable to connect to backend.</h3>";

}

}

// ---------------- DISPLAY ----------------

function displayResources(resources) {

    resourceContainer.innerHTML = "";

    resources.forEach(resource => {

        resourceContainer.innerHTML += `

<div class="resource-card">

    <h3>${resource.title}</h3>

    <p>${resource.description}</p>

    <div class="category-title">Category</div>

    <span class="category-badge">${resource.category}</span>

    <div class="card-buttons">

        <button onclick="editResource(${resource.id})">Edit</button>

        <button onclick="deleteResource(${resource.id})">Delete</button>

    </div>

</div>

`;

    });

}

// ---------------- CATEGORY ----------------

function populateCategories() {

    const categories = [...new Set(allResources.map(r => r.category))];

    categories.forEach(cat => {

        categoryFilter.innerHTML +=
            `<option value="${cat}">${cat}</option>`;

    });

}

// ---------------- SEARCH ----------------

function filterResources() {

    const search = searchInput.value.toLowerCase();

    const selected = categoryFilter.value;

    const filtered = allResources.filter(resource => {

        const matchesSearch =

            resource.title.toLowerCase().includes(search) ||

            resource.description.toLowerCase().includes(search);

        const matchesCategory =

            selected === "All" ||

            resource.category === selected;

        return matchesSearch && matchesCategory;

    });

    displayResources(filtered);

}

searchInput.addEventListener("input", filterResources);

categoryFilter.addEventListener("change", filterResources);

resourceForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const resourceData = {

        title: title.value,

        description: description.value,

        category: category.value

    };

    if (editingId === null) {

        // ADD NEW RESOURCE

        await fetch("http://localhost:5000/resources", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(resourceData)

        });

        alert("✅ Resource Added Successfully!");

    } else {

        // UPDATE RESOURCE

        await fetch(`http://localhost:5000/resources/${editingId}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(resourceData)

        });

        editingId = null;

        document.querySelector("#resourceForm button").textContent = "Add Resource";

        alert("✏️ Resource Updated Successfully!");

    }

    resourceForm.reset();

    loadResources();

});

async function deleteResource(id){

    if(confirm("Are you sure you want to delete this resource?")){

        await fetch(`http://localhost:5000/resources/${id}`,{

            method:"DELETE"

        });

        loadResources();

        alert("🗑️ Resource Deleted Successfully!");

    }

}

function editResource(id){

    const resource = allResources.find(r => r.id === id);

    if(!resource){
        return;
    }

    title.value = resource.title;
    description.value = resource.description;
    category.value = resource.category;

    editingId = id;

    document.querySelector("#resourceForm button").textContent =
    "Update Resource";

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

loadResources();

async function checkAPI(){

    try{

        await fetch("http://localhost:5000/resources");

        document.getElementById("apiStatus").textContent =
        "🟢 Connected";

    }

    catch{

        document.getElementById("apiStatus").textContent =
        "🔴 Offline";

    }

}

checkAPI();