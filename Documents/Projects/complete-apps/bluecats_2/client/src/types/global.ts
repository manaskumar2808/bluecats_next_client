import { Quill } from "react-quill"

declare global {
    interface Window {
        Quill: typeof Quill,
    }
}