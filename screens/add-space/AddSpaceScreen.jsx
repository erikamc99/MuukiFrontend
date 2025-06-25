import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/add-space/AddSpaceScreenStyles.js';
import SectionHeader from '../../components/SectionHeader.jsx';
import SelectModal from '../../components/modals/SelectModal.jsx';
import useHelp from '../../hooks/useHelp.js';
import HelpModal from '../../components/modals/HelpModal.jsx';
import { useSpace } from '../../context/SpaceContext';
import { fetchSpaceTypes } from '../../services/constantsService';

export default function AddSpaceScreen() {
  const navigation = useNavigation();
  const { addSpace, reloadSpaces } = useSpace();

  const [spaceName, setSpaceName] = useState('');
  const [type, setType] = useState(null);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [spaceTypes, setSpaceTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [error, setError] = useState({ name: '', type: '', general: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSpaceTypes()
      .then((data) => setSpaceTypes(data.map(type => ({ label: type, value: type }))))
      .catch(() => setSpaceTypes([]))
      .finally(() => setLoadingTypes(false));
  }, []);

  const validateAndProceed = async () => {
    const newError = { name: '', type: '', general: '' };
    if (!spaceName.trim()) newError.name = 'El nombre es obligatorio';
    if (!type) newError.type = 'Selecciona un tipo de espacio';
    setError(newError);
    if (!newError.name && !newError.type) {
      setLoading(true);
      const ok = await addSpace({ name: spaceName, type });
      setLoading(false);
      if (ok) {
        reloadSpaces();
        navigation.navigate('MainTabs');
      } else {
        setError({ ...newError, general: "No se pudo crear el espacio" });
      }
    }
  };

  const {
    visible,
    currentText,
    isLast,
    onNext,
    onSkip,
    triggerManually
  } = useHelp(('AñadirEspacio'));

  return (
    <View style={styles.screen}>
      <SectionHeader sectionTitle="Añadir espacio" />
      <View style={styles.container}>
        <Text style={styles.label}>Intruduzca el nombre de su espacio:</Text>
        <TextInput style={styles.input} placeholder="Ej: Corral de Moreda" value={spaceName} 
          onChangeText={(text) => {
            setSpaceName(text);
            setError({ ...error, name: '' });
          }} />  
        {error.name ? <Text style={styles.error}>{error.name}</Text> : null}

        <Text style={styles.label}>Seleccione el tipo:</Text>
        <TouchableOpacity onPress={() => setShowTypeModal(true)} style={styles.selector} disabled={loadingTypes}>
          <Text style={type ? styles.selectorText : styles.placeholder}>
            {type ? spaceTypes.find((i) => i.value === type)?.label : loadingTypes ? 'Cargando tipos...' : 'Tipo de espacio'}
          </Text>
        </TouchableOpacity>
        <SelectModal
          visible={showTypeModal}
          onClose={() => setShowTypeModal(false)}
          onSelect={setType}
          options={spaceTypes}
          title="Seleccione un tipo"
        />
        {error.type ? <Text style={styles.error}>{error.type}</Text> : null}
        {error.general ? <Text style={styles.error}>{error.general}</Text> : null}
      </View>
      <TouchableOpacity style={styles.button} onPress={validateAndProceed} disabled={loading || loadingTypes}>
        <Text style={styles.buttonText}>{loading ? "Creando..." : "Siguiente"}</Text>
      </TouchableOpacity>
      <HelpModal visible={visible} text={currentText} isLast={isLast} onNext={onNext} onSkip={onSkip} />
    </View>
  );
}