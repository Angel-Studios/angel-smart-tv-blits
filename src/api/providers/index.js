import api, { getImageUrl } from '..'

export const fetchPopular = (type) => {
  return api.get(`/${type}/popular`).then(selectiveDataExtraction)
}

const selectiveDataExtraction = (data) => {
  let filteredItems = data.results.filter((r) => !r.adult)
  return filteredItems.map((item) => {
    return {
      poster: getImageUrl(item.poster_path || item.profile_path),
      background: getImageUrl(item.backdrop_path, 'w1280'),
      identifier: item.id,
      title: item.title || item.name,
      overview: item.overview,
    }
  })
}

// Gets the trending movies on TMDB.
export const fetchTrending = () => {
  return api.get('/trending/all/day').then(selectiveDataExtraction)
}

// Gets a list of TV shows that air in the next 7 days.
export const fetchUpcomingTv = () => {
  return api.get('/tv/on_the_air').then(selectiveDataExtraction)
}

// Gets a list of target genre movies
export const fetchGenreMovies = (genres) => {
  const targetGenre = Array.isArray(genres) ? genres : [genres]
  return getGenre('movie').then(({ genres }) => {
    let targetGenreIds = []
    genres.forEach((item) => {
      if (targetGenre.includes(item.name)) targetGenreIds.push(item.id)
    })
    return api
      .get(`/discover/movie?with_genres=${targetGenreIds.join()}`)
      .then(selectiveDataExtraction)
  })
}

// Gets a genre list of given type (Movie | Tv)
const getGenre = (type) => {
  return api.get(`/genre/${type}/list`)
}
