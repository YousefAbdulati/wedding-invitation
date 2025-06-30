import React, { useEffect, useState } from 'react';
import '../App.css';

export default function DateSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2025-08-05T19:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft(null);
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="time" className="section">
      <div className="container">
        <h2 className="section-title">Save The Date</h2>
        <div className="time-card">
          <div className="card-text">
            <h3>Thursday, 5 August 2025</h3>
            <h4>07:00 PM</h4>
          </div>
          <hr />
          <div className="countdown">
            {timeLeft ? (
              <>
                <p>{timeLeft.days} Days</p>
                <p>{timeLeft.hours} Hours</p>
                <p>{timeLeft.minutes} Minutes</p>
                <p>{timeLeft.seconds} Seconds</p>
              </>
            ) : (
              <p>Countdown Finished!</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
