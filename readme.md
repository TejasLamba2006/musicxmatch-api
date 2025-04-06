# 🎵 Musixmatch API

`musicxmatch-api` is an npm package that provides easy access to MusixMatch API endpoints. It supports searching tracks, getting track details, lyrics, artists, albums, and more. This package handles the necessary signing and authentication required by MusixMatch.

Time I spent on this project so far
[![wakatime](https://wakatime.com/badge/user/8f5cbfd7-edb6-4430-b79e-9c46ccb2d9a5/project/58c3a103-1495-4cd3-9782-ac54a1215025.svg)](https://wakatime.com/badge/user/8f5cbfd7-edb6-4430-b79e-9c46ccb2d9a5/project/58c3a103-1495-4cd3-9782-ac54a1215025)

Took me 1 hr 28 mins 56 secs to build this package.
![image](https://github.com/user-attachments/assets/5b126720-798a-43d7-a092-31aab1f64111)


## ✨ Features

- Fetch lyrics, tracks, albums, and artists
- Automatically fetches app signature from Musixmatch
- Proxy support built-in (currently not used internally)
- Fully typed (TypeScript support)

## 📦 Installation

```bash
npm install musixmatch-api
pnpm install musixmatch-api
yarn add musixmatch-api
bun install musixmatch-api
```

> Requires Node.js 16+

## Usage

Here's how you can use the `MusixMatchAPI` class to interact with the MusixMatch API:

### Importing the Package

```typescript
import { MusixMatchAPI } from "musicxmatch-api";
```

### Creating an Instance

```typescript
const musixMatchAPI = new MusixMatchAPI();
```

### Available Methods

#### `searchTracks(options: { query?: string; track?: string; artist?: string; page: number; }): Promise<SearchTracksResponse>`

Search for tracks based on the provided options.

```typescript
const tracks = await musixMatchAPI.searchTracks({
  query: "love",
  track: "Shape of You",
  artist: "Ed Sheeran",
  page: 1,
});
```

#### `getTrack(trackId?: string | null, trackIsrc?: string | null): Promise<GetTrackResponse>`

Get track details by track ID or ISRC.

```typescript
const track = await musixMatchAPI.getTrack("123456");
```

#### `getTrackLyrics(trackId?: string | null, trackIsrc?: string | null): Promise<GetLyricsResponse>`

Get lyrics of a track by track ID or ISRC.

```typescript
const lyrics = await musixMatchAPI.getTrackLyrics("123456");
```

#### `searchArtist(query: string, page?: number): Promise<SearchArtistsResponse>`

Search for artists by name.

```typescript
const artist = await musixMatchAPI.searchArtist("Queen");
```

#### `getArtist(artistId: string): Promise<GetArtistResponse>`

Get artist details by artist ID.

```typescript
const artist = await musixMatchAPI.getArtist("118");
```

#### `getArtistAlbums(artistId: string, page?: number): Promise<GetArtistAlbumsResponse>`

Get albums of an artist by artist ID.

```typescript
const albums = await musixMatchAPI.getArtistAlbums("118");
```

#### `getAlbum(albumId: string): Promise<GetAlbumResponse>`

Get album details by album ID.

```typescript
const album = await musixMatchAPI.getAlbum("32541950");
```

#### `getAlbumTracks(albumId: string, page?: number): Promise<GetAlbumTracksResponse>`

Get tracks of an album by album ID.

```typescript
const tracks = await musixMatchAPI.getAlbumTracks("32541950");
```

#### `getTrackLyricsTranslation(trackId: string, language: string): Promise<GetTrackLyricsTranslationResponse>`

Get lyrics translation of a track by track ID and language.

```typescript
const translation = await musixMatchAPI.getTrackLyricsTranslation("123456", "es");
```

#### `rawRequest(endpoint: string): Promise<any>`

Make a raw request to any MusixMatch API endpoint.

```typescript
const response = await musixMatchAPI.rawRequest("track.get?app_id=community-app-v1.0&format=json&track_id=123456");
```

### Example

```typescript
import { MusixMatchAPI } from "musicxmatch-api";

const musixMatchAPI = new MusixMatchAPI();

async function fetchTrackDetails() {
  try {
    const track = await musixMatchAPI.getTrack("123456");
    console.log(track);
  } catch (error) {
    console.error("Error fetching track details:", error);
  }
}

fetchTrackDetails();
```

## License

This package is licensed under the MIT License.
Feel free to use, modify, and distribute it as per the terms of the license.
