import { useRef, useEffect, useState, useCallback } from 'react';

interface VariableProximityProps {
    label: string;
    className?: string;
    fromFontVariationSettings?: string;
    toFontVariationSettings?: string;
    radius?: number;
    falloff?: 'linear' | 'exponential' | 'gaussian';
}

const VariableProximity = ({
    label,
    className = '',
    fromFontVariationSettings = "'wght' 400",
    toFontVariationSettings = "'wght' 900",
    radius = 150,
    falloff = 'linear'
}: VariableProximityProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [letterStyles, setLetterStyles] = useState<string[]>([]);
    const letters = label.split('');

    const calculateFalloff = useCallback((distance: number, maxDistance: number): number => {
        const normalized = Math.max(0, 1 - distance / maxDistance);
        switch (falloff) {
            case 'exponential':
                return normalized * normalized;
            case 'gaussian':
                return Math.exp(-((distance * distance) / (2 * (maxDistance / 2) * (maxDistance / 2))));
            case 'linear':
            default:
                return normalized;
        }
    }, [falloff]);

    const parseVariationSettings = (settings: string): Record<string, number> => {
        const result: Record<string, number> = {};
        const matches = settings.matchAll(/'([^']+)'\s+([\d.]+)/g);
        for (const match of matches) {
            result[match[1]] = parseFloat(match[2]);
        }
        return result;
    };

    const interpolateSettings = (from: Record<string, number>, to: Record<string, number>, t: number): string => {
        const result: string[] = [];
        for (const key in from) {
            const fromVal = from[key];
            const toVal = to[key] ?? fromVal;
            const interpolated = fromVal + (toVal - fromVal) * t;
            result.push(`'${key}' ${interpolated.toFixed(0)}`);
        }
        return result.join(', ');
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const fromSettings = parseVariationSettings(fromFontVariationSettings);
        const toSettings = parseVariationSettings(toFontVariationSettings);

        const handleMouseMove = (e: MouseEvent) => {
            const letterElements = container.querySelectorAll('.proximity-letter');
            const newStyles: string[] = [];

            letterElements.forEach((letterEl) => {
                const rect = letterEl.getBoundingClientRect();
                const letterCenterX = rect.left + rect.width / 2;
                const letterCenterY = rect.top + rect.height / 2;

                const distance = Math.sqrt(
                    Math.pow(e.clientX - letterCenterX, 2) +
                    Math.pow(e.clientY - letterCenterY, 2)
                );

                const influence = calculateFalloff(distance, radius);
                const settings = interpolateSettings(fromSettings, toSettings, influence);
                newStyles.push(settings);
            });

            setLetterStyles(newStyles);
        };

        const handleMouseLeave = () => {
            setLetterStyles(letters.map(() => fromFontVariationSettings));
        };

        window.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [letters, radius, falloff, fromFontVariationSettings, toFontVariationSettings, calculateFalloff]);

    return (
        <div ref={containerRef} className={`variable-proximity ${className}`}>
            {letters.map((letter, index) => (
                <span
                    key={index}
                    className="proximity-letter"
                    style={{
                        fontVariationSettings: letterStyles[index] || fromFontVariationSettings,
                        display: 'inline-block',
                        transition: 'font-variation-settings 0.1s ease-out',
                    }}
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </span>
            ))}
        </div>
    );
};

export default VariableProximity;
