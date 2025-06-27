import { ScrollView } from 'react-native';
import AnimalCard from '../components/cards/AnimalCard';
import { useState } from 'react';
import styles from '../styles/AnimalManagementScreenStyles';
import SectionHeader from '../components/SectionHeader';
import HelpModal from '../components/modals/HelpModal';
import useHelp from '../hooks/useHelp';
import { useSpace } from '../context/SpaceContext';
import { useAnimals } from '../hooks/useAnimals';

function getIconForSpecies(species) {
  if (species === 'Gallina') return require('../assets/img/gallina-icon.png');
  if (species === 'Gallo') return require('../assets/img/gallo-icon.png');
  if (species === 'Pollito') return require('../assets/img/pollito-icon.png');
  return null;
}

export default function AnimalManagementScreen() {
  const { selectedSpace } = useSpace();
  const { updateAnimal, deleteBreed, reload } = useAnimals();
  const [expandedType, setExpandedType] = useState(null);

  const animals = selectedSpace?.animals || [];
  const animalTypes = animals.map(animal => {
    const species = animal.species ?? '';
    const breeds = Array.isArray(animal.breeds)
      ? animal.breeds.map(b => ({
          name: b.breed ?? '',
          count: Number(b.quantity ?? 0),
          animalId: animal.id,
          species: animal.species ?? ''
        }))
      : [];
    const total = breeds.reduce((sum, b) => sum + (Number(b.count) || 0), 0);
    return {
      key: species,
      icon: getIconForSpecies(species),
      count: total,
      breeds,
      totalBreeds: breeds.length
    };
  });

  const {
    visible,
    currentText,
    isLast,
    onNext,
    onSkip,
    triggerManually
  } = useHelp('GestionAnimales');

  return (
    <ScrollView style={styles.screenContainer}>
      <SectionHeader sectionTitle="Gestión de Animales" onHelpPress={triggerManually} />
      {animalTypes.map(type => (
        <AnimalCard
          key={type.key}
          icon={type.icon}
          count={String(type.count)}
          breeds={type.breeds}
          totalBreeds={String(type.totalBreeds)}
          isExpanded={expandedType === type.key}
          onToggle={() =>
            setExpandedType(expandedType === type.key ? null : type.key)
          }
          onUpdateBreed={(breedName, newCount, animalId, species) => {
            updateAnimal(animalId, { species, breed: breedName, quantity: newCount }).then(reload);
          }}
          onDeleteBreed={(breedName, animalId) => {
            deleteBreed(animalId, breedName, species).then(reload);
          }}
        />
      ))}
      <HelpModal
        visible={visible}
        text={currentText}
        isLast={isLast}
        onNext={onNext}
        onSkip={onSkip}
      />
    </ScrollView>
  );
}