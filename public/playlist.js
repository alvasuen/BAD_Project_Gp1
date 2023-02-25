window.onload = async () => {
    let params = new URL(document.location).searchParams
    let id = params.get('id')
    await loadPlaylist(id)

}

async function loadPlaylist(id) {
    const res = await fetch("/playlists?id=" + id)
    const json = await res.json()

}