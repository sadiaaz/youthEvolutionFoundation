"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ContactStatus = "New" | "Read" | "Resolved";
type VolunteerStatus = "Pending" | "Approved" | "Rejected";
type DonationStatus = "Pending" | "Verified" | "Rejected";

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

type TabKey = "contact" | "volunteer" | "donation";

const initialContacts: Contact[] = [
  { id: 1, name: "Ali Raza", email: "ali@example.com", phone: "03001234567", message: "Interested in your programs.", date: "2026-09-01", status: "New" },
  { id: 2, name: "Sara Khan", email: "sara@example.com", phone: "03007654321", message: "Need more info about events.", date: "2026-08-28", status: "Read" },
];

const initialVolunteers: Volunteer[] = [
  { id: 1, name: "Bilal Ahmed", email: "bilal@example.com", interest: "Teaching", message: "Want to help teach kids.", date: "2026-09-02", status: "Pending" },
];

const initialDonations: Donation[] = [
  { id: 1, donorName: "Hassan Iqbal", amount: 5000, paymentMethod: "EasyPaisa", transactionRef: "TXN12345", date: "2026-09-03", status: "Pending" },
];

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Read: "bg-gray-100 text-gray-700",
  Resolved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Verified: "bg-green-100 text-green-700",
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
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
      {status}
    </span>
  );
}

const navItems = [
  { key: "contact", label: "Contact", icon: "💬" },
  { key: "volunteer", label: "Volunteer", icon: "🤝" },
  { key: "donation", label: "Donation", icon: "❤️" },
] as const;

const todayStr = () => new Date().toISOString().split("T")[0];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("contact");
  const [search, setSearch] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [volunteers, setVolunteers] = useState<Volunteer[]>(initialVolunteers);
  const [donations, setDonations] = useState<Donation[]>(initialDonations);

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
      setModal({ mode: "add", type: "volunteer", data: { name: "", email: "", interest: "", message: "", status: "Pending" } });
    } else {
      setModal({ mode: "add", type: "donation", data: { donorName: "", amount: "", paymentMethod: "", transactionRef: "", status: "Pending" } });
    }
  };

  const openEditModal = (type: TabKey, item: Contact | Volunteer | Donation) => {
    if (type === "contact") {
      const c = item as Contact;
      setModal({ mode: "edit", type, id: c.id, data: { name: c.name, email: c.email, phone: c.phone, message: c.message, status: c.status } });
    } else if (type === "volunteer") {
      const v = item as Volunteer;
      setModal({ mode: "edit", type, id: v.id, data: { name: v.name, email: v.email, interest: v.interest, message: v.message, status: v.status } });
    } else {
      const d = item as Donation;
      setModal({ mode: "edit", type, id: d.id, data: { donorName: d.donorName, amount: String(d.amount), paymentMethod: d.paymentMethod, transactionRef: d.transactionRef, status: d.status } });
    }
  };

  const handleDelete = (type: TabKey, id: number) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    if (type === "contact") setContacts((prev) => prev.filter((c) => c.id !== id));
    if (type === "volunteer") setVolunteers((prev) => prev.filter((v) => v.id !== id));
    if (type === "donation") setDonations((prev) => prev.filter((d) => d.id !== id));
  };

  const handleSaveModal = () => {
    if (!modal) return;
    const { mode, type, data, id } = modal;

    if (type === "contact") {
      const record: Contact = {
        id: mode === "edit" && id ? id : nextId(contacts),
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        date: mode === "edit" ? contacts.find((c) => c.id === id)?.date || todayStr() : todayStr(),
        status: data.status as ContactStatus,
      };
      setContacts((prev) => (mode === "edit" ? prev.map((c) => (c.id === id ? record : c)) : [record, ...prev]));
    }

    if (type === "volunteer") {
      const record: Volunteer = {
        id: mode === "edit" && id ? id : nextId(volunteers),
        name: data.name,
        email: data.email,
        interest: data.interest,
        message: data.message,
        date: mode === "edit" ? volunteers.find((v) => v.id === id)?.date || todayStr() : todayStr(),
        status: data.status as VolunteerStatus,
      };
      setVolunteers((prev) => (mode === "edit" ? prev.map((v) => (v.id === id ? record : v)) : [record, ...prev]));
    }

    if (type === "donation") {
      const record: Donation = {
        id: mode === "edit" && id ? id : nextId(donations),
        donorName: data.donorName,
        amount: Number(data.amount) || 0,
        paymentMethod: data.paymentMethod,
        transactionRef: data.transactionRef,
        date: mode === "edit" ? donations.find((d) => d.id === id)?.date || todayStr() : todayStr(),
        status: data.status as DonationStatus,
      };
      setDonations((prev) => (mode === "edit" ? prev.map((d) => (d.id === id ? record : d)) : [record, ...prev]));
    }

    setModal(null);
  };

  const filteredContacts = contacts.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  const filteredVolunteers = volunteers.filter((v) => v.name.toLowerCase().includes(search.toLowerCase()));
  const filteredDonations = donations.filter((d) => d.donorName.toLowerCase().includes(search.toLowerCase()));

  const titles: Record<TabKey, string> = {
    contact: "Contact Management",
    volunteer: "Volunteer Management",
    donation: "Donation Management",
  };

  const statusOptionsByType: Record<TabKey, string[]> = {
    contact: ["New", "Read", "Resolved"],
    volunteer: ["Pending", "Approved", "Rejected"],
    donation: ["Pending", "Verified", "Rejected"],
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
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email..."
            className="w-80 bg-white border border-gray-200 rounded-md px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-4 py-2 rounded-md transition"
          >
            + Add New {activeTab === "contact" ? "Contact" : activeTab === "volunteer" ? "Volunteer" : "Donation"}
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">{titles[activeTab]}</h1>

        {/* Contact Table */}
        {activeTab === "contact" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
              <p className="text-sm text-gray-500">{filteredContacts.length} Contact{filteredContacts.length !== 1 ? "s" : ""}</p>
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
                {filteredContacts.map((c, i) => (
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
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Volunteer Table */}
        {activeTab === "volunteer" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
              <p className="text-sm text-gray-500">{filteredVolunteers.length} Volunteer{filteredVolunteers.length !== 1 ? "s" : ""}</p>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">#</th>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Interest</th>
                  <th className="px-6 py-3 font-medium">Message</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVolunteers.map((v, i) => (
                  <tr key={v.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-400">{v.id}</td>
                    <td className="px-6 py-4 flex items-center gap-3 font-medium text-gray-800">
                      <Avatar name={v.name} index={i} /> {v.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{v.email}</td>
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
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Donation Table */}
        {activeTab === "donation" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
              <p className="text-sm text-gray-500">{filteredDonations.length} Donation{filteredDonations.length !== 1 ? "s" : ""}</p>
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
                {filteredDonations.map((d, i) => (
                  <tr key={d.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-400">{d.id}</td>
                    <td className="px-6 py-4 flex items-center gap-3 font-medium text-gray-800">
                      <Avatar name={d.donorName} index={i} /> {d.donorName}
                    </td>
                    <td className="px-6 py-4 text-gray-600">Rs. {d.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-600">{d.paymentMethod}</td>
                    <td className="px-6 py-4 text-gray-600">{d.transactionRef}</td>
                    <td className="px-6 py-4 text-gray-600">{d.date}</td>
                    <td className="px-6 py-4"><StatusBadge status={d.status} /></td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEditModal("donation", d)} className="text-blue-600 border border-blue-600 rounded-md px-3 py-1 text-xs font-medium hover:bg-blue-50 transition">Update</button>
                        <button onClick={() => handleDelete("donation", d.id)} className="text-red-600 border border-red-600 rounded-md px-3 py-1 text-xs font-medium hover:bg-red-50 transition">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
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
              {modal.mode === "add" ? "Add New" : "Update"} {modal.type === "contact" ? "Contact" : modal.type === "volunteer" ? "Volunteer" : "Donation"}
            </h2>

            <div className="space-y-3">
              {modal.type === "contact" && (
                <>
                  <input placeholder="Name" value={modal.data.name} onChange={(e) => setModal({ ...modal, data: { ...modal.data, name: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <input placeholder="Email" value={modal.data.email} onChange={(e) => setModal({ ...modal, data: { ...modal.data, email: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <input placeholder="Phone" value={modal.data.phone} onChange={(e) => setModal({ ...modal, data: { ...modal.data, phone: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <textarea placeholder="Message" value={modal.data.message} onChange={(e) => setModal({ ...modal, data: { ...modal.data, message: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                </>
              )}

              {modal.type === "volunteer" && (
                <>
                  <input placeholder="Name" value={modal.data.name} onChange={(e) => setModal({ ...modal, data: { ...modal.data, name: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <input placeholder="Email" value={modal.data.email} onChange={(e) => setModal({ ...modal, data: { ...modal.data, email: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <input placeholder="Interest" value={modal.data.interest} onChange={(e) => setModal({ ...modal, data: { ...modal.data, interest: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <textarea placeholder="Message" value={modal.data.message} onChange={(e) => setModal({ ...modal, data: { ...modal.data, message: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                </>
              )}

              {modal.type === "donation" && (
                <>
                  <input placeholder="Donor Name" value={modal.data.donorName} onChange={(e) => setModal({ ...modal, data: { ...modal.data, donorName: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <input placeholder="Amount" value={modal.data.amount} onChange={(e) => setModal({ ...modal, data: { ...modal.data, amount: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <input placeholder="Payment Method" value={modal.data.paymentMethod} onChange={(e) => setModal({ ...modal, data: { ...modal.data, paymentMethod: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <input placeholder="Transaction Ref" value={modal.data.transactionRef} onChange={(e) => setModal({ ...modal, data: { ...modal.data, transactionRef: e.target.value } })} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
                </>
              )}

              <select
                value={modal.data.status}
                onChange={(e) => setModal({ ...modal, data: { ...modal.data, status: e.target.value } })}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
              >
                {statusOptionsByType[modal.type].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm rounded-md text-gray-600 hover:bg-gray-100 transition">Cancel</button>
              <button onClick={handleSaveModal} className="px-4 py-2 text-sm rounded-md bg-blue-700 text-white hover:bg-blue-800 transition">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}