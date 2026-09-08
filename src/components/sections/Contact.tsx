import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { profile } from "@/lib/portfolio-data";
import { Section } from "@/components/ui-kit/Section";
import { Magnetic } from "@/components/ui-kit/Magnetic";

export default function Contact() {
  const [launching, setLaunching] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    setLaunching(true);
    window.setTimeout(() => {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
        `Portfolio message from ${name}`,
      )}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;
      setLaunching(false);
      setSent(true);
    }, 1100);
  };

  return (
    <Section id="contact" eyebrow="06 — Mission Control" title="Let's build something.">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="glass rounded-3xl p-7 sm:p-9">
          <p className="text-sm leading-relaxed text-lumen-soft">
            Open to internships, collaborations and any project where I get to learn fast and build
            something real. The fastest way to reach me is email.
          </p>
          <dl className="mt-8 space-y-5 text-sm">
            {[
              { k: "Email", v: profile.email, href: `mailto:${profile.email}` },
              { k: "Phone", v: profile.phone, href: `tel:${profile.phone}` },
              { k: "LinkedIn", v: "ronak-b62b47434", href: profile.linkedin },
              { k: "Location", v: profile.location },
            ].map((row) => (
              <div key={row.k} className="border-b border-lumen/10 pb-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.28em] text-lumen-soft">
                  {row.k}
                </dt>
                <dd className="mt-1 break-words text-lumen">
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer noopener"
                      className="transition-colors hover:text-halo"
                    >
                      {row.v}
                    </a>
                  ) : (
                    row.v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <form onSubmit={onSubmit} className="glass rounded-3xl p-7 sm:p-9">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Your name" />
            <Field label="Email" name="email" type="email" placeholder="you@domain.com" />
          </div>
          <div className="mt-5">
            <label
              htmlFor="message"
              className="font-mono text-[10px] uppercase tracking-[0.28em] text-lumen-soft"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell me about it…"
              className="mt-2 w-full resize-none rounded-2xl border border-lumen/15 bg-lumen/5 px-4 py-3 text-sm text-lumen placeholder:text-lumen-soft/60 focus:border-halo focus:outline-none"
            />
          </div>

          <div className="mt-7 flex items-center gap-4">
            <Magnetic>
              <button
                type="submit"
                disabled={launching}
                className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-halo px-7 py-3 text-sm font-medium text-ink disabled:opacity-80"
              >
                <span>Launch Message</span>
                <motion.span
                  animate={
                    launching
                      ? { x: 160, y: -160, rotate: 45, opacity: 0 }
                      : { x: 0, y: 0, rotate: 0, opacity: 1 }
                  }
                  transition={{ duration: 1, ease: [0.6, 0, 0.2, 1] }}
                  className="inline-flex"
                >
                  <FiSend />
                </motion.span>
              </button>
            </Magnetic>
            <AnimatePresence>
              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-lumen-soft"
                  role="status"
                >
                  Your mail app should be open — send it and I'll reply.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-mono text-[10px] uppercase tracking-[0.28em] text-lumen-soft"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-lumen/15 bg-lumen/5 px-4 py-3 text-sm text-lumen placeholder:text-lumen-soft/60 focus:border-halo focus:outline-none"
      />
    </div>
  );
}
