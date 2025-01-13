import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Modal} from 'react-native';
import Slider from '@react-native-community/slider';
import ColorPicker from 'react-native-wheel-color-picker';

interface ToolBoxProps {
  color: string;
  strokeWidth: number;
  onColorChange: (color: string) => void;
  onStrokeWidthChange: (width: number) => void;
  onClear: () => void;
}

const ToolBox: React.FC<ToolBoxProps> = ({
  color,
  strokeWidth,
  onColorChange,
  onStrokeWidthChange,
  onClear,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [tempColor, setTempColor] = useState(color);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.colorPreview, {backgroundColor: color}]}
        onPress={() => setShowColorPicker(true)}
      />
      <View style={styles.sliderContainer}>
        <Text>筆刷大小: {strokeWidth.toFixed(1)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={0.1}
          value={strokeWidth}
          onValueChange={onStrokeWidthChange}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onClear}>
        <Text style={styles.buttonText}>清除畫布</Text>
      </TouchableOpacity>

      <Modal
        visible={showColorPicker}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <ColorPicker
              color={tempColor}
              onColorChange={setTempColor}
              thumbSize={40}
              sliderSize={40}
              noSnap={true}
              row={false}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => {
                  onColorChange(tempColor);
                  setShowColorPicker(false);
                }}
              >
                <Text>確定</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => setShowColorPicker(false)}
              >
                <Text>取消</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  sliderContainer: {
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  button: {
    padding: 12,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
});

export default ToolBox; 