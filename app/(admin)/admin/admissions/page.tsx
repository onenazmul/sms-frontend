"use client";

import { useState, useMemo, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Eye, CheckCircle, XCircle, ChevronLeft, ChevronRight, 
  Search, Download, Edit3, Trash2, FileText, User, 
  MapPin, Phone, AlertTriangle, Filter, Columns, Mail
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, 
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useAdmissions } from "@/hooks/useAdmissions";

// --- MOCK DATA ---
// const ALL_DATA = Array.from({ length: 120 }).map((_, i) => ({
//   id: `ADM-2026${String(i + 1).padStart(3, '0')}`,
//   student_name: ["Nazmul Hossain", "Sumi Akter", "Rahat Khan", "Jannat Tul", "Abir Hasan"][i % 5],
//   email: `student${i}@example.com`,
//   class_name: `Class ${6 + (i % 3)}`,
//   gender: i % 2 === 0 ? "Male" : "Female",
//   guardian_phone: `017${Math.floor(10000000 + Math.random() * 90000000)}`,
//   payment_status: i % 4 === 0 ? "unpaid" : "paid",
//   status: ["pending", "approved", "rejected"][i % 3],
//   area: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi"][i % 4],
//   apply_date: "2026-01-27",
// }));

export default function AdmissionsManager() {

  //const { data, loading } = useAdmissions();
  //const { data, loading, approve, reject } = useAdmissions();
  // Filters & Search
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  
  // Table Pagination & Visibility
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    id: true, name: true, class: true, phone: true, payment: true, status: true, area: true
  });

  // Action States
  const [actionTarget, setActionTarget] = useState<{ids: string[], type: 'approve' | 'reject' | null}>({
    ids: [], type: null
  });

  // --- FILTER LOGIC ---
  const filteredData = useMemo(() => {
    // return data.filter(item => {
    //   const s = search.toLowerCase();
    //   const matchesSearch = item.student_name.toLowerCase().includes(s) || 
    //                         item.email.toLowerCase().includes(s) ||
    //                         item.guardian_phone.includes(s) || 
    //                         item.id.toLowerCase().includes(s);
    //   const matchesClass = classFilter === "all" || item.class_name === classFilter;
    //   const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    //   const matchesPayment = paymentFilter === "all" || item.payment_status === paymentFilter;
    //   const matchesArea = areaFilter === "all" || item.area === areaFilter;

    //   return matchesSearch && matchesClass && matchesStatus && matchesPayment && matchesArea;
    // });
  }, [search, classFilter, statusFilter, paymentFilter, areaFilter]);

  useEffect(() => setCurrentPage(1), [search, classFilter, statusFilter, paymentFilter, areaFilter, pageSize]);

  // const totalItems = filteredData.length;
  // const totalPages = Math.ceil(totalItems / pageSize);
  // const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // --- ACTION HANDLERS ---
  // const handleBulkSelect = (checked: boolean) => {
  //   setSelectedIds(checked ? paginatedData.map(i => i.id) : []);
  // };

  const processAction = () => {
    toast.success(`Successfully ${actionTarget.type}ed ${actionTarget.ids.length} application(s).`);
    setSelectedIds([]);
    setActionTarget({ ids: [], type: null });
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        {/* TOP HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admission Control</h1>
            <p className="text-sm text-muted-foreground">Manage student intake and verify documents.</p>
          </div>
          <Button variant="outline" className="bg-white"><Download className="mr-2 h-4 w-4" /> Export Excel</Button>
        </div>

        {/* SEARCH & FILTERS GRID */}
        <div className="bg-white p-4 rounded-xl border shadow-sm space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search by ID, Name, Email, or Phone..." 
                className="pl-9 h-10" 
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select onValueChange={setClassFilter} defaultValue="all">
              <SelectTrigger><SelectValue placeholder="Filter Class" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="Class 6">Class 6</SelectItem>
                <SelectItem value="Class 7">Class 7</SelectItem>
                <SelectItem value="Class 8">Class 8</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setAreaFilter} defaultValue="all">
              <SelectTrigger><SelectValue placeholder="Area / District" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                <SelectItem value="Dhaka">Dhaka</SelectItem>
                <SelectItem value="Chittagong">Chittagong</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <Select onValueChange={setStatusFilter} defaultValue="all">
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="App Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">App: All</SelectItem>
                <SelectItem value="pending">App: Pending</SelectItem>
                <SelectItem value="approved">App: Approved</SelectItem>
                <SelectItem value="rejected">App: Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setPaymentFilter} defaultValue="all">
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Payment" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Pay: All</SelectItem>
                <SelectItem value="paid">Pay: Paid</SelectItem>
                <SelectItem value="unpaid">Pay: Unpaid</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(val) => setPageSize(Number(val))} defaultValue="10">
              <SelectTrigger className="w-[110px]"><SelectValue placeholder="Show" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 / Page</SelectItem>
                <SelectItem value="10">10 / Page</SelectItem>
                <SelectItem value="50">50 / Page</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto"><Columns className="mr-2 h-4 w-4" /> Columns</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Object.keys(visibleColumns).map(key => (
                  <DropdownMenuCheckboxItem 
                    key={key} checked={visibleColumns[key]} 
                    onCheckedChange={(v) => setVisibleColumns(prev => ({...prev, [key]: v}))}
                    className="capitalize"
                  >
                    {key}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* BULK ACTION BAR */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-4 bg-slate-900 text-white p-3 rounded-lg shadow-lg animate-in slide-in-from-top-4">
            <span className="text-sm font-bold ml-2">{selectedIds.length} Items Selected</span>
            <div className="flex gap-2 ml-auto">
              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => setActionTarget({ids: selectedIds, type: 'approve'})}>Approve Selected</Button>
              <Button size="sm" variant="destructive" onClick={() => setActionTarget({ids: selectedIds, type: 'reject'})}>Reject Selected</Button>
              <Button size="sm" variant="ghost" onClick={() => setSelectedIds([])}>Cancel</Button>
            </div>
          </div>
        )}

        {/* DATA TABLE */}
        <div className="border rounded-xl bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="w-[50px]">
                    {/* <Checkbox 
                      checked={selectedIds.length === paginatedData.length && paginatedData.length > 0} 
                      onCheckedChange={(v) => handleBulkSelect(!!v)}
                    /> */}
                  </TableHead>
                  {visibleColumns.id && <TableHead>ID</TableHead>}
                  {visibleColumns.name && <TableHead>Student Name</TableHead>}
                  {visibleColumns.class && <TableHead>Class</TableHead>}
                  {visibleColumns.phone && <TableHead>Guardian Phone</TableHead>}
                  {visibleColumns.payment && <TableHead>Payment</TableHead>}
                  {visibleColumns.status && <TableHead>Status</TableHead>}
                  {visibleColumns.area && <TableHead>Area</TableHead>}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* {paginatedData.map((row) => (
                  <TableRow key={row.id} className={selectedIds.includes(row.id) ? "bg-slate-50" : ""}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedIds.includes(row.id)} 
                        onCheckedChange={() => setSelectedIds(prev => prev.includes(row.id) ? prev.filter(i => i !== row.id) : [...prev, row.id])} 
                      />
                    </TableCell>
                    {visibleColumns.id && <TableCell className="font-mono text-xs font-bold text-primary">{row.id}</TableCell>}
                    {visibleColumns.name && (
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">{row.student_name}</span>
                          <span className="text-[10px] text-muted-foreground">{row.email}</span>
                        </div>
                      </TableCell>
                    )}
                    {visibleColumns.class && <TableCell className="text-sm">{row.class_name}</TableCell>}
                    {visibleColumns.phone && <TableCell className="text-sm">{row.guardian_phone}</TableCell>}
                    {visibleColumns.payment && (
                      <TableCell>
                        <Badge variant={row.payment_status === 'paid' ? 'default' : 'destructive'} className="text-[10px]">
                          {row.payment_status.toUpperCase()}
                        </Badge>
                      </TableCell>
                    )}
                    {visibleColumns.status && (
                      <TableCell>
                        <Badge variant="outline" className={
                          row.status === 'approved' ? 'text-green-600 border-green-200 bg-green-50' :
                          row.status === 'rejected' ? 'text-red-600 border-red-200 bg-red-50' : 'text-slate-500'
                        }>
                          {row.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                    )}
                    {visibleColumns.area && <TableCell className="text-sm">{row.area}</TableCell>}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600"><Eye className="h-4 w-4" /></Button>
                          </SheetTrigger>
                          <StudentDetailSheet student={row} />
                        </Sheet>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600" onClick={() => approve(row.id)}>
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => reject(row.id)}>
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* PAGINATION CONTROLS */}
        {/* <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
          <p className="text-xs text-muted-foreground">Showing {paginatedData.length} of {totalItems} applicants</p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</Button>
            {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
              <Button 
                key={p} size="sm" variant={currentPage === p ? 'default' : 'outline'} 
                className="w-8 h-8 p-0" onClick={() => setCurrentPage(p)}
              >
                {p}
              </Button>
            )).slice(Math.max(0, currentPage - 3), currentPage + 2)}
            <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
          </div>
        </div> */}

        {/* GLOBAL ACTION MODAL */}
        <AlertDialog open={!!actionTarget.type} onOpenChange={() => setActionTarget({ids: [], type: null})}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="h-5 w-5" />
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              </div>
              <AlertDialogDescription>
                You are about to <span className="font-bold text-black uppercase underline">{actionTarget.type}</span> {actionTarget.ids.length} application(s).
                This will trigger an automated notification to the student(s).
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={processAction} className={actionTarget.type === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}>
                Confirm {actionTarget.type}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}

function StudentDetailSheet({ student }: { student: any }) {
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader className="mb-6">
        <SheetTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" /> Application Dossier
        </SheetTitle>
      </SheetHeader>
      <div className="space-y-6">
        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border">
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center"><User className="w-8 h-8 text-slate-400" /></div>
          <div><h3 className="text-lg font-bold">{student.student_name}</h3><p className="text-xs font-mono text-primary">{student.id}</p></div>
        </div>
        <div className="grid grid-cols-1 gap-4 text-sm">
          <div className="flex justify-between border-b pb-2"><span>Email:</span> <span className="font-semibold">{student.email}</span></div>
          <div className="flex justify-between border-b pb-2"><span>Phone:</span> <span className="font-semibold">{student.guardian_phone}</span></div>
          <div className="flex justify-between border-b pb-2"><span>Area:</span> <span className="font-semibold">{student.area}</span></div>
          <div className="flex justify-between border-b pb-2"><span>Applying For:</span> <span className="font-semibold">{student.class_name}</span></div>
        </div>
        <Separator />
        <div className="flex gap-2">
          <Button className="flex-1 bg-green-600 hover:bg-green-700">Approve</Button>
          <Button variant="destructive" className="flex-1">Reject</Button>
        </div>
      </div>
    </SheetContent>
  );
}