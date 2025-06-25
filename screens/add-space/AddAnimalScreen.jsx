import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import SectionHeader from '../../components/SectionHeader.jsx';
import SelectModal from '../../components/modals/SelectModal.jsx';
import CountSelector from '../../components/CountSelector.jsx';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/add-space/AddAnimalScreenStyles.js';
import { useSpace } from '../../context/SpaceContext';
import { useAnimalTypes } from '../../hooks/useAnimalTypes';
import { useBreeds } from '../../hooks/useBreeds';
import { useAnimals } from '../../hooks/useAnimals';
import HelpModal from '../../components/modals/HelpModal';
import useHelp from '../../hooks/useHelp';

export default function AddAnimalScreen() {
  const { selectedSpace } = useSpace();
  const spaceId = selectedSpace?.id || selectedSpace?._id;
  const { addAnimal } = useAnimals(spaceId);

  const [animal, setAnimal] = useState(null);
  const [breed, setBreed] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [showAnimalModal, setShowAnimalModal] = useState(false);
  const [showBreedModal, setShowBreedModal] = useState(false);

  const { animalTypes, loading: loadingTypes } = useAnimalTypes();
  const { breeds, loading: loadingBreeds } = useBreeds(); // breeds es el objeto completo { Gallo: [...], ... }

  const [filteredBreeds, setFilteredBreeds] = useState([]);

  useEffect(() => {
    if (animal && breeds && breeds[animal]) {
      setFilteredBreeds(breeds[animal]);
    } else {
      setFilteredBreeds([]);
    }
    setBreed(null); // limpia la raza si cambias de animal
  }, [animal, breeds]);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const ok = await addAnimal({ species: animal, breed, quantity });
    setLoading(false);
    if (ok) {
      navigation.popToTop();
    }
  };

  const {
    visible,
    currentText,
    isLast,
    onNext,
    onSkip,
    triggerManually
  } = useHelp(('AñadirAnimal'));

  return (
    <View style={styles.container}>
      <SectionHeader sectionTitle="Añadir animal" />

      <Text style={styles.label}>Animal</Text>
      <TouchableOpacity onPress={() => setShowAnimalModal(true)} style={styles.selector} disabled={loadingTypes}>
        <Text style={animal ? styles.selectorText : styles.placeholder}>
          {animal ? animal : (loadingTypes ? 'Cargando...' : 'Seleccione un animal')}
        </Text>
      </TouchableOpacity>
      <SelectModal
        visible={showAnimalModal}
        onClose={() => setShowAnimalModal(false)}
        onSelect={setAnimal}
        options={Array.isArray(animalTypes) ? animalTypes.map(type => ({ label: type, value: type })) : []}
        title="Seleccione un animal"
      />

      <Text style={styles.label}>Raza</Text>
      <TouchableOpacity onPress={() => setShowBreedModal(true)} style={styles.selector} disabled={loadingBreeds || !animal}>
        <Text style={breed ? styles.selectorText : styles.placeholder}>
          {breed ? breed : (loadingBreeds ? 'Cargando...' : (!animal ? 'Seleccione un animal primero' : 'Seleccione una raza'))}
        </Text>
      </TouchableOpacity>
      <SelectModal
        visible={showBreedModal}
        onClose={() => setShowBreedModal(false)}
        onSelect={setBreed}
        options={Array.isArray(filteredBreeds) ? filteredBreeds.map(breed => ({ label: breed, value: breed })) : []}
        title="Seleccione una raza"
      />

      <Text style={styles.label}>Cantidad</Text>
      <CountSelector count={quantity} setCount={setQuantity} />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
        disabled={!animal || !breed || loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Guardando...' : 'Guardar'}</Text>
      </TouchableOpacity>
      <HelpModal visible={visible} text={currentText} isLast={isLast} onNext={onNext} onSkip={onSkip} />
    </View>
  );
}