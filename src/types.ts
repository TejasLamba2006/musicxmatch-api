export interface GetTrackResponse {
  message: {
    header: Header;
    body: {
      track: Track;
    };
  };
}

interface Header {
  status_code: number;
  execute_time: number;
}

interface Track {
  track_id: number;
  track_mbid: string;
  track_isrc: string;
  commontrack_isrcs: string[][];
  track_spotify_id: string;
  commontrack_spotify_ids: string[];
  commontrack_itunes_ids: number[];
  track_soundcloud_id: number;
  track_xboxmusic_id: string;
  track_name: string;
  track_name_translation_list: any[];
  track_rating: number;
  track_length: number;
  commontrack_id: number;
  instrumental: number;
  explicit: number;
  has_lyrics: number;
  has_lyrics_crowd: number;
  has_subtitles: number;
  has_richsync: number;
  has_track_structure: number;
  num_favourite: number;
  lyrics_id: number;
  subtitle_id: number;
  album_id: number;
  album_name: string;
  album_vanity_id: string;
  artist_id: number;
  artist_mbid: string;
  artist_name: string;
  album_coverart_100x100: string;
  album_coverart_350x350: string;
  album_coverart_500x500: string;
  album_coverart_800x800: string;
  track_share_url: string;
  track_edit_url: string;
  commontrack_vanity_id: string;
  restricted: number;
  first_release_date: string; // ISO 8601 date
  updated_time: string; // ISO 8601 date
  primary_genres: GenreList;
  secondary_genres: GenreList;
}

interface GenreList {
  music_genre_list: {
    music_genre: MusicGenre;
  }[];
}

interface MusicGenre {
  music_genre_id: number;
  music_genre_parent_id: number;
  music_genre_name: string;
  music_genre_name_extended: string;
  music_genre_vanity: string;
}

export interface SearchTracksResponse {
  message: {
    header: SearchHeader;
    body: {
      track_list: TrackListItem[];
    };
  };
}

interface SearchHeader {
  status_code: number;
  execute_time: number;
  available: number;
}

interface TrackListItem {
  track: Track;
}

export interface GetLyricsResponse {
  message: {
    header: SearchHeader;
    body: {
      lyrics: TrackLyrics;
    };
  };
}
interface TrackLyrics {
  lyrics_id: number;
  lyrics_body: string;
  lyrics_language: string;
  explicit: number;
  writers: {
    writer: Writer;
    role: string;
  }[];
  updated_time: string;
  backlink_url: string;
}

interface Writer {
  writer_id: number;
  writer_name: string;
  writer_vanity_id: string;
  restricted: number;
}

export interface SearchArtistsResponse {
  message: {
    header: SearchHeader;
    body: {
      artist_list: ArtistListItem[];
    };
  };
}

interface ArtistListItem {
  artist: Artist;
}

export interface GetArtistResponse {
  message: {
    header: Header;
    body: {
      artist: Artist;
    };
  };
}

export interface GetArtistAlbumsResponse {
  message: {
    header: AlbumsHeader;
    body: {
      album_list: AlbumListItem[];
    };
  };
}

interface AlbumsHeader {
  status_code: number;
  execute_time: number;
  available: number;
}

interface AlbumListItem {
  album: Album;
}

interface Album {
  album_id: number;
  album_mbid: string;
  album_name: string;
  album_rating: number;
  album_track_count: number;
  album_release_date: string;
  album_release_type: string;
  artist_id: number;
  artist_name: string;
  primary_genres: GenreList;
  secondary_genres: GenreList;
  album_pline: string;
  album_copyright: string;
  album_label: string;
  album_vanity_id: string;
  album_edit_url: string;
  restricted: number;
  updated_time: string;
  external_ids: ExternalIds;
  album_coverart_100x100: string;
  album_coverart_350x350: string;
  album_coverart_500x500: string;
  album_coverart_800x800: string;
}

export interface GetAlbumResponse {
  message: {
    header: Header;
    body: {
      album: Album;
    };
  };
}

export interface GetAlbumTracksResponse {
  message: {
    header: TracksHeader;
    body: {
      track_list: TrackListItem[];
    };
  };
}

interface TracksHeader {
  status_code: number;
  execute_time: number;
  available: number;
}

interface TrackListItem {
  track: Track;
}

interface Artist {
  artist_id: number;
  artist_fq_id: string;
  artist_mbid: string | null;
  artist_name: string;
  artist_name_translation_list: any[];
  artist_comment: string;
  artist_country: string;
  artist_alias_list: ArtistAlias[];
  artist_rating: number;
  primary_genres: Genres;
  secondary_genres: Genres;
  artist_twitter_url: string;
  artist_website_url: string;
  artist_instagram_url: string;
  artist_tiktok_url: string;
  artist_facebook_url: string;
  artist_youtube_url: string;
  artist_vanity_id: string;
  artist_edit_url: string;
  artist_share_url: string;
  artist_credits: Credits;
  restricted: number;
  managed: number;
  updated_time: string;
  external_ids: ExternalIds | null;
  begin_date_year: string;
  begin_date: string;
  end_date_year: string;
  end_date: string;
}

interface Genres {
  music_genre_list: MusicGenre[];
}

interface ArtistAlias {
  artist_alias: string;
}

interface ExternalIds {
  spotify: string[];
  itunes: string[];
  amazon_music?: string[];
}

interface Credits {
  artist_list: ArtistList[];
}

interface ArtistList {
  artist_id: number;
  artist_mbid: string | null;
  artist_name: string;
  artist_fq_id: string;
  artist_comment: string;
  artist_country: string;
  artist_alias_list: {
    artist_alias: string;
  }[];
  artist_rating: number;
  primary_genres: Genres;
  secondary_genres: Genres;
  artist_twitter_url: string;
  artist_website_url: string;
  artist_instagram_url: string;
  artist_tiktok_url: string;
  artist_facebook_url: string;
  artist_youtube_url: string;
  artist_vanity_id: string;
  artist_edit_url: string;
  artist_share_url: string;
  artist_credits: Credits;
  restricted: number;
  managed: number;
  updated_time: string;
  external_ids: { [key: string]: string } | null;
  begin_date_year: string;
  begin_date: string;
  end_date_year: string;
  end_date: string;
}

export interface GetTrackLyricsTranslationResponse {
  message: {
    header: Header;
    body: {
      translations_list: Translation[];
    };
  };
}
interface Translation {
  translation: {
    type_id: string;
    artist_id: number;
    language_from: string;
    user_id: string;
    app_id: string;
    description: string;
    num_keypressed: number;
    snippet: string;
    selected_language: string;
    position: number;
    do_not_increment_ranking: boolean;
    do_not_detect_language: boolean;
    language: string;
    wantkey: boolean;
    group_key: string;
    _validated: boolean;
    create_timestamp: number;
    type_id_weight: number;
    moderator: number;
    effectiveness: number;
    days_in_chart: number;
    last_updated: string;
    key: string;
    votes: Votes;
    published_status_macro: number;
    matched_line: string;
    subtitle_matched_line: string;
    confidence: number;
    user_score: number;
    image_id: number;
    video_id: number;
    lyrics_id: number;
    subtitle_id: number;
    created_date: string;
    commontrack_id: number;
    is_expired: number;
    can_delete: number;
    is_mine: number;
    can_approve: number;
    can_translate: number;
  };
}

interface Votes {
  translation_ok: number;
}
