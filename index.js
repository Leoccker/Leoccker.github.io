function toggleDropdown() {
  var dropdown = document.getElementById("dropdown");
  if (dropdown.style.display === "none") {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
}

function filterItems() {
  const filterOption = document.getElementById("filterOptions").value;
  const itemsList = document.querySelectorAll(".item-list .item");
  const itemsArray = Array.from(itemsList);

  let sortedItems;
  switch (filterOption) {
    case "az":
      sortedItems = itemsArray.sort((a, b) => {
        const titleA = a.querySelector(".item-title").innerText.toLowerCase();
        const titleB = b.querySelector(".item-title").innerText.toLowerCase();
        return titleA.localeCompare(titleB);
      });
      break;
    case "za":
      sortedItems = itemsArray.sort((a, b) => {
        const titleA = a.querySelector(".item-title").innerText.toLowerCase();
        const titleB = b.querySelector(".item-title").innerText.toLowerCase();
        return titleB.localeCompare(titleA);
      });
      break;
    case "highPrice":
      sortedItems = itemsArray.sort((a, b) => {
        const priceA = parseFloat(
          a
            .querySelector(".item-price")
            .innerText.replace(/[Rp,.]/g, "")
            .trim()
        );
        const priceB = parseFloat(
          b
            .querySelector(".item-price")
            .innerText.replace(/[Rp,.]/g, "")
            .trim()
        );
        return priceB - priceA;
      });
      break;
    case "lowPrice":
      sortedItems = itemsArray.sort((a, b) => {
        const priceA = parseFloat(
          a
            .querySelector(".item-price")
            .innerText.replace(/[Rp,.]/g, "")
            .trim()
        );
        const priceB = parseFloat(
          b
            .querySelector(".item-price")
            .innerText.replace(/[Rp,.]/g, "")
            .trim()
        );
        return priceA - priceB;
      });
      break;
  }

  const itemListParent = document.querySelector(".item-list");
  itemListParent.innerHTML = "";
  sortedItems.forEach((item) => itemListParent.appendChild(item));
}

function showItems() {
  const itemsCount = document.getElementById("itemsCount").value;
  const itemsList = document.querySelectorAll(".item-list .item");
  const itemsArray = Array.from(itemsList);

  itemsArray.forEach(item => item.style.display = "block");

  for (let i = itemsCount; i < itemsArray.length; i++) {
    itemsArray[i].style.display = "none";
  }

  var resultsDiv = document.querySelector(".results p");
  resultsDiv.textContent = "Showing 1-" + itemsCount + " of " + itemsArray.length + " results";
}

function validateEmail() {
    var email = document.getElementById('email').value;
    var regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+com$/;
    if (!regex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    return true;
}

let currentPage = 1;
const itemsPerPageSelect = document.getElementById("itemsCount");

function changePage(page) {
  const itemsPerPage = parseInt(itemsPerPageSelect.value);
  const itemsList = document.querySelectorAll(".item-list .item");
  const totalItems = itemsList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;
  
  currentPage = page;

  itemsList.forEach((item, index) => {
    item.style.display = (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) ? "block" : "none";
  });

  const resultsDiv = document.querySelector(".results p");
  resultsDiv.textContent = `Showing ${(page - 1) * itemsPerPage + 1}-${Math.min(page * itemsPerPage, totalItems)} of ${totalItems} results`;

  updatePaginationButtons(totalPages);
}

function nextPage() {
  changePage(currentPage + 1);
}

function updatePaginationButtons(totalPages) {
  const paginationButtons = document.querySelectorAll(".pagination button:not(#next)");
  paginationButtons.forEach((button, index) => {
    button.classList.toggle("active", index + 1 === currentPage);
    button.style.display = index + 1 <= totalPages ? "inline-block" : "none";
  });
}

itemsPerPageSelect.addEventListener("change", () => {
  changePage(1); // Reset to first page when items per page changes
});

function showItems() {
  changePage(1); // Ensure the first page is shown after changing items per page
}

document.addEventListener("DOMContentLoaded", () => {
  changePage(1); // Initialize the first page on load
});
