import React, { useRef, useState } from 'react';

export default function MusicPrompt() {
  const audioRef = useRef(null);
  const [visible, setVisible] = useState(true);

  const handlePlayMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = false;
      audio.play()
        .then(() => {
          setVisible(false); 
        })
        .catch((err) => {
          console.log("Autoplay blocked:", err);
        });
    }
  };

  return (
    <>
      {visible && (
        <div className="music-toggle" onClick={handlePlayMusic}>
          🎵 Tap to Play Music
        </div>
      )}
      <audio ref={audioRef} src="/audio/1.mp3" loop />
    </>
  );
}
