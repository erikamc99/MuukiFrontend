import { ScrollView } from 'react-native';
import AnimalCard from '../components/cards/AnimalCard';
import { useState, useMemo } from 'react';
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
  const spaceId = selectedSpace?.id || selectedSpace?._id;
  const { animals, loading, updateAnimal, deleteBreed, reload } = useAnimals();
  const [expandedType, setExpandedType] = useState(null);

  console.log('selectedSpace:', selectedSpace);
  console.log('spaceId:', spaceId);
  console.log('ALL animals:', animals);

  const animalsForSpace = useMemo(() => {
    if (!Array.isArray(animals) || animals.length === 0) return [];
    const filtered = animals.filter(animal =>
      (animal.spaceId === spaceId) ||
      (animal.space && (animal.space === spaceId || animal.space._id === spaceId))
    );
    console.log('animalsForSpace:', filtered);
    return filtered;
  }, [animals, spaceId]);

  const animalTypes = useMemo(() => {
    if (!Array.isArray(animalsForSpace) || animalsForSpace.length === 0) return [];
    const group = {};
    animalsForSpace.forEach(animal => {
      const species = animal.species?.trim();
      const breed = animal.breed?.trim();
      const quantity = Number(animal.quantity) || 0;
      if (!species || !breed) return;
      if (!group[species]) {
        group[species] = {
          key: species,
          icon: getIconForSpecies(species),
          count: 0,
          breeds: {},
        };
      }
      group[species].count += quantity;
      if (!group[species].breeds[breed]) {
        group[species].breeds[breed] = { name: breed, count: 0, id: animal.id };
      }
      group[species].breeds[breed].count += quantity;
    });
    const result = Object.values(group).map(animal => ({
      ...animal,
      breeds: Object.values(animal.breeds),
      totalBreeds: Object.keys(animal.breeds).length,
    }));
    console.log('animalTypes (agrupados):', result);
    return result;
  }, [animalsForSpace]);

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
      {!loading && animalTypes.map(type => (
        <AnimalCard
          key={type.key}
          icon={type.icon}
          count={type.count}
          breeds={type.breeds}
          totalBreeds={type.totalBreeds}
          isExpanded={expandedType === type.key}
          onToggle={() =>
            setExpandedType(expandedType === type.key ? null : type.key)
          }
          onUpdateBreed={(breedName, newCount) => {
            const breed = type.breeds.find(b => b.name === breedName);
            console.log('onUpdateBreed', breedName, newCount, breed);
            if (breed) updateAnimal(breed.id, { quantity: newCount }).then(reload);
          }}
          onDeleteBreed={(breedName) => {
            const breed = type.breeds.find(b => b.name === breedName);
            console.log('onDeleteBreed', breedName, breed);
            if (breed) deleteBreed(breed.id, breed.name).then(reload);
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
