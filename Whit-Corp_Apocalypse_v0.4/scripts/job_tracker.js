// This function is called when the "Soul Capture!" button is clicked.
function scanCounter() {
    let count = localStorage.getItem('scanCount') ? parseInt(localStorage.getItem('scanCount')) : 0;
    count++;
    localStorage.setItem('scanCount', count);
    document.getElementById('result').innerText = "Scan Count: " + count;
    

    // Add the new job to the jobs list
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    let newJob = {
        scanNumber: count,
        step1: true,
        step2: false,
        step3: false,
        step4: false,
        step5: false
    };
    jobs.push(newJob);
    localStorage.setItem('jobs', JSON.stringify(jobs));

    // Update the job table on job tracker page if it's open
    updateScanTable();
}

// This function is called when any "QC" button is clicked.
function remainingCounter() {
    let remainingCt = localStorage.getItem('remainingCt') ? parseInt(localStorage.getItem('remainingCt')) : 0;
    remainingCt++;
    localStorage.setItem('remainingCt', remainingCt);
    document.getElementById('scanCount');
	
    document.getElementById('QCresult').innerText = "Remaining Count: " + remainingCt;
}

// This function is called when the "Reset" button is clicked.
function resetCounter() {
    localStorage.setItem('scanCount', 0);
    localStorage.setItem('remainingCt', 0);
    localStorage.setItem('jobs', JSON.stringify([]));

    // Check if these elements exist before updating
    if (document.getElementById('result')) {
        document.getElementById('result').innerText = "Scan Count: 0";
    }
    if (document.getElementById('QCresult')) {
        document.getElementById('QCresult').innerText = "Remaining Count: 0";
    }

    // Update the table only if we are on the job tracker page
    if (window.location.pathname.includes('job_tracker.html')) {
        updateScanTable();
    }

    // Force reload the page so all elements reflect the reset values
    location.reload();
}


// This function updates the scan table in job_tracker.html when the count changes
function updateScanTable() {
    if (window.location.pathname.includes('job_tracker.html')) {
        const table = document.getElementById('scanTable');
        const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        const tbody = table.getElementsByTagName('tbody')[0];
        tbody.innerHTML = ''; // Clear existing rows

        // Loop through all jobs and add rows to the table
        jobs.forEach((job, index) => {
            const newRow = tbody.insertRow();
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);
            const cell4 = newRow.insertCell(3);
            const cell5 = newRow.insertCell(4);
            const cell6 = newRow.insertCell(5);

            cell1.innerText = job.scanNumber;
            cell2.innerHTML = `<input type="checkbox" ${job.step1 ? 'checked' : ''} data-job-index="${index}" data-step="step1">`;
            cell3.innerHTML = `<input type="checkbox" ${job.step2 ? 'checked' : ''} data-job-index="${index}" data-step="step2">`;
            cell4.innerHTML = `<input type="checkbox" ${job.step3 ? 'checked' : ''} data-job-index="${index}" data-step="step3">`;
            cell5.innerHTML = `<input type="checkbox" ${job.step4 ? 'checked' : ''} data-job-index="${index}" data-step="step4">`;
			cell6.innerHTML = `<input type="checkbox" ${job.step5 ? 'checked' : ''} data-job-index="${index}" data-step="step5">`;

            // Attach event listener to each checkbox
            const checkboxes = newRow.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', updateCheckboxState);
            });
        });
    }
}

// This function updates the job data in localStorage when a checkbox is clicked
function updateCheckboxState(event) {
    const jobIndex = event.target.getAttribute('data-job-index');
    const step = event.target.getAttribute('data-step');
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    // Update the corresponding step in the job data
    jobs[jobIndex][step] = event.target.checked;

    // Save the updated jobs array back to localStorage
    localStorage.setItem('jobs', JSON.stringify(jobs));

    // Update the job table after modifying the checkbox state
    updateScanTable();
}

// This function runs when the page is loaded, and updates the scan counter display
window.onload = function() {
    let count = localStorage.getItem('scanCount') ? parseInt(localStorage.getItem('scanCount')) : 0;
    document.getElementById('result').innerText = "Scan Count: " + count;
    updateScanTable();
}
