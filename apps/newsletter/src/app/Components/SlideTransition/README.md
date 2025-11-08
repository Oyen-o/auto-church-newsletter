# SlideTransition Higher Order Component

A flexible React HOC that provides smooth slide-in and slide-out animations for two contained components.

## Features

- ✅ **Smooth Animations**: Hardware-accelerated CSS transitions
- ✅ **Multiple Directions**: Horizontal and vertical sliding
- ✅ **Customizable Duration**: Configurable animation timing
- ✅ **TypeScript Support**: Full type safety and IntelliSense
- ✅ **Accessibility**: Respects `prefers-reduced-motion`
- ✅ **Responsive**: Adapts to different screen sizes
- ✅ **HOC Pattern**: Easy integration with existing components

## Usage

### Basic Component Usage

```tsx
import { SlideTransition, useSlideTransition } from './Components/SlideTransition';

const MyComponent = () => {
  const { isFirstActive, toggle } = useSlideTransition(true);

  return (
    <div>
      <button onClick={toggle}>Switch</button>
      <SlideTransition
        isFirstActive={isFirstActive}
        direction="horizontal"
        duration={300}
      >
        <div>First Component</div>
        <div>Second Component</div>
      </SlideTransition>
    </div>
  );
};
```

### Higher Order Component Usage

```tsx
import { withSlideTransition } from './Components/SlideTransition';

const MyComponent = ({ title }) => <h1>{title}</h1>;
const SlideableComponent = withSlideTransition(MyComponent);

const App = () => {
  const { isFirstActive, toggle } = useSlideTransition();

  return (
    <SlideableComponent
      title="My Title"
      slideProps={{
        isFirstActive,
        direction: 'vertical',
        duration: 400
      }}
      firstComponent={<div>First Content</div>}
      secondComponent={<div>Second Content</div>}
    />
  );
};
```

### Custom Hook Usage

```tsx
import { useSlideTransition } from './Components/SlideTransition';

const MyComponent = () => {
  const {
    isFirstActive,
    slideToFirst,
    slideToSecond,
    toggle,
    setIsFirstActive
  } = useSlideTransition(true); // initial state

  return (
    <div>
      <button onClick={slideToFirst}>Show First</button>
      <button onClick={slideToSecond}>Show Second</button>
      <button onClick={toggle}>Toggle</button>
      {/* Your sliding components here */}
    </div>
  );
};
```

## Props

### SlideTransition Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `[ReactNode, ReactNode]` | **Required** | Exactly two components to slide between |
| `isFirstActive` | `boolean` | **Required** | Which component is currently active |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Slide direction |
| `duration` | `number` | `300` | Animation duration in milliseconds |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `CSSProperties` | `{}` | Additional inline styles |

### useSlideTransition Hook Returns

| Property | Type | Description |
|----------|------|-------------|
| `isFirstActive` | `boolean` | Current active state |
| `slideToFirst` | `() => void` | Show first component |
| `slideToSecond` | `() => void` | Show second component |
| `toggle` | `() => void` | Toggle between components |
| `setIsFirstActive` | `(boolean) => void` | Direct state setter |

## Animation Directions

### Horizontal (default)
- Components slide left/right
- Best for content that changes horizontally

### Vertical
- Components slide up/down
- Best for stacked content or dropdowns

## Styling

The component uses CSS custom properties for easy theming:

```scss
.slide-transition-container {
  --slide-duration: 300ms; // Set via duration prop
}
```

### Custom Animation Variants

Additional CSS classes for different effects:

```scss
// Fade only (no sliding)
.slide-fade .slide-component {
  transition: opacity var(--slide-duration);
  transform: none !important;
}

// Scale effect
.slide-scale .slide-component {
  transition: transform var(--slide-duration), opacity var(--slide-duration);
}
```

## Examples

Check out the example files:

1. **`slideTransitionExample.tsx`** - Basic usage examples
2. **Calendar Integration** - Real-world calendar view switching
3. **HOC Pattern** - Advanced component composition

## Accessibility

- Respects `prefers-reduced-motion` for reduced animations
- Uses semantic HTML structure
- Maintains focus management during transitions
- High contrast mode support

## Performance

- Uses `transform` and `opacity` for hardware acceleration
- `will-change` property for optimal rendering
- `backface-visibility: hidden` to prevent flickering
- Optimized for 60fps animations

## Browser Support

- Modern browsers with CSS3 transforms
- Graceful degradation for older browsers
- Mobile-friendly touch interactions

## Best Practices

1. **Keep components similar in size** for smooth transitions
2. **Use consistent content structure** to avoid layout shifts
3. **Consider loading states** for dynamic content
4. **Test with reduced motion** settings enabled
5. **Provide clear visual indicators** for state changes

## Integration with Church Newsletter

Perfect for:
- Calendar view switching (grid ↔ list)
- Sermon content (text ↔ video)
- Newsletter sections (current ↔ archive)
- Event details (overview ↔ registration)

```tsx
// Example: Calendar integration
<SlideTransition
  isFirstActive={showCalendar}
  direction="horizontal"
  duration={400}
>
  <CalendarGrid events={events} />
  <EventList events={events} />
</SlideTransition>
```