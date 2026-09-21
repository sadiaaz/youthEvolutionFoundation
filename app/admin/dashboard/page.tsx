"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type ContactStatus = "New" | "Read" | "Resolved";
type VolunteerStatus = "Pending" | "Approved" | "Rejected";
type DonationStatus = "Pending" | "Verified" | "Rejected";
type CertificateStatus = "Verified" | "Pending" | "Revoked";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: ContactStatus;
}

interface Volunteer {
  id: number;
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  date: string;
  status: VolunteerStatus;
}

interface Donation {
  id: number;
  donorName: string;
  amount: number;
  paymentMethod: string;
  transactionRef: string;
  date: string;
  status: DonationStatus;
}

interface Certificate {
  id: number;
  fullName: string;
  email: string;
  program: string;
  certificateId: string;
  issueDate: string;
  status: CertificateStatus;
}

type TabKey = "contact" | "volunteer" | "donation" | "certificate";

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Read: "bg-gray-100 text-gray-700",
  Resolved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Verified: "bg-emerald-100 text-emerald-800 font-semibold",
  Revoked: "bg-red-100 text-red-700 font-semibold",
  Rejected: "bg-red-100 text-red-700",
};

const avatarColors = ["bg-blue-600", "bg-teal-500", "bg-orange-500", "bg-pink-500", "bg-purple-500", "bg-green-600"];

function Avatar({ name, index }: { name: string; index: number }) {
  const color = avatarColors[index % avatarColors.length];
  return (
    <div className={`w-8 h-8 rounded-full ${color} text-white flex items-center justify-center text-xs font-semibold shrink-0`}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}

const navItems = [
  { key: "contact", label: "Contact", icon: "💬" },
  { key: "volunteer", label: "Volunteer", icon: "🤝" },
  { key: "donation", label: "Donation", icon: "❤️" },
  { key: "certificate", label: "Certificate", icon: "🎓" },
] as const;

const todayStr = () => new Date().toISOString().split("T")[0];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("contact");
  const [search, setSearch] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  // Loading states
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [loadingVolunteers, setLoadingVolunteers] = useState(false);
  const [loadingDonations, setLoadingDonations] = useState(false);
  const [loadingCertificates, setLoadingCertificates] = useState(false);

  // Entity states
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  // 1. Fetch Real Contacts
  const fetchContacts = async () => {
    setLoadingContacts(true);
    try {
      const res = await fetch("/api/contact");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const mapped: Contact[] = json.data.map(
          (c: { id: number; name?: string; email?: string; phone?: string; message?: string; created_at?: string; status?: string }) => ({
            id: c.id,
            name: c.name || "Anonymous",
            email: c.email || "N/A",
            phone: c.phone || "-",
            message: c.message || "-",
            date: c.created_at ? new Date(c.created_at).toISOString().split("T")[0] : todayStr(),
            status: (c.status as ContactStatus) || "New",
          })
        );
        setContacts(mapped);
      }
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
    } finally {
      setLoadingContacts(false);
    }
  };

  // 2. Fetch Real Volunteers
  const fetchVolunteers = async () => {
    setLoadingVolunteers(true);
    try {
      const res = await fetch("/api/volunteers");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const mapped: Volunteer[] = json.data.map(
          (v: { id: number; name?: string; email?: string; phone?: string; interest?: string; message?: string; created_at?: string; status?: string }) => ({
            id: v.id,
            name: v.name || "Anonymous",
            email: v.email || "N/A",
            phone: v.phone || "-",
            interest: v.interest || "General",
            message: v.message || "-",
            date: v.created_at ? new Date(v.created_at).toISOString().split("T")[0] : todayStr(),
            status: (v.status as VolunteerStatus) || "Pending",
          })
        );
        setVolunteers(mapped);
      }
    } catch (err) {
      console.error("Failed to fetch volunteers:", err);
    } finally {
      setLoadingVolunteers(false);
    }
  };

  // 3. Fetch Real Donations
  const fetchDonations = async () => {
    setLoadingDonations(true);
    try {
      const res = await fetch("/api/donations");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const mapped: Donation[] = json.data.map(
          (item: { id: number; donor_name?: string; amount?: number; payment_method?: string; transaction_ref?: string; created_at?: string; status?: string }) => ({
            id: item.id,
            donorName: item.donor_name || "Anonymous",
            amount: Number(item.amount) || 0,
            paymentMethod: item.payment_method || "N/A",
            transactionRef: item.transaction_ref || "-",
            date: item.created_at ? new Date(item.created_at).toISOString().split("T")[0] : todayStr(),
            status: (item.status as DonationStatus) || "Pending",
          })
        );
        setDonations(mapped);
      }
    } catch (err) {
      console.error("Failed to fetch donations:", err);
    } finally {
      setLoadingDonations(false);
    }
  };

  // 4. Fetch Real Certificates
  const fetchCertificates = async () => {
    setLoadingCertificates(true);
    try {
      const res = await fetch("/api/certificates");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const mapped: Certificate[] = json.data.map(
          (c: { id: number; full_name?: string; email?: string; certificate_program?: string; certificate_id?: string; issue_date?: string; status?: string }) => ({
            id: c.id,
            fullName: c.full_name || "N/A",
            email: c.email || "N/A",
            program: c.certificate_program || "General Program",
            certificateId: c.certificate_id || "-",
            issueDate: c.issue_date ? new Date(c.issue_date).toISOString().split("T")[0] : todayStr(),
            status: (c.status as CertificateStatus) || "Verified",
          })
        );
        setCertificates(mapped);
      }
    } catch (err) {
      console.error("Failed to fetch certificates:", err);
    } finally {
      setLoadingCertificates(false);
    }
  };

  // Load all records on component mount asynchronously
  useEffect(() => {
    let mounted = true;
    const loadInitialData = async () => {
      if (!mounted) return;
      await Promise.allSettled([
        fetchContacts(),
        fetchVolunteers(),
        fetchDonations(),
        fetchCertificates(),
      ]);
    };
    void loadInitialData();
    return () => {
      mounted = false;
    };
  }, []);

  // Modal state: null = closed
  const [modal, setModal] = useState<{
    mode: "add" | "edit";
    type: TabKey;
    data: Record<string, string>;
    id?: number;
  } | null>(null);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const nextId = (list: { id: number }[]) =>
    list.length ? Math.max(...list.map((i) => i.id)) + 1 : 1;

  const openAddModal = () => {
    if (activeTab === "contact") {
      setModal({ mode: "add", type: "contact", data: { name: "", email: "", phone: "", message: "", status: "New" } });
    } else if (activeTab === "volunteer") {
      setModal({ mode: "add", type: "volunteer", data: { name: "", email: "", phone: "", interest: "", message: "", status: "Pending" } });
    } else if (activeTab === "donation") {
      setModal({ mode: "add", type: "donation", data: { donorName: "", amount: "", paymentMethod: "EasyPaisa", transactionRef: "", status: "Pending" } });
    } else {
      setModal({ mode: "add", type: "certificate", data: { fullName: "", email: "", program: "", certificateId: `YEF-${Date.now().toString().slice(-6)}`, issueDate: todayStr(), status: "Verified" } });
    }
  };

  const openEditModal = (type: TabKey, item: Contact | Volunteer | Donation | Certificate) => {
    if (type === "contact") {
      const c = item as Contact;
      setModal({ mode: "edit", type, id: c.id, data: { name: c.name, email: c.email, phone: c.phone, message: c.message, status: c.status } });
    } else if (type === "volunteer") {
      const v = item as Volunteer;
      setModal({ mode: "edit", type, id: v.id, data: { name: v.name, email: v.email, phone: v.phone, interest: v.interest, message: v.message, status: v.status } });
    } else if (type === "donation") {
      const d = item as Donation;
      setModal({ mode: "edit", type, id: d.id, data: { donorName: d.donorName, amount: String(d.amount), paymentMethod: d.paymentMethod, transactionRef: d.transactionRef, status: d.status } });
    } else {
      const cert = item as Certificate;
      setModal({ mode: "edit", type, id: cert.id, data: { fullName: cert.fullName, email: cert.email, program: cert.program, certificateId: cert.certificateId, issueDate: cert.issueDate, status: cert.status } });
    }
  };

  const handleDelete = async (type: TabKey, id: number) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    if (type === "contact") {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      try { await fetch(`/api/contact?id=${id}`, { method: "DELETE" }); } catch {}
    } else if (type === "volunteer") {
      setVolunteers((prev) => prev.filter((v) => v.id !== id));
      try { await fetch(`/api/volunteers?id=${id}`, { method: "DELETE" }); } catch {}
    } else if (type === "donation") {
      setDonations((prev) => prev.filter((d) => d.id !== id));
      try { await fetch(`/api/donations?id=${id}`, { method: "DELETE" }); } catch {}
    } else if (type === "certificate") {
      setCertificates((prev) => prev.filter((c) => c.id !== id));
      try { await fetch(`/api/certificates?id=${id}`, { method: "DELETE" }); } catch {}
    }
  };

  const handleSaveModal = async () => {
    if (!modal) return;
    const { mode, type, data, id } = modal;

    if (type === "contact") {
      if (mode === "add") {
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone, message: data.message }),
          });
          const resJson = await res.json();
          if (resJson.success) fetchContacts();
          else {
            const record: Contact = { id: nextId(contacts), name: data.name, email: data.email, phone: data.phone, message: data.message, date: todayStr(), status: "New" };
            setContacts((prev) => [record, ...prev]);
          }
        } catch {
          const record: Contact = { id: nextId(contacts), name: data.name, email: data.email, phone: data.phone, message: data.message, date: todayStr(), status: "New" };
          setContacts((prev) => [record, ...prev]);
        }
      } else {
        const record: Contact = { id: id || nextId(contacts), name: data.name, email: data.email, phone: data.phone, message: data.message, date: contacts.find((c) => c.id === id)?.date || todayStr(), status: data.status as ContactStatus };
        setContacts((prev) => prev.map((c) => (c.id === id ? record : c)));
        try {
          await fetch("/api/contact", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: data.status, name: data.name, email: data.email, phone: data.phone, message: data.message }),
          });
        } catch {}
      }
    }

    if (type === "volunteer") {
      if (mode === "add") {
        try {
          const res = await fetch("/api/volunteers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone, interest: data.interest, message: data.message }),
          });
          const resJson = await res.json();
          if (resJson.success) fetchVolunteers();
          else {
            const record: Volunteer = { id: nextId(volunteers), name: data.name, email: data.email, phone: data.phone, interest: data.interest, message: data.message, date: todayStr(), status: "Pending" };
            setVolunteers((prev) => [record, ...prev]);
          }
        } catch {
          const record: Volunteer = { id: nextId(volunteers), name: data.name, email: data.email, phone: data.phone, interest: data.interest, message: data.message, date: todayStr(), status: "Pending" };
          setVolunteers((prev) => [record, ...prev]);
        }
      } else {
        const record: Volunteer = { id: id || nextId(volunteers), name: data.name, email: data.email, phone: data.phone, interest: data.interest, message: data.message, date: volunteers.find((v) => v.id === id)?.date || todayStr(), status: data.status as VolunteerStatus };
        setVolunteers((prev) => prev.map((v) => (v.id === id ? record : v)));
        try {
          await fetch("/api/volunteers", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: data.status, name: data.name, email: data.email, phone: data.phone, interest: data.interest, message: data.message }),
          });
        } catch {}
      }
    }

    if (type === "donation") {
      if (mode === "add") {
        try {
          const res = await fetch("/api/donations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              donor_name: data.donorName,
              donor_email: `${data.donorName.toLowerCase().replace(/\s+/g, "")}@example.com`,
              amount: Number(data.amount) || 0,
              payment_method: data.paymentMethod || "Direct",
              transaction_ref: data.transactionRef || null,
              status: data.status || "Pending",
            }),
          });
          const resJson = await res.json();
          if (resJson.success) fetchDonations();
          else {
            const record: Donation = { id: nextId(donations), donorName: data.donorName, amount: Number(data.amount) || 0, paymentMethod: data.paymentMethod, transactionRef: data.transactionRef, date: todayStr(), status: data.status as DonationStatus };
            setDonations((prev) => [record, ...prev]);
          }
        } catch {
          const record: Donation = { id: nextId(donations), donorName: data.donorName, amount: Number(data.amount) || 0, paymentMethod: data.paymentMethod, transactionRef: data.transactionRef, date: todayStr(), status: data.status as DonationStatus };
          setDonations((prev) => [record, ...prev]);
        }
      } else {
        const record: Donation = { id: id || nextId(donations), donorName: data.donorName, amount: Number(data.amount) || 0, paymentMethod: data.paymentMethod, transactionRef: data.transactionRef, date: donations.find((d) => d.id === id)?.date || todayStr(), status: data.status as DonationStatus };
        setDonations((prev) => prev.map((d) => (d.id === id ? record : d)));
        try {
          await fetch("/api/donations", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: data.status, donor_name: data.donorName, amount: data.amount, payment_method: data.paymentMethod, transaction_ref: data.transactionRef }),
          });
        } catch {}
      }
    }

    if (type === "certificate") {
      if (mode === "add") {
        try {
          const res = await fetch("/api/certificates", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              full_name: data.fullName,
              email: data.email,
              certificate_program: data.program,
              certificate_id: data.certificateId,
              issue_date: data.issueDate,
              status: data.status,
            }),
          });
          const resJson = await res.json();
          if (resJson.success) fetchCertificates();
          else {
            const record: Certificate = { id: nextId(certificates), fullName: data.fullName, email: data.email, program: data.program, certificateId: data.certificateId, issueDate: data.issueDate, status: data.status as CertificateStatus };
            setCertificates((prev) => [record, ...prev]);
          }
        } catch {
          const record: Certificate = { id: nextId(certificates), fullName: data.fullName, email: data.email, program: data.program, certificateId: data.certificateId, issueDate: data.issueDate, status: data.status as CertificateStatus };
          setCertificates((prev) => [record, ...prev]);
        }
      } else {
        const record: Certificate = { id: id || nextId(certificates), fullName: data.fullName, email: data.email, program: data.program, certificateId: data.certificateId, issueDate: data.issueDate, status: data.status as CertificateStatus };
        setCertificates((prev) => prev.map((c) => (c.id === id ? record : c)));
        try {
          await fetch("/api/certificates", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: data.status, full_name: data.fullName, certificate_program: data.program, issue_date: data.issueDate }),
          });
        } catch {}
      }
    }

    setModal(null);
  };

  // Filtered queries
  const filteredContacts = contacts.filter((c) => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.toLowerCase().includes(search.toLowerCase())
  );
  
  const filteredVolunteers = volunteers.filter((v) => 
    v.name.toLowerCase().includes(search.toLowerCase()) || 
    v.email.toLowerCase().includes(search.toLowerCase()) || 
    v.interest.toLowerCase().includes(search.toLowerCase())
  );
  
  const filteredDonations = donations.filter((d) => 
    d.donorName.toLowerCase().includes(search.toLowerCase()) || 
    d.transactionRef.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCertificates = certificates.filter((c) => 
    c.fullName.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase()) || 
    c.program.toLowerCase().includes(search.toLowerCase()) ||
    c.certificateId.toLowerCase().includes(search.toLowerCase())
  );

  const titles: Record<TabKey, string> = {
    contact: "Contact Management",
    volunteer: "Volunteer Management",
    donation: "Donation Management",
    certificate: "Certificate Management",
  };

  const statusOptionsByType: Record<TabKey, string[]> = {
    contact: ["New", "Read", "Resolved"],
    volunteer: ["Pending", "Approved", "Rejected"],
    donation: ["Pending", "Verified", "Rejected"],
    certificate: ["Verified", "Pending", "Revoked"],
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-32 flex items-stretch">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-blue-600/40">
          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center font-bold text-blue-800 shrink-0">
            YEF
          </div>
          <div>
            <p className="font-bold text-sm leading-tight">Youth Evolution</p>
            <p className="text-blue-200 text-xs">Foundation</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === item.key ? "bg-white text-blue-800 shadow" : "text-blue-100 hover:bg-blue-600/40"
              }`}
            >
              <span>{item.icon}</span>
              {item.label} Management
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-600/40">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-medium py-2.5 rounded-lg transition"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-x-auto">
        <div className="flex items-center justify-between mb-6 gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${titles[activeTab].toLowerCase()}...`}
            className="w-80 bg-white border border-gray-200 rounded-md px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-4 py-2 rounded-md transition shrink-0 shadow-sm"
          >
            + Add New {activeTab === "contact" ? "Contact" : activeTab === "volunteer" ? "Volunteer" : activeTab === "donation" ? "Donation" : "Certificate"}
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">{titles[activeTab]}</h1>

        {/* 1. Contact Table */}
        {activeTab === "contact" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <p className="text-sm font-medium text-gray-600">{filteredContacts.length} Contact{filteredContacts.length !== 1 ? "s" : ""}</p>
              <button onClick={fetchContacts} className="text-xs text-blue-600 hover:underline">Refresh</button>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">#</th>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Phone</th>
                  <th className="px-6 py-3 font-medium">Message</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingContacts ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-400">Loading contacts from database...</td>
                  </tr>
                ) : filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-400">No contacts found.</td>
                  </tr>
                ) : (
                  filteredContacts.map((c, i) => (
                    <tr key={c.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-400">{c.id}</td>
                      <td className="px-6 py-4 flex items-center gap-3 font-medium text-gray-800">
                        <Avatar name={c.name} index={i} /> {c.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{c.email}</td>
                      <td className="px-6 py-4 text-gray-600">{c.phone}</td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{c.message}</td>
                      <td className="px-6 py-4 text-gray-600">{c.date}</td>
                      <td className="px-6 py-4"><StatusBadge status={c.status} /></td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => openEditModal("contact", c)} className="text-blue-600 border border-blue-600 rounded-md px-3 py-1 text-xs font-medium hover:bg-blue-50 transition">Update</button>
                          <button onClick={() => handleDelete("contact", c.id)} className="text-red-600 border border-red-600 rounded-md px-3 py-1 text-xs font-medium hover:bg-red-50 transition">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* 2. Volunteer Table */}
        {activeTab === "volunteer" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <p className="text-sm font-medium text-gray-600">{filteredVolunteers.length} Volunteer{filteredVolunteers.length !== 1 ? "s" : ""}</p>
              <button onClick={fetchVolunteers} className="text-xs text-blue-600 hover:underline">Refresh</button>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">#</th>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Phone</th>
                  <th className="px-6 py-3 font-medium">Interest</th>
                  <th className="px-6 py-3 font-medium">Message</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingVolunteers ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-8 text-center text-gray-400">Loading volunteers from database...</td>
                  </tr>
                ) : filteredVolunteers.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-8 text-center text-gray-400">No volunteers found.</td>
                  </tr>
                ) : (
                  filteredVolunteers.map((v, i) => (
                    <tr key={v.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-400">{v.id}</td>
                      <td className="px-6 py-4 flex items-center gap-3 font-medium text-gray-800">
                        <Avatar name={v.name} index={i} /> {v.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{v.email}</td>
                      <td className="px-6 py-4 text-gray-600">{v.phone}</td>
                      <td className="px-6 py-4 text-gray-600">{v.interest}</td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{v.message}</td>
                      <td className="px-6 py-4 text-gray-600">{v.date}</td>
                      <td className="px-6 py-4"><StatusBadge status={v.status} /></td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => openEditModal("volunteer", v)} className="text-blue-600 border border-blue-600 rounded-md px-3 py-1 text-xs font-medium hover:bg-blue-50 transition">Update</button>
                          <button onClick={() => handleDelete("volunteer", v.id)} className="text-red-600 border border-red-600 rounded-md px-3 py-1 text-xs font-medium hover:bg-red-50 transition">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. Donation Table */}
        {activeTab === "donation" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <p className="text-sm font-medium text-gray-600">{filteredDonations.length} Donation{filteredDonations.length !== 1 ? "s" : ""}</p>
              <button onClick={fetchDonations} className="text-xs text-blue-600 hover:underline">Refresh</button>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">#</th>
                  <th className="px-6 py-3 font-medium">Donor</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Payment Method</th>
                  <th className="px-6 py-3 font-medium">Transaction Ref</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingDonations ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-400">Loading donations from database...</td>
                  </tr>
                ) : filteredDonations.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-400">No donations found.</td>
                  </tr>
                ) : (
                  filteredDonations.map((d, i) => (
                    <tr key={d.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-400">{d.id}</td>
                      <td className="px-6 py-4 flex items-center gap-3 font-medium text-gray-800">
                        <Avatar name={d.donorName} index={i} /> {d.donorName}
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-semibold">Rs. {d.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-gray-600">{d.paymentMethod}</td>
                      <td className="px-6 py-4 text-gray-600 font-mono">{d.transactionRef}</td>
                      <td className="px-6 py-4 text-gray-600">{d.date}</td>
                      <td className="px-6 py-4"><StatusBadge status={d.status} /></td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => openEditModal("donation", d)} className="text-blue-600 border border-blue-600 rounded-md px-3 py-1 text-xs font-medium hover:bg-blue-50 transition">Update</button>
                          <button onClick={() => handleDelete("donation", d.id)} className="text-red-600 border border-red-600 rounded-md px-3 py-1 text-xs font-medium hover:bg-red-50 transition">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* 4. Certificate Management Table */}
        {activeTab === "certificate" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <p className="text-sm font-medium text-gray-600">{filteredCertificates.length} Certificate{filteredCertificates.length !== 1 ? "s" : ""}</p>
              <button onClick={fetchCertificates} className="text-xs text-blue-600 hover:underline">Refresh</button>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">#</th>
                  <th className="px-6 py-3 font-medium">Participant Name</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Program / Track</th>
                  <th className="px-6 py-3 font-medium">Certificate ID</th>
                  <th className="px-6 py-3 font-medium">Issue Date</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingCertificates ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-400">Loading certificates from database...</td>
                  </tr>
                ) : filteredCertificates.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-400">No certificates found.</td>
                  </tr>
                ) : (
                  filteredCertificates.map((cert, i) => (
                    <tr key={cert.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-400">{cert.id}</td>
                      <td className="px-6 py-4 flex items-center gap-3 font-medium text-gray-800">
                        <Avatar name={cert.fullName} index={i} /> {cert.fullName}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{cert.email}</td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{cert.program}</td>
                      <td className="px-6 py-4 text-[#0046ad] font-mono font-bold text-xs">{cert.certificateId}</td>
                      <td className="px-6 py-4 text-gray-600">{cert.issueDate}</td>
                      <td className="px-6 py-4"><StatusBadge status={cert.status} /></td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => openEditModal("certificate", cert)} className="text-blue-600 border border-blue-600 rounded-md px-3 py-1 text-xs font-medium hover:bg-blue-50 transition">Update</button>
                          <button onClick={() => handleDelete("certificate", cert.id)} className="text-red-600 border border-red-600 rounded-md px-3 py-1 text-xs font-medium hover:bg-red-50 transition">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Add / Edit Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {modal.mode === "add" ? "Add New" : "Update"} {modal.type === "contact" ? "Contact" : modal.type === "volunteer" ? "Volunteer" : modal.type === "donation" ? "Donation" : "Certificate"}
            </h2>

            <div className="space-y-3">
              {/* Contact Form */}
              {modal.type === "contact" && (
                <>
                  <input placeholder="Name" value={modal.data.name} onChange={(e) => setModal({ ...modal, data: { ...modal.data, name: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <input placeholder="Email" value={modal.data.email} onChange={(e) => setModal({ ...modal, data: { ...modal.data, email: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <input placeholder="Phone" value={modal.data.phone} onChange={(e) => setModal({ ...modal, data: { ...modal.data, phone: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <textarea placeholder="Message" value={modal.data.message} onChange={(e) => setModal({ ...modal, data: { ...modal.data, message: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                </>
              )}

              {/* Volunteer Form */}
              {modal.type === "volunteer" && (
                <>
                  <input placeholder="Name" value={modal.data.name} onChange={(e) => setModal({ ...modal, data: { ...modal.data, name: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <input placeholder="Email" value={modal.data.email} onChange={(e) => setModal({ ...modal, data: { ...modal.data, email: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <input placeholder="Phone" value={modal.data.phone} onChange={(e) => setModal({ ...modal, data: { ...modal.data, phone: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <input placeholder="Interest" value={modal.data.interest} onChange={(e) => setModal({ ...modal, data: { ...modal.data, interest: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <textarea placeholder="Message" value={modal.data.message} onChange={(e) => setModal({ ...modal, data: { ...modal.data, message: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                </>
              )}

              {/* Donation Form */}
              {modal.type === "donation" && (
                <>
                  <input placeholder="Donor Name" value={modal.data.donorName} onChange={(e) => setModal({ ...modal, data: { ...modal.data, donorName: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <input placeholder="Amount (e.g. 5000)" type="number" value={modal.data.amount} onChange={(e) => setModal({ ...modal, data: { ...modal.data, amount: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <input placeholder="Payment Method (e.g. EasyPaisa, JazzCash, Bank)" value={modal.data.paymentMethod} onChange={(e) => setModal({ ...modal, data: { ...modal.data, paymentMethod: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <input placeholder="Transaction Ref" value={modal.data.transactionRef} onChange={(e) => setModal({ ...modal, data: { ...modal.data, transactionRef: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                </>
              )}

              {/* Certificate Form */}
              {modal.type === "certificate" && (
                <>
                  <input placeholder="Participant Full Name" value={modal.data.fullName} onChange={(e) => setModal({ ...modal, data: { ...modal.data, fullName: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <input placeholder="Participant Email" type="email" value={modal.data.email} onChange={(e) => setModal({ ...modal, data: { ...modal.data, email: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <input placeholder="Program Name (e.g. Web Development Internship 2026)" value={modal.data.program} onChange={(e) => setModal({ ...modal, data: { ...modal.data, program: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <input placeholder="Certificate ID (e.g. YEF-WD-2026-001)" value={modal.data.certificateId} onChange={(e) => setModal({ ...modal, data: { ...modal.data, certificateId: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <input placeholder="Issue Date (YYYY-MM-DD)" type="date" value={modal.data.issueDate} onChange={(e) => setModal({ ...modal, data: { ...modal.data, issueDate: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                </>
              )}

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                <select
                  value={modal.data.status}
                  onChange={(e) => setModal({ ...modal, data: { ...modal.data, status: e.target.value } })}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-white"
                >
                  {statusOptionsByType[modal.type].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm rounded-md text-gray-600 hover:bg-gray-100 transition">Cancel</button>
              <button onClick={handleSaveModal} className="px-4 py-2 text-sm rounded-md bg-blue-700 text-white hover:bg-blue-800 transition font-medium">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}