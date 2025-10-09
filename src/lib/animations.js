// Animation variants for Framer Motion

// Fade in from bottom
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 60
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Fade in from top
export const fadeInDown = {
  hidden: {
    opacity: 0,
    y: -60
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Fade in from left
export const fadeInLeft = {
  hidden: {
    opacity: 0,
    x: -60
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Fade in from right
export const fadeInRight = {
  hidden: {
    opacity: 0,
    x: 60
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Simple fade in
export const fadeIn = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Scale up animation
export const scaleUp = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Zoom in animation
export const zoomIn = {
  hidden: {
    opacity: 0,
    scale: 0.5
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Stagger container for child animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

// Stagger container with faster timing
export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0
    }
  }
};

// Slide in from left
export const slideInLeft = {
  hidden: {
    x: -100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Slide in from right
export const slideInRight = {
  hidden: {
    x: 100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Bounce in animation
export const bounceIn = {
  hidden: {
    opacity: 0,
    scale: 0.3
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

// Rotate and fade in
export const rotateIn = {
  hidden: {
    opacity: 0,
    rotate: -180
  },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Card hover animation
export const cardHover = {
  rest: {
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  hover: {
    scale: 1.05,
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

// Button tap animation
export const buttonTap = {
  scale: 0.95,
  transition: {
    duration: 0.1
  }
};

// Floating animation
export const floating = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Counter animation helper
export const counterAnimation = (target) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
});

// Page transition
export const pageTransition = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

// Text reveal animation
export const textReveal = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Image load animation
export const imageLoad = {
  hidden: {
    opacity: 0,
    scale: 1.1
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};
