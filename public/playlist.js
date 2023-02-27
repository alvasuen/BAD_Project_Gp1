window.onload = async () => {
    let params = new URL(document.location).searchParams
    let id = params.get('id')

    await getPlaylist(id)
}


async function getPlaylist(id) {
    const res = await fetch("http://localhost:8000/playlists?id=" + id, {
        method: 'GET',
    })
    const json = await res.json();

    if (json.playlists) {
        loadPlaylist(json.playlists);
    }

}
function loadPlaylist(playlists) {
    console.log(playlists);
    const playlistsContainer = document.querySelector('.playlist-body');
    playlistsContainer.innerHTML = "";
    for (let playlist of playlists) {
        // console.log(playlist);
        playlistsContainer.innerHTML +=
        /* html */`
    <div class="playlist">
    <div class="playlist-id">${playlist['playlists_id']}</div>
    <div class="playlist-title">${playlist['playlists_name']}</div>
        <div class="playlist-duration">${playlist['created_at']}</div>
    </div>
        `

    }
}
