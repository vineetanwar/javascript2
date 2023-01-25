const form = document.getElementById("issue-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const issueId = Math.floor(Math.random() * 100000);
    const title = document.getElementById("title").value;
    const decsription = document.getElementById("description").value;
    const severity = document.getElementById("severity").value;
    const assignedTo = document.getElementById("assigned-to").value;
    const issueDetails = {
        issueId: issueId,
        title: title,
        decsription: decsription,
        severity: severity,
        assignedTo: assignedTo
    }
    createCard(issueDetails);
    emptyFields();
    gotocurrentissue();
})


function createCard(issueDetails) {
    const issueCard = document.createElement("div");
    issueCard.classList.add('issue-card');
    issueCard.classList.add('list-group-item');
    issueCard.setAttribute("draggable","true");
    issueCard.innerHTML = `
    <p class="card-text">Issue ID. ${issueDetails.issueId}</p>
            <div class="open">Open</div>
            <h4>${issueDetails.title}</h4>
            <p class="card-text">${issueDetails.decsription}</p>
            <p class="card-text"><b>Severity:</b> ${issueDetails.severity}</p>
            <p class="card-text"> <b>Assigned to:</b> ${issueDetails.assignedTo}</p>
            <div class="action-palette">
                <div class="prev-btn"><i id="previous" class="fa-solid fa-arrow-left-long"></i></div>
                <div class="close">Close</div>
                <div class="delete">Delete</div>
                <div class="next-btn"><i id="next" class="fa-solid fa-arrow-right-long"></i></div>
            </div>`;
    const newState = document.getElementById("new-state");
    newState.appendChild(issueCard);
    deleteCard(issueCard);
    closeIssue(issueCard);
    let prevBtn = issueCard.querySelector(".prev-btn");
    let nextBtn = issueCard.querySelector(".next-btn");
    const devState = document.getElementById("development-state");
    const qaState = document.getElementById("qa-state");
    const doneState = document.getElementById("done-state");
    prevBtn.style.display = "none";
    nextBtn.addEventListener("click", () => {
        if (newState.contains(issueCard)) {
            newState.removeChild(issueCard);
            devState.appendChild(issueCard);
            prevBtn.style.display = "block";
            nextBtn.style.display = "block";
        } else if (devState.contains(issueCard)) {

            devState.removeChild(issueCard);
            qaState.appendChild(issueCard);
        } else if (qaState.contains(issueCard)) {
            nextBtn.style.display = "none";
            qaState.removeChild(issueCard);
            doneState.appendChild(issueCard);
        } else if (doneState.contains(issueCard)) {

        }

    });
    prevBtn.addEventListener("click", () => {
        if (doneState.contains(issueCard)) {
            doneState.removeChild(issueCard);
            qaState.appendChild(issueCard);
            nextBtn.style.display = "block";
        } else if (qaState.contains(issueCard)) {
            qaState.removeChild(issueCard);
            devState.appendChild(issueCard);
        } else if (devState.contains(issueCard)) {
            devState.removeChild(issueCard);
            newState.appendChild(issueCard);
            prevBtn.style.display = "none";
        }
    });
}


function deleteCard(issueCard) {
    const deleteBtn = issueCard.querySelector(".delete");
    deleteBtn.addEventListener("click", () => {
        issueCard.remove();
    });
}
function closeIssue(issueCard){
    const closeBtn = issueCard.querySelector(".close");
    closeBtn.addEventListener("click",()=>{
        issueCard.remove();
        issueCard.classList.add("closed-issue");
        const closeBtn = issueCard.querySelector('.close');
        let prevBtn = issueCard.querySelector(".prev-btn");
        let nextBtn = issueCard.querySelector(".next-btn");
        closeBtn.remove();
        prevBtn.remove();
        nextBtn.remove();
        issueCard.querySelector('.open').innerHTML="Closed";
        const closedContainer = document.getElementById("closed-issues-container");
        closedContainer.appendChild(issueCard);
        scrolldToClosedIssues();
    })
}
function emptyFields() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("severity").value = "";
    document.getElementById("assigned-to").value = "";
}
function gotocurrentissue() {
    var elem = document.getElementById("current-issues");
    elem.scrollIntoView();
}

function scrolldToClosedIssues() {
    var elem = document.getElementById("closed-issues");
    elem.scrollIntoView();
}
const columns = document.querySelectorAll(".issue-state");

columns.forEach((column) => {
    new Sortable(column, {
        group: "shared",
        animation: 500,
    
        ghostClass: "blue-background-class"
    });
});
