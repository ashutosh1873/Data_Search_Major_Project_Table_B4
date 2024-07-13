document.addEventListener('DOMContentLoaded', function () {
    showLoading();

    // Fetch the data from Google Sheets backend
    fetch('https://script.google.com/macros/s/AKfycbzdT0YbIXiJuxZ6twKYh0IemGIe2M62oEm0_Kqhf623Treto2c8JhNqwQM0-4hc1lc/exec')
        .then(response => response.json())
        .then(data => {
            console.log('Data received:', data); // Debugging line
            hideLoading();
            populateTable(data);
        })
        .catch(error => {
            hideLoading();
            console.error('Error fetching data:', error); // Debugging line
        });
});

function showLoading() {
    document.getElementById('loading').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function populateTable(data) {
    const tbody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear existing table rows

    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.topic}</td>
            <td>${row.description}</td>
            <td>${row.groupMembers}</td>
            <td>${row.member1.rollNo}</td>
            <td>${row.member1.name}</td>
            <td>${row.member2 ? row.member2.rollNo : ''}</td>
            <td>${row.member2 ? row.member2.name : ''}</td>
        `;
        tbody.appendChild(tr);
    });
}

function filterTable() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.getElementById('dataTable').getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let match = false;
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].innerText.toLowerCase().includes(input)) {
                match = true;
                break;
            }
        }
        rows[i].style.display = match ? '' : 'none';
    }
}

function printTable() {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><center><title>Major Project Topic Submissions - B4</title></center>');
    printWindow.document.write('<style>table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #ccc; padding: 10px; text-align: left; } th { background-color: #f2f2f2; }</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(document.querySelector('.container').innerHTML);
    printWindow.document.write('<p>Printed on: ' + new Date().toLocaleString() + '</p>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}
