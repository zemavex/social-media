(async () => {
  const res = await fetch("http://localhost:3000/");
  const resJson = await res.json();
  console.log(resJson);

  document.body.innerHTML = `<div>${resJson.message}</div>`;
})();
