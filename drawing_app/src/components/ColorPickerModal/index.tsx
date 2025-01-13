import React from 'react';
import { View, Modal, TouchableOpacity, Text, BackHandler, Platform, SafeAreaView } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';
import { styles } from './styles';

interface ColorPickerModalProps {
  visible: boolean;
  color: string;
  onColorChange: (color: string) => void;
  onClose: () => void;
}

const ColorPickerModal: React.FC<ColorPickerModalProps> = ({ 
  visible, 
  color, 
  onColorChange, 
  onClose 
}) => {
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (visible) {
          onClose();
          return true;
        }
        return false;
      });
      return () => backHandler.remove();
    }
  }, [visible, onClose]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
      hardwareAccelerated={true}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>選擇顏色</Text>
            <TouchableOpacity 
              onPress={onClose}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>完成</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.pickerContainer}>
            <ColorPicker
              oldColor={color}
              onColorSelected={onColorChange}
              style={styles.picker}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ColorPickerModal; 