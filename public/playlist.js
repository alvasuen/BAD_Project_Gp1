window.onload = async () => {
    let params = new URL(document.location).searchParams
    let id = params.get('id')
    await getPlaylist(id)

}

async function getPlaylist(id) {
    const res = await fetch("/playlists?id=" + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const json = await res.json();
    if (json.playlists) {
        loadPlaylist(json.playlists);
    }

}
function loadPlaylist(playlists) {
    const playlistsContainer = document.querySelector('.playlist-body');
    playlistsContainer.innerHTML = "";
    for (let playlist of playlists) {
        playlistsContainer.innerHTML +=
        /* html */`
    <div class="playlist">
    <div class="playlist-id">${playlist['playlist_id]']}</div>
    <div class="playlist-title">${playlist['playlist_name']}</div>
        <div class="playlist-duration">${playlist['created_at']}</div>
    </div>
        `

    }
}
