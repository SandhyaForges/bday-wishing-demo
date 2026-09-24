import { useState } from 'react'

const photos = [
  { src: '/img/she in blue.jpg', caption: 'The prettiest girl in blue 💙' },
  { src: '/img/pretty smile.jpg', caption: 'That smile is my favorite view ✨' },
  { src: '/img/preety girl.jpg', caption: 'Pretty is an understatement 🌸' },
  { src: '/img/Luminous twilight smile.jpg', caption: 'Glowing in every twilight 🌙' },
  { src: '/img/little don.jpg', caption: 'My cute little don 🐻' },
  { src: '/img/hervibrant smile.jpg', caption: 'Happiness looks like you 💖' },
  { src: '/img/her.jpg', caption: 'My safest, happiest place 🧸' },
  { src: '/img/her gaze.jpg', caption: 'Those eyes, that magic 🌷' },
  { src: '/img/gorgeous girl in yellow.jpg', caption: 'Sunshine in yellow ☀️' },
  { src: '/img/bossy girl.jpg', caption: 'The boss of my heart 👑' },
]

export default function PhotoGallery() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <div className="section-intro">
        <span className="section-icon">🐼📸🐻</span>
        <p className="eyebrow">a scrapbook of you</p>
        <h2>Precious moments<br /><em>of my favorite person</em></h2>
        <p>Every picture holds a piece of my heart.</p>
      </div>
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <button className="photo-card" key={photo.src} onClick={() => setSelected(photo)}>
            <span className="photo-number">0{index + 1}</span>
            <span className="photo-wrap"><img src={photo.src} alt={photo.caption} /></span>
            <strong>{photo.caption}</strong>
          </button>
        ))}
      </div>
      {selected && (
        <div className="photo-modal" role="presentation" onClick={() => setSelected(null)}>
          <div className="photo-modal-inner" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close photo">×</button>
            <img src={selected.src} alt={selected.caption} />
            <p>{selected.caption}</p>
          </div>
        </div>
      )}
    </>
  )
}
