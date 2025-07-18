"use client"

import { Code2, Database, Globe, Server, Smartphone, Zap } from "lucide-react"

export function FloatingIcons() {
  const icons = [
    { Icon: Code2, delay: "0s", duration: "6s" },
    { Icon: Database, delay: "1s", duration: "8s" },
    { Icon: Globe, delay: "2s", duration: "7s" },
    { Icon: Server, delay: "3s", duration: "9s" },
    { Icon: Smartphone, delay: "4s", duration: "5s" },
    { Icon: Zap, delay: "5s", duration: "6s" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      {icons.map(({ Icon, delay, duration }, index) => (
        <Icon
          key={index}
          className={`absolute text-purple-200/30 animate-float-${index + 1}`}
          size={24}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: delay,
            animationDuration: duration,
          }}
        />
      ))}
    </div>
  )
}
