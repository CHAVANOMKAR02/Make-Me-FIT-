document.addEventListener('DOMContentLoaded', function() {
  let addItemButton = document.getElementById('add-item');
  let itemList = document.getElementById('item-list');
  let totalCaloriesDisplay = document.getElementById('total-calories');
  let totalCalories = 0;

  addItemButton.addEventListener('click', function() {
    let itemNameSelect = document.getElementById('item-name');
    let itemName = itemNameSelect.options[itemNameSelect.selectedIndex].text;

    if (itemName && itemName !== "Select a food item") {
      fetchCalories(itemName).then(calories => {
        if (calories !== null) {
          let item = document.createElement('div');
          item.textContent = `${itemName}: ${calories} calories`;
          itemList.appendChild(item);

          totalCalories += calories;
          totalCaloriesDisplay.textContent = `Total Calories: ${totalCalories}`;

          // Clear selection
          itemNameSelect.selectedIndex = 0;
        } else {
          alert('Calorie information not found.');
        }
      });
    }
  });

  function fetchCalories(itemName) {
    const appId = 'e5d7519d';
    const appKey = '223293195cc093c926ff725832c9706d';
    const url = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&nutrition-type=cooking&ingr=${encodeURIComponent(itemName)}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.totalNutrients && data.totalNutrients.ENERC_KCAL && data.totalNutrients.ENERC_KCAL.quantity > 0) {
          return data.totalNutrients.ENERC_KCAL.quantity;
        } else {
          return null;
        }
      })
      .catch(error => {
        console.error('Error fetching calorie data:', error);
        return null;
      });
  }
});
