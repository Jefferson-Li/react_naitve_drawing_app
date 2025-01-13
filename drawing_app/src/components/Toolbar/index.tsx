import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { styles } from './styles';

interface ToolbarProps {
  strokeWidth: number;
  onStrokeWidthChange: (width: number) => void;
  onColorPickerOpen: () => void;
  onClearCanvas: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  strokeWidth,
  onStrokeWidthChange,
  onColorPickerOpen,
  onClearCanvas,
}) => {
  // 添加防抖動
  const [isColorPickerDisabled, setIsColorPickerDisabled] = React.useState(false);

  const handleColorPickerPress = useCallback(() => {
    if (isColorPickerDisabled) return;
    
    setIsColorPickerDisabled(true);
    onColorPickerOpen();
    
    // 1秒後重新啟用按鈕
    setTimeout(() => {
      setIsColorPickerDisabled(false);
    }, 1000);
  }, [isColorPickerDisabled, onColorPickerOpen]);

  return (
    <View style={styles.toolbar}>
      <View style={styles.tools}>
        <TouchableOpacity 
          style={[styles.button, isColorPickerDisabled && styles.disabledButton]}
          onPress={handleColorPickerPress}
          disabled={isColorPickerDisabled}
        >
          <Text>顏色</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={onClearCanvas}
        >
          <Text>清除</Text>
        </TouchableOpacity>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={10}
        value={strokeWidth}
        onValueChange={onStrokeWidthChange}
      />
    </View>
  );
};

export default Toolbar; 