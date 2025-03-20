import ImageLinearGradientProps from '/src/components/ImageLinearGradientCP/types/ImageLinearGradientProps'

const ImageLinearGradientCP = (props: ImageLinearGradientProps) => {
    return (
        <div
            className={props?.className}
            style={{
                width: props.width,
                height: props.height,
                background: `linear-gradient(rgba(${props.primaryRgba.red}, ${props.primaryRgba.green}, ${props.primaryRgba.blue},${props.primaryRgba.opacity}), rgba(${props.primaryRgba.red}, ${props.secondaryRgba.green}, ${props.secondaryRgba.blue},${props.secondaryRgba.opacity})), url('${props.img}')`,
                backgroundSize: props.backgroundSize
            }}>
        </div>
    )
}

export default ImageLinearGradientCP