// Different page transition variants
// You can switch between these in the PageTransition component

// Default fade slide transition
export const fadeSlide = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

// Scale fade transition
export const scaleFade = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

// Slide from right
export const slideRight = {
  initial: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

// Slide from left
export const slideLeft = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

// Zoom transition
export const zoom = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  exit: {
    opacity: 0,
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

// Rotate fade transition
export const rotateFade = {
  initial: {
    opacity: 0,
    rotate: -5,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    rotate: 5,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

// Blur transition
export const blurFade = {
  initial: {
    opacity: 0,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    filter: 'blur(10px)',
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

// Vertical slide
export const slideVertical = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

// 3D flip transition
export const flip = {
  initial: {
    opacity: 0,
    rotateY: 90,
  },
  animate: {
    opacity: 1,
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    rotateY: -90,
    transition: {
      duration: 0.4,
      ease: 'easeIn',
    },
  },
}

// Smooth fade only
export const fade = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
}

// Bounce transition
export const bounce = {
  initial: {
    opacity: 0,
    scale: 0.3,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.3,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

// Export default transition
export default fadeSlide
