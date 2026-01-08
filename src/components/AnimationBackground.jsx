import RainAnimation from './animations/RainAnimation';
import StormAnimation from './animations/StormAnimation';
import AuroraAnimation from './animations/AuroraAnimation';
import GalaxyAnimation from './animations/GalaxyAnimation';
import FirefliesAnimation from './animations/FirefliesAnimation';
import OceanAnimation from './animations/OceanAnimation';

const AnimationBackground = ({ type }) => {
  switch (type) {
    case 'rain': return <RainAnimation />;
    case 'storm': return <StormAnimation />;
    case 'aurora': return <AuroraAnimation />;
    case 'galaxy': return <GalaxyAnimation />;
    case 'fireflies': return <FirefliesAnimation />;
    case 'ocean': return <OceanAnimation />;
    default: return null;
  }
};

export default AnimationBackground;