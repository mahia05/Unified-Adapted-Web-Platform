document.getElementById("helpForm").addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.querySelector("input[type='text']").value;
  const email = document.querySelector("input[type='email']").value;
  const description = document.querySelector("textarea").value;

  if(name === "" || email === "" || description === ""){
    alert("Please fill all fields");
    return;
  }

  fetch("http://localhost:5000/api/help", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, description })
  })
  .then(res => res.json())
  .then(data => {
    alert("Submitted successfully!");
  })
  .catch(err => {
    console.log(err);
  });
});