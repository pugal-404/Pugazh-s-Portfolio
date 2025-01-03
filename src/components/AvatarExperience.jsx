'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AvatarExperience.module.css';

const CONFIG = {
  MODEL_PATH: '/assets/models/avatar.glb',
  ANIMATIONS_PATH: '/assets/animations/',
  BACKGROUND_COLOR: 0x242C5C,
  CAMERA: {
    FOV: {
      DESKTOP: 40,
      TABLET: 45,
      MOBILE: 50,
    },
    NEAR: 0.1,
    FAR: 1000,
    POSITION: {
      DESKTOP: { x: 0, y: 1.1, z: 2.8 },
      TABLET: { x: 0, y: 1.2, z: 2.5 },
      MOBILE: { x: 0, y: 1.3, z: 2.3 },
    },
    TARGET: {
      DESKTOP: { x: 0, y: 0.9, z: 0 },
      TABLET: { x: 0, y: 1.0, z: 0 },
      MOBILE: { x: 0, y: 1.1, z: 0 },
    },
  },
  MODEL: {
    SCALE: {
      DESKTOP: 1.0,
      TABLET: 1.1,
      MOBILE: 1.2,
    },
    POSITION: {
      DESKTOP: { x: 0, y: -0.1, z: 0 },
      TABLET: { x: 0, y: -0.15, z: 0 },
      MOBILE: { x: 0, y: -0.2, z: 0 },
    },
  },
  LIGHTING: {
    MAIN_LIGHT: {
      COLOR: 0xffffff,
      INTENSITY: 2.5,
      POSITION: { x: 5, y: 5, z: 5 },
    },
    FILL_LIGHT: {
      COLOR: 0xffffff,
      INTENSITY: 1.5,
      POSITION: { x: -5, y: 3, z: -5 },
    },
    AMBIENT_LIGHT: {
      COLOR: 0xffffff,
      INTENSITY: 0.8,
    },
  },
  PERFORMANCE: {
    MAX_PIXEL_RATIO: 2,
    SHADOW_MAP_SIZE: 1024,
    ANISOTROPY: 8,
  },
  AUDIO: {
    GUNSHOT: '/assets/sounds/message.mp3'
  },
};

const ANIMATIONS = [
  { name: 'Idle', duration: 2 },
  { name: 'Gunshoot', duration: 5 },
];

const getDeviceType = (width) => {
  if (width < 768) return 'MOBILE';
  if (width < 1024) return 'TABLET';
  return 'DESKTOP';
};

export default function AvatarExperience() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const modelRef = useRef(null);
  const mixerRef = useRef(null);
  const actionsRef = useRef(new Map());
  const clockRef = useRef(new THREE.Clock());
  const animationFrameRef = useRef(null);
  const currentActionRef = useRef(null);
  const audioRef = useRef(null);
  const controlsRef = useRef(null);
  const isInitializedRef = useRef(false);

  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState('Idle');
  const [error, setError] = useState(null);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [deviceType, setDeviceType] = useState('DESKTOP');

  const setupLighting = useCallback((scene) => {
    const mainLight = new THREE.DirectionalLight(
      CONFIG.LIGHTING.MAIN_LIGHT.COLOR,
      CONFIG.LIGHTING.MAIN_LIGHT.INTENSITY
    );
    mainLight.position.set(
      CONFIG.LIGHTING.MAIN_LIGHT.POSITION.x,
      CONFIG.LIGHTING.MAIN_LIGHT.POSITION.y,
      CONFIG.LIGHTING.MAIN_LIGHT.POSITION.z
    );
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = CONFIG.PERFORMANCE.SHADOW_MAP_SIZE;
    mainLight.shadow.mapSize.height = CONFIG.PERFORMANCE.SHADOW_MAP_SIZE;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(
      CONFIG.LIGHTING.FILL_LIGHT.COLOR,
      CONFIG.LIGHTING.FILL_LIGHT.INTENSITY
    );
    fillLight.position.set(
      CONFIG.LIGHTING.FILL_LIGHT.POSITION.x,
      CONFIG.LIGHTING.FILL_LIGHT.POSITION.y,
      CONFIG.LIGHTING.FILL_LIGHT.POSITION.z
    );
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight(
      CONFIG.LIGHTING.AMBIENT_LIGHT.COLOR,
      CONFIG.LIGHTING.AMBIENT_LIGHT.INTENSITY
    );
    scene.add(ambientLight);
  }, []);

  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (controlsRef.current) {
      controlsRef.current.dispose();
      controlsRef.current = null;
    }

    if (rendererRef.current && containerRef.current) {
      containerRef.current.removeChild(rendererRef.current.domElement);
      rendererRef.current.dispose();
      rendererRef.current = null;
    }

    if (mixerRef.current) {
      mixerRef.current.stopAllAction();
      mixerRef.current = null;
    }

    if (sceneRef.current) {
      sceneRef.current.clear();
      sceneRef.current = null;
    }

    if (modelRef.current) {
      modelRef.current = null;
    }

    actionsRef.current.clear();
    currentActionRef.current = null;
    isInitializedRef.current = false;
  }, []);

  const setupScene = useCallback(() => {
    if (!containerRef.current || sceneRef.current) return null;

    // Force a layout reflow to ensure container dimensions are available
    containerRef.current.offsetHeight;
    containerRef.current.offsetWidth;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(CONFIG.BACKGROUND_COLOR);
    sceneRef.current = scene;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const aspect = containerWidth / containerHeight;
    const currentDevice = getDeviceType(containerWidth);
    setDeviceType(currentDevice);

    const camera = new THREE.PerspectiveCamera(
      CONFIG.CAMERA.FOV[currentDevice],
      aspect,
      CONFIG.CAMERA.NEAR,
      CONFIG.CAMERA.FAR
    );

    const position = CONFIG.CAMERA.POSITION[currentDevice];
    const target = CONFIG.CAMERA.TARGET[currentDevice];

    camera.position.set(position.x, position.y, position.z);
    camera.lookAt(new THREE.Vector3(target.x, target.y, target.z));
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, CONFIG.PERFORMANCE.MAX_PIXEL_RATIO));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 1;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;
    controls.target.set(target.x, target.y, target.z);
    controlsRef.current = controls;

    setupLighting(scene);
    isInitializedRef.current = true;

    return controls;
  }, [setupLighting]);

  const loadAnimations = useCallback(async (mixer) => {
    const loader = new FBXLoader();
    const loadPromises = ANIMATIONS.map(async (animation) => {
      try {
        const fbx = await loader.loadAsync(`${CONFIG.ANIMATIONS_PATH}${animation.name}.fbx`);
        const action = mixer.clipAction(fbx.animations[0]);
        action.clampWhenFinished = true;
        action.loop = THREE.LoopOnce;
        actionsRef.current.set(animation.name, action);
      } catch (error) {
        console.error(`Error loading animation ${animation.name}:`, error);
        throw new Error(`Failed to load animation: ${animation.name}`);
      }
    });
    
    try {
      await Promise.all(loadPromises);
    } catch (error) {
      setError('Failed to load some animations. The avatar may not animate correctly.');
    }
  }, []);

  const playAnimation = useCallback((animationName) => {
    const actions = actionsRef.current;
    const newAction = actions.get(animationName);

    if (newAction) {
      if (currentActionRef.current && currentActionRef.current !== newAction) {
        currentActionRef.current.fadeOut(0.1);
      }

      newAction.reset().fadeIn(0.1).play();
      currentActionRef.current = newAction;
      setCurrentAnimation(animationName);

      if (animationName !== 'Idle') {
        const duration = ANIMATIONS.find(a => a.name === animationName).duration;
        setTimeout(() => {
          playAnimation('Idle');
        }, duration * 1000);
      }
    }
  }, []);

  const loadModel = useCallback(async () => {
    if (!sceneRef.current || modelRef.current) return;

    try {
      const loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/');
      loader.setDRACOLoader(dracoLoader);

      const gltf = await loader.loadAsync(
        CONFIG.MODEL_PATH,
        (event) => {
          const progress = (event.loaded / event.total) * 100;
          setLoadingProgress(Math.round(progress));
        }
      );

      if (!sceneRef.current) {
        // Scene was cleaned up while loading, dispose of the loaded model
        gltf.scene.traverse((object) => {
          if (object.isMesh) {
            object.geometry.dispose();
            if (object.material.isMaterial) {
              cleanMaterial(object.material);
            } else {
              for (const material of object.material) cleanMaterial(material);
            }
          }
        });
        return;
      }

      if (!sceneRef.current) return; // Scene was cleaned up while loading

      const model = gltf.scene;
      const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
      const currentDevice = getDeviceType(containerWidth);
      
      const scale = CONFIG.MODEL.SCALE[currentDevice];
      const position = CONFIG.MODEL.POSITION[currentDevice];
      
      model.scale.setScalar(scale);
      model.position.set(position.x, position.y, position.z);

      model.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          if (node.material.map) {
            node.material.map.anisotropy = CONFIG.PERFORMANCE.ANISOTROPY;
          }
        }
      });

      sceneRef.current.add(model);
      modelRef.current = model;

      const mixer = new THREE.AnimationMixer(model);
      mixerRef.current = mixer;

      await loadAnimations(mixer);
      
      if (mixerRef.current) { // Check if component is still mounted
        playAnimation('Idle');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error loading model:', error);
      setError('Failed to load the 3D model. Please try refreshing the page.');
      setLoading(false);
    }
  }, [loadAnimations, playAnimation]);

  const animate = useCallback(() => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !controlsRef.current) return;

    // Cancel any existing animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const animateFrame = () => {
      if (!sceneRef.current) return; // Stop animation if scene is cleaned up
      
      animationFrameRef.current = requestAnimationFrame(animateFrame);
      
      if (mixerRef.current) {
        const delta = clockRef.current.getDelta();
        mixerRef.current.update(delta);
      }
      
      controlsRef.current.update();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animateFrame();
  }, []);

 const handleResize = useCallback(() => {
    if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const currentDevice = getDeviceType(width);
    setDeviceType(currentDevice);

    cameraRef.current.aspect = width / height;
    cameraRef.current.fov = CONFIG.CAMERA.FOV[currentDevice];
    
    const position = CONFIG.CAMERA.POSITION[currentDevice];
    const target = CONFIG.CAMERA.TARGET[currentDevice];
    
    cameraRef.current.position.set(position.x, position.y, position.z);
    cameraRef.current.lookAt(new THREE.Vector3(target.x, target.y, target.z));
    cameraRef.current.updateProjectionMatrix();

    rendererRef.current.setSize(width, height);
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, CONFIG.PERFORMANCE.MAX_PIXEL_RATIO));

    if (modelRef.current) {
      const scale = CONFIG.MODEL.SCALE[currentDevice];
      const position = CONFIG.MODEL.POSITION[currentDevice];
      modelRef.current.scale.setScalar(scale);
      modelRef.current.position.set(position.x, position.y, position.z);
    }
  }, []);

  useEffect(() => {
    // Initialize only once when the component mounts
    if (!isInitializedRef.current && containerRef.current) {
      const controls = setupScene();
      if (controls) {
        loadModel();
        animate();
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cleanup();
    };
  }, [setupScene, loadModel, animate, handleResize, cleanup]);

  useEffect(() => {
    const audio = new Audio(CONFIG.AUDIO.GUNSHOT);
    audio.addEventListener('canplaythrough', () => {
      setAudioLoaded(true);
    });
    audio.addEventListener('error', () => {
      console.error('Error loading audio file');
    });
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      } else {
        // Reinitialize the scene when the tab becomes visible
        cleanup();
        const controls = setupScene();
        if (controls) {
          loadModel();
          animate();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [cleanup, setupScene, loadModel, animate]);

  const handleGunshoot = useCallback(() => {
    if (audioRef.current && audioLoaded) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
    }
    playAnimation('Gunshoot');

    const fileUrl = "https://drive.google.com/uc?export=download&id=1JtofSsdYRth4-fA6hEgSDxf1tGclg-Uz";
    const anchor = document.createElement('a');
    anchor.href = fileUrl;
    anchor.download = "Pugazh_Resume.pdf";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }, [playAnimation, audioLoaded]);

  const cleanMaterial = (material) => {
    if (material.map) material.map.dispose();
    if (material.normalMap) material.normalMap.dispose();
    if (material.roughnessMap) material.roughnessMap.dispose();
    if (material.metalnessMap) material.metalnessMap.dispose();
    if (material.aoMap) material.aoMap.dispose();
    material.dispose();
  };

  return (
    <div className={styles.container}>
      <div ref={containerRef} className={styles.canvas} />
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.loadingOverlay}
          >
            <div className={styles.loadingSpinner} />
            <div className={styles.loadingText}>Loading Avatar... {loadingProgress}%</div>
          </motion.div>
        )}
      </AnimatePresence>
      {error && (
        <div className={styles.errorOverlay}>
          <div className={styles.errorMessage}>{error}</div>
        </div>
      )}
      <motion.button
        className={`${styles.button} ${styles.gunshootButton}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleGunshoot}
        aria-label="Trigger Gunshoot Animation and Download Resume"
        disabled={loading || !!error || currentAnimation !== 'Idle'}
      >
        <Download className={styles.icon} />
      </motion.button>
    </div>
  );
}

