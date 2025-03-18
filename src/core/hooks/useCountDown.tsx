import React from 'react';

const useCountDown = (initialCount: number) => {
    const [count, setCount] = React.useState(initialCount);
    const [isStart, setIsStart] = React.useState(false);
    const [isFinished, setIsFinished] = React.useState(true);

    React.useEffect(() => {
        let intervalId: NodeJS.Timeout;

        // Start the countdown only when the component is mounted and user is active
        const startCountdown = () => {
            intervalId = setInterval(() => {
                setCount((prevCount) => {
                    if (prevCount === 1) {
                        clearInterval(intervalId);
                        setIsFinished(true);
                    }
                    return prevCount - 1;
                });
            }, 1000);
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                startCountdown();
            } else {
                clearInterval(intervalId);
            }
        };

        // Check if the page is currently visible and start or stop the countdown accordingly
        document.addEventListener('visibilitychange', handleVisibilityChange);
        if (isStart) {
            startCountdown();
        }

        // Clean up the interval when the component is unmounted
        return () => {
            clearInterval(intervalId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isStart]);

    const start = () => {
        setIsStart(true);
    };

    const pause = () => {
        setIsStart(false);
    };

    const reset = () => {
        setCount(initialCount);
        setIsStart(false);
        setIsFinished(false); // Resetting isFinished state
    };

    return { count, isFinished, start, pause, reset };
};

export default useCountDown;
