
// Example Album
var albumPicasso = {
    name: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: '/images/album-placeholder.png',
    songs: [
        { name: 'Blue', length: '4:26'},
        { name: 'Green', length: '3:14'},
        { name: 'Red', length: '5:01'},
        { name: 'Pink', length: '3:21'},
        { name: 'Magenta', length: '2:15'}
    ]
};

// Another Album Example
var albumMarconi = {
    name: 'The Telephone',
    artist: 'Gulielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'images/album-placeholder.png',
    songs: [
        { name: 'Hello, Operator?', length: '1:01'},
        { name: 'Ring, Ring, Ring', length: '5:01'},
        { name: 'Fits in your pocket', length: '3:21'},
        { name: 'Can you hear me now?', length: '3:14'},
        { name: 'Wrong phone number', length: '2:15'}
    ]
};

var currentlyPlayingSong = null;

var createSongRow = function (songNumber, songName, songLength) {
    var template =
        '<tr>'
        +   '   <td class="song-number col-md-1" data-song-number="' + songNumber + '">' + songNumber + '</td>'
        +   '   <td class="col-md-9">' + songName + '</td>'
        +   '   <td class="col-md-2">' + songLength + '</td>'
        +   '</tr>';

    // Instead of returning the row immediately, we'll attach hover
    // functionality to it first.
    var $row = $(template);

    var onHover = function(event) {
        songNumberCell = $(this).find('.song-number');
        songNumber = songNumberCell.data('song-number');
        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
        }
    };

    var offHover = function(event) {
        songNumberCell = $(this).find('.song-number');
        songNumber = songNumberCell.data('song-number');
        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
    };

    // Toggle the play, pause, and song number based on the button clicked.
    var clickHandler = function(event) {
        songNumber = $(this).data('song-number');

        if (currentlyPlayingSong !== null) {
            // Revert to song number for currently playing song because user started playing new song.
            currentlyPlayingSongCell = $('.song-number[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingSongCell.html(currentlyPlayingSong);
        }

        if (currentlyPlayingSong !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html('<a class="album-song-button"><i class="fa fa-pause"></i></a>');
            currentlyPlayingSong = songNumber;
        }
        else if (currentlyPlayingSong === songNumber) {
            // Switch from Pause -> Play button to pause currently playing song.
            $(this).html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
            currentlyPlayingSong = null;
        }
    }

    $row.find('.song-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

var changeAlbumView = function(album) {
    // insert code here
    // Update the album title
    var $albumTitle = $('.album-title');
    $albumTitle.text(album.name);

    // Update the album artist
    var $albumArtist = $('.album-artist');
    $albumArtist.text(album.artist);

    // Update the meta information
    var $albumMeta = $('.album-meta-info');
    $albumMeta.text(album.year + " on " + album.label);

    // Update the album image
    var $albumImage = $('.album-image img');
    $albumImage.attr('src', album.albumArtUrl);

    // Update the song list
    var $songList = $('.album-song-listing');
    $songList.empty();
    var songs = album.songs;
    for (var i = 0; i < songs.length; i++) {
        var songData = songs[i];
        var $newRow = createSongRow(i + 1, songData.name, songData.length);
        $songList.append($newRow);
    }
};

// This 'if' condition is used to prevent the jQuery modifications
// from happening on non-album view pages.
// - Use a regex to validate that the url has "/album" in its path.
if (document.URL.match(/\/album.html/)) {
    // Wait until the html is fully processed.
    $(document).ready(function() {
        changeAlbumView(albumMarconi);
    });
}