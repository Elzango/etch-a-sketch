document.getElementById("slider").addEventListener("input", function()
{
	let gridContainer = document.getElementById("grid-container");
	let sliderValue = this.value;
	let gridSize = Math.pow(2, sliderValue);  // Generates 1, 2, 4, 8, 16, etc.

    // Update label with the current grid size
	document.getElementById("sliderValue").textContent = `Grid: ${gridSize}x${gridSize}`;

    // Clear current grid items
	gridContainer.innerHTML = "";

    // Set grid template columns and rows dynamically based on slider value
	gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
	gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    // Add new grid items
	for (let i = 1; i <= gridSize * gridSize; i++)
	{
		let gridItem = document.createElement("div");  // Create a new div
		gridItem.classList.add("box");  // Add the class "box"
		gridContainer.appendChild(gridItem);  // Append the new div to the grid container
	}
});
