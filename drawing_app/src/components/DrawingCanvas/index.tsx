import React, {useCallback, useRef} from 'react';
import {View, Dimensions, PanResponder, PanResponderGestureState} from 'react-native';
import {Canvas, Path, Skia} from '@shopify/react-native-skia';
import {styles} from './styles';
import {PathData} from '../../types';

interface DrawingCanvasProps {
  paths: PathData[];
  currentPath: PathData | null;
  onPathChange: (path: PathData | null) => void;
  onPathsChange: (paths: PathData[]) => void;
  color: string;
  strokeWidth: number;
}

const {width, height} = Dimensions.get('window');

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  paths,
  currentPath,
  onPathChange,
  onPathsChange,
  color,
  strokeWidth,
}) => {
  const canvasRef = useRef<View>(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => {
      const {locationX, locationY} = event.nativeEvent;
      
      const path = Skia.Path.Make();
      path.moveTo(locationX, locationY);
      
      onPathChange({
        path: path.toSVGString(),
        color,
        strokeWidth,
      });
    },
    onPanResponderMove: (event) => {
      if (!currentPath) return;
      
      const {locationX, locationY} = event.nativeEvent;
      const path = Skia.Path.MakeFromSVGString(currentPath.path);
      if (!path) return;
      
      path.lineTo(locationX, locationY);
      
      onPathChange({
        ...currentPath,
        path: path.toSVGString(),
      });
    },
    onPanResponderRelease: () => {
      if (currentPath) {
        onPathsChange([...paths, currentPath]);
        onPathChange(null);
      }
    },
  });

  return (
    <View 
      ref={canvasRef}
      style={styles.container}
      {...panResponder.panHandlers}
    >
      <Canvas style={styles.canvas}>
        {paths.map((pathData, index) => (
          <Path
            key={index}
            path={pathData.path}
            strokeWidth={pathData.strokeWidth}
            color={pathData.color}
            style="stroke"
          />
        ))}
        {currentPath && (
          <Path
            path={currentPath.path}
            strokeWidth={currentPath.strokeWidth}
            color={currentPath.color}
            style="stroke"
          />
        )}
      </Canvas>
    </View>
  );
};

export default DrawingCanvas; 