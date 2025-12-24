import React, { useRef } from 'react';
import styles from './ChristmasCard.module.css';

const ChristmasCard: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleCardClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      if (e.target.checked) {
        audioRef.current.play().catch(err => console.log('Audio play error:', err));
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  return (
    <div className={styles.christmasCard}>
      <audio ref={audioRef} loop>
        <source src="/jingle-bells.mp3" type="audio/mpeg" />
      </audio>
      <input id="open" type="checkbox" onChange={handleCardClick} />
      <label className={styles.open} htmlFor="open"></label>
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
