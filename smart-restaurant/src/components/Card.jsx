import React from "react";

export default function Card({ title, children }) {
    return (
        <div style={{
            border: '1px solid rgba(255,255,255,.08)',
            borderRadius: 12,
            padding: 16,
            background: 'rgba(255,255,255,.03)'
        }}>
            {title ? <h3 style={{ marginTop: 0 }}>{title}</h3> : null}
            {children}
        </div>
    )
}
