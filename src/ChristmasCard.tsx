import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './ChristmasCard.module.css';

const playlist = [
  { name: 'Jingle Bells (Piano)', file: 'Jingle Bells (Piano).mp3' },
  { name: 'Jingle Bell Rock', file: 'Jingle Bell Rock.mp3' },
  { name: 'Last Christmas', file: 'Last Christmas.mp3' },
  { name: 'Let It Snow', file: 'Let It Snow.mp3' },
  { name: 'Feliz Navidad', file: 'Feliz Navidad.mp3' },
  { name: 'Its Beginning to Look a Lot Like Christmas', file: 'Its Beginning to Look a Lot Like Christmas.mp3' },
  { name: 'Rockin Around The Christmas Tree', file: 'Rockin Around The Christmas Tree.mp3' },
];

const ChristmasCard: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSong = playlist[currentSongIndex];

  const playSong = useCallback((index: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = `${process.env.PUBLIC_URL}/playlist/${playlist[index].file}`;
    audio.load();
    audio.play().catch(err => console.log('Audio play error:', err));
    setIsPlaying(true);
  }, []);

  const setAudioPlaying = useCallback((shouldPlay: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = false;
    audio.volume = 0.25;

    if (shouldPlay) {
      playSong(currentSongIndex);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [currentSongIndex, playSong]);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(err => console.log('Audio play error:', err));
      setIsPlaying(true);
    }
  };

  const handlePrevSong = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(newIndex);
    if (isOpen) {
      playSong(newIndex);
    }
  };

  const handleNextSong = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = currentSongIndex === playlist.length - 1 ? 0 : currentSongIndex + 1;
    setCurrentSongIndex(newIndex);
    if (isOpen) {
      playSong(newIndex);
    }
  };

  // Handle song end - auto play next
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      const newIndex = currentSongIndex === playlist.length - 1 ? 0 : currentSongIndex + 1;
      setCurrentSongIndex(newIndex);
      playSong(newIndex);
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [currentSongIndex, playSong]);

  const handleToggleOpen = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const next = !isOpen;
    setIsOpen(next);
    setAudioPlaying(next);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOpen(e.target.checked);
    setAudioPlaying(e.target.checked);
  };

  return (
    <>
      <div className={styles.christmasCard}>
        <audio ref={audioRef} preload="auto" playsInline />
        <input id="open" type="checkbox" checked={isOpen} onChange={handleCheckboxChange} />
        <label className={styles.open} htmlFor="open" onClick={handleToggleOpen}></label>
        {!isOpen ? (
          <div className={styles.cardFront}>
            <div className={styles.christmasTree}></div>
            <div className={styles.ribbon}></div>
            <div className={styles.text}>- Click to Open -</div>
            <div className={styles.star}></div>
            <div className={styles.balls}></div>
          </div>
        ) : (
          <div className={`${styles.cardFrontSanta} ${styles.isOpen}`}>
            <div className={styles.santaClaus}></div>
            <div className={styles.front}></div>
            <div className={styles.pompon}></div>
          </div>
        )}

        <div className={styles.cardInside}>
          <img src={`${process.env.PUBLIC_URL}/santa_hmai.jpg`} alt="Santa" className={styles.santaImage} />

          <div className={styles.title}>Merry<br />Christmas!</div>
          <div className={styles.wishes}>I hope the magic of Christmas fills every corner of your heart with joy, now and always.</div>
          <div className={styles.gift}>
            <div className={styles.bow}></div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={styles.musicPlayer}>
          <div className={styles.playerControls}>
            <button className={styles.playerBtn} onClick={handlePrevSong}>
              <img src={`${process.env.PUBLIC_URL}/left.png`} alt="Previous" className={styles.playerIcon} />
            </button>
            <span className={styles.santaIcon} onClick={handleTogglePlay} title={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? '🎅🏻' : '▶️'}
            </span>
            <button className={styles.playerBtn} onClick={handleNextSong}>
              <img src={`${process.env.PUBLIC_URL}/right.png`} alt="Next" className={styles.playerIcon} />
            </button>
          </div>
          <div className={styles.songNameContainer}>
            <span className={styles.songName} key={currentSong.name}>
              {currentSong.name}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ChristmasCard;
