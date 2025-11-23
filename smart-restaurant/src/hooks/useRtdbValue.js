import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "../firebase/config";

export function useRtdbValue(path, { initial = null } = {}) {
    const [data, setData] = useState(initial);

    useEffect(() => {
        if (!path) return;

        const dbRef = ref(rtdb, path);
        const unsubscribe = onValue(dbRef, (snapshot) => {
            setData(snapshot.val());
        });

        return () => unsubscribe();
    }, [path]);

    return data;
}
