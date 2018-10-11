var list = document.querySelector(".list");
var lis = list.querySelectorAll("li");
list.addEventListener("click", function(e) {
  var li = e.target.closest("li");
  if (!li) return;
  if (li.classList.contains("all")) {
    // кликнули на все
    if (li.classList.contains("choose")) {
      lis.forEach(li => li.classList.remove("choose"));
    } else {
      lis.forEach(li => li.classList.add("choose"));
    }
  } else {
    if(list.querySelector('.all').classList.contains('choose')){
      lis.forEach(li => li.classList.remove("choose"));
      li.classList.add("choose")
    } else {
      li.classList.toggle("choose");
    }
  }

  var items = Array.from(list.querySelectorAll(".choose:not(.all)")).map(
    i => i.textContent
  );
  console.log(items);
});
