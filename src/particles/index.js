import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import Config from './config';
import { loadFull } from 'tsparticles';

const MyParticle = () => {
    const particlesInit = useCallback(async engine => {
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <Particles
            id='tsparticles'
            init={particlesInit}
            loaded={particlesLoaded}
            options={Config.particles}
            className='parts'
            /* options={{
              background: {
                  color: {
                      value: '#111',
                  },
              },
                fpsLimit: 120,
                interactivity: {
                  detect_on: 'canvas',
                  events: {
                    onhover: {
                      enable: true,
                      mode: 'repulse'
                    },
                    onclick: {
                      enable: true,
                      mode: 'push'
                    },
                    resize: true
                  },
                  modes: {
                    grab: {
                      distance: 400,
                      line_linked: {
                        opacity: 1
                      }
                    },
                    bubble: {
                      distance: 400,
                      size: 40,
                      duration: 2,
                      opacity: 8,
                      speed: 2
                    },
                    repulse: {
                      distance: 200
                    },
                    push: {
                      particlesNb: 4
                    },
                    remove: {
                      particlesNb: 2
                    }
                  }
                },
                  particles: {
                    number: {
                      value: 80,
                      density: {
                        enable: true,
                        valueArea: 800
                      }
                    },
                    color: {
                      value: '#ffffff'
                    },
                    shape: {
                      type: 'circle',
                      stroke: {
                        width: 0,
                        color: '#000000'
                      },
                      polygon: {
                        nbSides: 5
                      },
                      image: {
                        src: 'img/github.svg',
                        width: 100,
                        height: 100
                      }
                    },
                    opacity: {
                      value: 0.5,
                      random: false,
                      anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                      }
                    },
                    size: {
                      value: { min: 1, max: 5},
                      random: true,
                      anim: {
                        enable: false,
                        speed: 40,
                        sizeMin: 0.1,
                        sync: false
                      }
                    },
                    line_linked: {
                      enable: true,
                      distance: 150,
                      color: '#ffffff',
                      opacity: 0.4,
                      width: 1
                    },
                    move: {
                      enable: true,
                      speed: 5,
                      direction: 'none',
                      random: false,
                      straight: false,
                      out_mode: 'out',
                      attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                      }
                    }
                  },
                  detectRetina: true,
                  retinaDetect: true,
                  configDemo: {
                    hideCard: false,
                    backgroundColor: '#b61924',
                    backgroundImage: '',
                    backgroundPosition: '50% 50%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                  }
                }}*/
        />
  );
};

export default MyParticle;
