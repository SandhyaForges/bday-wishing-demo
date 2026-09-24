import { useState } from 'react'

export default function GiftTeaseBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [yesCount, setYesCount] = useState(0)
  const [unlocked, setUnlocked] = useState(false)

  const handleYes = () => {
    const next = yesCount + 1
    setYesCount(next)
    if (next >= 5) setUnlocked(true)
  }

  const reset = () => {
    setIsOpen(false)
    setYesCount(0)
    setUnlocked(false)
  }

  return (
    <>
      <div className="gift-heading">
        <span className="section-icon">🎁✨🎂</span>
        <p className="eyebrow">there is one more thing...</p>
        <h2>A special gift<br /><em>just for you</em></h2>
      </div>
      <button className="gift-open-button" onClick={() => setIsOpen(true)}>🎁 Tap to open your gift 🎁</button>
      {isOpen && (
        <div className="gift-modal" role="presentation" onClick={reset}>
          <div className="gift-modal-card" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={reset} aria-label="Close gift">×</button>
            {!unlocked ? (
              <>
                <span className="big-emoji">{yesCount > 2 ? '🥰💖🐻' : '🐼❤️🐻'}</span>
                <p className="eyebrow">the love meter</p>
                <h3>Aise gift nahi milega! 😜</h3>
                <p className="gift-message">{yesCount ? 'Aww, keep going! A little more love is needed...' : 'First tell me honestly... do you love me?'}</p>
                <div className="meter"><span style={{ width: `${yesCount * 20}%` }} /></div>
                <small>{yesCount} / 5 love confirmations</small>
                <button className="yes-button" onClick={handleYes}>YES, BOHOT SAARA! ❤️</button>
              </>
            ) : (
              <>
                <span className="big-emoji">🎂✨🎁</span>
                <p className="eyebrow">surprise unlocked</p>
                <h3>Happy Birthday, Dudu! 🥳</h3>
                <div className="gift-list"><p>🍰 One giant chocolate strawberry cake</p><p>🧸 Unlimited warm hugs voucher</p><p>💌 A lifetime of extra love from Bubu</p></div>
                <button className="yes-button" onClick={reset}>Enjoy your day! 🐼💖🐻</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
