document.getElementById("slider").addEventListener("input", function()
{
	let gridContainer = document.getElementById("grid-container");
	let sliderValue = this.value;
	let gridSize = sliderValue * sliderValue;  // Generates 1, 2, 4, 8, 16, etc.

	const columns = Math.floor(Math.sqrt(gridSize)); // Find the number of columns for a square grid
	gridContainer.style.setProperty("--columns", columns); // Update CSS variable

    // Update label with the current grid size
	document.getElementById("sliderValue").textContent = `Grid: ${columns}x${columns}`;

    // Clear current grid items
	gridContainer.innerHTML = "";


    // Add new grid items
	for (let i = 1; i <= gridSize; i++)
	{
		let gridItem = document.createElement("div");  // Create a new div
		gridItem.classList.add("box");  // Add the class "box"
		gridContainer.appendChild(gridItem);  // Append the new div to the grid container
	}
});

let currentMode = "black";
let isDrawing = false; // Flag for tracking the drawing state

//Functio to handle the drawing
function applyDrawingEffect(box, mode)
{
	if (mode == "black")
	{
		box.style.backgroundColor = "black";
	}
	else if (mode == "color")
        {
                box.style.backgroundColor = getRandomColor();
        }
	else  if (mode == "white")
        {
                box.style.backgroundColor = "white";
        }

}

// Function to apply hover effect based on the current mode
function applyHoverEffect(mode)
{
	const boxes = document.querySelectorAll(".box");
	boxes.forEach((box) =>
	{
		//Start drawing on mousedown
		box.addEventListener("mousedown", () =>
		{
			isDrawing = true;
			applyDrawingEffect(box, mode);
		});
		//Keep drawing on mousemove (and also mousedown)
		 box.addEventListener("mousemove", () =>
		{
			if (isDrawing)
			{
				applyDrawingEffect(box, mode);
			}
		});
		//Stop drawing on mouseup or mouseleave
		box.addEventListener("mouseup", () =>
		{
			isDrawing = false;
		});
		box.addEventListener("mouseleave", () =>
		{
			isDrawing = false;
		}
		);
	});

	//Ensure drawing stops if mouseup occurs outside the grid
	document.body.addEventListener("mouseup", () =>
	{
		isDrawing = false;
	}
	);
}

// Utility function to generate random colors
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Event listeners for buttons
document.getElementById("blackButton").addEventListener("click", () => {
    currentMode = "black";
    applyHoverEffect(currentMode);
});

document.getElementById("randomColourButton").addEventListener("click", () => {
    currentMode = "color";
    applyHoverEffect(currentMode);
});

document.getElementById("eraserButton").addEventListener("click", () => {
    currentMode = "eraser";
    applyHoverEffect(currentMode);
});

document.getElementById("clearButton").addEventListener("click", () => {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.style.backgroundColor = "white"; // Reset all boxes to white
    });
});
