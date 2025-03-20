import { CSSProperties } from "react"

type ImageLinearGradientProps = CSSProperties & {
    className?: string | undefined
    img: string
    primaryRgba: {
        red: number
        green: number
        blue: number,
        opacity: number
    }
    secondaryRgba: {
        red: number
        green: number
        blue: number,
        opacity: number
    }
}

export default ImageLinearGradientProps