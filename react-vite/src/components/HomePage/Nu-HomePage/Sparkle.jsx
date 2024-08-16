import { useState, useEffect, useCallback, useRef } from "react";
import "./Sparkles.css";

const DEFAULT_COLOR = "#4D3F72";

const QUERY = "(prefers-reduced-motion: no-preference)";
const isRenderingOnServer = typeof window === "undefined";
const getInitialState = () => {
	return isRenderingOnServer ? true : !window.matchMedia(QUERY).matches;
};

const generateSparkle = (color) => {
	return {
		id: String(random(10000, 99999)),
		createdAt: Date.now(),
		color,
		size: random(10, 20),
		style: {
			top: random(0, 100) + "%",
			left: random(0, 100) + "%",
		},
	};
};

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function usePrefersReducedMotion() {
	const [prefersReducedMotion, setPrefersReducedMotion] =
		useState(getInitialState);

	useEffect(() => {
		const mediaQueryList = window.matchMedia(QUERY);
		const listener = (event) => {
			setPrefersReducedMotion(!event.matches);
		};
		if (mediaQueryList.addEventListener) {
			mediaQueryList.addEventListener("change", listener);
		} else {
			mediaQueryList.addListener(listener);
		}
		return () => {
			if (mediaQueryList.removeEventListener) {
				mediaQueryList.removeEventListener("change", listener);
			} else {
				mediaQueryList.removeListener(listener);
			}
		};
	}, []);

	return prefersReducedMotion;
}

const useRandomInterval = (callback, minDelay, maxDelay) => {
	const timeoutId = useRef(null);
	const savedCallback = useRef(callback);

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		let isEnabled =
			typeof minDelay === "number" && typeof maxDelay === "number";
		if (isEnabled) {
			const handleTick = () => {
				const nextTickAt = random(minDelay, maxDelay);
				timeoutId.current = window.setTimeout(() => {
					savedCallback.current();
					handleTick();
				}, nextTickAt);
			};
			handleTick();
		}
		return () => window.clearTimeout(timeoutId.current);
	}, [minDelay, maxDelay]);

	const cancel = useCallback(() => {
		window.clearTimeout(timeoutId.current);
	}, []);

	return cancel;
};

const Sparkles = ({ color = DEFAULT_COLOR, children, ...delegated }) => {
	const range = (start, end, step = 1) => {
		let output = [];
		if (typeof end === "undefined") {
			end = start;
			start = 0;
		}
		for (let i = start; i < end; i += step) {
			output.push(i);
		}
		return output;
	};

	const [sparkles, setSparkles] = useState(() => {
		return range(3).map(() => generateSparkle(color));
	});

	const prefersReducedMotion = usePrefersReducedMotion();

	useRandomInterval(
		() => {
			const sparkle = generateSparkle(color);
			const now = Date.now();
			const nextSparkles = sparkles.filter((sp) => {
				const delta = now - sp.createdAt;
				return delta < 750;
			});
			nextSparkles.push(sparkle);
			setSparkles(nextSparkles);
		},
		prefersReducedMotion ? null : 50,
		prefersReducedMotion ? null : 450,
	);

	return (
		<span className="wrapper" {...delegated}>
			{sparkles.map((sparkle) => (
				<Sparkle
					key={sparkle.id}
					color={sparkle.color}
					size={sparkle.size}
					style={sparkle.style}
				/>
			))}
			<strong className="child-wrapper">{children}</strong>
		</span>
	);
};

const Sparkle = ({ size, color, style }) => {
	const path =
		"M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z";

	return (
		<span className="sparkle-wrapper" style={style}>
			<svg
				className="sparkle-svg"
				width={size}
				height={size}
				viewBox="0 0 68 68"
				fill="none"
			>
				<path d={path} fill={color} />
			</svg>
		</span>
	);
};

export default Sparkles;
