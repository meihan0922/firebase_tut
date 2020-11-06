const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");

function render(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  let cross = document.createElement("div");
  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = "x";

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  //   delete data
  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("cafes").doc(id).delete();
  });
  cafeList.appendChild(li);
}

// getting Data
// db.collection("cafes")
//   .where("city", "==", "瓜地馬拉") // query特地值
//   .orderBy("name") //排列，在firebase中小寫字母會在大寫字母之後
//   .get()
//   .then((snapshot) =>
//     snapshot.docs.forEach((doc) => {
//       render(doc);
//     })
//   );

// real-time data
db.collection("cafes").onSnapshot((snapshot) => {
  let changes = snapshot.docChanges();
  changes.forEach((change) => {
    console.log(change);
    if (change.type === "added") {
      render(change.doc);
    } else if (change.type === "removed") {
      let li = cafeList.querySelector("[data-id=" + change.doc.id + "]");
      cafeList.removeChild(li);
    }
  });
});

// saving Data
form.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("cafes").add({
    name: form.name.value,
    city: form.city.value,
  });
  form.name.value = "";
  form.city.value = "";
});
