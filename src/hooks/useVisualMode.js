import React, { useCallback, useState } from "react";

export default function useVisualMode(initialMode) {
    const [mode, setMode] = useState(initialMode);
    const [history, setHistory] = useState([initialMode]);
    const transition = (mode, replace = false) => {
        if (replace) {
            setHistory(prev => ([...prev.slice(0, prev.length - 1), mode]))
            setMode(mode);
        } else {
            setMode(mode);
            setHistory(prev => ([...prev, mode]))
        }
    }
    const back = (() => {
        if (history.length < 2) {
            return history;
        }
        setHistory(prev => (
            prev.slice(0, prev.length - 1))
        );

        const lastMode = history[history.length - 2];
        setMode(lastMode)

        return mode;
    })
    return { mode, transition, back };
}