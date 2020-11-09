const guideList = document.querySelector(".guides");

// setup guides
const setupGuides = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const guide = doc.data();
      const li = `
              <li>
                  <div class="collapsible-header grey lighten-4">${guide.title}</div>
                  <div class="collapsible-body white"><span>${guide.content}</span></div>
              </li>`;
      html += li;
    });
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = `<h5>請登入看更多...</h5>`;
  }
};

// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
