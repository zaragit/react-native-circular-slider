import Animated from 'react-native-reanimated';
import {Circle, Line, Path, Text} from 'react-native-svg';

export const AnimatedPath = Animated.createAnimatedComponent(Path);

export const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const AnimatedLine = Animated.createAnimatedComponent(Line);

export const AnimatedText = Animated.createAnimatedComponent(Text);
