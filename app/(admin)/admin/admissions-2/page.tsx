"use client";

import { useDataTable } from "@/hooks/useDataTable";

export default function AdmissionsPage() {
  const {
    rows,
    meta,
    loading,
    page,
    setPage,
    search,
    setSearch,
  } = useDataTable("/api/admission");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Admissions Manager
      </h1>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search admissions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-80"
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Student Name</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Class</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  No admissions found
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="p-3">{row.id}</td>
                  <td className="p-3">{row.name}</td>
                  <td className="p-3">{row.gender}</td>
                  <td className="p-3">{row.class_name}</td>
                  <td className="p-3">
                    {new Date(row.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} of {meta.last_page}
        </span>

        <button
          disabled={page === meta.last_page}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
