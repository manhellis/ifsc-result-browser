const table = $("#myTable tbody");

// Function to load JSON file and append it to the table
const loadAndAppendJSON = () => {
    const jsonFileUrl = "./api-v1/seasons-35.json";

    fetch(jsonFileUrl)
        .then((response) => response.json())
        .then((data) => {
            // Create header row
            let headerRow = $("<tr></tr>");
            if (data.events && data.events.length > 0) {
                Object.keys(data.events[0]).forEach((key) => {
                    headerRow.append($(`<th>${key}</th>`));
                });
                table.append(headerRow);
            }
            // Create and append data rows
            data.events.forEach((event) => {
                let row = $("<tr></tr>");
                Object.values(event).forEach((value) => {
                    if (typeof value === "object" && value !== null) {
                        value = JSON.stringify(value);
                    }
                    row.append($(`<td>${value}</td>`));
                });
                table.append(row);
            });
        })
        .catch((error) => console.error("Error loading JSON file:", error));
};
// Call the function to load and append the JSON file
loadAndAppendJSON();
