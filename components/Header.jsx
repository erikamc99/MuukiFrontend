import { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons, Feather } from '@expo/vector-icons';
import styles from '../styles/components/HeaderStyles';
import { useSpace } from '../context/SpaceContext';
import { useNavigation } from '@react-navigation/native';

export default function Header({ type = 'main' }) {
  const { selectedSpace, setSelectedSpaceId, spaces, selectedSpaceId } = useSpace();
  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(spaces.map(space => ({
      label: space.name,
      value: space.id || space._id,
    })));
  }, [spaces]);

  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <DropDownPicker
          open={open}
          value={selectedSpaceId}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedSpaceId}
          setItems={setItems}
          placeholder="Selecciona un espacio"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={styles.dropdownText}
          listItemLabelStyle={styles.listItemLabel}
          listItemContainerStyle={styles.listItem}
          selectedItemContainerStyle={styles.selectedItem}
          TickIconComponent={() => (
            <View style={styles.tickIcon}>
              <Ionicons name="checkmark" size={25} color="#fff" />
            </View>
          )}
          ArrowUpIconComponent={() => (
            <View style={styles.arrowIcon}>
              <Feather name="chevron-up" size={30} color="#fff" />
            </View>
          )}
          ArrowDownIconComponent={() => (
            <View style={styles.arrowIcon}>
              <Feather name="chevron-down" size={30} color="#fff" />
            </View>
          )}
        />
      </View>

      <View style={styles.actions}>
        {type === 'main' && (
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('NuevoEspacio')}>
            <Feather name="plus" size={30} color="#fff" />
          </TouchableOpacity>
        )}
        {type === 'section' && (
          <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Configuración')}>
            <Ionicons name="settings-outline" size={30} color="#fff" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Notificaciones')}>
          <Ionicons name="notifications-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}