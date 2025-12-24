import React, { useRef, useState } from 'react';
import styles from './ChristmasCard.module.css';

const ChristmasCard: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const setAudioPlaying = (shouldPlay: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = false;
    audio.volume = 0.25;

    if (shouldPlay) {
      audio.load();
      audio.play().catch(err => console.log('Audio play error:', err));
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const handleToggleOpen = (e: React.MouseEvent<HTMLLabelElement>) => {
    // Prevent the label default toggle; we control checked state ourselves
    e.preventDefault();
    const next = !isOpen;
    setIsOpen(next);
    setAudioPlaying(next);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Keep keyboard toggles working too
    setIsOpen(e.target.checked);
    setAudioPlaying(e.target.checked);
  };

  return (
    <div className={styles.christmasCard}>
      <audio ref={audioRef} loop preload="auto" playsInline>
        <source src="/jingle-bells.mp3" type="audio/mpeg" />
      </audio>
      <input id="open" type="checkbox" checked={isOpen} onChange={handleCheckboxChange} />
      <label className={styles.open} htmlFor="open" onClick={handleToggleOpen}></label>
      <div className={styles.cardFront}>
        <div className={styles.christmasTree}></div>
        <div className={styles.ribbon}></div>
        <div className={styles.text}>- Click to Open -</div>
        <div className={styles.star}></div>
        <div className={styles.balls}></div>
      </div>

      <div className={styles.cardInside}>
        <img src="/santa_hmai.jpg" alt="Santa" className={styles.santaImage} />
        <div className={styles.title}>Merry<br />Christmas!</div>
        <div className={styles.wishes}>I hope the magic of Christmas fills every corner of your heart with joy, now and always.</div>
        <div className={styles.gift}>
          <div className={styles.bow}></div>
        </div>
      </div>
    </div>
  );
};

export default ChristmasCard;
