import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DrawingCanvas from './components/DrawingCanvas';
import ToolBox from './components/ToolBox';
import {PathData} from './types';

const App = () => {
  const [paths, setPaths] = useState<PathData[]>([]);
  const [currentPath, setCurrentPath] = useState<PathData | null>(null);
  const [color, setColor] = useState('#FF0000');
  const [strokeWidth, setStrokeWidth] = useState(2.3);

  const handlePathChange = (path: PathData | null) => setCurrentPath(path);
  const handlePathsChange = (newPaths: PathData[]) => setPaths(newPaths);
  const handleClear = () => setPaths([]);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ToolBox
          color={color}
          strokeWidth={strokeWidth}
          onColorChange={setColor}
          onStrokeWidthChange={setStrokeWidth}
          onClear={handleClear}
        />
        <DrawingCanvas
          paths={paths}
          currentPath={currentPath}
          onPathChange={handlePathChange}
          onPathsChange={handlePathsChange}
          color={color}
          strokeWidth={strokeWidth}
        />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
});

export default App; 