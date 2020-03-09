document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];

  if (localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));

  }

  issues.push(issue);

  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  updateTotal();
  updateOpenIssue();

  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);

  currentIssue.status = 'Closed';
  currentIssue.description = currentIssue.description.strike();
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();


}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));

  const remainingIssues = issues.filter(issue => issue.id != id);
  localStorage.setItem('issues', JSON.stringify(remainingIssues));

  updateTotal();
  updateCloseIssue();
  updateOpenIssue();
  fetchIssues();

}

const setStatusClosed = (id) => {
  closeIssue(id);
  updateCloseIssue();
  // let x = document.querySelector("#issuesList > div > h3");
  // x.style.textDecoration = "line-through";
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  //console.log(issues)
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  if (issues == null) {
    console.log('null')
  }
  else {

    for (var i = 0; i < issues.length; i++) {
      const { id, description, severity, assignedTo, status } = issues[i];

      issuesList.innerHTML += `<div class="well">
                                <h6>Issue ID: ${id} </h6>
                                <p><span class="label label-info"> ${status} </span></p>
                                <h3> ${description} </h3>
                                <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                                <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                                <a href="#${id}" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                                <a href="#${id}" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                                </div>`;
    }
  }
}



function updateTotal() {
  let total = document.getElementById('total');
  let numb = JSON.parse(localStorage.getItem('issues'));

  if (numb == null) {
    total.innerText = 0
  }
  else {

    total.innerText = numb.length;
  }

  // console.log(numb)
  // console.log(numb.length)
}


function updateOpenIssue() {
  let openIssue = document.getElementById('openIssue');
  let issues = JSON.parse(localStorage.getItem('issues'));

  let statusList = [];
  for (let i = 0; i < issues.length; i++) {
    statusList.push(issues[i].status)
  }
  let openList = statusList.filter(x => x == 'Open');
  openIssue.innerText = openList.length;
}

function updateCloseIssue() {
  let closeIssue = document.getElementById('closeIssue');
  let issues = JSON.parse(localStorage.getItem('issues'));

  let statusList = [];
  for (let i = 0; i < issues.length; i++) {
    statusList.push(issues[i].status)
  }
  let closeList = statusList.filter(x => x == 'Closed');
  closeIssue.innerText = closeList.length;
}


updateOpenIssue()
updateCloseIssue()
updateTotal()
//localStorage.clear()


