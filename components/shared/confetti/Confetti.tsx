"use client"
import confetti from "canvas-confetti"
import { useEffect } from "react"

export const Confetti = () => {
    const DURATION = 10 * 1000
    const ANIMATION_END = Date.now() + DURATION
    const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
    }

    const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min
    }

    const handleConfetti = () => {
        const origins = [
            { x: 0.2, y: 0.5 },
            { x: 0.5, y: 0.5 },
            { x: 0.8, y: 0.5 },
        ]

        const interval = setInterval(() => {
            const timeLeft = ANIMATION_END - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval)
            }

            const particleCount = 30 * (timeLeft / DURATION);

            origins.forEach(origin => {
                confetti(
                    Object.assign({}, defaults, {
                        particleCount,
                        origin: {
                            x: randomInRange(origin.x - 0.1, origin.x + 0.1),
                            y: randomInRange(0.3, 0.7)
                        },
                        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
                        gravity: 0.8,
                    })
                )
            })
        }, 250)

        return () => clearInterval(interval)
    }

    useEffect(() => {
        handleConfetti()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return null
}