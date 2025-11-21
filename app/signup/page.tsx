"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import logo from '../../assets/img/veemahpay-logo.png';

export default function SignupPage() {
  const router = useRouter();
  const [accountNumber, setAccountNumber] = useState("");
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [initialBalance, setInitialBalance] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const submit = async () => {
    if (pending) return;
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account_number: accountNumber,
          name,
          pin,
          initial_balance: initialBalance ? Number(initialBalance) : 0,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Sign up failed");
        return;
      }
      const acc = data?.account?.account_number;
      if (acc === "0000") {
        router.replace("/admin");
      } else {
        router.replace("/user");
      }
    } catch (e: any) {
      setError(e?.message || "Sign up failed");
    } finally {
      setPending(false);
    }
  };

  return (
    <main>
      <header className="site-header">
        <div className="inner container" style={{ justifyContent: "space-between" }}>
          <div className="brand"><Image src={logo} alt="VeemahPay" width={220} height={60} priority /></div>
        </div>
      </header>
      <section className="quick-actions">
        <div className="inner container" style={{ maxWidth: 520 }}>
          <div className="card" style={{ alignItems: "stretch" }}>
            <h2 style={{ margin: 0 }}>Sign Up</h2>
            {error && <div style={{ color: "#b00020", marginTop: 8 }}>{error}</div>}
            <div style={{ display: "grid", gap: 10, width: "100%", marginTop: 12 }}>
              <input placeholder="Account Number (5 digits)" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} />
              <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
              <input placeholder="PIN (4 digits)" type="password" value={pin} onChange={e => setPin(e.target.value)} />
              <input placeholder="Initial Balance" value={initialBalance} onChange={e => setInitialBalance(e.target.value)} />
              <button className="btn primary" onClick={submit} disabled={pending}>{pending ? "Creating..." : "Create Account"}</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}