export default function SearchBar({ onSearch, onYear }: any) {
  return (
    <div className="flex gap-2">
      
      <input
        placeholder="Search movies..."
        onChange={(e) => onSearch(e.target.value)}
        className="flex-1 p-2 rounded bg-gray-800 text-white"
      />

      <input
        placeholder="Year"
        onChange={(e) => onYear(e.target.value)}
        className="w-24 p-2 rounded bg-gray-800 text-white"
      />

    </div>
  );
}