$(document).ready(function() {
    // Load the JSON file
    $.getJSON('seasons-35.json', function(data) {
        var table = $('#myTable tbody');
        var yearSet = new Set(); // To store unique years

        // Process each item in the JSON array
        $.each(data, function(key, item) {
            // Extract year from 'starts_at' property
            var year = new Date(item.starts_at).getFullYear();
            yearSet.add(year);

            // Add rows to the table
            var row = $('<tr></tr>');
            row.append($('<td></td>').text(item.event));
            row.append($('<td></td>').text(item.event_id));
            table.append(row);
        });

        // Populate year filter dropdown
        var yearFilter = $('#filter1');
        yearSet.forEach(function(year) {
            yearFilter.append($('<option></option>').val(year).text(year));
        });
    }).fail(function() {
        console.error("Error loading JSON data");
    });
});

// Filter function
function filterTable() {
    var selectedYear = document.getElementById("filter1").value;
    var table = document.getElementById("myTable");
    var tr = table.getElementsByTagName("tr");

    for (var i = 1; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td")[0]; // Assuming the date is in the first column
        if (td) {
            var year = new Date(td.textContent || td.innerText).getFullYear().toString();
            if (year === selectedYear || selectedYear === "") {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
