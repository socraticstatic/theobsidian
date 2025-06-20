import React, { useEffect, useState } from 'react';

interface DeviceAwarenessProps {
  onOrientationChange: (orientation: number) => void;
  onMotion: (data: { acceleration: { x: number; y: number; z: number } }) => void;
  onShake: () => void;
}

const DeviceAwareness: React.FC<DeviceAwarenessProps> = ({ 
  onOrientationChange, 
  onMotion, 
  onShake 
}) => {
  const [lastShake, setLastShake] = useState(0);
  const [shakeThreshold] = useState(15);

  useEffect(() => {
    // Device orientation
    const handleOrientationChange = () => {
      if (screen.orientation) {
        onOrientationChange(screen.orientation.angle);
      } else if (window.orientation !== undefined) {
        onOrientationChange(window.orientation);
      }
    };

    // Device motion for mystical interactions
    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      if (event.acceleration) {
        onMotion({
          acceleration: {
            x: event.acceleration.x || 0,
            y: event.acceleration.y || 0,
            z: event.acceleration.z || 0
          }
        });

        // Shake detection
        const acceleration = event.acceleration;
        const current = Date.now();
        if (acceleration && (current - lastShake) > 1000) {
          const shake = Math.abs(acceleration.x || 0) + 
                       Math.abs(acceleration.y || 0) + 
                       Math.abs(acceleration.z || 0);
          
          if (shake > shakeThreshold) {
            setLastShake(current);
            onShake();
          }
        }
      }
    };

    // Request permission for iOS 13+
    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientationChange);
          }
        } catch (error) {
          console.log('Device orientation permission denied');
        }
      } else {
        window.addEventListener('deviceorientation', handleOrientationChange);
      }

      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceMotionEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('devicemotion', handleDeviceMotion);
          }
        } catch (error) {
          console.log('Device motion permission denied');
        }
      } else {
        window.addEventListener('devicemotion', handleDeviceMotion);
      }
    };

    // Initial setup
    handleOrientationChange();
    requestPermission();

    // Also listen for resize events
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientationChange);
      window.removeEventListener('devicemotion', handleDeviceMotion);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, [lastShake, onOrientationChange, onMotion, onShake, shakeThreshold]);

  return null; // This component doesn't render anything
};

export default DeviceAwareness;