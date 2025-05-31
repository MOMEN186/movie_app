import { MovieCard } from './MovieCard';

export default function TvShowCard({ movie }) {
  return <MovieCard movie={movie} mediaType="tv" />;
}
