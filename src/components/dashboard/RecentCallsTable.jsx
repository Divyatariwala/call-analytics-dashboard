import { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";

export default function RecentCallsTable({ calls = [] }) {
  // Hooks must always be called
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filter calls
  const filteredCalls = useMemo(() => {
    if (!search) return calls;
    return calls.filter(c =>
      c.callerName.toLowerCase().includes(search.toLowerCase()) ||
      c.receiverNumber.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
    );
  }, [calls, search]);

  // Pagination
  const totalPages = Math.ceil(filteredCalls.length / rowsPerPage);
  const paginatedCalls = filteredCalls.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Render
  if (!calls.length) return <p className="text-center">Loading...</p>;

  return (
    <div className="w-full">
      {/* Search / Filter */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Caller, Receiver, or City..."
          className="border rounded px-3 py-2 w-full max-w-md"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Caller</TableHead>
            <TableHead>Caller Number</TableHead>
            <TableHead>Receiver</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Start Time</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedCalls.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.callerName}</TableCell>
              <TableCell>{c.callerNumber}</TableCell>
              <TableCell>{c.receiverNumber}</TableCell>
              <TableCell>{c.city}</TableCell>
              <TableCell>{c.callDuration}s</TableCell>
              <TableCell>${c.callCost}</TableCell>
              <TableCell>{new Date(c.callStartTime).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center items-center space-x-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-indigo-500 text-white" : ""
            }`}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}