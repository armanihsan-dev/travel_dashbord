import React from 'react'

const InfoPill = ({ text, image }: InfoPillProps) => {
    return (
        <figure className="info-pill">
            <img src={image} alt={text} />
            <figcaption className='font-[Manrope]'>{text}</figcaption>
        </figure>
    )
}
export default InfoPill
