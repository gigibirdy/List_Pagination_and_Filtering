/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


const itemsPerPage = 10;
const studentItem = document.getElementsByClassName('student-item');

/*Display desired number of student items per page when the page number is
selected by setting up the first and last index of student items should appear
on this paticular page.*/
function showPage(list, page) {
  let currentPageItem = [];
  let startIndex = itemsPerPage * (page - 1);
  let endIndex = page * itemsPerPage;
  for (let i = 0; i < list.length; i++) {
    if (i < startIndex || i >= endIndex) {
      list[i].style.display = 'none';
    } else {
      list[i].style.display = 'block';
      currentPageItem.push(list[i]);
    }
  }
  return currentPageItem;
};

//This function will generate page links and append it to the page element.
function appendPageLinks(list) {
  const div = document.createElement('div');
  const page = document.getElementsByClassName('page');
  page[0].appendChild(div);
  div.setAttribute('class', 'pagination');
  const ul = document.createElement('ul');
  div.appendChild(ul);
  for (let i = 1; i <= Math.ceil(list.length / itemsPerPage); i++) {
    pageNum = document.createTextNode(i);
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    a.appendChild(pageNum);
    const li = document.createElement('li');
    li.appendChild(a);
    ul.appendChild(li);
  }
  const lis = ul.children;
  lis[0].firstChild.className = "active";
  for (let i = 0; i < lis.length; i++) {
    const a = lis[i].firstChild;
  /*Add event listener to each page link. When one of the page links is clicked,
  dis-active all page links, set only the clicked page link to be active, and
  call the showPage function to display desired student items*/
    a.addEventListener("click", function(event) {
      for (let j = 0; j < lis.length; j++) {
        lis[j].firstChild.className = "";
      }
      a.className = "active";
      showPage(list, parseInt(a.textContent));
    })
  }
};

//Call above 2 functions to render the page links and first page content
showPage(studentItem, 1);
appendPageLinks(studentItem);


//generate search bar
const studentSearch = document.createElement('div');
studentSearch.setAttribute('class', 'student-search');
const pageHeader = document.getElementsByClassName('page-header');
pageHeader[0].appendChild(studentSearch);
const input = document.createElement('input');
input.setAttribute('placeholder', 'Search for students...');
studentSearch.appendChild(input);
const button = document.createElement('button');
button.textContent = 'Search';
studentSearch.appendChild(button);

//Search functionality
function searchResult(textValue) {
  const name = document.getElementsByTagName('h3');
  let result = [];
//Once this function is trigged, hide all student items
  for (let i = 0; i < studentItem.length; i++) {
    studentItem[i].style.display = 'none';
  }
/*when there is input content, iterate over students' name list, then
iterate over each student's name, slice same length of string as the length of
input from each name, and compare with the input to see if there is any match.
If so, set the student item to be visible and push into an array*/
  if (textValue.length) {
    for (let i = 0; i < name.length; i++) {
      for (let j = 0; j < name[i].innerText.length; j++) {
        let partialName = name[i].innerText.slice(j, (textValue.length + j));
        if (textValue !== partialName)
          continue;
        else if (textValue === partialName) {
          studentItem[i].style.display = 'block';
          result.push(studentItem[i]);
          break;
        }
      }
    }
  }
  return result;
};

const page = document.getElementsByClassName('page');
const pagination = document.getElementsByClassName('pagination');

//printing "no match" message to webpage
function noMatch(result, textValue) {
/*"no match" message will be printed when there is input content but no slice
of student's name matches this input content. And it will be printed once only.
Page links will be removed prior to this function called. When there is no match,
the "no match" element will be appended as third child of the page element.*/
  if (result.length === 0 && textValue.length !== 0) {
    if (page[0].children.length < 3) {
      const message = document.createElement('h1');
      message.setAttribute('class', 'message');
      message.textContent = 'There are no matches.';
      page[0].appendChild(message);
    }
//If there is a match or input is empty, "no match" message will be removed.
  } else {
    const message = document.getElementsByClassName('message');
    if (message[0]) {
      page[0].removeChild(message[0]);
    }
  }
};

/*When this function is trigged, if pagination is appended to the page element,
it will be removed. */
function removePagination() {
  if (pagination[0]) {
    page[0].removeChild(pagination[0]);
  }
};
/*Add event listener to search button. Remove page links. If there is no
match, print "no match" to webpage. If there is a match, call showPage function
to show first page of matches, call appendPageLinks function to append page
links. If there is no input content, call showPage function to show first page
of all student items, call appendPageLinks function to append page
links for all student items. */
button.addEventListener("click", (e) => {
  const result = searchResult(input.value.toLowerCase());
  removePagination();
  noMatch(result, input.value);
  if(result.length) {
    showPage(result, 1);
    appendPageLinks(result);
  } else if(input.value.length === 0) {
    showPage(studentItem, 1);
    appendPageLinks(studentItem);
  }
});
/*Add event listener to input. Remove page links. If there is no
match, print "no match" to webpage. If there is a match, call showPage function
to show first page of matches, call appendPageLinks function to append page
links for all matches. If there is no input content, call showPage function to
show first page of all student items, call appendPageLinks function to append
page links for all student items. */
input.addEventListener("keyup", (e) => {
  const searchText = e.target.value.toLowerCase();
  const result = searchResult(searchText);
  removePagination();
  noMatch(result, searchText);
  if(result.length) {
    showPage(result, 1);
    appendPageLinks(result);
  } else if(searchText.length === 0) {
    showPage(studentItem, 1);
    appendPageLinks(studentItem);
  }
});
