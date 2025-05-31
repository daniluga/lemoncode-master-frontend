const getJson = (url, onSuccess) => {
  const xhr = new XMLHttpRequest();

  /**
   * indicamos qué petición queremos hacer
   */
  xhr.open("GET", url);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      onSuccess(JSON.parse(xhr.responseText));
      // console.log(response);
    }
  };

  xhr.setRequestHeader("Accept", "application/json");

  xhr.send();
};

getJson("https://api.github.com/orgs/lemoncode/members", (result) => {
  console.log({ result });
});
