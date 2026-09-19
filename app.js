const API = "https://dummyjson.com/recipes";
const CART_KEY = "tastyTableCart";

const FALLBACK_RECIPES = [
    {
        id: 1,
        name: "Classic Margherita Pizza",
        image: "https://cdn.dummyjson.com/recipe-images/1.webp",
        rating: 4.6,
        cookTimeMinutes: 15,
        prepTimeMinutes: 20,
        tags: ["Pizza", "Italian"],
        ingredients: ["Pizza dough", "Tomato sauce", "Fresh mozzarella", "Basil leaves", "Olive oil"],
        instructions: ["Preheat the oven.", "Spread sauce on the dough.", "Add cheese and basil.", "Bake until golden."]
    },
    {
        id: 2,
        name: "Vegetarian Stir-Fry",
        image: "https://cdn.dummyjson.com/recipe-images/2.webp",
        rating: 4.7,
        cookTimeMinutes: 12,
        prepTimeMinutes: 15,
        tags: ["Vegetarian", "Asian"],
        ingredients: ["Mixed vegetables", "Soy sauce", "Garlic", "Ginger", "Sesame oil"],
        instructions: ["Heat oil in a pan.", "Add garlic and ginger.", "Stir-fry vegetables.", "Finish with soy sauce."]
    },
    {
        id: 3,
        name: "Chocolate Chip Cookies",
        image: "https://cdn.dummyjson.com/recipe-images/3.webp",
        rating: 4.9,
        cookTimeMinutes: 10,
        prepTimeMinutes: 15,
        tags: ["Cookies", "Dessert"],
        ingredients: ["Flour", "Sugar", "Butter", "Chocolate chips", "Egg"],
        instructions: ["Mix the dough.", "Fold in chocolate chips.", "Scoop onto tray.", "Bake until lightly browned."]
    },
    {
        id: 4,
        name: "Chicken Alfredo Pasta",
        image: "https://cdn.dummyjson.com/recipe-images/4.webp",
        rating: 4.8,
        cookTimeMinutes: 20,
        prepTimeMinutes: 10,
        tags: ["Pasta", "Chicken"],
        ingredients: ["Pasta", "Chicken breast", "Cream", "Parmesan", "Garlic"],
        instructions: ["Boil pasta.", "Cook chicken.", "Make creamy sauce.", "Toss pasta with sauce."]
    },
    {
        id: 5,
        name: "Mango Salsa Chicken",
        image: "https://cdn.dummyjson.com/recipe-images/5.webp",
        rating: 4.5,
        cookTimeMinutes: 25,
        prepTimeMinutes: 15,
        tags: ["Chicken", "Mexican"],
        ingredients: ["Chicken", "Mango", "Red onion", "Cilantro", "Lime"],
        instructions: ["Season chicken.", "Cook until done.", "Mix salsa ingredients.", "Serve salsa over chicken."]
    },
    {
        id: 6,
        name: "Quinoa Salad",
        image: "https://cdn.dummyjson.com/recipe-images/6.webp",
        rating: 4.4,
        cookTimeMinutes: 15,
        prepTimeMinutes: 15,
        tags: ["Salad", "Healthy"],
        ingredients: ["Quinoa", "Cucumber", "Tomatoes", "Parsley", "Lemon dressing"],
        instructions: ["Cook quinoa.", "Chop vegetables.", "Mix everything together.", "Add dressing and serve."]
    },
    {
        id: 7,
        name: "Tomato Basil Soup",
        image: "https://cdn.dummyjson.com/recipe-images/7.webp",
        rating: 4.3,
        cookTimeMinutes: 25,
        prepTimeMinutes: 10,
        tags: ["Soup", "Vegetarian"],
        ingredients: ["Tomatoes", "Basil", "Onion", "Garlic", "Vegetable stock"],
        instructions: ["Saute onion and garlic.", "Add tomatoes and stock.", "Simmer.", "Blend until smooth."]
    },
    {
        id: 8,
        name: "Beef Tacos",
        image: "https://cdn.dummyjson.com/recipe-images/8.webp",
        rating: 4.6,
        cookTimeMinutes: 18,
        prepTimeMinutes: 12,
        tags: ["Beef", "Mexican"],
        ingredients: ["Taco shells", "Ground beef", "Lettuce", "Cheese", "Salsa"],
        instructions: ["Cook beef.", "Warm shells.", "Add toppings.", "Serve fresh."]
    },
    {
        id: 9,
        name: "Greek Salad",
        image: "https://cdn.dummyjson.com/recipe-images/9.webp",
        rating: 4.2,
        cookTimeMinutes: 0,
        prepTimeMinutes: 15,
        tags: ["Salad", "Greek"],
        ingredients: ["Cucumber", "Tomato", "Olives", "Feta", "Olive oil"],
        instructions: ["Chop vegetables.", "Add olives and feta.", "Drizzle olive oil.", "Toss and serve."]
    },
    {
        id: 10,
        name: "Pancakes",
        image: "https://cdn.dummyjson.com/recipe-images/10.webp",
        rating: 4.7,
        cookTimeMinutes: 15,
        prepTimeMinutes: 10,
        tags: ["Breakfast", "Sweet"],
        ingredients: ["Flour", "Milk", "Egg", "Sugar", "Butter"],
        instructions: ["Mix batter.", "Heat pan.", "Pour batter.", "Flip and cook both sides."]
    },
    {
        id: 11,
        name: "Chicken Biryani",
        image: "https://cdn.dummyjson.com/recipe-images/11.webp",
        rating: 4.9,
        cookTimeMinutes: 45,
        prepTimeMinutes: 25,
        tags: ["Rice", "Chicken"],
        ingredients: ["Rice", "Chicken", "Yogurt", "Biryani spices", "Onion"],
        instructions: ["Marinate chicken.", "Cook rice halfway.", "Layer rice and chicken.", "Steam until cooked."]
    },
    {
        id: 12,
        name: "Fruit Smoothie",
        image: "https://cdn.dummyjson.com/recipe-images/12.webp",
        rating: 4.4,
        cookTimeMinutes: 0,
        prepTimeMinutes: 5,
        tags: ["Drink", "Healthy"],
        ingredients: ["Banana", "Berries", "Yogurt", "Honey", "Milk"],
        instructions: ["Add ingredients to blender.", "Blend until smooth.", "Pour into glass.", "Serve cold."]
    }
];

let state = {
    page: 1,
    limit: 9,
    search: "",
    sortBy: "",
    order: "",
    tag: "",
    total: 0
};


// ===============================
// PAGE LOAD
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    updateCartCount();

    // Sirf home page par recipes load hongi
    if (document.getElementById("recipeGrid")) {
        initHome();
    }

    if (document.getElementById("recipeDetail")) {
        initRecipeDetail();
    }

    if (document.getElementById("cartItems")) {
        initCartPage();
    }

});


// ===============================
// API FUNCTION
// ===============================

async function getData(url) {

    try {

        const controller =
            new AbortController();

        const timeout =
            setTimeout(function () {
                controller.abort();
            }, 2500);

        const response =
            await fetch(url, {
                signal: controller.signal
            });

        clearTimeout(timeout);

        if (!response.ok) {
            throw new Error("API Error: " + response.status);
        }

        return await response.json();

    } catch (error) {

        console.error("API Error:", error);

        return getFallbackData(url);
    }

}


function getFallbackData(url) {

    const parsedUrl =
        new URL(url, window.location.href);

    const pathname =
        parsedUrl.pathname;

    let recipes =
        [...FALLBACK_RECIPES];

    if (pathname.endsWith("/tags")) {

        return [
            ...new Set(
                FALLBACK_RECIPES.flatMap(function (recipe) {
                    return recipe.tags || [];
                })
            )
        ];

    }

    const recipeIdMatch =
        pathname.match(/\/recipes\/(\d+)$/);

    if (recipeIdMatch) {

        const recipe =
            FALLBACK_RECIPES.find(function (item) {
                return item.id === Number(recipeIdMatch[1]);
            });

        if (!recipe) {
            throw new Error("Recipe not found");
        }

        return recipe;

    }

    const tagMatch =
        pathname.match(/\/recipes\/tag\/([^/]+)$/);

    if (tagMatch) {

        const tag =
            decodeURIComponent(tagMatch[1]).toLowerCase();

        recipes =
            recipes.filter(function (recipe) {
                return (recipe.tags || []).some(function (recipeTag) {
                    return recipeTag.toLowerCase() === tag;
                });
            });

    }

    if (pathname.endsWith("/search")) {

        const query =
            (parsedUrl.searchParams.get("q") || "").toLowerCase();

        recipes =
            recipes.filter(function (recipe) {
                return recipe.name.toLowerCase().includes(query);
            });

    }

    const sortBy =
        parsedUrl.searchParams.get("sortBy");

    const order =
        parsedUrl.searchParams.get("order") || "asc";

    if (sortBy) {

        recipes.sort(function (a, b) {

            if (a[sortBy] < b[sortBy]) {
                return order === "asc" ? -1 : 1;
            }

            if (a[sortBy] > b[sortBy]) {
                return order === "asc" ? 1 : -1;
            }

            return 0;

        });

    }

    const total =
        recipes.length;

    const limit =
        Number(parsedUrl.searchParams.get("limit")) || total;

    const skip =
        Number(parsedUrl.searchParams.get("skip")) || 0;

    return {
        recipes: recipes.slice(skip, skip + limit),
        total: total,
        skip: skip,
        limit: limit
    };

}


// ===============================
// HOME INITIALIZATION
// ===============================

async function initHome() {

    const searchInput =
        document.getElementById("searchInput");

    const sortSelect =
        document.getElementById("sortSelect");

    const clearFilters =
        document.getElementById("clearFilters");


    // SEARCH

    searchInput.addEventListener("input", function () {

        state.search = this.value.trim();

        state.page = 1;

        loadRecipes();

    });


    // SORT

    sortSelect.addEventListener("change", function () {

        const value = this.value;

        state.page = 1;

        if (value === "") {

            state.sortBy = "";
            state.order = "";

        } else {

            const parts = value.split("-");

            state.sortBy = parts[0];

            state.order = parts[1];

        }

        loadRecipes();

    });


    // CLEAR FILTERS

    clearFilters.addEventListener("click", function () {

        state.search = "";
        state.sortBy = "";
        state.order = "";
        state.tag = "";
        state.page = 1;


        searchInput.value = "";

        sortSelect.value = "";


        loadTags();

        loadRecipes();

    });


    // Load tags

    await loadTags();


    // Load recipes

    await loadRecipes();

}


// ===============================
// LOAD TAGS
// ===============================

async function loadTags() {

    const tagContainer =
        document.getElementById("tagFilters");


    try {

        const tags =
            await getData(`${API}/tags`);


        tagContainer.innerHTML = "";


        tags.slice(0, 15).forEach(function (tag) {

            const button =
                document.createElement("button");


            button.className = "tag-btn";


            if (state.tag === tag) {

                button.classList.add("active");

            }


            button.textContent = tag;


            button.addEventListener("click", function () {

                if (state.tag === tag) {

                    state.tag = "";

                } else {

                    state.tag = tag;

                }


                state.page = 1;


                loadTags();

                loadRecipes();

            });


            tagContainer.appendChild(button);

        });


    } catch (error) {

        console.error(error);

        tagContainer.innerHTML =
            "<span>Unable to load tags</span>";

    }

}


// ===============================
// LOAD RECIPES
// ===============================

async function loadRecipes() {

    const grid =
        document.getElementById("recipeGrid");

    const loading =
        document.getElementById("loading");


    loading.style.display = "block";

    loading.textContent =
        "Loading recipes...";


    grid.innerHTML = "";


    try {

        let url = "";


        const skip =
            (state.page - 1) * state.limit;


        // =================================
        // SEARCH
        // =================================

        if (state.search !== "") {

            url =
                `${API}/search?q=${encodeURIComponent(state.search)}&limit=${state.limit}&skip=${skip}`;

        }


        // =================================
        // TAG
        // =================================

        else if (state.tag !== "") {

            url =
                `${API}/tag/${encodeURIComponent(state.tag)}?limit=${state.limit}&skip=${skip}`;

        }


        // =================================
        // ALL RECIPES
        // =================================

        else {

            url =
                `${API}?limit=${state.limit}&skip=${skip}`;

        }


        // =================================
        // SORT
        // =================================

        if (state.sortBy !== "") {

            url +=
                `&sortBy=${state.sortBy}&order=${state.order}`;

        }


        console.log("API URL:", url);


        // GET DATA

        const data =
            await getData(url);


        console.log("Recipes:", data);


        state.total = data.total;


        loading.style.display = "none";


        // NO RESULTS

        if (!data.recipes || data.recipes.length === 0) {

            grid.innerHTML = `
                <div class="loading">
                    No recipes found.
                </div>
            `;

            document.getElementById("pagination").innerHTML = "";

            return;

        }


        // DISPLAY RECIPES

        data.recipes.forEach(function (recipe) {

            grid.innerHTML +=
                createRecipeCard(recipe);

        });


        // ADD BUTTON EVENTS

        addCartEvents();


        // PAGINATION

        createPagination();


    } catch (error) {

        console.error(error);


        loading.style.display = "block";

        loading.innerHTML = `
            <p style="color:#e63946;">
                Recipes load nahi ho rahi.
            </p>

            <button
                onclick="loadRecipes()"
                class="btn primary"
                style="margin-top:15px;"
            >
                Try Again
            </button>
        `;

    }

}


// ===============================
// CREATE RECIPE CARD
// ===============================

function createRecipeCard(recipe) {

    let tagsHTML = "";


    if (recipe.tags) {

        tagsHTML =
            recipe.tags
                .slice(0, 3)
                .map(function (tag) {

                    return `
                        <span class="mini-tag">
                            ${tag}
                        </span>
                    `;

                })
                .join("");

    }


    return `

        <div class="recipe-card">

            <img
                src="${recipe.image}"
                alt="${recipe.name}"
                loading="lazy"
            >


            <div class="card-body">

                <h3>
                    ${recipe.name}
                </h3>


                <div class="meta">

                    <span>
                        ⭐ ${recipe.rating}
                    </span>

                    <span>
                        ${recipe.cookTimeMinutes} min
                    </span>

                </div>


                <div class="card-tags">

                    ${tagsHTML}

                </div>


                <div class="card-actions">

                    <a
                        href="recipe.html?id=${recipe.id}"
                        class="btn secondary"
                    >
                        View
                    </a>


                    <button
                        class="btn primary add-cart"
                        data-id="${recipe.id}"
                    >
                        Add
                    </button>

                </div>

            </div>

        </div>

    `;

}


// ===============================
// ADD TO CART BUTTON
// ===============================

function addCartEvents() {

    const buttons =
        document.querySelectorAll(".add-cart");


    buttons.forEach(function (button) {

        button.addEventListener("click", async function () {

            try {

                const recipe =
                    await getData(
                        `${API}/${button.dataset.id}`
                    );


                addToCart(recipe);


                button.textContent =
                    "Added ✓";


                setTimeout(function () {

                    button.textContent =
                        "Add";

                }, 1000);


            } catch (error) {

                console.error(error);

            }

        });

    });

}


// ===============================
// PAGINATION
// ===============================

function createPagination() {

    const pagination =
        document.getElementById("pagination");


    pagination.innerHTML = "";


    const totalPages =
        Math.ceil(
            state.total / state.limit
        );


    if (totalPages <= 1) {

        return;

    }


    // PREVIOUS

    const previous =
        document.createElement("button");


    previous.className =
        "page-btn";


    previous.textContent =
        "‹";


    previous.disabled =
        state.page === 1;


    previous.addEventListener("click", function () {

        if (state.page > 1) {

            state.page--;

            loadRecipes();

            scrollToRecipes();

        }

    });


    pagination.appendChild(previous);


    // PAGE NUMBERS

    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {

        const button =
            document.createElement("button");


        button.className =
            "page-btn";


        button.textContent =
            i;


        if (i === state.page) {

            button.classList.add("active");

        }


        button.addEventListener("click", function () {

            state.page = i;

            loadRecipes();

            scrollToRecipes();

        });


        pagination.appendChild(button);

    }


    // NEXT

    const next =
        document.createElement("button");


    next.className =
        "page-btn";


    next.textContent =
        "›";


    next.disabled =
        state.page === totalPages;


    next.addEventListener("click", function () {

        if (state.page < totalPages) {

            state.page++;

            loadRecipes();

            scrollToRecipes();

        }

    });


    pagination.appendChild(next);

}


// ===============================
// SCROLL TO RECIPES
// ===============================

function scrollToRecipes() {

    const recipes =
        document.getElementById("recipes");


    if (recipes) {

        recipes.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// ===============================
// CART FUNCTIONS
// ===============================

function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem(CART_KEY)
        ) || [];

    } catch {

        return [];

    }

}


function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );


    updateCartCount();

}


function addToCart(recipe) {

    const cart =
        getCart();


    const existing =
        cart.find(function (item) {

            return item.id === recipe.id;

        });


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: recipe.id,

            name: recipe.name,

            image: recipe.image,

            quantity: 1

        });

    }


    saveCart(cart);

}


// ===============================
// RECIPE DETAIL PAGE
// ===============================

async function initRecipeDetail() {

    const detail =
        document.getElementById("recipeDetail");

    const params =
        new URLSearchParams(window.location.search);

    const id =
        params.get("id");

    if (!id) {

        detail.innerHTML =
            "<div class=\"loading\">Recipe not found.</div>";

        return;

    }

    detail.innerHTML =
        "<div class=\"loading\">Loading recipe...</div>";

    try {

        const recipe =
            await getData(`${API}/${id}`);

        const ingredients =
            (recipe.ingredients || [])
                .map(function (item) {
                    return `<li>${item}</li>`;
                })
                .join("");

        const instructions =
            (recipe.instructions || [])
                .map(function (item) {
                    return `<li>${item}</li>`;
                })
                .join("");

        detail.innerHTML = `
            <div class="detail-card">
                <img src="${recipe.image}" alt="${recipe.name}">

                <div class="detail-content">
                    <p class="eyebrow">RECIPE DETAIL</p>
                    <h1>${recipe.name}</h1>

                    <div class="detail-meta">
                        <span>Rating: ${recipe.rating}</span>
                        <span>Cook: ${recipe.cookTimeMinutes} min</span>
                        <span>Prep: ${recipe.prepTimeMinutes} min</span>
                    </div>

                    <div class="card-tags detail-tags">
                        ${(recipe.tags || []).map(function (tag) {
                            return `<span class="mini-tag">${tag}</span>`;
                        }).join("")}
                    </div>

                    <button class="btn primary add-cart" data-id="${recipe.id}">
                        Add to Cart
                    </button>
                </div>
            </div>

            <div class="detail-columns">
                <section>
                    <h2>Ingredients</h2>
                    <ul>${ingredients}</ul>
                </section>

                <section>
                    <h2>Instructions</h2>
                    <ol>${instructions}</ol>
                </section>
            </div>
        `;

        addCartEvents();

    } catch (error) {

        console.error(error);

        detail.innerHTML =
            "<div class=\"loading\">Recipe detail load nahi ho rahi.</div>";

    }

}


// ===============================
// CART PAGE
// ===============================

function initCartPage() {

    renderCart();

}


function renderCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    const cart =
        getCart();

    updateCartCount();

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Add recipes from the home page.</p>
                <a href="index.html#recipes" class="btn primary">Browse Recipes</a>
            </div>
        `;

        cartTotal.textContent = "0";

        return;

    }

    cartItems.innerHTML =
        cart.map(function (item) {

            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">

                    <div>
                        <h3>${item.name}</h3>
                        <p>Quantity: ${item.quantity}</p>
                    </div>

                    <div class="quantity-actions">
                        <button class="page-btn qty-btn" data-action="decrease" data-id="${item.id}">-</button>
                        <button class="page-btn qty-btn" data-action="increase" data-id="${item.id}">+</button>
                        <button class="clear-btn remove-btn" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            `;

        }).join("");

    cartTotal.textContent =
        cart.reduce(function (sum, item) {
            return sum + item.quantity;
        }, 0);

    document
        .querySelectorAll(".qty-btn")
        .forEach(function (button) {

            button.addEventListener("click", function () {
                updateCartQuantity(
                    Number(button.dataset.id),
                    button.dataset.action
                );
            });

        });

    document
        .querySelectorAll(".remove-btn")
        .forEach(function (button) {

            button.addEventListener("click", function () {
                removeFromCart(Number(button.dataset.id));
            });

        });

}


function updateCartQuantity(id, action) {

    const cart =
        getCart();

    const item =
        cart.find(function (cartItem) {
            return cartItem.id === id;
        });

    if (!item) {
        return;
    }

    if (action === "increase") {
        item.quantity++;
    }

    if (action === "decrease") {
        item.quantity--;
    }

    const updatedCart =
        cart.filter(function (cartItem) {
            return cartItem.quantity > 0;
        });

    saveCart(updatedCart);
    renderCart();

}


function removeFromCart(id) {

    const updatedCart =
        getCart().filter(function (item) {
            return item.id !== id;
        });

    saveCart(updatedCart);
    renderCart();

}


// ===============================
// CART COUNT
// ===============================

function updateCartCount() {

    const cart =
        getCart();


    const total =
        cart.reduce(function (sum, item) {

            return sum + item.quantity;

        }, 0);


    document
        .querySelectorAll(".cart-count")
        .forEach(function (element) {

            element.textContent =
                total;

        });

}
