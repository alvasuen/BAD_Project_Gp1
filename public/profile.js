async function getProfile(id) {
  const res = await fetch("/profile?id=" + id);
  const json = await res.json();
  console.log(json);
}

window.onload = async function () {
  let params = new URL(document.location).searchParams;
  let id = params.get("id");

  await getProfile(id);
};
