export { 
  SlideTransition, 
  withSlideTransition, 
  useSlideTransition,
  default as SlideTransitionComponent
} from './slideTransition';

export type {
  SlideTransitionProps,
  SlideTransitionHOC
} from './slideTransition';

export { 
  SlideTransitionExample,
  HOCExample,
  CalendarSlideExample
} from './slideTransitionExample';

// Re-export the default component
import SlideTransitionDefault from './slideTransition';
export default SlideTransitionDefault;