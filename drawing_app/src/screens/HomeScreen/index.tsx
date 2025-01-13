import React, {useState} from 'react';
import {View} from 'react-native';
import DrawingCanvas from '../../components/DrawingCanvas';
import {styles} from './styles';
import {PathData} from '../../types';

const HomeScreen = () => {
  const [paths, setPaths] = useState<PathData[]>([]);
  const [currentPath, setCurrentPath] = useState<PathData | null>(null);
  const [color, setColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);

  return (
    <View style={styles.container}>
      <DrawingCanvas
        paths={paths}
        currentPath={currentPath}
        onPathChange={setCurrentPath}
        onPathsChange={setPaths}
        color={color}
        strokeWidth={strokeWidth}
      />
    </View>
  );
};

export default HomeScreen; 