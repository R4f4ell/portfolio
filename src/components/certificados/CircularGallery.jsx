import "./circularGallery.scss"

export default function CircularGallery({ items = [] }) {
  return (
    <div className="circular-gallery">
      <div className="circular-gallery__track">
        {items.concat(items).map((item, i) => (
          <div key={i} className="circular-gallery__item">
            <div className="circular-gallery__image">{item.image}</div>
            <p className="circular-gallery__label">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}