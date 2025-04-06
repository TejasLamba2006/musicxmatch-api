import crypto from "crypto";
import fetch from "node-fetch";
const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36";
const SIGNATURE_KEY_BASE_URL = "https://s.mxmcdn.net/site/js/";
class MusixMatchAPI {
  baseUrl;
  headers;
  proxies;
  secret;
  constructor(proxies = null) {
    this.baseUrl = "https://www.musixmatch.com/ws/1.1/";
    this.headers = { "User-Agent": USER_AGENT };
    this.proxies = proxies;
    this.secret = null;
  }
  async getLatestApp() {
    const url = "https://www.musixmatch.com/search";
    const headers = {
      "User-Agent": USER_AGENT,
      Cookie: "mxm_bab=AB"
    };
    const response = await fetch(url, { headers });
    const html = await response.text();
    const matches = html.match(
      /src="([^"]*\/_next\/static\/chunks\/pages\/_app-[^"]+\.js)"/
    );
    if (!matches || matches.length < 2) {
      throw new Error(
        "Could not extract _app JS file. Musixmatch layout might have changed."
      );
    }
    if (matches) {
      return matches[1];
    }
    throw new Error("_app URL not found");
  }
  async getSecret() {
    if (this.secret) return this.secret;
    const latestAppUrl = await this.getLatestApp();
    const response = await fetch(latestAppUrl, { headers: this.headers });
    const jsCode = await response.text();
    const match = jsCode.match(/from\(\s*\"(.*?)\"\s*\.split/);
    if (match) {
      const reversedString = match[1].split("").reverse().join("");
      const decodedString = atob(reversedString);
      this.secret = decodedString;
      return decodedString;
    }
    throw new Error("Secret not found");
  }
  async generateSignature(url) {
    const date = /* @__PURE__ */ new Date();
    const l = date.getFullYear().toString();
    const s = String(date.getMonth() + 1).padStart(2, "0");
    const r = String(date.getDate()).padStart(2, "0");
    const message = Buffer.from(url + l + s + r);
    const key = Buffer.from(await this.getSecret());
    const hash = crypto.createHmac("sha256", key.toString()).update(message.toString()).digest("base64");
    return `&signature=${encodeURIComponent(hash)}&signature_protocol=sha256`;
  }
  async makeRequest(endpoint) {
    const url = `${this.baseUrl}${endpoint}`;
    const signedUrl = url + await this.generateSignature(url);
    const response = await fetch(signedUrl, { headers: this.headers });
    if (!response.ok) {
      throw new Error(
        `Musixmatch API error: ${response.status} ${response.statusText}`
      );
    }
    const json = await response.json();
    return json;
  }
  async searchTracks(options) {
    const query = options.query?.replaceAll(" ", "+") || "";
    const track = options.track?.replaceAll(" ", "+") || "";
    const artist = options.artist?.replaceAll(" ", "+") || "";
    return this.makeRequest(
      `track.search?app_id=community-app-v1.0&format=json&q=${encodeURIComponent(
        query
      )}&q_track=${encodeURIComponent(
        track
      )}&q_artist=${artist}&f_has_lyrics=true&page_size=100&page=${options.page}&test=abc`
    );
  }
  async getTrack(trackId = null, trackIsrc = null) {
    if (!trackId && !trackIsrc) throw new Error("Provide trackId or trackIsrc");
    const param = trackId ? `track_id=${trackId}` : `track_isrc=${trackIsrc}`;
    return this.makeRequest(
      `track.get?app_id=community-app-v1.0&format=json&${param}`
    );
  }
  async getTrackLyrics(trackId = null, trackIsrc = null) {
    if (!trackId && !trackIsrc) throw new Error("Provide trackId or trackIsrc");
    const param = trackId ? `track_id=${trackId}` : `track_isrc=${trackIsrc}`;
    return this.makeRequest(
      `track.lyrics.get?app_id=community-app-v1.0&format=json&${param}`
    );
  }
  async searchArtist(query, page = 1) {
    return this.makeRequest(
      `artist.search?app_id=community-app-v1.0&format=json&q_artist=${encodeURIComponent(
        query
      )}&page_size=100&page=${page}`
    );
  }
  async getArtist(artistId) {
    return this.makeRequest(
      `artist.get?app_id=community-app-v1.0&format=json&artist_id=${artistId}`
    );
  }
  async getArtistAlbums(artistId, page = 1) {
    return this.makeRequest(
      `artist.albums.get?app_id=community-app-v1.0&format=json&artist_id=${artistId}&page_size=100&page=${page}`
    );
  }
  async getAlbum(albumId) {
    return this.makeRequest(
      `album.get?app_id=community-app-v1.0&format=json&album_id=${albumId}`
    );
  }
  async getAlbumTracks(albumId, page = 1) {
    return this.makeRequest(
      `album.tracks.get?app_id=community-app-v1.0&format=json&album_id=${albumId}&page_size=100&page=${page}`
    );
  }
  async getTrackLyricsTranslation(trackId, language) {
    return this.makeRequest(
      `crowd.track.translations.get?app_id=community-app-v1.0&format=json&track_id=${trackId}&selected_language=${language}`
    );
  }
  async rawRequest(endpoint) {
    return this.makeRequest(endpoint);
  }
}
export {
  MusixMatchAPI
};
