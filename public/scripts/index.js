fetch("/user")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
