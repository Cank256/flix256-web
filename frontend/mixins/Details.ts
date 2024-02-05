// Define Image url
export const apiImgUrl: string | undefined = process.env.tmdbImageUrl || 'https://image.tmdb.org/t/p';

interface Item {
  title?: string;
  name?: string;
  runtime?: number;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  last_air_date?: string;
  backdrop_path?: string;
  release_dates?: { results: { iso_3166_1: string; release_dates: { certification: string }[] }[] };
  content_ratings?: { results: { iso_3166_1: string; rating: string }[] };
  videos?: { results: { type: string; name: string; key: string }[] };
  credits?: { crew: { job: string; name: string; id: number }[] };
  created_by?: { name: string; id: number }[];
}

/**
 * Name
 */
export const name = {
  computed: {
    name(this: { item: Item }) {
      return this.item.title ? this.item.title : this.item.name;
    },
  },
};

/**
 * Star rating
 */
export const stars = {
  computed: {
    stars(this: { item: Item }) {
      if (this.item.vote_average) {
        return this.item.vote_average * 10;
      }
    },
  },
};

/**
 * Rating
 */
export const rating = {
  computed: {
    rating(this: { item: Item }) {
      if (this.item.vote_average) {
        return this.item.vote_average / 2;
      }
    },
  },
};

/**
 * Runtime in Hours and Minutes
 */
export const runtime = {
  computed: {
    runtime(this: { item: Item }) {
      if (this.item.runtime) {
        const hours = Math.floor(this.item.runtime / 60);
        const minutes = this.item.runtime % 60;

        return `${hours}h ${minutes}m`;
      }
    },
  },
};

/**
 * Year started
 */
export const yearStart = {
  computed: {
    yearStart(this: { item: Item }) {
      const date = this.item.release_date ? this.item.release_date : this.item.first_air_date;

      if (date) {
        return date.split('-')[0];
      }
    },
  },
};

/**
 * Year ended
 */
export const yearEnd = {
  computed: {
    yearEnd(this: { item: Item }) {
      const date = this.item.last_air_date;

      if (date) {
        return date.split('-')[0];
      }
    },
  },
};

/**
 * Backdrop
 */
export const backdrop = {
  computed: {
    backdrop(this: { item: Item }) {
      if (this.item.backdrop_path) {
        return `${apiImgUrl}/original${this.item.backdrop_path}`;
      }
    },
  },
};

/**
 * Certification
 */
export const cert = {
  computed: {
    cert(this: { item: Item }) {
      // movie
      if (this.item.release_dates) {
        const releases = this.item.release_dates.results.find(
          release => release.iso_3166_1 === process.env.API_COUNTRY || release.iso_3166_1 === 'US'
        );

        if (!releases) return null;

        const item = releases.release_dates.find(date => date.certification !== '');

        if (item) return item.certification;
        // tv
      } else if (this.item.content_ratings) {
        const releases = this.item.content_ratings.results.find(
          release => release.iso_3166_1 === process.env.API_COUNTRY || release.iso_3166_1 === 'US'
        );

        if (!releases) return null;

        return releases.rating;
      }
    },
  },
};

/**
 * Trailer
 */
export const trailer = {
  computed: {
    trailer(this: { item: Item }) {
      let videos = this.item.videos?.results ?? [];

      // if no videos, do nothing
      if (!videos.length) return null;

      // filter by type of video
      videos = videos.filter(video => video.type === 'Trailer');

      // if no trailer found, do nothing
      if (!videos.length) return null;

      return [
        {
          name: videos[0].name,
          src: `https://www.youtube.com/embed/${videos[0].key}?rel=0&showinfo=0&autoplay=1`,
        },
      ];
    },
  },
};

/**
 * Directors
 */
export const directors = {
  computed: {
    directors(this: { item: Item }) {
      const people = this.item.credits?.crew ?? [];

      if (people) {
        return people
          .filter(person => person.job === 'Director')
          .map(person => `<a href="/person/${person.id}">${person.name}</a>`)
          .join(', ');
      }
    },
  },
};

/**
 * Creators
 */
export const creators = {
  computed: {
    creators(this: { item: Item }) {
      const people = this.item.created_by;

      if (people) {
        return people.map(person => `<a href="/person/${person.id}">${person.name}</a>`).join(', ');
      }
    },
  },
};
