import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DateSection from './components/DateSection';
import PhotoSlider from './components/PhotoSlider';
import CommentSection from './components/CommentSection';
import './App.css';
import BackgroundMusic from './components/BackgroundMusic';

function App() {
  return (
    <>
      <BackgroundMusic />
      <Navbar/>
      <HeroSection/>
      <DateSection/>
      <PhotoSlider/>
      <CommentSection/>
    </>
  );
}

export default App;
