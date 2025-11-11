import { useEffect, useState } from 'react'
import { watchValue } from '../realtime/rtdb'

export default function useRtdbValue(path, { initial = null } = {}) {
    const [value, setValue] = useState(initial)
    useEffect(() => {
        if (!path) return
        const off = watchValue(path, setValue)
        return off
    }, [path])
    return value
}
