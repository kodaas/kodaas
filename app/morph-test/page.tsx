import React from 'react';
import ThreeMorph from '../components/ThreeMorph';

export default function MorphTestPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black p-8 transition-colors duration-300">
            <div className="w-full max-w-4xl h-[600px]">
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight">Particle Morph Test</h1>
                <ThreeMorph />
                <p className="text-neutral-500 mt-4 text-center">
                    Particles morphing between Sphere, Cube, Torus, and Galaxy.
                </p>
            </div>
        </main>
    );
}
