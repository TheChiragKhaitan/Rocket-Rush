'use client'

import BoulderComponent from "@/components/BoulderComponent";
import GameInfoOverlay from "@/components/GameInfoOverlay";
import HandRecognizer from "@/components/HandRecognizer";
import RocketComponent from "@/components/RocketComponent";
import { playBackground, playCrash } from "@/utils/audioHandler";
import { useEffect, useRef, useState } from "react";

let generationInterval: any;
let removalInterval: any;
let isInvincible = false;
let distanceInterval: any;
let livesRemaining: number;

export default function Home() {

  const [rocketLeft, setRocketLeft] = useState(0)
  const [isDetected, setIsDetected] = useState(false)
  const [degrees, setDegrees] = useState(0)
  const [boulders, setBoulders] = useState<any[]>([])
  const [rocket, setRocket] = useState<any>()
  const [detectCollisionTrigger, setDetectCollisionTrigger] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isColliding, setIsColliding] = useState(false)
  const [distance, setDistance] = useState(0)
  const [isLivesRemaining, setIsLivesRemaining] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)

  const rocketRef = useRef(null)

  useEffect(() => {

    setRocketLeft(window.innerWidth / 2)
    livesRemaining = 5
    setIsLivesRemaining(livesRemaining)

  }, [])

  useEffect(() => {

    if (isDetected && !isGameOver) {
      distanceInterval = setInterval(() => {
        setDistance(prev => prev + 1)
      }, 100)
    }

    return () => {
      clearInterval(distanceInterval)
    }

  }, [isDetected, isGameOver])

  useEffect(() => {

    if (isDetected && !isGameOver) {

      generationInterval = setInterval(() => {
        setBoulders(prev => {
          let retArr = [...prev]

          for (let i = 0; i < 4; i++) {
            const now = Date.now()
            retArr = [...retArr, { timestamp: now, key: `${now}-${Math.random()}` }]
          }

          return retArr
        })
      }, 1000)

      removalInterval = setInterval(() => {

        const now = Date.now()

        setBoulders(prevArr => {
          return prevArr.filter((boulder, index) => {
            return (now - boulder.timestamp) < 5000
          })
        })
      }, 5000)

    }

    return () => {
      clearInterval(generationInterval)
      clearInterval(removalInterval)
    }

  }, [isDetected, isGameOver])

  useEffect(() => {

    if ( isDetected && !isGameOver ) {
      playBackground(false);
    }
    else {
      playBackground(true);
    }

  },[isDetected, isGameOver])

  const setHandResults = (result: any) => {

    setIsLoading(result.isLoading)
    setIsDetected(result.isDetected)
    setDegrees(result.degrees)

    if (result.degrees && result.degrees !== 0) {

      setDetectCollisionTrigger(Math.random())

      setRocketLeft(prev => {
        const ret = prev - result.degrees / 6;

        if (ret < 20) {
          return prev;
        }

        if (ret > window.innerWidth - 52) {
          return prev
        }

        return ret;
      })
    }

    setRocket(((rocketRef.current as any).getBoundingClientRect()))

  }

  const collisionHandler = () => {

    if (!isInvincible && !isGameOver) {

      isInvincible = true;
      setIsColliding(isInvincible)
      playCrash();
      livesRemaining--;
      setIsLivesRemaining(livesRemaining)

      if (livesRemaining <= 0) {
        setIsGameOver(true)
      }

      setTimeout(() => {
        isInvincible = false;
        setIsColliding(isInvincible)
      }, 1500)
    }

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className={`absolute left-3 top-3 z-30 transition-all duration-500 ${(isGameOver && 'w-56')} ${(isDetected && !isGameOver) ? 'w-28' : 'w-56'}`} >
        <HandRecognizer setHandResults={setHandResults} />
      </div>
      <div
        id="rocket-container"
        ref={rocketRef}
        style={{
          position: "absolute",
          marginTop: '500px',
          left: rocketLeft,
          transition: 'all',
          animationDuration: '10ms'
        }}
      >
        <RocketComponent degrees={degrees} />
      </div>
      <div className="absolute z-10 h-screen w-screen overflow-hidden">
        {boulders.map((boulder) => {
          return <BoulderComponent when={detectCollisionTrigger} key={boulder.key} isMoving={isDetected} what={rocket} soWhat={collisionHandler} />
        })}
      </div>
      <GameInfoOverlay info={{ isLoading, isDetected, isColliding, distance, isLivesRemaining, isGameOver }} />
    </main>
  );
}
