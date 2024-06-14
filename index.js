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
