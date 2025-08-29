import * as React from 'react'
import clsx from 'clsx'

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx('mx-auto w-full max-w-6xl px-4', className)} {...props} />
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx('bg-panel/70 backdrop-blur-sm rounded-2xl shadow-soft border border-white/10', className)} {...props} />
}

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={clsx('rounded-xl2 px-4 py-2 font-medium bg-primary hover:bg-primary-600 text-white transition', className)} {...props} />
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="w-full rounded-xl2 bg-[#0d2333] text-white border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-accent" {...props} />
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="w-full rounded-xl2 bg-[#0d2333] text-white border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-accent" rows={8} {...props} />
}

export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className="text-sm text-white/80" {...props} />
}

export function Pill({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-[#0d2333] border border-white/10">{children}</span>
}
