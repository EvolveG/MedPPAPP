import React from 'react';
import { View, Text, Modal, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, FONTS, SIZES } from "../../constants";

const DatePickerModal = ({ isVisible, selectedDate, onDateChange, onClose }) => {
    const showDatePicker = () => {
        if (Platform.OS === 'ios') {
            // For iOS, the DateTimePicker is rendered as a modal
            return (
                <DateTimePicker
                    mode="date"
                    value={selectedDate || new Date()}
                    display="spinner"
                    onChange={(event, selected) => {
                        if (selected) {
                            onDateChange(selected);
                        }
                    }}
                />
            );
        } else {
            // For Android, the DateTimePicker is shown using a modal
            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isVisible}
                    onRequestClose={onClose}
                >
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }}
                        onPress={onClose}
                    >
                        <View
                            style={{
                                backgroundColor: COLORS.lightGray2,
                                borderRadius: SIZES.radius,
                                paddingVertical: SIZES.base,
                            }}
                        >
                            <DateTimePicker
                                mode="date"
                                value={selectedDate || new Date()}
                                display="default"
                                onChange={(event, selected) => {
                                    if (selected) {
                                        onDateChange(selected);
                                    }
                                    onClose();
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            );
        }
    };

    return (
        <View>
            {isVisible && (
                <View>
                    {showDatePicker()}
                </View>
            )}
        </View>
    );
};

export default DatePickerModal;
